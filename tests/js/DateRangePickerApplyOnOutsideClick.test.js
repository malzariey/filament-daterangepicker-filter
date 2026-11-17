/**
 * A click or Tab away from an open picker discards a pending selection
 * (cancel()). Where the field is confirmed by a button outside the picker
 * (a filter panel's Apply, a wizard's Next), that click throws away what was
 * just picked, and with timePicker() the picker never closes on its own.
 *
 * applyOnOutsideClick() applies a complete, valid range on those closes
 * instead, as the original daterangepicker did on hide. Escape and Cancel
 * still discard, and so does an incomplete or invalid selection.
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { createTestComponent } from './setup.js';

const pending = (component) => {
    component.open = true;
    component.selection = { start: dayjs('2026-11-01'), end: dayjs('2026-11-03') };
};

async function mountPicker(config = {}) {
    const { component } = await createTestComponent({ initialState: '01/10/2026 - 05/10/2026', ...config });

    const input = document.createElement('input');
    component.$refs.trigger.appendChild(input);
    component.$refs.input = input;
    document.body.appendChild(component.$refs.trigger);

    const outside = document.createElement('button');
    document.body.appendChild(outside);

    return { component, input, outside };
}

describe('applyOnOutsideClick', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('discards a pending selection on an outside click by default', async () => {
        const { component, outside } = await mountPicker();
        pending(component);

        outside.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(component.open).toBe(false);
        expect(component.config.state).toBe('01/10/2026 - 05/10/2026');
        component.destroy();
    });

    it('applies a complete selection on an outside click', async () => {
        const { component, outside } = await mountPicker({ applyOnOutsideClick: true });
        const applied = vi.fn();
        component.$el = component.$refs.trigger;
        component.$el.addEventListener('apply.daterangepicker', applied);
        pending(component);

        outside.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(component.open).toBe(false);
        expect(component.config.state).toBe('01/11/2026 - 03/11/2026');
        expect(applied).toHaveBeenCalledOnce();
        component.destroy();
    });

    it('applies a complete selection when focus leaves the picker', async () => {
        const { component, input, outside } = await mountPicker({ applyOnOutsideClick: true });
        input.focus();
        pending(component);

        outside.focus();

        expect(component.open).toBe(false);
        expect(component.config.state).toBe('01/11/2026 - 03/11/2026');
        component.destroy();
    });

    it('applies the picked times, not only the days', async () => {
        const { component, outside } = await mountPicker({
            applyOnOutsideClick: true,
            timePicker: true,
            timePicker24: true,
            displayFormat: 'DD/MM/YYYY HH:mm',
            initialState: '01/10/2026 00:00 - 05/10/2026 23:59',
        });
        pending(component);
        component.startTime = { hour: 9, minute: 0, second: 0, ampm: 'AM' };
        component.endTime = { hour: 18, minute: 30, second: 0, ampm: 'PM' };

        outside.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(component.config.state).toBe('01/11/2026 09:00 - 03/11/2026 18:30');
        component.destroy();
    });

    it('still discards an incomplete selection', async () => {
        const { component, outside } = await mountPicker({ applyOnOutsideClick: true });
        component.open = true;
        component.selection = { start: dayjs('2026-11-01'), end: null };

        outside.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(component.open).toBe(false);
        expect(component.config.state).toBe('01/10/2026 - 05/10/2026');
        component.destroy();
    });

    it('still discards a selection Apply would refuse', async () => {
        const { component, outside } = await mountPicker({ applyOnOutsideClick: true });
        pending(component);
        vi.spyOn(component, 'canApplySelection', 'get').mockReturnValue(false);

        outside.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(component.open).toBe(false);
        expect(component.config.state).toBe('01/10/2026 - 05/10/2026');
        component.destroy();
    });

    it('still discards on Escape', async () => {
        const { component } = await mountPicker({ applyOnOutsideClick: true });
        pending(component);

        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

        expect(component.open).toBe(false);
        expect(component.config.state).toBe('01/10/2026 - 05/10/2026');
        component.destroy();
    });
});
