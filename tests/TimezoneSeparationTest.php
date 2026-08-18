<?php

use Filament\Support\Facades\FilamentTimezone;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;

/**
 * The picked dates are read in the timezone on screen; the column is compared
 * in the timezone it is stored in. They are only the same thing until somebody
 * calls FilamentTimezone::set().
 *
 * Reading the storage zone off the display setting made the conversion in
 * apply() a no-op, so local wall-clock reached the query and every row in the
 * first hours of a local day was filed under the day before — silently, which
 * is the worst way for a date filter to be wrong.
 */
class TimezoneSeparationRow extends Model
{
    protected $table = 'timezone_separation_rows';

    public $timestamps = false;

    protected $guarded = [];
}

beforeEach(function () {
    config(['app.timezone' => 'UTC']);
    FilamentTimezone::set(null);

    DB::statement('drop table if exists timezone_separation_rows');
    DB::statement('create table timezone_separation_rows (id integer primary key, at datetime)');

    DB::table('timezone_separation_rows')->insert([
        // 01:00 on the 18th in Riyadh (+03), stored UTC.
        ['id' => 1, 'at' => '2026-08-17 22:00:00'],
        // 20:00 on the 17th in Riyadh — the day before.
        ['id' => 2, 'at' => '2026-08-17 17:00:00'],
        // 15:00 on the 18th in Riyadh.
        ['id' => 3, 'at' => '2026-08-18 12:00:00'],
    ]);
});

afterEach(fn () => FilamentTimezone::set(null));

function filterIds(DateRangeFilter $filter, string $range): array
{
    $query = TimezoneSeparationRow::query();
    $filter->apply($query, ['at' => $range]);

    return $query->pluck('id')->all();
}

it('reads the storage timezone from the application, not from the display setting', function () {
    FilamentTimezone::set('Asia/Riyadh');

    $filter = DateRangeFilter::make('at')->useColumn('at')->format('Y-m-d');

    expect($filter->getTimezone())->toBe('Asia/Riyadh')
        ->and($filter->getSystemTimezone())->toBe('UTC');
});

it('matches a row that falls on the picked day in the displayed timezone', function () {
    FilamentTimezone::set('Asia/Riyadh');

    $filter = DateRangeFilter::make('at')->useColumn('at')->format('Y-m-d');

    // Row 1 is 01:00 on the 18th in Riyadh even though the column says the
    // 17th, and row 2 is the 17th locally even though it is within three hours
    // of it.
    expect(filterIds($filter, '2026-08-18 - 2026-08-18'))->toBe([1, 3]);
});

it('behaves exactly as before when nobody has set a display timezone', function () {
    // The overwhelmingly common install: FilamentTimezone falls back to
    // config('app.timezone'), so both zones are the application's and nothing
    // about this changed.
    $filter = DateRangeFilter::make('at')->useColumn('at')->format('Y-m-d');

    expect($filter->getTimezone())->toBe('UTC')
        ->and($filter->getSystemTimezone())->toBe('UTC')
        ->and(filterIds($filter, '2026-08-18 - 2026-08-18'))->toBe([3]);
});

it('lets a column stored outside the application timezone say so', function () {
    FilamentTimezone::set('Asia/Riyadh');

    // The escape hatch: a legacy column written in local time.
    $filter = DateRangeFilter::make('at')
        ->useColumn('at')
        ->format('Y-m-d')
        ->systemTimezone('Asia/Riyadh');

    expect($filter->getSystemTimezone())->toBe('Asia/Riyadh')
        ->and(filterIds($filter, '2026-08-18 - 2026-08-18'))->toBe([3]);
});

it('keeps an explicit input timezone independent of the display setting', function () {
    FilamentTimezone::set('Asia/Riyadh');

    $filter = DateRangeFilter::make('at')
        ->useColumn('at')
        ->format('Y-m-d')
        ->timezone('UTC');

    expect($filter->getTimezone())->toBe('UTC')
        ->and($filter->getSystemTimezone())->toBe('UTC')
        ->and(filterIds($filter, '2026-08-18 - 2026-08-18'))->toBe([3]);
});
