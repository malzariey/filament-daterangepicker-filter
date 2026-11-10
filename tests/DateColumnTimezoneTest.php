<?php

use Carbon\CarbonInterface;
use Filament\Support\Facades\FilamentTimezone;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;

/**
 * A DATE column holds a calendar date, not an instant: there is nothing to
 * convert between timezones. Shifting the picked day into the storage zone
 * turned "1 June" in New York into 04:00 on 1 June → 03:59:59 on 2 June, and
 * a date column compared against that returns 2 June. East of UTC the shift
 * goes the other way and the string comparison happened to hide it.
 *
 * Datetime columns keep the shift: that half is TimezoneSeparationTest.
 */
class DateColumnRow extends Model
{
    protected $table = 'date_column_rows';

    public $timestamps = false;

    protected $guarded = [];
}

/** A date stored in a DATETIME column, declared a date by its cast. */
class DateCastRow extends Model
{
    protected $table = 'date_cast_rows';

    public $timestamps = false;

    protected $guarded = [];

    protected $casts = ['d' => 'date'];
}

class ImmutableDateCastRow extends DateCastRow
{
    protected $casts = ['d' => 'immutable_date'];
}

class CustomFormatDateCastRow extends DateCastRow
{
    protected $casts = ['d' => 'date:Y-m-d'];
}

/** A DATE column the model wrongly casts as a datetime: the column wins. */
class DatetimeCastOnDateColumnRow extends DateColumnRow
{
    protected $casts = ['d' => 'datetime'];
}

class DateColumnInstantRow extends Model
{
    protected $table = 'date_column_instant_rows';

    public $timestamps = false;

    protected $guarded = [];
}

beforeEach(function () {
    config(['app.timezone' => 'UTC']);
    FilamentTimezone::set(null);

    DB::statement('drop table if exists date_column_rows');
    DB::statement('create table date_column_rows (id integer primary key, d date)');
    DB::table('date_column_rows')->insert([
        ['id' => 1, 'd' => '2026-05-31'],
        ['id' => 2, 'd' => '2026-06-01'],
        ['id' => 3, 'd' => '2026-06-02'],
        ['id' => 4, 'd' => '2026-06-03'],
        ['id' => 5, 'd' => '2026-06-30'],
        ['id' => 6, 'd' => '2026-07-01'],
        ['id' => 7, 'd' => '2025-12-31'],
        ['id' => 8, 'd' => '2026-01-01'],
        ['id' => 9, 'd' => '2026-12-31'],
        ['id' => 10, 'd' => '2027-01-01'],
    ]);

    // A `date` cast written by Eloquent lands as "Y-m-d 00:00:00".
    DB::statement('drop table if exists date_cast_rows');
    DB::statement('create table date_cast_rows (id integer primary key, d datetime)');
    DB::table('date_cast_rows')->insert([
        ['id' => 1, 'd' => '2026-05-31 00:00:00'],
        ['id' => 2, 'd' => '2026-06-01 00:00:00'],
        ['id' => 3, 'd' => '2026-06-02 00:00:00'],
    ]);

    DB::statement('drop table if exists date_column_instant_rows');
    DB::statement('create table date_column_instant_rows (id integer primary key, at datetime)');
    DB::table('date_column_instant_rows')->insert([
        // 01:30 on 2 June in Riyadh.
        ['id' => 1, 'at' => '2026-06-01 22:30:00'],
        // 23:59 on 1 June in Riyadh.
        ['id' => 2, 'at' => '2026-06-01 20:59:00'],
    ]);
});

afterEach(fn () => FilamentTimezone::set(null));

function dateColumnIds(Builder $query, DateRangeFilter $filter, string $state): array
{
    $filter->apply($query, [$filter->getName() => $state]);

    return $query->orderBy('id')->pluck('id')->all();
}

dataset('display timezones', [
    'New York (west of UTC)' => 'America/New_York',
    'Riyadh (east of UTC)' => 'Asia/Riyadh',
    'UTC' => 'UTC',
]);

it('matches only the picked day on a date column', function (string $tz) {
    FilamentTimezone::set($tz);

    expect(dateColumnIds(DateColumnRow::query(), DateRangeFilter::make('d'), '01/06/2026'))->toBe([2]);
})->with('display timezones');

it('keeps both ends of a range on a date column', function (string $tz) {
    FilamentTimezone::set($tz);

    expect(dateColumnIds(DateColumnRow::query(), DateRangeFilter::make('d'), '01/06/2026 - 02/06/2026'))
        ->toBe([2, 3]);
})->with('display timezones');

it('matches a whole month on a date column', function (string $tz) {
    FilamentTimezone::set($tz);

    $filter = DateRangeFilter::make('d')->monthPicker()->format('m/Y');

    expect(dateColumnIds(DateColumnRow::query(), $filter, '06/2026 - 06/2026'))->toBe([2, 3, 4, 5]);
})->with('display timezones');

it('matches a whole year on a date column', function (string $tz) {
    FilamentTimezone::set($tz);

    $filter = DateRangeFilter::make('d')->yearPicker()->format('Y');

    expect(dateColumnIds(DateColumnRow::query(), $filter, '2026 - 2026'))->toBe([1, 2, 3, 4, 5, 6, 8, 9]);
})->with('display timezones');

it('uses only the dates of a time-picker range on a date column', function (string $tz) {
    FilamentTimezone::set($tz);

    $filter = DateRangeFilter::make('d')->timePicker()->timePicker24();

    expect(dateColumnIds(DateColumnRow::query(), $filter, '01/06/2026 22:00 - 02/06/2026 01:00'))
        ->toBe([2, 3]);
})->with('display timezones');

it('treats a date cast on a datetime column as a calendar date', function (string $model, string $tz) {
    FilamentTimezone::set($tz);

    expect(dateColumnIds($model::query(), DateRangeFilter::make('d'), '01/06/2026'))->toBe([2]);
})->with([
    'date' => DateCastRow::class,
    'immutable_date' => ImmutableDateCastRow::class,
    'date:Y-m-d' => CustomFormatDateCastRow::class,
])->with('display timezones');

it('trusts the column type over a datetime cast', function () {
    FilamentTimezone::set('America/New_York');

    expect(dateColumnIds(DatetimeCastOnDateColumnRow::query(), DateRangeFilter::make('d'), '01/06/2026'))->toBe([2]);
});

it('detects a date column named with its table', function () {
    FilamentTimezone::set('America/New_York');

    $filter = DateRangeFilter::make('d')->useColumn('date_column_rows.d');

    $query = DateColumnRow::query();
    $filter->apply($query, ['date_column_rows' => ['d' => '01/06/2026']]);

    expect($query->orderBy('id')->pluck('id')->all())->toBe([2]);
});

it('compares calendar dates with portable string bounds', function () {
    FilamentTimezone::set('America/New_York');

    $query = DateColumnRow::query();
    DateRangeFilter::make('d')->apply($query, ['d' => '01/06/2026 - 02/06/2026']);

    // Day after the end, exclusive: also matches "Y-m-d 00:00:00" text that
    // SQLite keeps for a date written by Eloquent.
    expect($query->toBase()->wheres)->toHaveCount(2)
        ->and($query->getBindings())->toBe(['2026-06-01', '2026-06-03']);
});

it('still shifts a datetime column into the storage timezone', function () {
    // The half of the contract this must not touch: 22:30 UTC on 1 June is
    // 2 June in Riyadh.
    FilamentTimezone::set('Asia/Riyadh');

    $filter = DateRangeFilter::make('at');

    expect(dateColumnIds(DateColumnInstantRow::query(), $filter, '02/06/2026'))->toBe([1])
        ->and(dateColumnIds(DateColumnInstantRow::query(), $filter, '01/06/2026'))->toBe([2]);
});

it('hands modifyQueryUsing the same shifted bounds as before on a date column', function () {
    // Existing callbacks were written against these bounds; they stay.
    FilamentTimezone::set('America/New_York');

    $received = null;

    $filter = DateRangeFilter::make('d')
        ->modifyQueryUsing(function (Builder $query, ?CarbonInterface $startDate, ?CarbonInterface $endDate) use (&$received): Builder {
            $received = [$startDate?->format('Y-m-d H:i:s e'), $endDate?->format('Y-m-d H:i:s e')];

            return $query;
        });

    $filter->apply(DateColumnRow::query(), ['d' => '01/06/2026']);

    expect($received)->toBe(['2026-06-01 04:00:00 UTC', '2026-06-02 03:59:59 UTC']);
});

it('ignores an unknown column instead of failing the table', function () {
    FilamentTimezone::set('America/New_York');

    $query = DateColumnRow::query();
    DateRangeFilter::make('missing')->apply($query, ['missing' => '01/06/2026']);

    // No date column to detect: the instant comparison, as before.
    expect($query->getBindings()[0]->format('Y-m-d H:i:s'))->toBe('2026-06-01 04:00:00');
});
