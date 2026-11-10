import { describe, expect, it } from "vitest";
import {
    clickDay,
    createTestComponent,
    dayjs,
    flushPromises,
} from "./setup.js";

/**
 * A dual-state end written from a display without seconds.
 *
 * "23:59" on a picker without seconds means through the end of that minute:
 * the server default writes 23:59:59 and DateRangeFilter extends a parsed end
 * to endOfMinute(). The browser wrote 23:59:00, so a range saved from the
 * picker dropped the last 59 seconds of its last minute, and a default range
 * re-saved from the browser came back one value different from the server's.
 */
const config = {
    dualState: true,
    dualStartState: null,
    dualEndState: null,
    storageFormat: "YYYY-MM-DD HH:mm:ss",
    storageTimezone: "UTC",
    timezone: "Europe/Berlin",
    displayFormat: "DD.MM.YYYY HH:mm",
    timePicker: true,
    timePicker24: true,
    timePickerIncrement: 1,
};

describe("Dual state seconds without seconds on screen", () => {
    it("writes a whole-day end as :59 and the start as :00", async () => {
        const { component } = await createTestComponent(config);

        clickDay(component, "2026-08-10");
        clickDay(component, "2026-08-12");
        component.applySelection();
        await flushPromises();

        expect(component.inputValue).toBe("10.08.2026 00:00 - 12.08.2026 23:59");
        // Berlin is UTC+2 in August.
        expect(component.config.dualStartState).toBe("2026-08-09 22:00:00");
        expect(component.config.dualEndState).toBe("2026-08-12 21:59:59");
    });

    it("writes a picked To minute through the end of that minute", async () => {
        const { component } = await createTestComponent(config);

        component.selection.start = dayjs("2026-06-15 09:13");
        component.selection.end = dayjs("2026-06-16 17:47");
        component.startTime = { hour: 9, minute: 13, second: 0, ampm: "AM" };
        component.endTime = { hour: 17, minute: 47, second: 0, ampm: "PM" };
        component.applySelection();
        await flushPromises();

        expect(component.config.dualStartState).toBe("2026-06-15 07:13:00");
        expect(component.config.dualEndState).toBe("2026-06-16 15:47:59");
    });

    it("hydrates a stored :59 end as that minute and keeps it on re-apply", async () => {
        const { component, watchers } = await createTestComponent({
            ...config,
            dualStartState: "2026-06-08 22:00:00",
            dualEndState: "2026-06-09 21:59:59",
        });

        expect(component.inputValue).toBe("09.06.2026 00:00 - 09.06.2026 23:59");
        expect(component.endTime).toMatchObject({ hour: 23, minute: 59 });

        component.applySelection();
        await flushPromises();
        watchers.get("config.dualStartState")?.();
        watchers.get("config.dualEndState")?.();
        await flushPromises();

        expect(component.config.dualStartState).toBe("2026-06-08 22:00:00");
        expect(component.config.dualEndState).toBe("2026-06-09 21:59:59");
        expect(component.inputValue).toBe("09.06.2026 00:00 - 09.06.2026 23:59");
    });

    it("keeps a stored :00 end exactly as it was when nothing changed", async () => {
        const { component } = await createTestComponent({
            ...config,
            dualStartState: "2026-06-10 08:17:00",
            dualEndState: "2026-06-12 16:43:00",
        });

        component.applySelection();
        await flushPromises();

        expect(component.config.dualEndState).toBe("2026-06-12 16:43:00");
    });

    it("keeps explicit seconds exact when the picker shows them", async () => {
        const { component } = await createTestComponent({
            ...config,
            displayFormat: "DD.MM.YYYY HH:mm:ss",
            timePickerSecond: true,
        });

        component.selection.start = dayjs("2026-06-15 09:13:27");
        component.selection.end = dayjs("2026-06-15 17:47:00");
        component.startTime = { hour: 9, minute: 13, second: 27, ampm: "AM" };
        component.endTime = { hour: 17, minute: 47, second: 0, ampm: "PM" };
        component.applySelection();
        await flushPromises();

        expect(component.config.dualStartState).toBe("2026-06-15 07:13:27");
        expect(component.config.dualEndState).toBe("2026-06-15 15:47:00");
    });

    it("leaves a storage format without seconds unchanged", async () => {
        const { component } = await createTestComponent({
            ...config,
            storageFormat: "YYYY-MM-DD HH:mm",
        });

        clickDay(component, "2026-08-10");
        clickDay(component, "2026-08-12");
        component.applySelection();
        await flushPromises();

        expect(component.config.dualStartState).toBe("2026-08-09 22:00");
        expect(component.config.dualEndState).toBe("2026-08-12 21:59");
    });

    it("leaves date-only storage unchanged", async () => {
        const { component } = await createTestComponent({
            ...config,
            storageFormat: "YYYY-MM-DD",
            displayFormat: "DD.MM.YYYY",
            timePicker: false,
        });

        clickDay(component, "2026-08-10");
        clickDay(component, "2026-08-12");
        component.applySelection();
        await flushPromises();

        expect(component.config.dualStartState).toBe("2026-08-10");
        expect(component.config.dualEndState).toBe("2026-08-12");
    });

    it("keeps a start-only state and writes the end at :59 once completed", async () => {
        const { component } = await createTestComponent({
            ...config,
            dualStartState: "2026-06-10 08:17:00",
            dualEndState: null,
        });

        component.open = true;
        component.applySelection();
        await flushPromises();

        expect(component.config.dualStartState).toBe("2026-06-10 08:17:00");
        expect(component.config.dualEndState).toBeNull();

        clickDay(component, "2026-06-12");
        component.applySelection();
        await flushPromises();

        expect(component.config.dualStartState).toBe("2026-06-10 08:17:00");
        expect(component.config.dualEndState).toMatch(/^2026-06-12 \d\d:\d\d:59$/);
    });

    it("does not write :59 into a 12-hour storage format's start", async () => {
        const { component } = await createTestComponent({
            ...config,
            storageFormat: "YYYY-MM-DD hh:mm:ss A",
        });

        clickDay(component, "2026-08-10");
        clickDay(component, "2026-08-12");
        component.applySelection();
        await flushPromises();

        expect(component.config.dualStartState).toBe("2026-08-09 10:00:00 PM");
        expect(component.config.dualEndState).toBe("2026-08-12 09:59:59 PM");
    });
});
