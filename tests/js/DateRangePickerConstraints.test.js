import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { createTestComponent } from './setup.js';

// Three constraint gaps found after 5.0.10:
//  - F4: presets and typed ranges ignored maxSpan (only day clicks honoured it).
//  - F5: minYear / maxYear did not stop the day calendars' month arrows, and
//        days outside those years could be clicked or typed.
//  - F6: the month <select> bound x-model to a method call, which throws
//        "Invalid left-hand side in assignment" on every change.

const fmt = (date) => date?.format('YYYY-MM-DD') ?? null;

const yearPresets = {
    'This Year': ['2026-01-01', '2026-12-31'],
    'This Week': ['2026-11-08', '2026-11-14'],
};

describe('maxSpan limits presets and typed ranges (F4)', () => {
    it('clamps a preset longer than maxSpan to start + span', async () => {
        const { component } = await createTestComponent({
            maxSpan: { months: 1 },
            ranges: yearPresets,
        });

        component.selectPreset('This Year');

        expect(fmt(component.selection.start)).toBe('2026-01-01');
        expect(fmt(component.selection.end)).toBe('2026-02-01');

        component.applySelection();

        expect(component.config.state).toBe('01/01/2026 - 01/02/2026');
    });

    it('keeps the clamped preset highlighted and the end equal to the last clickable day', async () => {
        const { component } = await createTestComponent({
            maxSpan: { months: 1 },
            ranges: yearPresets,
        });

        component.selectPreset('This Year');

        expect(component.isActiveRange('This Year')).toBe(true);
        expect(component.isActiveRange('This Week')).toBe(false);

        // The clamped end is the same day a click would stop at.
        component.selection = { start: dayjs('2026-01-01'), end: null };
        expect(component.isDisabled(dayjs('2026-02-01'))).toBe(false);
        expect(component.isDisabled(dayjs('2026-02-02'))).toBe(true);
    });

    it('leaves presets within maxSpan untouched', async () => {
        const { component } = await createTestComponent({
            maxSpan: { months: 1 },
            ranges: yearPresets,
        });

        component.selectPreset('This Week');

        expect(fmt(component.selection.start)).toBe('2026-11-08');
        expect(fmt(component.selection.end)).toBe('2026-11-14');
        expect(component.isPresetDisabled('This Week')).toBe(false);
        expect(component.isPresetDisabled('This Year')).toBe(false);
    });

    it('applies maxSpan after the minDate clamp', async () => {
        const { component } = await createTestComponent({
            maxSpan: { days: 10 },
            minDate: '2026-03-01',
            ranges: yearPresets,
        });

        component.selectPreset('This Year');

        expect(fmt(component.selection.start)).toBe('2026-03-01');
        expect(fmt(component.selection.end)).toBe('2026-03-11');
    });

    it('ends a clamped preset at the end of the day under timePicker', async () => {
        const { component } = await createTestComponent({
            maxSpan: { days: 6 },
            timePicker: true,
            ranges: yearPresets,
        });

        component.selectPreset('This Year');

        expect(component.selection.start.format('YYYY-MM-DD HH:mm')).toBe('2026-01-01 00:00');
        expect(component.selection.end.format('YYYY-MM-DD HH:mm')).toBe('2026-01-07 23:59');
    });

    it('rejects a typed range longer than maxSpan like any invalid value', async () => {
        const { component } = await createTestComponent({
            maxSpan: { months: 1 },
            allowInput: true,
        });

        expect(component.parseManualInput('01/01/2026 - 31/12/2026').status).toBe('invalid');
        expect(component.handleManualInput('01/01/2026 - 31/12/2026')).toBe(false);
        expect(component.config.state).toBe('');
    });

    it('accepts a typed range of exactly maxSpan', async () => {
        const { component } = await createTestComponent({
            maxSpan: { months: 1 },
            allowInput: true,
        });

        expect(component.parseManualInput('01/01/2026 - 01/02/2026').status).toBe('valid');
    });
});

describe('minYear / maxYear bound the day calendars (F5)', () => {
    const yearBounds = { showDropdowns: true, minYear: 2024, maxYear: 2027 };

    it('disables days outside minYear / maxYear', async () => {
        const { component } = await createTestComponent(yearBounds);

        expect(component.isDisabled(dayjs('2023-12-04'))).toBe(true);
        expect(component.isDisabled(dayjs('2028-01-01'))).toBe(true);
        expect(component.isDisabled(dayjs('2024-01-01'))).toBe(false);
        expect(component.isDisabled(dayjs('2027-12-31'))).toBe(false);
    });

    it('rejects a typed range outside the years', async () => {
        const { component } = await createTestComponent({ ...yearBounds, allowInput: true });

        expect(component.parseManualInput('04/12/2023 - 05/12/2023').status).toBe('invalid');
        expect(component.parseManualInput('04/12/2024 - 05/12/2024').status).toBe('valid');
    });

    it('stops the linked previous arrow at January of minYear', async () => {
        const { component } = await createTestComponent(yearBounds);
        component.viewDate = dayjs('2024-01-01');

        expect(component.canShowPreviousMonth(0)).toBe(false);
        component.prevMonth(0);
        expect(fmt(component.viewDate)).toBe('2024-01-01');
    });

    it('stops the linked next arrow when the right calendar shows December of maxYear', async () => {
        const { component } = await createTestComponent(yearBounds);
        component.viewDate = dayjs('2027-11-01');

        expect(component.canShowNextMonth(1)).toBe(false);
        component.nextMonth(1);
        expect(fmt(component.viewDate)).toBe('2027-11-01');

        component.viewDate = dayjs('2027-10-01');
        expect(component.canShowNextMonth(1)).toBe(true);
    });

    it('stops a single calendar at December of maxYear', async () => {
        const { component } = await createTestComponent({ ...yearBounds, singleCalendar: true });
        component.viewDate = dayjs('2027-12-01');

        expect(component.canShowNextMonth(0)).toBe(false);
        component.nextMonth(0);
        expect(fmt(component.viewDate)).toBe('2027-12-01');
    });

    describe('unlinked', () => {
        const unlinked = { ...yearBounds, linkedCalendars: false };

        it('stops the left calendar at January of minYear', async () => {
            const { component } = await createTestComponent(unlinked);
            component.viewDate = dayjs('2024-01-01');
            component.rightViewDate = dayjs('2024-06-01');

            expect(component.canShowPreviousMonth(0)).toBe(false);
            component.prevMonth(0);
            expect(fmt(component.calendarMonth(0))).toBe('2024-01-01');
        });

        it('stops the right calendar when it would push the left one before minYear', async () => {
            const { component } = await createTestComponent(unlinked);
            component.viewDate = dayjs('2024-01-01');
            component.rightViewDate = dayjs('2024-02-01');

            expect(component.canShowPreviousMonth(1)).toBe(false);
            component.prevMonth(1);
            expect(fmt(component.calendarMonth(0))).toBe('2024-01-01');
            expect(fmt(component.calendarMonth(1))).toBe('2024-02-01');
        });

        it('lets the right calendar step back while the left stays put', async () => {
            const { component } = await createTestComponent(unlinked);
            component.viewDate = dayjs('2024-01-01');
            component.rightViewDate = dayjs('2024-05-01');

            expect(component.canShowPreviousMonth(1)).toBe(true);
        });

        it('stops the right calendar at December of maxYear', async () => {
            const { component } = await createTestComponent(unlinked);
            component.viewDate = dayjs('2027-03-01');
            component.rightViewDate = dayjs('2027-12-01');

            expect(component.canShowNextMonth(1)).toBe(false);
            component.nextMonth(1);
            expect(fmt(component.calendarMonth(1))).toBe('2027-12-01');
        });

        it('stops the left calendar when it would push the right one past maxYear', async () => {
            const { component } = await createTestComponent(unlinked);
            component.viewDate = dayjs('2027-11-01');
            component.rightViewDate = dayjs('2027-12-01');

            expect(component.canShowNextMonth(0)).toBe(false);
            component.nextMonth(0);
            expect(fmt(component.calendarMonth(0))).toBe('2027-11-01');
            expect(fmt(component.calendarMonth(1))).toBe('2027-12-01');
        });
    });

    it('never blocks the arrows without year bounds', async () => {
        const { component } = await createTestComponent({ showDropdowns: true });
        component.viewDate = dayjs('2024-01-01');

        expect(component.canShowPreviousMonth(0)).toBe(true);
        expect(component.canShowNextMonth(1)).toBe(true);
    });
});

describe('the view binds only assignable x-model expressions (F6)', () => {
    const blade = fs.readFileSync(
        path.resolve(__dirname, '../../resources/views/date-range-picker.blade.php'),
        'utf8',
    );
    const expressions = [...blade.matchAll(/x-model(?:\.[\w.]+)?="([^"]+)"/g)].map((m) => m[1]);

    it('finds the x-model bindings', () => {
        expect(expressions.length).toBeGreaterThan(0);
    });

    // Alpine's x-model writes back with `${expression} = __placeholder`; a
    // method call on the left throws "Invalid left-hand side in assignment".
    it.each(expressions)('can assign to %s', async (expression) => {
        const { component } = await createTestComponent({ showDropdowns: true });
        component.offset = 0;
        component.startTime = { hour: 0, minute: 0, second: 0, ampm: 'AM' };
        component.endTime = { hour: 0, minute: 0, second: 0, ampm: 'AM' };

        // eslint-disable-next-line no-new-func
        const assign = new Function('scope', '__placeholder', `with (scope) { ${expression} = __placeholder }`);

        expect(() => assign(component, 1)).not.toThrow();
    });

    it('changes the month through setMonth, linked and unlinked', async () => {
        const linked = (await createTestComponent({ showDropdowns: true })).component;
        linked.viewDate = dayjs('2026-03-01');
        linked.setMonth('6', 1);
        // Linked, the dropdowns drive the left month (unchanged behaviour).
        expect([fmt(linked.calendarMonth(0)), fmt(linked.calendarMonth(1))]).toEqual(['2026-07-01', '2026-08-01']);

        const unlinked = (await createTestComponent({ showDropdowns: true, linkedCalendars: false })).component;
        unlinked.viewDate = dayjs('2026-03-01');
        unlinked.setMonth('6', 1);
        expect([fmt(unlinked.calendarMonth(0)), fmt(unlinked.calendarMonth(1))]).toEqual(['2026-03-01', '2026-07-01']);
    });

    it('keeps dropdown changes inside the year bounds', async () => {
        const bounds = { showDropdowns: true, minYear: 2024, maxYear: 2027 };

        const linked = (await createTestComponent(bounds)).component;
        linked.viewDate = dayjs('2027-03-01');
        linked.setMonth('11', 0);
        expect([fmt(linked.calendarMonth(0)), fmt(linked.calendarMonth(1))]).toEqual(['2027-11-01', '2027-12-01']);

        const unlinked = (await createTestComponent({ ...bounds, linkedCalendars: false })).component;
        unlinked.viewDate = dayjs('2027-03-01');
        unlinked.rightViewDate = dayjs('2027-06-01');
        unlinked.setMonth('11', 0);
        expect([fmt(unlinked.calendarMonth(0)), fmt(unlinked.calendarMonth(1))]).toEqual(['2027-11-01', '2027-12-01']);

        unlinked.setYear('2024', 1);
        expect(unlinked.calendarMonth(0).year()).toBeGreaterThanOrEqual(2024);
        expect(unlinked.calendarMonth(0).isBefore(unlinked.calendarMonth(1), 'month')).toBe(true);
    });
});
