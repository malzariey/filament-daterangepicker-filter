/**
 * The month, weekday and meridiem names Day.js writes into the field state,
 * exported for the PHP side.
 *
 * The browser formats the state with Day.js in the page locale, and the filter
 * parses it with PHP. Carbon's own name tables are not the same as Day.js's
 * ("Okt." vs "Okt", "אוק" vs "אוק׳", "PM" vs "بعد از ظهر"), so the server reads
 * names from this export instead: resources/dayjs-locale-names.json.
 *
 * `node bin/build-locale-names.js` regenerates it, and
 * tests/js/DateRangePickerLocaleNames.test.js fails when it is stale.
 */
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const dayjs = require('dayjs');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const componentSource = path.join(root, 'resources/js/filament-daterangepicker.js');

/** The Day.js locales the component bundles, read from its import lines. */
export function bundledDayjsLocales() {
    const source = fs.readFileSync(componentSource, 'utf8');
    const locales = [...source.matchAll(/^import 'dayjs\/locale\/([a-z-]+)';$/gm)].map((m) => m[1]);

    locales.forEach((locale) => require(`dayjs/locale/${locale}`));

    return locales.sort();
}

/** The PHP → Day.js locale map in setLocale(), read from the component. */
function componentLocaleMap() {
    const source = fs.readFileSync(componentSource, 'utf8');
    const body = source.match(/const localeMap = \{([\s\S]*?)\};/)[1];

    return Object.fromEntries(
        [...body.matchAll(/'([^']+)':\s*'([^']+)'/g)].map((m) => [m[1], m[2]]),
    );
}

/**
 * The Day.js locale setLocale() ends up on for a PHP locale: the map, else
 * the lower-cased code with its first "_" as "-", which dayjs.locale()
 * shortens to the language ("ar-sa" → "ar") and otherwise ignores (stays "en").
 */
export function resolveDayjsLocale(phpLocale, available, map = componentLocaleMap()) {
    const candidate = (map[phpLocale] || phpLocale.toLowerCase().replace('_', '-')).toLowerCase();

    if (available.includes(candidate)) return candidate;

    const language = candidate.split('-')[0];

    return available.includes(language) && candidate.includes('-') ? language : 'en';
}

function unique(values) {
    return [...new Set(values.filter((value) => typeof value === 'string' && value !== ''))];
}

/** Text Day.js writes between two literal markers, so context rules still run. */
function between(date, format) {
    const out = date.format(format);

    return out.slice(out.indexOf('<') + 1, out.indexOf('>'));
}

function namesFor(locale) {
    const base = dayjs('2026-01-01T00:00:00').locale(locale);
    const data = dayjs.Ls[locale];
    const table = (part, i) => {
        const value = data[part];
        if (Array.isArray(value)) return [value[i]];
        // ru, uk, pl, lt: a function choosing format / standalone forms.
        if (typeof value === 'function') return [value.s?.[i], value.f?.[i]];
        return [];
    };

    const months = [];
    const monthsShort = [];

    for (let i = 0; i < 12; i++) {
        const date = base.month(i).date(1);
        // Standalone, after a day number (genitive in ru/uk/pl), before one (lt).
        months.push(unique([
            ...table('months', i),
            between(date, '[<]MMMM[>]'),
            between(date, 'D [<]MMMM[>]'),
            between(date, 'DD [<]MMMM[>]'),
            between(date, '[<]MMMM[>] D'),
        ]));
        monthsShort.push(unique([
            ...table('monthsShort', i),
            between(date, '[<]MMM[>]'),
            between(date, 'D [<]MMM[>]'),
            between(date, 'DD [<]MMM[>]'),
            between(date, '[<]MMM[>] D'),
        ]));
    }

    const weekdays = [];
    const weekdaysShort = [];

    // 2026-01-04 is a Sunday; index 0 = Sunday, as in Day.js and PHP 'w'.
    for (let i = 0; i < 7; i++) {
        const date = base.date(4 + i);
        weekdays.push(unique([between(date, '[<]dddd[>]')]));
        weekdaysShort.push(unique([between(date, '[<]ddd[>]')]));
    }

    // meridiem[token][text] = "AM" | "PM", or {h: "AM"|"PM"} keyed by the
    // 12-hour number when the text alone is ambiguous (zh-cn "中午" covers
    // 11:00-12:59, which is 11 AM and 12 PM).
    //
    // When even text and hour together are ambiguous, AM wins: Day.js "ar"
    // writes "ص" for every hour up to 12 (hour > 12 ? 'م' : 'ص'), so
    // midnight and noon are both "12:00 ص". Day.js's own parser reads that as
    // midnight, the usual start-of-day boundary, so the server does too.
    const meridiem = {};

    for (const token of ['A', 'a']) {
        const byText = {};

        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute++) {
                const date = base.hour(hour).minute(minute);
                const text = between(date, `[<]${token}[>]`);
                const h12 = date.format('h');
                byText[text] ??= {};
                byText[text][h12] ??= hour < 12 ? 'AM' : 'PM';
            }
        }

        meridiem[token] = Object.fromEntries(
            Object.entries(byText).map(([text, hours]) => {
                const values = unique(Object.values(hours));
                return [text, values.length === 1 ? values[0] : hours];
            }),
        );
    }

    return { months, monthsShort, weekdays, weekdaysShort, meridiem };
}

export function buildLocaleNames() {
    const available = bundledDayjsLocales();
    const langDirs = fs.readdirSync(path.join(root, 'resources/lang')).sort();
    const map = componentLocaleMap();

    const names = {};

    for (const locale of available) {
        names[locale] = namesFor(locale);
    }

    return {
        _comment: 'Generated by bin/build-locale-names.js from Day.js. Do not edit.',
        dayjs: require('dayjs/package.json').version,
        available,
        map,
        resolved: Object.fromEntries(langDirs.map((dir) => [dir, resolveDayjsLocale(dir, available, map)])),
        names,
    };
}

/**
 * PHP format → the Day.js format HasRangePicker::convertPhpToJsFormat() makes
 * of it, for the round-trip fixture the Pest suite parses.
 */
export const ROUND_TRIP_FORMATS = {
    'F Y': 'MMMM YYYY',
    'M Y': 'MMM YYYY',
    'd M Y': 'DD MMM YYYY',
    'j F Y': 'D MMMM YYYY',
    'd F Y': 'DD MMMM YYYY',
    'M d, Y': 'MMM DD, YYYY',
    'D d/m/Y': 'ddd DD/MM/YYYY',
    'l, d F Y': 'dddd, DD MMMM YYYY',
    'd/m/Y h:i A': 'DD/MM/YYYY hh:mm A',
    'd M Y g:i a': 'DD MMM YYYY h:mm a',
};

/** 24 instants: every month, every weekday, every hour of the day. */
export function roundTripSamples() {
    return Array.from({ length: 24 }, (_, i) =>
        dayjs(`2026-${String((i % 12) + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}T${String(i).padStart(2, '0')}:${String((i * 7) % 60).padStart(2, '0')}:00`)
            .format('YYYY-MM-DD HH:mm'),
    );
}

export function buildRoundTripFixture() {
    const available = bundledDayjsLocales();
    const samples = roundTripSamples();
    const strings = {};
    const ambiguous = {};

    for (const locale of available) {
        strings[locale] = {};

        for (const [phpFormat, jsFormat] of Object.entries(ROUND_TRIP_FORMATS)) {
            strings[locale][phpFormat] = samples.map((sample) => dayjs(sample).locale(locale).format(jsFormat));

            // Samples whose text Day.js also writes for the instant 12 hours
            // earlier (ar: noon and midnight are both "12:00 ص"); the server
            // reads those as the AM one.
            samples.forEach((sample, i) => {
                const date = dayjs(sample).locale(locale);
                if (/[hH]/.test(jsFormat) && date.hour() >= 12 && date.subtract(12, 'hour').format(jsFormat) === strings[locale][phpFormat][i]) {
                    ambiguous[locale] ??= {};
                    (ambiguous[locale][phpFormat] ??= []).push(i);
                }
            });
        }
    }

    return {
        _comment: 'Generated by bin/build-locale-names.js: what Day.js writes for each sample. Do not edit.',
        samples,
        strings,
        ambiguous,
    };
}

export const LOCALE_NAMES_PATH = path.join(root, 'resources/dayjs-locale-names.json');
export const ROUND_TRIP_FIXTURE_PATH = path.join(root, 'tests/fixtures/dayjs-round-trip.json');

export function serialize(data) {
    return JSON.stringify(data, null, 1) + '\n';
}
