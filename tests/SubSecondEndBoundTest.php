<?php

use Filament\Support\Facades\FilamentTimezone;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Schema;
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;

/**
 * The last second of the range must be in it, fraction included.
 *
 * The end of a range is the last microsecond of the picked day, month, year
 * or minute (23:59:59.999999), but Laravel binds a date with the grammar's
 * "Y-m-d H:i:s" format: a whereBetween() compared against 23:59:59 and
 * dropped every row stored at 23:59:59.500 in a column that keeps fractions
 * (timestamp(3), Postgres's default timestamp, DATETIME(6)). The filter now
 * uses an exclusive upper bound on the next whole second, which also keeps
 * the boundary instant out of the next range.
 */
class SubSecondRow extends Model
{
    protected $table = 'sub_second_rows';

    public $timestamps = false;

    protected $guarded = [];
}

beforeEach(function () {
    config(['app.timezone' => 'UTC']);
    FilamentTimezone::set('UTC');
    Carbon::setTestNow(Carbon::parse('2026-10-28 10:00:00', 'UTC'));

    Schema::create('sub_second_rows', function (Blueprint $table) {
        $table->id();
        $table->string('label');
        $table->dateTime('at', precision: 6);
    });

    // Written as text with the fraction, as a database that keeps it returns it.
    SubSecondRow::query()->insert([
        ['label' => 'first instant', 'at' => '2026-08-10 00:00:00.000000'],
        ['label' => 'last second of the day', 'at' => '2026-08-11 23:59:59.500000'],
        ['label' => 'next midnight', 'at' => '2026-08-12 00:00:00.000000'],
        ['label' => 'last second of the minute', 'at' => '2026-08-11 10:05:59.400000'],
        ['label' => 'next minute', 'at' => '2026-08-11 10:06:00.000000'],
    ]);
});

afterEach(function () {
    Schema::dropIfExists('sub_second_rows');
    FilamentTimezone::set(null);
    Carbon::setTestNow();
});

/** @return list<string> */
function subSecondLabels(DateRangeFilter $filter, string $state): array
{
    $query = SubSecondRow::query();
    $filter->apply($query, ['at' => $state]);

    return $query->orderBy('at')->pluck('label')->all();
}

it('keeps a row stored in the last second of the last picked day', function () {
    expect(subSecondLabels(DateRangeFilter::make('at')->format('d/m/Y'), '10/08/2026 - 11/08/2026'))
        ->toBe(['first instant', 'last second of the minute', 'next minute', 'last second of the day']);
});

it('keeps a row stored in the last second of the picked minute', function () {
    $filter = DateRangeFilter::make('at')->format('d/m/Y H:i')->timePicker()->timePicker24();

    expect(subSecondLabels($filter, '11/08/2026 10:00 - 11/08/2026 10:05'))
        ->toBe(['last second of the minute']);
});

it('ends on the next whole second, exclusive', function () {
    $query = SubSecondRow::query();
    DateRangeFilter::make('at')->format('d/m/Y')->apply($query, ['at' => '11/08/2026']);

    $before = collect($query->getQuery()->wheres)->firstWhere('operator', '<');

    expect(Carbon::parse($before['value'])->format('Y-m-d H:i:s.u'))->toBe('2026-08-12 00:00:00.000000');
});
