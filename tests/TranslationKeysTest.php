<?php

/**
 * Every locale must define every key the English file does. A missing key
 * does not fail loudly: Laravel falls back to English (or to the raw key),
 * so the gap only shows as an English label inside a translated picker.
 */
$langPath = dirname(__DIR__) . '/resources/lang';

$locales = array_values(array_filter(
    array_map('basename', glob($langPath . '/*', GLOB_ONLYDIR)),
    fn (string $locale) => $locale !== 'en',
));

it('has locales to compare against English', function () use ($locales) {
    expect($locales)->not->toBeEmpty();
});

it('defines every English key in :dataset', function (string $locale) use ($langPath) {
    foreach (glob($langPath . '/en/*.php') as $englishFile) {
        $file = basename($englishFile);
        $localeFile = "{$langPath}/{$locale}/{$file}";

        expect($localeFile)->toBeFile();

        $missing = array_diff(
            array_keys(require $englishFile),
            array_keys(require $localeFile),
        );

        expect(array_values($missing))->toBe([], "{$locale}/{$file} is missing: " . implode(', ', $missing));
    }
})->with($locales);

it('has no empty translation in :dataset', function (string $locale) use ($langPath) {
    foreach (glob("{$langPath}/{$locale}/*.php") as $localeFile) {
        $empty = array_keys(array_filter(require $localeFile, fn ($value) => trim((string) $value) === ''));

        expect($empty)->toBe([], basename(dirname($localeFile)) . ' has empty: ' . implode(', ', $empty));
    }
})->with($locales);
