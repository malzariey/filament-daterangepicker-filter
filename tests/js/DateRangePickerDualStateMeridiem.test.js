import { afterEach, describe, expect, it } from "vitest";
import { createTestComponent, dayjs, flushPromises } from "./setup.js";

/**
 * A dual-state field with a 12-hour time picker stores a PM time in every
 * locale.
 *
 * The dual-state paths read the display text back with Day.js's own parser
 * (customParseFormat), which takes a meridiem as PM only when its text first
 * appears at an hour after 12. 5.0.12 makes Day.js "ar" write noon as "م",
 * so "م" first appears at 12 and every "م" read as AM: the round-trip check
 * refused it, syncState() returned false, the backing fields stayed null and
 * Apply did nothing (5.0.11 stored "2026-08-12 12:30:00"). ru "дня" /
 * "вечера", ko "오후", ckb "د.ن" and zh-cn "中午" / "下午" were already read as
 * AM in 5.0.11. Every display string is now read through readLocalizedDate()
 * (resources/js/dayjs-names.js), which reads the meridiem from a per-hour
 * table of what Day.js writes.
 */

afterEach(() => {
    dayjs.locale("en");
});

const config = {
    dualState: true,
    dualStartState: null,
    dualEndState: null,
    storageFormat: "YYYY-MM-DD HH:mm:ss",
    storageTimezone: "UTC",
    timezone: "UTC",
    displayFormat: "DD/MM/YYYY hh:mm A",
    timePicker: true,
    timePicker24: false,
    timePickerIncrement: 1,
};

const time = (hour, minute) => ({ hour: hour % 12 || 12, minute, second: 0, ampm: hour >= 12 ? "PM" : "AM" });

async function pick(locale, [startHour, startMinute], [endHour, endMinute], extra = {}) {
    const { component } = await createTestComponent({ ...config, locale, ...extra });

    component.selection.start = dayjs("2026-08-12").hour(startHour).minute(startMinute);
    component.selection.end = dayjs("2026-08-12").hour(endHour).minute(endMinute);
    component.startTime = time(startHour, startMinute);
    component.endTime = time(endHour, endMinute);
    component.applySelection();
    await flushPromises();

    return component;
}

const LOCALES = ["ar", "ru", "ko", "ckb", "zh_CN", "en"];

describe.each(LOCALES)("Dual state, 12-hour picker, %s", (locale) => {
    it("stores a PM start and a PM end", async () => {
        const component = await pick(locale, [12, 30], [23, 15]);

        expect(component.config.dualStartState).toBe("2026-08-12 12:30:00");
        expect(component.config.dualEndState).toBe("2026-08-12 23:15:59");
        expect(component.config.state).not.toBe("");
    });

    it("stores an AM start and a PM end at noon", async () => {
        const component = await pick(locale, [9, 5], [12, 0]);

        expect(component.config.dualStartState).toBe("2026-08-12 09:05:00");
        expect(component.config.dualEndState).toBe("2026-08-12 12:00:59");
    });

    it("stores a PM start and end in a zone with an offset", async () => {
        const component = await pick(locale, [13, 45], [18, 20], { timezone: "Asia/Riyadh" });

        // Riyadh is UTC+3.
        expect(component.config.dualStartState).toBe("2026-08-12 10:45:00");
        expect(component.config.dualEndState).toBe("2026-08-12 15:20:59");
    });

    it("hydrates a stored PM range and keeps it on re-apply", async () => {
        const { component } = await createTestComponent({
            ...config,
            locale,
            dualStartState: "2026-08-12 12:30:00",
            dualEndState: "2026-08-12 23:15:59",
        });

        expect(component.selection.start?.format("YYYY-MM-DD HH:mm")).toBe("2026-08-12 12:30");
        expect(component.selection.end?.format("YYYY-MM-DD HH:mm")).toBe("2026-08-12 23:15");

        component.selection.end = component.selection.end.minute(10);
        component.endTime = time(23, 10);
        component.applySelection();
        await flushPromises();

        expect(component.config.dualStartState).toBe("2026-08-12 12:30:00");
        expect(component.config.dualEndState).toBe("2026-08-12 23:10:59");
    });
});

describe("Dual state, 12-hour storage format", () => {
    it.each(LOCALES)("reads an English PM written by the server (%s)", async (locale) => {
        const { component } = await createTestComponent({
            ...config,
            locale,
            storageFormat: "YYYY-MM-DD hh:mm A",
            dualStartState: "2026-08-12 01:30 PM",
            dualEndState: "2026-08-12 11:45 PM",
        });

        expect(component.selection.start?.format("YYYY-MM-DD HH:mm")).toBe("2026-08-12 13:30");
        expect(component.selection.end?.format("YYYY-MM-DD HH:mm")).toBe("2026-08-12 23:45");
    });
});

describe("Single state, formats the reader did not cover", () => {
    it.each([
        ["Do MMMM YYYY hh:mm A", "12th أغسطس 2026 12:30 م", "2026-08-12 12:30"],
        ["Do MMMM YYYY hh:mm A", "1st أغسطس 2026 01:05 م", "2026-08-01 13:05"],
        ["Do MMMM YYYY hh:mm A", "12th أغسطس 2026 12:30 ص", "2026-08-12 00:30"],
        ["dd DD/MM/YYYY hh:mm A", "ر 12/08/2026 12:30 م", "2026-08-12 12:30"],
        ["d DD/MM/YYYY hh:mm A", "3 12/08/2026 11:00 م", "2026-08-12 23:00"],
    ])("reads ar '%s' text %s as %s", async (displayFormat, text, expected) => {
        const { component } = await createTestComponent({
            locale: "ar",
            timePicker: true,
            timePicker24: false,
            singleCalendar: true,
            displayFormat,
            initialState: text,
        });

        expect(component.selection.start?.format("YYYY-MM-DD HH:mm")).toBe(expected);
        expect(component.inputValue).toBe(text);
    });

    it("refuses a weekday that does not match the date", async () => {
        const { component } = await createTestComponent({
            locale: "ar",
            timePicker: true,
            singleCalendar: true,
            displayFormat: "d DD/MM/YYYY hh:mm A",
        });

        // 2026-08-12 is a Wednesday (3), not a Thursday (4).
        expect(component.parseDisplayDate("4 12/08/2026 11:00 م", "d DD/MM/YYYY hh:mm A").isValid()).toBe(false);
    });

    it("parses a typed ar 12-hour PM through the mask", async () => {
        const { component } = await createTestComponent({
            locale: "ar",
            timePicker: true,
            timePicker24: false,
            singleCalendar: true,
            allowInput: true,
            displayFormat: "DD/MM/YYYY hh:mm A",
        });

        const options = component.createDateMaskOptions("DD/MM/YYYY hh:mm A");

        expect(dayjs(options.parse("12/08/2026 12:30 م")).format("YYYY-MM-DD HH:mm")).toBe("2026-08-12 12:30");
        expect(dayjs(options.parse("12/08/2026 01:30 م")).format("YYYY-MM-DD HH:mm")).toBe("2026-08-12 13:30");
        // Text the reader cannot read is invalid, not a guess.
        expect(Number.isNaN(options.parse("12/08/2026 01:30 X").getTime())).toBe(true);
    });
});
