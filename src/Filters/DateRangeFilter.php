<?php

namespace Malzariey\FilamentDaterangepickerFilter\Filters;

use Closure;
use Filament\Tables\Filters\BaseFilter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Carbon;
use Malzariey\FilamentDaterangepickerFilter\Concerns\HasRangePicker;
use Malzariey\FilamentDaterangepickerFilter\Enums\PickerType;
use Malzariey\FilamentDaterangepickerFilter\Fields\DateRangePicker;
use Throwable;

class DateRangeFilter extends BaseFilter
{
    use HasRangePicker;

    protected string $column;

    protected null|array|Closure $ranges = null;

    protected bool|Closure $isLabelHidden = false;

    protected string|Closure|null $placeholder = null;
    protected bool|Closure $disableClear = false;

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

        return $query->whereBetween($this->column, [$startDate, $endDate]);
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
                $this->startOfPeriod($day->copy())->timezone($this->getSystemTimezone()),
                $this->endOfPeriod($day->copy())->timezone($this->getSystemTimezone()),
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

        return [
            $from->timezone($this->getSystemTimezone()),
            $to->timezone($this->getSystemTimezone()),
        ];
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

            return __('filament-daterangepicker-filter::message.period', [
                'label' => $this->getLabel(),
                'column' => $this->column,
                'period' => $datesString
            ]);
        });

        return $this;
    }

    public function getSchemaComponents() : array
    {
        $schema = $this->evaluate($this->schema);

        if ($schema !== null) {
            return $schema;
        }

        return [
            DateRangePicker::make($this->column)
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
                ->pickerType($this->pickerType)
        ];
    }



}
