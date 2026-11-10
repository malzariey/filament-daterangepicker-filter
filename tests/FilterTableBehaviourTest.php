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
use Filament\Forms\Components\TextInput;
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
use Malzariey\FilamentDaterangepickerFilter\Fields\DateRangePicker;
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

function filterBookings(?string $state): Testable
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

    it('isolates the indicator range as LTR text in an RTL locale only', function () {
        app()->setLocale('ar');
        $rtl = filterBookings('01/06/2026 - 10/06/2026')->instance()->getTable()->getFilterIndicators();

        app()->setLocale('en');
        $ltr = filterBookings('01/06/2026 - 10/06/2026')->instance()->getTable()->getFilterIndicators();

        expect($rtl[0]->getLabel())->toContain("\u{2066}01/06/2026 - 10/06/2026\u{2069}")
            ->and($ltr[0]->getLabel())->not->toContain("\u{2066}")
            ->and($ltr[0]->getLabel())->toContain('Period 01/06/2026 - 10/06/2026');
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

describe('cleared state', function () {
    // The picker stores null when cleared; before 5.0.12 a keyboard clear
    // sent an empty string. Neither is a filter.
    it('shows every row with no indicator', function (?string $state) {
        $component = filterBookings($state);

        expect(visibleBookingIds($component))->toBe(range(1, 11))
            ->and($component->instance()->getTable()->getFilterIndicators())->toBe([]);
    })->with([
        'null' => [null],
        'empty string' => [''],
    ]);
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

/**
 * Issue #267. Filament 5.11.2 builds each filter's form from getFormSchema();
 * up to 5.11.1 it called getSchemaComponents(). The filter overrode only the
 * latter (reading a $schema property 5.11.2 renamed to $formSchema), so on
 * 5.11.2 the filter dropdown opened with no picker in it. These pass on both.
 */
describe('the picker renders on every Filament release (#267)', function () {
    it('renders the picker input inside the table filter form', function () {
        $component = Livewire::test(BookingsTable::class)->assertOk();

        $field = $component->instance()->getTableFiltersForm()
            ->getComponent('booked_at')
            ->getChildSchema()
            ->getComponent(fn ($component) => $component instanceof DateRangePicker);

        expect($field)->toBeInstanceOf(DateRangePicker::class)
            ->and($field->getName())->toBe('booked_at');

        $component->assertSeeHtml('dateRangeComponent(')
            ->assertSeeHtml('fi-fo-date-range-picker-input');
    });

    it('builds one picker through both the current and the deprecated getter', function () {
        $filter = DateRangeFilter::make('booked_at');

        expect($filter->getFormSchema())->toHaveCount(1)
            ->and($filter->getFormSchema()[0])->toBeInstanceOf(DateRangePicker::class)
            ->and($filter->getSchemaComponents())->toHaveCount(1)
            ->and($filter->getSchemaComponents()[0])->toBeInstanceOf(DateRangePicker::class)
            ->and($filter->getFormField())->toBeInstanceOf(DateRangePicker::class);
    });

    it('still lets ->form() and ->schema() replace the picker', function (string $method) {
        $filter = DateRangeFilter::make('booked_at')->{$method}([
            TextInput::make('booked_at'),
        ]);

        expect($filter->getFormSchema())->toHaveCount(1)
            ->and($filter->getFormSchema()[0])->toBeInstanceOf(TextInput::class)
            ->and($filter->getSchemaComponents()[0])->toBeInstanceOf(TextInput::class);
    })->with(['form', 'schema']);

    it('applies ->modifyFormFieldUsing() to the picker', function () {
        $filter = DateRangeFilter::make('booked_at')
            ->modifyFormFieldUsing(fn (DateRangePicker $field) => $field->placeholder('Pick a stay'));

        expect($filter->getFormSchema()[0]->getPlaceholder())->toBe('Pick a stay');
    });
});

/**
 * default*() under timePicker(): the default must be the range its same-named
 * preset selects, start of the first day to end of the last. It kept the clock
 * time instead, so "Yesterday" at 15:00 was 15:00 - 15:00 and matched nothing.
 */
describe('default ranges with the time picker', function () {
    beforeEach(function () {
        // 10 June 15:00 in Riyadh.
        Carbon::setTestNow(Carbon::parse('2026-06-10 12:00:00', 'UTC'));
    });

    function bookingsWithDefault(Closure $configure): Testable
    {
        BookingsTable::$configureFilter = fn (DateRangeFilter $filter) => $configure($filter->timezone('Asia/Riyadh'));

        return Livewire::test(BookingsTable::class)->assertOk()->assertHasNoErrors();
    }

    function defaultFilterState(Testable $component): ?string
    {
        return data_get($component->instance()->tableFilters, 'booked_at.booked_at');
    }

    it('selects the whole of yesterday, including its last second', function (Closure $configure, string $state) {
        $component = bookingsWithDefault(fn (DateRangeFilter $filter) => $configure($filter)->defaultYesterday());

        expect(defaultFilterState($component))->toBe($state)
            ->and(visibleBookingIds($component))->toBe([3]);
    })->with([
        '24h' => [fn (DateRangeFilter $filter) => $filter->timePicker()->timePicker24(), '09/06/2026 00:00 - 09/06/2026 23:59'],
        '12h' => [fn (DateRangeFilter $filter) => $filter->timePicker(), '09/06/2026 12:00 AM - 09/06/2026 11:59 PM'],
        '24h with seconds' => [fn (DateRangeFilter $filter) => $filter->timePicker()->timePicker24()->timePickerSecond(), '09/06/2026 00:00:00 - 09/06/2026 23:59:59'],
        'no time picker' => [fn (DateRangeFilter $filter) => $filter, '09/06/2026 - 09/06/2026'],
    ]);

    it('covers the last 7 days to the end of today', function (Closure $configure, string $state) {
        $component = bookingsWithDefault(fn (DateRangeFilter $filter) => $configure($filter)->defaultLast7Days());

        expect(defaultFilterState($component))->toBe($state)
            ->and(visibleBookingIds($component))->toBe([3, 4, 5, 6]);
    })->with([
        '24h' => [fn (DateRangeFilter $filter) => $filter->timePicker()->timePicker24(), '04/06/2026 00:00 - 10/06/2026 23:59'],
        'no time picker' => [fn (DateRangeFilter $filter) => $filter, '04/06/2026 - 10/06/2026'],
    ]);

    it('covers the last 30 days to the end of today', function () {
        $component = bookingsWithDefault(fn (DateRangeFilter $filter) => $filter->timePicker()->timePicker24()->defaultLast30Days());

        expect(defaultFilterState($component))->toBe('12/05/2026 00:00 - 10/06/2026 23:59')
            ->and(visibleBookingIds($component))->toBe([1, 2, 3, 4, 5, 6]);
    });

    it('does not depend on calling timePicker() before the default', function () {
        $component = bookingsWithDefault(fn (DateRangeFilter $filter) => $filter->defaultYesterday()->timePicker()->timePicker24());

        expect(defaultFilterState($component))->toBe('09/06/2026 00:00 - 09/06/2026 23:59')
            ->and(visibleBookingIds($component))->toBe([3]);
    });

    it('keeps the explicit times of defaultCustom()', function () {
        $component = bookingsWithDefault(fn (DateRangeFilter $filter) => $filter->timePicker()->timePicker24()
            ->defaultCustom(Carbon::parse('2026-06-10 14:00', 'Asia/Riyadh'), Carbon::parse('2026-06-10 16:00', 'Asia/Riyadh')));

        expect(defaultFilterState($component))->toBe('10/06/2026 14:00 - 10/06/2026 16:00')
            ->and(visibleBookingIds($component))->toBe([5]);
    });
});
