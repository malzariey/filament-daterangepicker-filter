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
