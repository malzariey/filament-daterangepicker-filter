/**
 * DateRangePicker end-to-end checks on the workbench demo page.
 *
 * Until 5.0.12 this spec pointed at a hard-coded host
 * (http://daterangepicker-test.test/admin/events/create) that no checkout
 * has, so it could never run. It now drives the demo fields in
 * workbench/app/Filament/Pages/DemoPage.php. The modal and slide-over time
 * picker is covered by modal-focus.spec.ts and is not repeated here.
 *
 * Run against the demo app (see CONTRIBUTING.md), serially:
 *   npm run build && vendor/bin/testbench filament:assets
 *   vendor/bin/testbench serve --port=8000
 *   DEMO_URL=http://localhost:8000 npx playwright test tests/playwright --workers=1
 */

import { test, expect, type Page, type Locator } from '@playwright/test';

const DEMO_URL = process.env.DEMO_URL ?? 'http://localhost:8000';

const DAY = '.fi-daterangepicker-day:not(.fi-disabled):not(.fi-off-month)';

/** The input of a demo field, by its name in DemoPage::form(). */
function input(page: Page, field: string): Locator {
    return page.locator(`input[id$=".${field}"]`);
}

/** The (teleported) dropdown that belongs to a demo field. */
function dropdown(page: Page, field: string): Locator {
    return page.locator(`.fi-daterangepicker-dropdown[aria-label$=".${field}"]`);
}

async function openPicker(page: Page, field: string): Promise<Locator> {
    await input(page, field).click();
    const panel = dropdown(page, field);
    await expect(panel).toBeVisible();

    return panel;
}

function applyButton(panel: Locator): Locator {
    return panel.locator('.fi-daterangepicker-actions button').last();
}

function cancelButton(panel: Locator): Locator {
    return panel.locator('.fi-daterangepicker-actions button').first();
}

/** dd/mm/yyyy, the picker's default display format, for a local date. */
function ddmmyyyy(date: Date): string {
    return [date.getDate(), date.getMonth() + 1].map((n) => String(n).padStart(2, '0')).join('/') + `/${date.getFullYear()}`;
}

function daysAgo(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() - days);

    return date;
}

/** Submit the page form and return what the server received for one field. */
async function submitted(page: Page, field: string): Promise<unknown> {
    await page.locator('#demo-submit-form').click();
    const line = page.locator('#demo-last-submitted');
    await expect(line).toContainText('Form:');
    const json = (await line.textContent())!.replace(/^[\s\S]*?Form:\s*/, '').trim();

    return JSON.parse(json)[field];
}

test.describe('DateRangePicker on the demo page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(`${DEMO_URL}/demo/demo-page?locale=en`);
        await page.waitForLoadState('networkidle');
    });

    test.describe('Happy path', () => {
        test('picks a range, applies it, and the server receives it', async ({ page }) => {
            const panel = await openPicker(page, 'default_range');

            const days = panel.locator(DAY);
            await days.nth(9).click();
            await days.nth(19).click();
            await applyButton(panel).click();

            await expect(panel).toBeHidden();
            const value = await input(page, 'default_range').inputValue();
            expect(value).toMatch(/^\d{2}\/\d{2}\/\d{4} - \d{2}\/\d{2}\/\d{4}$/);

            expect(await submitted(page, 'default_range')).toBe(value);
        });

        test('Cancel closes the picker and keeps the old value', async ({ page }) => {
            const before = await input(page, 'default_range').inputValue();
            const panel = await openPicker(page, 'default_range');

            const days = panel.locator(DAY);
            await days.nth(5).click();
            await days.nth(15).click();
            await cancelButton(panel).click();

            await expect(panel).toBeHidden();
            await expect(input(page, 'default_range')).toHaveValue(before);
        });
    });

    test.describe('Time picker', () => {
        test('24-hour: the chosen start time is in the value', async ({ page }) => {
            const panel = await openPicker(page, 'with_time_24h');

            const days = panel.locator(DAY);
            await days.nth(5).click();
            await days.nth(10).click();

            const selects = panel.locator('select.fi-time');
            await expect(selects.first()).toBeVisible();
            await selects.nth(0).selectOption('10');
            await selects.nth(1).selectOption('30');
            await applyButton(panel).click();

            await expect(input(page, 'with_time_24h')).toHaveValue(/^\d{2}\/\d{2}\/\d{4} 10:30 - /);
        });

        test('12-hour: switching the start to PM writes PM', async ({ page }) => {
            const panel = await openPicker(page, 'with_time_12h');

            const days = panel.locator(DAY);
            await days.nth(5).click();
            await days.nth(10).click();

            const ampm = panel.locator('select.fi-ampm');
            await expect(ampm.first()).toBeVisible();
            await ampm.first().selectOption('PM');
            await applyButton(panel).click();

            await expect(input(page, 'with_time_12h')).toHaveValue(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2} PM - /);
        });
    });

    test.describe('Preset ranges', () => {
        const presets = [
            { label: 'Today', from: 0, to: 0 },
            { label: 'Yesterday', from: 1, to: 1 },
            { label: 'Last 7 Days', from: 6, to: 0 },
        ];

        for (const { label, from, to } of presets) {
            test(`"${label}" fills the expected dates`, async ({ page }) => {
                const panel = await openPicker(page, 'default_range');

                await panel.locator('.fi-daterangepicker-range-btn', { hasText: label }).first().click();
                if (await applyButton(panel).isVisible()) {
                    await applyButton(panel).click();
                }

                await expect(input(page, 'default_range')).toHaveValue(`${ddmmyyyy(daysAgo(from))} - ${ddmmyyyy(daysAgo(to))}`);
            });
        }
    });

    test.describe('Manual input', () => {
        test('a typed range moves the calendar to it', async ({ page }) => {
            const field = input(page, 'allow_input');
            await field.click();
            // Digits only: the mask writes the "/" and " - " itself. (A typed
            // Space while the picker is open picks the focused day instead of
            // reaching the mask, so typing the literal " - " ends on today.)
            await field.pressSequentially('0101202415012024');
            await expect(field).toHaveValue('01/01/2024 - 15/01/2024');

            const panel = dropdown(page, 'allow_input');
            await expect(panel).toBeVisible();
            await expect(panel.locator('.fi-daterangepicker-month-label').first()).toContainText('January');
            await expect(panel.locator('.fi-daterangepicker-month-label').first()).toContainText('2024');
        });
    });

    test.describe('Events', () => {
        async function listen(page: Page, name: string): Promise<void> {
            await page.evaluate((eventName) => {
                (window as any).__testEvents = [];
                document.addEventListener(eventName, (e: Event) => {
                    (window as any).__testEvents.push({ type: e.type, detail: (e as CustomEvent).detail });
                });
            }, name);
        }

        test('apply.daterangepicker carries the range', async ({ page }) => {
            await listen(page, 'apply.daterangepicker');
            const panel = await openPicker(page, 'default_range');

            const days = panel.locator(DAY);
            await days.nth(5).click();
            await days.nth(15).click();
            await applyButton(panel).click();

            const events = await page.evaluate(() => (window as any).__testEvents);
            expect(events).toHaveLength(1);
            expect(events[0].detail).toHaveProperty('startDate');
            expect(events[0].detail).toHaveProperty('endDate');
            expect(events[0].detail.formattedValue).toBe(await input(page, 'default_range').inputValue());
        });

        test('cancel.daterangepicker fires on Cancel', async ({ page }) => {
            await listen(page, 'cancel.daterangepicker');
            const panel = await openPicker(page, 'default_range');
            await cancelButton(panel).click();

            const events = await page.evaluate(() => (window as any).__testEvents);
            expect(events.map((e: { type: string }) => e.type)).toEqual(['cancel.daterangepicker']);
        });
    });

    test.describe('Navigation', () => {
        for (const [direction, label] of [['previous', 'Previous month'], ['next', 'Next month']] as const) {
            test(`the ${direction}-month button changes the month`, async ({ page }) => {
                const panel = await openPicker(page, 'default_range');
                const month = panel.locator('.fi-daterangepicker-month-label').first();
                const before = await month.textContent();

                await panel.locator(`.fi-daterangepicker-nav-btn[aria-label="${label}"]:visible`).first().click();

                await expect(month).not.toHaveText(before!);
            });
        }
    });

    test('Escape closes the picker', async ({ page }) => {
        const panel = await openPicker(page, 'default_range');
        await page.keyboard.press('Escape');

        await expect(panel).toBeHidden();
    });

    test('no console errors while picking and applying', async ({ page }) => {
        const errors: string[] = [];
        page.on('console', (msg) => {
            if (msg.type() === 'error') errors.push(msg.text());
        });
        page.on('pageerror', (error) => errors.push(error.message));

        const panel = await openPicker(page, 'default_range');
        const days = panel.locator(DAY);
        await days.nth(5).click();
        await days.nth(15).click();
        await applyButton(panel).click();
        await expect(panel).toBeHidden();

        expect(errors).toEqual([]);
    });
});
