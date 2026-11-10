import { afterEach, describe, expect, it } from "vitest";
import { createTestComponent, dayjs, flushPromises } from "./setup.js";

/**
 * Days picked on the calendar of an EMPTY field are written in the page
 * locale, and a dual-state field stores them.
 *
 * viewDate was created (as dayjs()) before init() set the page locale, so
 * every calendar cell carried "en". A 12-hour dual-state field on an ar, ru or
 * ko page wrote "12:00 AM", could not read it back in the page locale and
 * stored nothing; a plain field saved English text while the input showed
 * the page locale.
 */

afterEach(() => {
    dayjs.locale("en");
});

const base = {
    timezone: "UTC",
    timePicker: true,
    timePicker24: false,
    timePickerIncrement: 1,
    displayFormat: "DD/MM/YYYY hh:mm A",
    state: null,
};

function pickTwoCells(component) {
    const cells = component.generateGrid(0).weeks.flat().filter((cell) => cell.isCurrentMonth && !cell.disabled);

    component.handleDayClick(cells[2]);
    component.handleDayClick(cells[5]);
}

const ENGLISH_MERIDIEM = /\b(AM|PM)\b/;

describe.each(["ar", "ru", "ko"])("calendar pick on an empty field, %s page", (locale) => {
    it("stores both dual-state values", async () => {
        const { component } = await createTestComponent({
            ...base,
            locale,
            dualState: true,
            dualStartState: null,
            dualEndState: null,
            storageFormat: "YYYY-MM-DD HH:mm:ss",
            storageTimezone: "UTC",
        });
        await flushPromises();

        pickTwoCells(component);
        component.applySelection();
        await flushPromises();

        expect(component.config.dualStartState).toMatch(/^\d{4}-\d{2}-\d{2} 00:00:00$/);
        expect(component.config.dualEndState).toMatch(/^\d{4}-\d{2}-\d{2} 23:59:59$/);
    });

    it("saves the same text the input shows", async () => {
        const { component } = await createTestComponent({ ...base, locale });
        await flushPromises();

        pickTwoCells(component);
        component.applySelection();
        await flushPromises();

        expect(component.config.state).not.toMatch(ENGLISH_MERIDIEM);
        expect(component.config.state).toBe(component.getDisplayValue());
    });
});
