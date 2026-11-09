/**
 * Tabbing away from a picker left its dropdown open: the next field took
 * focus and opened its own picker, so two dropdowns overlapped. Pickers only
 * closed on a document click.
 *
 * Focus that lands outside both the picker's trigger and its teleported
 * dropdown now closes the picker the same way an outside click does
 * (cancel(): a pending, unapplied selection is discarded). Focus moving
 * between the trigger and the dropdown's own controls keeps it open.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createTestComponent } from './setup.js';
import { installFocusTrapGuard } from '../../resources/js/filament-daterangepicker.js';

const realInput = () => {
    const input = document.createElement('input');
    input.type = 'text';
    return input;
};

async function mountPicker(config = {}) {
    const { component } = await createTestComponent(config);

    // Real focusable elements: the input inside the trigger, and the
    // dropdown's controls teleported to <body>.
    const input = realInput();
    component.$refs.trigger.appendChild(input);
    component.$refs.input = input;
    document.body.appendChild(component.$refs.trigger);

    const dropdown = component.$refs.dropdown;
    dropdown.className = 'fi-daterangepicker-dropdown';
    dropdown.innerHTML = `
        <button type="button" class="preset">Today</button>
        <select class="hour"><option value="0">00</option><option value="1">01</option></select>
        <button type="button" class="apply">Apply</button>
    `;
    document.body.appendChild(dropdown);

    return { component, input, dropdown };
}

describe('Closing when focus leaves the picker', () => {
    let next;

    beforeEach(() => {
        next = realInput();
    });

    afterEach(() => {
        next.remove();
    });

    it('cancels when focus moves to the next field (Tab)', async () => {
        const { component, input } = await mountPicker();
        document.body.appendChild(next);
        const cancel = vi.spyOn(component, 'cancel');

        input.focus();
        component.open = true;

        next.focus();

        expect(cancel).toHaveBeenCalledOnce();
        expect(component.open).toBe(false);
        component.destroy();
    });

    it('cancels when focus moves to the previous field (Shift+Tab)', async () => {
        document.body.appendChild(next);
        const { component, input } = await mountPicker();
        const cancel = vi.spyOn(component, 'cancel');

        input.focus();
        component.open = true;

        next.focus();

        expect(cancel).toHaveBeenCalledOnce();
        expect(component.open).toBe(false);
        component.destroy();
    });

    it('discards a pending selection, like an outside click', async () => {
        const { component, input } = await mountPicker({ initialState: '01/10/2026 - 05/10/2026' });
        document.body.appendChild(next);

        input.focus();
        component.open = true;
        component.selection = { start: dayjs('2026-11-01'), end: dayjs('2026-11-03') };

        next.focus();

        expect(component.selection.start.format('YYYY-MM-DD')).toBe('2026-10-01');
        expect(component.selection.end.format('YYYY-MM-DD')).toBe('2026-10-05');
        component.destroy();
    });

    it('keeps the picker open while focus moves into and through the dropdown', async () => {
        const { component, input, dropdown } = await mountPicker({ timePicker: true });
        const cancel = vi.spyOn(component, 'cancel');

        input.focus();
        component.open = true;

        dropdown.querySelector('.preset').focus();
        dropdown.querySelector('.hour').focus();
        dropdown.querySelector('.apply').focus();
        input.focus();

        expect(cancel).not.toHaveBeenCalled();
        expect(component.open).toBe(true);
        component.destroy();
    });

    it('does nothing while closed', async () => {
        const { component, input } = await mountPicker();
        document.body.appendChild(next);
        const cancel = vi.spyOn(component, 'cancel');

        input.focus();
        next.focus();

        expect(cancel).not.toHaveBeenCalled();
        component.destroy();
    });

    it('only one of two pickers stays open when focus tabs from the first to the second', async () => {
        const first = await mountPicker();
        const second = await mountPicker();

        first.input.focus();
        first.component.open = true;

        second.input.focus();
        second.component.open = true;

        expect(first.component.open).toBe(false);
        expect(second.component.open).toBe(true);
        first.component.destroy();
        second.component.destroy();
    });

    it('stops listening after destroy()', async () => {
        const { component, input } = await mountPicker();
        document.body.appendChild(next);
        const cancel = vi.spyOn(component, 'cancel');

        input.focus();
        component.open = true;
        component.destroy();

        next.focus();

        expect(cancel).not.toHaveBeenCalled();
    });

    it('keeps the picker open for focus inside its dropdown in a trapping modal (#264)', async () => {
        installFocusTrapGuard();

        const modal = document.createElement('div');
        modal.className = 'fi-modal fi-modal-open';
        document.body.appendChild(modal);

        const { component, input, dropdown } = await mountPicker({ timePicker: true });
        modal.appendChild(component.$refs.trigger);
        component.$el = component.$refs.trigger;
        component.$el.setAttribute('data-fi-daterangepicker-instance', component.instanceId);
        modal.appendChild(next);
        const cancel = vi.spyOn(component, 'cancel');

        input.focus();
        component.open = true;

        const hour = dropdown.querySelector('.hour');
        hour.focus();
        expect(document.activeElement).toBe(hour);
        expect(component.open).toBe(true);

        next.focus();
        expect(cancel).toHaveBeenCalledOnce();
        expect(component.open).toBe(false);

        component.destroy();
        modal.remove();
    });
});
