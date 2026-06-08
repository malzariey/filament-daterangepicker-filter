/**
 * DateRangePicker Component - Comprehensive Vitest Test Suite
 * 
 * Tests for the Alpine.js/Day.js based date range picker component.
 * Covers initialization, interactions, advanced features, and Livewire integration.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
    createTestComponent,
    createMockWire,
    flushPromises,
    clickDay,
    hoverDay,
    dayjs,
} from './setup.js';

// ═══════════════════════════════════════════════════════════════════════════
// 1. INITIALIZATION & STATE
// ═══════════════════════════════════════════════════════════════════════════

describe('Initialization & State', () => {
    describe('Default State', () => {
        it('should initialize with empty selection when no initial state', async () => {
            const { component } = await createTestComponent();

            expect(component.selection.start).toBeNull();
            expect(component.selection.end).toBeNull();
            expect(component.open).toBe(false);
        });

        it('should initialize with correct default configuration', async () => {
            const { component } = await createTestComponent();

            expect(component.config.displayFormat).toBe('DD/MM/YYYY');
            expect(component.config.separator).toBe(' - ');
            expect(component.config.firstDay).toBe(0);
            expect(component.config.singleCalendar).toBe(false);
            expect(component.config.autoApply).toBe(false);
        });

        it('should generate unique instance ID', async () => {
            const { component: comp1 } = await createTestComponent();
            const { component: comp2 } = await createTestComponent();

            expect(comp1.instanceId).not.toBe(comp2.instanceId);
        });
    });

    describe('Initial State Parsing', () => {
        it('should parse single date state correctly', async () => {
            const { component } = await createTestComponent({
                singleCalendar: true,
                initialState: '15/01/2026',
            });

            await flushPromises();

            expect(component.selection.start).not.toBeNull();
            expect(component.selection.start.format('DD/MM/YYYY')).toBe('15/01/2026');
        });

        it('should parse date range state correctly', async () => {
            const { component } = await createTestComponent({
                initialState: '01/01/2026 - 15/01/2026',
            });

            await flushPromises();

            expect(component.selection.start).not.toBeNull();
            expect(component.selection.end).not.toBeNull();
            expect(component.selection.start.format('DD/MM/YYYY')).toBe('01/01/2026');
            expect(component.selection.end.format('DD/MM/YYYY')).toBe('15/01/2026');
        });

        it('should handle empty state gracefully', async () => {
            const { component } = await createTestComponent({
                initialState: '',
            });

            expect(component.selection.start).toBeNull();
            expect(component.selection.end).toBeNull();
        });

        it('should handle invalid date format gracefully', async () => {
            const { component } = await createTestComponent({
                initialState: 'invalid-date',
            });

            // Should not crash and selection should be null
            expect(component.selection.start).toBeNull();
        });
    });

    describe('Locale Configuration', () => {
        it('should configure with English locale by default', async () => {
            const { component } = await createTestComponent();

            expect(component.config.locale).toBe('en');
        });

        it('should accept custom locale configuration', async () => {
            const { component } = await createTestComponent({
                locale: 'ar',
            });

            expect(component.config.locale).toBe('ar');
        });

        it('should have correct weekday labels', async () => {
            const { component } = await createTestComponent();

            const weekDays = component.weekDays;
            expect(weekDays).toHaveLength(7);
            expect(weekDays[0]).toBe('Su'); // Default first day is Sunday
        });

        it('should respect firstDay configuration', async () => {
            const { component } = await createTestComponent({
                firstDay: 1, // Monday
            });

            const weekDays = component.weekDays;
            expect(weekDays[0]).toBe('Mo');
        });
    });

    describe('Timezone Configuration', () => {
        it('should store timezone configuration', async () => {
            const { component } = await createTestComponent({
                timezone: 'America/New_York',
            });

            expect(component.config.timezone).toBe('America/New_York');
        });
    });
});

// ═══════════════════════════════════════════════════════════════════════════
// 2. CORE INTERACTIONS (UI)
// ═══════════════════════════════════════════════════════════════════════════

describe('Core Interactions', () => {
    describe('Opening/Closing Picker', () => {
        it('should open picker when toggle() is called while closed', async () => {
            const { component } = await createTestComponent();

            expect(component.open).toBe(false);

            await component.toggle();
            await flushPromises();

            expect(component.open).toBe(true);
        });

        it('should close picker when toggle() is called while open', async () => {
            const { component } = await createTestComponent();

            await component.openPicker();
            await flushPromises();
            expect(component.open).toBe(true);

            component.toggle();
            expect(component.open).toBe(false);
        });

        it('should close picker and reset selection on cancel()', async () => {
            const { component } = await createTestComponent({
                initialState: '01/01/2026 - 05/01/2026',
            });

            await component.openPicker();

            // Make a new selection
            clickDay(component, '2026-01-10');
            clickDay(component, '2026-01-15');

            // Cancel should reset to original
            component.cancel();

            expect(component.open).toBe(false);
            expect(component.selection.start.format('DD/MM/YYYY')).toBe('01/01/2026');
        });

        it('should expose isOpen() getter', async () => {
            const { component } = await createTestComponent();

            expect(component.isOpen()).toBe(false);

            await component.openPicker();
            await flushPromises();

            expect(component.isOpen()).toBe(true);
        });
    });

    describe('Calendar Navigation', () => {
        it('should navigate to next month', async () => {
            const { component } = await createTestComponent();

            const initialMonth = component.viewDate.month();
            component.nextMonth();

            expect(component.viewDate.month()).toBe((initialMonth + 1) % 12);
        });

        it('should navigate to previous month', async () => {
            const { component } = await createTestComponent();

            // Start in February to avoid year wrap issues
            component.viewDate = dayjs('2026-02-15');

            component.prevMonth();

            expect(component.viewDate.month()).toBe(0); // January
        });

        it('should set month directly', async () => {
            const { component } = await createTestComponent();

            component.setMonth(5); // June

            expect(component.viewDate.month()).toBe(5);
        });

        it('should set year directly', async () => {
            const { component } = await createTestComponent();

            component.setYear(2030);

            expect(component.viewDate.year()).toBe(2030);
        });

        it('should navigate to next year (month picker)', async () => {
            const { component } = await createTestComponent({
                pickerType: 'month',
            });

            const initialYear = component.viewDate.year();
            component.nextYear();

            expect(component.viewDate.year()).toBe(initialYear + 1);
        });

        it('should navigate to previous year (month picker)', async () => {
            const { component } = await createTestComponent({
                pickerType: 'month',
            });

            const initialYear = component.viewDate.year();
            component.prevYear();

            expect(component.viewDate.year()).toBe(initialYear - 1);
        });

        it('should navigate to next decade (year picker)', async () => {
            const { component } = await createTestComponent({
                pickerType: 'year',
            });

            const initialYear = component.viewDate.year();
            component.nextDecade();

            expect(component.viewDate.year()).toBe(initialYear + 10);
        });

        it('should navigate to previous decade (year picker)', async () => {
            const { component } = await createTestComponent({
                pickerType: 'year',
            });

            const initialYear = component.viewDate.year();
            component.prevDecade();

            expect(component.viewDate.year()).toBe(initialYear - 10);
        });
    });

    describe('Date Selection', () => {
        it('should select start date on first click', async () => {
            const { component } = await createTestComponent();

            clickDay(component, '2026-01-15');

            expect(component.selection.start).not.toBeNull();
            expect(component.selection.start.format('YYYY-MM-DD')).toBe('2026-01-15');
            expect(component.selection.end).toBeNull();
        });

        it('should select end date on second click', async () => {
            const { component } = await createTestComponent();

            clickDay(component, '2026-01-05');
            clickDay(component, '2026-01-15');

            expect(component.selection.start.format('YYYY-MM-DD')).toBe('2026-01-05');
            expect(component.selection.end.format('YYYY-MM-DD')).toBe('2026-01-15');
        });

        it('should swap dates if end is before start', async () => {
            const { component } = await createTestComponent();

            clickDay(component, '2026-01-15');
            clickDay(component, '2026-01-05');

            expect(component.selection.start.format('YYYY-MM-DD')).toBe('2026-01-05');
            expect(component.selection.end.format('YYYY-MM-DD')).toBe('2026-01-15');
        });

        it('should start new selection after range is complete', async () => {
            const { component } = await createTestComponent();

            // First range
            clickDay(component, '2026-01-05');
            clickDay(component, '2026-01-10');

            // Start new selection
            clickDay(component, '2026-01-20');

            expect(component.selection.start.format('YYYY-MM-DD')).toBe('2026-01-20');
            expect(component.selection.end).toBeNull();
        });

        it('should auto-apply when autoApply is true', async () => {
            const { component } = await createTestComponent({
                autoApply: true,
            });

            const syncSpy = vi.spyOn(component, 'syncState');

            await component.openPicker();
            clickDay(component, '2026-01-05');
            clickDay(component, '2026-01-10');

            expect(syncSpy).toHaveBeenCalled();
        });

        it('should select single date in singleCalendar mode', async () => {
            const { component } = await createTestComponent({
                singleCalendar: true,
            });

            clickDay(component, '2026-01-15');

            expect(component.selection.start.format('YYYY-MM-DD')).toBe('2026-01-15');
            expect(component.selection.end.format('YYYY-MM-DD')).toBe('2026-01-15');
        });

        it('should not select disabled days', async () => {
            const { component } = await createTestComponent();

            const disabledDay = {
                date: dayjs('2026-01-15'),
                disabled: true,
            };

            component.handleDayClick(disabledDay);

            expect(component.selection.start).toBeNull();
        });
    });

    describe('Hover State', () => {
        it('should update hoverDate on day hover', async () => {
            const { component } = await createTestComponent();

            hoverDay(component, '2026-01-15');

            expect(component.hoverDate).not.toBeNull();
            expect(component.hoverDate.format('YYYY-MM-DD')).toBe('2026-01-15');
        });

        it('should update tempEndDate when hovering during selection', async () => {
            const { component } = await createTestComponent();

            // Start selection
            clickDay(component, '2026-01-05');

            // Hover over potential end date
            hoverDay(component, '2026-01-15');

            expect(component.tempEndDate).not.toBeNull();
        });

        it('should clear hoverDate on leave', async () => {
            const { component } = await createTestComponent();

            hoverDay(component, '2026-01-15');
            component.handleDayLeave();

            expect(component.hoverDate).toBeNull();
        });
    });
});

// ═══════════════════════════════════════════════════════════════════════════
// 3. ADVANCED FEATURES
// ═══════════════════════════════════════════════════════════════════════════

describe('Advanced Features', () => {
    describe('Predefined Ranges', () => {
        beforeEach(() => {
            // Mock current date to 2026-01-09 for deterministic tests
            vi.useFakeTimers();
            vi.setSystemTime(new Date(2026, 0, 9, 12, 0, 0)); // Jan 9, 2026
        });

        afterEach(() => {
            vi.useRealTimers();
        });

        it('should detect when hasRanges is true', async () => {
            const { component } = await createTestComponent({
                ranges: {
                    'Today': [dayjs().startOf('day').toISOString(), dayjs().endOf('day').toISOString()],
                    'Yesterday': [dayjs().subtract(1, 'day').startOf('day').toISOString(), dayjs().subtract(1, 'day').endOf('day').toISOString()],
                },
            });

            expect(component.hasRanges).toBe(true);
        });

        it('should detect when hasRanges is false', async () => {
            const { component } = await createTestComponent({
                ranges: {},
            });

            expect(component.hasRanges).toBe(false);
        });

        it('should detect when hasRanges is false due to disableRange', async () => {
            const { component } = await createTestComponent({
                ranges: { 'Today': ['2026-01-09', '2026-01-09'] },
                disableRange: true,
            });

            expect(component.hasRanges).toBe(false);
        });

        it('should select preset range "Today"', async () => {
            const today = dayjs();

            const { component } = await createTestComponent({
                ranges: {
                    'Today': [today.startOf('day').toISOString(), today.endOf('day').toISOString()],
                },
            });

            component.selectPreset('Today');

            expect(component.selection.start.format('YYYY-MM-DD')).toBe('2026-01-09');
            expect(component.selection.end.format('YYYY-MM-DD')).toBe('2026-01-09');
        });

        it('should select preset range "Last 7 Days"', async () => {
            const today = dayjs();
            const sevenDaysAgo = today.subtract(6, 'days');

            const { component } = await createTestComponent({
                ranges: {
                    'Last 7 Days': [sevenDaysAgo.startOf('day').toISOString(), today.endOf('day').toISOString()],
                },
            });

            component.selectPreset('Last 7 Days');

            expect(component.selection.start.format('YYYY-MM-DD')).toBe('2026-01-03');
            expect(component.selection.end.format('YYYY-MM-DD')).toBe('2026-01-09');
        });

        it('should identify active range correctly', async () => {
            const today = dayjs();

            const { component } = await createTestComponent({
                ranges: {
                    'Today': [today.startOf('day').toISOString(), today.endOf('day').toISOString()],
                },
            });

            component.selectPreset('Today');

            expect(component.isActiveRange('Today')).toBe(true);
        });

        it('should update viewDate when selecting preset', async () => {
            const today = dayjs();

            const { component } = await createTestComponent({
                ranges: {
                    'Today': [today.startOf('day').toISOString(), today.endOf('day').toISOString()],
                },
            });

            // Move view to different month
            component.viewDate = dayjs('2025-06-01');

            component.selectPreset('Today');

            // Should snap back to the selected date's month
            expect(component.viewDate.month()).toBe(0); // January
        });
    });

    describe('Disabled Dates', () => {
        it('should mark date as disabled when in disabledDates array', async () => {
            const { component } = await createTestComponent({
                disabledDates: ['2026-01-15', '2026-01-16', '2026-01-17'],
            });

            const date = dayjs('2026-01-15');
            expect(component.isDisabled(date)).toBe(true);
        });

        it('should not mark date as disabled when not in disabledDates', async () => {
            const { component } = await createTestComponent({
                disabledDates: ['2026-01-15'],
            });

            const date = dayjs('2026-01-20');
            expect(component.isDisabled(date)).toBe(false);
        });

        it('should prevent selection of disabled dates', async () => {
            const { component } = await createTestComponent({
                disabledDates: ['2026-01-15'],
            });

            const disabledDay = {
                date: dayjs('2026-01-15'),
                disabled: true,
            };

            component.handleDayClick(disabledDay);

            expect(component.selection.start).toBeNull();
        });
    });

    describe('Min/Max Date Constraints', () => {
        it('should mark dates before minDate as disabled', async () => {
            const { component } = await createTestComponent({
                minDate: '2026-01-10',
            });

            expect(component.isDisabled(dayjs('2026-01-05'))).toBe(true);
            expect(component.isDisabled(dayjs('2026-01-10'))).toBe(false);
            expect(component.isDisabled(dayjs('2026-01-15'))).toBe(false);
        });

        it('should mark dates after maxDate as disabled', async () => {
            const { component } = await createTestComponent({
                maxDate: '2026-01-20',
            });

            expect(component.isDisabled(dayjs('2026-01-25'))).toBe(true);
            expect(component.isDisabled(dayjs('2026-01-20'))).toBe(false);
            expect(component.isDisabled(dayjs('2026-01-15'))).toBe(false);
        });

        it('should handle both minDate and maxDate together', async () => {
            const { component } = await createTestComponent({
                minDate: '2026-01-10',
                maxDate: '2026-01-20',
            });

            expect(component.isDisabled(dayjs('2026-01-05'))).toBe(true);
            expect(component.isDisabled(dayjs('2026-01-15'))).toBe(false);
            expect(component.isDisabled(dayjs('2026-01-25'))).toBe(true);
        });
    });

    describe('Max Span', () => {
        it('should disable dates beyond maxSpan when selecting end date', async () => {
            const { component } = await createTestComponent({
                maxSpan: { days: 7 },
            });

            // Select start date
            clickDay(component, '2026-01-10');

            // Check that dates more than 7 days after are disabled
            expect(component.isDisabled(dayjs('2026-01-17'))).toBe(false);
            expect(component.isDisabled(dayjs('2026-01-18'))).toBe(true);
        });

        it('should handle maxSpan with months', async () => {
            const { component } = await createTestComponent({
                maxSpan: { months: 1 },
            });

            clickDay(component, '2026-01-10');

            expect(component.isDisabled(dayjs('2026-02-09'))).toBe(false);
            expect(component.isDisabled(dayjs('2026-02-11'))).toBe(true);
        });
    });

    describe('Time Picker', () => {
        it('should initialize with default time values', async () => {
            const { component } = await createTestComponent({
                timePicker: true,
            });

            expect(component.startTime).toBeDefined();
            expect(component.endTime).toBeDefined();
            expect(component.startTime.hour).toBe(0);
            expect(component.endTime.hour).toBe(23);
        });

        it('should apply time to date selection', async () => {
            const { component } = await createTestComponent({
                timePicker: true,
                timePicker24: true,
            });

            const date = dayjs('2026-01-15').startOf('day');
            const time = { hour: 14, minute: 30, second: 0, ampm: 'PM' };

            const result = component.applyTime(date, time);

            expect(result.hour()).toBe(14);
            expect(result.minute()).toBe(30);
        });

        it('should extract time from date correctly', async () => {
            const { component } = await createTestComponent({
                timePicker: true,
                timePicker24: true,
            });

            const date = dayjs('2026-01-15 14:30:45');
            const time = component.extractTime(date);

            expect(time.hour).toBe(14);
            expect(time.minute).toBe(30);
            expect(time.second).toBe(45);
        });

        it('should convert 12-hour format correctly', async () => {
            const { component } = await createTestComponent({
                timePicker: true,
                timePicker24: false,
            });

            const date = dayjs('2026-01-15 14:30:00');
            const time = component.extractTime(date);

            expect(time.hour).toBe(2);
            expect(time.ampm).toBe('PM');
        });

        it('should generate correct hour options for 24-hour mode', async () => {
            const { component } = await createTestComponent({
                timePicker: true,
                timePicker24: true,
            });

            expect(component.hourOptions).toHaveLength(24);
            expect(component.hourOptions[0].value).toBe(0);
            expect(component.hourOptions[23].value).toBe(23);
        });

        it('should generate correct hour options for 12-hour mode', async () => {
            const { component } = await createTestComponent({
                timePicker: true,
                timePicker24: false,
            });

            expect(component.hourOptions).toHaveLength(12);
            expect(component.hourOptions[0].value).toBe(1);
            expect(component.hourOptions[11].value).toBe(12);
        });

        it('should respect timePickerIncrement for minutes', async () => {
            const { component } = await createTestComponent({
                timePicker: true,
                timePickerIncrement: 15,
            });

            expect(component.minuteOptions).toHaveLength(4);
            expect(component.minuteOptions.map(m => m.value)).toEqual([0, 15, 30, 45]);
        });
    });

    describe('Month Picker Mode', () => {
        it('should identify as month picker', async () => {
            const { component } = await createTestComponent({
                pickerType: 'month',
            });

            expect(component.isMonthPicker).toBe(true);
            expect(component.isDayPicker).toBe(false);
        });

        it('should generate month grid correctly', async () => {
            const { component } = await createTestComponent({
                pickerType: 'month',
            });

            const grid = component.generateMonthGrid(0);

            expect(grid.months).toHaveLength(12);
            expect(grid.months[0].shortName).toBe('Jan');
            expect(grid.months[11].shortName).toBe('Dec');
        });

        it('should select month range', async () => {
            const { component } = await createTestComponent({
                pickerType: 'month',
            });

            const janMonth = {
                date: dayjs('2026-01-01'),
                disabled: false,
            };
            const marMonth = {
                date: dayjs('2026-03-01'),
                disabled: false,
            };

            component.handleMonthClick(janMonth);
            component.handleMonthClick(marMonth);

            expect(component.selection.start.format('YYYY-MM')).toBe('2026-01');
            expect(component.selection.end.format('YYYY-MM')).toBe('2026-03');
        });

        it('should change the visible year from the month picker header control', async () => {
            const { component } = await createTestComponent({
                pickerType: 'month',
            });

            component.viewDate = dayjs('2026-01-01');

            component.setMonthPickerYear(2030, 0);

            expect(component.generateMonthGrid(0).year).toBe(2030);

            component.setMonthPickerYear(2032, 1);

            expect(component.generateMonthGrid(1).year).toBe(2032);
            expect(component.generateMonthGrid(0).year).toBe(2031);
        });

        it('should render and normalize the month picker header year input value', async () => {
            const { component } = await createTestComponent({
                pickerType: 'month',
                singleCalendar: true,
                minYear: 2020,
                maxYear: 2030,
            });

            component.viewDate = dayjs('2026-01-01');

            expect(component.getMonthPickerYearInputValue(0)).toBe(2026);

            const input = { value: '2035' };
            component.handleMonthPickerYearInput({ target: input }, 0);
            await flushPromises();

            expect(component.viewDate.year()).toBe(2030);
            expect(input.value).toBe(2030);
        });

        it('should apply min/max year constraints to month picker years and cells', async () => {
            const { component } = await createTestComponent({
                pickerType: 'month',
                singleCalendar: true,
                minYear: 2025,
                maxYear: 2027,
            });

            expect(component.monthPickerYears).toEqual([2025, 2026, 2027]);
            expect(component.isMonthDisabled(dayjs('2024-12-01'))).toBe(true);
            expect(component.isMonthDisabled(dayjs('2025-01-01'))).toBe(false);
            expect(component.isMonthDisabled(dayjs('2028-01-01'))).toBe(true);

            component.setMonthPickerYear(2030);

            expect(component.viewDate.year()).toBe(2027);
        });

        it('should derive month picker year constraints from minDate and maxDate', async () => {
            const { component } = await createTestComponent({
                pickerType: 'month',
                minDate: '2026-06-15',
                maxDate: '2028-03-10',
            });

            expect(component.monthPickerYears).toEqual([2026, 2027, 2028]);
            expect(component.isMonthDisabled(dayjs('2026-05-01'))).toBe(true);
            expect(component.isMonthDisabled(dayjs('2026-06-01'))).toBe(false);
            expect(component.isMonthDisabled(dayjs('2028-04-01'))).toBe(true);
        });
    });

    describe('Year Picker Mode', () => {
        it('should identify as year picker', async () => {
            const { component } = await createTestComponent({
                pickerType: 'year',
            });

            expect(component.isYearPicker).toBe(true);
            expect(component.isDayPicker).toBe(false);
        });

        it('should generate year grid correctly', async () => {
            const { component } = await createTestComponent({
                pickerType: 'year',
            });

            component.viewDate = dayjs('2026-01-01');

            const grid = component.generateYearGrid(0);

            expect(grid.years).toHaveLength(12);
            expect(grid.decadeStart).toBe(2020);
            expect(grid.decadeEnd).toBe(2029);
        });

        it('should select year range', async () => {
            const { component } = await createTestComponent({
                pickerType: 'year',
            });

            const year2024 = { date: dayjs('2024-01-01'), disabled: false };
            const year2026 = { date: dayjs('2026-01-01'), disabled: false };

            component.handleYearClick(year2024);
            component.handleYearClick(year2026);

            expect(component.selection.start.year()).toBe(2024);
            expect(component.selection.end.year()).toBe(2026);
        });
    });
});

// ═══════════════════════════════════════════════════════════════════════════
// 4. LIVEWIRE INTEGRATION
// ═══════════════════════════════════════════════════════════════════════════

describe('Livewire Integration', () => {
    describe('Standard Mode', () => {
        it('should sync state to wire on applySelection', async () => {
            const { component, wire } = await createTestComponent();

            clickDay(component, '2026-01-05');
            clickDay(component, '2026-01-15');

            component.applySelection();

            expect(component.config.state).toContain('05/01/2026');
            expect(component.config.state).toContain('15/01/2026');
        });

        it('should update inputValue when selection changes', async () => {
            const { component } = await createTestComponent();

            clickDay(component, '2026-01-05');
            clickDay(component, '2026-01-15');

            expect(component.inputValue).toContain('05/01/2026');
        });

        it('should format output with configured separator', async () => {
            const { component } = await createTestComponent({
                separator: ' to ',
            });

            clickDay(component, '2026-01-05');
            clickDay(component, '2026-01-15');

            expect(component.inputValue).toContain(' to ');
        });
    });

    describe('Display Value', () => {
        beforeEach(() => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date(2026, 0, 9, 12, 0, 0));
        });

        afterEach(() => {
            vi.useRealTimers();
        });

        it('should return formatted date string', async () => {
            const { component } = await createTestComponent();

            clickDay(component, '2026-01-05');
            clickDay(component, '2026-01-15');

            const displayValue = component.getDisplayValue();

            expect(displayValue).toBe('05/01/2026 - 15/01/2026');
        });

        it('should return single date for singleCalendar mode', async () => {
            const { component } = await createTestComponent({
                singleCalendar: true,
            });

            clickDay(component, '2026-01-15');

            const displayValue = component.getDisplayValue();

            expect(displayValue).toBe('15/01/2026');
        });

        it('should return preset label when useRangeLabels is true', async () => {
            const today = dayjs();

            const { component } = await createTestComponent({
                useRangeLabels: true,
                ranges: {
                    'Today': [today.startOf('day').toISOString(), today.endOf('day').toISOString()],
                },
            });

            component.selectPreset('Today');

            const displayValue = component.getDisplayValue();

            expect(displayValue).toBe('Today');
        });

        it('should return empty string when no selection', async () => {
            const { component } = await createTestComponent();

            const displayValue = component.getDisplayValue();

            expect(displayValue).toBe('');
        });
    });

    describe('State Reset', () => {
        it('should clear selection on clear()', async () => {
            const { component } = await createTestComponent();

            clickDay(component, '2026-01-05');
            clickDay(component, '2026-01-15');

            component.clear();

            expect(component.selection.start).toBeNull();
            expect(component.selection.end).toBeNull();
        });
    });
});

// ═══════════════════════════════════════════════════════════════════════════
// 5. INPUT LOGIC
// ═══════════════════════════════════════════════════════════════════════════

describe('Input Logic', () => {
    describe('Manual Input Parsing', () => {
        it('should parse valid range input', async () => {
            const { component } = await createTestComponent({
                allowInput: true,
            });

            component.parseState('01/01/2026 - 15/01/2026');

            expect(component.selection.start.format('DD/MM/YYYY')).toBe('01/01/2026');
            expect(component.selection.end.format('DD/MM/YYYY')).toBe('15/01/2026');
        });

        it('should parse valid single date input', async () => {
            const { component } = await createTestComponent({
                singleCalendar: true,
                allowInput: true,
            });

            component.parseState('15/01/2026');

            expect(component.selection.start.format('DD/MM/YYYY')).toBe('15/01/2026');
        });

        it('should not crash on invalid input', async () => {
            const { component } = await createTestComponent({
                allowInput: true,
            });

            // This should not throw
            expect(() => {
                component.parseState('99/99/2023');
            }).not.toThrow();
        });

        it('should handle partial input gracefully', async () => {
            const { component } = await createTestComponent({
                allowInput: true,
            });

            component.parseState('01/01');

            // Should not crash, selection might be null
            expect(component.selection.start).toBeNull();
        });

        it('should keep previous valid month value when partial manual input is invalid', async () => {
            const { component } = await createTestComponent({
                pickerType: 'month',
                singleCalendar: true,
                allowInput: true,
                displayFormat: 'MM/YYYY',
                initialState: '06/2026',
            });

            const handled = component.handleManualInput('07/');

            expect(handled).toBe(false);
            expect(component.selection.start.format('MM/YYYY')).toBe('06/2026');
            expect(component.inputValue).toBe('06/2026');
            expect(component.config.state).toBe('06/2026');
        });

        it('should parse month range manual input as a selected month range', async () => {
            const { component } = await createTestComponent({
                pickerType: 'month',
                allowInput: true,
                displayFormat: 'MM/YYYY',
            });

            component.handleManualInput('06/2026 - 08/2026');

            expect(component.selection.start.format('YYYY-MM-DD')).toBe('2026-06-01');
            expect(component.selection.end.format('YYYY-MM-DD')).toBe('2026-08-31');
            expect(component.inputValue).toBe('06/2026 - 08/2026');
        });

        it('should clear manual input when the field is emptied', async () => {
            const { component } = await createTestComponent({
                pickerType: 'month',
                singleCalendar: true,
                allowInput: true,
                displayFormat: 'MM/YYYY',
                initialState: '06/2026',
            });

            component.handleManualInput('');

            expect(component.selection.start).toBeNull();
            expect(component.selection.end).toBeNull();
            expect(component.config.state).toBe('');
        });
    });

    describe('Custom Display Format', () => {
        it('should parse date with custom format', async () => {
            const { component } = await createTestComponent({
                displayFormat: 'YYYY-MM-DD',
            });

            component.parseState('2026-01-15 - 2026-01-20');

            expect(component.selection.start.format('YYYY-MM-DD')).toBe('2026-01-15');
            expect(component.selection.end.format('YYYY-MM-DD')).toBe('2026-01-20');
        });

        it('should output date with custom format', async () => {
            const { component } = await createTestComponent({
                displayFormat: 'YYYY-MM-DD',
            });

            clickDay(component, '2026-01-15');
            clickDay(component, '2026-01-20');

            expect(component.inputValue).toBe('2026-01-15 - 2026-01-20');
        });
    });
});

// ═══════════════════════════════════════════════════════════════════════════
// 6. CALENDAR GRID GENERATION
// ═══════════════════════════════════════════════════════════════════════════

describe('Calendar Grid Generation', () => {
    describe('Day Grid', () => {
        it('should generate correct number of weeks', async () => {
            const { component } = await createTestComponent();

            component.viewDate = dayjs('2026-01-01');
            const grid = component.generateGrid(0);

            // January 2026 starts on Thursday, should have 5 weeks
            expect(grid.weeks.length).toBeGreaterThanOrEqual(4);
            expect(grid.weeks.length).toBeLessThanOrEqual(6);
        });

        it('should include days from adjacent months', async () => {
            const { component } = await createTestComponent();

            component.viewDate = dayjs('2026-01-01');
            const grid = component.generateGrid(0);

            // Check first week has some days from December 2025
            const firstWeek = grid.weeks[0];
            const hasOffMonthDay = firstWeek.some(day => !day.isCurrentMonth);

            expect(hasOffMonthDay).toBe(true);
        });

        it('should mark today correctly', async () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date(2026, 0, 15, 12, 0, 0));

            const { component } = await createTestComponent();

            component.viewDate = dayjs('2026-01-01');
            const grid = component.generateGrid(0);

            const allDays = grid.weeks.flat();
            const today = allDays.find(d => d.isToday);

            expect(today).toBeDefined();
            expect(today.day).toBe(15);

            vi.useRealTimers();
        });

        it('should mark selected dates correctly', async () => {
            const { component } = await createTestComponent();

            clickDay(component, '2026-01-10');
            clickDay(component, '2026-01-15');

            component.viewDate = dayjs('2026-01-01');
            const grid = component.generateGrid(0);

            const allDays = grid.weeks.flat();
            const selectedDays = allDays.filter(d => d.isSelected);

            expect(selectedDays.length).toBe(2);
        });

        it('should mark in-range dates correctly', async () => {
            const { component } = await createTestComponent();

            clickDay(component, '2026-01-10');
            clickDay(component, '2026-01-15');

            component.viewDate = dayjs('2026-01-01');
            const grid = component.generateGrid(0);

            const allDays = grid.weeks.flat();
            const inRangeDays = allDays.filter(d => d.inRange);

            // Should have 4 days in range (11, 12, 13, 14)
            expect(inRangeDays.length).toBe(4);
        });

        it('should include week numbers when configured', async () => {
            const { component } = await createTestComponent({
                showWeekNumbers: true,
            });

            component.viewDate = dayjs('2026-01-01');
            const grid = component.generateGrid(0);

            const firstDay = grid.weeks[0][0];
            expect(firstDay.weekNumber).toBeDefined();
        });
    });

    describe('Dual Calendar', () => {
        it('should show two different months', async () => {
            const { component } = await createTestComponent({
                singleCalendar: false,
            });

            component.viewDate = dayjs('2026-01-01');

            const grid0 = component.generateGrid(0);
            const grid1 = component.generateGrid(1);

            expect(grid0.monthName).not.toBe(grid1.monthName);
        });

        it('should show consecutive months', async () => {
            const { component } = await createTestComponent({
                singleCalendar: false,
            });

            component.viewDate = dayjs('2026-01-01');

            const grid0 = component.generateGrid(0);
            const grid1 = component.generateGrid(1);

            expect(grid0.monthName).toBe('January');
            expect(grid1.monthName).toBe('February');
        });
    });
});

// ═══════════════════════════════════════════════════════════════════════════
// 7. KEYBOARD NAVIGATION
// ═══════════════════════════════════════════════════════════════════════════

describe('Keyboard Navigation', () => {
    it('should open picker on Enter key', async () => {
        const { component } = await createTestComponent();

        const event = { key: 'Enter', preventDefault: vi.fn() };
        component.handleKeydown(event);

        await flushPromises();

        expect(component.open).toBe(true);
    });

    it('should close picker on Escape key', async () => {
        const { component } = await createTestComponent();

        await component.openPicker();

        const event = { key: 'Escape', preventDefault: vi.fn(), stopPropagation: vi.fn() };
        component.handleKeydown(event);

        expect(component.open).toBe(false);
    });

    it('should navigate left with ArrowLeft', async () => {
        const { component } = await createTestComponent();

        await component.openPicker();
        component.focusedDate = dayjs('2026-01-15');

        const event = { key: 'ArrowLeft', preventDefault: vi.fn() };
        component.handleKeydown(event);

        expect(component.focusedDate.format('YYYY-MM-DD')).toBe('2026-01-14');
    });

    it('should navigate right with ArrowRight', async () => {
        const { component } = await createTestComponent();

        await component.openPicker();
        component.focusedDate = dayjs('2026-01-15');

        const event = { key: 'ArrowRight', preventDefault: vi.fn() };
        component.handleKeydown(event);

        expect(component.focusedDate.format('YYYY-MM-DD')).toBe('2026-01-16');
    });

    it('should navigate up one week with ArrowUp', async () => {
        const { component } = await createTestComponent();

        await component.openPicker();
        component.focusedDate = dayjs('2026-01-15');

        const event = { key: 'ArrowUp', preventDefault: vi.fn() };
        component.handleKeydown(event);

        expect(component.focusedDate.format('YYYY-MM-DD')).toBe('2026-01-08');
    });

    it('should navigate down one week with ArrowDown', async () => {
        const { component } = await createTestComponent();

        await component.openPicker();
        component.focusedDate = dayjs('2026-01-15');

        const event = { key: 'ArrowDown', preventDefault: vi.fn() };
        component.handleKeydown(event);

        expect(component.focusedDate.format('YYYY-MM-DD')).toBe('2026-01-22');
    });

    it('should go to start of month with Home', async () => {
        const { component } = await createTestComponent();

        await component.openPicker();
        component.focusedDate = dayjs('2026-01-15');

        const event = { key: 'Home', preventDefault: vi.fn() };
        component.handleKeydown(event);

        expect(component.focusedDate.format('YYYY-MM-DD')).toBe('2026-01-01');
    });

    it('should go to end of month with End', async () => {
        const { component } = await createTestComponent();

        await component.openPicker();
        component.focusedDate = dayjs('2026-01-15');

        const event = { key: 'End', preventDefault: vi.fn() };
        component.handleKeydown(event);

        expect(component.focusedDate.format('YYYY-MM-DD')).toBe('2026-01-31');
    });

    it('should navigate to previous month with PageUp', async () => {
        const { component } = await createTestComponent();

        await component.openPicker();
        component.focusedDate = dayjs('2026-02-15');

        const event = { key: 'PageUp', preventDefault: vi.fn(), shiftKey: false };
        component.handleKeydown(event);

        expect(component.focusedDate.format('YYYY-MM-DD')).toBe('2026-01-15');
    });

    it('should navigate to previous year with Shift+PageUp', async () => {
        const { component } = await createTestComponent();

        await component.openPicker();
        component.focusedDate = dayjs('2026-01-15');

        const event = { key: 'PageUp', preventDefault: vi.fn(), shiftKey: true };
        component.handleKeydown(event);

        expect(component.focusedDate.format('YYYY-MM-DD')).toBe('2025-01-15');
    });

    it('should select focused date with Enter', async () => {
        const { component } = await createTestComponent();

        await component.openPicker();
        component.focusedDate = dayjs('2026-01-15');

        const event = { key: 'Enter', preventDefault: vi.fn() };
        component.handleKeydown(event);

        expect(component.selection.start.format('YYYY-MM-DD')).toBe('2026-01-15');
    });

    it('should apply month input on Enter without day selection reset', async () => {
        const { component } = await createTestComponent({
            pickerType: 'month',
            singleCalendar: true,
            allowInput: true,
            displayFormat: 'MM/YYYY',
            initialState: '01/2025',
        });

        await component.openPicker();
        component.focusedDate = dayjs('2025-01-01');
        component.$refs.input.value = '06/2026';
        component.inputValue = '06/2026';
        component.inputMask.value = '06/2026';

        const dayClickSpy = vi.spyOn(component, 'handleDayClick');
        const event = {
            key: 'Enter',
            target: component.$refs.input,
            preventDefault: vi.fn(),
        };

        component.handleKeydown(event);

        expect(event.preventDefault).toHaveBeenCalled();
        expect(dayClickSpy).not.toHaveBeenCalled();
        expect(component.selection.start.format('MM/YYYY')).toBe('06/2026');
        expect(component.inputValue).toBe('06/2026');
        expect(component.config.state).toBe('06/2026');
    });

    it('should apply month range input on Enter without day selection reset', async () => {
        const { component } = await createTestComponent({
            pickerType: 'month',
            allowInput: true,
            displayFormat: 'MM/YYYY',
            initialState: '01/2025 - 02/2025',
        });

        await component.openPicker();
        component.focusedDate = dayjs('2025-01-01');
        component.$refs.input.value = '06/2026 - 08/2026';
        component.inputValue = '06/2026 - 08/2026';
        component.inputMask.value = '06/2026 - 08/2026';

        const dayClickSpy = vi.spyOn(component, 'handleDayClick');
        const event = {
            key: 'Enter',
            target: component.$refs.input,
            preventDefault: vi.fn(),
        };

        component.handleKeydown(event);

        expect(dayClickSpy).not.toHaveBeenCalled();
        expect(component.selection.start.format('YYYY-MM-DD')).toBe('2026-06-01');
        expect(component.selection.end.format('YYYY-MM-DD')).toBe('2026-08-31');
        expect(component.inputValue).toBe('06/2026 - 08/2026');
    });

    it('should not run day selection on Enter for year picker input', async () => {
        const { component } = await createTestComponent({
            pickerType: 'year',
            singleCalendar: true,
            allowInput: true,
            displayFormat: 'YYYY',
            initialState: '2025',
        });

        await component.openPicker();
        component.focusedDate = dayjs('2025-01-01');
        component.$refs.input.value = '2027';
        component.inputValue = '2027';
        component.inputMask.value = '2027';

        const dayClickSpy = vi.spyOn(component, 'handleDayClick');
        const event = {
            key: 'Enter',
            target: component.$refs.input,
            preventDefault: vi.fn(),
        };

        component.handleKeydown(event);

        expect(dayClickSpy).not.toHaveBeenCalled();
        expect(component.selection.start.year()).toBe(2027);
        expect(component.inputValue).toBe('2027');
    });
});

// ═══════════════════════════════════════════════════════════════════════════
// 8. STATE HELPERS
// ═══════════════════════════════════════════════════════════════════════════

describe('State Helpers', () => {
    it('should detect start date correctly', async () => {
        const { component } = await createTestComponent();

        clickDay(component, '2026-01-10');
        clickDay(component, '2026-01-15');

        expect(component.isStartDate(dayjs('2026-01-10'))).toBe(true);
        expect(component.isStartDate(dayjs('2026-01-15'))).toBe(false);
    });

    it('should detect end date correctly', async () => {
        const { component } = await createTestComponent();

        clickDay(component, '2026-01-10');
        clickDay(component, '2026-01-15');

        expect(component.isEndDate(dayjs('2026-01-15'))).toBe(true);
        expect(component.isEndDate(dayjs('2026-01-10'))).toBe(false);
    });

    it('should detect in-range dates correctly', async () => {
        const { component } = await createTestComponent();

        clickDay(component, '2026-01-10');
        clickDay(component, '2026-01-15');

        expect(component.isInRange(dayjs('2026-01-12'))).toBe(true);
        expect(component.isInRange(dayjs('2026-01-10'))).toBe(false); // Start is not "in range"
        expect(component.isInRange(dayjs('2026-01-15'))).toBe(false); // End is not "in range"
        expect(component.isInRange(dayjs('2026-01-20'))).toBe(false);
    });

    it('should detect focused date correctly', async () => {
        const { component } = await createTestComponent();

        await component.openPicker();
        component.focusedDate = dayjs('2026-01-15');

        expect(component.isFocused(dayjs('2026-01-15'))).toBe(true);
        expect(component.isFocused(dayjs('2026-01-10'))).toBe(false);
    });
});
