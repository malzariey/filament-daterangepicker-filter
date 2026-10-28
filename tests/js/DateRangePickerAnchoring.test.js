import { describe, it, expect, vi } from 'vitest';
import { createTestComponent, flushPromises } from './setup.js';
import { autoUpdate } from '@floating-ui/dom';

describe('Anchor Positioning', () => {
    it('should configure autoUpdate with animationFrame: true', async () => {
        const { component } = await createTestComponent();

        // Trigger opening to call setupPositioning
        await component.openPicker();
        await flushPromises();

        // Check if autoUpdate was called
        expect(autoUpdate).toHaveBeenCalled();

        // Get the last call arguments
        const lastCall = autoUpdate.mock.lastCall;

        // Check the 4th argument (options)
        const options = lastCall[3];
        expect(options).toBeDefined();
        expect(options).toEqual({ animationFrame: true });
    });

    it('should cleanup autoUpdate on close', async () => {
        const { component } = await createTestComponent();

        // Mock cleanup function
        const cleanupMock = vi.fn();
        autoUpdate.mockReturnValue(cleanupMock);

        // Open
        await component.openPicker();
        await flushPromises();

        // Close
        component.close();

        expect(cleanupMock).toHaveBeenCalled();
    });
});

describe('Mobile viewport fit', () => {
    it('clamps the dropdown into the viewport on both axes', async () => {
        // On a 390px phone the dropdown (up to 85vh) fits neither above nor
        // below the field; with shift() on the main axis only, flip() left it
        // up to 257px above the top of the screen, presets out of reach.
        const { shift } = await import('@floating-ui/dom');
        const { component } = await createTestComponent();
        Object.defineProperty(component.$refs.trigger, 'isConnected', { value: true });
        Object.defineProperty(component.$refs.trigger, 'offsetParent', { value: document.body });
        // An earlier test swaps autoUpdate for a bare return value; put the
        // "run update() once" behaviour back so the position is computed.
        autoUpdate.mockImplementation((reference, floating, update) => {
            update();
            return () => {};
        });
        shift.mockClear();

        await component.openPicker();
        await flushPromises();

        expect(shift).toHaveBeenCalledWith(expect.objectContaining({ crossAxis: true }));
    });

    it('sticks the mobile action bar to the dropdown edge, not 1rem above it', async () => {
        // The dropdown has p-4; at bottom-0 the sticky bar stopped 1rem short
        // and the calendar scrolled by visibly underneath Apply.
        const fs = await import('node:fs');
        const path = await import('node:path');
        const css = fs.readFileSync(path.resolve(process.cwd(), 'resources/css/filament-daterangepicker.css'), 'utf8');
        const mobile = css.slice(css.indexOf('@media (max-width: 640px)'));
        const actions = mobile.slice(mobile.indexOf('.fi-daterangepicker-actions {'), mobile.indexOf('.fi-daterangepicker-actions>*'));

        expect(actions).toContain('bottom: -1rem;');
        expect(actions).not.toMatch(/sticky bottom-0/);
    });
});
