/**
 * Space and Enter typed in an allowInput() field. With the picker open, a
 * Space from the input fell through handleKeydown to the calendar switch,
 * which treats Enter / Space as "select the focused day": typing
 * "01/01/2024 - 15/01/2024" picked today on the first space (clearing what
 * was typed) and today again on the second. Under allowInput the input is a
 * text field: Space is a character for the mask, Enter commits the typed
 * value. Only keys from the grid select days. Without allowInput nothing
 * changes: Enter / Space open the closed picker and select the focused day
 * when open.
 */

import { describe, expect, it } from 'vitest';
import { createTestComponent, flushPromises } from './setup.js';

const ymd = (date) => date?.format('YYYY-MM-DD') ?? null;

// The input inside the component root, as in the Blade view: its keydowns
// bubble to the root's x-on:keydown="handleKeydown", after the document
// capture listeners for the grid and presets.
const mount = async (config = {}) => {
    const result = await createTestComponent(config);
    const { component } = result;
    const input = component.$refs.input;
    const root = document.createElement('div');
    root.appendChild(input);
    root.addEventListener('keydown', (event) => component.handleKeydown(event));
    document.body.appendChild(root);
    HTMLInputElement.prototype.focus.call(input);

    return result;
};

// A real key on the input: keydown, then, unless prevented, the browser's
// text insertion at the caret and its input event (which the mask handles).
const typeKey = (component, key) => {
    const input = component.$refs.input;
    const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
    input.dispatchEvent(event);

    if (!event.defaultPrevented && key.length === 1) {
        const start = input.selectionStart;
        const end = input.selectionEnd;
        input.value = input.value.slice(0, start) + key + input.value.slice(end);
        input.setSelectionRange(start + 1, start + 1);
        input.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: key }));
    }

    return event;
};

const typeText = (component, text) => [...text].map((char) => typeKey(component, char));

// Select everything in the input, as a user does before retyping.
const selectAll = (component) => {
    const input = component.$refs.input;
    input.setSelectionRange(0, input.value.length);
};

const openTyped = async (config = {}) => {
    const result = await mount({
        allowInput: true,
        initialState: '10/11/2026 - 12/11/2026',
        ...config,
    });
    await result.component.openPicker();
    await flushPromises();
    HTMLInputElement.prototype.focus.call(result.component.$refs.input);
    selectAll(result.component);

    return result;
};

describe('Space typed in an allowInput() field', () => {
    it('is a character for the mask, not a day pick, with the picker open', async () => {
        const { component } = await openTyped();
        expect(ymd(component.focusedDate)).toBe('2026-11-10');

        typeText(component, '01/01/2024');
        const event = typeKey(component, ' ');
        await flushPromises();

        expect(event.defaultPrevented).toBe(false);
        expect(component.$refs.input.value.startsWith('01/01/2024 ')).toBe(true);
        // A pick of the focused day would start a new range: end cleared.
        expect(ymd(component.selection.end)).toBe('2026-11-12');
        expect(component.config.state).toBe('10/11/2026 - 12/11/2026');
        expect(component.open).toBe(true);
    });

    it('commits a full range typed with spaces', async () => {
        const { component } = await openTyped();

        typeText(component, '01/01/2024 - 15/01/2024');
        await flushPromises();
        expect(component.$refs.input.value).toBe('01/01/2024 - 15/01/2024');

        const enter = typeKey(component, 'Enter');
        await flushPromises();

        expect(enter.defaultPrevented).toBe(true);
        expect(ymd(component.selection.start)).toBe('2024-01-01');
        expect(ymd(component.selection.end)).toBe('2024-01-15');
        expect(component.config.state).toBe('01/01/2024 - 15/01/2024');
    });

    it('Enter in the input commits the typed value', async () => {
        const { component } = await openTyped();

        // Digits only: the mask inserts the separators.
        typeText(component, '0303202620032026');
        await flushPromises();
        typeKey(component, 'Enter');
        await flushPromises();

        expect(ymd(component.selection.start)).toBe('2026-03-03');
        expect(ymd(component.selection.end)).toBe('2026-03-20');
        expect(component.config.state).toBe('03/03/2026 - 20/03/2026');
    });

    it('is a character with the picker closed too (no open, no pick)', async () => {
        const { component } = await mount({ allowInput: true, initialState: '10/11/2026 - 12/11/2026' });
        selectAll(component);

        typeText(component, '01/01/2024');
        const event = typeKey(component, ' ');
        await flushPromises();

        expect(event.defaultPrevented).toBe(false);
        expect(component.open).toBe(false);
        expect(component.$refs.input.value.startsWith('01/01/2024 ')).toBe(true);
    });

    it('ArrowDown opens the closed picker from the input', async () => {
        const { component } = await mount({ allowInput: true, initialState: '10/11/2026 - 12/11/2026' });

        const event = typeKey(component, 'ArrowDown');
        await flushPromises();

        expect(event.defaultPrevented).toBe(true);
        expect(component.open).toBe(true);
    });

    it('types the space before a 12h AM/PM slot and takes "p"', async () => {
        const { component } = await openTyped({
            singleCalendar: true,
            timePicker: true,
            timePicker24: false,
            displayFormat: 'DD/MM/YYYY hh:mm A',
            initialState: '10/11/2026 09:00 AM',
        });

        typeText(component, '15/03/2026 02:30 p');
        await flushPromises();
        expect(component.$refs.input.value).toBe('15/03/2026 02:30 PM');

        typeKey(component, 'Enter');
        await flushPromises();

        expect(component.selection.start.format('YYYY-MM-DD HH:mm')).toBe('2026-03-15 14:30');
    });

    it('types the space in place (teleport(false)) and in RTL', async () => {
        const { component } = await openTyped({ teleport: false });
        component.$refs.input.closest('div').setAttribute('dir', 'rtl');

        typeText(component, '01/01/2024 - 15/01/2024');
        typeKey(component, 'Enter');
        await flushPromises();

        expect(ymd(component.selection.start)).toBe('2024-01-01');
        expect(ymd(component.selection.end)).toBe('2024-01-15');
    });

    it('types the space with the calendars hidden (presets view)', async () => {
        const { component } = await openTyped({
            alwaysShowCalendars: false,
            ranges: { Today: ['2026-11-10', '2026-11-10'] },
            initialState: '',
        });
        expect(component.calendarsShown).toBe(false);

        typeText(component, '01/01/2024 - 15/01/2024');
        typeKey(component, 'Enter');
        await flushPromises();

        expect(ymd(component.selection.start)).toBe('2024-01-01');
        expect(ymd(component.selection.end)).toBe('2024-01-15');
    });
});

describe('Space / Enter without allowInput() keep their behaviour', () => {
    it.each(['Enter', ' '])('%j opens the closed picker', async (key) => {
        const { component } = await mount({ initialState: '10/11/2026 - 12/11/2026' });

        const event = typeKey(component, key);
        await flushPromises();

        expect(event.defaultPrevented).toBe(true);
        expect(component.open).toBe(true);
    });

    it.each(['Enter', ' '])('%j from the input selects the focused day when open', async (key) => {
        const { component } = await mount({ initialState: '10/11/2026 - 12/11/2026' });
        await component.openPicker();
        await flushPromises();
        component.focusedDate = component.selection.start.add(3, 'day');

        const event = typeKey(component, key);

        expect(event.defaultPrevented).toBe(true);
        expect(ymd(component.selection.start)).toBe('2026-11-13');
        expect(component.selection.end).toBeNull();
    });
});

describe('Space / Enter on a focused day cell still select it under allowInput()', () => {
    it.each(['Enter', ' '])('%j picks the focused day', async (key) => {
        const { component } = await openTyped();
        const dropdown = component.$refs.dropdown;
        const cell = document.createElement('button');
        cell.type = 'button';
        cell.className = 'fi-daterangepicker-day';
        cell.dataset.date = '2026-11-13';
        dropdown.appendChild(cell);
        cell.focus();
        component.focusedDate = component.selection.start.add(3, 'day');

        const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
        cell.dispatchEvent(event);
        await flushPromises();

        expect(event.defaultPrevented).toBe(true);
        expect(ymd(component.selection.start)).toBe('2026-11-13');
        expect(component.selection.end).toBeNull();
    });
});
