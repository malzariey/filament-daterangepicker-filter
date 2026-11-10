<?php

namespace Malzariey\FilamentDaterangepickerFilter\Support;

/**
 * The unsupported format tokens already reported in this request, so a
 * format converted for every field, row or re-render is reported once.
 * Bound as a scoped instance, which Laravel (Octane, queue workers) forgets
 * between requests and jobs.
 *
 * @internal
 */
final class ReportedFormatTokens
{
    /** @var array<string, true> */
    private array $reported = [];

    /** Whether this is the first time $token in $format is seen this request. */
    public function first(string $format, string $token): bool
    {
        $key = $format . "\0" . $token;

        if (isset($this->reported[$key])) {
            return false;
        }

        return $this->reported[$key] = true;
    }
}
