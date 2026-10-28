# filament-daterangepicker-filter

## Run & deploy
Environments: none — public Composer package; verify in a consuming app or the testbench demo (`vendor/bin/testbench serve`, CONTRIBUTING.md)
Deploy: a git tag on `x5` (latest 5.0.8); apps take it with `composer update`   Test DB: Testbench `testing` connection (`tests/TestCase.php`)   Tests: `composer test` (Pest) — `--parallel` is unconfirmed: `brianium/paratest` is not in require-dev
Start: `git status -sb` must not show "behind" before you build or edit.

## Standing approvals
- Push to the default branch after targeted tests pass — no ask.
- Deploy to staging/test — no ask.
- Production deploy: ask, unless a line here says otherwise.
- Tagging a release counts as a production deploy: apps on `^5.0` pick it up on their next `composer update`.

Public MIT package (`malzariey/filament-daterangepicker-filter`), branch `x5`. Treat `src/` as public API: a behaviour change to a documented method needs a major bump, not a patch. Follow `CONTRIBUTING.md`. `~/.claude/house-standard.md` governs the apps, not this repo — do not apply app conventions here.

**Timezone contract (shipped 5.0.7, `src/Concerns/HasRangePicker.php`) — do not change either fallback without a major bump:**

- `getTimezone()` = DISPLAY, falls back to `FilamentTimezone::get()`
- `getSystemTimezone()` = STORAGE, falls back to `config('app.timezone')`

Reading storage off the display setting makes the conversion in `apply()` a no-op: dates reach the query as local wall-clock against UTC data and every row in the first hours of a local day is silently filed under the day before. Read the docblocks on both methods before touching either.

**Assets.** JS source is `resources/js/`; `dist/` is committed build output from `npm run build` — never hand-edit it. The service provider registers `dist/` through `FilamentAsset`, so consuming apps must run `php artisan filament:assets` on deploy or the control renders as an inert text box (reads as a broken filter, not a missing asset).

**Tests.** Commands are in `CONTRIBUTING.md`: `composer test` (Pest), `npm test` (vitest over `tests/js/`), Playwright in `tests/playwright/`. `phpunit.xml` excludes `tests/Browser` and `tests/playwright`; keep those serial.

**Downstream.** All four Shurfat apps consume it — shurfat-alhijaz-app, shurfat-leadsync (shurfat-crm), shurfat-www and shurfat-whatsapp — each locked at 5.0.7 as of 28 Oct 2026. alhijaz, crm and whatsapp require `^5.0`, which still resolves 5.0.0–5.0.6 (display timezone read as storage), so the constraint does not protect them; www requires `^5.0.7`. alhijaz carries a local workaround for the lone-date 500 fixed in 5.0.8 (`DateRangeFilter::bounds()`, commit 372a72e3).

**Local test setup.** `phpunit.xml` and `testbench.yaml` are gitignored; `tests/TestCase.php` sets its own app key so the suite runs on a clean checkout.

**Known gaps — fix when you are in this code.**

- **Month and year pickers with a day-less format filter by today's day.** With the default `d/m/Y` the JavaScript sends explicit boundary days and all is well. With a format such as `m/Y` or `Y`, `DateRangeFilter::parseDate()` calls `createFromFormat()` without a leading `!`, so the missing fields are filled from now, and the bounds code never widens a month or year to its first and last day. Fix: `!` on the format, then start/end of month or year.
- **No test CI.** `.github/workflows/` holds only `dependabot-auto-merge.yml`; nothing runs `composer test` or `npm test` on a push.
- **Dev deps lock to Laravel 12** (`orchestra/testbench ^10`), while the consuming apps run Laravel 13.
- **Downstream constraints.** alhijaz, leadsync and whatsapp require `^5.0`; bump them to `^5.0.7` or later (www already requires `^5.0.7`).
