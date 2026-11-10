import { afterEach, describe, expect, it } from "vitest";
import { createTestComponent, dayjs, flushPromises } from "./setup.js";

/**
 * The input and the footer preview are written in the page locale however
 * the range was picked.
 *
 * In the 5.0.12 candidate, clicking calendar days on an Arabic 12-hour picker
 * wrote "12:00 AM - 11:59 PM" while a preset wrote "ص / م", because dates
 * read back through the English-name reader carried the "en" locale.
 */

afterEach(() => {
    dayjs.locale("en");
});

const config = {
    locale: "ar",
    timezone: "Asia/Riyadh",
    timePicker: true,
    timePicker24: false,
    timePickerIncrement: 1,
    displayFormat: "DD/MM/YYYY hh:mm A",
    autoApply: false,
};

function clickGridDays(component, count) {
    // Real cells from the month the picker opened on (today's month).
    const days = component.generateGrid(0).weeks.flat().filter((cell) => cell.isCurrentMonth && !cell.disabled);

    component.handleDayClick(days[2]);
    component.handleDayClick(days[2 + count]);
}

describe("Arabic 12-hour picker, days picked on the calendar", () => {
    it.each([
        ["with an empty state", null],
        ["after a stored state was read back", "01/11/2026 09:00 ص - 02/11/2026 05:00 م"],
    ])("writes the input and the preview in Arabic %s", async (_label, state) => {
        const { component } = await createTestComponent({ ...config, state });
        await flushPromises();

        component.openPicker?.();
        await flushPromises();
        clickGridDays(component, 3);
        await flushPromises();

        const preview = component.formatSelectionPreview(component.selection.end, component.endTime);

        expect(component.getDisplayValue()).toMatch(/ص.*م$/u);
        expect(component.getDisplayValue()).not.toMatch(/AM|PM/);
        expect(preview).not.toMatch(/AM|PM/);
    });
});
