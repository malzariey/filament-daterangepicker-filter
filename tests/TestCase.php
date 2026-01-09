<?php

namespace Malzariey\FilamentDaterangepickerFilter\Tests;

use Malzariey\FilamentDaterangepickerFilter\FilamentDaterangepickerFilterServiceProvider;
use Orchestra\Testbench\TestCase as Orchestra;

class TestCase extends Orchestra
{
    protected function getPackageProviders($app): array
    {
        return [
            FilamentDaterangepickerFilterServiceProvider::class,
        ];
    }

    protected function getEnvironmentSetUp($app): void
    {
        config()->set('database.default', 'testing');
    }
}
