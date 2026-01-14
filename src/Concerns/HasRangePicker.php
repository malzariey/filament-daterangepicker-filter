<?php

namespace Malzariey\FilamentDaterangepickerFilter\Concerns;

use Carbon\CarbonInterface;
use Closure;
use JetBrains\PhpStorm\Deprecated;
use Malzariey\FilamentDaterangepickerFilter\Enums\DropDirection;
use Malzariey\FilamentDaterangepickerFilter\Enums\OpenDirection;
use Malzariey\FilamentDaterangepickerFilter\Enums\PickerType;

trait HasRangePicker
{
    protected CarbonInterface|string|Closure|null $maxDate = null;

    protected CarbonInterface|string|Closure|null $minDate = null;

    protected CarbonInterface|string|Closure|null $startDate = null;

    protected CarbonInterface|string|Closure|null $endDate = null;

    protected string|Closure|null $displayFormat = null;
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
    
    // New properties for Alpine.js refactor
    protected bool|Closure $teleport = true;
    protected bool|Closure $allowInput = false;
    protected ?string $dualStartField = null;
    protected ?string $dualEndField = null;
    protected PickerType|Closure $pickerType = PickerType::DAY;

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

        if (!$this->getEnforceFormat() && $this->timePicker && (!str_contains($format,"h" ) && !str_contains($format,"H" ))) {
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

    #[Deprecated(since: '2.5.1')]
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

        if ($displayFormat) {
            return $displayFormat;
        }

        $format = $this->getFormat();

        $displayFormat = $this->convertPhpToJsFormat($format);


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

    protected function convertPhpToJsFormat(string $format): string
    {
        $replacements = [
            'd' => 'DD',
            'D' => 'ddd',
            'j' => 'D',
            'l' => 'dddd',
            'N' => 'E',
            'S' => 'o',
            'w' => 'd',
            'z' => 'DDD',
            'W' => 'W',
            'F' => 'MMMM',
            'm' => 'MM',
            'M' => 'MMM',
            'n' => 'M',
            't' => '',
            'L' => '',
            'o' => 'YYYY',
            'Y' => 'YYYY',
            'y' => 'YY',
            'a' => 'a',
            'A' => 'A',
            'B' => '',
            'g' => 'h',
            'G' => 'H',
            'h' => 'hh',
            'H' => 'HH',
            'i' => 'mm',
            's' => 'ss',
            'u' => 'SSS',
            'e' => 'zz',
            'I' => '',
            'O' => 'ZZ',
            'P' => 'Z',
            'T' => 'z',
            'Z' => '',
            'c' => '',
            'r' => '',
            'U' => 'X',
        ];

        $jsFormat = "";
        $escaped = false;

        for ($i = 0; $i < strlen($format); $i++) {
            $char = $format[$i];

            if ($char === '\\') {
                $i++;
                if ($i < strlen($format)) {
                    $jsFormat .= '[' . $format[$i] . ']';
                }
                continue;
            }

            if (isset($replacements[$char])) {
                $jsFormat .= $replacements[$char];
            } else {
                $jsFormat .= $char;
            }
        }

        return $jsFormat;
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

    // ─────────────────────────────────────────────────────────────
    // New methods for Alpine.js refactor
    // ─────────────────────────────────────────────────────────────

    /**
     * Enable/disable teleport to body (for modal/slideOver compatibility)
     * When enabled, the dropdown is rendered at the document root to avoid z-index issues
     */
    public function teleport(bool|Closure $condition = true): static
    {
        $this->teleport = $condition;
        return $this;
    }

    public function getTeleport(): bool
    {
        return $this->evaluate($this->teleport);
    }

    /**
     * Allow manual input via keyboard with format validation
     * When enabled, users can type dates directly instead of only using the picker
     */
    public function allowInput(bool|Closure $condition = true): static
    {
        $this->allowInput = $condition;
        return $this;
    }

    public function getAllowInput(): bool
    {
        return $this->evaluate($this->allowInput);
    }

    /**
     * Enable dual state mode with separate start/end fields
     * Instead of storing "start - end" in one field, stores in two separate Livewire properties
     */
    public function useDualState(string $startField, string $endField): static
    {
        $this->dualStartField = $startField;
        $this->dualEndField = $endField;
        return $this;
    }

    public function isDualState(): bool
    {
        return $this->dualStartField !== null && $this->dualEndField !== null;
    }

    public function getDualStartField(): ?string
    {
        return $this->dualStartField;
    }

    public function getDualEndField(): ?string
    {
        return $this->dualEndField;
    }

    /**
     * Set the picker type: day (default), month, or year
     * - DAY: Standard day picker (default behavior)
     * - MONTH: Pick months only (e.g., "January 2026 - March 2026")
     * - YEAR: Pick years only (e.g., "2024 - 2026")
     */
    public function pickerType(PickerType|Closure $type): static
    {
        $this->pickerType = $type;
        return $this;
    }

    /**
     * Shorthand for month-only picker
     */
    public function monthPicker(): static
    {
        return $this->pickerType(PickerType::MONTH);
    }

    /**
     * Shorthand for year-only picker
     */
    public function yearPicker(): static
    {
        return $this->pickerType(PickerType::YEAR);
    }

    public function getPickerType(): PickerType
    {
        return $this->evaluate($this->pickerType);
    }

    /**
     * Get picker type as string for JavaScript
     */
    public function getPickerTypeValue(): string
    {
        return $this->getPickerType()->value;
    }

}
