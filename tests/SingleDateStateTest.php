<?php

use Carbon\CarbonInterface;
use Filament\Support\Facades\FilamentTimezone;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;

/**
 * Filter state that is not a complete "start - end" pair.
 *
 * Picking only the first end of a range leaves a lone date in the filter
 * state, and Filament persists filter state per user. apply() exploded that
 * into one element and handed the raw string to modifyQueryUsing as
 * $startDate, so a closure typed ?CarbonInterface threw a TypeError — and the
 * table answered 500 on every visit for that user until the session expired.
 * Unparseable state threw InvalidFormatException the same way.
 *
 * A lone date now means that whole day; anything unparseable filters nothing.
 */
class SingleDateStateRow extends Model
{
    protected $table = 'single_date_state_rows';

    public $timestamps = false;

    protected $guarded = [];
}

beforeEach(function () {
    config(['app.timezone' => 'UTC']);
    FilamentTimezone::set(null);

    DB::statement('drop table if exists single_date_state_rows');
    DB::statement('create table single_date_state_rows (id integer primary key, at datetime)');

    DB::table('single_date_state_rows')->insert([
        ['id' => 1, 'at' => '2026-08-10 23:59:59'], // the day before
        ['id' => 2, 'at' => '2026-08-11 00:00:00'], // first second of the day
        ['id' => 3, 'at' => '2026-08-11 23:59:59'], // last second of the day
        ['id' => 4, 'at' => '2026-08-12 00:00:00'], // the day after
        ['id' => 5, 'at' => '2026-08-10 22:30:00'], // 01:30 on the 11th in Riyadh
    ]);
});

afterEach(fn () => FilamentTimezone::set(null));

function singleDateIds(DateRangeFilter $filter, mixed $state): array
{
    $query = SingleDateStateRow::query();
    $filter->apply($query, ['at' => $state]);

    return $query->orderBy('id')->pluck('id')->all();
}

it('reads a lone date as that whole day', function () {
    $filter = DateRangeFilter::make('at')->format('Y-m-d');

    expect(singleDateIds($filter, '2026-08-11'))->toBe([2, 3]);
});

it('reads a lone date with a trailing separator as that whole day', function () {
    // What the picker can leave behind when only the start was chosen.
    $filter = DateRangeFilter::make('at')->format('Y-m-d');

    expect(singleDateIds($filter, '2026-08-11 - '))->toBe([2, 3]);
});

it('reads a lone date in the display timezone', function () {
    FilamentTimezone::set('Asia/Riyadh');

    $filter = DateRangeFilter::make('at')->format('Y-m-d');

    // 11 Aug in Riyadh runs 10 Aug 21:00 → 11 Aug 20:59:59 UTC, so rows 1
    // and 5 (late on the 10th in UTC) are in and row 3 (02:59 on the 12th
    // locally) is out.
    expect(singleDateIds($filter, '2026-08-11'))->toBe([1, 2, 5]);
});

it('reads a lone date-time under timePicker as that whole day', function () {
    $filter = DateRangeFilter::make('at')->format('Y-m-d')->timePicker()->timePicker24();

    expect(singleDateIds($filter, '2026-08-11 10:30'))->toBe([2, 3]);
});

it('hands Carbon instances, never strings, to modifyQueryUsing for a lone date', function () {
    $received = [];

    $filter = DateRangeFilter::make('at')
        ->format('Y-m-d')
        ->modifyQueryUsing(function (Builder $query, ?CarbonInterface $startDate, ?CarbonInterface $endDate) use (&$received): Builder {
            $received = [$startDate?->toDateTimeString(), $endDate?->toDateTimeString()];

            return $query
                ->when($startDate, fn (Builder $q) => $q->where('at', '>=', $startDate))
                ->when($endDate, fn (Builder $q) => $q->where('at', '<=', $endDate));
        });

    expect(singleDateIds($filter, '2026-08-11'))->toBe([2, 3])
        ->and($received)->toBe(['2026-08-11 00:00:00', '2026-08-11 23:59:59']);
});

it('ignores state it cannot parse instead of throwing', function (mixed $state) {
    $filter = DateRangeFilter::make('at')->format('Y-m-d');

    expect(singleDateIds($filter, $state))->toBe([1, 2, 3, 4, 5]);
})->with([
    'garbage' => 'not-a-date',
    'impossible day' => '2026-02-31',
    'impossible day in a range' => '2026-02-01 - 2026-02-31',
    'wrong format' => '11/08/2026',
    'half garbage range' => '2026-08-11 - nope',
    'three parts' => '2026-08-01 - 2026-08-02 - 2026-08-03',
    'separator only' => ' - ',
    'array' => [['2026-08-11']],
    'integer' => 20260811,
]);

it('passes nulls to modifyQueryUsing for state it cannot parse', function () {
    $received = 'not called';

    $filter = DateRangeFilter::make('at')
        ->format('Y-m-d')
        ->modifyQueryUsing(function (Builder $query, ?CarbonInterface $startDate, ?CarbonInterface $endDate) use (&$received): Builder {
            $received = [$startDate, $endDate];

            return $query;
        });

    singleDateIds($filter, 'not-a-date');

    expect($received)->toBe([null, null]);
});

it('still filters a complete range exactly as before', function () {
    $filter = DateRangeFilter::make('at')->format('Y-m-d');

    expect(singleDateIds($filter, '2026-08-10 - 2026-08-11'))->toBe([1, 2, 3, 5]);
});

it('shows an indicator for a lone date but none for state it ignores', function () {
    $filter = DateRangeFilter::make('at')->format('Y-m-d');
    $indicate = fn (mixed $state) => invade($filter)->evaluate(invade($filter)->indicateUsing, ['data' => ['at' => $state]]);

    expect($indicate('2026-08-11'))->not->toBeNull()
        ->and($indicate('not-a-date'))->toBeNull();
});
