<?php

namespace Malzariey\FilamentDaterangepickerFilter\Fields;

use Carbon\CarbonInterface;
use Closure;
use Filament\Forms;
use Filament\Forms\Components\Concerns;
use Filament\Support\Concerns\HasExtraAlpineAttributes;
use Illuminate\View\ComponentAttributeBag;

class DateRangePicker extends Forms\Components\Field
{
    use Concerns\HasPlaceholder;
    use HasExtraAlpineAttributes;

    protected string $view = 'filament-daterangepicker-filter::date-range-picker';

    protected bool|Closure $alwaysShowCalender = true;
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

    //Javascript Format
    public function displayFormat(string|Closure|null $format): static
    {
        $this->displayFormat = $format;

        return $this;
    }

    public function firstDayOfWeek(int|null $day): static
    {
        if ($day < 0 || $day > 7) {
            $day = $this->getDefaultFirstDayOfWeek();
        }

        $this->firstDayOfWeek = $day;

        return $this;
    }

    public function format(string|Closure|null $format): static
    {
        $this->format = $format;

        return $this;
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

    public function startDate(CarbonInterface|string|Closure|null $date): static
    {
        $this->startDate = $date;

        return $this;
    }

    public function endDate(CarbonInterface|string|Closure|null $date): static
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


    public function disabledDates(array|Closure $dates): static
    {
        $this->disabledDates = $dates;

        return $this;
    }

    public function resetFirstDayOfWeek(): static
    {
        $this->firstDayOfWeek($this->getDefaultFirstDayOfWeek());

        return $this;
    }

    public function timezone(string|Closure|null $timezone): static
    {
        $this->timezone = $timezone;

        return $this;
    }


    public function getDisplayFormat(): string
    {
        $format = $this->evaluate($this->displayFormat);

        if ($format) {
            return $format;
        }

        if (!$this->hasTime()) {
            return config('forms.components.date_time_picker.display_formats.date', 'M j, Y');
        }

        if (!$this->hasDate()) {
            return $this->hasSeconds() ?
                config('forms.components.date_time_picker.display_formats.time_with_seconds', 'H:i:s') :
                config('forms.components.date_time_picker.display_formats.time', 'H:i');
        }

        return $this->hasSeconds() ?
            config('forms.components.date_time_picker.display_formats.date_time_with_seconds', 'M j, Y H:i:s') :
            config('forms.components.date_time_picker.display_formats.date_time', 'M j, Y H:i');
    }

    public function getExtraTriggerAttributes(): array
    {
        $temporaryAttributeBag = new ComponentAttributeBag();

        foreach ($this->extraTriggerAttributes as $extraTriggerAttributes) {
            $temporaryAttributeBag = $temporaryAttributeBag->merge($this->evaluate($extraTriggerAttributes));
        }

        return $temporaryAttributeBag->getAttributes();
    }

    public function getExtraTriggerAttributeBag(): ComponentAttributeBag
    {
        return new ComponentAttributeBag($this->getExtraTriggerAttributes());
    }

    public function getFirstDayOfWeek(): int
    {
        return $this->firstDayOfWeek ?? $this->getDefaultFirstDayOfWeek();
    }

    public function getFormat(): string
    {
        $format = $this->evaluate($this->format);

        if ($format) {
            return $format;
        }

        $format = $this->hasDate() ? 'Y-m-d' : '';

        if (!$this->hasTime()) {
            return $format;
        }

        $format = $format ? "{$format} H:i" : 'H:i';

        if (!$this->hasSeconds()) {
            return $format;
        }

        return "{$format}:s";
    }

    public function getMaxDate(): ?string
    {
        return $this->evaluate($this->maxDate);
    }

    public function getMinDate(): ?string
    {
        return $this->evaluate($this->minDate);
    }

    public function getDisabledDates(): array
    {
        return $this->evaluate($this->disabledDates);
    }

    public function getTimezone(): string
    {
        return $this->evaluate($this->timezone) ?? config('app.timezone');
    }

    protected function getDefaultFirstDayOfWeek(): int
    {
        return config('forms.components.date_time_picker.first_day_of_week', 1);
    }

    public function alwaysShowCalender(bool|Closure $condition = true): static
    {
        $this->alwaysShowCalender = $condition;

        return $this;
    }

    public function isAlwaysShowCalender(): bool
    {
        return $this->alwaysShowCalender;
    }

    public function setTimePickerOption(bool $condition = true): static
    {
        $this->timePicker = $condition;

        return $this;
    }

    public function getTimePickerOption(): string
    {
        return $this->timePicker ? 'true' : 'false';
    }

    public function setTimePickerIncrementOption(int $increment = 1): static
    {
        $this->timePickerIncrement = $increment;

        return $this;
    }

    public function getTimePickerIncrementOption(): int
    {
        return $this->timePickerIncrement;
    }


    public function setAutoApplyOption(bool $condition = true): static
    {
        $this->autoApply = $condition;

        return $this;
    }

    // NOTE: auto apply will not be enabled by daterangepicker.js if timePicker is set
    public function getAutoApplyOption(): string
    {
        return $this->autoApply ? 'true' : 'false';
    }

    public function setLinkedCalendarsOption(bool $condition = true): static
    {
        $this->linkedCalendars = $condition;

        return $this;
    }

    public function getLinkedCalendarsOption(): string
    {
        return $this->linkedCalendars ? 'true' : 'false';
    }


}
