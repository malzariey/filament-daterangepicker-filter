<?php

/**
 * DateRangeFilter driven through a real Filament table.
 *
 * Every other test in this package calls the filter's getters or apply() on a
 * loose Builder. These mount a Livewire table (workbench BookingsTable) over
 * real rows, set the filter state the way the panel does, and assert the exact
 * rows that come back, the indicator, and the rendered picker config.
 *
 * Storage is UTC (config app.timezone); the dates on screen are Riyadh
 * (UTC+3), set with ->timezone(), the way the downstream panels run.
 */

use Filament\Actions\ActionsServiceProvider;
use Filament\FilamentServiceProvider;
use Filament\Infolists\InfolistsServiceProvider;
use Filament\Widgets\WidgetsServiceProvider;
use Filament\Notifications\NotificationsServiceProvider;
use Filament\Tables\TablesServiceProvider;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Schema;
use Livewire\Livewire;
use Livewire\Features\SupportTesting\Testable;
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;
use Workbench\App\Livewire\BookingsTable;
use Workbench\App\Models\Booking;

/**
 * Fixture, all UTC. The comment is the Riyadh wall clock.
 */
const BOOKINGS = [
    1 => '2026-05-31 20:59:59', // 31 May 23:59:59 — last second of May
    2 => '2026-05-31 21:00:00', // 1 June 00:00:00 — first second of June
    3 => '2026-06-09 20:59:59', // 9 June 23:59:59
    4 => '2026-06-09 21:00:00', // 10 June 00:00:00 — Riyadh midnight, still 9 June in UTC
    5 => '2026-06-10 12:00:00', // 10 June 15:00
    6 => '2026-06-10 20:59:59', // 10 June 23:59:59
    7 => '2026-06-10 21:00:00', // 11 June 00:00:00 — 10 June in UTC
    8 => '2026-06-30 20:59:59', // 30 June 23:59:59 — last second of June
    9 => '2026-06-30 21:00:00', // 1 July 00:00:00
    10 => '2026-08-31 20:59:59', // 31 August 23:59:59 — last second of August
    11 => '2026-08-31 21:00:00', // 1 September 00:00:00
];

beforeEach(function () {
    foreach ([FilamentServiceProvider::class, TablesServiceProvider::class, ActionsServiceProvider::class, NotificationsServiceProvider::class, InfolistsServiceProvider::class, WidgetsServiceProvider::class] as $provider) {
        $this->app->register($provider);
    }

    config()->set('app.timezone', 'UTC');
    date_default_timezone_set('UTC');

    Schema::create('bookings', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->dateTime('booked_at');
    });

    foreach (BOOKINGS as $id => $bookedAt) {
        Booking::query()->create(['id' => $id, 'name' => "Booking {$id}", 'booked_at' => $bookedAt]);
    }

    BookingsTable::$configureFilter = fn (DateRangeFilter $filter) => $filter->timezone('Asia/Riyadh');
});

afterEach(function () {
    BookingsTable::$configureFilter = null;
    BookingsTable::$persistFiltersInSession = false;
    Carbon::setTestNow();
});

/**
 * The ids of the rows the table shows, checked against the rendered HTML too.
 *
 * @return list<int>
 */
function visibleBookingIds(Testable $component): array
{
    $ids = $component->instance()->getTableRecords()->pluck('id')->map(fn ($id) => (int) $id)->sort()->values()->all();

    $hidden = array_values(array_diff(array_keys(BOOKINGS), $ids));

    $component->assertCanSeeTableRecords($ids);

    if ($hidden !== []) {
        $component->assertCanNotSeeTableRecords($hidden);
    }

    return $ids;
}

function filterBookings(string $state): Testable
{
    return Livewire::test(BookingsTable::class)
        ->filterTable('booked_at', ['booked_at' => $state])
        ->assertOk()
        ->assertHasNoErrors();
}

it('shows every row before any filter is set', function () {
    $component = Livewire::test(BookingsTable::class)->assertOk();

    expect(visibleBookingIds($component))->toBe(range(1, 11))
        ->and($component->instance()->getTable()->getFilterIndicators())->toBe([]);
});

describe('day picker', function () {
    it('keeps a whole Riyadh day, from its midnight to its last second', function () {
        $component = filterBookings('10/06/2026 - 10/06/2026');

        expect(visibleBookingIds($component))->toBe([4, 5, 6]);
    });

    it('treats a lone date as that one Riyadh day', function () {
        $component = filterBookings('10/06/2026');

        expect(visibleBookingIds($component))->toBe([4, 5, 6]);
    });

    it('spans several days inclusive of both ends', function () {
        $component = filterBookings('01/06/2026 - 10/06/2026');

        expect(visibleBookingIds($component))->toBe([2, 3, 4, 5, 6]);
    });

    it('shows the indicator for a range it applied', function () {
        $component = filterBookings('01/06/2026 - 10/06/2026');

        $indicators = $component->instance()->getTable()->getFilterIndicators();

        expect($indicators)->toHaveCount(1)
            ->and($indicators[0]->getLabel())->toContain('01/06/2026 - 10/06/2026');
    });
});

describe('month picker', function () {
    beforeEach(function () {
        BookingsTable::$configureFilter = fn (DateRangeFilter $filter) => $filter
            ->timezone('Asia/Riyadh')
            ->monthPicker()
            ->format('m/Y');
    });

    it('keeps the whole of June whatever day it is today', function (string $today) {
        Carbon::setTestNow($today);

        $component = filterBookings('06/2026 - 06/2026');

        expect(visibleBookingIds($component))->toBe([2, 3, 4, 5, 6, 7, 8]);
    })->with([
        'on the 1st' => '2026-10-01 09:00:00',
        'on the 28th' => '2026-10-28 09:00:00',
        'on the 31st' => '2026-10-31 09:00:00',
    ]);

    it('treats a lone month as that whole month', function () {
        Carbon::setTestNow('2026-10-31 09:00:00');

        $component = filterBookings('06/2026');

        expect(visibleBookingIds($component))->toBe([2, 3, 4, 5, 6, 7, 8]);
    });

    it('runs from the first second of the first month to the last second of the last', function () {
        Carbon::setTestNow('2026-10-28 09:00:00');

        $component = filterBookings('06/2026 - 08/2026');

        expect(visibleBookingIds($component))->toBe([2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
});

describe('malformed state', function () {
    it('ignores state that does not parse: every row, no indicator, no error', function (string $state) {
        $component = filterBookings($state);

        expect(visibleBookingIds($component))->toBe(range(1, 11))
            ->and($component->instance()->getTable()->getFilterIndicators())->toBe([]);
    })->with([
        'not a date' => 'not-a-date',
        'impossible day' => '31/02/2026 - 01/03/2026',
        'half range, end garbage' => '01/06/2026 - garbage',
        'three parts' => '01/06/2026 - 02/06/2026 - 03/06/2026',
        'wrong format' => '2026-06-01 - 2026-06-10',
    ]);

    it('treats a trailing separator as the lone start day', function () {
        // "10/06/2026 - " is what the picker leaves after picking only the
        // start; parseRange() drops the empty half and filters that one day.
        $component = filterBookings('10/06/2026 - ');

        expect(visibleBookingIds($component))->toBe([4, 5, 6]);
    });

    it('renders the page with garbage persisted in the session', function () {
        // Filter state is persisted per user; this is the state that used to
        // 500 the list on every visit until the session expired.
        BookingsTable::$persistFiltersInSession = true;

        $this->app['router']->get('/bookings-table', fn () => Blade::render('@livewire(\\Workbench\\App\\Livewire\\BookingsTable::class)'))
            ->middleware('web');

        $key = Livewire::test(BookingsTable::class)->instance()->getTableFiltersSessionKey();

        // Control: a valid persisted range is applied on page load, so the
        // garbage case below is going through the same path.
        $this->withSession([$key => ['booked_at' => ['booked_at' => '10/06/2026 - 10/06/2026']]])
            ->get('/bookings-table')
            ->assertOk()
            ->assertSee('Booking 5')
            ->assertDontSee('Booking 3')
            ->assertSee('Period 10/06/2026 - 10/06/2026');

        $this->flushSession();

        $this->withSession([$key => ['booked_at' => ['booked_at' => '31/02/2026 - 01/03/2026']]])
            ->get('/bookings-table')
            ->assertOk()
            ->assertSee('Booking 1')
            ->assertSee('Booking 11')
            ->assertDontSee('Period 31/02/2026');
    });
});

describe('closures reach the rendered picker', function () {
    it('evaluates firstDayOfWeek and autoApply closures in the table filter form', function () {
        BookingsTable::$configureFilter = fn (DateRangeFilter $filter) => $filter
            ->timezone('Asia/Riyadh')
            ->firstDayOfWeek(fn (): int => 6)
            ->autoApply(fn (): bool => true);

        Livewire::test(BookingsTable::class)
            ->assertOk()
            ->assertSeeHtml('firstDay: 6')
            ->assertSeeHtml('autoApply: true');
    });

    it('renders the defaults when no closure is given', function () {
        Livewire::test(BookingsTable::class)
            ->assertOk()
            ->assertSeeHtml('firstDay: 1')
            ->assertSeeHtml('autoApply: false');
    });
});
