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
        'jquery.min' => __DIR__ . '/../resources/dist/js/jquery.min.js',
        'moment' => __DIR__ . '/../resources/dist/js/moment.min.js',
        'filament-daterangepicker-filter' => __DIR__ . '/../resources/dist/js/filament-daterangepicker-filter.js',
    ];


    public function configurePackage(Package $package): void
    {
        $package->name(static::$name)->hasViews()->hasTranslations();
    }
}
