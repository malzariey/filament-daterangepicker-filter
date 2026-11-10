import { describe, expect, it } from "vitest";
import { createTestComponent, dayjs, flushPromises } from "./setup.js";

/**
 * PHP format tokens the server converts for the browser
 * (HasRangePicker::convertPhpToJsFormat()).
 *
 * PHP "jS" becomes Day.js "Do". Day.js core does not know "Do", so the
 * picker wrote "2o June 2026" for "2nd June 2026"; Carbon could not read that
 * back and the browser could not hydrate the server's own "2nd June 2026".
 * PHP's suffix is English in every locale, and Carbon reads only English, so
 * the browser writes it in English too. The expected strings below are what
 * Carbon's format('jS') writes (tests/PhpFormatTokensTest.php asserts the
 * same list on the server).
 */
const ordinals = {
    1: "1st",
    2: "2nd",
    3: "3rd",
    4: "4th",
    11: "11th",
    12: "12th",
    13: "13th",
    21: "21st",
    22: "22nd",
    23: "23rd",
    31: "31st",
};

describe("PHP format tokens in the browser", () => {
    it("writes jS (Day.js Do) with Carbon's English suffixes", async () => {
        await createTestComponent();

        for (const [day, expected] of Object.entries(ordinals)) {
            const date = dayjs(`2026-01-${String(day).padStart(2, "0")}`);

            expect(date.format("Do MMMM YYYY")).toBe(`${expected} January 2026`);
        }
    });

    it("writes the English suffix on a non-English page", async () => {
        await createTestComponent({ locale: "ar" });

        try {
            dayjs.locale("ar");

            expect(dayjs("2026-06-02").format("Do")).toBe("2nd");
        } finally {
            dayjs.locale("en");
        }
    });

    it("reads and writes a jS dual-state value on an Arabic page", async () => {
        // ar's ordinal() returns a number, which made customParseFormat
        // throw on "Do": the picker could not write the backing values.
        const { component } = await createTestComponent({
            locale: "ar",
            dualState: true,
            storageFormat: "YYYY-MM-DD HH:mm:ss",
            storageTimezone: "UTC",
            timezone: "Asia/Riyadh",
            displayFormat: "Do MMM YYYY HH:mm",
            timePicker: true,
            timePicker24: true,
        });

        try {
            component.selection.start = dayjs("2026-11-01");
            component.selection.end = dayjs("2026-11-03");
            component.applySelection();
            await flushPromises();

            expect(component.inputValue).toMatch(/^1st \S+ 2026 00:00 - 3rd \S+ 2026 23:59$/);
            expect(component.config.dualStartState).toBe("2026-10-31 21:00:00");
            expect(component.config.dualEndState).toBe("2026-11-03 20:59:59");

            const typed = dayjs("2026-11-22 10:00").format("Do MMM YYYY HH:mm");
            expect(dayjs(typed, "Do MMM YYYY HH:mm", true).format("YYYY-MM-DD HH:mm")).toBe("2026-11-22 10:00");
        } finally {
            dayjs.locale("en");
        }
    });

    it("leaves a bracketed Do literal alone", async () => {
        await createTestComponent();

        expect(dayjs("2026-06-02").format("[Do] D")).toBe("Do 2");
    });

    it("reads its own jS value back strictly", async () => {
        await createTestComponent();

        for (const day of Object.keys(ordinals)) {
            const date = dayjs(`2026-01-${String(day).padStart(2, "0")}`);
            const text = date.format("Do MMMM YYYY");
            const parsed = dayjs(text, "Do MMMM YYYY", true);

            expect(parsed.isValid()).toBe(true);
            expect(parsed.format("YYYY-MM-DD")).toBe(date.format("YYYY-MM-DD"));
        }
    });

    it("hydrates and writes a jS range state", async () => {
        const { component } = await createTestComponent({
            displayFormat: "Do MMMM YYYY",
            initialState: "2nd June 2026 - 23rd June 2026",
        });

        expect(component.selection.start.format("YYYY-MM-DD")).toBe("2026-06-02");
        expect(component.selection.end.format("YYYY-MM-DD")).toBe("2026-06-23");
        expect(component.inputValue).toBe("2nd June 2026 - 23rd June 2026");

        component.selection.start = dayjs("2026-06-01");
        component.selection.end = dayjs("2026-06-11");
        component.applySelection();
        await flushPromises();

        expect(component.config.state).toBe("1st June 2026 - 11th June 2026");
    });

    it("writes a dual-state value whose display uses jS", async () => {
        const { component } = await createTestComponent({
            dualState: true,
            dualStartState: "2026-06-02",
            dualEndState: "2026-06-03",
            storageFormat: "YYYY-MM-DD",
            storageTimezone: "UTC",
            timezone: "UTC",
            displayFormat: "Do MMM YYYY",
        });

        expect(component.inputValue).toBe("2nd Jun 2026 - 3rd Jun 2026");

        component.selection.start = dayjs("2026-06-21");
        component.selection.end = dayjs("2026-06-22");
        component.applySelection();
        await flushPromises();

        expect(component.config.dualStartState).toBe("2026-06-21");
        expect(component.config.dualEndState).toBe("2026-06-22");
    });

    it("round-trips a timezone identifier (PHP e) as a literal", async () => {
        const { component } = await createTestComponent({
            dualState: true,
            dualStartState: "2026-06-10 08:17:00 UTC",
            dualEndState: "2026-06-12 16:43:59 UTC",
            storageFormat: "YYYY-MM-DD HH:mm:ss [UTC]",
            storageTimezone: "UTC",
            timezone: "Europe/Berlin",
            displayFormat: "DD.MM.YYYY HH:mm [Europe/Berlin]",
            timePicker: true,
            timePicker24: true,
        });

        expect(component.inputValue).toBe(
            "10.06.2026 10:17 Europe/Berlin - 12.06.2026 18:43 Europe/Berlin",
        );

        component.selection.start = dayjs("2026-06-15 09:13");
        component.selection.end = dayjs("2026-06-16 17:47");
        component.startTime = { hour: 9, minute: 13, second: 0, ampm: "AM" };
        component.endTime = { hour: 17, minute: 47, second: 0, ampm: "PM" };
        component.applySelection();
        await flushPromises();

        expect(component.config.dualStartState).toBe("2026-06-15 07:13:00 UTC");
        expect(component.config.dualEndState).toBe("2026-06-16 15:47:59 UTC");
    });

    /**
     * Unsupported PHP tokens keep the Day.js format 5.0.11 sent, and the
     * page shows what it showed then. A misplaced "S" ("dS") is sent as
     * "[o]" instead of "o": Day.js writes both as the letter, but "DDo"
     * would now reach the English ordinal plugin as "D" + "Do".
     */
    it("writes the unsupported tokens' 5.0.11 formats as 5.0.11 did", async () => {
        await createTestComponent();

        const date = dayjs("2026-06-05 14:07:09");

        expect(date.format("DD[o] MMMM YYYY")).toBe("05o June 2026");
        expect(date.format("DD/MM/YYYY E")).toBe("05/06/2026 E");
        expect(date.format("YYYY-MM-DD [W]W")).toBe("2026-06-05 WW");
        expect(date.format("YYYY DDD")).toBe("2026 055");
        expect(date.format("YYYY-MM-DD HH:mm z")).toBe("2026-06-05 14:07 z");
    });
});
