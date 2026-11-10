/**
 * Day.js "Do" (day of month with ordinal suffix) in English: "1st", "2nd".
 *
 * The server converts PHP "jS" to "Do" (HasRangePicker::convertPhpToJsFormat()).
 * Day.js core does not know "Do", so it wrote "2o", and Day.js's
 * advancedFormat plugin would write the locale's ordinal, which
 * Carbon::createFromFormat() cannot read: PHP's "S" is English in every
 * locale. customParseFormat reads "Do" through the locale's ordinal(), which
 * in some locales returns a number ("ar") and throws on the way, so parsing a
 * format with "Do" uses the English ordinal too. Register after
 * customParseFormat.
 */
const SUFFIXES = ['th', 'st', 'nd', 'rd'];

export const englishOrdinal = (day) => {
    const lastTwo = day % 100;

    return `${day}${SUFFIXES[(lastTwo - 20) % 10] || SUFFIXES[lastTwo] || SUFFIXES[0]}`;
};

const hasDo = (formatStr) =>
    typeof formatStr === 'string' && formatStr.replace(/\[[^\]]*]/g, '').includes('Do');

export default (option, Dayjs, dayjsFactory) => {
    const proto = Dayjs.prototype;
    const format = proto.format;
    const parse = proto.parse;

    proto.parse = function (cfg) {
        const args = cfg?.args;

        if (!args || !hasDo(args[1])) {
            return parse.call(this, cfg);
        }

        const locale = (typeof args[2] === 'string' && dayjsFactory.Ls[args[2]]) || this.$locale();
        const ordinal = locale.ordinal;
        locale.ordinal = (day) => `[${englishOrdinal(day)}]`;

        try {
            return parse.call(this, cfg);
        } finally {
            locale.ordinal = ordinal;
        }
    };

    proto.format = function (formatStr) {
        if (!hasDo(formatStr) || !this.isValid()) {
            return format.call(this, formatStr);
        }

        // Bracketed text is a literal and stays as it is.
        const replaced = formatStr.replace(/\[[^\]]*]|Do/g, (match) =>
            match === 'Do' ? `[${englishOrdinal(this.date())}]` : match
        );

        return format.call(this, replaced);
    };
};
