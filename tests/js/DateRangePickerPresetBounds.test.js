import { describe, it, expect } from 'vitest';
import { createTestComponent } from './setup.js';

// Issue #268: quick presets ignored minDate()/maxDate(). The calendar greyed
// out the days, but selectPreset() wrote the out-of-bounds range to the field.
//
// Rule: a preset with no overlap with the allowed range is disabled and
// selecting it is a no-op; a preset that partly overlaps is clamped to the
// bounds (and still highlights as active once applied).

const presets = {
    Today: ['2026-11-09', '2026-11-09'],
    Yesterday: ['2026-11-08', '2026-11-08'],
    'Last 7 Days': ['2026-11-03', '2026-11-09'],
};

const fmt = (date) => date?.format('YYYY-MM-DD HH:mm') ?? null;

describe('Presets respect minDate / maxDate (#268)', () => {
    describe('issue examples (autoApply)', () => {
        it('does not apply Yesterday when min = max = today', async () => {
            const { component } = await createTestComponent({
                autoApply: true,
                minDate: '2026-11-09 00:00:00',
                maxDate: '2026-11-09 00:00:00',
                ranges: presets,
            });

            component.selectPreset('Yesterday');

            expect(component.config.state).toBe('');
            expect(component.selection.start).toBeNull();
            expect(component.selection.end).toBeNull();
        });

        it('does not apply Today when min = max = yesterday', async () => {
            const { component } = await createTestComponent({
                autoApply: true,
                minDate: '2026-11-08 00:00:00',
                maxDate: '2026-11-08 00:00:00',
                ranges: presets,
            });

            component.selectPreset('Today');

            expect(component.config.state).toBe('');
            expect(component.selection.start).toBeNull();
        });

        it('still applies the in-bounds preset', async () => {
            const { component } = await createTestComponent({
                autoApply: true,
                minDate: '2026-11-08 00:00:00',
                maxDate: '2026-11-08 00:00:00',
                ranges: presets,
            });

            component.selectPreset('Yesterday');

            expect(component.config.state).toBe('08/11/2026 - 08/11/2026');
            expect(component.isActiveRange('Yesterday')).toBe(true);
        });
    });

    describe('availability', () => {
        it('disables presets with no overlap and leaves the rest enabled', async () => {
            const { component } = await createTestComponent({
                minDate: '2026-11-09',
                maxDate: '2026-11-09',
                ranges: presets,
            });

            expect(component.isPresetDisabled('Yesterday')).toBe(true);
            expect(component.isPresetDisabled('Today')).toBe(false);
            expect(component.isPresetDisabled('Last 7 Days')).toBe(false);
        });

        it('disables nothing without bounds', async () => {
            const { component } = await createTestComponent({ ranges: presets });

            expect(Object.keys(presets).some((label) => component.isPresetDisabled(label))).toBe(false);
        });

        it('keeps the existing selection when a disabled preset is clicked (autoApply off)', async () => {
            const { component } = await createTestComponent({
                minDate: '2026-11-09',
                ranges: presets,
                initialState: '09/11/2026 - 09/11/2026',
            });

            component.selectPreset('Yesterday');

            expect(fmt(component.selection.start)).toBe('2026-11-09 00:00');
            expect(fmt(component.selection.end)).toBe('2026-11-09 00:00');
            expect(component.config.state).toBe('09/11/2026 - 09/11/2026');
        });
    });

    describe('clamping a partial overlap', () => {
        it('clamps the start to minDate (minDate only, autoApply)', async () => {
            const { component } = await createTestComponent({
                autoApply: true,
                minDate: '2026-11-07 00:00:00',
                ranges: presets,
            });

            component.selectPreset('Last 7 Days');

            expect(component.config.state).toBe('07/11/2026 - 09/11/2026');
            expect(component.isActiveRange('Last 7 Days')).toBe(true);
            expect(component.isActiveRange('Today')).toBe(false);
        });

        it('clamps the end to maxDate (maxDate only, autoApply off)', async () => {
            const { component } = await createTestComponent({
                maxDate: '2026-11-05',
                ranges: presets,
            });

            component.selectPreset('Last 7 Days');

            expect(fmt(component.selection.start)).toBe('2026-11-03 00:00');
            expect(fmt(component.selection.end)).toBe('2026-11-05 00:00');
            expect(component.config.state).toBe('');
            expect(component.isActiveRange('Last 7 Days')).toBe(true);

            component.applySelection();
            expect(component.config.state).toBe('03/11/2026 - 05/11/2026');
        });

        it('clamps both ends when both bounds are set', async () => {
            const { component } = await createTestComponent({
                autoApply: true,
                minDate: '2026-11-04',
                maxDate: '2026-11-06',
                ranges: presets,
            });

            component.selectPreset('Last 7 Days');

            expect(component.config.state).toBe('04/11/2026 - 06/11/2026');
        });

        it('shows the preset label for a clamped preset with useRangeLabels', async () => {
            const { component } = await createTestComponent({
                autoApply: true,
                useRangeLabels: true,
                minDate: '2026-11-07',
                ranges: presets,
            });

            component.selectPreset('Last 7 Days');

            expect(component.getDisplayValue()).toBe('Last 7 Days');
        });
    });

    describe('time picker', () => {
        it('clamps to the whole boundary day and still highlights', async () => {
            const { component } = await createTestComponent({
                autoApply: true,
                timePicker: true,
                timePicker24: true,
                displayFormat: 'DD/MM/YYYY HH:mm',
                minDate: '2026-11-07 00:00:00',
                maxDate: '2026-11-08 00:00:00',
                ranges: presets,
            });

            expect(component.isPresetDisabled('Today')).toBe(true);

            component.selectPreset('Last 7 Days');

            expect(component.config.state).toBe('07/11/2026 00:00 - 08/11/2026 23:59');
            expect(component.isActiveRange('Last 7 Days')).toBe(true);
        });

        it('does not apply an out-of-bounds preset', async () => {
            const { component } = await createTestComponent({
                autoApply: true,
                timePicker: true,
                timePicker24: true,
                displayFormat: 'DD/MM/YYYY HH:mm',
                minDate: '2026-11-09 00:00:00',
                maxDate: '2026-11-09 00:00:00',
                ranges: presets,
            });

            component.selectPreset('Yesterday');

            expect(component.config.state).toBe('');
        });
    });

    describe('single date picker', () => {
        it('does not apply an out-of-bounds preset', async () => {
            const { component } = await createTestComponent({
                autoApply: true,
                singleCalendar: true,
                minDate: '2026-11-08',
                maxDate: '2026-11-08',
                ranges: presets,
            });

            component.selectPreset('Today');
            expect(component.config.state).toBe('');

            component.selectPreset('Yesterday');
            expect(component.config.state).toBe('08/11/2026');
        });
    });

    describe('month and year pickers bound at their own granularity', () => {
        const monthPresets = {
            'This Month': ['2026-11-01', '2026-11-30'],
            'Last Month': ['2026-10-01', '2026-10-31'],
            'This Year': ['2026-01-01', '2026-12-31'],
            'Last Year': ['2025-01-01', '2025-12-31'],
        };

        it('month picker: keeps whole months, disables months outside the bounds', async () => {
            const { component } = await createTestComponent({
                pickerType: 'month',
                autoApply: true,
                minDate: '2026-11-15',
                ranges: monthPresets,
            });

            expect(component.isPresetDisabled('Last Month')).toBe(true);
            expect(component.isPresetDisabled('This Month')).toBe(false);

            component.selectPreset('This Year');

            // The November cell is enabled (isMonthDisabled works per month),
            // so the clamped range starts on the 1st of November.
            expect(fmt(component.selection.start)).toBe('2026-11-01 00:00');
            expect(fmt(component.selection.end)).toBe('2026-12-31 00:00');
            expect(component.isActiveRange('This Year')).toBe(true);
        });

        it('year picker: keeps whole years, disables years outside the bounds', async () => {
            const { component } = await createTestComponent({
                pickerType: 'year',
                autoApply: true,
                minDate: '2026-03-01',
                ranges: monthPresets,
            });

            expect(component.isPresetDisabled('Last Year')).toBe(true);

            component.selectPreset('This Year');

            expect(fmt(component.selection.start)).toBe('2026-01-01 00:00');
            expect(fmt(component.selection.end)).toBe('2026-12-31 00:00');
        });
    });
});
