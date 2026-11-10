<?php

use Carbon\Carbon;
use Filament\Support\Facades\FilamentTimezone;
use Malzariey\FilamentDaterangepickerFilter\Fields\DateRangePicker;
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;

/**
 * PHP format tokens with no plain Day.js equivalent.
 *
 * format() is a PHP format: the server reads the state with
 * Carbon::createFromFormat(), and the browser writes and reads it with the
 * Day.js format convertPhpToJsFormat() builds from it. Each token either
 * works on both sides, the same way, or is refused when it is configured.
 * Before, all six converted into something Day.js wrote literally ("E", "o",
 * "W", "zz", "z") or misread ("DDD" as day + day), so the field showed a
 * value nobody could read back, and nothing said why.
 *
 * - S  supported as "jS" → Day.js "Do", English suffix on both sides
 *      (tests/js/DateRangePickerPhpFormatTokens.test.js). Anywhere else
 *      ("dS", a lone "S") it is refused: Day.js has no suffix-only token.
 * - e  supported: written as a literal of the zone the value is in (display
 *      zone on screen, storage zone in dual-state storage); Carbon reads it.
 * - N, W  refused: Carbon::createFromFormat() cannot read them at all.
 * - z, T  refused: Day.js can neither write nor read a day of year or a
 *      zone abbreviation for a wall-clock picker date.
 */
beforeEach(function () {
    config(['app.timezone' => 'UTC']);
    FilamentTimezone::set(null);
});

afterEach(fn () => FilamentTimezone::set(null));

function jsFormat(DateRangePicker $field, string $php): string
{
    $method = new ReflectionMethod($field, 'convertPhpToJsFormat');
    $method->setAccessible(true);

    return $method->invoke($field, $php);
}

function localRange(DateRangeFilter $filter, string $state): array
{
    $method = new ReflectionMethod($filter, 'parseLocalRange');
    $method->setAccessible(true);

    return $method->invoke($filter, $state);
}

// ── S ────────────────────────────────────────────────────────────────

it('converts jS to Day.js Do', function () {
    $field = DateRangePicker::make('test')->format('jS F Y');

    expect($field->getDisplayFormat())->toBe('Do MMMM YYYY');
});

it('writes and reads jS with the same English suffixes as the browser', function () {
    // Same list as tests/js/DateRangePickerPhpFormatTokens.test.js.
    $ordinals = [1 => '1st', 2 => '2nd', 3 => '3rd', 4 => '4th', 11 => '11th', 12 => '12th', 13 => '13th', 21 => '21st', 22 => '22nd', 23 => '23rd', 31 => '31st'];

    foreach ($ordinals as $day => $expected) {
        $date = Carbon::create(2026, 1, $day, 0, 0, 0, 'UTC');

        expect($date->format('jS F Y'))->toBe("{$expected} January 2026");
        expect(Carbon::createFromFormat('!jS F Y', "{$expected} January 2026", 'UTC')->toDateString())
            ->toBe($date->toDateString());
    }
});

it('filters a jS range the browser wrote', function () {
    $filter = DateRangeFilter::make('at')->format('jS F Y');

    [$from, $to] = localRange($filter, '2nd June 2026 - 23rd June 2026');

    expect($from->format('Y-m-d H:i:s'))->toBe('2026-06-02 00:00:00')
        ->and($to->format('Y-m-d H:i:s'))->toBe('2026-06-23 23:59:59');
});

it('filters a jS range an Arabic page wrote', function () {
    app()->setLocale('ar');

    $filter = DateRangeFilter::make('at')->format('jS F Y');

    // The browser writes the suffix in English and the month in Arabic.
    [$from, $to] = localRange($filter, '2nd نوفمبر 2026 - 23rd نوفمبر 2026');

    expect($from?->format('Y-m-d'))->toBe('2026-11-02')
        ->and($to?->format('Y-m-d'))->toBe('2026-11-23');
});

it('refuses S anywhere but straight after j', function (string $format) {
    DateRangePicker::make('test')->format($format);
})->throws(InvalidArgumentException::class, '"S"')->with([
    'after d' => ['dS F Y'],
    'alone' => ['j S F Y'],
]);

it('keeps an escaped S literal', function () {
    $field = DateRangePicker::make('test')->format('d/m/Y \S');

    expect($field->getDisplayFormat())->toBe('DD/MM/YYYY [S]');
});

// ── e ────────────────────────────────────────────────────────────────

it('writes e as the display timezone on screen', function () {
    $field = DateRangePicker::make('test')
        ->format('Y-m-d H:i e', enforceFormat: true)
        ->timezone('Europe/Berlin')
        ->timePicker();

    expect($field->getDisplayFormat())->toBe('YYYY-MM-DD HH:mm [Europe/Berlin]');
});

it('writes e as the storage timezone in dual-state storage', function () {
    $field = DateRangePicker::make('test')
        ->useDualState('start_at', 'end_at')
        ->format('Y-m-d H:i:s e', enforceFormat: true)
        ->timezone('Europe/Berlin')
        ->timePicker();

    expect($field->getDualStateStorageFormat())->toBe('YYYY-MM-DD HH:mm:ss [UTC]')
        // What the server writes for a default, in the storage zone.
        ->and(Carbon::create(2026, 6, 10, 8, 17, 0, 'UTC')->format('Y-m-d H:i:s e'))
        ->toBe('2026-06-10 08:17:00 UTC');
});

it('falls back to the Filament display timezone for e', function () {
    FilamentTimezone::set('Asia/Riyadh');

    $field = DateRangePicker::make('test')->format('Y-m-d e');

    expect($field->getDisplayFormat())->toBe('YYYY-MM-DD [Asia/Riyadh]');
});

it('filters an e range the browser wrote', function () {
    $filter = DateRangeFilter::make('at')
        ->format('Y-m-d H:i e', enforceFormat: true)
        ->timezone('Europe/Berlin')
        ->timePicker();

    [$from, $to] = localRange($filter, '2026-06-02 00:00 Europe/Berlin - 2026-06-02 23:59 Europe/Berlin');

    expect($from->toIso8601String())->toBe('2026-06-02T00:00:00+02:00')
        ->and($to->toIso8601String())->toBe('2026-06-02T23:59:59+02:00');
});

// ── N W z T ──────────────────────────────────────────────────────────

it('refuses a token that cannot round-trip', function (string $format, string $token) {
    expect(fn () => DateRangePicker::make('test')->format($format))
        ->toThrow(InvalidArgumentException::class, "\"{$token}\"");
})->with([
    'N (ISO weekday)' => ['d/m/Y N', 'N'],
    'W (ISO week)' => ['Y-m-d \WW', 'W'],
    'z (day of year)' => ['Y z', 'z'],
    'T (zone abbreviation)' => ['Y-m-d H:i T', 'T'],
]);

it('refuses those tokens on a filter too', function () {
    DateRangeFilter::make('at')->format('o-\WW');
})->throws(InvalidArgumentException::class, '"W"');

it('refuses a token returned by a format closure when the format is converted', function () {
    $field = DateRangePicker::make('test')->format(fn () => 'Y-m-d (N)');

    $field->getDisplayFormat();
})->throws(InvalidArgumentException::class, '"N"');

it('accepts those letters escaped as literals', function () {
    $field = DateRangePicker::make('test')->format('d/m/Y \N\W\z\T');

    expect($field->getDisplayFormat())->toBe('DD/MM/YYYY [N][W][z][T]');
});
