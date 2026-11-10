import { describe, it, expect } from 'vitest';
import { createTestComponent, dayjs } from './setup.js';

// 5.0.11 stopped the day calendars' month arrows at whole years (minYear /
// maxYear and the years of minDate / maxDate): with minDate in October you
// could still page back from November to September, a month with no allowed
// day. The arrows (and the month / year dropdowns) now stop at the month of
// minDate / maxDate, linked and unlinked. Without either, nothing changes.

const fmt = (date) => date?.format('YYYY-MM') ?? null;
const view = (component) => (component.config.singleCalendar ? [0] : [0, 1])
    .map((offset) => fmt(component.calendarMonth(offset)));

const bounds = { minDate: '2026-10-15', maxDate: '2027-02-10' };

describe('linked calendars', () => {
    it('stops the previous arrow at minDate\'s month (the report)', async () => {
        const { component } = await createTestComponent(bounds);
        component.viewDate = dayjs('2026-11-01');

        expect(component.canShowPreviousMonth(0)).toBe(true);
        component.prevMonth(0);
        expect(view(component)).toEqual(['2026-10', '2026-11']);

        expect(component.canShowPreviousMonth(0)).toBe(false);
        component.prevMonth(0);
        expect(view(component)).toEqual(['2026-10', '2026-11']);
    });

    it('stops the next arrow when the right calendar shows maxDate\'s month', async () => {
        const { component } = await createTestComponent(bounds);
        component.viewDate = dayjs('2026-12-01');

        expect(component.canShowNextMonth(1)).toBe(true);
        component.nextMonth(1);
        expect(view(component)).toEqual(['2027-01', '2027-02']);

        expect(component.canShowNextMonth(1)).toBe(false);
        component.nextMonth(1);
        expect(view(component)).toEqual(['2027-01', '2027-02']);
    });

    it('reads a minDate / maxDate with a time the same way', async () => {
        const { component } = await createTestComponent({
            minDate: '2026-10-15 09:00:00',
            maxDate: '2027-02-10 17:00:00',
        });
        component.viewDate = dayjs('2026-10-01');

        expect(component.canShowPreviousMonth(0)).toBe(false);
    });

    it('stops a single calendar at both months', async () => {
        const { component } = await createTestComponent({ ...bounds, singleCalendar: true });

        component.viewDate = dayjs('2026-10-01');
        expect(component.canShowPreviousMonth(0)).toBe(false);
        expect(component.canShowNextMonth(0)).toBe(true);

        component.viewDate = dayjs('2027-02-01');
        expect(component.canShowNextMonth(0)).toBe(false);
        expect(component.canShowPreviousMonth(0)).toBe(true);
    });

    it('lets a view outside the bounds move back towards them', async () => {
        const { component } = await createTestComponent(bounds);
        component.viewDate = dayjs('2027-05-01');

        expect(component.canShowNextMonth(1)).toBe(false);
        expect(component.canShowPreviousMonth(0)).toBe(true);
    });

    it('keeps the tighter of minYear and minDate', async () => {
        const { component } = await createTestComponent({ ...bounds, minYear: 2027 });
        component.viewDate = dayjs('2027-01-01');

        expect(component.canShowPreviousMonth(0)).toBe(false);
    });
});

describe('unlinked calendars', () => {
    const unlinked = { ...bounds, linkedCalendars: false };

    it('stops the left calendar at minDate\'s month', async () => {
        const { component } = await createTestComponent(unlinked);
        component.viewDate = dayjs('2026-10-01');
        component.rightViewDate = dayjs('2026-12-01');

        expect(component.canShowPreviousMonth(0)).toBe(false);
        component.prevMonth(0);
        expect(view(component)).toEqual(['2026-10', '2026-12']);
    });

    it('lets the right calendar step back while the left stays put', async () => {
        const { component } = await createTestComponent(unlinked);
        component.viewDate = dayjs('2026-10-01');
        component.rightViewDate = dayjs('2026-12-01');

        expect(component.canShowPreviousMonth(1)).toBe(true);
        component.prevMonth(1);
        expect(view(component)).toEqual(['2026-10', '2026-11']);
    });

    it('stops the right calendar when it would push the left one before minDate\'s month', async () => {
        const { component } = await createTestComponent(unlinked);
        component.viewDate = dayjs('2026-10-01');
        component.rightViewDate = dayjs('2026-11-01');

        expect(component.canShowPreviousMonth(1)).toBe(false);
        component.prevMonth(1);
        expect(view(component)).toEqual(['2026-10', '2026-11']);
    });

    it('stops the right calendar at maxDate\'s month', async () => {
        const { component } = await createTestComponent(unlinked);
        component.viewDate = dayjs('2026-11-01');
        component.rightViewDate = dayjs('2027-02-01');

        expect(component.canShowNextMonth(1)).toBe(false);
        expect(component.canShowNextMonth(0)).toBe(true);
    });

    it('stops the left calendar when it would push the right one past maxDate\'s month', async () => {
        const { component } = await createTestComponent(unlinked);
        component.viewDate = dayjs('2027-01-01');
        component.rightViewDate = dayjs('2027-02-01');

        expect(component.canShowNextMonth(0)).toBe(false);
        component.nextMonth(0);
        expect(view(component)).toEqual(['2027-01', '2027-02']);
    });
});

describe('dropdowns', () => {
    it('clamps a month picked before minDate\'s month', async () => {
        const { component } = await createTestComponent({ ...bounds, showDropdowns: true });
        component.viewDate = dayjs('2026-11-01');

        component.setMonth(8, 0); // September
        expect(view(component)).toEqual(['2026-10', '2026-11']);
    });

    it('clamps a year that would show months past maxDate', async () => {
        const { component } = await createTestComponent({ ...bounds, showDropdowns: true });
        component.viewDate = dayjs('2026-11-01');

        component.setYear(2027, 0);
        expect(view(component)).toEqual(['2027-01', '2027-02']);
    });

    it('clamps unlinked dropdowns per side', async () => {
        const { component } = await createTestComponent({ ...bounds, showDropdowns: true, linkedCalendars: false });
        component.viewDate = dayjs('2026-11-01');
        component.rightViewDate = dayjs('2027-01-01');

        component.setMonth(5, 1); // June 2027
        expect(view(component)).toEqual(['2026-11', '2027-02']);

        component.setMonth(0, 0); // January 2026
        expect(view(component)).toEqual(['2026-10', '2027-02']);
    });

    it('disables the month options with no allowed day', async () => {
        const { component } = await createTestComponent({ ...bounds, showDropdowns: true });
        component.viewDate = dayjs('2026-11-01');

        expect(component.isDayMonthOptionDisabled(8, 0)).toBe(true); // Sep 2026
        expect(component.isDayMonthOptionDisabled(9, 0)).toBe(false); // Oct 2026
        expect(component.isDayMonthOptionDisabled(11, 0)).toBe(false);

        component.viewDate = dayjs('2027-01-01');
        expect(component.isDayMonthOptionDisabled(1, 0)).toBe(false); // Feb 2027
        expect(component.isDayMonthOptionDisabled(2, 0)).toBe(true); // Mar 2027
    });

    it('binds the month options\' disabled state in the view', async () => {
        const fs = await import('fs');
        const path = await import('path');
        const blade = fs.readFileSync(path.resolve(__dirname, '../../resources/views/date-range-picker.blade.php'), 'utf8');

        expect(blade).toContain(':disabled="isDayMonthOptionDisabled(m.value, offset)"');
    });
});

describe('without minDate / maxDate', () => {
    it('never blocks the arrows or disables a month', async () => {
        const { component } = await createTestComponent({ showDropdowns: true });
        component.viewDate = dayjs('2026-10-01');

        expect(component.canShowPreviousMonth(0)).toBe(true);
        expect(component.canShowNextMonth(1)).toBe(true);
        expect(component.isDayMonthOptionDisabled(0, 0)).toBe(false);
    });

    it('still stops at minYear / maxYear as in 5.0.11', async () => {
        const { component } = await createTestComponent({ minYear: 2026, maxYear: 2026 });
        component.viewDate = dayjs('2026-01-01');
        expect(component.canShowPreviousMonth(0)).toBe(false);

        component.viewDate = dayjs('2026-11-01');
        expect(component.canShowNextMonth(1)).toBe(false);

        component.viewDate = dayjs('2026-10-01');
        expect(component.canShowNextMonth(1)).toBe(true);
    });

    it('keeps an invalid minDate from blocking anything', async () => {
        const { component } = await createTestComponent({ minDate: 'not a date' });
        component.viewDate = dayjs('2026-10-01');

        expect(component.canShowPreviousMonth(0)).toBe(true);
    });
});
