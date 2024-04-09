<?php

namespace Malzariey\FilamentDaterangepickerFilter\Filters;

use Carbon\CarbonInterface;
use Closure;
use Filament\Tables\Filters\BaseFilter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Carbon;
use Malzariey\FilamentDaterangepickerFilter\Enums\DropDirection;
use Malzariey\FilamentDaterangepickerFilter\Enums\OpenDirection;
use Malzariey\FilamentDaterangepickerFilter\Fields\DateRangePicker;

class DateRangeFilter extends BaseFilter
{
    protected string $column;

    protected bool $displayRangeInLine = false;

    protected CarbonInterface|string|Closure|null $maxDate = null;

    protected CarbonInterface|string|Closure|null $minDate = null;

    protected CarbonInterface|string|Closure|null $startDate = null;

    protected CarbonInterface|string|Closure|null $endDate = null;

    protected string|Closure|null $displayFormat = "DD/MM/YYYY";

    protected string|Closure|null $format = 'd/m/Y';

    protected string|Closure|null $timezone = null;

    protected bool|Closure $alwaysShowCalendar = true;

    protected int|null $firstDayOfWeek = 1;

    protected bool $timePicker = false;

    protected int $timePickerIncrement = 30;

    protected bool $autoApply = false;

    protected bool $linkedCalendars = true;

    protected array|Closure $disabledDates = [];

    protected bool|Closure $disableRange = false;


    protected null|array|Closure $ranges = null;

    protected bool $useRangeLabels = false;

    protected bool $disableCustomRange = false;

    protected string $separator = ' - ';
    protected bool|Closure $isLabelHidden = false;

    protected string|Closure|null $placeholder = null;

    protected OpenDirection|Closure $opens = OpenDirection::LEFT;

    protected DropDirection|Closure $drops = DropDirection::AUTO;
    public function resetFirstDayOfWeek() : static
    {
        $this->firstDayOfWeek($this->getDefaultFirstDayOfWeek());

        return $this;
    }

    public function firstDayOfWeek(int|null $day) : static
    {
        if ($day < 0 || $day > 7) {
            $day = $this->getDefaultFirstDayOfWeek();
        }

        $this->firstDayOfWeek = $day;

        return $this;
    }

    public function disableRanges(bool|Closure $disableRanges = true) : static
    {
        $this->disableRange = $disableRanges;

        return $this;
    }

    public function withIndicator() : self
    {
        $this->indicateUsing(function (array $data) : ?string {
            $datesString = data_get($data, $this->column);

            if (empty($datesString)) {
                return null;
            }

            return __('filament-daterangepicker-filter::message.period') . ' ' . ($this->label ? "[$this->label] " : "$this->column ") . "[$datesString]";
        });

        return $this;
    }

    public function defaultToday()
    {
        $this->startDate = $this->now();
        $this->endDate = $this->now();

        return $this;
    }

    public function now() : CarbonInterface|string|Closure
    {
        return now()->timezone($this->getTimezone());
    }

    public function getTimezone() : string
    {
        return $this->evaluate($this->timezone) ?? config('app.timezone');
    }
    public function getFormSchema() : array
    {
        $schema = $this->evaluate($this->formSchema);

        if ($schema !== null) {
            return $schema;
        }

        $default = null;

        if ($this->startDate != null && $this->endDate != null) {
            $default = $this->startDate->format($this->format) . $this->separator . $this->endDate->format($this->format);
        } else if ($this->startDate != null && $this->endDate == null) {
            $default = $this->startDate->format($this->format) . $this->separator . $this->startDate->format($this->format);
        } else if ($this->startDate == null && $this->endDate != null) {
            $default = $this->endDate->format($this->format) . $this->separator . $this->endDate->format($this->format);
        }

        return [
            DateRangePicker::make($this->column)
                ->default($default)
                ->hiddenLabel($this->isLabelHidden)
                ->placeholder($this->placeholder)
                ->label($this->getLabel())
                ->timezone($this->timezone)
                ->opens($this->opens)
                ->drops($this->drops)
                ->startDate($this->startDate)
                ->endDate($this->endDate)
                ->firstDayOfWeek($this->firstDayOfWeek)
                ->disableRanges($this->disableRange)
                ->alwaysShowCalendar($this->alwaysShowCalendar)
                ->setTimePickerOption($this->timePicker)
                ->setTimePickerIncrementOption($this->timePickerIncrement)
                ->setAutoApplyOption($this->autoApply)
                ->setLinkedCalendarsOption($this->linkedCalendars)
                ->disabledDates($this->disabledDates)
                ->minDate($this->minDate)
                ->maxDate($this->maxDate)
                ->displayFormat($this->displayFormat)
                ->format($this->format)
                ->ranges($this->ranges)
                ->useRangeLabels($this->useRangeLabels)
                ->disableCustomRange($this->disableCustomRange)
                ->separator($this->separator)
        ];
    }

    protected function setUp() : void
    {
        parent::setUp();
        $this->useColumn($this->getName());
        $this->withIndicator();

    }

    public function useColumn(string $column) : self
    {
        $this->column = $column;

        return $this;
    }

    public function apply(Builder $query, array $data = []) : Builder
    {
        if ($this->isHidden()) {
            return $query;
        }

        if (! ($data['isActive'] ?? true)) {
            return $query;
        }

        if ($this->hasQueryModificationCallback()) {
            $callback = $this->modifyQueryUsing;
            $this->evaluate($callback, [
                'data' => $data,
                'query' => $query,
                'state' => $data,
            ]);
            return $query;
        }

        $datesString = data_get($data, $this->column);

        if (empty($datesString)) {
            return $query;
        }

        $dates = explode($this->separator, $datesString);

        if (count($dates) == 2) {
            $from = $dates[0];
            $to = $dates[1];
        } else {
            $from = null;
            $to = null;
        }

        return $query
            ->when(
                $from !== null && $to !== null,
                fn (Builder $query, $date) : Builder => $query->whereBetween($this->column, [
                    Carbon::createFromFormat($this->format, $from)->startOfDay(),
                    Carbon::createFromFormat($this->format, $to)->endOfDay(),
                ]),
            );
    }

    public function format(string|Closure|null $format) : static
    {
        $this->format = $format;

        return $this;
    }

    public function displayFormat(string|Closure|null $format) : static
    {
        $this->displayFormat = $format;

        return $this;
    }

    public function maxDate(CarbonInterface|string|Closure|null $date) : static
    {
        $this->maxDate = $date;

        return $this;
    }

    public function minDate(CarbonInterface|string|Closure|null $date) : static
    {
        $this->minDate = $date;

        return $this;
    }

    public function alwaysShowCalendar(bool $alwaysShow = true) : static
    {
        $this->alwaysShowCalendar = $alwaysShow;

        return $this;
    }

    public function disabledDates(array|Closure $dates) : static
    {
        $this->disabledDates = $dates;

        return $this;
    }

    public function setLinkedCalendarsOption(bool $condition = true) : static
    {
        $this->linkedCalendars = $condition;

        return $this;
    }

    public function setAutoApplyOption(bool $condition = true) : static
    {
        $this->autoApply = $condition;

        return $this;
    }

    public function setTimePickerIncrementOption(int $increment = 1) : static
    {
        $this->timePickerIncrement = $increment;

        return $this;
    }

    public function setTimePickerOption(bool $condition = true) : static
    {
        $this->timePicker = $condition;

        return $this;
    }

    public function endDate(CarbonInterface|string|Closure|null $date) : static
    {
        $this->endDate = $date;

        return $this;
    }

    public function startDate(CarbonInterface|string|Closure|null $date) : static
    {
        $this->startDate = $date;

        return $this;
    }

    public function timezone(string|Closure|null $timezone) : static
    {
        $this->timezone = $timezone;

        return $this;
    }

    public function ranges(array|Closure $ranges) : static
    {
        $this->ranges = $ranges;

        return $this;
    }

    public function opens(OpenDirection|Closure $direction) : static
    {
        $this->opens = $direction;

        return $this;

    }

    public function drops(DropDirection|Closure $direction) : static
    {
        $this->drops = $direction;

        return $this;

    }


    public function useRangeLabels(bool $useRangeLabels = true) : static
    {
        $this->useRangeLabels = $useRangeLabels;

        return $this;
    }

    public function disableCustomRange(bool $disableCustomRange = true) : static
    {
        $this->disableCustomRange = $disableCustomRange;

        return $this;
    }

    public function separator(string $separator) : static
    {
        $this->separator = $separator;

        return $this;
    }

    public function hiddenLabel(bool|Closure $condition = true) : static
    {
        $this->isLabelHidden = $condition;

        return $this;
    }

    public function placeholder(string|Closure|null $placeholder) : static
    {
        $this->placeholder = $placeholder;

        return $this;
    }
}
