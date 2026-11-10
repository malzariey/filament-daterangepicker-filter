import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { createTestComponent } from './setup.js';

// 5.0.11 bounded the day calendars' arrows by minYear / maxYear, but not the
// year picker's decade arrows: with minYear(2020)->maxYear(2030), Next moved
// on to 2030-2039 / 2040-2049, every cell disabled and both arrows enabled.
// A decade arrow now stops when the page it would bring into view holds no
// allowed year (minYear / maxYear, minDate / maxDate).

const blade = fs.readFileSync(
    path.resolve(__dirname, '../../resources/views/date-range-picker.blade.php'),
    'utf8',
);

const yearPicker = async (config = {}, viewYear = 2026) => {
    const { component } = await createTestComponent({ pickerType: 'year', ...config });
    component.viewDate = dayjs(`${viewYear}-01-01`);

    return component;
};

const decades = (component) => (component.config.singleCalendar ? [0] : [0, 1])
    .map((offset) => component.generateYearGrid(offset).decadeStart);

describe('year picker decade arrows honour minYear / maxYear', () => {
    const bounds = { minYear: 2020, maxYear: 2030 };

    it('disables both arrows when neither neighbouring decade holds an allowed year (two calendars)', async () => {
        const component = await yearPicker(bounds);

        expect(decades(component)).toEqual([2020, 2030]);
        expect(component.canShowPreviousDecade()).toBe(false);
        expect(component.canShowNextDecade()).toBe(false);
    });

    it('does not move past the bounds', async () => {
        const component = await yearPicker(bounds);

        component.nextDecade();
        expect(decades(component)).toEqual([2020, 2030]);

        component.prevDecade();
        expect(decades(component)).toEqual([2020, 2030]);
    });

    it('lets a single calendar reach the last allowed decade, then stops', async () => {
        const component = await yearPicker({ ...bounds, singleCalendar: true });

        expect(component.canShowNextDecade()).toBe(true);
        component.nextDecade();
        expect(decades(component)).toEqual([2030]);
        expect(component.canShowNextDecade()).toBe(false);
        expect(component.canShowPreviousDecade()).toBe(true);

        component.nextDecade();
        expect(decades(component)).toEqual([2030]);

        component.prevDecade();
        expect(decades(component)).toEqual([2020]);
        expect(component.canShowPreviousDecade()).toBe(false);
        component.prevDecade();
        expect(decades(component)).toEqual([2020]);
    });

    it('ignores a year shown only as the out-of-decade padding cell', async () => {
        // 2039 appears as the leading padding cell of 2040-2049, but it is
        // already a cell of 2030-2039, so 2040-2049 adds nothing allowed.
        const component = await yearPicker({ minYear: 2020, maxYear: 2039, singleCalendar: true }, 2035);

        expect(component.canShowNextDecade()).toBe(false);
    });

    it('stops at minDate / maxDate as well', async () => {
        const component = await yearPicker({
            minDate: '2015-06-01',
            maxDate: '2034-01-01',
            singleCalendar: true,
        });

        expect(component.canShowPreviousDecade()).toBe(true);
        component.prevDecade();
        expect(decades(component)).toEqual([2010]);
        expect(component.canShowPreviousDecade()).toBe(false);

        component.nextDecade();
        component.nextDecade();
        expect(decades(component)).toEqual([2030]);
        expect(component.canShowNextDecade()).toBe(false);
    });

    it('takes the tighter of minYear and minDate', async () => {
        const component = await yearPicker({ minYear: 2005, minDate: '2021-01-01', singleCalendar: true });

        expect(component.canShowPreviousDecade()).toBe(false);
    });

    it('leaves unbounded pickers free to move', async () => {
        const component = await yearPicker();

        expect(component.canShowPreviousDecade()).toBe(true);
        expect(component.canShowNextDecade()).toBe(true);
        component.nextDecade();
        expect(decades(component)).toEqual([2030, 2040]);
    });

    it('opens on a decade holding an allowed year when the view starts outside the bounds', async () => {
        const late = await yearPicker(bounds, 2055);
        await late.openPicker();
        expect(decades(late)).toEqual([2020, 2030]);

        const early = await yearPicker({ ...bounds, singleCalendar: true }, 1990);
        await early.openPicker();
        expect(decades(early)).toEqual([2020]);
    });

    it('binds the decade buttons to the bounds in the view', () => {
        expect(blade).toMatch(/@click="prevDecade\(\)"[^>]*:disabled="!canShowPreviousDecade\(\)"/);
        expect(blade).toMatch(/@click="nextDecade\(\)"[^>]*:disabled="!canShowNextDecade\(\)"/);
    });
});

describe('month picker year arrows honour minYear / maxYear and minDate / maxDate', () => {
    const monthPicker = async (config = {}, viewYear = 2026) => {
        const { component } = await createTestComponent({ pickerType: 'month', ...config });
        component.viewDate = dayjs(`${viewYear}-01-01`);

        return component;
    };

    it('stops two calendars when the right one shows maxYear', async () => {
        const component = await monthPicker({ minYear: 2025, maxYear: 2027 }, 2026);

        expect(component.canShowNextMonthPickerYear()).toBe(false);
        component.nextYear();
        expect(component.viewDate.year()).toBe(2026);

        expect(component.canShowPreviousMonthPickerYear()).toBe(true);
        component.prevYear();
        expect(component.viewDate.year()).toBe(2025);
        expect(component.canShowPreviousMonthPickerYear()).toBe(false);
    });

    it('stops at minDate / maxDate', async () => {
        const component = await monthPicker({ minDate: '2026-03-01', maxDate: '2027-10-31', singleCalendar: true }, 2026);

        expect(component.canShowPreviousMonthPickerYear()).toBe(false);
        expect(component.canShowNextMonthPickerYear()).toBe(true);
        component.nextYear();
        expect(component.canShowNextMonthPickerYear()).toBe(false);
    });

    it('binds the year buttons to the bounds in the view', () => {
        expect(blade).toMatch(/@click="prevYear\(\)"[^>]*:disabled="!canShowPreviousMonthPickerYear\(\)"/);
        expect(blade).toMatch(/@click="nextYear\(\)"[^>]*:disabled="!canShowNextMonthPickerYear\(\)"/);
    });
});
