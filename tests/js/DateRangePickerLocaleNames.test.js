import { describe, it, expect, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import dayjs from 'dayjs';
import { createTestComponent } from './setup.js';
import {
    buildLocaleNames,
    buildRoundTripFixture,
    LOCALE_NAMES_PATH,
    ROUND_TRIP_FIXTURE_PATH,
    serialize,
} from '../../bin/locale-names.js';

// The state carries month / weekday / AM-PM names in the page locale, written
// by Day.js. The PHP filter reads them through resources/dayjs-locale-names.json
// and the Pest suite checks them against tests/fixtures/dayjs-round-trip.json,
// so both have to match the Day.js this bundle ships.

afterEach(() => {
    dayjs.locale('en');
});

describe('Day.js name tables shared with the server', () => {
    it('resources/dayjs-locale-names.json is current (run node bin/build-locale-names.js)', () => {
        expect(fs.readFileSync(LOCALE_NAMES_PATH, 'utf8')).toBe(serialize(buildLocaleNames()));
    });

    it('tests/fixtures/dayjs-round-trip.json is current (run node bin/build-locale-names.js)', () => {
        expect(fs.readFileSync(ROUND_TRIP_FIXTURE_PATH, 'utf8')).toBe(serialize(buildRoundTripFixture()));
    });

    it('resolves every shipped lang directory to the Day.js locale setLocale() picks', async () => {
        const { resolved } = buildLocaleNames();
        const dirs = fs.readdirSync(path.resolve(__dirname, '../../resources/lang'));
        const { component } = await createTestComponent();

        expect(Object.keys(resolved).sort()).toEqual(dirs.sort());

        for (const [phpLocale, dayjsLocale] of Object.entries(resolved)) {
            dayjs.locale('en');
            component.setLocale(phpLocale);
            expect([phpLocale, dayjs.locale()]).toEqual([phpLocale, dayjsLocale]);
        }
    });

    it('has no name that means one date in one locale and another date elsewhere', () => {
        // DayjsDateNames::englishReadings() falls back to every bundled locale
        // when the request locale is not the one the browser wrote in; that is
        // only safe while a name never points at two different months/days.
        const { names } = buildLocaleNames();
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const english = {
            months: months.map((name) => [name]),
            monthsShort: months.map((name) => [name.slice(0, 3)]),
            weekdays: weekdays.map((name) => [name]),
            weekdaysShort: weekdays.map((name) => [name.slice(0, 3)]),
        };
        const conflicts = [];

        for (const table of ['months', 'monthsShort', 'weekdays', 'weekdaysShort']) {
            const seen = new Map();

            for (const [locale, data] of [['php-en', english], ...Object.entries(names)]) {
                data[table].forEach((variants, index) => variants.forEach((variant) => {
                    const key = variant.toLowerCase();
                    if (seen.has(key) && seen.get(key).index !== index) {
                        conflicts.push(`${table} "${variant}": ${seen.get(key).locale} #${seen.get(key).index} vs ${locale} #${index}`);
                    }
                    if (!seen.has(key)) seen.set(key, { locale, index });
                }));
            }
        }

        for (const token of ['A', 'a']) {
            const seen = new Map();

            for (const [locale, data] of Object.entries(names)) {
                for (const [text, meaning] of Object.entries(data.meridiem[token])) {
                    const key = text.toLowerCase();
                    const value = JSON.stringify(meaning);
                    if (seen.has(key) && seen.get(key).value !== value) {
                        conflicts.push(`meridiem ${token} "${text}": ${seen.get(key).locale} vs ${locale}`);
                    }
                    if (!seen.has(key)) seen.set(key, { locale, value });
                }
            }
        }

        expect(conflicts).toEqual([]);
    });

    it('writes Western digits in every bundled locale (no Arabic-Indic digits reach the server)', () => {
        const { strings } = buildRoundTripFixture();

        for (const formats of Object.values(strings)) {
            for (const values of Object.values(formats)) {
                for (const value of values) {
                    expect(value).not.toMatch(/[٠-٩۰-۹]/);
                }
            }
        }
    });
});

describe('localized month state in the picker', () => {
    it('writes an Arabic month range with Day.js month names', async () => {
        const { component } = await createTestComponent({
            locale: 'ar',
            displayFormat: 'MMMM YYYY',
            pickerType: 'month',
            initialState: 'أكتوبر 2026 - نوفمبر 2026',
        });

        expect(component.selection.start?.format('YYYY-MM-DD')).toBe('2026-10-01');
        expect(component.selection.end?.format('YYYY-MM-DD')).toBe('2026-11-30');

        component.syncState();

        expect(component.config.state).toBe('أكتوبر 2026 - نوفمبر 2026');
    });

    // Laravel and Filament call Greek "el" and Norwegian Bokmål "nb"; the
    // legacy lang folders "gr" and "no" must land on the same Day.js locale.
    it.each([
        ['el', 'el', 'Οκτώβριος 2026 - Νοέμβριος 2026'],
        ['gr', 'el', 'Οκτώβριος 2026 - Νοέμβριος 2026'],
        ['nb', 'nb', 'oktober 2026 - november 2026'],
        ['no', 'nb', 'oktober 2026 - november 2026'],
    ])('writes and reads back a %s month range in Day.js "%s"', async (locale, dayjsLocale, state) => {
        const { component } = await createTestComponent({
            locale,
            displayFormat: 'MMMM YYYY',
            pickerType: 'month',
            initialState: state,
        });

        expect(dayjs.locale()).toBe(dayjsLocale);
        expect(component.selection.start?.format('YYYY-MM-DD')).toBe('2026-10-01');
        expect(component.selection.end?.format('YYYY-MM-DD')).toBe('2026-11-30');

        component.syncState();

        expect(component.config.state).toBe(state);
    });

    it('shows an English state on an Arabic page (a default built on the server)', async () => {
        // DateRangePicker::buildDefaultValue() formats with PHP, so its names
        // are English whatever the page locale; the server reads them, so the
        // picker must show them rather than an empty box over an active filter.
        const { component } = await createTestComponent({
            locale: 'ar',
            displayFormat: 'MMMM YYYY',
            pickerType: 'month',
            initialState: 'October 2026 - November 2026',
        });

        expect(component.selection.start?.format('YYYY-MM-DD')).toBe('2026-10-01');
        expect(component.selection.end?.format('YYYY-MM-DD')).toBe('2026-11-30');
    });

    it('shows an English lone date on a German page', async () => {
        const { component } = await createTestComponent({
            locale: 'de',
            displayFormat: 'DD MMM YYYY',
            initialState: '06 Oct 2026',
        });

        expect(component.selection.start?.format('YYYY-MM-DD')).toBe('2026-10-06');
    });
});
