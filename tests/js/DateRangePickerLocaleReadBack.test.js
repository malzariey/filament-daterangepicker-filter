import { describe, it, expect, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import dayjs from 'dayjs';
import { createTestComponent, flushPromises } from './setup.js';
import { buildLocaleNames, ROUND_TRIP_FORMATS, roundTripSamples } from '../../bin/locale-names.js';

/**
 * The picker reads back every string its own formatter writes, in every
 * bundled locale: after a reload with a persisted state, a hydrated stored
 * value or a manual edit, the field shows the same instant again.
 *
 * Day.js's own parser misses some of them: it splits names on spaces (ckb
 * "تشرینی دووەم"), and it reads a meridiem as PM only when the text first
 * appears after 12:00 (ru "дня", ko "오후", ckb "د.ن", zh-cn "中午").
 */

afterEach(() => {
    dayjs.locale('en');
});

const typeIntoInput = (component, value) => {
    const input = component.$refs.input;
    input.value = value;
    input.setSelectionRange(value.length, value.length);
    input.dispatchEvent(new Event('input', { bubbles: true }));
};

const typeKeys = (component, keys) => {
    const input = component.$refs.input;

    for (const ch of keys) {
        const pos = input.selectionStart ?? 0;
        const value = input.value;
        input.value = value.slice(0, pos) + ch + value.slice(pos);
        input.setSelectionRange(pos + 1, pos + 1);
        input.dispatchEvent(new Event('input', { bubbles: true }));
    }
};

const focusStart = (component) => {
    const input = component.$refs.input;
    document.body.appendChild(input);
    input.focus = HTMLElement.prototype.focus;
    input.focus();
    input.setSelectionRange(0, 0);
    input.dispatchEvent(new Event('focus'));
};

const precision = (format) => (/[Hh]/.test(format) ? 'YYYY-MM-DD HH:mm' : (/D/.test(format) ? 'YYYY-MM-DD' : 'YYYY-MM'));

describe('Arabic 12-hour meridiem', () => {
    const config = {
        locale: 'ar',
        timePicker: true,
        timePicker24: false,
        singleCalendar: true,
        displayFormat: 'DD/MM/YYYY hh:mm A',
    };

    it('writes noon as م (PM) and midnight as ص (AM)', async () => {
        const { component } = await createTestComponent(config);

        const at = (hour) => component.formatDate(dayjs('2026-10-06T00:30:00').hour(hour), 'hh:mm A');

        expect([0, 11, 12, 13, 23].map(at)).toEqual(['12:30 ص', '11:30 ص', '12:30 م', '01:30 م', '11:30 م']);
    });

    it('reads 12:30 م back as noon, not midnight', async () => {
        const { component } = await createTestComponent({ ...config, initialState: '06/10/2026 12:30 م' });

        expect(component.selection.start?.format('YYYY-MM-DD HH:mm')).toBe('2026-10-06 12:30');
        expect(component.startTime).toMatchObject({ hour: 12, minute: 30, ampm: 'PM' });
        expect(component.inputValue).toBe('06/10/2026 12:30 م');
    });

    it('accepts 12:30 م typed into the field', async () => {
        const { component } = await createTestComponent({ ...config, allowInput: true });
        focusStart(component);

        typeKeys(component, '061020261230م');
        await flushPromises();

        expect(component.$refs.input.value).toBe('06/10/2026 12:30 م');
        expect(component.config.state).toBe('06/10/2026 12:30 م');
        expect(component.startTime).toMatchObject({ hour: 12, minute: 30, ampm: 'PM' });
    });

    it('writes noon picked in the selects as 12:30 م', async () => {
        const { component } = await createTestComponent({ ...config, initialState: '06/10/2026 09:00 ص' });

        component.startTime = { hour: 12, minute: 30, second: 0, ampm: 'PM' };
        component.handleTimeChange(true);
        component.apply?.();
        component.syncState();

        expect(component.config.state).toBe('06/10/2026 12:30 م');
    });
});

describe('AM/PM select labels', () => {
    it('labels the options with the locale meridiem, values unchanged', async () => {
        const { component } = await createTestComponent({ locale: 'ar', timePicker: true, timePicker24: false });

        const time = { hour: 9, minute: 0, second: 0, ampm: 'AM' };
        expect(component.meridiemLabel(time, 'AM')).toBe('ص');
        expect(component.meridiemLabel(time, 'PM')).toBe('م');
    });

    it('follows the selected hour where the locale names parts of the day', async () => {
        const { component } = await createTestComponent({ locale: 'ru', timePicker: true, timePicker24: false });

        expect(component.meridiemLabel({ hour: 9, minute: 0, ampm: 'AM' }, 'AM')).toBe('утра');
        expect(component.meridiemLabel({ hour: 9, minute: 0, ampm: 'AM' }, 'PM')).toBe('вечера');
        expect(component.meridiemLabel({ hour: 12, minute: 0, ampm: 'AM' }, 'AM')).toBe('ночи');
        expect(component.meridiemLabel({ hour: 12, minute: 0, ampm: 'AM' }, 'PM')).toBe('дня');
    });

    it('keeps English AM / PM in English', async () => {
        const { component } = await createTestComponent({ locale: 'en', timePicker: true, timePicker24: false });

        expect(component.meridiemLabel({ hour: 9, minute: 0, ampm: 'AM' }, 'AM')).toBe('AM');
        expect(component.meridiemLabel({ hour: 9, minute: 0, ampm: 'AM' }, 'PM')).toBe('PM');
    });

    it('renders the labels from meridiemLabel() with AM / PM values', () => {
        const view = fs.readFileSync(path.resolve(__dirname, '../../resources/views/date-range-picker.blade.php'), 'utf8');
        const selects = [...view.matchAll(/<select x-model="(start|end)Time\.ampm"[\s\S]*?<\/select>/g)].map((m) => m[0]);

        expect(selects).toHaveLength(2);

        for (const select of selects) {
            expect(select).not.toMatch(/>AM<|>PM</);
            expect(select).toMatch(/value="AM"[^>]*x-text="meridiemLabel\((start|end)Time, 'AM'\)"/);
            expect(select).toMatch(/value="PM"[^>]*x-text="meridiemLabel\((start|end)Time, 'PM'\)"/);
        }
    });
});

describe('reads back what the formatter writes', () => {
    it('reads a ckb month name that contains a space', async () => {
        const { component } = await createTestComponent({
            locale: 'ckb',
            displayFormat: 'DD MMMM YYYY',
            initialState: '09 تشرینی دووەم 2026 - 10 تشرینی دووەم 2026',
        });

        expect(component.selection.start?.format('YYYY-MM-DD')).toBe('2026-11-09');
        expect(component.selection.end?.format('YYYY-MM-DD')).toBe('2026-11-10');
    });

    it.each([
        ['ru', '06/10/2026 01:30 дня', '2026-10-06 13:30'],
        ['ru', '06/10/2026 12:30 дня', '2026-10-06 12:30'],
        ['ko', '06/10/2026 12:30 오후', '2026-10-06 12:30'],
        ['ckb', '06/10/2026 12:30 د.ن', '2026-10-06 12:30'],
        ['zh_CN', '06/10/2026 12:30 中午', '2026-10-06 12:30'],
        ['zh_CN', '06/10/2026 11:30 中午', '2026-10-06 11:30'],
    ])('reads %s %s as %s', async (locale, state, expected) => {
        const { component } = await createTestComponent({
            locale,
            timePicker: true,
            singleCalendar: true,
            displayFormat: 'DD/MM/YYYY hh:mm A',
            initialState: state,
        });

        expect(component.selection.start?.format('YYYY-MM-DD HH:mm')).toBe(expected);
    });

    it('reads every locale x format x instant back to the same instant (state and typed input)', async () => {
        const { resolved } = buildLocaleNames();
        const samples = roundTripSamples();
        const { component } = await createTestComponent({ singleCalendar: true });
        const failures = [];
        let checked = 0;

        for (const [phpLocale, dayjsLocale] of Object.entries(resolved)) {
            if (dayjsLocale === 'en') continue;

            for (const format of Object.values(ROUND_TRIP_FORMATS)) {
                component.setLocale(phpLocale);
                component.config.displayFormat = format;
                const unit = precision(format);

                for (const sample of samples) {
                    const text = component.formatDate(dayjs(sample), format);
                    const expected = dayjs(sample).format(unit);

                    component.parseState(text);
                    const fromState = component.selection.start?.format(unit) ?? 'empty';
                    const typed = component.parseManualInput(text);
                    const fromInput = typed.status === 'valid' ? typed.start.format(unit) : typed.status;

                    checked++;

                    if (fromState !== expected || fromInput !== expected) {
                        failures.push(`${phpLocale} '${format}' '${text}': expected ${expected}, state ${fromState}, input ${fromInput}`);
                    }
                }
            }
        }

        // 31 non-English shipped locales x 10 formats x 24 instants.
        expect(failures).toEqual([]);
        expect(checked).toBe(31 * 10 * 24);
    }, 30000);

    it('writes no text that two instants share (no ambiguous read-back)', async () => {
        const { resolved } = buildLocaleNames();
        const samples = roundTripSamples();
        const { component } = await createTestComponent({ singleCalendar: true });
        const shared = [];

        for (const [phpLocale, dayjsLocale] of Object.entries(resolved)) {
            if (dayjsLocale === 'en') continue;
            component.setLocale(phpLocale);

            for (const format of Object.values(ROUND_TRIP_FORMATS).filter((f) => /h/.test(f))) {
                for (const sample of samples) {
                    const date = dayjs(sample);
                    if (date.hour() < 12) continue;
                    const text = component.formatDate(date, format);
                    if (component.formatDate(date.subtract(12, 'hour'), format) === text) {
                        shared.push(`${phpLocale} '${format}' '${text}'`);
                    }
                }
            }
        }

        expect(shared).toEqual([]);
    }, 30000);
});
