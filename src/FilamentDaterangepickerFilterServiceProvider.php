<?php

namespace Malzariey\FilamentDaterangepickerFilter;

use Composer\InstalledVersions;
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

    public function packageBooted(): void
    {
        FilamentAsset::register($this->getAssets(), package: $this->getAssetPackageName());
    }

    protected function getAssetPackageName(): ?string
    {
        return 'filament-daterangepicker-filter';
    }

    protected function getAssets(): array
    {
        static::$version = InstalledVersions::getVersion('malzariey/filament-daterangepicker-filter');
        $assetId = $this->getAssetPackageName() . static::$version;

        return [
            Js::make($assetId, __DIR__ . '/../dist/filament-daterangepicker.js'),
            Css::make($assetId, __DIR__ . '/../dist/filament-daterangepicker.css'),
        ];
    }
}
