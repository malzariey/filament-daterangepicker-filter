<?php

namespace Malzariey\FilamentDaterangepickerFilter\Fields;

use Carbon\CarbonInterface;
use Closure;
use Filament\Forms\Components\Actions\Action;
use Filament\Forms\Components\Concerns\{HasAffixes, HasExtraInputAttributes, HasPlaceholder};
use Filament\Forms\Components\Contracts\HasAffixActions;
use Filament\Forms\Components\Field;
use Filament\Support\Concerns\HasExtraAlpineAttributes;
use Illuminate\View\ComponentAttributeBag;
use Malzariey\FilamentDaterangepickerFilter\Enums\OpenDirection;
use Malzariey\FilamentDaterangepickerFilter\Enums\DropDirection;


class DateRangePicker extends Field implements HasAffixActions
{
    use HasPlaceholder;
    use HasAffixes;
    use HasExtraInputAttributes;
    use HasExtraAlpineAttributes;

    protected string $view = 'filament-daterangepicker-filter::date-range-picker';
    protected bool|Closure $alwaysShowCalendar = true;
    protected string|Closure|null $displayFormat = "DD/MM/YYYY";
    protected string|Closure|null $format = 'd/m/Y';

    protected OpenDirection|Closure $opens = OpenDirection::LEFT;
    protected DropDirection|Closure $drops = DropDirection::AUTO;
    protected array $extraTriggerAttributes = [];
    protected int|null $firstDayOfWeek = 1;
    protected bool $timePicker = false;
    protected int $timePickerIncrement = 30;
    protected bool $autoApply = false;
    protected bool $linkedCalendars = true;

    protected CarbonInterface|string|Closure|null $maxDate = null;
    protected CarbonInterface|string|Closure|null $minDate = null;
    protected CarbonInterface|string|Closure|null $startDate = null;
    protected CarbonInterface|string|Closure|null $endDate = null;
    protected string|Closure|null $timezone = null;
    protected array|Closure $disabledDates = [];
    protected array|Closure $ranges = [];
    protected bool $useRangeLabels = false;
    protected bool|Closure $disableRange = false;
    protected bool $disableCustomRange = false;
    protected string $separator = ' - ';

    public static function make(string $name) : static
    {
        $static = parent::make($name);
        $static->suffixAction(Action::make('clear')
            ->label(__('filament-daterangepicker-filter::message.clear'))
            ->icon('heroicon-m-calendar-days')
            ->action(fn() => $static->clear()));

        return $static;
    }

    public function useRangeLabels(bool $useRangeLabels = true) : static
    {
        $this->useRangeLabels = $useRangeLabels;

        return $this;
    }


    public function clear()
    {
        $this->state(null);

    }

    public function now() : CarbonInterface|string|Closure
    {
        return now()->timezone($this->getTimezone());
    }

    public function disableCustomRange(bool $disableCustomRange = true) : static
    {
        $this->disableCustomRange = $disableCustomRange;

        return $this;
    }

    public function disableRanges(bool|Closure $disableRanges = true) : static
    {
        $this->disableRange = $disableRanges;

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

    public function separator(string $separator) : static
    {
        $this->separator = $separator;

        return $this;
    }

    //Javascript Format
    public function displayFormat(string|Closure|null $format) : static
    {
        $this->displayFormat = $format;

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

    public function format(string|Closure|null $format) : static
    {
        $this->format = $format;

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

    public function startDate(CarbonInterface|string|Closure|null $date) : static
    {
        $this->startDate = $date;

        return $this;
    }

    public function endDate(CarbonInterface|string|Closure|null $date) : static
    {
        $this->endDate = $date;

        return $this;
    }

    public function getStartDate()
    {
        return $this->evaluate($this->startDate);
    }

    public function getEndDate()
    {
        return $this->evaluate($this->endDate);
    }


    public function disabledDates(array|Closure $dates) : static
    {
        $this->disabledDates = $dates;

        return $this;
    }

    public function resetFirstDayOfWeek() : static
    {
        $this->firstDayOfWeek($this->getDefaultFirstDayOfWeek());

        return $this;
    }

    public function timezone(string|Closure|null $timezone) : static
    {
        $this->timezone = $timezone;

        return $this;
    }

    public function ranges(null|array|Closure $ranges) : static
    {
        if (! is_null($ranges)) {
            $this->ranges = $ranges;
        }

        return $this;
    }

    public function getDisplayFormat() : string
    {
        return $this->evaluate($this->displayFormat);
    }

    public function getOpens() : string
    {
        return $this->evaluate($this->opens)->value;
    }

    public function getDrops() : string
    {
        return $this->evaluate($this->drops)->value;
    }

    public function getExtraTriggerAttributes() : array
    {
        $temporaryAttributeBag = new ComponentAttributeBag();

        foreach ($this->extraTriggerAttributes as $extraTriggerAttributes) {
            $temporaryAttributeBag = $temporaryAttributeBag->merge($this->evaluate($extraTriggerAttributes));
        }

        return $temporaryAttributeBag->getAttributes();
    }

    public function getExtraTriggerAttributeBag() : ComponentAttributeBag
    {
        return new ComponentAttributeBag($this->getExtraTriggerAttributes());
    }

    public function getFirstDayOfWeek() : int
    {
        return $this->firstDayOfWeek ?? $this->getDefaultFirstDayOfWeek();
    }

    public function getFormat() : string
    {
        return $this->evaluate($this->format);
    }

    public function getMaxDate() : ?string
    {
        return $this->evaluate($this->maxDate);
    }

    public function getMinDate() : ?string
    {
        return $this->evaluate($this->minDate);
    }

    public function getDisabledDates() : array
    {
        return $this->evaluate($this->disabledDates);
    }

    public function getDisableRanges() : bool
    {
        return $this->evaluate($this->disableRange);
    }

    public function getTimezone() : string
    {
        return $this->evaluate($this->timezone) ?? config('app.timezone');
    }

    protected function getDefaultFirstDayOfWeek() : int
    {
        return config('forms.components.date_time_picker.first_day_of_week', 1);
    }

    public function alwaysShowCalendar(bool|Closure $condition = true) : static
    {
        $this->alwaysShowCalendar = $condition;

        return $this;
    }

    public function isAlwaysShowCalendar() : bool
    {
        if ($this->disableCustomRange) {
            return false;
        }

        return $this->alwaysShowCalendar;
    }

    public function setTimePickerOption(bool $condition = true) : static
    {
        $this->timePicker = $condition;

        return $this;
    }

    public function getTimePickerOption() : string
    {
        return $this->timePicker ? 'true' : 'false';
    }

    public function setTimePickerIncrementOption(int $increment = 1) : static
    {
        $this->timePickerIncrement = $increment;

        return $this;
    }

    public function getTimePickerIncrementOption() : int
    {
        return $this->timePickerIncrement;
    }


    public function setAutoApplyOption(bool $condition = true) : static
    {
        $this->autoApply = $condition;

        return $this;
    }

    // NOTE: auto apply will not be enabled by daterangepicker.js if timePicker is set
    public function getAutoApplyOption() : string
    {
        return $this->autoApply ? 'true' : 'false';
    }

    public function setLinkedCalendarsOption(bool $condition = true) : static
    {
        $this->linkedCalendars = $condition;

        return $this;
    }

    public function getLinkedCalendarsOption() : string
    {
        return $this->linkedCalendars ? 'true' : 'false';
    }

    public function getRanges() : ?array
    {
        if($this->getDisableRanges()){
            return [];
        }

        $ranges = $this->evaluate($this->ranges);

        if(empty($ranges)){
            $ranges = [
                __('filament-daterangepicker-filter::message.today') => [$this->now(), $this->now()],
                __('filament-daterangepicker-filter::message.yesterday') => [$this->now()->subDay(), $this->now()->subDay()],
                __('filament-daterangepicker-filter::message.last_7_days') => [$this->now()->subDays(6), $this->now()],
                __('filament-daterangepicker-filter::message.last_30_days') => [$this->now()->subDays(29), $this->now()],
                __('filament-daterangepicker-filter::message.this_month') => [$this->now()->startOfMonth(), $this->now()->endOfMonth()],
                __('filament-daterangepicker-filter::message.last_month') => [$this->now()->subMonth()->startOfMonth(), $this->now()->subMonth()->endOfMonth()],
                __('filament-daterangepicker-filter::message.this_year') => [$this->now()->startOfYear(), $this->now()->endOfYear()],
                __('filament-daterangepicker-filter::message.last_year') => [$this->now()->subYear()->startOfYear(), $this->now()->subYear()->endOfYear()],
            ];
        }

        foreach ($ranges as $key => $dates) {
            $ranges[$key] = array_map(function ($date) {
                return $date instanceof \Carbon\Carbon ? $date->toDateString() : $date;
            }, $dates);
        }

        return $ranges;
    }

    public function getUseRangeLabels() : bool
    {
        return $this->useRangeLabels;
    }

    public function getDisableCustomRange() : bool
    {
        return $this->disableCustomRange;
    }

    public function getSeparator() : string
    {
        return $this->separator;
    }
}
