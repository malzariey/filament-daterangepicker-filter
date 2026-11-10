import { describe, expect, it } from 'vitest';
import { clickDay, createTestComponent, flushPromises } from './setup.js';

/**
 * Times that are not on the minute increment.
 *
 * timePickerIncrement(30) offers the minutes 0 and 30, but a stored record
 * ("08:45"), a typed value (allowInput) or a server default can hold any
 * minute. The time must reach the selects, the input and the state exactly
 * as stored, never as "Invalid Date" or silently rounded, until the user
 * edits it.
 *
 * A <select> whose value has no matching <option> reads back as "", which
 * x-model writes into the time: renderSelect() builds the select the way
 * the Blade view's x-for does, so the tests read what the browser shows.
 */

const renderSelect = (options, value) => {
    const select = document.createElement('select');

    options.forEach((option) => {
        const el = document.createElement('option');
        el.value = String(option.value);
        el.textContent = option.label;
        select.appendChild(el);
    });

    select.value = String(value);

    return select;
};

const shown = (component, which) => {
    const time = component[which];

    return {
        hour: renderSelect(component.hourOptions, time.hour).value,
        minute: renderSelect(component.minuteOptions, time.minute).value,
        second: renderSelect(component.secondOptions, time.second).value,
    };
};

const typeIntoInput = (component, value) => {
    const input = component.$refs.input;
    input.value = value;
    input.setSelectionRange(value.length, value.length);
    input.dispatchEvent(new Event('input', { bubbles: true }));
};

const base24 = {
    timePicker: true,
    timePicker24: true,
    timePickerIncrement: 30,
    displayFormat: 'DD/MM/YYYY HH:mm',
};

const base12 = {
    timePicker: true,
    timePicker24: false,
    timePickerIncrement: 30,
    displayFormat: 'DD/MM/YYYY hh:mm A',
};

const baseSeconds = {
    timePicker: true,
    timePicker24: true,
    timePickerSecond: true,
    timePickerIncrement: 30,
    displayFormat: 'DD/MM/YYYY HH:mm:ss',
};

describe('Off-increment times (timePickerIncrement 30)', () => {
    describe('hydrating a stored value', () => {
        it('24h: keeps 08:45 and 17:15 in the state, input and selects', async () => {
            const stored = '10/11/2026 08:45 - 12/11/2026 17:15';
            const { component } = await createTestComponent({ ...base24, initialState: stored });

            expect(component.config.state).toBe(stored);
            expect(component.inputValue).toBe(stored);
            expect(shown(component, 'startTime')).toMatchObject({ hour: '8', minute: '45' });
            expect(shown(component, 'endTime')).toMatchObject({ hour: '17', minute: '15' });
            expect(component.selection.start.isValid()).toBe(true);
            expect(component.selection.end.isValid()).toBe(true);
        });

        it('12h: keeps 08:45 AM and 05:15 PM', async () => {
            const stored = '10/11/2026 08:45 AM - 12/11/2026 05:15 PM';
            const { component } = await createTestComponent({ ...base12, initialState: stored });

            expect(component.config.state).toBe(stored);
            expect(component.inputValue).toBe(stored);
            expect(shown(component, 'startTime')).toMatchObject({ hour: '8', minute: '45' });
            expect(shown(component, 'endTime')).toMatchObject({ hour: '5', minute: '15' });
            expect(component.endTime.ampm).toBe('PM');
        });

        it('with seconds: keeps 08:45:17 and 17:15:42', async () => {
            const stored = '10/11/2026 08:45:17 - 12/11/2026 17:15:42';
            const { component } = await createTestComponent({ ...baseSeconds, initialState: stored });

            expect(component.config.state).toBe(stored);
            expect(shown(component, 'startTime')).toEqual({ hour: '8', minute: '45', second: '17' });
            expect(shown(component, 'endTime')).toEqual({ hour: '17', minute: '15', second: '42' });
        });

        it('applying untouched sends the stored value back unchanged', async () => {
            const stored = '10/11/2026 08:45 - 12/11/2026 17:15';
            const { component } = await createTestComponent({ ...base24, initialState: stored });
            await component.openPicker();

            component.applySelection();

            expect(component.config.state).toBe(stored);
        });

        it('offers the increment minutes plus only the minutes in use', async () => {
            const { component } = await createTestComponent({
                ...base24,
                initialState: '10/11/2026 08:45 - 12/11/2026 17:15',
            });

            expect(component.minuteOptions.map((m) => m.value)).toEqual([0, 15, 30, 45]);
        });
    });

    describe('changing another select, then Apply', () => {
        it('24h: changing the end hour keeps the stored end minute', async () => {
            const { component } = await createTestComponent({
                ...base24,
                initialState: '10/11/2026 08:45 - 12/11/2026 17:15',
            });
            await component.openPicker();

            component.endTime.hour = '18'; // x-model writes the string
            component.handleTimeChange(false);
            component.applySelection();

            expect(component.config.state).toBe('10/11/2026 08:45 - 12/11/2026 18:15');
            expect(component.inputValue).toBe('10/11/2026 08:45 - 12/11/2026 18:15');
        });

        it('12h: changing the start hour keeps the stored start minute', async () => {
            const { component } = await createTestComponent({
                ...base12,
                initialState: '10/11/2026 08:45 AM - 12/11/2026 05:15 PM',
            });
            await component.openPicker();

            component.startTime.hour = '9';
            component.handleTimeChange(true);
            component.applySelection();

            expect(component.config.state).toBe('10/11/2026 09:45 AM - 12/11/2026 05:15 PM');
        });

        it('choosing an increment minute replaces the stored one', async () => {
            const { component } = await createTestComponent({
                ...base24,
                initialState: '10/11/2026 08:45 - 12/11/2026 17:15',
            });
            await component.openPicker();

            component.endTime.minute = '30';
            component.handleTimeChange(false);
            component.applySelection();

            expect(component.config.state).toBe('10/11/2026 08:45 - 12/11/2026 17:30');
            // 15 was only offered while it was the value.
            expect(component.minuteOptions.map((m) => m.value)).toEqual([0, 30, 45]);
        });
    });

    describe('typing with allowInput', () => {
        it('keeps a typed 08:45 - 17:15 and shows it in the selects', async () => {
            const { component } = await createTestComponent({ ...base24, allowInput: true });

            typeIntoInput(component, '10/11/2026 08:45 - 12/11/2026 17:15');
            await flushPromises();

            expect(component.config.state).toBe('10/11/2026 08:45 - 12/11/2026 17:15');
            expect(shown(component, 'startTime')).toMatchObject({ hour: '8', minute: '45' });
            expect(shown(component, 'endTime')).toMatchObject({ hour: '17', minute: '15' });
        });

        it('keeps a typed time after an hour change and Apply', async () => {
            const { component } = await createTestComponent({ ...base24, allowInput: true });

            typeIntoInput(component, '10/11/2026 08:45 - 12/11/2026 17:15');
            await flushPromises();
            await component.openPicker();

            component.startTime.hour = '7';
            component.handleTimeChange(true);
            component.applySelection();

            expect(component.config.state).toBe('10/11/2026 07:45 - 12/11/2026 17:15');
        });
    });

    describe('a server default (defaultCustom) off the increment', () => {
        // defaultCustom() reaches the browser as the field's initial state.
        it('hydrates and applies 01/01/2026 08:45 - 30/06/2026 17:15 unchanged', async () => {
            const stored = '01/01/2026 08:45 - 30/06/2026 17:15';
            const { component } = await createTestComponent({ ...base24, initialState: stored });
            await component.openPicker();

            component.endTime.hour = '17';
            component.handleTimeChange(false);
            component.applySelection();

            expect(component.config.state).toBe(stored);
        });
    });

    describe('a time no select offers (set from script)', () => {
        // A select set to a value it has no option for reads back as "",
        // which x-model writes into the time.
        const breakEndMinute = async (config, stored) => {
            const { component } = await createTestComponent({ ...config, initialState: stored });
            await component.openPicker();

            const select = renderSelect(component.minuteOptions, 0);
            select.value = '50';
            component.endTime.minute = select.value; // ""
            component.handleTimeChange(false);

            return component;
        };

        it('never writes Invalid Date to the input, the selection or the state', async () => {
            const stored = '10/11/2026 08:45 - 12/11/2026 17:15';
            const component = await breakEndMinute(base24, stored);

            expect(component.inputValue).not.toContain('Invalid');
            expect(component.selection.end.isValid()).toBe(true);
            expect(component.canApplySelection).toBe(false);

            component.applySelection();
            expect(component.config.state).toBe(stored);
        });

        it('recovers once a valid minute is chosen', async () => {
            const component = await breakEndMinute(base24, '10/11/2026 08:45 - 12/11/2026 17:15');

            component.endTime.minute = '30';
            component.handleTimeChange(false);

            expect(component.canApplySelection).toBe(true);
            component.applySelection();

            expect(component.config.state).toBe('10/11/2026 08:45 - 12/11/2026 17:30');
        });

        it('syncState refuses an invalid time instead of storing Invalid Date', async () => {
            const stored = '10/11/2026 08:45 - 12/11/2026 17:15';
            const { component } = await createTestComponent({ ...base24, initialState: stored });

            component.startTime.hour = 'x';

            expect(component.syncState()).toBe(false);
            expect(component.config.state).toBe(stored);
        });
    });
});
