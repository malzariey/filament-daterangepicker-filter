import { describe, it, expect } from 'vitest';
import { clickDay, createTestComponent, dayjs, flushPromises } from './setup.js';

// The time part of minDate() / maxDate() was not enforced: with minDate
// today 09:00, maxDate +3 days 17:00 and timePicker(), clicking the two
// bound days stored "07/11/2026 00:00 - 13/11/2026 23:59". Every check
// (isDisabled, constrainedPresetBounds, the arrows) compared whole days.
//
// Rule (day picker with timePicker() only): a start or end on minDate's day
// is never earlier than minDate's time, and one on maxDate's day never later
// than maxDate's time, compared at the picker's unit (minute, or second with
// timePickerSecond). A bound at exactly 00:00:00 (what today() and a date
// cast send) or without a time keeps the whole-day behaviour of 5.0.11.

const bounds = {
    timePicker: true,
    timePicker24: true,
    displayFormat: 'DD/MM/YYYY HH:mm',
    minDate: '2026-11-07 09:00:00',
    maxDate: '2026-11-13 17:00:00',
};

const time = (row) => `${String(row.hour).padStart(2, '0')}:${String(row.minute).padStart(2, '0')}`;

describe('minDate / maxDate times (24h)', () => {
    it('stores the bound times when both bound days are clicked (the report)', async () => {
        const { component } = await createTestComponent(bounds);

        clickDay(component, '2026-11-07');
        clickDay(component, '2026-11-13');
        component.applySelection();
        await flushPromises();

        expect(component.config.state).toBe('07/11/2026 09:00 - 13/11/2026 17:00');
    });

    it('leaves the times alone on days between the bounds', async () => {
        const { component } = await createTestComponent(bounds);

        clickDay(component, '2026-11-08');
        clickDay(component, '2026-11-12');
        component.applySelection();
        await flushPromises();

        expect(component.config.state).toBe('08/11/2026 00:00 - 12/11/2026 23:59');
    });

    it('disables the hours and minutes before minDate on the start row', async () => {
        const { component } = await createTestComponent(bounds);

        clickDay(component, '2026-11-07');

        expect(component.isTimeOptionDisabled(true, 'hour', 8)).toBe(true);
        expect(component.isTimeOptionDisabled(true, 'hour', 9)).toBe(false);
        expect(component.isTimeOptionDisabled(true, 'minute', 0)).toBe(false);

        component.startTime = { ...component.startTime, hour: 10 };
        expect(component.isTimeOptionDisabled(true, 'minute', 0)).toBe(false);
    });

    it('disables the hours and minutes after maxDate on the end row', async () => {
        const { component } = await createTestComponent(bounds);

        clickDay(component, '2026-11-08');
        clickDay(component, '2026-11-13');

        expect(time(component.endTime)).toBe('17:00');
        expect(component.isTimeOptionDisabled(false, 'hour', 18)).toBe(true);
        expect(component.isTimeOptionDisabled(false, 'hour', 17)).toBe(false);
        expect(component.isTimeOptionDisabled(false, 'minute', 1)).toBe(true);
        expect(component.isTimeOptionDisabled(false, 'minute', 0)).toBe(false);

        component.endTime = { ...component.endTime, hour: 16 };
        expect(component.isTimeOptionDisabled(false, 'minute', 59)).toBe(false);
    });

    it('disables nothing on a day away from the bounds', async () => {
        const { component } = await createTestComponent(bounds);

        clickDay(component, '2026-11-08');
        clickDay(component, '2026-11-12');

        expect(component.isTimeOptionDisabled(true, 'hour', 0)).toBe(false);
        expect(component.isTimeOptionDisabled(false, 'hour', 23)).toBe(false);
    });

    it('clamps a time changed below minDate back to it', async () => {
        const { component } = await createTestComponent(bounds);

        clickDay(component, '2026-11-07');
        clickDay(component, '2026-11-10');

        component.startTime = { ...component.startTime, hour: 8, minute: 30 };
        component.handleTimeChange(true);

        expect(time(component.startTime)).toBe('09:00');
        expect(component.selection.start.format('YYYY-MM-DD HH:mm')).toBe('2026-11-07 09:00');
    });

    it('clamps a time changed past maxDate back to it', async () => {
        const { component } = await createTestComponent({ ...bounds, maxDate: '2026-11-13 17:30:00' });

        clickDay(component, '2026-11-10');
        clickDay(component, '2026-11-13');
        component.endTime = { ...component.endTime, hour: 17, minute: 45 };
        component.handleTimeChange(false);

        expect(time(component.endTime)).toBe('17:30');

        component.applySelection();
        await flushPromises();
        expect(component.config.state).toBe('10/11/2026 00:00 - 13/11/2026 17:30');
    });

    it('holds both instants inside the bounds when the start is on maxDate\'s day', async () => {
        const { component } = await createTestComponent(bounds);

        clickDay(component, '2026-11-13');
        component.startTime = { ...component.startTime, hour: 20 };
        component.handleTimeChange(true);

        expect(time(component.startTime)).toBe('17:00');
    });

    it('rejects a typed range outside the bound times', async () => {
        const { component } = await createTestComponent({ ...bounds, allowInput: true });

        expect(component.parseManualInput('07/11/2026 08:59 - 10/11/2026 10:00').status).toBe('invalid');
        expect(component.parseManualInput('08/11/2026 10:00 - 13/11/2026 17:01').status).toBe('invalid');
        expect(component.parseManualInput('07/11/2026 09:00 - 13/11/2026 17:00').status).toBe('valid');
    });

    it('rejects a typed single date outside the bound times', async () => {
        const { component } = await createTestComponent({ ...bounds, allowInput: true, singleCalendar: true });

        expect(component.parseManualInput('07/11/2026 08:00').status).toBe('invalid');
        expect(component.parseManualInput('13/11/2026 18:00').status).toBe('invalid');
        expect(component.parseManualInput('07/11/2026 09:00').status).toBe('valid');
    });

    it('clamps a single calendar\'s time on the bound day', async () => {
        const { component } = await createTestComponent({ ...bounds, singleCalendar: true, autoApply: true });

        clickDay(component, '2026-11-07');
        await flushPromises();

        expect(component.config.state).toBe('07/11/2026 09:00');
    });

    it('does not clamp a default value (shown as the server sent it)', async () => {
        const { component } = await createTestComponent({
            ...bounds,
            initialState: '07/11/2026 00:00 - 13/11/2026 23:59',
        });

        expect(component.inputValue).toBe('07/11/2026 00:00 - 13/11/2026 23:59');
        expect(time(component.startTime)).toBe('00:00');
        expect(time(component.endTime)).toBe('23:59');
    });
});

describe('presets clamp to the exact bound time', () => {
    const ranges = {
        'First day': ['2026-11-07', '2026-11-07'],
        Week: ['2026-11-01', '2026-11-30'],
        'Early on the first day': ['2026-11-07 06:00:00', '2026-11-07 08:00:00'],
    };

    it('starts a date-only preset at minDate\'s time and ends it at maxDate\'s', async () => {
        const { component } = await createTestComponent({ ...bounds, ranges });

        component.selectPreset('Week');

        expect(component.selection.start.format('YYYY-MM-DD HH:mm')).toBe('2026-11-07 09:00');
        expect(component.selection.end.format('YYYY-MM-DD HH:mm')).toBe('2026-11-13 17:00');
        expect(time(component.startTime)).toBe('09:00');
        expect(time(component.endTime)).toBe('17:00');
        expect(component.isActiveRange('Week')).toBe(true);
    });

    it('clamps a preset on minDate\'s day', async () => {
        const { component } = await createTestComponent({ ...bounds, ranges });

        component.selectPreset('First day');

        expect(component.selection.start.format('YYYY-MM-DD HH:mm')).toBe('2026-11-07 09:00');
        expect(component.selection.end.format('YYYY-MM-DD HH:mm')).toBe('2026-11-07 23:59');
    });

    it('disables a preset that ends before minDate\'s time', async () => {
        const { component } = await createTestComponent({ ...bounds, ranges });

        expect(component.isPresetDisabled('Early on the first day')).toBe(true);
        expect(component.isPresetDisabled('First day')).toBe(false);
    });
});

describe('12-hour picker', () => {
    const twelve = {
        ...bounds,
        timePicker24: false,
        displayFormat: 'DD/MM/YYYY hh:mm A',
        minDate: '2026-11-07 13:30:00',
        maxDate: '2026-11-13 10:15:00',
    };

    it('disables AM and the PM hours before 1:30 PM on minDate\'s day', async () => {
        const { component } = await createTestComponent(twelve);

        clickDay(component, '2026-11-07');

        expect(component.startTime).toMatchObject({ hour: 1, minute: 30, ampm: 'PM' });
        expect(component.isTimeOptionDisabled(true, 'ampm', 'AM')).toBe(true);
        expect(component.isTimeOptionDisabled(true, 'ampm', 'PM')).toBe(false);
        expect(component.isTimeOptionDisabled(true, 'hour', 12)).toBe(true);
        expect(component.isTimeOptionDisabled(true, 'hour', 1)).toBe(false);
        expect(component.isTimeOptionDisabled(true, 'minute', 29)).toBe(true);
        expect(component.isTimeOptionDisabled(true, 'minute', 30)).toBe(false);
    });

    it('disables PM and the AM hours after 10:15 AM on maxDate\'s day', async () => {
        const { component } = await createTestComponent(twelve);

        clickDay(component, '2026-11-08');
        clickDay(component, '2026-11-13');

        expect(component.endTime).toMatchObject({ hour: 10, minute: 15, ampm: 'AM' });
        expect(component.isTimeOptionDisabled(false, 'ampm', 'PM')).toBe(true);
        expect(component.isTimeOptionDisabled(false, 'hour', 11)).toBe(true);
        expect(component.isTimeOptionDisabled(false, 'hour', 12)).toBe(false); // 12 AM
        expect(component.isTimeOptionDisabled(false, 'hour', 10)).toBe(false);
    });

    it('clamps a switch to PM past maxDate', async () => {
        const { component } = await createTestComponent(twelve);

        clickDay(component, '2026-11-08');
        clickDay(component, '2026-11-13');
        component.endTime = { ...component.endTime, hour: 9, minute: 0, ampm: 'PM' };
        component.handleTimeChange(false);

        expect(component.endTime).toMatchObject({ hour: 10, minute: 15, ampm: 'AM' });
    });

    it('stores the bound times', async () => {
        const { component } = await createTestComponent(twelve);

        clickDay(component, '2026-11-07');
        clickDay(component, '2026-11-13');
        component.applySelection();
        await flushPromises();

        expect(component.config.state).toBe('07/11/2026 01:30 PM - 13/11/2026 10:15 AM');
    });
});

describe('seconds and increments', () => {
    it('compares seconds with timePickerSecond', async () => {
        const { component } = await createTestComponent({
            ...bounds,
            timePickerSecond: true,
            displayFormat: 'DD/MM/YYYY HH:mm:ss',
            minDate: '2026-11-07 09:00:30',
        });

        clickDay(component, '2026-11-07');

        expect(component.startTime).toMatchObject({ hour: 9, minute: 0, second: 30 });
        expect(component.isTimeOptionDisabled(true, 'second', 29)).toBe(true);
        expect(component.isTimeOptionDisabled(true, 'second', 30)).toBe(false);
        expect(component.isTimeOptionDisabled(true, 'minute', 0)).toBe(false);
    });

    it('compares minutes without seconds on screen', async () => {
        const { component } = await createTestComponent({ ...bounds, minDate: '2026-11-07 09:00:30' });

        clickDay(component, '2026-11-07');

        expect(time(component.startTime)).toBe('09:00');
        expect(component.isTimeOptionDisabled(true, 'minute', 0)).toBe(false);
    });

    it('clamps to an off-increment bound and keeps it in the minute select', async () => {
        const { component } = await createTestComponent({
            ...bounds,
            timePickerIncrement: 15,
            minDate: '2026-11-07 09:10:00',
        });

        clickDay(component, '2026-11-07');

        expect(time(component.startTime)).toBe('09:10');
        expect(component.minuteOptions.map((m) => m.value)).toContain(10);
        expect(component.isTimeOptionDisabled(true, 'minute', 0)).toBe(true);
        expect(component.isTimeOptionDisabled(true, 'minute', 15)).toBe(false);
    });

    it('ignores a time row that is not a time (readTime)', async () => {
        const { component } = await createTestComponent(bounds);

        clickDay(component, '2026-11-07');
        component.startTime = { ...component.startTime, hour: '' };
        component.handleTimeChange(true);

        expect(component.startTime.hour).toBe('');
        expect(component.isTimeOptionDisabled(true, 'minute', 0)).toBe(false);
    });
});

describe('dual state', () => {
    it('stores the bound times converted to the storage timezone', async () => {
        const { component } = await createTestComponent({
            ...bounds,
            dualState: true,
            timezone: 'Asia/Riyadh',
            storageTimezone: 'UTC',
            storageFormat: 'YYYY-MM-DD HH:mm:ss',
        });

        clickDay(component, '2026-11-07');
        clickDay(component, '2026-11-13');
        component.applySelection();
        await flushPromises();

        expect(component.inputValue).toBe('07/11/2026 09:00 - 13/11/2026 17:00');
        expect(component.config.dualStartState).toBe('2026-11-07 06:00:00');
        // Without seconds on screen a dual end runs through its minute (5.0.11).
        expect(component.config.dualEndState).toBe('2026-11-13 14:00:59');
    });
});

describe('bounds without a time keep the whole-day behaviour of 5.0.11', () => {
    it.each([
        ['date-only strings', '2026-11-07', '2026-11-13'],
        ['midnight (today(), date casts)', '2026-11-07 00:00:00', '2026-11-13 00:00:00'],
    ])('%s', async (_, minDate, maxDate) => {
        const { component } = await createTestComponent({ ...bounds, minDate, maxDate, allowInput: true });

        clickDay(component, '2026-11-07');
        clickDay(component, '2026-11-13');

        expect(component.isTimeOptionDisabled(false, 'hour', 23)).toBe(false);
        component.applySelection();
        await flushPromises();
        expect(component.config.state).toBe('07/11/2026 00:00 - 13/11/2026 23:59');
        expect(component.parseManualInput('07/11/2026 00:00 - 13/11/2026 23:59').status).toBe('valid');
    });

    it('ignores the bound times without timePicker', async () => {
        const { component } = await createTestComponent({ ...bounds, timePicker: false, displayFormat: 'DD/MM/YYYY' });

        clickDay(component, '2026-11-07');
        clickDay(component, '2026-11-13');
        component.applySelection();
        await flushPromises();

        expect(component.config.state).toBe('07/11/2026 - 13/11/2026');
        expect(component.isTimeOptionDisabled(true, 'hour', 0)).toBe(false);
    });
});

describe('the time selects bind the disabled state', () => {
    it('marks every time option with isTimeOptionDisabled', async () => {
        const fs = await import('fs');
        const path = await import('path');
        const blade = fs.readFileSync(path.resolve(__dirname, '../../resources/views/date-range-picker.blade.php'), 'utf8');

        expect(blade.match(/isTimeOptionDisabled\(true,/g)?.length).toBe(5);
        expect(blade.match(/isTimeOptionDisabled\(false,/g)?.length).toBe(5);
        void dayjs;
    });
});
