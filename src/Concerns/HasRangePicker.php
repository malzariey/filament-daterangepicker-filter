<?php

namespace Malzariey\FilamentDaterangepickerFilter\Concerns;

use Carbon\CarbonInterface;
use Closure;
use JetBrains\PhpStorm\Deprecated;
use Malzariey\FilamentDaterangepickerFilter\Enums\DropDirection;
use Malzariey\FilamentDaterangepickerFilter\Enums\OpenDirection;

trait HasRangePicker
{
    protected CarbonInterface|string|Closure|null $maxDate = null;

    protected CarbonInterface|string|Closure|null $minDate = null;

    protected CarbonInterface|string|Closure|null $startDate = null;

    protected CarbonInterface|string|Closure|null $endDate = null;

    protected string|Closure|null $displayFormat = "DD/MM/YYYY";
    protected string|Closure|null $format = 'd/m/Y';
    protected int|null $firstDayOfWeek = 1;
    protected bool|Closure $timePicker = false;
    protected bool|Closure $timePicker24 = false;
    protected bool|Closure $timePickerSecond = false;
    protected int|Closure $timePickerIncrement = 30;
    protected bool|Closure $autoApply = false;
    protected bool|Closure $linkedCalendars = true;

    protected string|Closure|null $timezone = null;
    protected array|Closure $disabledDates = [];
    protected array|Closure|null $maxSpan = null;
    protected bool|Closure $useRangeLabels = false;
    protected bool|Closure $disableCustomRange = false;
    protected string $rangeSeparator = ' - ';

    protected bool|Closure $disableRange = false;

    protected OpenDirection|Closure $opens = OpenDirection::LEFT;
    protected DropDirection|Closure $drops = DropDirection::DOWN;

    protected string|Closure|null $icon = null;

    protected int|Closure|null $minYear = null;

    protected int|Closure|null $maxYear = null;

    protected bool|Closure $showDropdowns = false;
    protected bool|Closure $showWeekNumbers = false;

    protected bool|Closure $showISOWeekNumbers = false;

    protected bool|Closure $alwaysShowCalendar = true;

    protected bool $enforceIfNull = false;
    protected bool $enforceFormat = false;

    public function icon(string|Closure|null $icon = null): static
    {
        $this->icon = $icon;

        return $this;
    }

    public function resetFirstDayOfWeek(): static
    {
        $this->firstDayOfWeek($this->getDefaultFirstDayOfWeek());

        return $this;
    }

    protected function getDefaultFirstDayOfWeek(): int
    {
        return config('forms.components.date_time_picker.first_day_of_week', 1);
    }

    public function getFormat(): string
    {
        $format = $this->evaluate($this->format);

        if (!$this->getEnforceFormat() && $this->timePicker && (!str_contains($format,"h" ) && !str_contains($format,"h" ))) {
            if ($this->getTimePicker24()) {
                if ($this->getTimePickerSecond()) {
                    $format .= ' H:i:s';
                } else {
                    $format .= ' H:i';
                }
            } else {
                if ($this->getTimePickerSecond()) {
                    $format .= ' h:i:s A';
                } else {
                    $format .= ' h:i A';
                }
            }
        }
        return $format;
    }

    public function getEnforceFormat(): bool
    {
        return $this->evaluate($this->enforceFormat);
    }

    public function getTimePicker24(): bool
    {
        return $this->evaluate($this->timePicker24);
    }

    public function getTimePickerSecond(): bool
    {
        return $this->evaluate($this->timePickerSecond);
    }

    public function maxDate(CarbonInterface|string|Closure|null $date): static
    {
        $this->maxDate = $date;

        return $this;
    }

    public function minDate(CarbonInterface|string|Closure|null $date): static
    {
        $this->minDate = $date;

        return $this;
    }

    public function alwaysShowCalendar(bool|Closure $alwaysShow = true): static
    {
        $this->alwaysShowCalendar = $alwaysShow;

        return $this;
    }

    public function disabledDates(array|Closure $dates): static
    {
        $this->disabledDates = $dates;

        return $this;
    }

    public function autoApply(bool|Closure $condition = true): static
    {
        $this->autoApply = $condition;

        return $this;
    }

    public function maxYear(int|Closure|null $condition = null): static
    {
        $this->maxYear = $condition;

        return $this;
    }

    public function minYear(int|Closure|null $condition = null): static
    {
        $this->minYear = $condition;

        return $this;
    }

    public function showDropdowns(bool|Closure $condition = true): static
    {
        $this->showDropdowns = $condition;

        return $this;
    }

    public function showISOWeekNumbers(bool|Closure $condition = true): static
    {
        $this->showISOWeekNumbers = $condition;

        return $this;
    }

    public function showWeekNumbers(bool|Closure $condition = true): static
    {
        $this->showWeekNumbers = $condition;

        return $this;
    }

    public function rangeSeparator(string $separator): static
    {
        $this->rangeSeparator = $separator;

        return $this;
    }

    public function disableCustomRange(bool|Closure $disableCustomRange = true): static
    {
        $this->disableCustomRange = $disableCustomRange;

        return $this;
    }

    public function useRangeLabels(bool $useRangeLabels = true): static
    {
        $this->useRangeLabels = $useRangeLabels;

        return $this;
    }

    //Javascript Format

    public function drops(DropDirection|Closure $direction): static
    {
        $this->drops = $direction;

        return $this;

    }

    public function opens(OpenDirection|Closure $direction): static
    {
        $this->opens = $direction;

        return $this;

    }

    public function displayFormat(string|Closure|null $format , bool $enforceFormat = false): static
    {
        $this->displayFormat = $format;

        $this->enforceFormat = $enforceFormat;

        return $this;
    }

    public function maxSpan(array|Closure|null $maxSpan): static
    {
        $this->maxSpan = $maxSpan;

        return $this;
    }

    public function ranges(null|array|Closure $ranges): static
    {
        if (!is_null($ranges)) {
            $this->ranges = $ranges;
        }

        return $this;
    }

    public function timePickerSecond(bool|Closure $condition = true): static
    {
        $this->timePickerSecond = $condition;

        return $this;
    }

    public function timePicker24(bool|Closure $condition = true): static
    {
        $this->timePicker24 = $condition;

        return $this;
    }

    public function timePicker(bool|Closure $condition = true): static
    {
        $this->timePicker = $condition;

        return $this;
    }

    #[Deprecated(since: '2.5.1')]
    public function setTimePickerOption(bool|Closure $condition = true): static
    {
        $this->timePicker = $condition;

        return $this;
    }

    #[Deprecated(since: '2.5.1')]
    public function setTimePickerIncrementOption(int $increment = 1): static
    {
        $this->timePickerIncrement = $increment;

        return $this;
    }

    public function timePickerIncrement(int|Closure $increment = 1): static
    {
        $this->timePickerIncrement = $increment;

        return $this;
    }

    #[Deprecated(since: '2.5.1')]
    public function setAutoApplyOption(bool $condition = true): static
    {
        $this->autoApply = $condition;

        return $this;
    }

    public function linkedCalendars(bool|Closure $condition = true): static
    {
        $this->linkedCalendars = $condition;

        return $this;
    }

    #[Deprecated(since: '2.5.1')]
    public function setLinkedCalendarsOption(bool $condition = true): static
    {
        $this->linkedCalendars = $condition;

        return $this;
    }

    public function format(string|Closure|null $format, bool $enforceFormat = false): static
    {
        $this->format = $format;

        $this->enforceFormat = $enforceFormat;

        return $this;
    }

    public function disableRanges(bool|Closure $disableRanges = true): static
    {
        $this->disableRange = $disableRanges;

        return $this;
    }

    public function startDate(CarbonInterface|string|Closure|null $date, $enforceIfNull = false): static
    {
        $this->startDate = $date;
        $this->enforceIfNull = $enforceIfNull;

        return $this;
    }

    public function endDate(CarbonInterface|string|Closure|null $date, $enforceIfNull = false): static
    {
        $this->endDate = $date;
        $this->enforceIfNull = $enforceIfNull;

        return $this;
    }

    public function defaultToday($enforceIfNull = false): static
    {
        $this->startDate = $this->now()->startOfDay();
        $this->endDate = $this->now()->endOfDay();

        $this->enforceIfNull = $enforceIfNull;


        return $this;
    }

    public function now(): CarbonInterface|string|Closure
    {
        return now()->timezone($this->getTimezone());
    }

    public function timezone(string|Closure|null $timezone): static
    {
        $this->timezone = $timezone;

        return $this;
    }

    public function getTimezone(): string
    {
        return $this->evaluate($this->timezone) ?? $this->getSystemTimezone();
    }

    public function getSystemTimezone(): string
    {
        return config('app.timezone');
    }

    public function defaultYesterday($enforceIfNull = false): static
    {
        $this->startDate = $this->now()->subDay();
        $this->endDate = $this->now()->subDay();

        $this->enforceIfNull = $enforceIfNull;

        return $this;
    }

    public function defaultLast7Days($enforceIfNull = false): static
    {
        $this->startDate = $this->now()->subDays(6);
        $this->endDate = $this->now();

        $this->enforceIfNull = $enforceIfNull;

        return $this;
    }

    public function defaultLast30Days($enforceIfNull = false): static
    {
        $this->startDate = $this->now()->subDays(29);
        $this->endDate = $this->now();

        $this->enforceIfNull = $enforceIfNull;

        return $this;
    }

    public function defaultThisMonth($enforceIfNull = false): static
    {
        $this->startDate = $this->now()->startOfMonth();
        $this->endDate = $this->now()->endOfMonth();

        $this->enforceIfNull = $enforceIfNull;

        return $this;
    }

    public function defaultLastMonth($enforceIfNull = false): static
    {
        $this->startDate = $this->now()->subMonthNoOverflow()->startOfMonth();
        $this->endDate = $this->now()->subMonthNoOverflow()->endOfMonth();

        $this->enforceIfNull = $enforceIfNull;

        return $this;
    }

    public function defaultThisYear($enforceIfNull = false): static
    {
        $this->startDate = $this->now()->startOfYear();
        $this->endDate = $this->now()->endOfYear();

        $this->enforceIfNull = $enforceIfNull;

        return $this;
    }

    public function defaultLastYear($enforceIfNull = false): static
    {
        $this->startDate = $this->now()->subYear()->startOfYear();
        $this->endDate = $this->now()->subYear()->endOfYear();

        $this->enforceIfNull = $enforceIfNull;

        return $this;
    }

    public function defaultCustom(CarbonInterface|string $start, CarbonInterface|string $end, $enforceIfNull = false): static
    {
        $this->startDate = $start;
        $this->endDate = $end;

        $this->enforceIfNull = $enforceIfNull;

        return $this;
    }

    public function getDisplayFormat(): string
    {
        $displayFormat = $this->evaluate($this->displayFormat);

        if (!$this->getEnforceFormat() && $this->timePicker && (!str_contains($displayFormat,"h" ) && !str_contains($displayFormat,"H" ))) {
            if ($this->getTimePicker24()) {
                if ($this->getTimePickerSecond()) {
                    $displayFormat .= ' HH:mm:ss';
                } else {
                    $displayFormat .= ' HH:mm';
                }
            } else {
                if ($this->getTimePickerSecond()) {
                    $displayFormat .= ' hh:mm:ss A';
                } else {
                    $displayFormat .= ' hh:mm A';
                }
            }
        }

        return $displayFormat;
    }

    public function getTimePicker(): bool
    {
        return $this->evaluate($this->timePicker);
    }

    #[Deprecated(since: '2.5.1')]
    public function getTimePickerOption(): bool
    {
        return $this->evaluate($this->timePicker);
    }


}
