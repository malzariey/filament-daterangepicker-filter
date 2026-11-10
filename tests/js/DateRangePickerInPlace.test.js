/**
 * teleport(false): the dropdown renders in place, inside the picker's own
 * root (the field wrapper), instead of at the end of <body>.
 *
 * Two things change once the dropdown is a descendant of the component:
 *
 * - Its keydowns now bubble to the root's x-on:keydown="handleKeydown".
 *   Teleported, they never did, so the calendar keys (Enter picks the
 *   focused date, arrows move it) would fire on top of a focused button or
 *   time <select>. Keys from inside the dropdown stay theirs.
 * - Inside a Filament modal the dropdown is inside the modal's x-trap
 *   container, so the #264 focus-trap guard has nothing to protect it from
 *   and must not hide its focusin from the trap and other listeners.
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { createTestComponent } from './setup.js';
import { installFocusTrapGuard } from '../../resources/js/filament-daterangepicker.js';

const presets = {
    Today: ['2026-11-09', '2026-11-09'],
    Yesterday: ['2026-11-08', '2026-11-08'],
};

/**
 * A picker whose dropdown sits inside its root, as x-if renders it with
 * teleport(false): root > trigger > input, root > dropdown > controls.
 */
async function mountInPlace(config = {}, parent = document.body) {
    const { component } = await createTestComponent({ teleport: false, ...config });

    const root = document.createElement('div');
    root.className = 'fi-fo-date-range-picker';
    root.setAttribute('data-fi-daterangepicker-instance', component.instanceId);

    const input = document.createElement('input');
    component.$refs.trigger.appendChild(input);
    component.$refs.input = input;
    root.appendChild(component.$refs.trigger);

    const dropdown = component.$refs.dropdown;
    dropdown.className = 'fi-daterangepicker-dropdown';
    dropdown.innerHTML = `
        <button type="button" class="fi-daterangepicker-range-btn">Today</button>
        <select class="fi-daterangepicker-select fi-time hour"><option value="0">00</option><option value="1">01</option></select>
        <button type="button" class="apply">Apply</button>
    `;
    root.appendChild(dropdown);
    parent.appendChild(root);

    component.$el = root;
    root.addEventListener('keydown', (event) => component.handleKeydown(event));

    return { component, root, input, dropdown };
}

const press = (target, key) => {
    const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
    target.dispatchEvent(event);

    return event;
};

describe('teleport(false): dropdown rendered in place', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    describe('keys from inside the dropdown', () => {
        it('do not pick the focused calendar date on Enter', async () => {
            const { component, dropdown } = await mountInPlace();
            await component.openPicker();
            const click = vi.spyOn(component, 'handleDayClick');

            const event = press(dropdown.querySelector('.apply'), 'Enter');

            expect(click).not.toHaveBeenCalled();
            expect(event.defaultPrevented).toBe(false);
            expect(component.selection.start).toBeNull();
        });

        it('leave the arrow keys to a focused time <select>', async () => {
            const { component, dropdown } = await mountInPlace({ timePicker: true });
            await component.openPicker();
            const before = component.focusedDate;

            const event = press(dropdown.querySelector('.hour'), 'ArrowDown');

            expect(event.defaultPrevented).toBe(false);
            expect(component.focusedDate.isSame(before, 'day')).toBe(true);
        });

        it('still drive the calendar from outside the dropdown', async () => {
            const { component } = await mountInPlace();
            await component.openPicker();
            const before = component.focusedDate;

            const event = press(component.$refs.trigger, 'ArrowDown');

            expect(event.defaultPrevented).toBe(true);
            expect(component.focusedDate.diff(before, 'day')).toBe(7);
        });

        it('still step through presets-only presets with the arrows', async () => {
            const { component, dropdown } = await mountInPlace({ disableCustomRange: true, ranges: presets });
            await component.openPicker();
            dropdown.querySelector('.fi-daterangepicker-range-btn').focus();

            const event = press(dropdown.querySelector('.fi-daterangepicker-range-btn'), 'ArrowDown');

            expect(event.defaultPrevented).toBe(true);
            component.destroy();
        });
    });

    describe('focus inside a modal', () => {
        it('lets focusin from an in-place dropdown reach the modal trap', async () => {
            installFocusTrapGuard();

            const modal = document.createElement('div');
            modal.className = 'fi-modal fi-modal-open';
            document.body.appendChild(modal);

            const { component, dropdown } = await mountInPlace({ timePicker: true }, modal);
            const seen = vi.fn();
            document.addEventListener('focusin', seen, true);

            const hour = dropdown.querySelector('.hour');
            hour.focus();

            expect(document.activeElement).toBe(hour);
            expect(seen).toHaveBeenCalled();

            document.removeEventListener('focusin', seen, true);
            component.destroy();
        });

        it('lets Tab from an in-place dropdown reach the modal trap', async () => {
            installFocusTrapGuard();

            const modal = document.createElement('div');
            modal.className = 'fi-modal fi-modal-open';
            document.body.appendChild(modal);

            const { component, dropdown } = await mountInPlace({ timePicker: true }, modal);
            const seen = vi.fn();
            document.addEventListener('keydown', seen, true);

            press(dropdown.querySelector('.hour'), 'Tab');

            expect(seen).toHaveBeenCalled();

            document.removeEventListener('keydown', seen, true);
            component.destroy();
        });

        it('closes when focus moves to the next modal field', async () => {
            installFocusTrapGuard();

            const modal = document.createElement('div');
            modal.className = 'fi-modal fi-modal-open';
            document.body.appendChild(modal);
            const next = document.createElement('input');

            const { component, input, dropdown } = await mountInPlace({ timePicker: true }, modal);
            modal.appendChild(next);
            input.focus();
            await component.openPicker();

            dropdown.querySelector('.hour').focus();
            expect(component.open).toBe(true);

            next.focus();
            expect(component.open).toBe(false);

            component.destroy();
        });
    });

    describe('positioning', () => {
        it('positions its own ref with the absolute strategy', async () => {
            const { computePosition } = await import('@floating-ui/dom');
            const { component, dropdown } = await mountInPlace();
            // jsdom does no layout; a visible trigger has an offsetParent.
            Object.defineProperty(component.$refs.trigger, 'offsetParent', { get: () => document.body });

            await component.openPicker();

            expect(computePosition).toHaveBeenCalledWith(
                component.$refs.trigger,
                dropdown,
                expect.objectContaining({ strategy: 'absolute' }),
            );
            expect(dropdown.style.position).toBe('absolute');
        });
    });
});
