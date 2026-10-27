# filament-daterangepicker-filter

Public MIT package (`malzariey/filament-daterangepicker-filter`), branch `x5`. Treat `src/` as public API: a behaviour change to a documented method needs a major bump, not a patch. Follow `CONTRIBUTING.md`. `~/.claude/house-standard.md` governs the apps, not this repo — do not apply app conventions here.

**Timezone contract (shipped 5.0.7, `src/Concerns/HasRangePicker.php`) — do not change either fallback without a major bump:**

- `getTimezone()` = DISPLAY, falls back to `FilamentTimezone::get()`
- `getSystemTimezone()` = STORAGE, falls back to `config('app.timezone')`

Reading storage off the display setting makes the conversion in `apply()` a no-op: dates reach the query as local wall-clock against UTC data and every row in the first hours of a local day is silently filed under the day before. Read the docblocks on both methods before touching either.

**Assets.** JS source is `resources/js/`; `dist/` is committed build output from `npm run build` — never hand-edit it. The service provider registers `dist/` through `FilamentAsset`, so consuming apps must run `php artisan filament:assets` on deploy or the control renders as an inert text box (reads as a broken filter, not a missing asset).

**Tests.** Commands are in `CONTRIBUTING.md`: `composer test` (Pest), `npm test` (vitest over `tests/js/`), Playwright in `tests/playwright/`. `phpunit.xml` excludes `tests/Browser` and `tests/playwright`; keep those serial.

**Downstream.** shurfat-leadsync is the only consumer: `composer.json` requires `^5.0` with the lock at 5.0.7 — `^5.0` still resolves 5.0.0–5.0.6, which read the display timezone as storage, so the constraint does not actually protect it. shurfat-alhijaz-app and shurfat-www use local date filters and do not consume the package — a gap to close there, not a sign the package is unused.
