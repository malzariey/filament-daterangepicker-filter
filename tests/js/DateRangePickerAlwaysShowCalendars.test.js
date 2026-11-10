import { describe, it, expect } from 'vitest';
import { createTestComponent } from './setup.js';

// alwaysShowCalendar(false) reached the JS config as alwaysShowCalendars but
// nothing read it: the calendars always rendered.
//
// Rule (as in the original daterangepicker's alwaysShowCalendars: false):
// with presets to show, the dropdown first offers only the presets plus a
// "Custom" entry; choosing Custom shows the calendars. A preset click works
// as in the default mode (selected and highlighted, applied by Apply unless
// autoApply) and goes back to the presets view. disableCustomRange() wins:
// presets only, no Custom entry. With no presets the calendars always show.

const presets = {
    Today: ['2026-11-09', '2026-11-09'],
    Yesterday: ['2026-11-08', '2026-11-08'],
    'Last 7 Days': ['2026-11-03', '2026-11-09'],
};

const hidden = { alwaysShowCalendars: false, ranges: presets };

const keydown = (component, key, target = null) => {
    const event = {
        key,
        target,
        shiftKey: false,
        defaultPrevented: false,
        preventDefault() { this.defaultPrevented = true; },
        stopPropagation() {},
    };

    component.handleKeydown(event);

    return event;
};

describe('alwaysShowCalendar(false)', () => {
    describe('default (true)', () => {
        it('shows the calendars and no Custom entry', async () => {
            const { component } = await createTestComponent({ ranges: presets });

            await component.openPicker();

            expect(component.calendarsShown).toBe(true);
            expect(component.showsCustomRangeEntry).toBe(false);
        });
    });

    describe('with presets', () => {
        it('opens on the presets only, with a Custom entry', async () => {
            const { component } = await createTestComponent(hidden);

            await component.openPicker();

            expect(component.calendarsShown).toBe(false);
            expect(component.showsCustomRangeEntry).toBe(true);
            expect(component.isCustomRangeActive).toBe(false);
        });

        it('shows the calendars when Custom is chosen', async () => {
            const { component } = await createTestComponent(hidden);

            await component.openPicker();
            component.showCustomRange();

            expect(component.calendarsShown).toBe(true);
            expect(component.isCustomRangeActive).toBe(true);
        });

        it('selects and highlights a preset, applying only on Apply', async () => {
            const { component } = await createTestComponent(hidden);

            await component.openPicker();
            component.selectPreset('Yesterday');

            expect(component.isActiveRange('Yesterday')).toBe(true);
            expect(component.open).toBe(true);
            expect(component.config.state).toBe('');
            expect(component.calendarsShown).toBe(false);

            component.applySelection();

            expect(component.config.state).toBe('08/11/2026 - 08/11/2026');
            expect(component.open).toBe(false);
        });

        it('applies a preset at once under autoApply', async () => {
            const { component } = await createTestComponent({ ...hidden, autoApply: true });

            await component.openPicker();
            component.selectPreset('Today');

            expect(component.config.state).toBe('09/11/2026 - 09/11/2026');
            expect(component.open).toBe(false);
        });

        it('goes back to the presets view when a preset is clicked after Custom', async () => {
            const { component } = await createTestComponent(hidden);

            await component.openPicker();
            component.showCustomRange();
            component.selectPreset('Today');

            expect(component.calendarsShown).toBe(false);
            expect(component.isCustomRangeActive).toBe(false);
        });

        it('opens on the calendars when the applied range is not a preset', async () => {
            const { component } = await createTestComponent({ ...hidden, initialState: '01/11/2026 - 05/11/2026' });

            await component.openPicker();

            expect(component.calendarsShown).toBe(true);
            expect(component.isCustomRangeActive).toBe(true);
        });

        it('opens on the presets when the applied range is a preset', async () => {
            const { component } = await createTestComponent({ ...hidden, initialState: '08/11/2026 - 08/11/2026' });

            await component.openPicker();

            expect(component.calendarsShown).toBe(false);
            expect(component.isActiveRange('Yesterday')).toBe(true);
        });

        it('reopens on the presets after Custom was chosen and cancelled', async () => {
            const { component } = await createTestComponent(hidden);

            await component.openPicker();
            component.showCustomRange();
            component.cancel();
            await component.openPicker();

            expect(component.calendarsShown).toBe(false);
        });

        it('does not pick a hidden calendar date from the keyboard', async () => {
            const { component } = await createTestComponent(hidden);

            await component.openPicker();
            const enter = keydown(component, 'Enter', component.$refs.input);
            keydown(component, 'ArrowRight', document.body);

            expect(component.selection.start).toBeNull();
            expect(enter.defaultPrevented).toBe(false);
        });
    });

    describe('disableCustomRange() wins', () => {
        it('shows presets only, with no Custom entry', async () => {
            const { component } = await createTestComponent({ ...hidden, disableCustomRange: true });

            await component.openPicker();

            expect(component.presetsOnly).toBe(true);
            expect(component.calendarsShown).toBe(false);
            expect(component.showsCustomRangeEntry).toBe(false);

            component.showCustomRange();
            expect(component.calendarsShown).toBe(false);
        });
    });

    describe('without presets', () => {
        it('always shows the calendars when there are no presets', async () => {
            const { component } = await createTestComponent({ alwaysShowCalendars: false, ranges: {} });

            await component.openPicker();

            expect(component.calendarsShown).toBe(true);
            expect(component.showsCustomRangeEntry).toBe(false);
        });

        it('always shows the calendars when presets are disabled', async () => {
            const { component } = await createTestComponent({ ...hidden, disableRange: true });

            await component.openPicker();

            expect(component.calendarsShown).toBe(true);
            expect(component.showsCustomRangeEntry).toBe(false);
        });
    });
});
