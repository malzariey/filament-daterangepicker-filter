<?php

namespace Malzariey\FilamentDaterangepickerFilter\Exceptions;

use InvalidArgumentException;

/**
 * A PHP date format character the date range picker cannot write in the
 * browser and read back on the server.
 *
 * Not thrown or reported in 5.x: the field still renders, the token keeps
 * the output it had before (see the README table), and the same message is
 * logged as a warning once (Support\ReportedFormatTokens). 6.0 will throw it.
 */
class UnsupportedDateFormatToken extends InvalidArgumentException
{
    public function __construct(
        public readonly string $format,
        public readonly string $token,
        string $message,
    ) {
        parent::__construct($message);
    }

    /**
     * Log context: Laravel's exception handler adds it to the log entry.
     *
     * @return array{format: string, token: string}
     */
    public function context(): array
    {
        return ['format' => $this->format, 'token' => $this->token];
    }
}
