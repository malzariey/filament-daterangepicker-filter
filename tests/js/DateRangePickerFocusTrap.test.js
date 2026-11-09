/**
 * Issue #264: inside a Filament modal or slide-over, the time picker's
 * <select>s could not keep focus. The dropdown is teleported to <body>,
 * outside the modal's x-trap container, and focus-trap pulls focus back
 * into the modal from a `focusin` (and Tab `keydown`) capture listener on
 * `document`.
 *
 * The trap here mimics focus-trap's handlers: same events, same phase, same
 * refocus-the-last-node behaviour.
 */

import { describe, it, expect, beforeAll, beforeEach, afterEach } from 'vitest';
import { installFocusTrapGuard } from '../../resources/js/filament-daterangepicker.js';

// Filament 5 modal markup: .fi-modal (gets .fi-modal-open while open) >
// .fi-modal-window-ctn > .fi-modal-window, with the picker field inside.
// The picker marks its root with its instance id; the teleported dropdown
// carries the same id.
const INSTANCE = 'daterange-test';

function createPickerField(instance = INSTANCE) {
    const field = document.createElement('div');
    field.setAttribute('data-fi-daterangepicker-instance', instance);
    return field;
}

function createModalTrap() {
    const root = document.createElement('div');
    root.className = 'fi-modal fi-modal-open';
    const modal = document.createElement('div');
    modal.className = 'fi-modal-window';
    const input = document.createElement('input');
    input.id = 'modal-input';
    modal.appendChild(input);
    modal.appendChild(createPickerField());
    root.appendChild(modal);
    document.body.appendChild(root);

    let mostRecentlyFocused = input;

    const onFocusIn = (event) => {
        if (modal.contains(event.target)) {
            mostRecentlyFocused = event.target;
            return;
        }
        event.stopImmediatePropagation();
        mostRecentlyFocused.focus();
    };

    const onKeydown = (event) => {
        if (event.key !== 'Tab' || modal.contains(event.target)) return;
        event.preventDefault();
        input.focus();
    };

    document.addEventListener('focusin', onFocusIn, true);
    document.addEventListener('keydown', onKeydown, true);

    return {
        modal,
        input,
        destroy() {
            document.removeEventListener('focusin', onFocusIn, true);
            document.removeEventListener('keydown', onKeydown, true);
            root.remove();
        },
    };
}

function createTeleportedDropdown(instance = INSTANCE) {
    // Teleported to <body>, a sibling of the modal, as x-teleport="body" does.
    const dropdown = document.createElement('div');
    dropdown.className = 'fi-daterangepicker-dropdown';
    dropdown.id = `fi-daterangepicker-dropdown-${instance}`;
    dropdown.innerHTML = `
        <select class="fi-daterangepicker-select fi-time" id="hour">
            <option value="0">00</option><option value="1">01</option>
        </select>
        <select class="fi-daterangepicker-select fi-time" id="minute">
            <option value="0">00</option><option value="1">01</option>
        </select>
    `;
    document.body.appendChild(dropdown);

    return dropdown;
}

describe('Focus inside a focus-trapped modal (#264)', () => {
    let trap;
    let dropdown;

    beforeAll(() => {
        // Importing the module installs the guard; calling again is a no-op.
        installFocusTrapGuard();
    });

    beforeEach(() => {
        trap = createModalTrap();
        dropdown = createTeleportedDropdown();
        trap.input.focus();
    });

    afterEach(() => {
        trap.destroy();
        dropdown.remove();
    });

    it('installs the guard once per window', () => {
        expect(window.__fiDaterangepickerFocusTrapGuard).toBe(true);
    });

    it('lets a time select in the teleported dropdown keep focus', () => {
        const hour = dropdown.querySelector('#hour');

        hour.focus();

        expect(document.activeElement).toBe(hour);
    });

    it('does not let Tab inside the dropdown be pulled back into the modal', () => {
        const hour = dropdown.querySelector('#hour');
        hour.focus();

        const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
        hour.dispatchEvent(event);

        expect(event.defaultPrevented).toBe(false);
        expect(document.activeElement).toBe(hour);
    });

    it('still traps focus that leaves for anything outside the dropdown', () => {
        const outside = document.createElement('button');
        document.body.appendChild(outside);

        outside.focus();

        expect(document.activeElement).toBe(trap.input);
        outside.remove();
    });
});

describe('Focus events outside a focus-trapped modal (#264 follow-up)', () => {
    let field;
    let dropdown;
    let seen;
    const onDocFocusIn = (event) => seen.push(`document:focusin:${event.target.id}`);
    const onDocKeydown = (event) => seen.push(`document:keydown:${event.key}`);
    const onDropdownFocusIn = (event) => seen.push(`dropdown:focusin:${event.target.id}`);

    beforeAll(() => {
        installFocusTrapGuard();
    });

    beforeEach(() => {
        seen = [];
        field = createPickerField();
        document.body.appendChild(field);
        dropdown = createTeleportedDropdown();
        dropdown.addEventListener('focusin', onDropdownFocusIn);
        document.addEventListener('focusin', onDocFocusIn);
        document.addEventListener('keydown', onDocKeydown);
    });

    afterEach(() => {
        document.removeEventListener('focusin', onDocFocusIn);
        document.removeEventListener('keydown', onDocKeydown);
        field.remove();
        dropdown.remove();
    });

    it('lets focusin from the dropdown reach document and @focusin listeners', () => {
        const hour = dropdown.querySelector('#hour');

        hour.focus();

        expect(document.activeElement).toBe(hour);
        expect(seen).toEqual(['dropdown:focusin:hour', 'document:focusin:hour']);
    });

    it('lets Tab keydown from the dropdown reach document listeners', () => {
        const hour = dropdown.querySelector('#hour');
        hour.focus();
        seen = [];

        hour.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }));

        expect(seen).toEqual(['document:keydown:Tab']);
    });

    it('lets events propagate when the modal holding the field is closed', () => {
        const root = document.createElement('div');
        root.className = 'fi-modal';
        const win = document.createElement('div');
        win.className = 'fi-modal-window';
        root.appendChild(win);
        win.appendChild(field);
        document.body.appendChild(root);

        dropdown.querySelector('#hour').focus();

        expect(seen).toEqual(['dropdown:focusin:hour', 'document:focusin:hour']);
        root.remove();
    });

    it('lets events propagate for a dropdown with no known picker', () => {
        dropdown.id = 'fi-daterangepicker-dropdown-unknown';

        dropdown.querySelector('#hour').focus();

        expect(seen).toEqual(['dropdown:focusin:hour', 'document:focusin:hour']);
    });
});
