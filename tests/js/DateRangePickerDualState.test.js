import { describe, expect, it, vi } from "vitest";
import {
    clickDay,
    createTestComponent,
    dayjs,
    flushPromises,
} from "./setup.js";

const dualStateConfig = {
    dualState: true,
    dualStartState: "2026-06-10 08:17:00",
    dualEndState: "2026-06-12 16:43:00",
    storageFormat: "YYYY-MM-DD HH:mm:ss",
    storageTimezone: "UTC",
    timezone: "Europe/Berlin",
    displayFormat: "DD.MM.YYYY HH:mm",
    timePicker: true,
    timePicker24: true,
    timePickerIncrement: 1,
};

const dateOnlyConfig = {
    dualState: true,
    dualStartState: "2026-08-04",
    dualEndState: "2026-08-05",
    storageFormat: "YYYY-MM-DD",
    storageTimezone: "UTC",
    timezone: "Europe/Berlin",
    displayFormat: "DD.MM.YYYY",
    timePicker: false,
};

describe("Dual State Mode", () => {
    it("keeps date-only selections zoneless in a positive-offset timezone", async () => {
        const { component } = await createTestComponent(dateOnlyConfig);

        expect(component.inputValue).toBe("04.08.2026 - 05.08.2026");

        component.selection.start = dayjs("2026-08-10");
        component.selection.end = dayjs("2026-08-12");
        component.applySelection();
        await flushPromises();

        expect(component.config.dualStartState).toBe("2026-08-10");
        expect(component.config.dualEndState).toBe("2026-08-12");
    });

    it("keeps date-only values on the same calendar day in a negative-offset timezone", async () => {
        const { component } = await createTestComponent({
            ...dateOnlyConfig,
            timezone: "America/Los_Angeles",
        });

        expect(component.inputValue).toBe("04.08.2026 - 05.08.2026");

        component.selection.start = dayjs("2026-01-01");
        component.selection.end = dayjs("2026-01-02");
        component.applySelection();
        await flushPromises();

        expect(component.config.dualStartState).toBe("2026-01-01");
        expect(component.config.dualEndState).toBe("2026-01-02");
    });

    it("keeps changed date-only values stable on DST transition days", async () => {
        const { component } = await createTestComponent(dateOnlyConfig);

        component.selection.start = dayjs("2025-03-30");
        component.selection.end = dayjs("2025-10-26");
        component.applySelection();
        await flushPromises();

        expect(component.config.dualStartState).toBe("2025-03-30");
        expect(component.config.dualEndState).toBe("2025-10-26");
    });

    it("writes a same-day date-only range without shifting the date", async () => {
        const { component } = await createTestComponent(dateOnlyConfig);

        component.selection.start = dayjs("2026-08-10");
        component.selection.end = dayjs("2026-08-10");
        component.applySelection();
        await flushPromises();

        expect(component.config.dualStartState).toBe("2026-08-10");
        expect(component.config.dualEndState).toBe("2026-08-10");
    });

    it("ignores time tokens inside storage format literals", async () => {
        const { component } = await createTestComponent(dateOnlyConfig);

        expect(component.formatHasTimeTokens("YYYY-MM-DD [HH:mm:ss]")).toBe(
            false,
        );
        expect(component.formatHasTimeTokens("YYYY-MM-DD HH:mm:ss")).toBe(true);
    });

    it("hydrates separate backing values in the configured display timezone", async () => {
        const { component } = await createTestComponent(dualStateConfig);

        expect(component.inputValue).toBe(
            "10.06.2026 10:17 - 12.06.2026 18:43",
        );
        expect(component.selection.start.format("YYYY-MM-DD HH:mm")).toBe(
            "2026-06-10 10:17",
        );
        expect(component.selection.end.format("YYYY-MM-DD HH:mm")).toBe(
            "2026-06-12 18:43",
        );
    });

    it("writes a changed range back to separate backing values in storage timezone", async () => {
        const { component } = await createTestComponent(dualStateConfig);

        component.selection.start = dayjs("2026-06-15 09:13");
        component.selection.end = dayjs("2026-06-16 17:47");
        component.startTime = { hour: 9, minute: 13, second: 0, ampm: "AM" };
        component.endTime = { hour: 17, minute: 47, second: 0, ampm: "PM" };

        component.applySelection();
        await flushPromises();

        expect(component.config.dualStartState).toBe("2026-06-15 07:13:00");
        expect(component.config.dualEndState).toBe("2026-06-16 15:47:00");
        expect(component.config.state).toBe(
            "15.06.2026 09:13 - 16.06.2026 17:47",
        );
    });

    it("keeps local writes guarded while Alpine delivers their watchers", async () => {
        vi.useFakeTimers();

        try {
            const { component, watchers } = await createTestComponent({
                ...dualStateConfig,
                dualStartState: null,
                dualEndState: null,
            });
            const parseDualState = vi.spyOn(component, "parseDualState");

            clickDay(component, "2026-08-10");
            clickDay(component, "2026-08-12");
            component.applySelection();
            await Promise.resolve();

            watchers.get("config.dualStartState")();
            watchers.get("config.dualEndState")();
            await Promise.resolve();

            expect(parseDualState).not.toHaveBeenCalled();
            expect(component.inputValue).toBe(
                "10.08.2026 00:00 - 12.08.2026 23:59",
            );

            await vi.runAllTimersAsync();
            expect(component.isSyncing).toBe(false);
        } finally {
            vi.useRealTimers();
        }
    });

    it("preserves unchanged ambiguous DST instants exactly", async () => {
        const { component } = await createTestComponent({
            ...dualStateConfig,
            dualStartState: "2025-10-26 01:30:00",
            dualEndState: "2025-10-26 02:15:00",
        });

        expect(component.inputValue).toBe(
            "26.10.2025 02:30 - 26.10.2025 03:15",
        );

        component.applySelection();
        await flushPromises();

        expect(component.config.dualStartState).toBe("2025-10-26 01:30:00");
        expect(component.config.dualEndState).toBe("2025-10-26 02:15:00");
    });

    it("handles same-day values with seconds and odd minutes", async () => {
        const { component } = await createTestComponent({
            ...dualStateConfig,
            displayFormat: "DD.MM.YYYY HH:mm:ss",
            timePickerSecond: true,
        });

        component.selection.start = dayjs("2026-06-15 09:13:27");
        component.selection.end = dayjs("2026-06-15 17:47:51");
        component.startTime = { hour: 9, minute: 13, second: 27, ampm: "AM" };
        component.endTime = { hour: 17, minute: 47, second: 51, ampm: "PM" };

        component.applySelection();
        await flushPromises();

        expect(component.config.dualStartState).toBe("2026-06-15 07:13:27");
        expect(component.config.dualEndState).toBe("2026-06-15 15:47:51");
    });

    it("hydrates ranges across a local day boundary", async () => {
        const { component } = await createTestComponent({
            ...dualStateConfig,
            dualStartState: "2026-01-01 23:47:00",
            dualEndState: "2026-01-02 01:13:00",
        });

        expect(component.inputValue).toBe(
            "02.01.2026 00:47 - 02.01.2026 02:13",
        );
    });

    it("uses the correct offsets across the spring DST transition", async () => {
        const { component } = await createTestComponent({
            ...dualStateConfig,
            dualStartState: "2025-03-30 00:30:00",
            dualEndState: "2025-03-30 01:30:00",
        });

        expect(component.inputValue).toBe(
            "30.03.2025 01:30 - 30.03.2025 03:30",
        );

        component.applySelection();
        await flushPromises();

        expect(component.config.dualStartState).toBe("2025-03-30 00:30:00");
        expect(component.config.dualEndState).toBe("2025-03-30 01:30:00");
    });

    it("clears both backing values", async () => {
        const { component } = await createTestComponent(dualStateConfig);

        component.clear();
        await flushPromises();

        expect(component.config.dualStartState).toBeNull();
        expect(component.config.dualEndState).toBeNull();
        expect(component.config.state).toBe("");
    });

    it("preserves a start-only state until an end is selected", async () => {
        const { component } = await createTestComponent({
            ...dualStateConfig,
            dualEndState: null,
        });

        expect(component.dualStateStatus).toBe("incomplete");
        expect(component.canApplySelection).toBe(false);
        expect(component.selection.start.format("YYYY-MM-DD HH:mm")).toBe(
            "2026-06-10 10:17",
        );

        component.open = true;
        component.applySelection();
        await flushPromises();

        expect(component.config.dualStartState).toBe("2026-06-10 08:17:00");
        expect(component.config.dualEndState).toBeNull();
        expect(component.open).toBe(true);

        clickDay(component, "2026-06-12");

        expect(component.dualStateStatus).toBe("complete");
        expect(component.canApplySelection).toBe(true);

        component.applySelection();
        await flushPromises();

        expect(component.config.dualStartState).toBe("2026-06-10 08:17:00");
        expect(component.config.dualEndState).not.toBeNull();
    });

    it("completes an end-only state with a chronologically ordered start", async () => {
        const { component } = await createTestComponent({
            ...dateOnlyConfig,
            dualStartState: null,
            dualEndState: "2026-08-05",
        });

        expect(component.dualStateStatus).toBe("incomplete");
        expect(component.canApplySelection).toBe(false);

        clickDay(component, "2026-08-04");

        expect(component.selection.start.format("YYYY-MM-DD")).toBe(
            "2026-08-04",
        );
        expect(component.selection.end.format("YYYY-MM-DD")).toBe("2026-08-05");
        expect(component.canApplySelection).toBe(true);

        component.applySelection();
        await flushPromises();

        expect(component.config.dualStartState).toBe("2026-08-04");
        expect(component.config.dualEndState).toBe("2026-08-05");
    });

    it("opens an end-only range on the existing end calendar", async () => {
        const { component } = await createTestComponent({
            ...dateOnlyConfig,
            dualStartState: null,
            dualEndState: "2027-11-05",
        });

        expect(component.viewDate.format("YYYY-MM-DD")).toBe("2027-11-05");
        expect(component.selection.end.format("YYYY-MM-DD")).toBe("2027-11-05");
    });

    it("sorts an end-only state when the selected start falls after it", async () => {
        const { component } = await createTestComponent({
            ...dateOnlyConfig,
            dualStartState: null,
            dualEndState: "2026-08-05",
        });

        clickDay(component, "2026-08-08");

        expect(component.selection.start.format("YYYY-MM-DD")).toBe(
            "2026-08-05",
        );
        expect(component.selection.end.format("YYYY-MM-DD")).toBe("2026-08-08");
    });

    it("completes end-only month and year ranges", async () => {
        const { component: monthPicker } = await createTestComponent({
            ...dateOnlyConfig,
            pickerType: "month",
            dualStartState: null,
            dualEndState: "2026-08-31",
            displayFormat: "MMMM YYYY",
        });

        monthPicker.handleMonthClick({
            date: dayjs("2026-06-01"),
            disabled: false,
        });

        expect(monthPicker.selection.start.format("YYYY-MM-DD")).toBe(
            "2026-06-01",
        );
        expect(monthPicker.selection.end.format("YYYY-MM-DD")).toBe(
            "2026-08-31",
        );

        const { component: yearPicker } = await createTestComponent({
            ...dateOnlyConfig,
            pickerType: "year",
            dualStartState: null,
            dualEndState: "2026-12-31",
            displayFormat: "YYYY",
        });

        yearPicker.handleYearClick({
            date: dayjs("2024-01-01"),
            disabled: false,
        });

        expect(yearPicker.selection.start.format("YYYY-MM-DD")).toBe(
            "2024-01-01",
        );
        expect(yearPicker.selection.end.format("YYYY-MM-DD")).toBe(
            "2026-12-31",
        );
    });

    it("clears both values from an incomplete state", async () => {
        const { component } = await createTestComponent({
            ...dualStateConfig,
            dualEndState: null,
        });

        component.clear();
        await flushPromises();

        expect(component.dualStateStatus).toBe("empty");
        expect(component.config.dualStartState).toBeNull();
        expect(component.config.dualEndState).toBeNull();
    });

    it("reacts to external updates of both backing values", async () => {
        const { component, watchers } =
            await createTestComponent(dualStateConfig);

        component.config.dualStartState = "2026-12-24 22:17:00";
        component.config.dualEndState = "2026-12-25 11:43:00";
        watchers.get("config.dualStartState")();
        watchers.get("config.dualEndState")();
        await flushPromises();

        expect(component.inputValue).toBe(
            "24.12.2026 23:17 - 25.12.2026 12:43",
        );
    });

    it("preserves raw values when an external update becomes incomplete", async () => {
        const { component, watchers } =
            await createTestComponent(dualStateConfig);

        component.config.dualEndState = null;
        watchers.get("config.dualEndState")();
        await flushPromises();

        expect(component.dualStateStatus).toBe("incomplete");
        expect(component.canApplySelection).toBe(false);
        expect(component.config.dualStartState).toBe("2026-06-10 08:17:00");
        expect(component.config.dualEndState).toBeNull();

        expect(component.syncState()).toBe(false);
        expect(component.config.dualStartState).toBe("2026-06-10 08:17:00");
        expect(component.config.dualEndState).toBeNull();
    });

    it("restores the backing range when an uncommitted selection is cancelled", async () => {
        const { component } = await createTestComponent(dualStateConfig);

        clickDay(component, "2026-07-01");
        clickDay(component, "2026-07-03");
        component.cancel();

        expect(component.inputValue).toBe(
            "10.06.2026 10:17 - 12.06.2026 18:43",
        );
        expect(component.config.dualStartState).toBe("2026-06-10 08:17:00");
        expect(component.config.dualEndState).toBe("2026-06-12 16:43:00");
    });

    it("does not overwrite backing values with a nonexistent local DST time", async () => {
        const { component } = await createTestComponent(dualStateConfig);

        component.open = true;
        component.selection.start = dayjs.utc("2025-03-30 02:30");
        component.selection.end = dayjs.utc("2025-03-30 04:00");
        component.startTime = { hour: 2, minute: 30, second: 0, ampm: "AM" };
        component.endTime = { hour: 4, minute: 0, second: 0, ampm: "AM" };

        component.applySelection();

        expect(component.config.dualStartState).toBe("2026-06-10 08:17:00");
        expect(component.config.dualEndState).toBe("2026-06-12 16:43:00");
        expect(component.open).toBe(true);
    });

    it("keeps the existing single-state behavior unchanged", async () => {
        const { component } = await createTestComponent({
            initialState: "01/01/2026 - 15/01/2026",
        });

        clickDay(component, "2026-02-01");
        clickDay(component, "2026-02-03");
        component.applySelection();
        await flushPromises();

        expect(component.config.state).toBe("01/02/2026 - 03/02/2026");
        expect(component.config.dualStartState).toBeNull();
        expect(component.config.dualEndState).toBeNull();
    });
});
