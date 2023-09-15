<?php

namespace Malzariey\FilamentDaterangepickerFilter\Fields;

use Carbon\CarbonInterface;
use Closure;
use Filament\Forms\Components\Concerns\{HasAffixes, HasExtraInputAttributes, HasPlaceholder};
use Filament\Forms\Components\Contracts\HasAffixActions;
use Filament\Forms\Components\Field;
use Filament\Support\Concerns\HasExtraAlpineAttributes;
use Illuminate\View\ComponentAttributeBag;

class DateRangePicker extends Field implements HasAffixActions
{
    use HasPlaceholder;
    use HasAffixes;
    use HasExtraInputAttributes;
    use HasExtraAlpineAttributes;

    protected string $view = 'filament-daterangepicker-filter::date-range-picker';

    protected bool|Closure $alwaysShowCalendar = true;
    protected string|Closure|null $displayFormat = "DD/MM/YYYY";
    protected array $extraTriggerAttributes = [];
    protected int|null $firstDayOfWeek = 1;
    protected string|Closure|null $format = null;
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

    public static function make(string $name) : static
    {
        $static = parent::make($name);

        $static->suffixIcon('heroicon-m-calendar-days');

        $static->ranges([
            __('filament-daterangepicker-filter::message.today') => [now(), now()],
            __('filament-daterangepicker-filter::message.yesterday') => [now()->subDay(), now()->subDay()],
            __('filament-daterangepicker-filter::message.last_7_days') => [now()->subDays(6), now()],
            __('filament-daterangepicker-filter::message.last_30_days') => [now()->subDays(29), now()],
            __('filament-daterangepicker-filter::message.this_month') => [now()->startOfMonth(), now()->endOfMonth()],
            __('filament-daterangepicker-filter::message.last_month') => [now()->subMonth()->startOfMonth(), now()->subMonth()->endOfMonth()],
            __('filament-daterangepicker-filter::message.this_year') => [now()->startOfYear(), now()->endOfYear()],
            __('filament-daterangepicker-filter::message.last_year') => [now()->subYear()->startOfYear(), now()->subYear()->endOfYear()],
        ]);

        return $static;
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
        return $this->startDate;
    }

    public function getEndDate()
    {
        return $this->endDate;
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
        $format = $this->evaluate($this->displayFormat);

        if ($format) {
            return $format;
        }

        if (! $this->hasTime()) {
            return config('forms.components.date_time_picker.display_formats.date', 'M j, Y');
        }

        if (! $this->hasDate()) {
            return $this->hasSeconds() ?
                config('forms.components.date_time_picker.display_formats.time_with_seconds', 'H:i:s') :
                config('forms.components.date_time_picker.display_formats.time', 'H:i');
        }

        return $this->hasSeconds() ?
            config('forms.components.date_time_picker.display_formats.date_time_with_seconds', 'M j, Y H:i:s') :
            config('forms.components.date_time_picker.display_formats.date_time', 'M j, Y H:i');
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
        $format = $this->evaluate($this->format);

        if ($format) {
            return $format;
        }

        $format = $this->hasDate() ? 'Y-m-d' : '';

        if (! $this->hasTime()) {
            return $format;
        }

        $format = $format ? "{$format} H:i" : 'H:i';

        if (! $this->hasSeconds()) {
            return $format;
        }

        return "{$format}:s";
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
        $ranges = $this->evaluate($this->ranges);

        foreach ($ranges as $key => $dates) {
            $ranges[$key] = array_map(function ($date) {
                return $date instanceof \Carbon\Carbon ? $date->toDateString() : $date;
            }, $dates);
        }

        return $ranges;
    }
}
