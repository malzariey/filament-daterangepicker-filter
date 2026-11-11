<?php

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;

/**
 * A display format with month or day names must filter in every locale.
 *
 * The browser writes the state with Day.js in the page locale
 * (app()->getLocale(), mapped in setLocale() in the JS), so in Arabic
 * `->monthPicker()->format('F Y')` produces "أكتوبر 2026 - نوفمبر 2026".
 * parseDate() read it with Carbon::createFromFormat(), which only knows
 * English names, so the range did not parse and apply() returned every row
 * with no indicator: the filter the user set was silently dropped.
 *
 * The strings below are exactly what Day.js 1.11 writes for each locale
 * (`dayjs.locale(x); dayjs(...).format(...)`), not hand-translated.
 */
class LocalizedFormatRow extends Model
{
    protected $table = 'localized_format_rows';

    public $timestamps = false;

    protected $guarded = [];
}

beforeEach(function () {
    config(['app.timezone' => 'UTC']);
    Carbon::setTestNow(Carbon::parse('2026-10-28 10:00:00', 'UTC'));
});

afterEach(function () {
    app()->setLocale('en');
    Carbon::setTestNow();
});

/** @return array{0: string|null, 1: string|null} the first and the last second the filter lets in */
function localizedBounds(DateRangeFilter $filter, string $state): array
{
    $query = LocalizedFormatRow::query();
    $filter->apply($query, ['at' => $state]);

    $wheres = collect($query->getQuery()->wheres);
    $from = $wheres->firstWhere('operator', '>=');
    $before = $wheres->firstWhere('operator', '<');

    if ($from === null || $before === null) {
        return [null, null];
    }

    // The upper bound is exclusive on the next whole second: report the last
    // second it lets in, so the datasets read as the range the user picked.
    return [
        Carbon::parse($from['value'])->utc()->format('Y-m-d H:i:s'),
        Carbon::parse($before['value'])->utc()->subSecond()->format('Y-m-d H:i:s'),
    ];
}

dataset('month names, F Y month picker', [
    'ar' => ['ar', 'أكتوبر 2026 - نوفمبر 2026'],
    'fa' => ['fa', 'اکتبر 2026 - نوامبر 2026'],
    'de' => ['de', 'Oktober 2026 - November 2026'],
    'fr' => ['fr', 'octobre 2026 - novembre 2026'],
    'ru' => ['ru', 'октябрь 2026 - ноябрь 2026'],
    'he' => ['he', 'אוקטובר 2026 - נובמבר 2026'],
    'ckb' => ['ckb', 'تشرینی یەکەم 2026 - تشرینی دووەم 2026'],
    'zh_CN' => ['zh_CN', '十月 2026 - 十一月 2026'],
    'en' => ['en', 'October 2026 - November 2026'],
]);

it('filters a localized F Y month range', function (string $locale, string $state) {
    app()->setLocale($locale);

    $filter = DateRangeFilter::make('at')->monthPicker()->format('F Y');

    expect(localizedBounds($filter, $state))
        ->toBe(['2026-10-01 00:00:00', '2026-11-30 23:59:59']);
})->with('month names, F Y month picker');

dataset('short month names, d M Y day range', [
    'ar' => ['ar', '06 أكتوبر 2026 - 09 نوفمبر 2026'],
    'fa' => ['fa', '06 اکتبر 2026 - 09 نوامبر 2026'],
    'de' => ['de', '06 Okt. 2026 - 09 Nov. 2026'],
    'fr' => ['fr', '06 oct. 2026 - 09 nov. 2026'],
    'ru' => ['ru', '06 окт. 2026 - 09 нояб. 2026'],
    'he' => ['he', '06 אוק 2026 - 09 נוב 2026'],
    'ckb' => ['ckb', '06 تشرینی یەکەم 2026 - 09 تشرینی دووەم 2026'],
    'zh_CN' => ['zh_CN', '06 10月 2026 - 09 11月 2026'],
    'en' => ['en', '06 Oct 2026 - 09 Nov 2026'],
]);

it('filters a localized d M Y day range', function (string $locale, string $state) {
    app()->setLocale($locale);

    $filter = DateRangeFilter::make('at')->format('d M Y');

    expect(localizedBounds($filter, $state))
        ->toBe(['2026-10-06 00:00:00', '2026-11-09 23:59:59']);
})->with('short month names, d M Y day range');

dataset('day and genitive month names, D d F Y day range', [
    'ar' => ['ar', 'ثلاثاء 03 فبراير 2026 - ثلاثاء 06 أكتوبر 2026'],
    'fa' => ['fa', 'سه‌شنبه 03 فوریه 2026 - سه‌شنبه 06 اکتبر 2026'],
    'de' => ['de', 'Di. 03 Februar 2026 - Di. 06 Oktober 2026'],
    'fr' => ['fr', 'mar. 03 février 2026 - mar. 06 octobre 2026'],
    // Day.js writes the genitive after a day number: "октября", not "октябрь".
    'ru' => ['ru', 'втр 03 февраля 2026 - втр 06 октября 2026'],
    'he' => ['he', 'ג׳ 03 פברואר 2026 - ג׳ 06 אוקטובר 2026'],
    'ckb' => ['ckb', 'سێشەم 03 شوبات 2026 - سێشەم 06 تشرینی یەکەم 2026'],
    'zh_CN' => ['zh_CN', '周二 03 二月 2026 - 周二 06 十月 2026'],
]);

it('filters a localized D d F Y day range', function (string $locale, string $state) {
    app()->setLocale($locale);

    $filter = DateRangeFilter::make('at')->format('D d F Y');

    expect(localizedBounds($filter, $state))
        ->toBe(['2026-02-03 00:00:00', '2026-10-06 23:59:59']);
})->with('day and genitive month names, D d F Y day range');

dataset('full day names, l d/m/Y day range', [
    'ar' => ['ar', 'الثلاثاء 06/10/2026 - الإثنين 09/11/2026'],
    'fa' => ['fa', 'سه‌شنبه 06/10/2026 - دوشنبه 09/11/2026'],
    'de' => ['de', 'Dienstag 06/10/2026 - Montag 09/11/2026'],
    'fr' => ['fr', 'mardi 06/10/2026 - lundi 09/11/2026'],
    'ru' => ['ru', 'вторник 06/10/2026 - понедельник 09/11/2026'],
    'he' => ['he', 'שלישי 06/10/2026 - שני 09/11/2026'],
    'ckb' => ['ckb', 'سێشەممە 06/10/2026 - دووشەممە 09/11/2026'],
    'zh_CN' => ['zh_CN', '星期二 06/10/2026 - 星期一 09/11/2026'],
]);

it('filters a localized l d/m/Y day range', function (string $locale, string $state) {
    app()->setLocale($locale);

    $filter = DateRangeFilter::make('at')->format('l d/m/Y');

    expect(localizedBounds($filter, $state))
        ->toBe(['2026-10-06 00:00:00', '2026-11-09 23:59:59']);
})->with('full day names, l d/m/Y day range');

it('reads a localized 12-hour meridiem', function () {
    app()->setLocale('ar');

    // Day.js 'ar' writes ص / م for AM / PM.
    $filter = DateRangeFilter::make('at')->format('d/m/Y')->timePicker();

    expect(localizedBounds($filter, '06/10/2026 03:30 م - 09/11/2026 11:00 ص'))
        ->toBe(['2026-10-06 15:30:00', '2026-11-09 11:00:59']);
});

it('reads Arabic noon as the picker writes it (12:30 م is PM)', function () {
    app()->setLocale('ar');

    // The picker writes noon as "م" since 5.0.12 (Day.js "ar" wrote "ص", so
    // noon and midnight were both "12:30 ص"); midnight stays "ص".
    $filter = DateRangeFilter::make('at')->format('d/m/Y h:i A', true)->timePicker();

    expect(localizedBounds($filter, '06/10/2026 12:30 م - 06/10/2026 12:45 م'))
        ->toBe(['2026-10-06 12:30:00', '2026-10-06 12:45:59'])
        ->and(localizedBounds($filter, '06/10/2026 12:30 ص - 06/10/2026 12:45 ص'))
        ->toBe(['2026-10-06 00:30:00', '2026-10-06 00:45:59']);
});

it('has no string the picker writes for both an AM and a PM instant', function () {
    $fixture = json_decode(file_get_contents(__DIR__ . '/fixtures/dayjs-round-trip.json'), true);
    $noon = array_search('2026-01-13 12:24', $fixture['samples'], true);

    expect($fixture['ambiguous'])->toBe([])
        ->and($fixture['strings']['ar']['d/m/Y h:i A'][$noon])->toBe('13/01/2026 12:24 م');
});

it('shows the indicator for a localized range it applies', function () {
    app()->setLocale('ar');

    $filter = DateRangeFilter::make('at')->monthPicker()->format('F Y');
    $indicate = fn (mixed $state) => invade($filter)->evaluate(invade($filter)->indicateUsing, ['data' => ['at' => $state]]);

    expect($indicate('أكتوبر 2026 - نوفمبر 2026'))->toContain('أكتوبر 2026 - نوفمبر 2026');
});

it('still reads an English state in a non-English locale', function () {
    // A default built on the server (DateRangePicker::buildDefaultValue()
    // formats with PHP, so in English), or a state persisted before this fix.
    app()->setLocale('ar');

    $filter = DateRangeFilter::make('at')->monthPicker()->format('F Y');

    expect(localizedBounds($filter, 'October 2026 - November 2026'))
        ->toBe(['2026-10-01 00:00:00', '2026-11-30 23:59:59']);
});

it('still ignores a state that does not parse', function () {
    app()->setLocale('ar');

    $filter = DateRangeFilter::make('at')->monthPicker()->format('F Y');

    expect(localizedBounds($filter, 'أكتوبرر 2026 - نوفمبر 2026'))->toBe([null, null])
        ->and(localizedBounds($filter, 'Oktober 2026 - نوفمبر'))->toBe([null, null])
        ->and(localizedBounds($filter, '13 2026 - نوفمبر 2026'))->toBe([null, null]);
});

it('passes the parsed localized dates to modifyQueryUsing', function () {
    app()->setLocale('de');

    $seen = null;

    $filter = DateRangeFilter::make('at')
        ->format('d M Y')
        ->modifyQueryUsing(function ($startDate, $endDate) use (&$seen) {
            $seen = [$startDate?->format('Y-m-d H:i:s'), $endDate?->format('Y-m-d H:i:s')];
        });

    $filter->apply(LocalizedFormatRow::query(), ['at' => '06 Okt. 2026 - 09 Nov. 2026']);

    expect($seen)->toBe(['2026-10-06 00:00:00', '2026-11-09 23:59:59']);
});

/**
 * Every bundled locale, every name format, every month, weekday and hour:
 * the server reads back exactly what Day.js wrote. The strings come from
 * tests/fixtures/dayjs-round-trip.json, which bin/build-locale-names.js
 * generates with Day.js and tests/js/DateRangePickerLocaleNames.test.js keeps
 * current.
 */
it('reads back every string Day.js writes, in every shipped locale', function () {
    $fixture = json_decode(file_get_contents(__DIR__ . '/fixtures/dayjs-round-trip.json'), true);
    $names = json_decode(file_get_contents(__DIR__ . '/../resources/dayjs-locale-names.json'), true);

    $checked = 0;
    $failures = [];

    foreach ($names['resolved'] as $phpLocale => $dayjsLocale) {
        if ($dayjsLocale === 'en') {
            continue;
        }

        app()->setLocale($phpLocale);

        foreach ($fixture['strings'][$dayjsLocale] as $format => $strings) {
            $filter = DateRangeFilter::make('at')->format($format, true);
            $hasTime = str_contains($format, 'i');
            $hasDay = strpbrk($format, 'dj') !== false;

            foreach ($strings as $i => $string) {
                $sample = Carbon::parse($fixture['samples'][$i], 'UTC');

                // Day.js wrote the same text for the AM instant (ar "12:00 ص"
                // is noon and midnight); the server reads the AM one.
                if (in_array($i, $fixture['ambiguous'][$dayjsLocale][$format] ?? [], true)) {
                    $sample->subHours(12);
                }
                $expected = $hasTime ? $sample->format('Y-m-d H:i') : ($hasDay ? $sample->format('Y-m-d') : $sample->format('Y-m'));
                $parsed = invade($filter)->parseDate($string);
                $actual = $parsed?->format($hasTime ? 'Y-m-d H:i' : ($hasDay ? 'Y-m-d' : 'Y-m'));

                $checked++;

                if ($actual !== $expected) {
                    $failures[] = "{$phpLocale} '{$format}' '{$string}': expected {$expected}, got " . ($actual ?? 'null');
                }
            }
        }
    }

    // 33 non-English shipped lang folders (el and nb counted beside their
    // legacy gr and no aliases) x 10 formats x 24 samples.
    expect($failures)->toBe([])
        ->and($checked)->toBe(33 * 10 * 24);
});

it('picks the Day.js locale the browser picks', function (string $locale, string $dayjs) {
    expect(\Malzariey\FilamentDaterangepickerFilter\Support\DayjsDateNames::dayjsLocale($locale))->toBe($dayjs);
})->with([
    ['ar', 'ar'],
    ['ar_SA', 'ar'],
    ['ckb', 'ku'],
    ['el', 'el'],
    ['gr', 'el'],
    ['nb', 'nb'],
    ['no', 'nb'],
    ['pt_BR', 'pt-br'],
    ['zh_CN', 'zh-cn'],
    ['de_AT', 'de'],
    ['en', 'en'],
    ['en_US', 'en'],
    ['xx', 'en'],
]);

it('reads a regional locale with its language names', function () {
    app()->setLocale('ar_SA');

    $filter = DateRangeFilter::make('at')->monthPicker()->format('F Y');

    expect(localizedBounds($filter, 'أكتوبر 2026 - نوفمبر 2026'))
        ->toBe(['2026-10-01 00:00:00', '2026-11-30 23:59:59']);
});

it('reads the names when the request locale is not the page locale', function () {
    // Livewire update requests skip non-persistent panel middleware, so a
    // panel that sets "ar" there applies the filter with app()->getLocale()
    // still "en"; the Arabic state the browser wrote must still filter.
    app()->setLocale('en');

    $filter = DateRangeFilter::make('at')->monthPicker()->format('F Y');

    expect(localizedBounds($filter, 'أكتوبر 2026 - نوفمبر 2026'))
        ->toBe(['2026-10-01 00:00:00', '2026-11-30 23:59:59'])
        ->and(localizedBounds($filter, 'octobre 2026 - novembre 2026'))
        ->toBe(['2026-10-01 00:00:00', '2026-11-30 23:59:59']);
});
