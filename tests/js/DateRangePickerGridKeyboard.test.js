/**
 * The day grid from the keyboard. The dropdown is teleported to the end of
 * <body>, outside the component's root, so its keydowns never reached
 * handleKeydown: the arrow keys did nothing on a focused day, and from the
 * input ←/→ belong to the caret (and the mask's block jumps) and ↑/↓ were
 * left to the browser.
 *
 * Now, with focus on a day: ←/→ move one day (mirrored in RTL), ↑/↓ one
 * week, Home/End to the start/end of the week, PageUp/PageDown one month
 * (Shift: one year), Enter/Space select. Disabled days are skipped. From
 * the input, ArrowDown steps into the grid; ←/→ stay with the caret.
 *
 * Escape, and an Enter or Apply / Cancel that closes the picker, put focus
 * back in the input instead of leaving it on a hidden button.
 */

import { describe, expect, it } from 'vitest';
import { createTestComponent, flushPromises } from './setup.js';

const ymd = (date) => date?.format('YYYY-MM-DD') ?? null;

// The real grid (blade): one <button> per cell of each visible calendar,
// .fi-focused on the focused day, disabled when isDisabled says so.
const renderGrid = (component) => {
    const dropdown = component.$refs.dropdown;
    dropdown.classList.add('fi-daterangepicker-dropdown');
    dropdown.querySelector('.test-calendars')?.remove();

    const calendars = document.createElement('div');
    calendars.className = 'test-calendars';

    for (const offset of (component.config.singleCalendar ? [0] : [0, 1])) {
        const grid = document.createElement('div');
        grid.className = 'fi-daterangepicker-days';
        grid.setAttribute('role', 'grid');

        for (const week of component.generateGrid(offset).weeks) {
            for (const day of week) {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'fi-daterangepicker-day';
                if (!day.isCurrentMonth) button.classList.add('fi-off-month');
                if (component.isFocused(day.date)) button.classList.add('fi-focused');
                button.dataset.date = day.dateString;
                button.disabled = day.disabled;
                button.tabIndex = component.isFocused(day.date) ? 0 : -1;
                button.addEventListener('click', () => component.handleDayClick(day));
                grid.appendChild(button);
            }
        }

        calendars.appendChild(grid);
    }

    dropdown.prepend(calendars);
};

const focusedButton = (component) => [...component.$refs.dropdown.querySelectorAll('.fi-daterangepicker-day.fi-focused')]
    .find((button) => !button.classList.contains('fi-off-month'));

// A key on whatever has focus, then Alpine's re-render.
const press = async (component, key, options = {}) => {
    const target = document.activeElement;
    const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...options });
    target.dispatchEvent(event);
    renderGrid(component);
    // Alpine keeps a keyed cell across renders; the rebuild here does not.
    if (target.isConnected === false && target.dataset.date) {
        component.$refs.dropdown.querySelector(`[data-date="${target.dataset.date}"]:not(.fi-off-month)`)?.focus();
    }
    await flushPromises();

    return event;
};

const openGrid = async (config = {}) => {
    const { component } = await createTestComponent({
        initialState: '10/11/2026 - 12/11/2026',
        ...config,
    });

    await component.openPicker();
    renderGrid(component);
    focusedButton(component).focus();

    return { component };
};

describe('day grid arrow keys', () => {
    it('starts on the selection start', async () => {
        const { component } = await openGrid();

        expect(ymd(component.focusedDate)).toBe('2026-11-10');
        expect(document.activeElement.dataset.date).toBe('2026-11-10');
    });

    it.each([
        ['ArrowRight', '2026-11-11'],
        ['ArrowLeft', '2026-11-09'],
        ['ArrowDown', '2026-11-17'],
        ['ArrowUp', '2026-11-03'],
        // firstDay 0: the week of Tue 10 Nov runs Sun 8 .. Sat 14.
        ['Home', '2026-11-08'],
        ['End', '2026-11-14'],
        ['PageDown', '2026-12-10'],
        ['PageUp', '2026-10-10'],
    ])('%s moves focus to %s', async (key, expected) => {
        const { component } = await openGrid();

        const event = await press(component, key);

        expect(event.defaultPrevented).toBe(true);
        expect(ymd(component.focusedDate)).toBe(expected);
        expect(document.activeElement.dataset.date).toBe(expected);
        expect(component.open).toBe(true);
    });

    it('Shift+PageDown / Shift+PageUp change the year', async () => {
        const { component } = await openGrid();

        await press(component, 'PageDown', { shiftKey: true });
        expect(document.activeElement.dataset.date).toBe('2027-11-10');

        await press(component, 'PageUp', { shiftKey: true });
        await press(component, 'PageUp', { shiftKey: true });
        expect(document.activeElement.dataset.date).toBe('2025-11-10');
    });

    it('follows the focus into the next month', async () => {
        const { component } = await openGrid({ singleCalendar: true, initialState: '30/11/2026' });

        await press(component, 'ArrowRight');

        expect(component.viewDate.format('YYYY-MM')).toBe('2026-12');
        expect(document.activeElement.dataset.date).toBe('2026-12-01');
    });

    it('mirrors ← / → in RTL', async () => {
        document.documentElement.setAttribute('dir', 'rtl');
        try {
            const { component } = await openGrid();

            await press(component, 'ArrowLeft');
            expect(document.activeElement.dataset.date).toBe('2026-11-11');

            await press(component, 'ArrowRight');
            await press(component, 'ArrowRight');
            expect(document.activeElement.dataset.date).toBe('2026-11-09');
        } finally {
            document.documentElement.removeAttribute('dir');
        }
    });

    it('skips disabled days', async () => {
        const { component } = await openGrid({ disabledDates: ['2026-11-11', '2026-11-17'] });

        await press(component, 'ArrowRight');
        expect(document.activeElement.dataset.date).toBe('2026-11-12');

        await press(component, 'ArrowLeft');
        expect(document.activeElement.dataset.date).toBe('2026-11-10');

        await press(component, 'ArrowDown');
        expect(document.activeElement.dataset.date).toBe('2026-11-24');
    });

    it('stays put at maxDate', async () => {
        const { component } = await openGrid({ maxDate: '2026-11-12', initialState: '12/11/2026 - 12/11/2026' });

        await press(component, 'ArrowRight');
        await press(component, 'ArrowDown');

        expect(ymd(component.focusedDate)).toBe('2026-11-12');
        expect(document.activeElement.dataset.date).toBe('2026-11-12');
    });

    it('selects the focused day on Enter and Space', async () => {
        const { component } = await openGrid();

        await press(component, 'ArrowRight');
        const enter = await press(component, 'Enter');

        expect(enter.defaultPrevented).toBe(true);
        expect(ymd(component.selection.start)).toBe('2026-11-11');
        expect(component.selection.end).toBeNull();

        await press(component, 'ArrowRight');
        await press(component, ' ');

        expect(ymd(component.selection.end)).toBe('2026-11-12');
        expect(component.open).toBe(true);
    });

    it('does not select a disabled focused day', async () => {
        const { component } = await openGrid({ disabledDates: ['2026-11-10'] });

        await press(component, 'Enter');

        expect(ymd(component.selection.start)).toBe('2026-11-10');
        expect(ymd(component.selection.end)).toBe('2026-11-12');
    });

    it('marks today with aria-current in the blade grid', async () => {
        const fs = await import('node:fs');
        const path = await import('node:path');
        const blade = fs.readFileSync(path.resolve(process.cwd(), 'resources/views/date-range-picker.blade.php'), 'utf8');

        expect(blade).toMatch(/:aria-current="day\.isToday \? 'date' : null"/);
    });
});

describe('from the input', () => {
    const inputKeydown = (component, key) => {
        const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
        Object.defineProperty(event, 'target', { value: component.$refs.input });
        component.handleKeydown(event);

        return event;
    };

    it('ArrowDown steps into the grid at the focused day', async () => {
        const { component } = await openGrid();
        component.$refs.input.focus.mockClear();
        document.activeElement.blur();

        const event = inputKeydown(component, 'ArrowDown');
        await flushPromises();

        expect(event.defaultPrevented).toBe(true);
        expect(document.activeElement.dataset.date).toBe('2026-11-10');
    });

    it('keeps ← / → for the caret under allowInput', async () => {
        const { component } = await openGrid({ allowInput: true });

        inputKeydown(component, 'ArrowLeft');
        inputKeydown(component, 'ArrowRight');

        expect(ymd(component.focusedDate)).toBe('2026-11-10');
    });
});

describe('focus when the keyboard closes the picker', () => {
    it('Escape on a day cancels and returns focus to the input', async () => {
        const { component } = await openGrid();
        await press(component, 'ArrowRight');
        await press(component, 'Enter');

        await press(component, 'Escape');

        expect(component.open).toBe(false);
        expect(ymd(component.selection.start)).toBe('2026-11-10');
        expect(ymd(component.selection.end)).toBe('2026-11-12');
        expect(component.$refs.input.focus).toHaveBeenCalled();
    });

    it('Enter that completes an autoApply range returns focus to the input', async () => {
        const { component } = await openGrid({ autoApply: true });

        await press(component, 'Enter');
        expect(component.open).toBe(true);
        expect(component.$refs.input.focus).not.toHaveBeenCalled();

        await press(component, 'ArrowRight');
        await press(component, 'Enter');

        expect(component.open).toBe(false);
        expect(component.config.state).toBe('10/11/2026 - 11/11/2026');
        expect(component.$refs.input.focus).toHaveBeenCalled();
    });

    it.each(['apply', 'cancel'])('Enter on %s returns focus to the input', async (which) => {
        const { component } = await openGrid();
        const button = document.createElement('button');
        button.type = 'button';
        button.addEventListener('click', () => (which === 'apply' ? component.applySelection() : component.cancel()));
        component.$refs.dropdown.appendChild(button);
        button.focus();

        await press(component, 'Enter');
        // Enter on a button is the native click.
        button.click();

        expect(component.open).toBe(false);
        expect(component.$refs.input.focus).toHaveBeenCalled();
    });

    it('leaves focus alone after a mouse click that applies', async () => {
        const { component } = await openGrid({ autoApply: true, singleCalendar: true, initialState: '10/11/2026' });

        component.$refs.dropdown.querySelector('[data-date="2026-11-13"]:not(.fi-off-month)').click();

        expect(component.open).toBe(false);
        expect(component.$refs.input.focus).not.toHaveBeenCalled();
    });

    it('does not pull focus back when it leaves after a keyboard Enter', async () => {
        // Enter picked a start and left the picker open; Tab then moves on.
        const { component } = await openGrid();
        await press(component, 'Enter');

        const next = document.createElement('input');
        document.body.appendChild(next);
        next.focus();

        expect(component.open).toBe(false);
        expect(component.$refs.input.focus).not.toHaveBeenCalled();
        next.remove();
    });
});

describe('month picker arrow keys', () => {
    it('moves along the 3-column month grid and enters it from the input', async () => {
        const { component } = await createTestComponent({ pickerType: 'month', displayFormat: 'MM/YYYY', initialState: '05/2026 - 05/2026' });
        await component.openPicker();

        const dropdown = component.$refs.dropdown;
        dropdown.classList.add('fi-daterangepicker-dropdown');
        const grid = document.createElement('div');
        grid.className = 'fi-daterangepicker-month-grid';
        for (const month of component.generateMonthGrid(0).months) {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'fi-daterangepicker-month-cell';
            if (month.isSelected) button.classList.add('fi-selected');
            button.dataset.date = month.dateString;
            grid.appendChild(button);
        }
        dropdown.appendChild(grid);

        const down = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true });
        Object.defineProperty(down, 'target', { value: component.$refs.input });
        component.handleKeydown(down);
        expect(document.activeElement.dataset.date).toMatch(/^2026-05/);

        const key = (k) => document.activeElement.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true }));
        key('ArrowRight');
        expect(document.activeElement.dataset.date).toMatch(/^2026-06/);
        key('ArrowDown');
        expect(document.activeElement.dataset.date).toMatch(/^2026-09/);
        key('Home');
        expect(document.activeElement.dataset.date).toMatch(/^2026-01/);
        key('End');
        expect(document.activeElement.dataset.date).toMatch(/^2026-12/);
    });
});
