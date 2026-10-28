<?php

use Filament\Support\Facades\FilamentTimezone;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;

/**
 * Month and year pickers must filter whole months and whole years.
 *
 * parseDate() used Carbon::createFromFormat() without the '!' reset, so every
 * field the format does not carry was taken from "now": "06/2026" parsed as
 * today's day of June, and "2025" as today's day and month of 2025. The range
 * then ran start-of-THAT-day to end-of-THAT-day, so a monthly report silently
 * dropped the first days of the first month and the last days of the last one
 * — and on the 29th–31st, February did not parse at all (rolled into March).
 *
 * Display timezone is Asia/Riyadh (UTC+3, no DST), storage is UTC, so the
 * first of the month in Riyadh starts at 21:00 UTC on the last day of the
 * previous month.
 */
class PickerTypeBoundsRow extends Model
{
    protected $table = 'picker_type_bounds_rows';

    public $timestamps = false;

    protected $guarded = [];
}

beforeEach(function () {
    config(['app.timezone' => 'UTC']);
    FilamentTimezone::set('Asia/Riyadh');

    // Mid-month, mid-year: the day/month that used to leak into the bounds.
    Carbon::setTestNow(Carbon::parse('2026-10-28 10:00:00', 'UTC'));
});

afterEach(function () {
    FilamentTimezone::set(null);
    Carbon::setTestNow();
});

function pickerFilter(string $picker, string $format): DateRangeFilter
{
    $filter = DateRangeFilter::make('at')->format($format);

    return match ($picker) {
        'month' => $filter->monthPicker(),
        'year' => $filter->yearPicker(),
        default => $filter,
    };
}

/** @return array{0: string|null, 1: string|null} the whereBetween bounds, UTC */
function pickerBounds(DateRangeFilter $filter, string $state): array
{
    $query = PickerTypeBoundsRow::query();
    $filter->apply($query, ['at' => $state]);

    $where = collect($query->getQuery()->wheres)->firstWhere('type', 'between');

    if ($where === null) {
        return [null, null];
    }

    return array_map(
        fn ($value) => Carbon::parse($value)->utc()->format('Y-m-d H:i:s'),
        $where['values'],
    );
}

dataset('picker bounds', [
    'month m/Y range' => ['month', 'm/Y', '06/2026 - 08/2026', '2026-05-31 21:00:00', '2026-08-31 20:59:59'],
    'month F Y range' => ['month', 'F Y', 'June 2026 - August 2026', '2026-05-31 21:00:00', '2026-08-31 20:59:59'],
    'month lone' => ['month', 'm/Y', '06/2026', '2026-05-31 21:00:00', '2026-06-30 20:59:59'],
    'month lone with trailing separator' => ['month', 'm/Y', '06/2026 - ', '2026-05-31 21:00:00', '2026-06-30 20:59:59'],
    'month same start and end' => ['month', 'm/Y', '06/2026 - 06/2026', '2026-05-31 21:00:00', '2026-06-30 20:59:59'],
    'month leap February' => ['month', 'm/Y', '02/2028', '2028-01-31 21:00:00', '2028-02-29 20:59:59'],
    'month non-leap February' => ['month', 'm/Y', '02/2026', '2026-01-31 21:00:00', '2026-02-28 20:59:59'],
    'month across the new year' => ['month', 'm/Y', '12/2026 - 01/2027', '2026-11-30 21:00:00', '2027-01-31 20:59:59'],
    'month 31-day end' => ['month', 'F Y', 'January 2026 - March 2026', '2025-12-31 21:00:00', '2026-03-31 20:59:59'],
    'year range' => ['year', 'Y', '2025 - 2026', '2024-12-31 21:00:00', '2026-12-31 20:59:59'],
    'year lone' => ['year', 'Y', '2025', '2024-12-31 21:00:00', '2025-12-31 20:59:59'],
    'year leap' => ['year', 'Y', '2028 - 2028', '2027-12-31 21:00:00', '2028-12-31 20:59:59'],
    // The day picker must not move.
    'day range' => ['day', 'd/m/Y', '10/08/2026 - 11/08/2026', '2026-08-09 21:00:00', '2026-08-11 20:59:59'],
    'day lone' => ['day', 'd/m/Y', '11/08/2026', '2026-08-10 21:00:00', '2026-08-11 20:59:59'],
    'day first of month' => ['day', 'd/m/Y', '01/06/2026 - 01/06/2026', '2026-05-31 21:00:00', '2026-06-01 20:59:59'],
    'day Y-m-d' => ['day', 'Y-m-d', '2026-02-28 - 2026-03-01', '2026-02-27 21:00:00', '2026-03-01 20:59:59'],
]);

it('filters whole periods for the picker type', function (string $picker, string $format, string $state, string $from, string $to) {
    expect(pickerBounds(pickerFilter($picker, $format), $state))->toBe([$from, $to]);
})->with('picker bounds');

it('reads the bounds the same on any day of the month', function (string $picker, string $format, string $state, string $from, string $to) {
    // The 31st, the 29th of a leap February, and the first second of a year.
    foreach (['2026-10-31 12:00:00', '2028-02-29 12:00:00', '2026-12-31 20:59:59', '2027-01-01 00:00:00'] as $now) {
        Carbon::setTestNow(Carbon::parse($now, 'UTC'));

        expect(pickerBounds(pickerFilter($picker, $format), $state))->toBe([$from, $to], "now = {$now}");
    }
})->with('picker bounds');

it('does not roll February into March when today is the 31st', function () {
    Carbon::setTestNow(Carbon::parse('2026-10-31 12:00:00', 'Asia/Riyadh'));

    expect(pickerBounds(pickerFilter('month', 'm/Y'), '02/2026'))
        ->toBe(['2026-01-31 21:00:00', '2026-02-28 20:59:59']);
});

it('returns exactly the rows of the picked months', function () {
    DB::statement('drop table if exists picker_type_bounds_rows');
    DB::statement('create table picker_type_bounds_rows (id integer primary key, at datetime)');

    DB::table('picker_type_bounds_rows')->insert([
        ['id' => 1, 'at' => '2026-05-31 20:59:59'], // 23:59:59 on 31 May in Riyadh — out
        ['id' => 2, 'at' => '2026-05-31 21:00:00'], // 00:00 on 1 June in Riyadh — in
        ['id' => 3, 'at' => '2026-06-15 09:00:00'], // mid-June — in
        ['id' => 4, 'at' => '2026-08-31 20:59:59'], // 23:59:59 on 31 Aug in Riyadh — in
        ['id' => 5, 'at' => '2026-08-31 21:00:00'], // 00:00 on 1 Sep in Riyadh — out
        ['id' => 6, 'at' => '2026-06-01 00:00:00'], // 03:00 on 1 June in Riyadh — in
    ]);

    $query = PickerTypeBoundsRow::query();
    pickerFilter('month', 'm/Y')->apply($query, ['at' => '06/2026 - 08/2026']);

    expect($query->orderBy('id')->pluck('id')->all())->toBe([2, 3, 4, 6]);
});

it('ignores an impossible month instead of guessing', function (string $state) {
    expect(pickerBounds(pickerFilter('month', 'm/Y'), $state))->toBe([null, null]);
})->with(['13/2026', '00/2026', 'June 2026']);

it('keeps reading a year-less day format as this year', function () {
    // Riyadh "now" is 28 Oct 2026 13:00.
    expect(pickerBounds(pickerFilter('day', 'd/m'), '10/08 - 11/08'))
        ->toBe(['2026-08-09 21:00:00', '2026-08-11 20:59:59']);
});

it('does not mistake an escaped literal for a year', function () {
    expect(pickerBounds(pickerFilter('day', 'd/m (\l\o\c\a\l)'), '10/08 (local) - 11/08 (local)'))
        ->toBe(['2026-08-09 21:00:00', '2026-08-11 20:59:59']);
});
