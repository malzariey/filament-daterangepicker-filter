/**
 * Issue #264: the time picker inside a Filament modal or slide-over.
 *
 * The dropdown is teleported to <body>, outside the modal's x-trap container,
 * and focus-trap used to pull focus straight back into the modal, so the
 * hour/minute <select>s could not keep focus (on iOS the native picker never
 * opened). These specs drive the workbench demo: open the modal, open the
 * picker, click the hour select and check it keeps focus, change hour and
 * minute with the keyboard, apply, submit, and read what the server received.
 *
 * Run against the demo app (see CONTRIBUTING.md), serially:
 *   npm run build && vendor/bin/testbench filament:assets
 *   vendor/bin/testbench serve --port=8000
 *   DEMO_URL=http://localhost:8000 npx playwright test tests/playwright/modal-focus.spec.ts --workers=1
 *
 * SCREENSHOT_DIR=<dir> also saves a screenshot of each open picker.
 */

import { test, expect, devices, type Page } from '@playwright/test';

const DEMO_URL = process.env.DEMO_URL ?? 'http://localhost:8000';
const SCREENSHOT_DIR = process.env.SCREENSHOT_DIR;

const CASES = [
    { trigger: /Open in Modal|فتح في نافذة منبثقة/, field: 'modal_time', where: 'Modal' },
    { trigger: /Open in Slide Over|فتح في نافذة جانبية/, field: 'slideover_time', where: 'Slide-over' },
];

const VARIANTS = [
    { name: 'desktop-1440', use: { viewport: { width: 1440, height: 900 } } },
    {
        name: 'iphone-390',
        use: {
            // An iPhone's user agent, viewport, touch and pixel ratio; the
            // browser is still whichever project runs the spec.
            userAgent: devices['iPhone 13'].userAgent,
            viewport: { width: 390, height: 844 },
            deviceScaleFactor: devices['iPhone 13'].deviceScaleFactor,
            isMobile: true,
            hasTouch: true,
        },
    },
];

async function activeElementDescription(page: Page): Promise<string> {
    return page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        return el ? `${el.tagName.toLowerCase()}#${el.id}.${el.className}` : 'none';
    });
}

for (const variant of VARIANTS) {
    for (const scheme of ['light', 'dark'] as const) {
        for (const locale of ['en', 'ar']) {
            test.describe(`${variant.name} ${scheme} ${locale}`, () => {
                test.use({ ...variant.use, colorScheme: scheme });

                for (const { trigger, field, where } of CASES) {
                    test(`${where}: time selects keep focus and the keyboard sets the time`, async ({ page }) => {
                        await page.goto(`${DEMO_URL}/demo/demo-page?locale=${locale}`);
                        await page.waitForLoadState('networkidle');

                        await page.getByRole('button', { name: trigger }).click();
                        const modal = page.locator('.fi-modal-open .fi-modal-window');
                        await expect(modal).toBeVisible();

                        // The modal's focus trap autofocuses its first field shortly
                        // after opening, and a read-only picker opens on focus. Let it
                        // settle, then cancel any such picker (on a phone it covers the
                        // modal, so clicking elsewhere in the modal is not possible).
                        await page.waitForTimeout(300);
                        const autoOpened = page.locator('.fi-daterangepicker-dropdown:visible');
                        if (await autoOpened.count()) {
                            await autoOpened.locator('.fi-daterangepicker-actions button').first().click();
                        }
                        await expect(page.locator('.fi-daterangepicker-dropdown:visible')).toHaveCount(0);

                        const input = modal.locator(`input[id$=".${field}"]`);
                        await input.click();

                        const dropdown = page.locator(`.fi-daterangepicker-dropdown[aria-label$=".${field}"]`);
                        await expect(dropdown).toBeVisible();

                        const days = dropdown.locator('.fi-daterangepicker-day:not(.fi-disabled):not(.fi-off-month)');
                        await days.nth(9).click();
                        await days.nth(12).click();

                        const selects = dropdown.locator('select.fi-time');
                        const hour = selects.nth(0);
                        const minute = selects.nth(1);

                        // The bug: the focus trap moved focus back into the modal.
                        await hour.click();
                        await page.waitForTimeout(150);
                        expect(await activeElementDescription(page)).toContain('fi-daterangepicker-select fi-time');
                        await expect(hour).toBeFocused();

                        // Close the native popup if one opened, keeping focus on the select.
                        await page.keyboard.press('Enter');
                        await expect(hour).toBeFocused();

                        await hour.press('ArrowDown');
                        await hour.press('ArrowDown');
                        await hour.press('ArrowDown');
                        await expect(hour).toHaveValue('3');

                        await page.keyboard.press('Tab');
                        await expect(minute).toBeFocused();
                        await minute.press('ArrowDown');
                        await expect(minute).toHaveValue('30');

                        // The modal and the picker are both still open.
                        await expect(modal).toBeVisible();
                        await expect(dropdown).toBeVisible();

                        if (SCREENSHOT_DIR) {
                            await page.screenshot({
                                path: `${SCREENSHOT_DIR}/after-${field}-${variant.name}-${scheme}-${locale}.png`,
                            });
                        }

                        await dropdown.locator('.fi-daterangepicker-actions button').last().click();
                        await expect(dropdown).toBeHidden();
                        await expect(input).toHaveValue(/03:30 - .* 23:59$/);
                        await expect(modal).toBeVisible();

                        await modal.locator('.fi-modal-footer button').first().click();
                        await expect(page.locator('#demo-last-submitted')).toContainText(`${where}:`);
                        await expect(page.locator('#demo-last-submitted')).toContainText('03:30');
                    });
                }
            });
        }
    }
}
