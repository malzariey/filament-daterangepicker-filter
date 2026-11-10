<?php

use Filament\Support\Facades\FilamentTimezone;
use Malzariey\FilamentDaterangepickerFilter\Fields\DateRangePicker;

/**
 * A default whose time is off the minute increment reaches the browser with
 * that exact time: the server never rounds it to the increment. The browser
 * side (tests/js/DateRangePickerOffIncrementTime.test.js) then shows and
 * keeps it.
 */
beforeEach(function () {
    config(['app.timezone' => 'UTC']);
    FilamentTimezone::set(null);
});

afterEach(function () {
    FilamentTimezone::set(null);
});

it('keeps an off-increment defaultCustom time in the default state', function () {
    $field = DateRangePicker::make('x')
        ->timePicker()
        ->timePicker24()
        ->timePickerIncrement(30)
        ->defaultCustom('2026-11-10 08:45:00', '2026-11-12 17:15:00');

    expect(invade($field)->buildDefaultValue())
        ->toBe('10/11/2026 08:45 - 12/11/2026 17:15');
});
