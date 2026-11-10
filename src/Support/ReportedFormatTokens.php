<?php

namespace Malzariey\FilamentDaterangepickerFilter\Support;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Throwable;

/**
 * Logs an unsupported format token as a warning, once.
 *
 * Once per PHP process (a static list: a format is converted for every
 * field, row and Livewire round-trip) and once a day across processes
 * (Cache::add(), so every PHP-FPM worker or Octane server does not log it
 * again). A cache that fails is ignored: the static list still applies.
 *
 * A warning on the default log channel, not report(): reported, every
 * request (polling, a filter change) sent a new error-level event to the
 * app's error tracker.
 *
 * @internal
 */
final class ReportedFormatTokens
{
    /** @var array<string, true> */
    private static array $logged = [];

    public static function warnOnce(string $format, string $token, string $message): void
    {
        $key = 'fdr-unsupported-token:' . md5($format . $token);

        if (isset(self::$logged[$key])) {
            return;
        }

        self::$logged[$key] = true;

        try {
            if (! Cache::add($key, true, now()->addDay())) {
                return;
            }
        } catch (Throwable) {
            // No cache (or it is down): log once for this process.
        }

        try {
            Log::warning($message, ['format' => $format, 'token' => $token]);
        } catch (Throwable) {
            // Rendering must never fail over a warning.
        }
    }

    /** Forget what this process logged (tests; a long-running worker can call it too). */
    public static function forgetProcess(): void
    {
        self::$logged = [];
    }
}
