<?php

namespace Malzariey\FilamentDaterangepickerFilter\Fields;

use Carbon\Carbon;
use Closure;
use Filament\Actions\Action;
use Filament\Forms\Components\Concerns\{HasAffixes, HasExtraInputAttributes, HasPlaceholder};
use Filament\Schemas\Components\Contracts\HasAffixActions;
use Filament\Forms\Components\Field;
use Filament\Support\Concerns\HasExtraAlpineAttributes;
use Illuminate\View\ComponentAttributeBag;
use JetBrains\PhpStorm\Deprecated;
use Malzariey\FilamentDaterangepickerFilter\Concerns\HasRangePicker;

class DateRangePicker extends Field implements HasAffixActions
{
    use HasPlaceholder;
    use HasRangePicker;
    use HasAffixes;
    use HasExtraInputAttributes;
    use HasExtraAlpineAttributes;

    protected string $view = 'filament-daterangepicker-filter::date-range-picker';
    protected array $extraTriggerAttributes = [];
    protected bool|Closure $singleCalendar = false;
    protected array|Closure $ranges = [];


    protected function setUp(): void
    {
        parent::setUp();

        // Use Filament's native default() with a Closure that builds
        // the value lazily from startDate/endDate when the field hydrates.
        $this->default(fn () => $this->buildDefaultValue());

        // Only needed for the enforceIfNull edge case: force state
        // on edit operations when the existing value is null.
        $this->afterStateHydrated(function (string $operation) {
            if ($this->enforceIfNull && $operation === 'edit' && $this->getState() === null) {
                $default = $this->buildDefaultValue();
                if ($default !== null) {
                    $this->state($default);
                }
            }
        });
    }

    /**
     * Build the default value string from configured startDate/endDate.
     * Returns null if neither date is configured.
     */
    protected function buildDefaultValue(): ?string
    {
        $startDate = $this->getStartDate();
        $endDate = $this->getEndDate();

        if ($startDate === null && $endDate === null) {
            return null;
        }

        $format = $this->getFormat();
        $separator = $this->getRangeSeparator();
        $start = ($startDate ?? $endDate)->format($format);
        $end = ($endDate ?? $startDate)->format($format);

        return $start . $separator . $end;
    }

    public function disableClear(bool|Closure $disable = true): static
    {
        $condition = $this->evaluate($disable);
        $icon = $this->getIcon();

        if ($condition) {
            $this->suffixAction(fn() => null);
            $this->suffixIcon($icon);
        } else {
            $this->suffixAction(
                Action::make('clear')
                    ->label(__('filament-daterangepicker-filter::message.clear'))
                    ->icon($icon)
                    ->action(fn() => $this->clear())
            );
            $this->suffixIcon(null);
        }

        return $this;
    }

    public function getIcon(): string
    {
        return $this->evaluate($this->icon) ?? 'heroicon-m-calendar-days';
    }

    public function clear(): void
    {
        $this->state(null);
    }

    public function firstDayOfWeek(int|null $day): static
    {
        if ($day < 0 || $day > 7) {
            $day = $this->getDefaultFirstDayOfWeek();
        }

        $this->firstDayOfWeek = $day;

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


    public function getOpens(): string
    {
        return $this->evaluate($this->opens)->value;
    }

    public function getDrops(): string
    {
        return $this->evaluate($this->drops)->value;
    }

    public function getExtraTriggerAttributeBag(): ComponentAttributeBag
    {
        return new ComponentAttributeBag($this->getExtraTriggerAttributes());
    }

    public function getExtraTriggerAttributes(): array
    {
        $temporaryAttributeBag = new ComponentAttributeBag();

        foreach ($this->extraTriggerAttributes as $extraTriggerAttributes) {
            $temporaryAttributeBag = $temporaryAttributeBag->merge($this->evaluate($extraTriggerAttributes));
        }

        return $temporaryAttributeBag->getAttributes();
    }

    public function getFirstDayOfWeek(): int
    {
        $day = $this->evaluate($this->firstDayOfWeek);
        if ($day === null) {
            return $this->getDefaultFirstDayOfWeek();
        }
        if ($day < 0 || $day > 7) {
            $day = $this->getDefaultFirstDayOfWeek();
        }
        return $day;
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

    public function isAlwaysShowCalendar(): bool
    {

        if ($this->getDisableCustomRange()) {
            return false;
        }

        return $this->evaluate($this->alwaysShowCalendar);
    }

    public function getDisableCustomRange(): bool
    {
        return $this->evaluate($this->disableCustomRange);
    }

    #[Deprecated(since: '2.5.1')]
    public function getTimePickerIncrementOption(): int
    {
        return $this->evaluate($this->timePickerIncrement);
    }

    public function getTimePickerIncrement(): int
    {
        return $this->evaluate($this->timePickerIncrement);
    }


    #[Deprecated(since: '2.5.1')]
    public function getAutoApplyOption(): bool
    {
        return $this->autoApply;
    }

    public function getAutoApply(): bool
    {
        return $this->autoApply;
    }

    public function singleCalendar(bool|Closure $condition = true): static
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

    public function getRanges(): ?array
    {
        if ($this->getDisableRanges()) {
            return [];
        }

        $ranges = $this->evaluate($this->ranges);

        if (empty($ranges)) {
            $now = $this->now();
            $ranges = [
                __('filament-daterangepicker-filter::message.today') => [$now->copy(), $now->copy()],
                __('filament-daterangepicker-filter::message.yesterday') => [$now->copy()->subDay(), $now->copy()->subDay()],
                __('filament-daterangepicker-filter::message.last_7_days') => [$now->copy()->subDays(6), $now->copy()],
                __('filament-daterangepicker-filter::message.last_30_days') => [$now->copy()->subDays(29), $now->copy()],
                __('filament-daterangepicker-filter::message.this_month') => [$now->copy()->startOfMonth(), $now->copy()->endOfMonth()],
                __('filament-daterangepicker-filter::message.last_month') => [$now->copy()->subMonthNoOverflow()->startOfMonth(), $now->copy()->subMonthNoOverflow()->endOfMonth()],
                __('filament-daterangepicker-filter::message.this_year') => [$now->copy()->startOfYear(), $now->copy()->endOfYear()],
                __('filament-daterangepicker-filter::message.last_year') => [$now->copy()->subYear()->startOfYear(), $now->copy()->subYear()->endOfYear()],
            ];
        }

        foreach ($ranges as $key => $dates) {
            $ranges[$key] = array_map(
                fn ($date) => $date instanceof Carbon ? $date->toDateString() : $date,
                $dates
            );
        }

        return $ranges;
    }

    public function getDisableRanges(): bool
    {
        return $this->evaluate($this->disableRange);
    }

    public function getMaxSpan(): ?array
    {
        $maxSpan = $this->evaluate($this->maxSpan);

        if (empty($maxSpan)) {
            return null;
        }

        return $maxSpan;
    }

    public function getUseRangeLabels(): bool
    {
        return $this->evaluate($this->useRangeLabels);
    }

    public function getRangeSeparator(): string
    {
        return $this->rangeSeparator;
    }

    public function getShowWeekNumbers(): bool
    {
        return $this->evaluate($this->showWeekNumbers);
    }

    public function getShowISOWeekNumbers(): bool
    {
        return $this->evaluate($this->showISOWeekNumbers);
    }

    public function getShowDropdowns(): bool
    {
        return $this->evaluate($this->showDropdowns);
    }

    public function getMinYear(): ?int
    {
        return $this->evaluate($this->minYear);
    }

    public function getMaxYear(): ?int
    {
        return $this->evaluate($this->maxYear);
    }
}
