<?php

namespace Workbench\App\Providers;

use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class WorkbenchServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        View::addLocation(dirname(__DIR__, 2) . '/resources/views');

        // Use array cache to avoid "no such table: cache" errors in demo
        config()->set('cache.default', 'array');
    }
}
