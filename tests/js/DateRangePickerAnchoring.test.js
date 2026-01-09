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
