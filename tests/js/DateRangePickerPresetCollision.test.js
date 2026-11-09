import { describe, it, expect } from 'vitest';
import { createTestComponent, clickDay, dayjs } from './setup.js';

// Follow-up to #268: presets are clamped into minDate / maxDate, so two
// presets can clamp to the same range. The one the user clicked must be the
// one highlighted and shown as the label, and only one preset may be active.

const activePresets = (component) =>
    Object.keys(component.config.ranges).filter((label) => component.isActiveRange(label));

// minDate two days before "today" (2026-11-09): both presets clamp to
// 2026-11-07 → 2026-11-09.
const lastNDays = {
    'Last 7 Days': ['2026-11-03', '2026-11-09'],
    'Last 30 Days': ['2026-10-11', '2026-11-09'],
};

// maxDate today on the 1st of the month: "This month" clamps to "Today".
const firstOfMonth = {
    'This month': ['2026-11-01', '2026-11-30'],
    Today: ['2026-11-01', '2026-11-01'],
};

describe('Clamped presets that collide', () => {
    it('labels and highlights the clicked preset, not the first one in order', async () => {
        const { component } = await createTestComponent({
            useRangeLabels: true,
            minDate: '2026-11-07',
            ranges: lastNDays,
        });

        component.selectPreset('Last 30 Days');

        expect(component.inputValue).toBe('Last 30 Days');
        expect(activePresets(component)).toEqual(['Last 30 Days']);

        component.selectPreset('Last 7 Days');

        expect(component.inputValue).toBe('Last 7 Days');
        expect(activePresets(component)).toEqual(['Last 7 Days']);
    });

    it('keeps the clicked preset through autoApply and the state round trip', async () => {
        const { component, watchers } = await createTestComponent({
            useRangeLabels: true,
            autoApply: true,
            minDate: '2026-11-07',
            ranges: lastNDays,
        });

        component.selectPreset('Last 30 Days');
        const applied = component.config.state;
        component.isSyncing = false;

        // Livewire echoing the same value back.
        watchers.get('config.state')(applied);

        expect(component.inputValue).toBe('Last 30 Days');
        expect(activePresets(component)).toEqual(['Last 30 Days']);
    });

    it('maxDate today on the 1st: "This month" does not read as "Today"', async () => {
        const { component } = await createTestComponent({
            useRangeLabels: true,
            maxDate: '2026-11-01',
            ranges: firstOfMonth,
        });

        component.selectPreset('This month');
        expect(component.inputValue).toBe('This month');
        expect(activePresets(component)).toEqual(['This month']);

        component.selectPreset('Today');
        expect(component.inputValue).toBe('Today');
        expect(activePresets(component)).toEqual(['Today']);
    });

    it('without a click, prefers the preset whose own bounds equal the range', async () => {
        const { component } = await createTestComponent({
            useRangeLabels: true,
            maxDate: '2026-11-01',
            ranges: firstOfMonth,
            initialState: '01/11/2026 - 01/11/2026',
        });

        expect(component.inputValue).toBe('Today');
        expect(activePresets(component)).toEqual(['Today']);
    });

    it('falls back to the first clamped match when no preset matches exactly', async () => {
        const { component } = await createTestComponent({
            useRangeLabels: true,
            minDate: '2026-11-07',
            ranges: lastNDays,
            initialState: '07/11/2026 - 09/11/2026',
        });

        expect(component.inputValue).toBe('Last 7 Days');
        expect(activePresets(component)).toEqual(['Last 7 Days']);
    });

    it('forgets the clicked preset when the range is picked on the calendar', async () => {
        const { component } = await createTestComponent({
            useRangeLabels: true,
            minDate: '2026-11-07',
            ranges: lastNDays,
        });

        component.selectPreset('Last 30 Days');
        clickDay(component, '2026-11-07');
        clickDay(component, '2026-11-09');
        component.updateInputValue();

        expect(component.inputValue).toBe('Last 7 Days');
        expect(activePresets(component)).toEqual(['Last 7 Days']);
    });

    it('forgets the clicked preset when the range is typed', async () => {
        const { component } = await createTestComponent({
            useRangeLabels: true,
            minDate: '2026-11-07',
            ranges: lastNDays,
        });

        component.selectPreset('Last 30 Days');
        // Typing goes through other values before landing on the range.
        component.handleManualInput('08/11/2026 - 09/11/2026');
        component.handleManualInput('07/11/2026 - 09/11/2026');

        expect(component.inputValue).toBe('Last 7 Days');
        expect(activePresets(component)).toEqual(['Last 7 Days']);
    });

    it('keeps the clicked preset when the input mask echoes the same range', async () => {
        const { component } = await createTestComponent({
            minDate: '2026-11-07',
            ranges: lastNDays,
        });

        component.selectPreset('Last 30 Days');
        component.handleManualInput('07/11/2026 - 09/11/2026');

        expect(activePresets(component)).toEqual(['Last 30 Days']);
    });

    it('forgets the clicked preset on clear', async () => {
        const { component } = await createTestComponent({
            useRangeLabels: true,
            minDate: '2026-11-07',
            ranges: lastNDays,
        });

        component.selectPreset('Last 30 Days');
        component.clear();
        component.selection.start = dayjs('2026-11-07');
        component.selection.end = dayjs('2026-11-09');
        component.updateInputValue();

        expect(component.inputValue).toBe('Last 7 Days');
    });

    it('forgets the clicked preset when the server sends another range', async () => {
        const { component, watchers } = await createTestComponent({
            useRangeLabels: true,
            minDate: '2026-11-07',
            ranges: lastNDays,
        });

        component.selectPreset('Last 30 Days');
        component.isSyncing = false;
        watchers.get('config.state')('08/11/2026 - 09/11/2026');
        watchers.get('config.state')('07/11/2026 - 09/11/2026');

        expect(component.inputValue).toBe('Last 7 Days');
        expect(activePresets(component)).toEqual(['Last 7 Days']);
    });

    it('forgets the clicked preset when the time changes', async () => {
        const { component } = await createTestComponent({
            useRangeLabels: true,
            timePicker: true,
            timePicker24: true,
            minDate: '2026-11-07',
            ranges: lastNDays,
        });

        component.selectPreset('Last 30 Days');
        expect(component.inputValue).toBe('Last 30 Days');

        // Change the start hour, then put it back: the range is the clamped
        // one again, but it was not picked by clicking "Last 30 Days".
        component.startTime = { ...component.startTime, hour: 5 };
        component.handleTimeChange(true);
        component.startTime = { ...component.startTime, hour: 0 };
        component.handleTimeChange(true);
        component.updateInputValue();

        expect(component.inputValue).toBe('Last 7 Days');
        expect(activePresets(component)).toEqual(['Last 7 Days']);
    });

    describe('without minDate / maxDate (unchanged)', () => {
        const duplicates = {
            'Last 7 Days': ['2026-11-03', '2026-11-09'],
            'Past week': ['2026-11-03', '2026-11-09'],
        };

        it('still highlights every preset equal to the range and labels the first', async () => {
            const { component } = await createTestComponent({
                useRangeLabels: true,
                ranges: duplicates,
            });

            component.selectPreset('Past week');

            expect(component.inputValue).toBe('Last 7 Days');
            expect(activePresets(component)).toEqual(['Last 7 Days', 'Past week']);
        });
    });
});
