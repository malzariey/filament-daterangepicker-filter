import { describe, it, expect } from 'vitest';
import { createTestComponent } from './setup.js';

// disableCustomRange() reached the JS config but nothing read it: the
// calendars, time picker and Cancel / Apply still showed, and a preset click
// waited for Apply.
//
// Rule: with custom range disabled and at least one preset available the
// picker is presets-only. A preset click applies and closes; nothing else
// (calendar keys, typed input) can set another range; typing a preset's
// exact range or clearing the field still works under allowInput(). With no presets to offer the
// option is ignored, so the dropdown is never empty.

const presets = {
    Today: ['2026-11-09', '2026-11-09'],
    Yesterday: ['2026-11-08', '2026-11-08'],
    'Last 7 Days': ['2026-11-03', '2026-11-09'],
};

const keydown = (component, key, target = null) => {
    const event = {
        key,
        target,
        shiftKey: false,
        defaultPrevented: false,
        preventDefault() { this.defaultPrevented = true; },
        stopPropagation() {},
    };

    component.handleKeydown(event);

    return event;
};

describe('disableCustomRange', () => {
    describe('presets-only mode', () => {
        it('is on with the option and presets', async () => {
            const { component } = await createTestComponent({ disableCustomRange: true, ranges: presets });

            expect(component.presetsOnly).toBe(true);
        });

        it('is off by default', async () => {
            const { component } = await createTestComponent({ ranges: presets });

            expect(component.presetsOnly).toBe(false);
        });

        it('is off with no presets, so the calendar still shows', async () => {
            const { component } = await createTestComponent({ disableCustomRange: true, ranges: {} });

            expect(component.presetsOnly).toBe(false);
        });

        it('is off when presets are disabled, so the calendar still shows', async () => {
            const { component } = await createTestComponent({
                disableCustomRange: true,
                disableRange: true,
                ranges: presets,
            });

            expect(component.presetsOnly).toBe(false);
        });
    });

    describe('preset click', () => {
        it('applies and closes on one click without autoApply', async () => {
            const { component } = await createTestComponent({ disableCustomRange: true, ranges: presets });

            await component.openPicker();
            component.selectPreset('Yesterday');

            expect(component.config.state).toBe('08/11/2026 - 08/11/2026');
            expect(component.open).toBe(false);
            expect(component.isActiveRange('Yesterday')).toBe(true);
        });

        it('applies a whole-day preset under the time picker', async () => {
            const { component } = await createTestComponent({
                disableCustomRange: true,
                timePicker: true,
                timePicker24: true,
                displayFormat: 'DD/MM/YYYY HH:mm',
                ranges: presets,
            });

            await component.openPicker();
            component.selectPreset('Today');

            expect(component.config.state).toBe('09/11/2026 00:00 - 09/11/2026 23:59');
            expect(component.open).toBe(false);
        });

        it('writes both dual-state paths', async () => {
            const { component } = await createTestComponent({
                disableCustomRange: true,
                dualState: true,
                dualStartState: null,
                dualEndState: null,
                storageFormat: 'YYYY-MM-DD',
                storageTimezone: 'UTC',
                timezone: 'UTC',
                ranges: presets,
            });

            await component.openPicker();
            component.selectPreset('Last 7 Days');

            expect(component.config.dualStartState).toBe('2026-11-03');
            expect(component.config.dualEndState).toBe('2026-11-09');
            expect(component.open).toBe(false);
        });

        it('keeps a disabled preset inert and the dropdown open', async () => {
            const { component } = await createTestComponent({
                disableCustomRange: true,
                minDate: '2026-11-09',
                maxDate: '2026-11-09',
                ranges: presets,
            });

            await component.openPicker();
            component.selectPreset('Yesterday');

            expect(component.config.state).toBe('');
            expect(component.open).toBe(true);
        });

        it('applies a month-picker preset and closes', async () => {
            const { component } = await createTestComponent({
                disableCustomRange: true,
                pickerType: 'month',
                displayFormat: 'MM/YYYY',
                ranges: { 'This Month': ['2026-11-01', '2026-11-30'] },
            });

            await component.openPicker();
            component.selectPreset('This Month');

            expect(component.config.state).toBe('11/2026 - 11/2026');
            expect(component.open).toBe(false);
        });

        it('still waits for Apply by default', async () => {
            const { component } = await createTestComponent({ ranges: presets });

            await component.openPicker();
            component.selectPreset('Yesterday');

            expect(component.config.state).toBe('');
            expect(component.open).toBe(true);
        });
    });

    describe('no custom range through the keyboard', () => {
        it('does not pick the focused day on Enter', async () => {
            const { component } = await createTestComponent({ disableCustomRange: true, ranges: presets });

            await component.openPicker();
            const event = keydown(component, 'Enter');

            expect(component.selection.start).toBeNull();
            expect(event.defaultPrevented).toBe(false);
        });

        it('does not pick the focused day on Enter in the input', async () => {
            const { component } = await createTestComponent({ disableCustomRange: true, ranges: presets });

            await component.openPicker();
            keydown(component, 'Enter', component.$refs.input);

            expect(component.selection.start).toBeNull();
            expect(component.config.state).toBe('');
        });

        it('still closes on Escape', async () => {
            const { component } = await createTestComponent({ disableCustomRange: true, ranges: presets });

            await component.openPicker();
            keydown(component, 'Escape');

            expect(component.open).toBe(false);
        });

        it('still picks the focused day on Enter by default', async () => {
            const { component } = await createTestComponent({ ranges: presets });

            await component.openPicker();
            keydown(component, 'Enter');

            expect(component.selection.start).not.toBeNull();
        });
    });

    describe('typed input', () => {
        const typed = async (value, options = {}) => {
            const { component } = await createTestComponent({
                disableCustomRange: true,
                allowInput: true,
                ranges: presets,
                ...options,
            });

            return { component, accepted: component.handleManualInput(value, { revertOnInvalid: true }) };
        };

        it('rejects a typed range that is no preset', async () => {
            const { component, accepted } = await typed('01/11/2026 - 05/11/2026');

            expect(accepted).toBe(false);
            expect(component.config.state).toBe('');
            expect(component.selection.start).toBeNull();
        });

        it('reverts the input to the applied preset', async () => {
            const { component, accepted } = await typed('01/11/2026 - 05/11/2026', {
                initialState: '08/11/2026 - 08/11/2026',
            });

            expect(accepted).toBe(false);
            expect(component.config.state).toBe('08/11/2026 - 08/11/2026');
            expect(component.inputValue).toBe('08/11/2026 - 08/11/2026');
        });

        it('accepts a typed range equal to a preset', async () => {
            const { component, accepted } = await typed('03/11/2026 - 09/11/2026');

            expect(accepted).toBe(true);
            expect(component.config.state).toBe('03/11/2026 - 09/11/2026');
            expect(component.isActiveRange('Last 7 Days')).toBe(true);
        });

        it('rejects a typed range equal to a disabled preset', async () => {
            const { component, accepted } = await typed('08/11/2026 - 08/11/2026', {
                minDate: '2026-11-09',
                maxDate: '2026-11-09',
            });

            expect(accepted).toBe(false);
            expect(component.config.state).toBe('');
        });

        it('still clears on an emptied input', async () => {
            const { component, accepted } = await typed('', { initialState: '08/11/2026 - 08/11/2026' });

            expect(accepted).toBe(true);
            expect(component.config.state).toBe('');
        });

        it('still accepts any typed range without the option', async () => {
            const { component } = await createTestComponent({ allowInput: true, ranges: presets });

            expect(component.handleManualInput('01/11/2026 - 05/11/2026')).toBe(true);
            expect(component.config.state).toBe('01/11/2026 - 05/11/2026');
        });
    });
});
