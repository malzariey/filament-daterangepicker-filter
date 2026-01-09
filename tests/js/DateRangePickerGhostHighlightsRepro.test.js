import { describe, it, expect } from 'vitest';
import { createTestComponent, dayjs } from './setup.js';

describe('Ghost Highlights Reproduction', () => {
    it('should NOT highlight trailing days from next month in current month grid', async () => {
        const { component } = await createTestComponent();

        // Select range: Jan 28, 2026 to Feb 5, 2026
        component.selection.start = dayjs('2026-01-28');
        component.selection.end = dayjs('2026-02-05');

        // View Jan 2026
        component.viewDate = dayjs('2026-01-01');

        // Generate grid for Jan 2026
        const grid = component.generateGrid(0);

        let feb1st = null;
        for (const week of grid.weeks) {
            for (const day of week) {
                if (day.date.month() === 1 && day.date.date() === 1) { // Month 1 is Feb
                    feb1st = day;
                    break;
                }
            }
            if (feb1st) break;
        }

        expect(feb1st).not.toBeNull();
        expect(feb1st.inRange).toBe(false);
        expect(feb1st.isSelected).toBe(false);
    });

    it('should NOT highlight leading days from previous month in current month grid', async () => {
        const { component } = await createTestComponent();

        // Select range: March 30, 2026 to April 5, 2026
        component.selection.start = dayjs('2026-03-30');
        component.selection.end = dayjs('2026-04-05');

        // View April 2026
        component.viewDate = dayjs('2026-04-01');

        // Generate grid for April 2026
        const grid = component.generateGrid(0);

        // Find March 31st in the grid
        let march31st = null;
        for (const week of grid.weeks) {
            for (const day of week) {
                if (day.date.month() === 2 && day.date.date() === 31) { // Month 2 is March
                    march31st = day;
                    break;
                }
            }
            if (march31st) break;
        }

        expect(march31st).not.toBeNull();
        expect(march31st.inRange).toBe(false);
        expect(march31st.isSelected).toBe(false);
    });
});
