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
use JetBrains\PhpStorm\Deprecated;
use Malzariey\FilamentDaterangepickerFilter\Enums\DropDirection;
use Malzariey\FilamentDaterangepickerFilter\Enums\OpenDirection;


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
    protected bool | Closure $timePicker = false;
    protected bool | Closure $timePicker24 = false;
    protected bool | Closure $timePickerSecond = false;
    protected int | Closure $timePickerIncrement = 30;
    protected bool | Closure $autoApply = false;
    protected bool | Closure $linkedCalendars = true;
    protected bool | Closure $singleCalendar = false;

    protected CarbonInterface|string|Closure|null $maxDate = null;
    protected CarbonInterface|string|Closure|null $minDate = null;
    protected CarbonInterface|string|Closure|null $startDate = null;
    protected CarbonInterface|string|Closure|null $endDate = null;
    protected string|Closure|null $timezone = null;
    protected array|Closure $disabledDates = [];
    protected array|Closure $ranges = [];
    protected array | Closure | null $maxSpan = null;
    protected bool | Closure $useRangeLabels = false;
    protected bool|Closure $disableRange = false;
    protected bool | Closure $disableCustomRange = false;
    protected string $separator = ' - ';


    public function disableClear(bool|Closure $disable = true) : static
    {
        $condition = $this->evaluate($disable);

        if ($condition) {
            $this->suffixAction(fn() => null);
            $this->suffixIcon('heroicon-m-calendar-days');

        }else{
            $this->suffixAction(
                Action::make('clear')
                    ->label(__('filament-daterangepicker-filter::message.clear'))
                    ->icon('heroicon-m-calendar-days')
                    ->action(fn() => $this->clear())
            );
            $this->suffixIcon(null);

        }

        return $this;
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

    public function disableCustomRange(bool | Closure $disableCustomRange = true) : static
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

    public function startDate(CarbonInterface|string|Closure|null $date , $enforceIfNull = false) : static
    {
        $this->startDate = $date;

        $this->processDefault($enforceIfNull);

        return $this;
    }

    public function endDate(CarbonInterface|string|Closure|null $date , $enforceIfNull = false) : static
    {
        $this->endDate = $date;

        $this->processDefault($enforceIfNull);

        return $this;
    }

    public function defaultToday($enforceIfNull = false) : static
    {
        $this->startDate = $this->now()->startOfDay();
        $this->endDate = $this->now()->endOfDay();

        $this->processDefault($enforceIfNull);

        return $this;
    }

    public function processDefault($enforceIfNull = false): void{
        $default = null;

        if ($this->getStartDate() != null && $this->getEndDate() != null) {
            $default = $this->getStartDate()->format($this->getFormat()) . $this->separator . $this->getEndDate()->format($this->getFormat());
        } else if ($this->getStartDate() != null && $this->getEndDate() == null) {
            $default = $this->getStartDate()->format($this->getFormat()) . $this->separator . $this->getStartDate()->format($this->getFormat());
        } else if ($this->getStartDate() == null && $this->getEndDate() != null) {
            $default = $this->getEndDate()->format($this->getFormat()) . $this->separator . $this->getEndDate()->format($this->getFormat());
        }
        $this->default($default);

        if($enforceIfNull) {
            $this->afterStateHydrated(fn($component, $state) => $state == null ? $component->state($default) : null);
        }
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

    public function maxSpan(array | Closure | null $maxSpan): static
    {
        $this->maxSpan = $maxSpan;

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

    public function getSystemTimezone() : string
    {
        return config('app.timezone');
    }

    public function getFirstDayOfWeek() : int
    {
        $day = $this->evaluate($this->firstDayOfWeek);
        if($day == null){
            return $this->getDefaultFirstDayOfWeek();
        }
        if ($day < 0 || $day > 7) {
            $day = $this->getDefaultFirstDayOfWeek();
        }
        return  $day;
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
        return $this->evaluate($this->timezone) ?? $this->getSystemTimezone();
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

        if ( $this->getDisableCustomRange()) {
            return false;
        }

        return $this->evaluate($this->alwaysShowCalendar);
    }

    #[Deprecated(since: '2.5.1')]
    public function setTimePickerOption(bool | Closure $condition = true) : static
    {
        $this->timePicker = $condition;

        return $this;
    }

    public function timePicker(bool | Closure $condition = true) : static
    {
        $this->timePicker = $condition;

        return $this;
    }

    public function timePicker24(bool | Closure $condition = true) : static
    {
        $this->timePicker24 = $condition;

        return $this;
    }

    public function timePickerSecond(bool | Closure $condition = true) : static
    {
        $this->timePickerSecond = $condition;

        return $this;
    }

    #[Deprecated(since: '2.5.1')]
    public function getTimePickerOption() : bool
    {
        return $this->evaluate($this->timePicker);
    }

    public function getTimePicker() : bool
    {
        return $this->evaluate($this->timePicker);
    }

    public function getTimePicker24() : bool
    {
        return $this->evaluate($this->timePicker24);
    }

    public function getTimePickerSecond() : bool
    {
        return $this->evaluate($this->timePickerSecond);
    }

    #[Deprecated(since: '2.5.1')]
    public function setTimePickerIncrementOption(int $increment = 1) : static
    {
        $this->timePickerIncrement = $increment;

        return $this;
    }

    public function timePickerIncrement(int | Closure $increment = 1) : static
    {
        $this->timePickerIncrement = $increment;

        return $this;
    }
    #[Deprecated(since: '2.5.1')]

    public function getTimePickerIncrementOption() : int
    {
        return $this->evaluate($this->timePickerIncrement);
    }

    public function getTimePickerIncrement() : int
    {
        return $this->evaluate($this->timePickerIncrement);
    }

    #[Deprecated(since: '2.5.1')]
    public function setAutoApplyOption(bool $condition = true) : static
    {
        $this->autoApply = $condition;

        return $this;
    }
    /**
     * Does not work with TimePicker
     */
    public function autoApply(bool | Closure $condition = true) : static
    {
        $this->autoApply = $condition;

        return $this;
    }

    #[Deprecated(since: '2.5.1')]
    public function getAutoApplyOption() : bool
    {
        return $this->autoApply;
    }

    public function getAutoApply() : bool
    {
        return $this->autoApply;
    }
    #[Deprecated(since: '2.5.1')]
    public function setLinkedCalendarsOption(bool $condition = true) : static
    {
        $this->linkedCalendars = $condition;

        return $this;
    }

    public function linkedCalendars(bool | Closure $condition = true) : static
    {
        $this->linkedCalendars = $condition;

        return $this;
    }

    public function singleCalendar(bool | Closure $condition = true) : static
    {
        $this->singleCalendar = $condition;

        return $this;
    }

    #[Deprecated(since: '2.5.1')]
    public function getLinkedCalendarsOption(): bool
    {
        return $this->linkedCalendars;
    }

    public function getLinkedCalendars(): bool
    {
        return $this->evaluate($this->linkedCalendars);
    }

    public function getSingleCalendar(): bool
    {
        return $this->evaluate($this->singleCalendar);
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

    public function getMaxSpan(): ?array
    {
        $maxSpan = $this->evaluate($this->maxSpan);

        if (empty($maxSpan)) {
            return null;
        }

        return $maxSpan;
    }

    public function getUseRangeLabels() : bool
    {
        return $this->evaluate($this->useRangeLabels);
    }

    public function getDisableCustomRange() : bool
    {
        return $this->evaluate($this->disableCustomRange);
    }

    public function getSeparator() : string
    {
        return $this->separator;
    }
}
