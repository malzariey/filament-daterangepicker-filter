/**
 * Escape in a picker inside a Filament dropdown (the table's Filters panel)
 * closed the panel as well as the picker.
 *
 * Filament's dropdown handles Escape on `window` in the capture phase, before
 * the picker sees the key: when the target is inside an open panel it
 * dispatches a cancelable `dropdown-escape` event on the target, closes the
 * panel unless that event is cancelled, and stops the keydown there. Focus
 * then jumps to the panel's trigger, which closed the picker as a focus
 * leaving it.
 *
 * An open picker now cancels `dropdown-escape` and closes itself, so the
 * first Escape closes only the picker and a second one closes the panel.
 */

import { describe, it, expect, vi, beforeAll, afterAll, afterEach } from 'vitest';
import { createTestComponent } from './setup.js';

/*
 * Filament's Escape handling, copied from filament/support 5.11.2
 * (resources/js/components/dropdown.js: the window listener at the top and
 * handleEscape()). Copied rather than imported: the JS CI job installs no
 * Composer packages.
 */
const filamentEscapeListener = (event) => {
    if (event.key !== 'Escape' || !(event.target instanceof Element)) {
        return;
    }

    let dropdown = event.target.closest('.fi-dropdown');

    while (dropdown) {
        if (window.Alpine.$data(dropdown)?.handleEscape(event)) {
            return;
        }

        dropdown = dropdown.parentElement?.closest('.fi-dropdown');
    }
};

const filamentDropdown = () => ({
    handleEscape(event) {
        if (event.key !== 'Escape') {
            return;
        }

        const panel = this.$refs.panel;
        const trigger = this.$root.querySelector(':scope > .fi-dropdown-trigger');
        const isFromTrigger = trigger?.contains(event.target);

        if (
            !panel ||
            panel.style.display !== 'block' ||
            (!isFromTrigger && !panel.contains(event.target))
        ) {
            return false;
        }

        const shouldClose =
            isFromTrigger ||
            event.target.dispatchEvent(
                new CustomEvent('dropdown-escape', {
                    bubbles: true,
                    cancelable: true,
                }),
            );

        event.stopImmediatePropagation();

        if (!shouldClose) {
            return true;
        }

        this.close();

        this.getTrigger()?.focus();

        return true;
    },
});

beforeAll(() => window.addEventListener('keydown', filamentEscapeListener, true));
afterAll(() => window.removeEventListener('keydown', filamentEscapeListener, true));

const escape = (target) => {
    const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true });
    target.dispatchEvent(event);

    return event;
};

/**
 * A Filament dropdown with an open panel, holding the picker's trigger. The
 * picker's own dropdown is teleported to <body>, or with teleport(false)
 * rendered inside the panel.
 */
async function mountInFilamentDropdown(config = {}) {
    const { component } = await createTestComponent(config);

    const root = document.createElement('div');
    root.className = 'fi-dropdown';

    const panelTrigger = document.createElement('button');
    panelTrigger.type = 'button';
    panelTrigger.className = 'fi-dropdown-trigger';
    root.appendChild(panelTrigger);

    const panel = document.createElement('div');
    panel.className = 'fi-dropdown-panel';
    panel.style.display = 'block';
    root.appendChild(panel);

    const input = document.createElement('input');
    input.type = 'text';
    component.$refs.trigger.appendChild(input);
    component.$refs.input = input;
    panel.appendChild(component.$refs.trigger);

    const dropdown = component.$refs.dropdown;
    dropdown.className = 'fi-daterangepicker-dropdown';
    dropdown.innerHTML = `
        <button type="button" class="preset">Today</button>
        <select class="hour"><option value="0">00</option><option value="1">01</option></select>
    `;
    (config.teleport === false ? panel : document.body).appendChild(dropdown);

    document.body.appendChild(root);

    const panelData = filamentDropdown();
    panelData.$refs = { panel };
    panelData.$root = root;
    panelData.getTrigger = () => panelTrigger;
    panelData.close = vi.fn(() => { panel.style.display = 'none'; });
    window.Alpine.$data = (element) => (element === root ? panelData : undefined);

    return { component, input, dropdown, panel, panelData, root };
}

describe('Escape in a picker inside a Filament dropdown', () => {
    let mounted;

    afterEach(() => {
        mounted?.component.destroy();
        mounted?.root.remove();
        mounted?.dropdown.remove();
        delete window.Alpine.$data;
        mounted = null;
    });

    it('closes only the picker, then the panel on a second Escape', async () => {
        mounted = await mountInFilamentDropdown({ initialState: '01/10/2026 - 05/10/2026' });
        const { component, input, panel, panelData } = mounted;

        input.focus();
        component.open = true;
        component.selection.start = component.selection.start.add(3, 'day');

        escape(input);

        expect(component.open).toBe(false);
        expect(panelData.close).not.toHaveBeenCalled();
        expect(panel.style.display).toBe('block');
        expect(document.activeElement).toBe(input);
        // Cancelled, not applied.
        expect(component.config.state).toBe('01/10/2026 - 05/10/2026');
        expect(component.selection.start.format('YYYY-MM-DD')).toBe('2026-10-01');

        escape(input);

        expect(panelData.close).toHaveBeenCalledOnce();
        expect(panel.style.display).toBe('none');
    });

    it('lets Escape close the panel when the picker is closed', async () => {
        mounted = await mountInFilamentDropdown();
        const { component, input, panelData } = mounted;
        const cancel = vi.spyOn(component, 'cancel');

        input.focus();
        escape(input);

        expect(panelData.close).toHaveBeenCalledOnce();
        expect(cancel).not.toHaveBeenCalled();
    });

    it('closes only the picker from a control of a dropdown rendered in place', async () => {
        mounted = await mountInFilamentDropdown({ teleport: false, timePicker: true });
        const { component, dropdown, input, panelData } = mounted;

        input.focus();
        component.open = true;
        dropdown.querySelector('.hour').focus();

        escape(dropdown.querySelector('.hour'));

        expect(component.open).toBe(false);
        expect(panelData.close).not.toHaveBeenCalled();
        expect(document.activeElement).toBe(input);
    });

    it('leaves a teleported dropdown to its own Escape handler', async () => {
        mounted = await mountInFilamentDropdown({ presetsOnly: true });
        const { component, dropdown, input, panelData } = mounted;

        input.focus();
        component.open = true;
        dropdown.querySelector('.preset').focus();

        // Outside the Filament panel, so Filament ignores it; the Blade
        // view's @keydown.escape on the dropdown cancels.
        const event = escape(dropdown.querySelector('.preset'));

        expect(panelData.close).not.toHaveBeenCalled();
        expect(event.defaultPrevented).toBe(false);
    });

    it('ignores dropdown-escape from another picker', async () => {
        mounted = await mountInFilamentDropdown();
        const { component } = mounted;
        component.open = true;

        const outsider = document.createElement('input');
        document.body.appendChild(outsider);
        const event = new CustomEvent('dropdown-escape', { bubbles: true, cancelable: true });
        outsider.dispatchEvent(event);

        expect(event.defaultPrevented).toBe(false);
        expect(component.open).toBe(true);
        outsider.remove();
    });
});
