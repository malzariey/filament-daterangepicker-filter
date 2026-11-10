import { describe, expect, it } from 'vitest';
import { createTestComponent, flushPromises } from './setup.js';

/**
 * Emptying a manual-input field from the keyboard (select-all + Backspace,
 * or deleting every character) must clear the state, as the clear button
 * does. The always-on mask (lazy: false) leaves its placeholder behind
 * ("__/____"), so the input never reads as an empty string.
 */
const typeIntoInput = (component, value) => {
    const input = component.$refs.input;
    input.value = value;
    input.setSelectionRange(value.length, value.length);
    input.dispatchEvent(new Event('input', { bubbles: true }));
};

const fields = [
    {
        name: 'day range',
        config: { displayFormat: 'DD/MM/YYYY' },
        state: '01/03/2026 - 15/03/2026',
        partial: '01/03/2026 - 15/0',
    },
    {
        name: 'single date',
        config: { singleCalendar: true, displayFormat: 'DD/MM/YYYY' },
        state: '15/03/2026',
        partial: '15/0',
    },
    {
        name: 'time picker range',
        config: { timePicker: true, timePicker24: true, displayFormat: 'DD/MM/YYYY HH:mm' },
        state: '01/03/2026 08:00 - 15/03/2026 17:30',
        partial: '01/03/2026 08:00 - 15/03/2026 1',
    },
    {
        name: 'month single',
        config: { pickerType: 'month', singleCalendar: true, displayFormat: 'MM/YYYY' },
        state: '03/2026',
        partial: '03/2',
    },
    {
        name: 'month range',
        config: { pickerType: 'month', displayFormat: 'MM/YYYY' },
        state: '03/2026 - 05/2026',
        partial: '03/2026 - 05/2',
    },
    {
        name: 'year single',
        config: { pickerType: 'year', singleCalendar: true, displayFormat: 'YYYY' },
        state: '2026',
        partial: '20',
    },
    {
        name: 'year range',
        config: { pickerType: 'year', displayFormat: 'YYYY' },
        state: '2024 - 2026',
        partial: '2024 - 20',
    },
];

describe('Clearing manual input from the keyboard', () => {
    describe.each(fields)('$name', ({ config, state, partial }) => {
        it('clears the state when every character is deleted', async () => {
            const { component } = await createTestComponent({
                ...config,
                allowInput: true,
                initialState: state,
            });

            expect(component.config.state).toBe(state);

            typeIntoInput(component, '');
            await flushPromises();

            expect(component.selection.start).toBeNull();
            expect(component.selection.end).toBeNull();
            expect(component.config.state).toBeNull();
        });

        it('clears the state when Enter is pressed on the empty mask', async () => {
            const { component } = await createTestComponent({
                ...config,
                allowInput: true,
                initialState: state,
            });

            typeIntoInput(component, '');
            component.handleKeydown({
                key: 'Enter',
                target: component.$refs.input,
                preventDefault: () => {},
            });
            await flushPromises();

            expect(component.config.state).toBeNull();
        });

        it('keeps the previous state while the input holds a partial value', async () => {
            const { component } = await createTestComponent({
                ...config,
                allowInput: true,
                initialState: state,
            });

            typeIntoInput(component, partial);
            await flushPromises();

            expect(component.config.state).toBe(state);
        });
    });

    it('commits a value typed after the field was cleared', async () => {
        const { component } = await createTestComponent({
            pickerType: 'month',
            singleCalendar: true,
            allowInput: true,
            displayFormat: 'MM/YYYY',
            initialState: '03/2026',
        });

        typeIntoInput(component, '');
        await flushPromises();
        expect(component.config.state).toBeNull();

        typeIntoInput(component, '07/2027');
        await flushPromises();
        expect(component.config.state).toBe('07/2027');
    });

    it('clears both dual-state values', async () => {
        const { component } = await createTestComponent({
            allowInput: true,
            dualState: true,
            dualStartState: '2026-08-04',
            dualEndState: '2026-08-05',
            storageFormat: 'YYYY-MM-DD',
            storageTimezone: 'UTC',
            displayFormat: 'DD/MM/YYYY',
        });

        expect(component.inputValue).toBe('04/08/2026 - 05/08/2026');

        typeIntoInput(component, '');
        await flushPromises();

        expect(component.config.state).toBeNull();
        expect(component.config.dualStartState).toBeNull();
        expect(component.config.dualEndState).toBeNull();
    });

    // The Clear action (DateRangePicker::clear() on the server) sets null,
    // and so does the picker's own clear(): every way of emptying the field
    // stores the same value.
    describe.each(fields)('$name: one empty value for every clear', ({ config, state }) => {
        it('stores null from the keyboard, clear() and the Clear action alike', async () => {
            const keyboard = await createTestComponent({ ...config, allowInput: true, initialState: state });
            typeIntoInput(keyboard.component, '');
            await flushPromises();

            const button = await createTestComponent({ ...config, allowInput: true, initialState: state });
            button.component.clear();
            await flushPromises();

            expect(keyboard.component.config.state).toBeNull();
            expect(button.component.config.state).toBeNull();
        });

        it('leaves an empty field null when the picker is cancelled', async () => {
            const { component } = await createTestComponent({ ...config, allowInput: true, initialState: state });
            typeIntoInput(component, '');
            await flushPromises();

            component.open = true;
            component.cancel();
            await flushPromises();

            expect(component.config.state).toBeNull();
            expect(component.selection.start).toBeNull();
        });
    });
});
