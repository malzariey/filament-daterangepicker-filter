/**
 * linkedCalendars(false): the two day calendars navigate independently.
 *
 * The option reached the JS config but nothing read it, so the right-hand
 * calendar's next arrow advanced both months (Jan/Feb became Feb/Mar). With
 * linked calendars off, as in the original daterangepicker, each calendar
 * has its own prev/next and the right month always stays after the left one.
 */

import { describe, it, expect } from 'vitest';
import { createTestComponent, flushPromises, dayjs } from './setup.js';

const LEFT = 0;
const RIGHT = 1;

const shown = (component) => [
    component.generateGrid(LEFT).month.format('YYYY-MM'),
    component.generateGrid(RIGHT).month.format('YYYY-MM'),
];

const unlinked = async (config = {}) => {
    const { component } = await createTestComponent({ linkedCalendars: false, ...config });
    component.viewDate = dayjs('2026-01-15');

    return component;
};

const linked = async (config = {}) => {
    const { component } = await createTestComponent({ linkedCalendars: true, ...config });
    component.viewDate = dayjs('2026-01-15');

    return component;
};

describe('linkedCalendars(false)', () => {
    it('advances only the right calendar from its next arrow', async () => {
        const component = await unlinked();

        component.nextMonth(RIGHT);

        expect(shown(component)).toEqual(['2026-01', '2026-03']);
    });

    it('moves only the right calendar back from its prev arrow', async () => {
        const component = await unlinked();
        component.nextMonth(RIGHT);
        component.nextMonth(RIGHT);

        component.prevMonth(RIGHT);

        expect(shown(component)).toEqual(['2026-01', '2026-03']);
    });

    it('moves only the left calendar from its own arrows', async () => {
        const component = await unlinked();
        component.nextMonth(RIGHT);
        component.nextMonth(RIGHT);

        component.prevMonth(LEFT);
        expect(shown(component)).toEqual(['2025-12', '2026-04']);

        component.nextMonth(LEFT);
        component.nextMonth(LEFT);
        expect(shown(component)).toEqual(['2026-02', '2026-04']);
    });

    it('keeps the right month after the left month', async () => {
        const component = await unlinked();

        // Left next onto the right month pushes the right one forward.
        component.nextMonth(LEFT);
        expect(shown(component)).toEqual(['2026-02', '2026-03']);

        // Right prev onto the left month pushes the left one back.
        component.prevMonth(RIGHT);
        expect(shown(component)).toEqual(['2026-01', '2026-02']);
    });

    it('does not drag the right calendar back when the left one moves back', async () => {
        const component = await unlinked();

        component.prevMonth(LEFT);

        expect(shown(component)).toEqual(['2025-12', '2026-02']);
    });

    it('sets each side from its own month and year dropdowns', async () => {
        const component = await unlinked({ showDropdowns: true });

        component.setMonth(5, RIGHT);
        expect(shown(component)).toEqual(['2026-01', '2026-06']);

        component.setYear(2027, RIGHT);
        expect(shown(component)).toEqual(['2026-01', '2027-06']);

        component.setMonth(3, LEFT);
        expect(shown(component)).toEqual(['2026-04', '2027-06']);

        // A left month at or past the right month pushes the right one on.
        component.setYear(2027, LEFT);
        component.setMonth(7, LEFT);
        expect(shown(component)).toEqual(['2027-08', '2027-09']);

        // A right month at or before the left month pulls the left one back.
        component.setMonth(0, RIGHT);
        expect(shown(component)).toEqual(['2026-12', '2027-01']);
    });

    it('selects a range across independently navigated months', async () => {
        const component = await unlinked();
        component.nextMonth(RIGHT);
        component.nextMonth(RIGHT);

        const left = component.generateGrid(LEFT).weeks.flat();
        const right = component.generateGrid(RIGHT).weeks.flat();
        component.handleDayClick(left.find((d) => d.dateString === '2026-01-10'));
        component.handleDayClick(right.find((d) => d.dateString === '2026-04-05'));

        expect(component.selection.start.format('YYYY-MM-DD')).toBe('2026-01-10');
        expect(component.selection.end.format('YYYY-MM-DD')).toBe('2026-04-05');
        expect(shown(component)).toEqual(['2026-01', '2026-04']);

        const rightAfter = component.generateGrid(RIGHT).weeks.flat();
        expect(rightAfter.find((d) => d.dateString === '2026-04-05').isEnd).toBe(true);
        expect(rightAfter.find((d) => d.dateString === '2026-04-01').inRange).toBe(true);
    });

    it('reopens on the start month left and the end month right', async () => {
        const { component } = await createTestComponent({
            linkedCalendars: false,
            initialState: '10/01/2026 - 05/04/2026',
        });
        await flushPromises();

        await component.openPicker();

        expect(shown(component)).toEqual(['2026-01', '2026-04']);
    });

    it('shows a picked preset whole', async () => {
        const component = await unlinked({
            ranges: { Spring: ['2026-03-01', '2026-05-31'] },
        });
        component.setYear(2027, RIGHT);

        component.selectPreset('Spring');

        expect(shown(component)).toEqual(['2026-03', '2026-05']);
    });

    it('scrolls the side the keyboard focus leaves', async () => {
        const component = await unlinked();
        component.nextMonth(RIGHT); // Jan / Mar

        component.focusedDate = dayjs('2026-03-31');
        component.ensureFocusedDateVisible();
        expect(shown(component)).toEqual(['2026-01', '2026-03']);

        component.focusedDate = dayjs('2026-04-01');
        component.ensureFocusedDateVisible();
        expect(shown(component)).toEqual(['2026-01', '2026-04']);

        component.focusedDate = dayjs('2025-12-31');
        component.ensureFocusedDateVisible();
        expect(shown(component)).toEqual(['2025-12', '2026-04']);
    });

    it('leaves single-calendar navigation alone', async () => {
        const component = await unlinked({ singleCalendar: true });

        component.nextMonth(LEFT);
        expect(component.generateGrid(LEFT).month.format('YYYY-MM')).toBe('2026-02');

        component.prevMonth(LEFT);
        component.prevMonth(LEFT);
        expect(component.generateGrid(LEFT).month.format('YYYY-MM')).toBe('2025-12');
    });
});

describe('linkedCalendars(true) (default) is unchanged', () => {
    it('moves both calendars together from either arrow', async () => {
        const component = await linked();

        component.nextMonth(RIGHT);
        expect(shown(component)).toEqual(['2026-02', '2026-03']);

        component.prevMonth(LEFT);
        expect(shown(component)).toEqual(['2026-01', '2026-02']);

        component.nextMonth();
        expect(shown(component)).toEqual(['2026-02', '2026-03']);
    });

    it('defaults to linked when the option is missing', async () => {
        const { component } = await createTestComponent({ linkedCalendars: undefined });
        component.viewDate = dayjs('2026-01-15');

        component.nextMonth(RIGHT);

        expect(shown(component)).toEqual(['2026-02', '2026-03']);
    });

    it('keeps the dropdowns driving the left month', async () => {
        const component = await linked({ showDropdowns: true });

        component.setMonth(5, RIGHT);

        expect(shown(component)).toEqual(['2026-06', '2026-07']);
    });

    it('reopens on the start month and the month after it', async () => {
        const { component } = await createTestComponent({
            linkedCalendars: true,
            initialState: '10/01/2026 - 05/04/2026',
        });
        await flushPromises();

        await component.openPicker();

        expect(shown(component)).toEqual(['2026-01', '2026-02']);
    });
});
