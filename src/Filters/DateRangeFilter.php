<?php

namespace Malzariey\FilamentDaterangepickerFilter\Filters;

use Closure;
use Filament\Forms\Components\Field;
use Filament\Tables\Filters\BaseFilter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Malzariey\FilamentDaterangepickerFilter\Concerns\HasRangePicker;
use Malzariey\FilamentDaterangepickerFilter\Enums\PickerType;
use Malzariey\FilamentDaterangepickerFilter\Fields\DateRangePicker;
use Malzariey\FilamentDaterangepickerFilter\Support\DayjsDateNames;
use Throwable;

class DateRangeFilter extends BaseFilter
{
    use HasRangePicker;

    protected string $column;

    protected null|array|Closure $ranges = null;

    protected bool|Closure $isLabelHidden = false;

    protected string|Closure|null $placeholder = null;
    protected bool|Closure $disableClear = false;

    /** @var array<string, bool> */
    protected array $dateColumnCache = [];

    public function disableClear(bool|Closure $disable = true): static
    {
        $this->disableClear = $disable;

        return $this;
    }

    public function processDefault($enforceIfNull = false): void
    {
        $this->enforceIfNull = $enforceIfNull;
    }

    public function firstDayOfWeek(int|Closure $day): static
    {
        $this->firstDayOfWeek = $day;

        return $this;
    }

    public function placeholder(string|Closure|null $placeholder): static
    {
        $this->placeholder = $placeholder;

        return $this;
    }

    public function hiddenLabel(bool|Closure $condition = true): static
    {
        $this->isLabelHidden = $condition;

        return $this;
    }

    public function apply(Builder $query, array $data = []): Builder
    {
        if ($this->isHidden()) {
            return $query;
        }

        if (!($data['isActive'] ?? true)) {
            return $query;
        }

        $datesString = data_get($data, $this->column);

        [$startDate, $endDate] = $this->parseRange($datesString);

        if ($this->hasQueryModificationCallback()) {
            $callback = $this->modifyQueryUsing;
            $this->evaluate($callback, [
                'data' => $data,
                'query' => $query,
                'state' => $data,
                'dateString' => $datesString,
                'startDate' => $startDate,
                'endDate' => $endDate,
            ]);
            return $query;
        }

        if ($startDate === null || $endDate === null) {
            return $query;
        }

        if ($this->isDateColumn($query)) {
            // A DATE column holds a calendar date, not an instant, so there is
            // nothing to convert: compare the calendar dates the user picked.
            // Shifting them into the storage zone filed "1 June" in New York
            // under 2 June. String bounds and an exclusive upper bound keep it
            // index-friendly and portable: a DATE column on MySQL/Postgres and
            // the "Y-m-d" or "Y-m-d 00:00:00" text SQLite keeps both match.
            [$from, $to] = $this->parseLocalRange($datesString);

            return $query
                ->where($this->column, '>=', $from->toDateString())
                ->where($this->column, '<', $to->copy()->addDay()->toDateString());
        }

        return $query->whereBetween($this->column, [$startDate, $endDate]);
    }

    /**
     * Whether the filtered column stores a calendar date with no time of day.
     *
     * In order:
     *
     * 1. A timestamp the model manages (`getDates()`: created_at / updated_at,
     *    and a soft-delete column) is an instant. No schema query: these are
     *    the most commonly filtered columns.
     * 2. Otherwise the database's column type decides: `date` is a calendar
     *    date; datetime, timestamp and the rest are instants, whatever the
     *    model casts them as. A `date` cast on a DATETIME column (common for
     *    its JSON form) still stores instants, and comparing them as calendar
     *    dates filed rows in the first hours of a local day east of the
     *    storage zone under the day before.
     * 3. If the lookup fails (an unknown column, a view, a table name the
     *    schema builder cannot read), the model's cast: `date`,
     *    `immutable_date`, `date:<format>` or `immutable_date:<format>` is a
     *    calendar date, anything else an instant.
     *
     * The answer is cached per filter instance.
     */
    protected function isDateColumn(Builder $query): bool
    {
        $model = $query->getModel();
        $table = $model->getTable();
        $column = $this->column;

        if (($dot = strrpos($column, '.')) !== false) {
            $table = substr($column, 0, $dot);
            $column = substr($column, $dot + 1);
        }

        $ownTable = $table === $model->getTable();

        if ($ownTable && in_array($column, $this->modelTimestampColumns($model), true)) {
            return false;
        }

        $connection = $query->getQuery()->getConnection();
        $key = $connection->getName() . '|' . $table . '|' . $column;

        return $this->dateColumnCache[$key] ??= (function () use ($connection, $model, $ownTable, $table, $column): bool {
            try {
                return strtolower($connection->getSchemaBuilder()->getColumnType($table, $column)) === 'date';
            } catch (Throwable) {
                $cast = $ownTable ? ($model->getCasts()[$column] ?? null) : null;

                return is_string($cast) && preg_match('/^(immutable_)?date(:|$)/', $cast) === 1;
            }
        })();
    }

    /**
     * The timestamp columns Eloquent manages on this model.
     *
     * @return list<string>
     */
    protected function modelTimestampColumns(Model $model): array
    {
        $columns = $model->getDates();

        if (method_exists($model, 'getDeletedAtColumn')) {
            $columns[] = $model->getDeletedAtColumn();
        }

        return array_values(array_filter($columns, 'is_string'));
    }

    /**
     * The filter state as two instants in the storage timezone, or two nulls.
     *
     * - "start - end": both ends, read in the display timezone. Without a time
     *   picker they widen to start-of-day / end-of-day.
     * - a lone date (only the first end was picked, and Filament persisted the
     *   state): that whole day, start-of-day to end-of-day.
     * - anything else, or anything that does not parse: [null, null], so the
     *   filter does nothing. Filter state is persisted per user, so throwing
     *   here would 500 the table on every visit until the session expired.
     *
     * @return array{0: Carbon|null, 1: Carbon|null}
     */
    protected function parseRange(mixed $datesString): array
    {
        [$from, $to] = $this->parseLocalRange($datesString);

        if ($from === null || $to === null) {
            return [null, null];
        }

        return [
            $from->timezone($this->getSystemTimezone()),
            $to->timezone($this->getSystemTimezone()),
        ];
    }

    /**
     * The filter state as two instants in the display timezone, before the
     * conversion to storage: the calendar dates the user picked. Same rules as
     * parseRange().
     *
     * @return array{0: Carbon|null, 1: Carbon|null}
     */
    protected function parseLocalRange(mixed $datesString): array
    {
        if (! is_string($datesString) || trim($datesString) === '') {
            return [null, null];
        }

        $parts = array_map('trim', explode($this->rangeSeparator, $datesString));
        $parts = array_values(array_filter($parts, fn (string $part): bool => $part !== ''));

        if (count($parts) === 1) {
            $day = $this->parseDate($parts[0]);

            if ($day === null) {
                return [null, null];
            }

            return [
                $this->startOfPeriod($day->copy()),
                $this->endOfPeriod($day->copy()),
            ];
        }

        if (count($parts) !== 2) {
            return [null, null];
        }

        $from = $this->parseDate($parts[0]);
        $to = $this->parseDate($parts[1]);

        if ($from === null || $to === null) {
            return [null, null];
        }

        if ($this->getPickerType() !== PickerType::DAY || ! $this->getTimePicker()) {
            $this->startOfPeriod($from);
            $this->endOfPeriod($to);
        } elseif (! str_contains($this->getFormat(), 's')) {
            // Without seconds on screen, "23:59" means the whole of that
            // minute; read as 23:59:00 it would drop the last 59 seconds.
            $to->endOfMinute();
        }

        return [$from, $to];
    }

    /**
     * The first instant of the picked day, month or year.
     */
    protected function startOfPeriod(Carbon $date): Carbon
    {
        return match ($this->getPickerType()) {
            PickerType::MONTH => $date->startOfMonth(),
            PickerType::YEAR => $date->startOfYear(),
            default => $date->startOfDay(),
        };
    }

    /**
     * The last instant of the picked day, month or year.
     */
    protected function endOfPeriod(Carbon $date): Carbon
    {
        return match ($this->getPickerType()) {
            PickerType::MONTH => $date->endOfMonth(),
            PickerType::YEAR => $date->endOfYear(),
            default => $date->endOfDay(),
        };
    }

    protected function parseDate(string $value): ?Carbon
    {
        // '!' resets every field the format does not carry to its zero
        // value. Without it they come from "now": "06/2026" parsed as today's
        // day of June, and on the 29th-31st "02/2026" rolled into March.
        // A format with no year keeps "this year" rather than 1970.
        $format = $this->getFormat();

        if (! str_starts_with($format, '!') && ! str_contains($format, '|') && strpbrk(preg_replace('/\\\\./s', '', $format), 'YyoXxU') !== false) {
            $format = '!' . $format;
        }

        // The browser writes month, weekday and AM/PM names with Day.js in the
        // page locale ("أكتوبر 2026"), which createFromFormat() cannot read.
        // Read them back through Day.js's own names first; then the value as
        // it is, for English pages and for an English state (a default built
        // on the server, or one persisted before names were read).
        if (DayjsDateNames::formatHasNames($format)) {
            foreach (DayjsDateNames::englishReadings($value, $format, app()->getLocale()) as $english) {
                if (($date = $this->readStrict($format, $english)) !== null) {
                    return $date;
                }
            }
        }

        return $this->readStrict($format, $value);
    }

    private function readStrict(string $format, string $value): ?Carbon
    {
        try {
            $date = Carbon::createFromFormat($format, $value, $this->getTimezone());
        } catch (Throwable) {
            return null;
        }

        // createFromFormat() rolls an impossible date over ("31/02" → 3 March)
        // with only a warning; that is not the day anyone picked.
        $errors = \DateTime::getLastErrors();

        if (is_array($errors) && ($errors['warning_count'] > 0 || $errors['error_count'] > 0)) {
            return null;
        }

        return $date instanceof Carbon ? $date : null;
    }

    protected function setUp(): void
    {
        parent::setUp();
        $this->useColumn($this->getName());
        $this->withIndicator();

    }

    public function useColumn(string $column): self
    {
        $this->column = $column;

        return $this;
    }

    public function withIndicator(): self
    {
        $this->indicateUsing(function (array $data): ?string {
            $datesString = data_get($data, $this->column);

            if (empty($datesString)) {
                return null;
            }

            // Don't advertise a filter apply() is ignoring because the state
            // does not parse.
            if ($this->parseRange($datesString) === [null, null]) {
                return null;
            }

            // In an RTL locale (ar, he, fa, ckb) the bidi algorithm reverses
            // the two dates inside the sentence; isolate the range as
            // left-to-right text (LRI ... PDI). LTR output stays unchanged.
            if (__('filament-panels::layout.direction') === 'rtl') {
                $datesString = "\u{2066}{$datesString}\u{2069}";
            }

            return __('filament-daterangepicker-filter::message.period', [
                'label' => $this->getLabel(),
                'column' => $this->column,
                'period' => $datesString,
            ]);
        });

        return $this;
    }

    /**
     * The picker the table renders for this filter.
     *
     * Built in getFormField(), the hook every supported Filament release
     * reads: up to 5.11.1 through HasSchema::getSchemaComponents(), from
     * 5.11.2 through HasForm::getFormSchema(). Core keeps the rest, so a
     * schema passed to ->form() / ->schema() still replaces this field and
     * ->modifyFormFieldUsing() still applies. Overriding either getter
     * instead hides the picker on the release that calls the other one
     * (issue #267).
     */
    public function getFormField(): ?Field
    {
        return DateRangePicker::make($this->column)
            ->hiddenLabel($this->isLabelHidden)
            ->displayFormat($this->displayFormat , $this->enforceFormat)
            ->format($this->format, $this->enforceFormat)
            ->placeholder($this->placeholder)
            ->label($this->getLabel())
            ->timezone($this->timezone)
            ->opens($this->opens)
            ->drops($this->drops)
            ->startDate($this->startDate, $this->enforceIfNull)
            ->endDate($this->endDate, $this->enforceIfNull)
            ->firstDayOfWeek($this->firstDayOfWeek)
            ->disableRanges($this->disableRange)
            ->alwaysShowCalendar($this->alwaysShowCalendar)
            ->timePicker($this->timePicker)
            ->timePickerSecond($this->timePickerSecond)
            ->timePicker24($this->timePicker24)
            ->timePickerIncrement($this->timePickerIncrement)
            ->autoApply($this->autoApply)
            ->linkedCalendars($this->linkedCalendars)
            ->disabledDates($this->disabledDates)
            ->minDate($this->minDate)
            ->maxDate($this->maxDate)
            ->enforceBoundTimes($this->enforceBoundTimes)
            ->ranges($this->ranges)
            ->maxSpan($this->maxSpan)
            ->useRangeLabels($this->useRangeLabels)
            ->disableCustomRange($this->disableCustomRange)
            ->rangeSeparator($this->rangeSeparator)
            ->icon($this->icon)
            ->disableClear($this->disableClear)
            ->showWeekNumbers($this->showWeekNumbers)
            ->showISOWeekNumbers($this->showISOWeekNumbers)
            ->showDropdowns($this->showDropdowns)
            ->minYear($this->minYear)
            ->maxYear($this->maxYear)
            ->teleport($this->teleport)
            ->allowInput($this->allowInput)
            ->pickerType($this->pickerType);
    }
}
