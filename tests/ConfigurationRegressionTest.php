<?php

use Carbon\CarbonImmutable;
use Filament\Support\Facades\FilamentTimezone;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Malzariey\FilamentDaterangepickerFilter\Fields\DateRangePicker;
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;

/**
 * Setters that accept a type their getters (or the field they forward to)
 * could not handle, and the time-picker end bound.
 */
class ConfigurationRegressionRow extends Model
{
    protected $table = 'configuration_regression_rows';

    public $timestamps = false;

    protected $guarded = [];
}

it('accepts a closure for the filter first day of week, e.g. Saturday', function () {
    // firstDayOfWeek(int|Closure) assigned into an int|null property, so a
    // closure threw a TypeError before the filter was even rendered.
    $filter = DateRangeFilter::make('at')->firstDayOfWeek(fn () => 6);

    expect($filter->getSchemaComponents()[0]->getFirstDayOfWeek())->toBe(6);
});

it('accepts a closure for the field first day of week', function () {
    expect(DateRangePicker::make('x')->firstDayOfWeek(fn () => 6)->getFirstDayOfWeek())->toBe(6);
});

it('evaluates a closure passed to autoApply()', function () {
    // getAutoApply() returned the raw property, so a closure threw
    // "Return value must be of type bool, Closure returned" on render.
    expect(DateRangePicker::make('x')->autoApply(fn () => true)->getAutoApply())->toBeTrue()
        ->and(DateRangeFilter::make('at')->autoApply(fn () => true)->getSchemaComponents()[0]->getAutoApply())->toBeTrue();
});

it('builds the default value from string start and end dates', function () {
    // startDate()/endDate()/defaultCustom() accept strings, but the default
    // value called ->format() on them: "Call to a member function format() on string".
    $field = DateRangePicker::make('x')->format('d/m/Y')->defaultCustom('2026-08-01', '2026-08-05');

    expect(invade($field)->buildDefaultValue())->toBe('01/08/2026 - 05/08/2026');
});

it('builds the default value from strings with Carbon strict mode off', function () {
    // Non-strict createFromFormat() returns null instead of throwing; the
    // Carbon::parse() fallback must still run.
    \Carbon\Carbon::useStrictMode(false);

    try {
        $field = DateRangePicker::make('x')->format('d/m/Y')->defaultCustom('2026-08-01', '2026-08-05');

        expect(invade($field)->buildDefaultValue())->toBe('01/08/2026 - 05/08/2026');
    } finally {
        \Carbon\Carbon::useStrictMode(true);
    }
});

it('builds the default value from strings already in the field format', function () {
    $field = DateRangePicker::make('x')->format('d/m/Y')->defaultCustom('01/08/2026', '05/08/2026');

    expect(invade($field)->buildDefaultValue())->toBe('01/08/2026 - 05/08/2026');
});

it('sends immutable Carbon presets as plain dates', function () {
    // Only Carbon\Carbon was converted; a CarbonImmutable reached @js() as
    // a UTC ISO timestamp, which the browser reads in its own zone — the
    // previous day anywhere west of UTC.
    $ranges = DateRangePicker::make('x')
        ->ranges(['Week' => [CarbonImmutable::parse('2026-08-01'), CarbonImmutable::parse('2026-08-07')]])
        ->getRanges();

    expect($ranges['Week'])->toBe(['2026-08-01', '2026-08-07']);
});

it('includes the whole last minute of a time-picker range without seconds', function () {
    // The picker writes "23:59" as the end of Today; read as 23:59:00 it
    // dropped every row in the last 59 seconds of the range.
    config(['app.timezone' => 'UTC']);
    FilamentTimezone::set(null);

    DB::statement('drop table if exists configuration_regression_rows');
    DB::statement('create table configuration_regression_rows (id integer primary key, at datetime)');
    DB::table('configuration_regression_rows')->insert([
        ['id' => 1, 'at' => '2026-08-11 00:00:00'],
        ['id' => 2, 'at' => '2026-08-11 23:59:30'],
        ['id' => 3, 'at' => '2026-08-12 00:00:00'],
    ]);

    $filter = DateRangeFilter::make('at')->format('Y-m-d')->timePicker()->timePicker24();

    $query = ConfigurationRegressionRow::query();
    $filter->apply($query, ['at' => '2026-08-11 00:00 - 2026-08-11 23:59']);

    expect($query->orderBy('id')->pluck('id')->all())->toBe([1, 2]);
});

it('keeps an exact end second when the time picker shows seconds', function () {
    config(['app.timezone' => 'UTC']);

    $filter = DateRangeFilter::make('at')->format('Y-m-d')->timePicker()->timePicker24()->timePickerSecond();

    $bindings = [];
    $filter->modifyQueryUsing(function ($query, $startDate, $endDate) use (&$bindings) {
        $bindings = [$startDate->toDateTimeString(), $endDate->toDateTimeString()];

        return $query;
    });

    $filter->apply(ConfigurationRegressionRow::query(), ['at' => '2026-08-11 00:00:00 - 2026-08-11 10:15:20']);

    expect($bindings)->toBe(['2026-08-11 00:00:00', '2026-08-11 10:15:20']);
});
