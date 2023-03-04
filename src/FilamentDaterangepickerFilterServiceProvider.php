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
        'daterangepicker' => __DIR__.'/../resources/dist/css/daterangepicker.css',
    ];

    protected array $scripts = [
    ];

     protected array $beforeCoreScripts = [
         'jquery' => __DIR__.'/../resources/dist/js/jquery.min.js',
         'moment' => __DIR__.'/../resources/dist/js/moment.min.js',
         'daterangepicker' => __DIR__.'/../resources/dist/js/daterangepicker.min.js',
     ];

    public function configurePackage(Package $package): void
    {
        $package->name(static::$name)->hasViews();
    }
}
