import { afterEach, describe, expect, it } from "vitest";
import { createTestComponent, dayjs, flushPromises } from "./setup.js";

/**
 * Dual-state backing values are written in English whatever the page locale.
 *
 * The backing fields hold storage values that the server, Carbon and the
 * database read back. Until 5.0.12 a storage format with names or a
 * meridiem ("A", "MMMM") was written in the page locale ("م", "نوفمبر"),
 * which Carbon cannot parse. Values written that way by an older version
 * still read back.
 */

afterEach(() => {
    dayjs.locale("en");
});

const base = {
    dualState: true,
    dualStartState: null,
    dualEndState: null,
    storageTimezone: "UTC",
    timezone: "UTC",
    timePicker: true,
    timePicker24: true,
    timePickerIncrement: 1,
    displayFormat: "DD/MM/YYYY HH:mm",
};

async function pick(locale, extra) {
    const { component } = await createTestComponent({ ...base, locale, ...extra });

    component.selection.start = dayjs("2026-11-12").hour(9).minute(30);
    component.selection.end = dayjs("2026-11-14").hour(17).minute(45);
    component.startTime = { hour: 9, minute: 30, second: 0, ampm: "AM" };
    component.endTime = { hour: 17, minute: 45, second: 0, ampm: "PM" };
    component.applySelection();
    await flushPromises();

    return component;
}

describe.each(["ar", "ru", "en"])("English storage values, %s page", (locale) => {
    it("writes the meridiem of a storage format in English", async () => {
        const component = await pick(locale, { storageFormat: "YYYY-MM-DD hh:mm A" });

        expect(component.config.dualStartState).toBe("2026-11-12 09:30 AM");
        expect(component.config.dualEndState).toBe("2026-11-14 05:45 PM");
    });

    it("writes month names of a date-only storage format in English", async () => {
        const component = await pick(locale, {
            storageFormat: "DD MMMM YYYY",
            timePicker: false,
            displayFormat: "DD/MM/YYYY",
        });

        expect(component.config.dualStartState).toBe("12 November 2026");
        expect(component.config.dualEndState).toBe("14 November 2026");
    });
});

describe("Values stored in the page locale by an older version", () => {
    it("still read back on an Arabic page", async () => {
        const { component } = await createTestComponent({
            ...base,
            locale: "ar",
            storageFormat: "DD MMMM YYYY",
            timePicker: false,
            displayFormat: "DD/MM/YYYY",
            dualStartState: "12 نوفمبر 2026",
            dualEndState: "14 نوفمبر 2026",
        });
        await flushPromises();

        expect(component.selection.start?.format("YYYY-MM-DD")).toBe("2026-11-12");
        expect(component.selection.end?.format("YYYY-MM-DD")).toBe("2026-11-14");
    });
});
