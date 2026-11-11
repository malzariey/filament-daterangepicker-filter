# filament-daterangepicker-filter

## Run & deploy
Environments: none — public Composer package; verify in a consuming app or the testbench demo (`vendor/bin/testbench serve`, CONTRIBUTING.md)
Deploy: an annotated tag on `x5` plus a GitHub release (latest 5.0.12, 10 Nov 2026); Packagist picks the tag up within a minute; apps take it with `composer update`   Test DB: Testbench `testing` connection (`tests/TestCase.php`)   Tests: `composer test` (Pest; purges the Testbench skeleton first) and `npm test` (vitest); `--parallel` works (CI uses it)
Start: `git status -sb` must not show "behind" before you build or edit.

## Standing approvals
- Push to the default branch after targeted tests pass — no ask.
- Deploy to staging/test — no ask.
- Production deploy: ask, unless a line here says otherwise.
- Tagging a release counts as a production deploy: apps on `^5.0` pick it up on their next `composer update`. Ask before every tag, even when the owner approved an earlier one.

**Before a tag** (how 5.0.10–5.0.12 shipped): an independent review of the diff, a full feature check of the demo (field and filter, en and ar, light and dark, 390 px), CI green on `x5`, a last look for new issues and PRs, then check the downloaded zipball (built `dist/` matches the tag, no `:root` block in the CSS).

Public MIT package (`malzariey/filament-daterangepicker-filter`), branch `x5`. Treat `src/` as public API: a behaviour change to a documented method needs a major bump, not a patch. Follow `CONTRIBUTING.md`. `~/.claude/house-standard.md` governs the apps, not this repo — do not apply app conventions here.

**Timezone contract (shipped 5.0.7, `src/Concerns/HasRangePicker.php`) — do not change either fallback without a major bump:**

- `getTimezone()` = DISPLAY, falls back to `FilamentTimezone::get()`
- `getSystemTimezone()` = STORAGE, falls back to `config('app.timezone')`

Reading storage off the display setting makes the conversion in `apply()` a no-op: dates reach the query as local wall-clock against UTC data and every row in the first hours of a local day is silently filed under the day before. Read the docblocks on both methods before touching either.

**Assets.** JS source is `resources/js/`; `dist/` is committed build output from `npm run build` — never hand-edit it. The service provider registers `dist/` through `FilamentAsset`, so consuming apps must run `php artisan filament:assets` on deploy or the control renders as an inert text box (reads as a broken filter, not a missing asset).

**Tests.** Commands are in `CONTRIBUTING.md`: `composer test` (Pest), `npm test` (vitest over `tests/js/`), Playwright in `tests/playwright/`. `phpunit.xml.dist` runs the Package suite by default; `tests/Browser` is its own Browser suite (Livewire and Blade only, no real browser, safe with `--parallel`) and `tests/playwright` is not PHPUnit. CI: `.github/workflows/tests.yml` runs the Package and Browser suites with `--parallel` on PHP 8.3/8.4 x Laravel 12/13, plus vitest; the Playwright spec is not in CI.

**Downstream.** All four Shurfat apps consume it — shurfat-alhijaz-app, shurfat-leadsync (shurfat-crm), shurfat-www and shurfat-whatsapp. Local checkouts on 11 Nov 2026 lock 5.0.9 (alhijaz, leadsync, whatsapp) and 5.0.8 (www); none is on 5.0.10–5.0.12 yet, and the owner said "not yet" to updating leadsync (11 Nov). alhijaz, crm and whatsapp require `^5.0`, which still resolves 5.0.0–5.0.6 (display timezone read as storage), so the constraint does not protect them; www requires `^5.0.7`. alhijaz carries a local workaround for the lone-date 500 fixed in 5.0.8 (`DateRangeFilter::bounds()`, commit 372a72e3). Each app must run `php artisan filament:assets` after updating.

**Local test setup.** `testbench.yaml` is committed (the demo runs after `composer install`; `composer serve` publishes assets and serves it on :8000); `phpunit.xml` is gitignored; `tests/TestCase.php` sets its own app key so the suite runs on a clean checkout. `testbench serve` leaves a `.env` in the Testbench skeleton that fails a session test: run `vendor/bin/testbench package:purge-skeleton` before a bare `vendor/bin/pest` (`composer test` does it). `tests/playwright/` needs `npm i --no-save @playwright/test@1.61.1` (matches the installed Chromium) and `DEMO_URL=http://localhost:<port>`.

**Held for 6.0 (breaking — do not ship in 5.x).** Each changes what an app gets without the app changing code, and `^5.0` installs every 5.x automatically:
- Clear stores `null` everywhere (today the browser stores `''`, the Clear action `null`): typed `fn (string $state)` hooks and NOT NULL text columns would break.
- `enforceBoundTimes()` on by default: `maxDate(now())` is frozen at page load, so a "Today" filter would hide later rows.
- Unsupported PHP format tokens throw (today `ReportedFormatTokens` logs a warning once a day).
Recommendation (11 Nov 2026, not yet ruled on by the owner): don't cut 6.0 for these alone; bundle them only if a bigger breaking need comes along.

**Planned for 5.1.** Presets that follow the picker type (month/year pickers list day presets today).

**Known gaps — fix when you are in this code.**

- **CI tests only the newest Filament.** `tests.yml` runs whatever `composer update` resolves; Filament 4.x and older 5.x were checked by hand (5.9.0, 5.11.1, 4.16.2 on 10 Nov 2026), not in CI.
- **The `gh` token lacks the `workflow` scope**, so merging a PR that edits `.github/workflows/` via `gh pr merge` fails; merge it over SSH (`git merge` + push) instead.
- **Kurdish (`ckb`) "Apply" reads `گەڕان`** (search); unverified, needs a native check.
- **Downstream constraints.** alhijaz, leadsync and whatsapp require `^5.0`; bump them to `^5.0.7` or later (www already requires `^5.0.7`).
