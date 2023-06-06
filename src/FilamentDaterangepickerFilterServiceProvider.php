<?php

namespace Malzariey\FilamentDaterangepickerFilter;

use Filament\PluginServiceProvider;
use Illuminate\Support\Facades\Vite;
use Spatie\LaravelPackageTools\Package;

class FilamentDaterangepickerFilterServiceProvider extends PluginServiceProvider
{
    public static string $name = 'filament-daterangepicker-filter';
    private static float $version = 1.1;

    protected array $resources = [
        // CustomResource::class,
    ];

    protected array $pages = [
        // CustomPage::class,
    ];

    protected array $widgets = [
        // CustomWidget::class,
    ];

    protected array $styles = [];

    protected array $scripts = [];

    protected array $beforeCoreScripts = [];


    public function configurePackage(Package $package): void
    {
        $this->beforeCoreScripts = [
            'filament-daterangepicker-filter'.static::$version => __DIR__ . '/../dist/filament-daterangepicker.js',
        ];
        $this->styles = [
            'filament-daterangepicker-filter'.static::$version => __DIR__ . '/../dist/filament-daterangepicker.css',
        ];

        $package->name(static::$name)->hasViews()->hasTranslations();
    }
}
