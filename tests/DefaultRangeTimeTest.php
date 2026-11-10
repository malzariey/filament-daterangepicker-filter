<?php

use Carbon\Carbon;
use Filament\Support\Facades\FilamentTimezone;
use Malzariey\FilamentDaterangepickerFilter\Fields\DateRangePicker;

/**
 * The default*() helpers under timePicker().
 *
 * They kept the clock time of "now", so with the time picker on
 * defaultYesterday() was "yesterday 15:00 - yesterday 15:00" — a range of one
 * minute that matched nothing — while the "Yesterday" preset in the browser
 * selects the whole day. A default must be the range its same-named preset
 * selects: start of the first day to end of the last (presetBounds() in
 * resources/js/filament-daterangepicker.js), in the display timezone.
 *
 * "Now" is 2026-06-10 15:00 in Riyadh (12:00 UTC); storage is UTC.
 */
beforeEach(function () {
    config(['app.timezone' => 'UTC']);
    FilamentTimezone::set(null);
    Carbon::setTestNow(Carbon::parse('2026-06-10 12:00:00', 'UTC'));
});

afterEach(function () {
    Carbon::setTestNow();
    FilamentTimezone::set(null);
});

function riyadhPicker(): DateRangePicker
{
    return DateRangePicker::make('x')->timezone('Asia/Riyadh');
}

function defaultState(DateRangePicker $field): ?string
{
    return invade($field)->buildDefaultValue();
}

/**
 * The range a preset selects in the browser, written in the field's format:
 * presetBounds() reads a date-only preset as start-of-day → end-of-day.
 */
function presetState(DateRangePicker $field, string $presetKey): string
{
    $range = $field->getRanges()[__("filament-daterangepicker-filter::message.{$presetKey}")];
    $format = $field->getFormat();
    $timezone = $field->getTimezone();

    return Carbon::parse($range[0], $timezone)->startOfDay()->format($format)
        . $field->getRangeSeparator()
        . Carbon::parse($range[1], $timezone)->endOfDay()->format($format);
}

const DEFAULT_HELPERS = [
    'defaultToday' => 'today',
    'defaultYesterday' => 'yesterday',
    'defaultLast7Days' => 'last_7_days',
    'defaultLast30Days' => 'last_30_days',
    'defaultThisMonth' => 'this_month',
    'defaultLastMonth' => 'last_month',
    'defaultThisYear' => 'this_year',
    'defaultLastYear' => 'last_year',
];

describe('with the time picker, 24h', function () {
    it('starts at the start of the first day and ends at the end of the last', function (string $helper, string $expected) {
        $field = riyadhPicker()->timePicker()->timePicker24()->{$helper}();

        expect(defaultState($field))->toBe($expected);
    })->with([
        'today' => ['defaultToday', '10/06/2026 00:00 - 10/06/2026 23:59'],
        'yesterday' => ['defaultYesterday', '09/06/2026 00:00 - 09/06/2026 23:59'],
        'last 7 days' => ['defaultLast7Days', '04/06/2026 00:00 - 10/06/2026 23:59'],
        'last 30 days' => ['defaultLast30Days', '12/05/2026 00:00 - 10/06/2026 23:59'],
        'this month' => ['defaultThisMonth', '01/06/2026 00:00 - 30/06/2026 23:59'],
        'last month' => ['defaultLastMonth', '01/05/2026 00:00 - 31/05/2026 23:59'],
        'this year' => ['defaultThisYear', '01/01/2026 00:00 - 31/12/2026 23:59'],
        'last year' => ['defaultLastYear', '01/01/2025 00:00 - 31/12/2025 23:59'],
    ]);

    it('matches the same-named preset exactly', function (string $helper, string $preset) {
        $field = riyadhPicker()->timePicker()->timePicker24()->{$helper}();

        expect(defaultState($field))->toBe(presetState($field, $preset));
    })->with(array_map(null, array_keys(DEFAULT_HELPERS), array_values(DEFAULT_HELPERS)));
});

it('ends at 11:59 PM in the 12h format', function () {
    $field = riyadhPicker()->timePicker()->defaultYesterday();

    expect(defaultState($field))->toBe('09/06/2026 12:00 AM - 09/06/2026 11:59 PM')
        ->and(defaultState($field))->toBe(presetState($field, 'yesterday'));
});

it('ends at 23:59:59 when seconds are shown', function (bool $twentyFour, string $expected) {
    $field = riyadhPicker()->timePicker()->timePicker24($twentyFour)->timePickerSecond()->defaultLast7Days();

    expect(defaultState($field))->toBe($expected)
        ->and(defaultState($field))->toBe(presetState($field, 'last_7_days'));
})->with([
    '24h' => [true, '04/06/2026 00:00:00 - 10/06/2026 23:59:59'],
    '12h' => [false, '04/06/2026 12:00:00 AM - 10/06/2026 11:59:59 PM'],
]);

it('does not depend on calling timePicker() before the default', function () {
    $field = riyadhPicker()->defaultYesterday()->timePicker()->timePicker24();

    expect(defaultState($field))->toBe('09/06/2026 00:00 - 09/06/2026 23:59');
});

it('computes the default in the display timezone set after it, like the presets', function () {
    // 22:30 UTC on the 9th is 01:30 on the 10th in Riyadh: "yesterday" is
    // the 9th on screen, not the 8th.
    Carbon::setTestNow(Carbon::parse('2026-06-09 22:30:00', 'UTC'));

    $field = DateRangePicker::make('x')->timePicker()->timePicker24()->defaultYesterday()->timezone('Asia/Riyadh');

    expect(defaultState($field))->toBe('09/06/2026 00:00 - 09/06/2026 23:59')
        ->and(defaultState($field))->toBe(presetState($field, 'yesterday'));
});

it('reads "now" in the Filament display timezone when none is set on the field', function () {
    FilamentTimezone::set('Asia/Riyadh');
    Carbon::setTestNow(Carbon::parse('2026-06-09 22:30:00', 'UTC'));

    $field = DateRangePicker::make('x')->timePicker()->timePicker24()->defaultToday();

    expect(defaultState($field))->toBe('10/06/2026 00:00 - 10/06/2026 23:59');
});

describe('without the time picker', function () {
    it('keeps the dates it always had', function (string $helper, string $expected) {
        expect(defaultState(riyadhPicker()->{$helper}()))->toBe($expected);
    })->with([
        'today' => ['defaultToday', '10/06/2026 - 10/06/2026'],
        'yesterday' => ['defaultYesterday', '09/06/2026 - 09/06/2026'],
        'last 7 days' => ['defaultLast7Days', '04/06/2026 - 10/06/2026'],
        'last 30 days' => ['defaultLast30Days', '12/05/2026 - 10/06/2026'],
        'this month' => ['defaultThisMonth', '01/06/2026 - 30/06/2026'],
        'last month' => ['defaultLastMonth', '01/05/2026 - 31/05/2026'],
        'this year' => ['defaultThisYear', '01/01/2026 - 31/12/2026'],
        'last year' => ['defaultLastYear', '01/01/2025 - 31/12/2025'],
    ]);

    it('keeps the clock time when a time format is enforced without the time picker', function () {
        // Not a time-picker field: unchanged, clock time and all.
        $field = riyadhPicker()->format('d/m/Y H:i', true)->defaultYesterday();

        expect(defaultState($field))->toBe('09/06/2026 15:00 - 09/06/2026 15:00');
    });

    it('still returns Carbon instances from getStartDate() and getEndDate()', function () {
        $field = riyadhPicker()->defaultYesterday();

        expect($field->getStartDate())->toBeInstanceOf(\Carbon\CarbonInterface::class)
            ->and($field->getEndDate())->toBeInstanceOf(\Carbon\CarbonInterface::class);
    });
});

describe('defaultCustom()', function () {
    it('keeps explicit times unchanged', function () {
        $field = riyadhPicker()->timePicker()->timePicker24()->defaultCustom(
            Carbon::parse('2026-06-09 08:30', 'Asia/Riyadh'),
            Carbon::parse('2026-06-09 17:45', 'Asia/Riyadh'),
        );

        expect(defaultState($field))->toBe('09/06/2026 08:30 - 09/06/2026 17:45');
    });

    it('keeps explicit times given as strings unchanged', function () {
        $field = riyadhPicker()->timePicker()->timePicker24()->defaultCustom('2026-06-09 08:30:00', '2026-06-09 17:45:00');

        expect(defaultState($field))->toBe('09/06/2026 08:30 - 09/06/2026 17:45');
    });

    it('keeps an explicit midnight end as midnight', function () {
        $field = riyadhPicker()->timePicker()->timePicker24()->defaultCustom('2026-06-09 00:00:00', '2026-06-10 00:00:00');

        expect(defaultState($field))->toBe('09/06/2026 00:00 - 10/06/2026 00:00');
    });

    it('reads date-only strings as whole days, the way a date-only preset is read', function () {
        $field = riyadhPicker()->timePicker()->timePicker24()->defaultCustom('2026-06-01', '2026-06-05');

        expect(defaultState($field))->toBe('01/06/2026 00:00 - 05/06/2026 23:59');
    });

    it('keeps date-only strings as they were without the time picker', function () {
        $field = riyadhPicker()->defaultCustom('2026-06-01', '2026-06-05');

        expect(defaultState($field))->toBe('01/06/2026 - 05/06/2026');
    });
});

it('does not clamp a default to minDate / maxDate, as the browser does not clamp an initial state', function () {
    // Presets are clamped when clicked (#268); parseState() shows a server
    // state as it is. A default is server state, so it is left alone too.
    $field = riyadhPicker()->timePicker()->timePicker24()
        ->minDate('2026-06-08')
        ->maxDate('2026-06-09')
        ->defaultLast7Days();

    expect(defaultState($field))->toBe('04/06/2026 00:00 - 10/06/2026 23:59');
});

it('builds the same whole-day default for a dual-state field', function () {
    $field = riyadhPicker()->timePicker()->timePicker24()->useDualState('start_date', 'end_date')->defaultYesterday();

    expect(defaultState($field))->toBe('09/06/2026 00:00 - 09/06/2026 23:59');
});
