<?php

namespace Malzariey\FilamentDaterangepickerFilter\Tests;

use Filament\FilamentServiceProvider;
use Livewire\LivewireServiceProvider;
use Orchestra\Testbench\TestCase as Orchestra;
use Malzariey\FilamentDaterangepickerFilter\FilamentDaterangepickerFilterServiceProvider;

class TestCase extends Orchestra
{
    protected function setUp(): void
    {
        parent::setUp();

    }

    protected function getPackageProviders($app)
    {
        return [
            LivewireServiceProvider::class,
            FilamentServiceProvider::class,
            FilamentDaterangepickerFilterServiceProvider::class,
        ];
    }

    public function getEnvironmentSetUp($app)
    {

    }
}
