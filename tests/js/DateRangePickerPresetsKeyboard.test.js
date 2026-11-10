import { describe, expect, it } from 'vitest';
import { createTestComponent } from './setup.js';

/**
 * Presets-only mode (disableCustomRange()) from the keyboard. The dropdown
 * is teleported to the end of <body>, so after Enter opens the picker focus
 * is still in the input: ArrowDown / ArrowUp move it onto the presets,
 * Home / End jump to the ends of the list, and Enter or Space on a preset
 * applies it (the native button press) and puts focus back in the input.
 */
const presets = {
    Today: ['2026-11-09', '2026-11-09'],
    Yesterday: ['2026-11-08', '2026-11-08'],
    'Last 7 Days': ['2026-11-03', '2026-11-09'],
    Tomorrow: ['2026-11-10', '2026-11-10'],
};

// The real list (blade): one <button> per preset inside the dropdown,
// disabled when the preset lies outside minDate / maxDate.
const renderPresets = (component) => {
    const dropdown = component.$refs.dropdown;
    const list = document.createElement('ul');
    list.setAttribute('role', 'listbox');

    for (const label of Object.keys(component.config.ranges)) {
        const item = document.createElement('li');
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'fi-daterangepicker-range-btn';
        button.textContent = label;
        button.disabled = component.isPresetDisabled(label);
        button.addEventListener('click', () => component.selectPreset(label));
        item.appendChild(button);
        list.appendChild(item);
    }

    dropdown.appendChild(list);

    return [...dropdown.querySelectorAll('button')];
};

const inputKeydown = (component, key) => {
    const event = {
        key,
        target: component.$refs.input,
        shiftKey: false,
        defaultPrevented: false,
        preventDefault() { this.defaultPrevented = true; },
        stopPropagation() {},
    };

    component.handleKeydown(event);

    return event;
};

const buttonKeydown = (button, key) => {
    const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
    button.dispatchEvent(event);

    return event;
};

const openPresetsOnly = async (config = {}) => {
    const { component } = await createTestComponent({
        disableCustomRange: true,
        ranges: presets,
        ...config,
    });

    await component.openPicker();
    const buttons = renderPresets(component);

    return { component, buttons };
};

describe('presets-only keyboard', () => {
    it('moves focus from the input to the first preset on ArrowDown', async () => {
        const { component, buttons } = await openPresetsOnly();

        const event = inputKeydown(component, 'ArrowDown');

        expect(event.defaultPrevented).toBe(true);
        expect(document.activeElement).toBe(buttons[0]);
        expect(component.open).toBe(true);
    });

    it('moves focus from the input to the last preset on ArrowUp', async () => {
        const { component, buttons } = await openPresetsOnly();

        inputKeydown(component, 'ArrowUp');

        expect(document.activeElement).toBe(buttons[3]);
    });

    it('starts from the applied preset', async () => {
        const { component, buttons } = await openPresetsOnly({ initialState: '08/11/2026 - 08/11/2026' });

        inputKeydown(component, 'ArrowDown');

        expect(document.activeElement).toBe(buttons[1]);
    });

    it('walks the list with ArrowDown / ArrowUp and stops at the ends', async () => {
        const { component, buttons } = await openPresetsOnly();

        inputKeydown(component, 'ArrowDown');
        buttonKeydown(buttons[0], 'ArrowDown');
        expect(document.activeElement).toBe(buttons[1]);

        buttonKeydown(buttons[1], 'ArrowUp');
        expect(document.activeElement).toBe(buttons[0]);

        buttonKeydown(buttons[0], 'ArrowUp');
        expect(document.activeElement).toBe(buttons[0]);
    });

    it('jumps to the ends with Home / End', async () => {
        const { component, buttons } = await openPresetsOnly();

        inputKeydown(component, 'ArrowDown');
        const end = buttonKeydown(buttons[0], 'End');
        expect(end.defaultPrevented).toBe(true);
        expect(document.activeElement).toBe(buttons[3]);

        buttonKeydown(buttons[3], 'Home');
        expect(document.activeElement).toBe(buttons[0]);
    });

    it('skips disabled presets', async () => {
        // Only Today (2026-11-09) and Tomorrow (2026-11-10) fit.
        const { component, buttons } = await openPresetsOnly({
            minDate: '2026-11-09',
            maxDate: '2026-11-10',
        });

        expect(buttons.map((b) => b.disabled)).toEqual([false, true, false, false]);

        inputKeydown(component, 'ArrowDown');
        expect(document.activeElement).toBe(buttons[0]);

        buttonKeydown(buttons[0], 'ArrowDown');
        expect(document.activeElement).toBe(buttons[2]);

        buttonKeydown(buttons[2], 'Home');
        expect(document.activeElement).toBe(buttons[0]);
    });

    it('applies the focused preset on Enter and returns focus to the input', async () => {
        const { component, buttons } = await openPresetsOnly();

        inputKeydown(component, 'ArrowDown');
        buttonKeydown(buttons[0], 'ArrowDown');

        // Enter on a button is a native click; the handler leaves it alone.
        const enter = buttonKeydown(buttons[1], 'Enter');
        expect(enter.defaultPrevented).toBe(false);
        buttons[1].click();

        expect(component.config.state).toBe('08/11/2026 - 08/11/2026');
        expect(component.open).toBe(false);
        expect(component.$refs.input.focus).toHaveBeenCalled();
    });

    it('does not reopen the picker when focus returns to the input', async () => {
        const { component, buttons } = await openPresetsOnly();
        // The real input opens the picker on focus (no allowInput).
        component.$refs.input.focus.mockImplementation(() => component.openPicker());

        inputKeydown(component, 'ArrowDown');
        buttonKeydown(buttons[0], 'Enter');
        buttons[0].click();

        expect(component.config.state).toBe('09/11/2026 - 09/11/2026');
        expect(component.open).toBe(false);
    });

    it('returns focus to the input on Escape from a preset', async () => {
        const { component, buttons } = await openPresetsOnly();

        inputKeydown(component, 'ArrowDown');
        buttonKeydown(buttons[0], 'Escape');
        // The dropdown's own @keydown.escape handler cancels.
        component.cancel();

        expect(component.open).toBe(false);
        expect(component.$refs.input.focus).toHaveBeenCalled();
    });

    it.each([false, true])('leaves the list on Tab (shift: %s): cancels and hands focus to the input', async (shiftKey) => {
        // The dropdown is the last thing in <body>, so a native Tab off the
        // list would land on nothing and leave the picker open. Back in the
        // input, the browser's Tab carries on from the field.
        const { component, buttons } = await openPresetsOnly({ initialState: '08/11/2026 - 08/11/2026' });

        inputKeydown(component, 'ArrowDown');
        const event = new KeyboardEvent('keydown', { key: 'Tab', shiftKey, bubbles: true, cancelable: true });
        buttons[1].dispatchEvent(event);

        expect(event.defaultPrevented).toBe(false);
        expect(component.open).toBe(false);
        expect(component.config.state).toBe('08/11/2026 - 08/11/2026');
        expect(component.$refs.input.focus).toHaveBeenCalled();
    });

    it('leaves the input focus alone after a mouse click on a preset', async () => {
        const { component, buttons } = await openPresetsOnly();

        buttons[0].click();

        expect(component.open).toBe(false);
        expect(component.$refs.input.focus).not.toHaveBeenCalled();
    });

    it('does nothing while closed', async () => {
        const { component } = await createTestComponent({ disableCustomRange: true, ranges: presets });

        const event = inputKeydown(component, 'ArrowDown');

        expect(event.defaultPrevented).toBe(false);
    });

    it('leaves the arrow keys to the calendar without the option', async () => {
        const { component, buttons } = await openPresetsOnly({ disableCustomRange: false });
        const focused = component.focusedDate;

        buttonKeydown(buttons[0], 'ArrowDown');

        expect(document.activeElement).not.toBe(buttons[1]);
        expect(component.focusedDate.isSame(focused, 'day')).toBe(true);
    });
});
