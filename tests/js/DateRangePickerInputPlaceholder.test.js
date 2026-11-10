import { describe, expect, it } from 'vitest';
import { createTestComponent, flushPromises } from './setup.js';

/**
 * allowInput() turns the input into an always-on mask, which used to hide a
 * placeholder() set on the field: the mask overwrote the attribute and its
 * guide ("__/__/____") filled the value, so the placeholder never showed.
 *
 * With an explicit placeholder, the field shows it while empty and
 * unfocused, and shows the mask guide once focused. Without one, the mask
 * behaves as before.
 */
const typeIntoInput = (component, value) => {
    const input = component.$refs.input;
    input.value = value;
    input.setSelectionRange(value.length, value.length);
    input.dispatchEvent(new Event('input', { bubbles: true }));
};

const focus = (component) => component.$refs.input.dispatchEvent(new Event('focus'));
const blur = (component) => component.$refs.input.dispatchEvent(new Event('blur'));

const withPlaceholder = (config = {}) => createTestComponent({
    allowInput: true,
    displayFormat: 'DD/MM/YYYY',
    inputAttributes: { placeholder: 'Pick a period' },
    ...config,
});

describe('placeholder() with allowInput()', () => {
    it('shows the placeholder, not the mask guide, while empty and unfocused', async () => {
        const { component } = await withPlaceholder();
        const input = component.$refs.input;

        expect(input.getAttribute('placeholder')).toBe('Pick a period');
        expect(input.value).toBe('');
    });

    it('shows the mask guide once focused, and the placeholder again on blur', async () => {
        const { component } = await withPlaceholder();
        const input = component.$refs.input;

        focus(component);
        expect(input.value).toBe('__/__/____ - __/__/____');

        blur(component);
        expect(input.value).toBe('');
        expect(input.getAttribute('placeholder')).toBe('Pick a period');
    });

    it('keeps the guide on blur while a partial value is typed', async () => {
        const { component } = await withPlaceholder();

        focus(component);
        typeIntoInput(component, '01/03/2026 - 15/0');
        blur(component);

        expect(component.$refs.input.value).toContain('01/03/2026');
    });

    it('commits a typed range, then clears it from the keyboard', async () => {
        const { component } = await withPlaceholder();

        focus(component);
        typeIntoInput(component, '01/03/2026 - 15/03/2026');
        await flushPromises();
        expect(component.config.state).toBe('01/03/2026 - 15/03/2026');

        typeIntoInput(component, '');
        await flushPromises();
        expect(component.config.state).toBeNull();

        blur(component);
        expect(component.$refs.input.value).toBe('');
        expect(component.config.state).toBeNull();
    });

    it('does not take focus or blur on an untouched field for user input', async () => {
        const { component } = await withPlaceholder({ initialState: '01/03/2026 - 15/03/2026' });

        expect(component.$refs.input.value).toBe('01/03/2026 - 15/03/2026');

        focus(component);
        blur(component);
        await flushPromises();

        expect(component._inputMaskEditedByUser).toBe(false);
        expect(component.config.state).toBe('01/03/2026 - 15/03/2026');
        expect(component.$refs.input.value).toBe('01/03/2026 - 15/03/2026');
    });

    it('does not take its own empty write for the user clearing the field', async () => {
        const { component } = await withPlaceholder({ initialState: '01/03/2026 - 15/03/2026' });

        focus(component);
        // Half a range picked on the calendar: the picker writes an empty mask.
        component.selection = { start: component.selection.start, end: null };
        component.updateInputValue();
        blur(component);
        await flushPromises();

        expect(component._inputMaskEditedByUser).toBe(false);
        expect(component.commitManualInput()).toBe(false);
        expect(component.config.state).toBe('01/03/2026 - 15/03/2026');
    });

    it('works for a single date field', async () => {
        const { component } = await withPlaceholder({ singleCalendar: true });
        const input = component.$refs.input;

        expect(input.value).toBe('');
        focus(component);
        expect(input.value).toBe('__/__/____');
        blur(component);
        expect(input.value).toBe('');
    });

    it('commits a single date typed after focusing', async () => {
        const { component } = await withPlaceholder({ singleCalendar: true });

        focus(component);
        typeIntoInput(component, '15/03/2026');
        await flushPromises();

        expect(component.config.state).toBe('15/03/2026');
        blur(component);
        expect(component.$refs.input.value).toBe('15/03/2026');
    });

    it('works for a month picker', async () => {
        const { component } = await withPlaceholder({ pickerType: 'month', displayFormat: 'MM/YYYY' });
        const input = component.$refs.input;

        expect(input.value).toBe('');
        focus(component);
        expect(input.value).toBe('__/____ - __/____');
        typeIntoInput(component, '03/2026 - 05/2026');
        await flushPromises();
        expect(component.config.state).toBe('03/2026 - 05/2026');
    });

    it('keeps the always-on mask guide when no placeholder is set', async () => {
        const { component } = await createTestComponent({
            allowInput: true,
            displayFormat: 'DD/MM/YYYY',
        });
        const input = component.$refs.input;

        expect(input.value).toBe('__/__/____ - __/__/____');
        expect(input.getAttribute('placeholder')).toBe('dd/mm/yyyy - dd/mm/yyyy');

        focus(component);
        blur(component);
        expect(input.value).toBe('__/__/____ - __/__/____');
    });
});
