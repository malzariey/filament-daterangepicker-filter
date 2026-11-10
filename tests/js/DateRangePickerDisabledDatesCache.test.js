import { describe, it, expect, vi } from 'vitest';
import { createTestComponent, dayjs } from './setup.js';

// 5.0.12 made isDisabled() slower: it parsed every configured disabled date
// (parseDisplayDate -> parseFormattedDate, with a regex built per call for a
// localized format) for every calendar cell, and generateGrid runs several
// times per calendar and again on every hover. The disabled dates are now
// parsed once into day keys and rebuilt only when the list, the display
// format or the page locale changes. Which days are disabled is unchanged.

describe('disabled dates are parsed once', () => {
    it('disables a date given as ISO, in the display format and in an Arabic format', async () => {
        const { component } = await createTestComponent({
            locale: 'ar',
            displayFormat: 'DD MMMM YYYY',
            disabledDates: ['2026-11-03', '05 نوفمبر 2026', '07 November 2026'],
        });

        expect(component.isDisabled(dayjs('2026-11-03'))).toBe(true);
        expect(component.isDisabled(dayjs('2026-11-05'))).toBe(true);
        expect(component.isDisabled(dayjs('2026-11-07'))).toBe(true);
        expect(component.isDisabled(dayjs('2026-11-04'))).toBe(false);
        expect(component.isDisabled(dayjs('2026-11-06'))).toBe(false);
    });

    it('disables a date in a DD/MM/YYYY display format', async () => {
        const { component } = await createTestComponent({
            displayFormat: 'DD/MM/YYYY',
            disabledDates: ['15/01/2026', '2026-01-20'],
        });

        expect(component.isDisabled(dayjs('2026-01-15'))).toBe(true);
        expect(component.isDisabled(dayjs('2026-01-20 13:45'))).toBe(true);
        expect(component.isDisabled(dayjs('2026-01-16'))).toBe(false);
    });

    it('parses each disabled date once, not once per cell', async () => {
        const disabledDates = ['03/11/2026', '05/11/2026', '2026-11-07'];
        const { component } = await createTestComponent({ displayFormat: 'DD/MM/YYYY', disabledDates });
        const spy = vi.spyOn(component, 'parseDisplayDate');
        component.viewDate = dayjs('2026-11-01');

        component.generateGrid(0);
        component.generateGrid(1);
        component.generateGrid(0);
        component.hoverDate = dayjs('2026-11-10');
        component.generateGrid(0);

        expect(spy).toHaveBeenCalledTimes(disabledDates.length);
    });

    it('rebuilds when the disabled dates change', async () => {
        const { component } = await createTestComponent({ displayFormat: 'DD/MM/YYYY', disabledDates: ['03/11/2026'] });

        expect(component.isDisabled(dayjs('2026-11-03'))).toBe(true);

        component.config.disabledDates = ['04/11/2026'];
        expect(component.isDisabled(dayjs('2026-11-03'))).toBe(false);
        expect(component.isDisabled(dayjs('2026-11-04'))).toBe(true);

        component.config.disabledDates.push('09/11/2026');
        expect(component.isDisabled(dayjs('2026-11-09'))).toBe(true);
    });

    it('skips a disabled date that does not parse', async () => {
        const { component } = await createTestComponent({ disabledDates: ['nonsense', '03/11/2026'] });

        expect(component.isDisabled(dayjs('2026-11-03'))).toBe(true);
        expect(component.isDisabled(dayjs('2026-11-04'))).toBe(false);
    });
});
