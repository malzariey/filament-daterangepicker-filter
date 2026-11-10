import { describe, expect, it } from 'vitest';
import fs from 'fs';
import path from 'path';
import { clickDay, createTestComponent, flushPromises } from './setup.js';

/**
 * Time picker: typed times, the 12h AM/PM mask, the 12h select defaults
 * and the direction of the time selects in RTL.
 */

// Replace the whole field, as a paste does.
const typeIntoInput = (component, value) => {
    const input = component.$refs.input;
    input.value = value;
    input.setSelectionRange(value.length, value.length);
    input.dispatchEvent(new Event('input', { bubbles: true }));
};

// One keystroke at the caret, the way the browser edits the field before
// IMask sees the input event.
const typeKeys = (component, keys) => {
    const input = component.$refs.input;

    for (const ch of keys) {
        const pos = input.selectionStart ?? 0;
        const value = input.value;
        input.value = value.slice(0, pos) + ch + value.slice(pos);
        input.setSelectionRange(pos + 1, pos + 1);
        input.dispatchEvent(new Event('input', { bubbles: true }));
    }
};

const focusStart = (component) => {
    const input = component.$refs.input;
    document.body.appendChild(input);
    input.focus = HTMLElement.prototype.focus;
    input.focus();
    input.setSelectionRange(0, 0);
    input.dispatchEvent(new Event('focus'));
};

const time = (t) => ({
    hour: Number(t.hour),
    minute: Number(t.minute),
    second: Number(t.second),
    ampm: t.ampm,
});

describe('Time picker', () => {
    describe('F1: typed times are kept (24h + allowInput)', () => {
        const config = {
            allowInput: true,
            timePicker: true,
            timePicker24: true,
            displayFormat: 'DD/MM/YYYY HH:mm',
        };

        it('keeps the typed times in the state and the input', async () => {
            const { component } = await createTestComponent(config);

            typeIntoInput(component, '01/11/2026 08:00 - 02/11/2026 17:30');
            await flushPromises();

            expect(component.config.state).toBe('01/11/2026 08:00 - 02/11/2026 17:30');
            expect(component.$refs.input.value).toBe('01/11/2026 08:00 - 02/11/2026 17:30');
        });

        it('shows the typed times in the selects', async () => {
            const { component } = await createTestComponent(config);

            typeIntoInput(component, '01/11/2026 08:00 - 02/11/2026 17:30');
            await flushPromises();

            expect(time(component.startTime)).toMatchObject({ hour: 8, minute: 0 });
            expect(time(component.endTime)).toMatchObject({ hour: 17, minute: 30 });
        });

        it('keeps typed seconds with timePickerSecond', async () => {
            const { component } = await createTestComponent({
                ...config,
                timePickerSecond: true,
                displayFormat: 'DD/MM/YYYY HH:mm:ss',
            });

            typeIntoInput(component, '01/11/2026 08:00:15 - 02/11/2026 17:30:45');
            await flushPromises();

            expect(component.config.state).toBe('01/11/2026 08:00:15 - 02/11/2026 17:30:45');
            expect(time(component.endTime)).toMatchObject({ hour: 17, minute: 30, second: 45 });
        });
    });

    describe('F2: 12h + allowInput can be typed', () => {
        const config = {
            allowInput: true,
            timePicker: true,
            timePicker24: false,
            singleCalendar: true,
            displayFormat: 'DD/MM/YYYY hh:mm A',
        };

        it('accepts every digit and the meridiem typed as a letter', async () => {
            const { component } = await createTestComponent(config);
            focusStart(component);

            typeKeys(component, '011120260830p');
            await flushPromises();

            expect(component.$refs.input.value).toBe('01/11/2026 08:30 PM');
            expect(component.config.state).toBe('01/11/2026 08:30 PM');
            expect(time(component.startTime)).toMatchObject({ hour: 8, minute: 30, ampm: 'PM' });
        });

        it('accepts a pasted 12h range', async () => {
            const { component } = await createTestComponent({ ...config, singleCalendar: false });

            typeIntoInput(component, '01/11/2026 08:00 AM - 02/11/2026 05:30 PM');
            await flushPromises();

            expect(component.config.state).toBe('01/11/2026 08:00 AM - 02/11/2026 05:30 PM');
            expect(time(component.endTime)).toMatchObject({ hour: 5, minute: 30, ampm: 'PM' });
        });

        it('takes a or p for the Arabic meridiem', async () => {
            const { component } = await createTestComponent({ ...config, locale: 'ar' });
            focusStart(component);

            typeKeys(component, '011120260830p');
            await flushPromises();

            expect(component.$refs.input.value).toBe('01/11/2026 08:30 م');
            expect(component.config.state).toBe('01/11/2026 08:30 م');
            expect(time(component.startTime)).toMatchObject({ hour: 8, minute: 30, ampm: 'PM' });
        });

        it('takes the Arabic meridiem letter itself', async () => {
            const { component } = await createTestComponent({ ...config, locale: 'ar' });
            focusStart(component);

            typeKeys(component, '011120260830ص');
            await flushPromises();

            expect(component.config.state).toBe('01/11/2026 08:30 ص');
            expect(time(component.startTime)).toMatchObject({ hour: 8, minute: 30, ampm: 'AM' });
        });
    });

    describe('F3: 12h selects show the stored time', () => {
        const config = {
            timePicker: true,
            timePicker24: false,
            displayFormat: 'DD/MM/YYYY hh:mm A',
        };

        it('defaults the selects to 12:00 AM and 11:59 PM', async () => {
            const { component } = await createTestComponent(config);
            const hours = component.hourOptions.map((h) => h.value);

            expect(hours).toContain(Number(component.startTime.hour));
            expect(hours).toContain(Number(component.endTime.hour));
            expect(time(component.startTime)).toMatchObject({ hour: 12, minute: 0, ampm: 'AM' });
            expect(time(component.endTime)).toMatchObject({ hour: 11, minute: 59, ampm: 'PM' });
        });

        it('round-trips a change to the To minute only', async () => {
            const { component } = await createTestComponent(config);
            await component.openPicker();

            clickDay(component, '2026-11-01');
            clickDay(component, '2026-11-02');
            await flushPromises();

            expect(component.formatSelectionPreview(component.selection.start, component.startTime))
                .toBe('01/11/2026 12:00 AM');
            expect(component.formatSelectionPreview(component.selection.end, component.endTime))
                .toBe('02/11/2026 11:59 PM');

            // x-model writes the select's string value.
            component.endTime.minute = '30';
            component.handleTimeChange(false);
            component.applySelection();

            expect(component.config.state).toBe('01/11/2026 12:00 AM - 02/11/2026 11:30 PM');
        });
    });

    describe('F12: time selects read left to right in RTL', () => {
        const blade = fs.readFileSync(
            path.resolve(process.cwd(), 'resources/views/date-range-picker.blade.php'),
            'utf8',
        );

        it('marks every time input row dir="ltr"', () => {
            const rows = blade.match(/<div[^>]*class="fi-daterangepicker-time-inputs"[^>]*>/g) ?? [];

            expect(rows).toHaveLength(2);
            rows.forEach((row) => expect(row).toContain('dir="ltr"'));
        });

        it('keeps the labels outside the LTR row', () => {
            const labels = blade.match(/<label[^>]*fi-daterangepicker-time-label[^>]*>/g) ?? [];

            expect(labels).toHaveLength(2);
            labels.forEach((label) => expect(label).not.toContain('dir='));
        });
    });
});
