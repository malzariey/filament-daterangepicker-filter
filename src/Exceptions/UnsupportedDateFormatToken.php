<?php

namespace Malzariey\FilamentDaterangepickerFilter\Exceptions;

use InvalidArgumentException;

/**
 * A PHP date format character the date range picker cannot write in the
 * browser and read back on the server.
 *
 * In 5.x it is reported, not thrown: the field still renders, and the token
 * keeps the output it had before (see the README table). 6.0 will throw it.
 * An app can lower or silence it in its exception handler:
 * ->level(UnsupportedDateFormatToken::class, LogLevel::WARNING) or
 * ->dontReport(UnsupportedDateFormatToken::class).
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
