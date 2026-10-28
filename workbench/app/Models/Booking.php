<?php

namespace Workbench\App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * A row with one timestamp column, for exercising DateRangeFilter against a
 * real query in tests/FilterTableBehaviourTest.php.
 */
class Booking extends Model
{
    protected $table = 'bookings';

    protected $guarded = [];

    public $timestamps = false;

    protected function casts(): array
    {
        return ['booked_at' => 'datetime'];
    }
}
