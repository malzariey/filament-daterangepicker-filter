import { describe, expect, it } from 'vitest';
import { clickDay, createTestComponent, dayjs, flushPromises } from './setup.js';

/**
 * Under allowInput() the picker writes its display value into the IMask
 * mask (updateInputValue), and IMask fires `accept` for that write as it
 * does for typing. Only typing is input: a calendar click that leaves half
 * a range shows the empty placeholder, and that must not read as the user
 * emptying the field (which clears the state).
 */
const typeIntoInput = (component, value) => {
    const input = component.$refs.input;
    input.value = value;
    input.setSelectionRange(value.length, value.length);
    input.dispatchEvent(new Event('input', { bubbles: true }));
};

const pressEnterInInput = (component) => {
    component.handleKeydown({
        key: 'Enter',
        target: component.$refs.input,
        preventDefault: () => {},
    });
};

const fmt = (date, format) => date?.format(format) ?? null;

describe('Programmatic mask updates are not user input', () => {
    describe('day range', () => {
        const config = {
            allowInput: true,
            displayFormat: 'DD/MM/YYYY',
            initialState: '01/03/2026 - 15/03/2026',
        };

        it('keeps the state and the clicked start after the first click', async () => {
            const { component } = await createTestComponent(config);
            await component.openPicker();

            clickDay(component, '2026-03-20');
            await flushPromises();

            expect(component.config.state).toBe('01/03/2026 - 15/03/2026');
            expect(fmt(component.selection.start, 'YYYY-MM-DD')).toBe('2026-03-20');
            expect(component.selection.end).toBeNull();
            expect(component.open).toBe(true);
        });

        it('commits the new range on Apply', async () => {
            const { component } = await createTestComponent(config);
            await component.openPicker();

            clickDay(component, '2026-03-20');
            clickDay(component, '2026-03-25');
            await flushPromises();

            expect(fmt(component.selection.start, 'YYYY-MM-DD')).toBe('2026-03-20');
            expect(fmt(component.selection.end, 'YYYY-MM-DD')).toBe('2026-03-25');

            component.applySelection();
            expect(component.config.state).toBe('20/03/2026 - 25/03/2026');
        });

        it('restores the old state on Cancel after a completed range', async () => {
            const { component } = await createTestComponent(config);
            await component.openPicker();

            clickDay(component, '2026-03-20');
            clickDay(component, '2026-03-25');
            await flushPromises();
            component.cancel();

            expect(component.config.state).toBe('01/03/2026 - 15/03/2026');
            expect(component.$refs.input.value).toBe('01/03/2026 - 15/03/2026');
        });

        it('keeps the state when Enter is pressed after a half range', async () => {
            const { component } = await createTestComponent(config);
            await component.openPicker();

            clickDay(component, '2026-03-20');
            pressEnterInInput(component);
            await flushPromises();

            expect(component.config.state).toBe('01/03/2026 - 15/03/2026');
            expect(fmt(component.selection.start, 'YYYY-MM-DD')).toBe('2026-03-20');
        });

        it('waits for Apply after a preset click', async () => {
            const { component } = await createTestComponent({
                ...config,
                ranges: { March: ['2026-03-01', '2026-03-31'] },
            });
            await component.openPicker();

            component.selectPreset('March');
            await flushPromises();

            expect(component.config.state).toBe('01/03/2026 - 15/03/2026');
            expect(component.$refs.input.value).toBe('01/03/2026 - 31/03/2026');
        });

        it('does not write an external state change back', async () => {
            const { component, watchers, wire } = await createTestComponent(config);
            wire.$set.mockClear();

            component.config.state = '';
            watchers.get('config.state')('');
            await flushPromises();

            expect(component.selection.start).toBeNull();
            expect(wire.$set).not.toHaveBeenCalled();
        });

        it('still commits a range typed after a click', async () => {
            const { component } = await createTestComponent(config);
            await component.openPicker();

            clickDay(component, '2026-03-20');
            typeIntoInput(component, '10/04/2026 - 12/04/2026');
            await flushPromises();

            expect(component.config.state).toBe('10/04/2026 - 12/04/2026');
        });

        it('still clears the state when the user empties the field after a completed click range', async () => {
            const { component } = await createTestComponent(config);
            await component.openPicker();

            clickDay(component, '2026-03-20');
            clickDay(component, '2026-03-25');
            typeIntoInput(component, '');
            await flushPromises();

            expect(component.config.state).toBeNull();
            expect(component.selection.start).toBeNull();
        });
    });

    describe('month range', () => {
        it('keeps the state and the clicked start after the first click', async () => {
            const { component } = await createTestComponent({
                pickerType: 'month',
                allowInput: true,
                displayFormat: 'MM/YYYY',
                initialState: '03/2026 - 05/2026',
            });
            await component.openPicker();

            component.handleMonthClick({ date: dayjs('2026-08-01'), disabled: false });
            await flushPromises();

            expect(component.config.state).toBe('03/2026 - 05/2026');
            expect(fmt(component.selection.start, 'YYYY-MM')).toBe('2026-08');
            expect(component.selection.end).toBeNull();
        });
    });

    describe('year range', () => {
        it('keeps the state and the clicked start after the first click', async () => {
            const { component } = await createTestComponent({
                pickerType: 'year',
                allowInput: true,
                displayFormat: 'YYYY',
                initialState: '2024 - 2026',
            });
            await component.openPicker();

            component.handleYearClick({ date: dayjs('2028-01-01'), disabled: false });
            await flushPromises();

            expect(component.config.state).toBe('2024 - 2026');
            expect(fmt(component.selection.start, 'YYYY')).toBe('2028');
            expect(component.selection.end).toBeNull();
        });
    });
});
