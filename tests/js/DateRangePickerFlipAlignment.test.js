/**
 * opens() sets the dropdown's horizontal alignment to the field; drops()
 * the side. When there is no room on the requested side, flip() moves the
 * dropdown to the other side. Its fallback list used to start with the
 * bare 'top' / 'bottom', so a flip also dropped the alignment: a field near
 * the bottom of the screen got a dropdown centred on it whatever opens()
 * said. A flip must change the side only.
 *
 * These tests run the real Floating UI middleware the component builds over
 * a fake platform (jsdom has no layout): a 1440x900 viewport, a 300x40
 * field and a 700x400 dropdown, LTR and RTL.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { computePosition, autoUpdate, flip, offset, shift } from '@floating-ui/dom';
import { createTestComponent, flushPromises } from './setup.js';

let actual;
let layout;

const platformFor = () => ({
    getElementRects: () => ({
        reference: { ...layout.reference },
        floating: { x: 0, y: 0, width: layout.floating.width, height: layout.floating.height },
    }),
    getDimensions: () => ({ width: layout.floating.width, height: layout.floating.height }),
    getClippingRect: () => ({ x: 0, y: 0, width: layout.viewport.width, height: layout.viewport.height }),
    isRTL: () => layout.rtl,
});

beforeEach(async () => {
    actual = await vi.importActual('@floating-ui/dom');
    flip.mockImplementation(actual.flip);
    shift.mockImplementation(actual.shift);
    offset.mockImplementation(actual.offset);
    computePosition.mockImplementation((reference, floating, options) => actual.computePosition(
        reference,
        floating,
        { ...options, platform: platformFor() },
    ));
    autoUpdate.mockImplementation((reference, floating, update) => {
        update();
        return () => {};
    });
});

afterEach(() => {
    flip.mockImplementation(() => ({}));
    shift.mockImplementation(() => ({}));
    offset.mockImplementation(() => ({}));
    computePosition.mockImplementation(() => Promise.resolve({ x: 100, y: 150 }));
});

const position = async ({ opens, drops, fieldY, rtl = false, viewport = { width: 1440, height: 900 }, field = { x: 600, width: 300 }, floating = { width: 700, height: 400 } }) => {
    layout = {
        reference: { x: field.x, y: fieldY, width: field.width, height: 40 },
        floating,
        viewport,
        rtl,
    };

    const { component } = await createTestComponent({ opens, drops });
    Object.defineProperty(component.$refs.trigger, 'isConnected', { value: true });
    Object.defineProperty(component.$refs.trigger, 'offsetParent', { value: document.body });

    await component.openPicker();
    await flushPromises();

    const style = component.$refs.dropdown.style;

    return { x: parseFloat(style.left), y: parseFloat(style.top) };
};

const cases = [];
for (const rtl of [false, true]) {
    for (const opens of ['left', 'right', 'center']) {
        // drops down / auto start below the field: put the field near the
        // bottom so there is no room under it. drops up starts above: near
        // the top.
        cases.push({ rtl, opens, drops: 'down', edgeY: 800, flipsTo: 'above' });
        cases.push({ rtl, opens, drops: 'auto', edgeY: 800, flipsTo: 'above' });
        cases.push({ rtl, opens, drops: 'up', edgeY: 60, flipsTo: 'below' });
    }
}

describe('flip keeps the opens() alignment', () => {
    it.each(cases)('opens $opens, drops $drops, rtl $rtl', async ({ rtl, opens, drops, edgeY, flipsTo }) => {
        // Mid-screen there is room on both sides: no flip.
        const unflipped = await position({ opens, drops, fieldY: 420, rtl });
        const flipped = await position({ opens, drops, fieldY: edgeY, rtl });

        if (flipsTo === 'above') {
            expect(flipped.y).toBeLessThan(edgeY);
        } else {
            expect(flipped.y).toBeGreaterThan(edgeY);
        }
        expect(flipped.x).toBe(unflipped.x);
    });

    it('aligns the dropdown edge to the field edge after the flip', async () => {
        // Field 600..900. opens left: the dropdown ends at the field's right
        // edge and grows leftward (900 - 700 = 200); right: starts at 600.
        expect((await position({ opens: 'left', drops: 'down', fieldY: 800 })).x).toBe(200);
        expect((await position({ opens: 'right', drops: 'down', fieldY: 800 })).x).toBe(600);
        expect((await position({ opens: 'center', drops: 'down', fieldY: 800 })).x).toBe(400);
    });

    it('still clamps the dropdown into a 390px phone screen', async () => {
        // 5.0.9: a dropdown taller than the room on either side must not be
        // left hanging off the top of the screen.
        const { x, y } = await position({
            opens: 'left',
            drops: 'auto',
            fieldY: 600,
            viewport: { width: 390, height: 844 },
            field: { x: 16, width: 358 },
            floating: { width: 374, height: 760 },
        });

        expect(y).toBeGreaterThanOrEqual(8);
        expect(x).toBeGreaterThanOrEqual(8);
        expect(x + 374).toBeLessThanOrEqual(390 - 8);
    });
});
