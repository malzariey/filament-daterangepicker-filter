# Contributing to Filament DateRangePicker Filter

Thank you for considering contributing! This guide covers the development setup, how to run the demo app, and the contribution workflow.

## Prerequisites

- PHP 8.2+
- Composer
- Node.js 18+ & npm
- SQLite (for the demo app)

## Setup

```bash
# 1. Clone the repository
git clone https://github.com/malzariey/filament-daterangepicker-filter.git
cd filament-daterangepicker-filter

# 2. Install PHP dependencies
composer install

# 3. Install Node dependencies
npm install

# 4. Build front-end assets
npm run build
```

## Running the Demo App

The project ships with a **Workbench demo app** powered by [Orchestra Testbench](https://packages.tools/testbench). It provides a full Filament panel so you can interact with the DateRangePicker component in a real environment.

### Quick Start

Open **two terminals** in the project root:

**Terminal 1 — Asset watcher** (rebuilds CSS & JS on save):

```bash
npm run dev
```

**Terminal 2 — PHP dev server**:

```bash
vendor/bin/testbench serve
```

Then open **http://localhost:8000/demo** in your browser.

### What the Demo Includes

The demo page (`workbench/app/Filament/Pages/DemoPage.php`) showcases:

| Section | Variants |
|---------|----------|
| **Day Picker** | Default range, single calendar, time picker (24h), auto-apply, week numbers, month/year dropdowns |
| **Month & Year** | Month picker, year picker |
| **Edge Cases** | No preset ranges, manual keyboard input |
| **Slide-Over** | Opens a range picker inside a Filament slide-over action |

There is also an **LTR / RTL toggle** at the top of the page to test right-to-left layouts.

### Demo Architecture

```
workbench/
├── app/
│   ├── Filament/Pages/DemoPage.php          # The demo page (form schema)
│   └── Providers/
│       ├── Filament/DemoPanelProvider.php    # Filament panel at /demo
│       └── WorkbenchServiceProvider.php      # Registers workbench views
└── resources/views/filament/pages/
    └── demo.blade.php                        # Blade template (LTR/RTL toggle, slide-over action)
```

Configuration lives in `testbench.yaml` at the project root.

## Running Tests

### PHP Tests (Pest)

```bash
composer test
# or:
vendor/bin/pest
```

### JavaScript Tests (Vitest)

```bash
npm test            # single run
npm run test:watch  # watch mode
```

### Browser Tests (Playwright)

The Playwright specs live in `tests/playwright/`. Refer to the [Playwright docs](https://playwright.dev/) for setup.

## Development Workflow

### Front-End Assets

| Command | Description |
|---------|-------------|
| `npm run dev` | Watch CSS + JS (parallel) |
| `npm run dev:styles` | Watch CSS only (Tailwind CLI) |
| `npm run dev:scripts` | Watch JS only (esbuild) |
| `npm run build` | Production build (minified) |
| `npm run build:styles` | Build CSS only |
| `npm run build:scripts` | Build JS only |

Source files:
- **CSS**: `resources/css/filament-daterangepicker.css`
- **JS**: `resources/js/filament-daterangepicker.js`
- **Output**: `dist/`

### PHP Source

The package source lives in `src/`. Key classes:

- `Fields/DateRangePicker.php` — The Filament form field
- `Filters/DateRangeFilter.php` — The Filament table filter
- `FilamentDaterangepickerFilterServiceProvider.php` — Service provider

## Pull Request Guidelines

1. **Fork** the repository and create a branch from `main`.
2. **Follow existing code style** — run `npm run prettier` for JS/CSS formatting.
3. **Add tests** for new features or bug fixes when possible.
4. **Build assets** before committing — run `npm run build` so the `dist/` files are up to date.
5. **Write a clear PR description** explaining what changed and why.
6. **Keep PRs focused** — one feature or fix per pull request.

## Reporting Issues

When filing a bug report, please include:

- PHP, Laravel, and Filament versions
- Browser and OS
- Steps to reproduce
- Expected vs. actual behavior
- Screenshots or recordings if it's a visual issue

## Code of Conduct

Please be respectful and constructive. We welcome contributions from everyone.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE.md).
