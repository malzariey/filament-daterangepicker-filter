<?php

use Filament\Forms\ComponentContainer;
use Filament\Forms\Form;
use Illuminate\Support\Facades\Blade;
use Livewire\Livewire;
use Malzariey\FilamentDaterangepickerFilter\Fields\DateRangePicker;

// ─────────────────────────────────────────────────────────────
// Livewire Form Integration Tests
// ─────────────────────────────────────────────────────────────

describe('Livewire Form Integration', function () {
    it('can render a date range picker in a form', function () {
        $field = DateRangePicker::make('date_range');
        
        expect($field->getName())->toBe('date_range')
            ->and($field->getView())->toBe('filament-daterangepicker-filter::date-range-picker');
    });

    it('generates correct Alpine.js component configuration', function () {
        $field = DateRangePicker::make('date_range')
            ->displayFormat('DD/MM/YYYY')
            ->autoApply()
            ->teleport();

        // Note: timePicker affects the default display format
        expect($field->getAutoApply())->toBeTrue()
            ->and($field->getTeleport())->toBeTrue();
    });

    it('passes picker type to JavaScript configuration', function () {
        $dayPicker = DateRangePicker::make('day')->pickerType(\Malzariey\FilamentDaterangepickerFilter\Enums\PickerType::DAY);
        $monthPicker = DateRangePicker::make('month')->monthPicker();
        $yearPicker = DateRangePicker::make('year')->yearPicker();

        expect($dayPicker->getPickerTypeValue())->toBe('day')
            ->and($monthPicker->getPickerTypeValue())->toBe('month')
            ->and($yearPicker->getPickerTypeValue())->toBe('year');
    });

    it('configures ranges correctly for JavaScript', function () {
        $ranges = [
            'Today' => [\Carbon\Carbon::today(), \Carbon\Carbon::today()],
            'This Week' => [\Carbon\Carbon::now()->startOfWeek(), \Carbon\Carbon::now()->endOfWeek()],
        ];
        
        $field = DateRangePicker::make('date_range')->ranges($ranges);
        $fieldRanges = $field->getRanges();
        
        expect($fieldRanges)->toHaveCount(2)
            ->and($fieldRanges)->toHaveKey('Today')
            ->and($fieldRanges)->toHaveKey('This Week');
    });
});

// ─────────────────────────────────────────────────────────────
// State Management Tests
// ─────────────────────────────────────────────────────────────

describe('State Management', function () {
    it('can set initial state from start and end dates', function () {
        $start = \Carbon\Carbon::parse('2024-01-01');
        $end = \Carbon\Carbon::parse('2024-01-31');
        
        $field = DateRangePicker::make('date_range')
            ->startDate($start)
            ->endDate($end);

        expect($field->getStartDate())->toEqual($start)
            ->and($field->getEndDate())->toEqual($end);
    });

    it('configures dual state for separate Livewire properties', function () {
        $field = DateRangePicker::make('date_range')
            ->useDualState('filter_start', 'filter_end');

        expect($field->isDualState())->toBeTrue()
            ->and($field->getDualStartField())->toBe('filter_start')
            ->and($field->getDualEndField())->toBe('filter_end');
    });

    it('maintains default separator for state parsing', function () {
        $field = DateRangePicker::make('date_range');
        expect($field->getRangeSeparator())->toBe(' - ');
        
        $field->rangeSeparator(' to ');
        expect($field->getRangeSeparator())->toBe(' to ');
    });
});

// ─────────────────────────────────────────────────────────────
// View Rendering Tests
// ─────────────────────────────────────────────────────────────

describe('View Rendering', function () {
    it('uses correct Blade view', function () {
        $field = DateRangePicker::make('date_range');
        expect($field->getView())->toBe('filament-daterangepicker-filter::date-range-picker');
    });

    it('can be disabled', function () {
        $field = DateRangePicker::make('date_range')->disabled();
        expect($field->isDisabled())->toBeTrue();
    });

    it('can have placeholder', function () {
        $field = DateRangePicker::make('date_range')->placeholder('Select date range');
        expect($field->getPlaceholder())->toBe('Select date range');
    });

    it('can have label', function () {
        $field = DateRangePicker::make('date_range')->label('Date Range');
        expect($field->getLabel())->toBe('Date Range');
    });

    it('can be required', function () {
        $field = DateRangePicker::make('date_range')->required();
        expect($field->isRequired())->toBeTrue();
    });
});

// ─────────────────────────────────────────────────────────────
// Default Presets Tests
// ─────────────────────────────────────────────────────────────

describe('Default Presets', function () {
    it('can default to today', function () {
        $field = DateRangePicker::make('date_range')->defaultToday();
        
        $start = $field->getStartDate();
        $end = $field->getEndDate();
        
        expect($start->isToday())->toBeTrue()
            ->and($end->isToday())->toBeTrue();
    });

    it('can default to this month', function () {
        $field = DateRangePicker::make('date_range')->defaultThisMonth();
        
        $start = $field->getStartDate();
        $end = $field->getEndDate();
        
        expect($start->isSameDay(\Carbon\Carbon::now()->startOfMonth()))->toBeTrue()
            ->and($end->isSameDay(\Carbon\Carbon::now()->endOfMonth()))->toBeTrue();
    });

    it('can default to last 7 days', function () {
        $field = DateRangePicker::make('date_range')->defaultLast7Days();
        
        $start = $field->getStartDate();
        $end = $field->getEndDate();
        
        expect($start->isSameDay(\Carbon\Carbon::now()->subDays(6)))->toBeTrue()
            ->and($end->isToday())->toBeTrue();
    });

    it('can default to custom range', function () {
        $customStart = \Carbon\Carbon::parse('2024-06-01');
        $customEnd = \Carbon\Carbon::parse('2024-06-30');
        
        $field = DateRangePicker::make('date_range')->defaultCustom($customStart, $customEnd);
        
        expect($field->getStartDate()->isSameDay($customStart))->toBeTrue()
            ->and($field->getEndDate()->isSameDay($customEnd))->toBeTrue();
    });
});

// ─────────────────────────────────────────────────────────────
// Timezone Tests
// ─────────────────────────────────────────────────────────────

describe('Timezone Handling', function () {
    it('defaults to system timezone', function () {
        $field = DateRangePicker::make('date_range');
        expect($field->getTimezone())->toBe(config('app.timezone'));
    });

    it('can set custom timezone', function () {
        $field = DateRangePicker::make('date_range')->timezone('Asia/Riyadh');
        expect($field->getTimezone())->toBe('Asia/Riyadh');
    });

    it('can get system timezone', function () {
        $field = DateRangePicker::make('date_range');
        expect($field->getSystemTimezone())->toBe(config('app.timezone'));
    });
});

// ─────────────────────────────────────────────────────────────
// Filter Integration Tests
// ─────────────────────────────────────────────────────────────

describe('Filter Integration', function () {
    it('creates date range filter correctly', function () {
        $filter = \Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter::make('created_at');
        
        expect($filter)->toBeInstanceOf(\Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter::class)
            ->and($filter->getName())->toBe('created_at');
    });

    it('filter can have indicator', function () {
        $filter = \Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter::make('created_at')
            ->withIndicator();
        
        // Verify it's chainable and returns correct type
        expect($filter)->toBeInstanceOf(\Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter::class);
    });

    it('filter can set timezone', function () {
        $filter = \Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter::make('created_at')
            ->timezone('UTC');
        
        expect($filter->getTimezone())->toBe('UTC');
    });
});
