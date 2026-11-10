<?php

namespace Malzariey\FilamentDaterangepickerFilter\Concerns;

use Carbon\Carbon;
use Carbon\CarbonInterface;
use Closure;
use Filament\Support\Facades\FilamentTimezone;
use JetBrains\PhpStorm\Deprecated;
use Malzariey\FilamentDaterangepickerFilter\Enums\DropDirection;
use Malzariey\FilamentDaterangepickerFilter\Enums\OpenDirection;
use Malzariey\FilamentDaterangepickerFilter\Enums\PickerType;
use Malzariey\FilamentDaterangepickerFilter\Exceptions\UnsupportedDateFormatToken;
use Malzariey\FilamentDaterangepickerFilter\Support\ReportedFormatTokens;

trait HasRangePicker
{
    /**
     * PHP date format → Day.js format token mapping.
     * Static to avoid rebuilding on every convertPhpToJsFormat() call.
     *
     * "S" is converted only straight after "j" ("jS" → "Do"), "e" is written
     * as a literal of the zone (convertPhpFormatIn()), and the tokens in
     * $unsupportedPhpFormatTokens are reported.
     */
    private static array $phpToJsFormatMap = [
        'd' => 'DD', 'D' => 'ddd', 'j' => 'D', 'l' => 'dddd',
        'S' => 'o', 'w' => 'd',
        'F' => 'MMMM', 'm' => 'MM', 'M' => 'MMM',
        'n' => 'M', 'o' => 'YYYY',
        'Y' => 'YYYY', 'y' => 'YY', 'a' => 'a', 'A' => 'A',
        'g' => 'h', 'G' => 'H', 'h' => 'hh',
        'H' => 'HH', 'i' => 'mm', 's' => 'ss', 'u' => 'SSS',
        'O' => 'ZZ', 'P' => 'Z', 'U' => 'X',
    ];

    /**
     * PHP format characters the picker cannot write in the browser and read
     * back on the server: [meaning, why, what to use instead, the Day.js
     * output 5.0.11 gave it]. They are reported once per format per request
     * (UnsupportedDateFormatToken) and keep that output, so a page that
     * rendered before renders the same. 6.0 will throw instead.
     *
     * @var array<string, array{string, string, string, string}>
     */
    private static array $unsupportedPhpFormatTokens = [
        'N' => ['ISO weekday number', 'Carbon::createFromFormat() cannot read it', 'use "D" or "l" (weekday name)', 'E'],
        'W' => ['ISO week number', 'Carbon::createFromFormat() cannot read it', 'remove it; showISOWeekNumbers() shows week numbers in the calendar', 'W'],
        'z' => ['day of the year', 'Day.js can neither write nor read it', 'use a day and month such as "d/m"', 'DDD'],
        'T' => ['timezone abbreviation', 'Day.js cannot write it for the picked date', 'use "e" (timezone identifier)', 'z'],
        't' => ['days in the month', 'Day.js cannot write it and Carbon::createFromFormat() cannot read it', 'remove it', ''],
        'L' => ['leap year flag', 'Day.js cannot write it and Carbon::createFromFormat() cannot read it', 'remove it', ''],
        'B' => ['Swatch Internet time', 'Day.js cannot write it and Carbon::createFromFormat() cannot read it', 'use "H:i"', ''],
        'I' => ['daylight saving time flag', 'Day.js cannot write it and Carbon::createFromFormat() cannot read it', 'use "e" (timezone identifier)', ''],
        'Z' => ['timezone offset in seconds', 'Day.js cannot write it and Carbon::createFromFormat() cannot read it', 'use "e" (timezone identifier)', ''],
        'c' => ['ISO 8601 date', 'the browser writes the offset of the visitor\'s clock, not of the picker timezone', 'use "Y-m-d\\TH:i:s", with "e" for the zone', ''],
        'r' => ['RFC 2822 date', 'Carbon::createFromFormat() cannot read it', 'use "D, d M Y H:i:s", with "e" for the zone', ''],
    ];

    protected CarbonInterface|string|Closure|null $maxDate = null;

    protected CarbonInterface|string|Closure|null $minDate = null;

    protected CarbonInterface|string|Closure|null $startDate = null;

    protected CarbonInterface|string|Closure|null $endDate = null;

    protected string|Closure|null $displayFormat = null;
    protected string|Closure|null $format = 'd/m/Y';
    protected int|Closure|null $firstDayOfWeek = 1;
    protected bool|Closure $timePicker = false;
    protected bool|Closure $timePicker24 = false;
    protected bool|Closure $timePickerSecond = false;
    protected int|Closure $timePickerIncrement = 30;
    protected bool|Closure $autoApply = false;
    protected bool|Closure $linkedCalendars = true;

    protected string|Closure|null $timezone = null;

    /**
     * The timezone the column is STORED in. Null means config('app.timezone'),
     * which is what Eloquent writes with, so it is right for almost everyone.
     */
    protected string|Closure|null $systemTimezone = null;
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

    protected bool|Closure $teleport = true;
    protected bool|Closure $allowInput = false;
    protected ?string $dualStartField = null;
    protected ?string $dualEndField = null;
    protected bool $dualStatePathsAreRelative = false;
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

        if (!$this->getEnforceFormat() && $this->getTimePicker() && (!str_contains($format, 'h') && !str_contains($format, 'H'))) {
            if ($this->getTimePicker24()) {
                $format .= $this->getTimePickerSecond() ? ' H:i:s' : ' H:i';
            } else {
                $format .= $this->getTimePickerSecond() ? ' h:i:s A' : ' h:i A';
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

    /**
     * False hides the calendars until the user chooses "Custom" in the preset list,
     * like the original daterangepicker's alwaysShowCalendars. Ignored without presets;
     * disableCustomRange() shows presets only, with no Custom entry.
     */
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

    /**
     * The PHP date format of the state. A token the picker cannot write and
     * read back (README, "PHP format tokens") is reported when the format is
     * converted for the browser, not thrown; 6.0 will throw.
     */
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
        return $this->defaultRange(
            fn (CarbonInterface $now) => $now->startOfDay(),
            fn (CarbonInterface $now) => $now->endOfDay(),
            $enforceIfNull,
        );
    }

    /**
     * Set a default range that is worked out when the field reads it.
     *
     * Lazy, so the range uses the timezone and the time picker the field ends
     * up with whatever order they were configured in, and "now" is the time
     * of the request, the same as the built-in presets in getRanges().
     *
     * Under timePicker() the range runs from the start of its first day to the
     * end of its last, which is what the same-named preset selects in the
     * browser (presetBounds() reads a date-only preset as whole days). Without
     * the time picker the dates are exactly what they always were.
     */
    protected function defaultRange(Closure $start, Closure $end, $enforceIfNull): static
    {
        $this->startDate = fn (): CarbonInterface => $this->wholeDayUnderTimePicker($start($this->now()), atEnd: false);
        $this->endDate = fn (): CarbonInterface => $this->wholeDayUnderTimePicker($end($this->now()), atEnd: true);

        $this->enforceIfNull = $enforceIfNull;

        return $this;
    }

    protected function wholeDayUnderTimePicker(CarbonInterface $date, bool $atEnd): CarbonInterface
    {
        if (! $this->getTimePicker()) {
            return $date;
        }

        return $atEnd ? $date->endOfDay() : $date->startOfDay();
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

    public function systemTimezone(string|Closure|null $timezone): static
    {
        $this->systemTimezone = $timezone;

        return $this;
    }

    /**
     * The timezone the dates on screen are written in.
     *
     * FilamentTimezone is Filament's DISPLAY timezone: core reads it for
     * date-time columns, entries and pickers, and falls back to
     * config('app.timezone') when nobody has set it. Defaulting to it here
     * means the picker reads what the user typed in the zone they are looking
     * at, which is the same thing Filament's own DateTimePicker does.
     */
    public function getTimezone(): string
    {
        return $this->evaluate($this->timezone) ?? FilamentTimezone::get();
    }

    /**
     * The timezone the column is stored in.
     *
     * This is config('app.timezone'), not FilamentTimezone: Eloquent writes
     * timestamps in the application timezone, and FilamentTimezone is what the
     * panel *shows* them in. The two are the same until somebody calls
     * FilamentTimezone::set() to display local times over UTC storage — the
     * documented way to do it — and from that moment reading the storage zone
     * off the display setting makes the conversion in apply() a no-op. The
     * dates then reach the query as local wall-clock against UTC data, and
     * every row in the first hours of a local day is filed under the day
     * before, silently.
     *
     * Behaviour is unchanged for anyone who has not called
     * FilamentTimezone::set(), because it returns config('app.timezone') in
     * that case anyway. systemTimezone() is there for a column stored in
     * something other than the application timezone.
     */
    public function getSystemTimezone(): string
    {
        return $this->evaluate($this->systemTimezone) ?? config('app.timezone');
    }

    public function defaultYesterday($enforceIfNull = false): static
    {
        return $this->defaultRange(
            fn (CarbonInterface $now) => $now->subDay(),
            fn (CarbonInterface $now) => $now->subDay(),
            $enforceIfNull,
        );
    }

    public function defaultLast7Days($enforceIfNull = false): static
    {
        return $this->defaultRange(
            fn (CarbonInterface $now) => $now->subDays(6),
            fn (CarbonInterface $now) => $now,
            $enforceIfNull,
        );
    }

    public function defaultLast30Days($enforceIfNull = false): static
    {
        return $this->defaultRange(
            fn (CarbonInterface $now) => $now->subDays(29),
            fn (CarbonInterface $now) => $now,
            $enforceIfNull,
        );
    }

    public function defaultThisMonth($enforceIfNull = false): static
    {
        return $this->defaultRange(
            fn (CarbonInterface $now) => $now->startOfMonth(),
            fn (CarbonInterface $now) => $now->endOfMonth(),
            $enforceIfNull,
        );
    }

    public function defaultLastMonth($enforceIfNull = false): static
    {
        return $this->defaultRange(
            fn (CarbonInterface $now) => $now->subMonthNoOverflow()->startOfMonth(),
            fn (CarbonInterface $now) => $now->subMonthNoOverflow()->endOfMonth(),
            $enforceIfNull,
        );
    }

    public function defaultThisYear($enforceIfNull = false): static
    {
        return $this->defaultRange(
            fn (CarbonInterface $now) => $now->startOfYear(),
            fn (CarbonInterface $now) => $now->endOfYear(),
            $enforceIfNull,
        );
    }

    public function defaultLastYear($enforceIfNull = false): static
    {
        return $this->defaultRange(
            fn (CarbonInterface $now) => $now->subYear()->startOfYear(),
            fn (CarbonInterface $now) => $now->subYear()->endOfYear(),
            $enforceIfNull,
        );
    }

    /**
     * The start and end are kept as given, times included. The one exception
     * is a date-only "Y-m-d" string under timePicker(): it carries no time of
     * day, so it means that whole day — 00:00 for the start, the end of the
     * day for the end — the same way the browser reads a date-only preset.
     */
    public function defaultCustom(CarbonInterface|string $start, CarbonInterface|string $end, $enforceIfNull = false): static
    {
        $this->startDate = fn (): CarbonInterface|string => $this->dateOnlyAsWholeDay($start, atEnd: false);
        $this->endDate = fn (): CarbonInterface|string => $this->dateOnlyAsWholeDay($end, atEnd: true);

        $this->enforceIfNull = $enforceIfNull;

        return $this;
    }

    protected function dateOnlyAsWholeDay(CarbonInterface|string $date, bool $atEnd): CarbonInterface|string
    {
        if (! is_string($date) || ! preg_match('/^\d{4}-\d{2}-\d{2}$/', trim($date)) || ! $this->getTimePicker()) {
            return $date;
        }

        return $this->wholeDayUnderTimePicker(Carbon::parse(trim($date), $this->getTimezone()), $atEnd);
    }

    public function getDisplayFormat(): string
    {
        $displayFormat = $this->evaluate($this->displayFormat);

        if ($displayFormat) {
            return $displayFormat;
        }

        // getFormat() already appends time tokens when timePicker is enabled,
        // so convertPhpToJsFormat() will include them in the JS format string.
        return $this->convertPhpToJsFormat($this->getFormat());
    }

    protected function convertPhpToJsFormat(string $format): string
    {
        return $this->convertPhpFormatIn($format, $this->getTimezone());
    }

    /**
     * The Day.js format for a PHP format whose values are in $timezone.
     *
     * "e" (timezone identifier) has no Day.js token: the picker's dates are
     * wall-clock values in a zone the server already knows, so it is written
     * as a literal of that zone, which Carbon reads back as the same zone.
     * Screen values are in the display zone, dual-state storage values in
     * the storage zone (getDualStateStorageFormat()).
     */
    private function convertPhpFormatIn(string $format, string $timezone): string
    {
        $jsFormat = '';
        $length = strlen($format);
        $previous = null;

        for ($i = 0; $i < $length; $i++) {
            $char = $format[$i];

            if ($char === '\\') {
                $i++;
                if ($i < $length) {
                    $jsFormat .= '[' . $format[$i] . ']';
                }
                $previous = null;
                continue;
            }

            if ($char === 'e') {
                $jsFormat .= '[' . $timezone . ']';
            } elseif ($char === 'S' && $previous !== 'j') {
                // Day.js has no suffix-only token. 5.0.11 wrote "o", a
                // literal for Day.js; bracketed so the "Do" of the English
                // ordinal plugin cannot pick it up after a "D" ("dS").
                self::reportUnsupportedPhpFormatToken($format, 'S', sprintf(
                    'The date format "%s" uses "S" (ordinal suffix) without "j" before it. The date range picker writes the suffix only together with the day, so this "S" is shown as the letter "o", as before; this will throw in 6.0. Use "jS" ("1st"), or escape it ("\\S") to show the letter itself.',
                    $format,
                ));
                $jsFormat .= '[o]';
            } elseif (isset(self::$unsupportedPhpFormatTokens[$char])) {
                [$name, $reason, $instead, $output] = self::$unsupportedPhpFormatTokens[$char];

                self::reportUnsupportedPhpFormatToken($format, $char, sprintf(
                    'The date format "%s" uses "%s" (%s), which the date range picker cannot write and read back: %s. It is %s, as before; this will throw in 6.0. Instead, %s, or escape it ("\\%s") to show the letter itself.',
                    $format,
                    $char,
                    $name,
                    $reason,
                    $output === '' ? 'left out of the picker format' : sprintf('written as Day.js "%s"', $output),
                    $instead,
                    $char,
                ));
                $jsFormat .= $output;
            } else {
                $jsFormat .= self::$phpToJsFormatMap[$char] ?? $char;
            }

            $previous = $char;
        }

        return $jsFormat;
    }

    /**
     * Report an unsupported format token once per format per request, so a
     * table with a filter in every column, or a field re-rendered by
     * Livewire, does not flood the log. report() never throws: the app's
     * exception handler logs it (and sends it to an error tracker).
     */
    private static function reportUnsupportedPhpFormatToken(string $format, string $token, string $message): void
    {
        if (! app(ReportedFormatTokens::class)->first($format, $token)) {
            return;
        }

        report(new UnsupportedDateFormatToken($format, $token, $message));
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
     * When enabled, the dropdown is rendered at the document root to avoid z-index issues.
     * When disabled, it is rendered in place, inside the field's wrapper, and positioned
     * against it; an ancestor with overflow hidden/auto/scroll can then clip it.
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
     * Enable dual state mode with separate start and end paths.
     *
     * Paths target Livewire properties directly for backwards compatibility.
     * Pass `$relative = true` to resolve them from the current schema container.
     */
    public function useDualState(string $startField, string $endField, bool $relative = false): static
    {
        $this->dualStartField = $startField;
        $this->dualEndField = $endField;
        $this->dualStatePathsAreRelative = $relative;

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

    public function areDualStatePathsRelative(): bool
    {
        return $this->dualStatePathsAreRelative;
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
