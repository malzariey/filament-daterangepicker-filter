import { describe, it, expect } from 'vitest';
import { createTestComponent, dayjs } from './setup.js';

describe('Disabled Dates Reproduction', () => {
    it('should handle disabled dates in custom format (DD/MM/YYYY)', async () => {
        const { component } = await createTestComponent({
            displayFormat: 'DD/MM/YYYY',
            disabledDates: ['15/01/2026', '16/01/2026'],
        });

        const date = dayjs('2026-01-15'); // 15th Jan 2026
        // Current implementation does dayjs('15/01/2026') which fails in standard parsing
        expect(component.isDisabled(date)).toBe(true);
    });

    it('should handle disabled dates in custom format (MM-DD-YYYY)', async () => {
        const { component } = await createTestComponent({
            displayFormat: 'MM-DD-YYYY',
            disabledDates: ['01-15-2026'],
        });

        const date = dayjs('2026-01-15');
        expect(component.isDisabled(date)).toBe(true);
    });
});
