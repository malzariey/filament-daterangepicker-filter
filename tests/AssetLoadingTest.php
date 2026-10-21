<?php

use Filament\Support\Assets\Css;
use Filament\Support\Facades\FilamentAsset;

describe('Asset Loading', function () {
    it('registers the stylesheet as loaded on request', function () {
        $styles = collect(FilamentAsset::getStyles(['malzariey/filament-daterangepicker-filter']))
            ->filter(fn ($asset) => $asset instanceof Css && $asset->getId() === 'date-range-picker');

        expect($styles)->toHaveCount(1)
            ->and($styles->first()->isLoadedOnRequest())->toBeTrue();
    });

    it('loads the stylesheet from the field view', function () {
        $view = file_get_contents(__DIR__ . '/../resources/views/date-range-picker.blade.php');

        expect($view)->toContain("x-load-css=\"[@js(\\Filament\\Support\\Facades\\FilamentAsset::getStyleHref('date-range-picker', package: 'malzariey/filament-daterangepicker-filter'))]\"");
    });
});
