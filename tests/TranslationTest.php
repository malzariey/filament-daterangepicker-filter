<?php

use Illuminate\Support\Facades\App;

/*
 * The filter indicator is built from the `period` string. A locale whose
 * string drops :label or :period shows a bare word with no dates (fa and ckb
 * did until 5.0.11).
 */

$locales = array_map('basename', glob(__DIR__ . '/../resources/lang/*', GLOB_ONLYDIR));

it('keeps both placeholders in every locale\'s period string', function (string $locale) {
    $strings = require __DIR__ . "/../resources/lang/{$locale}/message.php";

    expect($strings)->toHaveKey('period')
        ->and($strings['period'])->toContain(':label')
        ->and($strings['period'])->toContain(':period');
})->with($locales);

it('renders the label and the dates in every locale', function (string $locale) {
    App::setLocale($locale);

    $text = __('filament-daterangepicker-filter::message.period', [
        'label' => 'LBL',
        'period' => '01/06/2026 - 10/06/2026',
    ]);

    expect($text)->toContain('LBL')
        ->and($text)->toContain('01/06/2026 - 10/06/2026');
})->with($locales);

/*
 * Laravel and Filament name Greek "el" and Norwegian Bokmål "nb". Until 5.0.12
 * the strings sat only under "gr" and "no", so an app on "el" or "nb" got the
 * English picker. The legacy folders stay as aliases of the real ones.
 */
it('loads the :dataset strings for the locale Laravel uses and its legacy alias', function (string $locale, string $alias, array $expected) {
    foreach ([$locale, $alias] as $code) {
        App::setLocale($code);

        foreach ($expected as $key => $value) {
            expect(__("filament-daterangepicker-filter::message.{$key}"))->toBe($value, "{$code}.{$key}");
        }
    }

    expect(require __DIR__ . "/../resources/lang/{$alias}/message.php")
        ->toBe(require __DIR__ . "/../resources/lang/{$locale}/message.php");
})->with([
    'Greek' => ['el', 'gr', ['apply' => 'Εφαρμογή', 'cancel' => 'Ακύρωση', 'today' => 'Σήμερα', 'october' => 'Οκτώβριος']],
    'Norwegian' => ['nb', 'no', ['apply' => 'Bruk', 'cancel' => 'Avbryt', 'today' => 'I dag', 'october' => 'Oktober']],
]);
