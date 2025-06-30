<?php

namespace Malzariey\FilamentDaterangepickerFilter\Filters;

use Closure;
use Filament\Tables\Filters\BaseFilter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Carbon;
use Malzariey\FilamentDaterangepickerFilter\Concerns\HasRangePicker;
use Malzariey\FilamentDaterangepickerFilter\Fields\DateRangePicker;

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

        if (!empty($datesString)) {
            $dates = explode($this->rangeSeparator, $datesString);
        } else {
            $dates = [];
        }

        if (count($dates) == 2) {
            $from = $dates[0];
            $to = $dates[1];

            if ($this->timePicker) {
                $dates = [
                    Carbon::createFromFormat($this->getFormat(), $from, $this->getTimezone())->timezone($this->getSystemTimezone()),
                    Carbon::createFromFormat($this->getFormat(), $to, $this->getTimezone())->timezone($this->getSystemTimezone())
                ];
            } else {
                $dates = [
                    Carbon::createFromFormat($this->getFormat(), $from, $this->getTimezone())->startOfDay()->timezone($this->getSystemTimezone()),
                    Carbon::createFromFormat($this->getFormat(), $to, $this->getTimezone())->endOfDay()->timezone($this->getSystemTimezone()),
                ];
            }

        } else {
            $from = null;
            $to = null;
        }


        if ($this->hasQueryModificationCallback()) {
            $callback = $this->modifyQueryUsing;
            $this->evaluate($callback, [
                'data' => $data,
                'query' => $query,
                'state' => $data,
                'dateString' => $datesString,
                'startDate' => $dates[0] ?? null,
                'endDate' => $dates[1] ?? null,
            ]);
            return $query;
        }

        if ($dates == null) {
            return $query;
        }

        return $query
            ->when(
                $from !== null && $to !== null,
                fn(Builder $query, $date): Builder => $query->whereBetween($this->column, $dates),
            );
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
        ];
    }



}
