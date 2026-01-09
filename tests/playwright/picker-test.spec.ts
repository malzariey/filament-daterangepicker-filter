/**
 * DateRangePicker Playwright Test Suite
 * 
 * Comprehensive E2E tests for the Filament DateRangePicker component.
 * Run with: npx playwright test tests/playwright/picker-test.spec.js --headed
 * 
 * Configure your test URL in the BASE_URL constant below.
 */

import { test, expect } from '@playwright/test';

// Configure your test URL here
const BASE_URL = 'http://daterangepicker-test.test/admin/events/create';

// Test selectors
const SELECTORS = {
    standardRange: '#form\\.date_range', // Standard date range picker
    timeRange: '#form\\.time_range', // Time picker variant
    dropdown: '.fi-daterangepicker-dropdown',
    day: '.fi-daterangepicker-day:not(.fi-disabled):not(.fi-off-month)',
    applyBtn: 'button:has-text("Apply")',
    cancelBtn: 'button:has-text("Cancel")',
    rangePreset: '.fi-daterangepicker-range-btn',
    timeSelect: '.fi-daterangepicker-select.fi-time',
    calendarHeader: '.fi-daterangepicker-month-label',
    prevMonth: '.fi-daterangepicker-nav-btn:first-child',
    nextMonth: '.fi-daterangepicker-nav-btn:last-child',
};

test.describe('DateRangePicker Component', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_URL);
        await page.waitForLoadState('networkidle');
    });

    test.describe('Happy Path', () => {
        test('should open picker, select date range, and apply', async ({ page }) => {
            // 1. Click on the date range picker
            await page.locator(SELECTORS.standardRange).click();

            // 2. Wait for dropdown to be visible
            await expect(page.locator(SELECTORS.dropdown)).toBeVisible();

            // 3. Select start date (click first available day)
            const days = page.locator(SELECTORS.day);
            await days.nth(9).click(); // ~10th of the month

            // 4. Select end date
            await days.nth(19).click(); // ~20th of the month

            // 5. Click Apply
            await page.locator(SELECTORS.applyBtn).first().click();

            // 6. Verify dropdown is closed
            await expect(page.locator(SELECTORS.dropdown)).not.toBeVisible();

            // 7. Verify input has a value
            const inputValue = await page.locator(SELECTORS.standardRange).inputValue();
            expect(inputValue).toMatch(/\d{2}\/\d{2}\/\d{4}\s-\s\d{2}\/\d{2}\/\d{4}/);
        });

        test('should close picker on Cancel without applying', async ({ page }) => {
            // Get initial value
            const initialValue = await page.locator(SELECTORS.standardRange).inputValue();

            // Open picker
            await page.locator(SELECTORS.standardRange).click();
            await expect(page.locator(SELECTORS.dropdown)).toBeVisible();

            // Select some dates
            const days = page.locator(SELECTORS.day);
            await days.nth(5).click();
            await days.nth(15).click();

            // Click Cancel
            await page.locator(SELECTORS.cancelBtn).first().click();

            // Verify value unchanged
            const finalValue = await page.locator(SELECTORS.standardRange).inputValue();
            expect(finalValue).toBe(initialValue);
        });
    });

    test.describe('Time Picker', () => {
        test('should select time values and include them in output', async ({ page }) => {
            // Open time picker variant
            await page.locator(SELECTORS.timeRange).click();
            await expect(page.locator(SELECTORS.dropdown)).toBeVisible();

            // Select dates first
            const days = page.locator(SELECTORS.day);
            await days.nth(5).click();
            await days.nth(10).click();

            // Wait for time pickers to be visible
            const timeSelects = page.locator(SELECTORS.timeSelect);
            await expect(timeSelects.first()).toBeVisible();

            // Change start hour
            await timeSelects.nth(0).selectOption('10');

            // Change start minute
            await timeSelects.nth(1).selectOption('30');

            // Apply
            await page.locator(SELECTORS.applyBtn).first().click();

            // Verify time is included in format
            const inputValue = await page.locator(SELECTORS.timeRange).inputValue();
            expect(inputValue).toContain('10:30');
        });

        test('should switch between AM/PM in 12-hour mode', async ({ page }) => {
            // This test requires a 12-hour time picker variant
            // Skip if not available on the test page
            const ampmPicker = page.locator('#form\\.time_range_12h');
            if (await ampmPicker.count() === 0) {
                test.skip();
                return;
            }

            await ampmPicker.click();
            await expect(page.locator(SELECTORS.dropdown)).toBeVisible();

            const ampmSelect = page.locator('.fi-daterangepicker-select.fi-ampm');
            await expect(ampmSelect.first()).toBeVisible();
            await ampmSelect.first().selectOption('PM');
        });
    });

    test.describe('Preset Ranges (Shortcuts)', () => {
        test('should select "Today" preset and apply correct dates', async ({ page }) => {
            await page.locator(SELECTORS.standardRange).click();
            await expect(page.locator(SELECTORS.dropdown)).toBeVisible();

            // Look for Today preset
            const todayPreset = page.locator(`${SELECTORS.rangePreset}:has-text("Today")`);
            if (await todayPreset.count() > 0) {
                await todayPreset.click();

                // If autoApply, check input immediately
                // Otherwise, click Apply
                const applyBtn = page.locator(SELECTORS.applyBtn).first();
                if (await applyBtn.isVisible()) {
                    await applyBtn.click();
                }

                const inputValue = await page.locator(SELECTORS.standardRange).inputValue();
                const today = new Date();
                const expectedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
                expect(inputValue).toContain(expectedDate);
            }
        });

        test('should select "Last 7 Days" preset', async ({ page }) => {
            await page.locator(SELECTORS.standardRange).click();
            await expect(page.locator(SELECTORS.dropdown)).toBeVisible();

            const last7Days = page.locator(`${SELECTORS.rangePreset}:has-text("Last 7 Days")`);
            if (await last7Days.count() > 0) {
                await last7Days.click();

                const applyBtn = page.locator(SELECTORS.applyBtn).first();
                if (await applyBtn.isVisible()) {
                    await applyBtn.click();
                }

                const inputValue = await page.locator(SELECTORS.standardRange).inputValue();
                expect(inputValue).toMatch(/\d{2}\/\d{2}\/\d{4}/);
            }
        });

        test('should select "Yesterday" preset', async ({ page }) => {
            await page.locator(SELECTORS.standardRange).click();
            await expect(page.locator(SELECTORS.dropdown)).toBeVisible();

            const yesterday = page.locator(`${SELECTORS.rangePreset}:has-text("Yesterday")`);
            if (await yesterday.count() > 0) {
                await yesterday.click();

                const applyBtn = page.locator(SELECTORS.applyBtn).first();
                if (await applyBtn.isVisible()) {
                    await applyBtn.click();
                }

                const inputValue = await page.locator(SELECTORS.standardRange).inputValue();
                const yesterdayDate = new Date();
                yesterdayDate.setDate(yesterdayDate.getDate() - 1);
                const expectedDate = `${String(yesterdayDate.getDate()).padStart(2, '0')}/${String(yesterdayDate.getMonth() + 1).padStart(2, '0')}/${yesterdayDate.getFullYear()}`;
                expect(inputValue).toContain(expectedDate);
            }
        });
    });

    test.describe('Input Mask', () => {
        test('should allow manual date entry via keyboard', async ({ page }) => {
            // Focus the input
            await page.locator(SELECTORS.standardRange).focus();

            // Clear existing value
            await page.locator(SELECTORS.standardRange).fill('');

            // Type a date manually
            await page.locator(SELECTORS.standardRange).type('01/01/2024 - 15/01/2024');

            // Trigger blur to process
            await page.locator(SELECTORS.standardRange).blur();

            // Wait a bit for processing
            await page.waitForTimeout(200);

            // Open picker to verify calendar updated
            await page.locator(SELECTORS.standardRange).click();
            await expect(page.locator(SELECTORS.dropdown)).toBeVisible();

            // Check that January 2024 is shown
            const header = page.locator(SELECTORS.calendarHeader);
            await expect(header.first()).toContainText('January');
            await expect(header.first()).toContainText('2024');
        });
    });

    test.describe('Livewire Sync', () => {
        test('should dispatch custom events on apply', async ({ page }) => {
            // Set up event listener
            await page.evaluate(() => {
                window.__testEvents = [];
                document.addEventListener('apply.daterangepicker', (e) => {
                    window.__testEvents.push({
                        type: 'apply',
                        detail: e.detail
                    });
                });
            });

            // Open picker and make selection
            await page.locator(SELECTORS.standardRange).click();
            await expect(page.locator(SELECTORS.dropdown)).toBeVisible();

            const days = page.locator(SELECTORS.day);
            await days.nth(5).click();
            await days.nth(15).click();

            await page.locator(SELECTORS.applyBtn).first().click();

            // Check event was dispatched
            const events = await page.evaluate(() => window.__testEvents);
            expect(events.length).toBeGreaterThan(0);
            expect(events[0].type).toBe('apply');
            expect(events[0].detail).toHaveProperty('startDate');
            expect(events[0].detail).toHaveProperty('endDate');
        });

        test('should dispatch cancel event on cancel', async ({ page }) => {
            // Set up event listener
            await page.evaluate(() => {
                window.__testEvents = [];
                document.addEventListener('cancel.daterangepicker', (e) => {
                    window.__testEvents.push({ type: 'cancel' });
                });
            });

            await page.locator(SELECTORS.standardRange).click();
            await expect(page.locator(SELECTORS.dropdown)).toBeVisible();

            await page.locator(SELECTORS.cancelBtn).first().click();

            const events = await page.evaluate(() => window.__testEvents);
            expect(events.some(e => e.type === 'cancel')).toBe(true);
        });
    });

    test.describe('Navigation', () => {
        test('should navigate to previous month', async ({ page }) => {
            await page.locator(SELECTORS.standardRange).click();
            await expect(page.locator(SELECTORS.dropdown)).toBeVisible();

            // Get current month
            const initialMonth = await page.locator(SELECTORS.calendarHeader).first().textContent();

            // Click previous month button
            await page.locator(SELECTORS.prevMonth).first().click();

            // Verify month changed
            const newMonth = await page.locator(SELECTORS.calendarHeader).first().textContent();
            expect(newMonth).not.toBe(initialMonth);
        });

        test('should navigate to next month', async ({ page }) => {
            await page.locator(SELECTORS.standardRange).click();
            await expect(page.locator(SELECTORS.dropdown)).toBeVisible();

            const initialMonth = await page.locator(SELECTORS.calendarHeader).first().textContent();

            // Use the second nav button for single calendar, last for dual
            const nextBtn = page.locator(SELECTORS.nextMonth);
            await nextBtn.last().click();

            const newMonth = await page.locator(SELECTORS.calendarHeader).first().textContent();
            expect(newMonth).not.toBe(initialMonth);
        });
    });

    test.describe('Keyboard Navigation', () => {
        test('should close on Escape key', async ({ page }) => {
            await page.locator(SELECTORS.standardRange).click();
            await expect(page.locator(SELECTORS.dropdown)).toBeVisible();

            await page.keyboard.press('Escape');

            await expect(page.locator(SELECTORS.dropdown)).not.toBeVisible();
        });
    });

    test.describe('Error Handling', () => {
        test('should not throw console errors during normal usage', async ({ page }) => {
            const errors: string[] = [];
            page.on('console', msg => {
                if (msg.type() === 'error') {
                    errors.push(msg.text());
                }
            });

            // Perform typical interactions
            await page.locator(SELECTORS.standardRange).click();
            await expect(page.locator(SELECTORS.dropdown)).toBeVisible();

            const days = page.locator(SELECTORS.day);
            await days.nth(5).click();
            await days.nth(15).click();
            await page.locator(SELECTORS.applyBtn).first().click();

            // Filter out unrelated errors (network, etc)
            const relevantErrors = errors.filter(e =>
                e.includes('daterangepicker') ||
                e.includes('Alpine') ||
                e.includes('handleTimeChange')
            );

            expect(relevantErrors).toHaveLength(0);
        });
    });
});
