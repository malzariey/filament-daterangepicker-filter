/**
 * Vitest Setup File for DateRangePicker Tests
 * Provides mocks for Alpine.js, Livewire, and dayjs
 */

import { vi, beforeAll, afterEach, beforeEach } from 'vitest';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isoWeek from 'dayjs/plugin/isoWeek';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import localeData from 'dayjs/plugin/localeData';

// Extend dayjs with plugins
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(localeData);

// Expose dayjs globally
globalThis.dayjs = dayjs;

// ─────────────────────────────────────────────────────────────
// Mock Livewire $wire object
// ─────────────────────────────────────────────────────────────

export const createMockWire = (initialState = '') => {
    const state = { value: initialState };

    const wire = {
        __state: state,
        $entangle: vi.fn((path) => ({
            get value() { return state.value; },
            set value(newValue) {
                state.value = newValue;
                wire.$set(path, newValue);
            }
        })),
        $set: vi.fn((path, value) => {
            state.value = value;
        }),
        $call: vi.fn(),
        $refresh: vi.fn(),
        $commit: vi.fn(),
        getState: () => state.value,
        setState: (value) => { state.value = value; },
        resetMocks: () => {
            wire.$set.mockClear();
            wire.$call.mockClear();
            wire.$refresh.mockClear();
            wire.$commit.mockClear();
        }
    };

    return wire;
};

// ─────────────────────────────────────────────────────────────
// Mock Alpine.js
// ─────────────────────────────────────────────────────────────

export const createMockAlpine = () => {
    const components = new Map();
    const stores = new Map();

    const Alpine = {
        data: vi.fn((name, factory) => {
            components.set(name, factory);
        }),
        store: vi.fn((name, data) => {
            if (data !== undefined) {
                stores.set(name, data);
            }
            return stores.get(name);
        }),
        start: vi.fn(),
        nextTick: vi.fn((callback) => {
            return Promise.resolve().then(callback);
        }),
        effect: vi.fn((callback) => callback()),
        reactive: vi.fn((obj) => obj),
        magic: vi.fn(),
        plugin: vi.fn(),
        getComponent: (name) => components.get(name),
        components,
        stores,
    };

    globalThis.Alpine = Alpine;
    return Alpine;
};

// ─────────────────────────────────────────────────────────────
// Mock DOM Helpers
// ─────────────────────────────────────────────────────────────

export const createMockElement = (tagName = 'div', options = {}) => {
    const element = document.createElement(tagName);

    if (options.id) element.id = options.id;
    if (options.className) element.className = options.className;
    if (options.innerHTML) element.innerHTML = options.innerHTML;
    if (options.value !== undefined) element.value = options.value;

    // Add getBoundingClientRect for positioning tests
    element.getBoundingClientRect = vi.fn(() => ({
        top: options.top || 100,
        left: options.left || 100,
        bottom: options.bottom || 150,
        right: options.right || 300,
        width: options.width || 200,
        height: options.height || 50,
        x: options.left || 100,
        y: options.top || 100,
    }));

    return element;
};

export const createMockInput = (value = '') => {
    const input = createMockElement('input', { value });
    input.focus = vi.fn();
    input.blur = vi.fn();
    input.select = vi.fn();
    return input;
};

// ─────────────────────────────────────────────────────────────
// Mock Floating UI
// ─────────────────────────────────────────────────────────────

vi.mock('@floating-ui/dom', () => ({
    computePosition: vi.fn(() => Promise.resolve({ x: 100, y: 150 })),
    autoUpdate: vi.fn((reference, floating, update, options) => {
        update();
        return () => { }; // cleanup function
    }),
    offset: vi.fn(() => ({})),
    flip: vi.fn(() => ({})),
    shift: vi.fn(() => ({})),
}));

// ─────────────────────────────────────────────────────────────
// Test Helpers
// ─────────────────────────────────────────────────────────────

/**
 * Creates a test instance of the DateRangePicker component
 */
export const createTestComponent = async (config = {}) => {
    const mockWire = createMockWire(config.initialState || '');

    // The state should be a string, not an entanglement object
    const stateValue = config.initialState || '';

    const defaultConfig = {
        state: stateValue,  // Pass string directly
        name: 'test-picker',
        locale: 'en',
        timezone: null,
        displayFormat: 'DD/MM/YYYY',
        separator: ' - ',
        firstDay: 0,
        singleCalendar: false,
        linkedCalendars: true,
        alwaysShowCalendars: true,
        showDropdowns: false,
        showWeekNumbers: false,
        showISOWeekNumbers: false,
        minDate: null,
        maxDate: null,
        minYear: null,
        maxYear: null,
        disabledDates: [],
        maxSpan: null,
        timePicker: false,
        timePicker24: false,
        timePickerSecond: false,
        timePickerIncrement: 1,
        ranges: {},
        disableRange: false,
        disableCustomRange: false,
        useRangeLabels: false,
        autoApply: false,
        opens: 'right',
        drops: 'down',
        teleport: true,
        allowInput: false,
        pickerType: 'day',
        applyLabel: 'Apply',
        cancelLabel: 'Cancel',
        fromLabel: 'From',
        toLabel: 'To',
        customRangeLabel: 'Custom Range',
        weekLabel: 'W',
        sunday: 'Su',
        monday: 'Mo',
        tuesday: 'Tu',
        wednesday: 'We',
        thursday: 'Th',
        friday: 'Fr',
        saturday: 'Sa',
        january: 'January',
        february: 'February',
        march: 'March',
        april: 'April',
        may: 'May',
        june: 'June',
        july: 'July',
        august: 'August',
        september: 'September',
        october: 'October',
        november: 'November',
        december: 'December',
        ...config,
        // Re-apply state after spread to ensure it's always a string
        state: config.initialState || config.state || '',
    };

    // Import the actual component
    const { default: dateRangeComponent } = await import('../../resources/js/filament-daterangepicker.js');

    // Create component instance
    const instance = dateRangeComponent(defaultConfig);

    // Mock Alpine $refs and $nextTick
    instance.$refs = {
        trigger: createMockElement('div'),
        dropdown: createMockElement('div', { id: `fi-daterangepicker-dropdown-${instance.instanceId}` }),
        input: createMockInput(),
    };
    instance.$nextTick = (cb) => Promise.resolve().then(cb);
    instance.$watch = vi.fn();

    // Initialize
    if (instance.init) {
        await instance.init();
    }

    // Append dropdown to body for document.getElementById to work
    document.body.appendChild(instance.$refs.dropdown);

    return {
        component: instance,
        wire: mockWire,
        config: defaultConfig,
    };
};

/**
 * Helper to wait for async operations
 */
export const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0));

/**
 * Simulates a click on a day in the calendar
 */
export const clickDay = (component, date) => {
    const dayObject = {
        date: typeof date === 'string' ? dayjs(date) : date,
        disabled: false,
        isCurrentMonth: true,
    };
    component.handleDayClick(dayObject);
};

/**
 * Simulates a hover on a day in the calendar
 */
export const hoverDay = (component, date) => {
    const dayObject = {
        date: typeof date === 'string' ? dayjs(date) : date,
        disabled: false,
    };
    component.handleDayHover(dayObject);
};

// ─────────────────────────────────────────────────────────────
// Global Setup
// ─────────────────────────────────────────────────────────────

beforeAll(() => {
    // Create mock Alpine
    createMockAlpine();

    // Mock window methods
    globalThis.requestAnimationFrame = vi.fn((cb) => setTimeout(cb, 16));
    globalThis.cancelAnimationFrame = vi.fn((id) => clearTimeout(id));

    // Mock ResizeObserver
    globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
    }));

    // Mock IntersectionObserver
    globalThis.IntersectionObserver = vi.fn().mockImplementation(() => ({
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
    }));
});

beforeEach(() => {
    // Reset the document body
    document.body.innerHTML = '';
});

afterEach(() => {
    vi.clearAllMocks();
});

export { dayjs };
