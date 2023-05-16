<?php

namespace Malzariey\FilamentDaterangepickerFilter;

use Filament\PluginServiceProvider;
use Spatie\LaravelPackageTools\Package;

class FilamentDaterangepickerFilterServiceProvider extends PluginServiceProvider
{
    public static string $name = 'filament-daterangepicker-filter';

    protected array $resources = [
        // CustomResource::class,
    ];

    protected array $pages = [
        // CustomPage::class,
    ];

    protected array $widgets = [
        // CustomWidget::class,
    ];

    protected array $styles = [
        'filament-daterangepicker-filter' => __DIR__ . '/../resources/dist/css/filament-daterangepicker-filter.css',
    ];

    protected array $scripts = [];

    protected array $beforeCoreScripts = [
        'filament-daterangepicker-filter' => __DIR__ . '/../resources/dist/js/filament-daterangepicker-filter.js',
    ];


    public function configurePackage(Package $package): void
    {
        $package->name(static::$name)->hasViews()->hasTranslations();
    }
}
