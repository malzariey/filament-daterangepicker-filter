<?php

namespace Malzariey\FilamentDaterangepickerFilter\Tests;

use BladeUI\Heroicons\BladeHeroiconsServiceProvider;
use BladeUI\Icons\BladeIconsServiceProvider;
use Filament\Forms\FormsServiceProvider;
use Filament\Schemas\SchemasServiceProvider;
use Filament\Support\SupportServiceProvider;
use Livewire\LivewireServiceProvider;
use Malzariey\FilamentDaterangepickerFilter\FilamentDaterangepickerFilterServiceProvider;
use Orchestra\Testbench\TestCase as Orchestra;

class TestCase extends Orchestra
{
    protected function getPackageProviders($app): array
    {
        return [
            BladeIconsServiceProvider::class,
            BladeHeroiconsServiceProvider::class,
            SupportServiceProvider::class,
            SchemasServiceProvider::class,
            FormsServiceProvider::class,
            LivewireServiceProvider::class,
            FilamentDaterangepickerFilterServiceProvider::class,
        ];
    }

    protected function getEnvironmentSetUp($app): void
    {
        config()->set('database.default', 'testing');

        // phpunit.xml is gitignored, so nothing else provides a key; rendering
        // a Livewire form (dual-state tests) needs one for the session/CSRF.
        config()->set('app.key', 'base64:'.base64_encode(str_repeat('k', 32)));
    }
}
