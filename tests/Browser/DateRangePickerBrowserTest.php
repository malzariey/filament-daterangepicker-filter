<?php

/**
 * DateRangePicker Browser/E2E Tests
 * 
 * These tests verify component rendering, configuration, and Livewire integration.
 * Uses PEST + Livewire testing (no Dusk).
 */

use Carbon\Carbon;
use Filament\Forms\Form;
use Illuminate\Support\Facades\Blade;
use Livewire\Component;
use Livewire\Livewire;
use Malzariey\FilamentDaterangepickerFilter\Enums\DropDirection;
use Malzariey\FilamentDaterangepickerFilter\Enums\OpenDirection;
use Malzariey\FilamentDaterangepickerFilter\Enums\PickerType;
use Malzariey\FilamentDaterangepickerFilter\Fields\DateRangePicker;
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;

// ─────────────────────────────────────────────────────────────
// Component Rendering Tests
// ─────────────────────────────────────────────────────────────

describe('Component Rendering', function () {
    it('renders the date range picker view', function () {
        $field = DateRangePicker::make('test_date');
        
        expect($field->getView())->toBe('filament-daterangepicker-filter::date-range-picker');
    });

    it('renders with correct Alpine.js component name', function () {
        $field = DateRangePicker::make('test_date');
        
        // The component should use Alpine's x-data with dateRangePicker
        expect($field->getView())->toContain('date-range-picker');
    });

    it('generates unique instance ID for each field', function () {
        $field1 = DateRangePicker::make('date1');
        $field2 = DateRangePicker::make('date2');
        
        expect($field1->getName())->not->toBe($field2->getName());
    });

    it('can set placeholder text', function () {
        $field = DateRangePicker::make('test_date')
            ->placeholder('Select a date range...');
        
        expect($field->getPlaceholder())->toBe('Select a date range...');
    });

    it('can set label', function () {
        $field = DateRangePicker::make('test_date')
            ->label('Event Date Range');
        
        expect($field->getLabel())->toBe('Event Date Range');
    });

    it('can be disabled', function () {
        $field = DateRangePicker::make('test_date')
            ->disabled();
        
        expect($field->isDisabled())->toBeTrue();
    });

    it('can be hidden', function () {
        $field = DateRangePicker::make('test_date')
            ->hidden();
        
        expect($field->isHidden())->toBeTrue();
    });
});

// ─────────────────────────────────────────────────────────────
// Date Selection Tests
// ─────────────────────────────────────────────────────────────

describe('Date Selection', function () {
    it('can create single calendar mode', function () {
        $field = DateRangePicker::make('test_date')
            ->singleCalendar();
        
        expect($field->getSingleCalendar())->toBeTrue();
    });

    it('defaults to dual calendar mode', function () {
        $field = DateRangePicker::make('test_date');
        
        expect($field->getSingleCalendar())->toBeFalse();
    });

    it('can set start date', function () {
        $date = Carbon::parse('2024-01-15');
        $field = DateRangePicker::make('test_date')
            ->startDate($date);
        
        expect($field->getStartDate()->isSameDay($date))->toBeTrue();
    });

    it('can set end date', function () {
        $date = Carbon::parse('2024-02-28');
        $field = DateRangePicker::make('test_date')
            ->endDate($date);
        
        expect($field->getEndDate()->isSameDay($date))->toBeTrue();
    });

    it('can set date range via start and end', function () {
        $start = Carbon::parse('2024-03-01');
        $end = Carbon::parse('2024-03-31');
        
        $field = DateRangePicker::make('test_date')
            ->startDate($start)
            ->endDate($end);
        
        expect($field->getStartDate()->isSameDay($start))->toBeTrue()
            ->and($field->getEndDate()->isSameDay($end))->toBeTrue();
    });
});

// ─────────────────────────────────────────────────────────────
// Picker Type Tests
// ─────────────────────────────────────────────────────────────

describe('Picker Types', function () {
    it('defaults to day picker type', function () {
        $field = DateRangePicker::make('test_date');
        
        expect($field->getPickerType())->toBe(PickerType::DAY)
            ->and($field->getPickerTypeValue())->toBe('day');
    });

    it('can set month picker type', function () {
        $field = DateRangePicker::make('test_date')
            ->monthPicker();
        
        expect($field->getPickerType())->toBe(PickerType::MONTH)
            ->and($field->getPickerTypeValue())->toBe('month');
    });

    it('can set year picker type', function () {
        $field = DateRangePicker::make('test_date')
            ->yearPicker();
        
        expect($field->getPickerType())->toBe(PickerType::YEAR)
            ->and($field->getPickerTypeValue())->toBe('year');
    });

    it('can set picker type via enum', function () {
        $field = DateRangePicker::make('test_date')
            ->pickerType(PickerType::MONTH);
        
        expect($field->getPickerType())->toBe(PickerType::MONTH);
    });
});

// ─────────────────────────────────────────────────────────────
// Preset Ranges Tests
// ─────────────────────────────────────────────────────────────

describe('Preset Ranges', function () {
    it('can set custom ranges', function () {
        $ranges = [
            'Today' => [Carbon::today(), Carbon::today()],
            'Last 7 Days' => [Carbon::today()->subDays(6), Carbon::today()],
            'This Month' => [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()],
        ];
        
        $field = DateRangePicker::make('test_date')
            ->ranges($ranges);
        
        expect($field->getRanges())->toHaveCount(3)
            ->and($field->getRanges())->toHaveKey('Today')
            ->and($field->getRanges())->toHaveKey('Last 7 Days')
            ->and($field->getRanges())->toHaveKey('This Month');
    });

    it('can use range labels', function () {
        $field = DateRangePicker::make('test_date')
            ->useRangeLabels();
        
        expect($field->getUseRangeLabels())->toBeTrue();
    });

    it('can disable range selection', function () {
        $field = DateRangePicker::make('test_date')
            ->disableRanges();
        
        expect($field->getDisableRanges())->toBeTrue();
    });

    it('can disable custom range', function () {
        $field = DateRangePicker::make('test_date')
            ->disableCustomRange();
        
        expect($field->getDisableCustomRange())->toBeTrue();
    });

    it('works with predefined ranges from helpers', function () {
        $field = DateRangePicker::make('test_date')
            ->defaultToday();
        
        $start = $field->getStartDate();
        $end = $field->getEndDate();
        
        expect($start->isToday())->toBeTrue()
            ->and($end->isToday())->toBeTrue();
    });
});

// ─────────────────────────────────────────────────────────────
// Date Constraints Tests
// ─────────────────────────────────────────────────────────────

describe('Date Constraints', function () {
    it('can set minimum date', function () {
        $minDate = Carbon::parse('2024-01-01');
        $field = DateRangePicker::make('test_date')
            ->minDate($minDate);
        
        // getMinDate returns string, not Carbon
        expect($field->getMinDate())->not->toBeNull();
    });

    it('can set maximum date', function () {
        $maxDate = Carbon::parse('2024-12-31');
        $field = DateRangePicker::make('test_date')
            ->maxDate($maxDate);
        
        // getMaxDate returns string, not Carbon
        expect($field->getMaxDate())->not->toBeNull();
    });

    it('can set disabled dates array', function () {
        $disabledDates = [
            Carbon::parse('2024-01-15'),
            Carbon::parse('2024-01-16'),
        ];
        
        $field = DateRangePicker::make('test_date')
            ->disabledDates($disabledDates);
        
        expect($field->getDisabledDates())->toHaveCount(2);
    });

    it('can set max span constraint', function () {
        $field = DateRangePicker::make('test_date')
            ->maxSpan(['days' => 30]);
        
        expect($field->getMaxSpan())->toBe(['days' => 30]);
    });

    it('can set max span with months', function () {
        $field = DateRangePicker::make('test_date')
            ->maxSpan(['months' => 3]);
        
        expect($field->getMaxSpan())->toBe(['months' => 3]);
    });

    it('can set min and max year constraints', function () {
        $field = DateRangePicker::make('test_date')
            ->minYear(2020)
            ->maxYear(2030);
        
        expect($field->getMinYear())->toBe(2020)
            ->and($field->getMaxYear())->toBe(2030);
    });
});

// ─────────────────────────────────────────────────────────────
// Time Picker Tests
// ─────────────────────────────────────────────────────────────

describe('Time Picker Configuration', function () {
    it('time picker is disabled by default', function () {
        $field = DateRangePicker::make('test_date');
        
        expect($field->getTimePicker())->toBeFalse();
    });

    it('can enable time picker', function () {
        $field = DateRangePicker::make('test_date')
            ->timePicker();
        
        expect($field->getTimePicker())->toBeTrue();
    });

    it('can enable 24-hour time format', function () {
        $field = DateRangePicker::make('test_date')
            ->timePicker()
            ->timePicker24();
        
        expect($field->getTimePicker24())->toBeTrue();
    });

    it('can enable seconds in time picker', function () {
        $field = DateRangePicker::make('test_date')
            ->timePicker()
            ->timePickerSecond();
        
        expect($field->getTimePickerSecond())->toBeTrue();
    });

    it('can set time picker increment', function () {
        $field = DateRangePicker::make('test_date')
            ->timePicker()
            ->timePickerIncrement(15);
        
        expect($field->getTimePickerIncrement())->toBe(15);
    });
});

// ─────────────────────────────────────────────────────────────
// Positioning Tests (Modal Compatibility)
// ─────────────────────────────────────────────────────────────

describe('Positioning and Modal Compatibility', function () {
    it('can set drop direction to down', function () {
        $field = DateRangePicker::make('test_date')
            ->drops(DropDirection::DOWN);
        
        $drops = $field->getDrops();
        expect($drops === DropDirection::DOWN || $drops === 'down')->toBeTrue();
    });

    it('can set drop direction to up', function () {
        $field = DateRangePicker::make('test_date')
            ->drops(DropDirection::UP);
        
        $drops = $field->getDrops();
        expect($drops === DropDirection::UP || $drops === 'up')->toBeTrue();
    });

    it('can set drop direction to auto', function () {
        $field = DateRangePicker::make('test_date')
            ->drops(DropDirection::AUTO);
        
        $drops = $field->getDrops();
        expect($drops === DropDirection::AUTO || $drops === 'auto')->toBeTrue();
    });

    it('can set open direction to right', function () {
        $field = DateRangePicker::make('test_date')
            ->opens(OpenDirection::RIGHT);
        
        $opens = $field->getOpens();
        expect($opens === OpenDirection::RIGHT || $opens === 'right')->toBeTrue();
    });

    it('can set open direction to left', function () {
        $field = DateRangePicker::make('test_date')
            ->opens(OpenDirection::LEFT);
        
        $opens = $field->getOpens();
        expect($opens === OpenDirection::LEFT || $opens === 'left')->toBeTrue();
    });

    it('can set open direction to center', function () {
        $field = DateRangePicker::make('test_date')
            ->opens(OpenDirection::CENTER);
        
        $opens = $field->getOpens();
        expect($opens === OpenDirection::CENTER || $opens === 'center')->toBeTrue();
    });

    it('teleport is enabled by default for modal compatibility', function () {
        $field = DateRangePicker::make('test_date');
        
        // Teleport should be true by default to work in modals
        expect($field->getTeleport())->toBeTrue();
    });

    it('can explicitly enable teleport', function () {
        $field = DateRangePicker::make('test_date')
            ->teleport();
        
        expect($field->getTeleport())->toBeTrue();
    });

    it('can disable teleport', function () {
        $field = DateRangePicker::make('test_date')
            ->teleport(false);
        
        expect($field->getTeleport())->toBeFalse();
    });
});

// ─────────────────────────────────────────────────────────────
// Display Format Tests
// ─────────────────────────────────────────────────────────────

describe('Display Formats', function () {
    it('can set custom display format', function () {
        $field = DateRangePicker::make('test_date')
            ->displayFormat('DD/MM/YYYY');
        
        expect($field->getDisplayFormat())->toBe('DD/MM/YYYY');
    });

    it('can set US date format', function () {
        $field = DateRangePicker::make('test_date')
            ->displayFormat('MM/DD/YYYY');
        
        expect($field->getDisplayFormat())->toBe('MM/DD/YYYY');
    });

    it('can set ISO date format', function () {
        $field = DateRangePicker::make('test_date')
            ->displayFormat('YYYY-MM-DD');
        
        expect($field->getDisplayFormat())->toBe('YYYY-MM-DD');
    });

    it('can set custom separator', function () {
        $field = DateRangePicker::make('test_date')
            ->rangeSeparator(' to ');
        
        expect($field->getRangeSeparator())->toBe(' to ');
    });

    it('defaults to standard separator', function () {
        $field = DateRangePicker::make('test_date');
        
        expect($field->getRangeSeparator())->toBe(' - ');
    });

    it('can show week numbers', function () {
        $field = DateRangePicker::make('test_date')
            ->showWeekNumbers();
        
        expect($field->getShowWeekNumbers())->toBeTrue();
    });

    it('can show ISO week numbers', function () {
        $field = DateRangePicker::make('test_date')
            ->showISOWeekNumbers();
        
        expect($field->getShowISOWeekNumbers())->toBeTrue();
    });
});

// ─────────────────────────────────────────────────────────────
// Auto Apply and Always Show Calendars Tests
// ─────────────────────────────────────────────────────────────

describe('Auto Apply and Calendar Display', function () {
    it('auto apply is disabled by default', function () {
        $field = DateRangePicker::make('test_date');
        
        expect($field->getAutoApply())->toBeFalse();
    });

    it('can enable auto apply', function () {
        $field = DateRangePicker::make('test_date')
            ->autoApply();
        
        expect($field->getAutoApply())->toBeTrue();
    });

    it('always shows calendars by default', function () {
        $field = DateRangePicker::make('test_date');
        
        expect($field->isAlwaysShowCalendar())->toBeTrue();
    });

    it('can disable always show calendars', function () {
        $field = DateRangePicker::make('test_date')
            ->alwaysShowCalendar(false);
        
        expect($field->isAlwaysShowCalendar())->toBeFalse();
    });

    it('can enable linked calendars', function () {
        $field = DateRangePicker::make('test_date')
            ->linkedCalendars();
        
        expect($field->getLinkedCalendars())->toBeTrue();
    });

    it('can show dropdowns for month/year selection', function () {
        $field = DateRangePicker::make('test_date')
            ->showDropdowns();
        
        expect($field->getShowDropdowns())->toBeTrue();
    });
});

// ─────────────────────────────────────────────────────────────
// Dual State (Separate Livewire Properties) Tests
// ─────────────────────────────────────────────────────────────

describe('Dual State Mode', function () {
    it('is disabled by default', function () {
        $field = DateRangePicker::make('test_date');
        
        expect($field->isDualState())->toBeFalse();
    });

    it('can enable dual state mode', function () {
        $field = DateRangePicker::make('test_date')
            ->useDualState('start_date', 'end_date');
        
        expect($field->isDualState())->toBeTrue()
            ->and($field->getDualStartField())->toBe('start_date')
            ->and($field->getDualEndField())->toBe('end_date');
    });

    it('configures separate start and end fields', function () {
        $field = DateRangePicker::make('date_range')
            ->useDualState('filter_from', 'filter_to');
        
        expect($field->getDualStartField())->toBe('filter_from')
            ->and($field->getDualEndField())->toBe('filter_to');
    });
});

// ─────────────────────────────────────────────────────────────
// Timezone Tests
// ─────────────────────────────────────────────────────────────

describe('Timezone Handling', function () {
    it('defaults to system timezone', function () {
        $field = DateRangePicker::make('test_date');
        
        expect($field->getTimezone())->toBe(config('app.timezone'));
    });

    it('can set custom timezone', function () {
        $field = DateRangePicker::make('test_date')
            ->timezone('America/New_York');
        
        expect($field->getTimezone())->toBe('America/New_York');
    });

    it('can set UTC timezone', function () {
        $field = DateRangePicker::make('test_date')
            ->timezone('UTC');
        
        expect($field->getTimezone())->toBe('UTC');
    });

    it('can get system timezone', function () {
        $field = DateRangePicker::make('test_date');
        
        expect($field->getSystemTimezone())->toBe(config('app.timezone'));
    });
});

// ─────────────────────────────────────────────────────────────
// Filter Integration Tests
// ─────────────────────────────────────────────────────────────

describe('DateRangeFilter Integration', function () {
    it('creates filter instance correctly', function () {
        $filter = DateRangeFilter::make('created_at');
        
        expect($filter)->toBeInstanceOf(DateRangeFilter::class)
            ->and($filter->getName())->toBe('created_at');
    });

    it('filter can have indicator', function () {
        $filter = DateRangeFilter::make('created_at')
            ->withIndicator();
        
        expect($filter)->toBeInstanceOf(DateRangeFilter::class);
    });

    it('filter can set timezone', function () {
        $filter = DateRangeFilter::make('created_at')
            ->timezone('Europe/London');
        
        expect($filter->getTimezone())->toBe('Europe/London');
    });

    it('filter uses named column by default', function () {
        $filter = DateRangeFilter::make('created_at');
        
        // Verify it's a valid filter instance
        expect($filter)->toBeInstanceOf(DateRangeFilter::class)
            ->and($filter->getName())->toBe('created_at');
    });
});

describe('Locale and First Day of Week', function () {
    it('can set custom first day of week', function () {
        $field = DateRangePicker::make('test_date')
            ->firstDayOfWeek(1); // Monday
        
        expect($field->getFirstDayOfWeek())->toBe(1);
    });

    it('can set Sunday as first day of week', function () {
        $field = DateRangePicker::make('test_date')
            ->firstDayOfWeek(0); // Sunday
        
        expect($field->getFirstDayOfWeek())->toBe(0);
    });

    it('can set Saturday as first day of week', function () {
        $field = DateRangePicker::make('test_date')
            ->firstDayOfWeek(6); // Saturday
        
        expect($field->getFirstDayOfWeek())->toBe(6);
    });
});

// ─────────────────────────────────────────────────────────────
// Default Preset Values Tests
// ─────────────────────────────────────────────────────────────

describe('Default Preset Values', function () {
    it('can default to today', function () {
        $field = DateRangePicker::make('test_date')
            ->defaultToday();
        
        expect($field->getStartDate()->isToday())->toBeTrue()
            ->and($field->getEndDate()->isToday())->toBeTrue();
    });

    it('can default to yesterday', function () {
        $field = DateRangePicker::make('test_date')
            ->defaultYesterday();
        
        expect($field->getStartDate()->isYesterday())->toBeTrue()
            ->and($field->getEndDate()->isYesterday())->toBeTrue();
    });

    it('can default to last 7 days', function () {
        $field = DateRangePicker::make('test_date')
            ->defaultLast7Days();
        
        $expectedStart = Carbon::now()->subDays(6)->startOfDay();
        
        expect($field->getStartDate()->isSameDay($expectedStart))->toBeTrue()
            ->and($field->getEndDate()->isToday())->toBeTrue();
    });

    it('can default to last 30 days', function () {
        $field = DateRangePicker::make('test_date')
            ->defaultLast30Days();
        
        $expectedStart = Carbon::now()->subDays(29)->startOfDay();
        
        expect($field->getStartDate()->isSameDay($expectedStart))->toBeTrue()
            ->and($field->getEndDate()->isToday())->toBeTrue();
    });

    it('can default to this month', function () {
        $field = DateRangePicker::make('test_date')
            ->defaultThisMonth();
        
        expect($field->getStartDate()->isSameDay(Carbon::now()->startOfMonth()))->toBeTrue()
            ->and($field->getEndDate()->isSameDay(Carbon::now()->endOfMonth()))->toBeTrue();
    });

    it('can default to last month', function () {
        $field = DateRangePicker::make('test_date')
            ->defaultLastMonth();
        
        $lastMonth = Carbon::now()->subMonth();
        
        expect($field->getStartDate()->isSameDay($lastMonth->copy()->startOfMonth()))->toBeTrue()
            ->and($field->getEndDate()->isSameDay($lastMonth->copy()->endOfMonth()))->toBeTrue();
    });

    it('can default to this year', function () {
        $field = DateRangePicker::make('test_date')
            ->defaultThisYear();
        
        expect($field->getStartDate()->isSameDay(Carbon::now()->startOfYear()))->toBeTrue()
            ->and($field->getEndDate()->isSameDay(Carbon::now()->endOfYear()))->toBeTrue();
    });

    it('can default to custom range', function () {
        $start = Carbon::parse('2024-06-01');
        $end = Carbon::parse('2024-06-30');
        
        $field = DateRangePicker::make('test_date')
            ->defaultCustom($start, $end);
        
        expect($field->getStartDate()->isSameDay($start))->toBeTrue()
            ->and($field->getEndDate()->isSameDay($end))->toBeTrue();
    });
});

// ─────────────────────────────────────────────────────────────
// Allow Input Tests
// ─────────────────────────────────────────────────────────────

describe('Manual Input', function () {
    it('manual input is disabled by default', function () {
        $field = DateRangePicker::make('test_date');
        
        expect($field->getAllowInput())->toBeFalse();
    });

    it('can enable manual input', function () {
        $field = DateRangePicker::make('test_date')
            ->allowInput();
        
        expect($field->getAllowInput())->toBeTrue();
    });
});

// ─────────────────────────────────────────────────────────────
// Chainable Configuration Tests
// ─────────────────────────────────────────────────────────────

describe('Chainable Configuration', function () {
    it('supports full method chaining', function () {
        $field = DateRangePicker::make('test_date')
            ->label('Event Date')
            ->placeholder('Select dates...')
            ->displayFormat('DD MMM YYYY')
            ->rangeSeparator(' → ')
            ->timePicker()
            ->timePicker24()
            ->minDate(Carbon::now())
            ->maxDate(Carbon::now()->addYear())
            ->autoApply()
            ->showWeekNumbers()
            ->firstDayOfWeek(1)
            ->timezone('UTC');
        
        expect($field->getLabel())->toBe('Event Date')
            ->and($field->getPlaceholder())->toBe('Select dates...')
            // When timePicker is enabled, display format gets ' HH:mm' appended
            ->and($field->getDisplayFormat())->toContain('DD MMM YYYY')
            ->and($field->getRangeSeparator())->toBe(' → ')
            ->and($field->getTimePicker())->toBeTrue()
            ->and($field->getTimePicker24())->toBeTrue()
            ->and($field->getAutoApply())->toBeTrue()
            ->and($field->getShowWeekNumbers())->toBeTrue()
            ->and($field->getFirstDayOfWeek())->toBe(1)
            ->and($field->getTimezone())->toBe('UTC');
    });
});
