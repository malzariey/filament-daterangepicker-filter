/**
 * Day.js month, weekday and meridiem names: one table for the browser and
 * the server.
 *
 * The picker formats its state with Day.js in the page locale. The server
 * reads it back through resources/dayjs-locale-names.json (bin/locale-names.js
 * exports these tables), and the picker reads it back here, so both read
 * exactly what Day.js wrote.
 *
 * Day.js's own parser (customParseFormat) cannot: it takes a name to the first
 * space ("تشرینی دووەم", "tháng 10"), has no weekday token, and reads a
 * meridiem as PM only when its text first appears after 12:00, so ru "дня",
 * ko "오후", ckb "د.ن" and zh-cn "中午" all read as AM.
 *
 * Takes the Day.js instance as an argument: the bundle and the Node build
 * script each have their own.
 */

/**
 * Locale fixes applied before anything is formatted or exported.
 *
 * Day.js "ar" writes "ص" (AM) up to and including 12:59 (hour > 12 ? 'م' : 'ص'),
 * so noon and midnight were both "12:30 ص" and noon read back as midnight.
 * Noon is PM, as in every other bundled locale.
 */
export function applyDayjsLocaleFixes(dayjs) {
    const ar = dayjs.Ls?.ar;

    if (ar?.meridiem && ar.meridiem(12, 0) === ar.meridiem(0, 0)) {
        ar.meridiem = (hour) => (hour < 12 ? 'ص' : 'م');
    }
}

function unique(values) {
    return [...new Set(values.filter((value) => typeof value === 'string' && value !== ''))];
}

/** Text Day.js writes between two literal markers, so context rules still run. */
function between(date, format) {
    const out = date.format(format);

    return out.slice(out.indexOf('<') + 1, out.indexOf('>'));
}

/**
 * Every name Day.js writes in a locale:
 * { months, monthsShort, weekdays, weekdaysShort } as lists of variants per
 * index (0 = January / Sunday), and meridiem[token][text] = "AM" | "PM", or
 * {h: "AM" | "PM"} keyed by the 12-hour number when the text alone is
 * ambiguous (zh-cn "中午" covers 11:00-12:59, which is 11 AM and 12 PM).
 */
export function dayjsNameTables(dayjs, locale) {
    const base = dayjs('2026-01-01T00:00:00').locale(locale);
    const data = dayjs.Ls[locale] || {};
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

    // With applyDayjsLocaleFixes() no bundled locale writes the same text
    // and hour for an AM and a PM instant; if one ever does, AM wins.
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

const ENGLISH_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const NAME_TABLES = { MMMM: 'months', MMM: 'monthsShort', dddd: 'weekdays', ddd: 'weekdaysShort', dd: 'weekdaysMin', Do: 'ordinals' };

/** Tokens Day.js's parser cannot read (d, dd) or reads with a locale table (A, a, Do, names). */
const READER_TOKENS = new Set([...Object.keys(NAME_TABLES), 'A', 'a', 'd']);

const FORMAT_TOKENS = /\[[^\]]*\]|YYYY|YY|MMMM|MMM|MM|M|Do|DD|D|dddd|ddd|dd|d|HH|H|hh|h|mm|m|ss|s|SSS|SS|S|A|a|ZZ|Z|Q|X|x|ww|w/g;

const tableCache = new WeakMap();

function cachedTables(dayjs, locale) {
    if (!tableCache.has(dayjs)) tableCache.set(dayjs, new Map());
    const byLocale = tableCache.get(dayjs);
    if (!byLocale.has(locale)) byLocale.set(locale, readerTables(dayjs, locale));

    return byLocale.get(locale);
}

/**
 * dayjsNameTables() plus the two lists only the browser reads: weekdaysMin
 * ("dd") and the day-of-month ordinals ("Do", English in every locale through
 * english-ordinal.js). Kept out of dayjsNameTables(), which the server's
 * table (resources/dayjs-locale-names.json) is exported from.
 */
function readerTables(dayjs, locale) {
    const tables = dayjsNameTables(dayjs, locale);
    const base = dayjs('2026-01-01T00:00:00').locale(locale);

    // 2026-01-04 is a Sunday; 2026-01 has 31 days.
    tables.weekdaysMin = Array.from({ length: 7 }, (_, i) => unique([between(base.date(4 + i), '[<]dd[>]')]));
    tables.ordinals = Array.from({ length: 31 }, (_, i) => unique([between(base.date(i + 1), '[<]Do[>]')]));

    return tables;
}

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** The format as [type, text] segments: "literal", "value" or "name". */
function tokenize(format) {
    const segments = [];
    let last = 0;

    for (const match of format.matchAll(FORMAT_TOKENS)) {
        if (match.index > last) segments.push(['literal', format.slice(last, match.index)]);
        const token = match[0];

        if (token.startsWith('[')) segments.push(['literal', token.slice(1, -1)]);
        else if (token in NAME_TABLES || token === 'A' || token === 'a') segments.push(['name', token]);
        else if (token === 'd') segments.push(['weekday', token]);
        else segments.push(['value', token]);

        last = match.index + token.length;
    }

    if (last < format.length) segments.push(['literal', format.slice(last)]);

    return segments;
}

const lower = (text) => text.toLocaleLowerCase();

/** Whether Day.js's own parser cannot be trusted with `format`: see readLocalizedDate(). */
export function formatNeedsReader(format) {
    return tokenize(format).some(([, token]) => READER_TOKENS.has(token));
}

/**
 * `text` written by Day.js with `format` in `locale`, read as a Day.js date
 * (strict), or null when the format has no names, meridiem, ordinal or
 * weekday, or the text does not have its shape, so the caller can fall back
 * to Day.js's own parser.
 *
 * Swaps every name for the English one and parses that in "en"; the
 * meridiem is read from the per-hour table, an ordinal ("Do") as its day
 * number; a weekday ("dddd", "ddd", "dd", "d") is taken out and checked
 * against the date instead (Day.js cannot parse one).
 */
export function readLocalizedDate(dayjs, text, format, locale) {
    if (!dayjs.Ls[locale]) return null;

    const segments = tokenize(format);
    if (!segments.some(([type]) => type === 'name' || type === 'weekday')) return null;

    const names = cachedTables(dayjs, locale);
    const candidates = (token) => {
        const list = token === 'A' || token === 'a'
            ? Object.keys(names.meridiem[token])
            : names[NAME_TABLES[token]].flat();

        // Longest first, so "تشرینی دووەم" is not read as a shorter prefix.
        return unique(list).sort((a, b) => b.length - a.length).map(escapeRegExp).join('|');
    };

    const pattern = segments.map(([type, value]) => {
        if (type === 'literal') return escapeRegExp(value);
        if (type === 'value') return '(.*?)';
        if (type === 'weekday') return '([0-6])';
        return `(${candidates(value)})`;
    }).join('');

    const match = new RegExp(`^${pattern}$`, 'iu').exec(String(text).trim());
    if (!match) return null;

    const captures = [];
    let group = 1;
    segments.forEach(([type], index) => {
        if (type !== 'literal') captures[index] = match[group++];
    });

    const hourIndex = segments.findIndex(([type, token]) => type === 'value' && (token === 'h' || token === 'hh'));
    const hour12 = hourIndex === -1 ? null : String(Number(captures[hourIndex]));

    let englishText = '';
    let englishFormat = '';
    let weekday = null;

    for (const [index, [type, token]] of segments.entries()) {
        if (type === 'literal') {
            englishText += token;
            englishFormat += `[${token}]`;
            continue;
        }

        const captured = captures[index];

        if (type === 'value') {
            englishText += captured;
            englishFormat += token;
            continue;
        }

        if (type === 'weekday') {
            const number = Number(captured);
            if (weekday !== null && weekday !== number) return null;
            weekday = number;
            continue;
        }

        if (token === 'A' || token === 'a') {
            const key = Object.keys(names.meridiem[token]).find((name) => lower(name) === lower(captured));
            let meaning = names.meridiem[token][key];
            if (meaning && typeof meaning === 'object') meaning = hour12 === null ? undefined : meaning[hour12];
            if (!meaning) return null;

            englishText += token === 'a' ? meaning.toLowerCase() : meaning;
            englishFormat += token;
            continue;
        }

        const index12 = names[NAME_TABLES[token]].findIndex((variants) => variants.some((variant) => lower(variant) === lower(captured)));
        if (index12 === -1) return null;

        if (token === 'dddd' || token === 'ddd' || token === 'dd') {
            if (weekday !== null && weekday !== index12) return null;
            weekday = index12;
            continue;
        }

        if (token === 'Do') {
            englishText += String(index12 + 1);
            englishFormat += 'D';
            continue;
        }

        englishText += token === 'MMMM' ? ENGLISH_MONTHS[index12] : ENGLISH_MONTHS[index12].slice(0, 3);
        englishFormat += token;
    }

    const date = dayjs(englishText, englishFormat, 'en', true);

    if (!date.isValid() || (weekday !== null && date.day() !== weekday)) {
        return dayjs(NaN);
    }

    return date.locale(locale);
}

/**
 * `text` written with `format`, read strictly in the first of `locales` that
 * reads it, as a Day.js date in that locale; an invalid date when none does.
 *
 * The one parser for display and stored strings: readLocalizedDate() first,
 * then Day.js's own strict parser, which is safe for a format without names
 * and, being strict, refuses a meridiem it misreads instead of returning the
 * wrong half of the day.
 */
export function parseFormattedDate(dayjs, text, format, locales) {
    const value = String(text);

    for (const locale of locales) {
        const localized = readLocalizedDate(dayjs, value, format, locale);
        if (localized?.isValid()) return localized;
    }

    let first = null;

    for (const locale of locales) {
        const date = dayjs(value, format, locale, true);
        if (date.isValid()) return date;
        first ??= date;
    }

    return first ?? dayjs(NaN);
}

/**
 * `text` written with `format` as wall-clock time in `timezone`: what
 * dayjs.tz(text, format, timezone) returns, read with parseFormattedDate()
 * when the format has a name, meridiem, ordinal or weekday. Formats without
 * one keep Day.js's own (lenient) path exactly, so the caller's round-trip
 * check still decides. The result is in the locale that read the text.
 */
export function parseFormattedDateInZone(dayjs, text, format, locales, timezone) {
    if (!formatNeedsReader(format)) {
        return dayjs.tz(text, format, timezone);
    }

    const wallClock = parseFormattedDate(dayjs, text, format, locales);
    if (!wallClock.isValid()) return wallClock;

    return dayjs
        .tz(wallClock.format('YYYY-MM-DD HH:mm:ss.SSS'), 'YYYY-MM-DD HH:mm:ss.SSS', timezone)
        .locale(wallClock.locale());
}
