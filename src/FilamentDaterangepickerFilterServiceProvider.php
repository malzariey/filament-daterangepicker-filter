<?php

namespace Malzariey\FilamentDaterangepickerFilter;

use Composer\InstalledVersions;
use Filament\Support\Assets\AlpineComponent;
use Filament\Support\Assets\Css;
use Filament\Support\Assets\Js;
use Filament\Support\Facades\FilamentAsset;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class FilamentDaterangepickerFilterServiceProvider extends PackageServiceProvider
{
    public static string $name = 'filament-daterangepicker-filter';
    private static string $version = 'dev';

    public function configurePackage(Package $package): void
    {
        $package->name(static::$name)
            ->hasViews()
            ->hasTranslations();
    }

    public function packageRegistered(): void
    {
        $assets = [
            AlpineComponent::make('dateRangeComponent', __DIR__ . '/../dist/filament-daterangepicker.js'),
            Css::make('date-range-picker', __DIR__ . '/../dist/filament-daterangepicker.css'),
        ];

        FilamentAsset::register($assets, 'malzariey/filament-daterangepicker-filter');
    }
}
