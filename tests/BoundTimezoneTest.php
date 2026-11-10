<?php

use Carbon\Carbon;
use Carbon\CarbonImmutable;
use Filament\Schemas\Concerns\InteractsWithSchemas;
use Filament\Schemas\Contracts\HasSchemas;
use Filament\Schemas\Schema;
use Filament\Support\Facades\FilamentTimezone;
use Livewire\Component;
use Livewire\Livewire;
use Malzariey\FilamentDaterangepickerFilter\Fields\DateRangePicker;
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;

final class BoundTimezoneFormComponent extends Component implements HasSchemas
{
    use InteractsWithSchemas;

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill();
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->statePath('data')
            ->components([
                DateRangePicker::make('range')
                    ->timePicker()
                    ->enforceBoundTimes()
                    ->minDate(now())
                    ->maxDate(today()->addDays(3)),
            ]);
    }

    public function render(): string
    {
        return <<<'HTML'
            <div>{{ $this->form }}</div>
            HTML;
    }
}

/**
 * minDate() / maxDate() reach the picker as wall-clock strings it reads in the
 * DISPLAY timezone (as isDisabled always has). A Carbon bound was sent in its
 * own (app / storage) timezone, which did not matter while only whole days
 * were compared. Since the picker enforces bound times, minDate(now()) with
 * app UTC and display America/New_York at 13:00 New York arrived as "18:00"
 * and blocked 13:00-18:00 today. A timed Carbon bound is now converted to the
 * display timezone; a midnight one (today(), date casts) and strings are sent
 * exactly as in 5.0.11, so the day can never shift.
 *
 * All of this is opt-in (enforceBoundTimes(), with timePicker()): by default
 * the bounds are sent exactly as 5.0.11 sent them.
 */
beforeEach(function () {
    config(['app.timezone' => 'UTC']);
    date_default_timezone_set('UTC');
    FilamentTimezone::set(null);
    // 18:00 UTC = 13:00 New York (EST) = 21:00 Riyadh.
    Carbon::setTestNow(Carbon::parse('2026-11-10 18:00:00', 'UTC'));
});

afterEach(function () {
    Carbon::setTestNow();
    FilamentTimezone::set(null);
});

it('sends minDate(now()) as the New York wall clock', function () {
    FilamentTimezone::set('America/New_York');

    $field = DateRangePicker::make('at')->timePicker()->enforceBoundTimes()->minDate(now())->maxDate(now()->addDays(3));

    expect($field->getMinDateForPicker())->toBe('2026-11-10 13:00:00')
        ->and($field->getMaxDateForPicker())->toBe('2026-11-13 13:00:00');
});

it('sends minDate(now()) as the Riyadh wall clock', function () {
    FilamentTimezone::set('Asia/Riyadh');

    $field = DateRangePicker::make('at')->timePicker()->enforceBoundTimes()->minDate(now())->maxDate(now()->addHours(2));

    expect($field->getMinDateForPicker())->toBe('2026-11-10 21:00:00')
        ->and($field->getMaxDateForPicker())->toBe('2026-11-10 23:00:00');
});

it('honours the field\'s own timezone() as the display zone', function () {
    $field = DateRangePicker::make('at')->timePicker()->enforceBoundTimes()->timezone('Asia/Tokyo')->minDate(now());

    expect($field->getMinDateForPicker())->toBe('2026-11-11 03:00:00');
});

it('converts a closure\'s result the same way', function () {
    FilamentTimezone::set('America/New_York');

    $field = DateRangePicker::make('at')->timePicker()->enforceBoundTimes()
        ->minDate(fn () => now())
        ->maxDate(fn () => today());

    expect($field->getMinDateForPicker())->toBe('2026-11-10 13:00:00')
        ->and($field->getMaxDateForPicker())->toBe('2026-11-10 00:00:00');
});

it('converts an immutable Carbon without changing it', function () {
    FilamentTimezone::set('America/New_York');
    $bound = CarbonImmutable::parse('2026-11-10 18:30:00', 'UTC');

    $field = DateRangePicker::make('at')->timePicker()->enforceBoundTimes()->minDate($bound);

    expect($field->getMinDateForPicker())->toBe('2026-11-10 13:30:00')
        ->and($bound->getTimezone()->getName())->toBe('UTC');
});

it('does not mutate a mutable Carbon bound', function () {
    FilamentTimezone::set('America/New_York');
    $bound = now();

    DateRangePicker::make('at')->timePicker()->enforceBoundTimes()->minDate($bound)->getMinDateForPicker();

    expect($bound->getTimezone()->getName())->toBe('UTC')
        ->and($bound->format('H:i'))->toBe('18:00');
});

it('sends a midnight bound unchanged so the day never shifts', function () {
    FilamentTimezone::set('America/New_York');

    $field = DateRangePicker::make('at')->timePicker()->enforceBoundTimes()->minDate(today())->maxDate(today()->addDays(3));

    expect($field->getMinDateForPicker())->toBe('2026-11-10 00:00:00')
        ->and($field->getMaxDateForPicker())->toBe('2026-11-13 00:00:00');
});

it('sends a string unchanged', function () {
    FilamentTimezone::set('America/New_York');

    $field = DateRangePicker::make('at')->timePicker()->enforceBoundTimes()
        ->minDate('2026-11-10 18:00:00')
        ->maxDate('2026-11-13');

    expect($field->getMinDateForPicker())->toBe('2026-11-10 18:00:00')
        ->and($field->getMaxDateForPicker())->toBe('2026-11-13');
});

it('sends null as null', function () {
    $field = DateRangePicker::make('at')->timePicker()->enforceBoundTimes();

    expect($field->getMinDateForPicker())->toBeNull()
        ->and($field->getMaxDateForPicker())->toBeNull();
});

it('is a no-op when the display timezone is the app timezone', function () {
    $field = DateRangePicker::make('at')->timePicker()->enforceBoundTimes()->minDate(now());

    expect($field->getMinDateForPicker())->toBe('2026-11-10 18:00:00');
});

it('keeps getMinDate() / getMaxDate() as in 5.0.11', function () {
    FilamentTimezone::set('America/New_York');

    $field = DateRangePicker::make('at')->timePicker()->enforceBoundTimes()->minDate(now())->maxDate('2026-11-13');

    expect($field->getMinDate())->toBe('2026-11-10 18:00:00')
        ->and($field->getMaxDate())->toBe('2026-11-13');
});

it('passes the filter\'s bounds through the same way', function () {
    FilamentTimezone::set('America/New_York');

    $field = DateRangeFilter::make('at')->timePicker()->enforceBoundTimes()
        ->minDate(now())
        ->maxDate(fn () => today()->addDays(3))
        ->getFormField();

    expect($field->getMinDateForPicker())->toBe('2026-11-10 13:00:00')
        ->and($field->getMaxDateForPicker())->toBe('2026-11-13 00:00:00');
});

it('uses the filter\'s own timezone() as the display zone', function () {
    $field = DateRangeFilter::make('at')->timePicker()->enforceBoundTimes()->timezone('Asia/Riyadh')->minDate(now())->getFormField();

    expect($field->getMinDateForPicker())->toBe('2026-11-10 21:00:00');
});

it('renders the display wall clock into the picker config', function () {
    FilamentTimezone::set('America/New_York');

    $html = Livewire::test(BoundTimezoneFormComponent::class)->html();
    $html = html_entity_decode($html, ENT_QUOTES);

    expect($html)->toContain("minDate: '2026-11-10 13:00:00'")
        ->and($html)->toContain("maxDate: '2026-11-13 00:00:00'")
        ->and($html)->not->toContain("minDate: '2026-11-10 18:00:00'");
});

it('sends the bounds exactly as 5.0.11 by default', function () {
    FilamentTimezone::set('America/New_York');

    $field = DateRangePicker::make('at')->timePicker()->minDate(now())->maxDate(now()->addDays(3));

    expect($field->getEnforceBoundTimes())->toBeFalse()
        ->and($field->getMinDateForPicker())->toBe('2026-11-10 18:00:00')
        ->and($field->getMaxDateForPicker())->toBe('2026-11-13 18:00:00')
        ->and($field->getMinDateHasTimeForPicker())->toBeNull();
});

it('does not convert without timePicker(), so allowed days never move', function () {
    FilamentTimezone::set('Asia/Riyadh');

    $field = DateRangePicker::make('at')->enforceBoundTimes()->maxDate(now()->endOfDay());

    // Converted, 23:59 UTC would be 02:59 on the 11th in Riyadh.
    expect($field->getMaxDateForPicker())->toBe('2026-11-10 23:59:59');
});

it('reads a bound a few microseconds after midnight as timed', function () {
    FilamentTimezone::set('America/New_York');
    $bound = Carbon::parse('2026-11-10 00:00:00.000500', 'UTC');

    $field = DateRangePicker::make('at')->timePicker()->enforceBoundTimes()->minDate($bound);

    expect($field->getMinDateHasTimeForPicker())->toBeTrue()
        ->and($field->getMinDateForPicker())->toBe('2026-11-09 19:00:00');
});

it('flags a timed bound that converts to midnight as timed', function () {
    FilamentTimezone::set('Asia/Riyadh');
    // 21:00 UTC = 00:00 on the 11th in Riyadh.
    $bound = Carbon::parse('2026-11-10 21:00:00', 'UTC');

    $field = DateRangePicker::make('at')->timePicker()->enforceBoundTimes()->maxDate($bound)->minDate(today());

    expect($field->getMaxDateForPicker())->toBe('2026-11-11 00:00:00')
        ->and($field->getMaxDateHasTimeForPicker())->toBeTrue()
        ->and($field->getMinDateHasTimeForPicker())->toBeFalse();
});

it('sends no has-time flag for a string bound', function () {
    $field = DateRangePicker::make('at')->timePicker()->enforceBoundTimes()->minDate('2026-11-10 09:00:00');

    expect($field->getMinDateHasTimeForPicker())->toBeNull();
});

it('passes enforceBoundTimes() from the filter to its field', function () {
    expect(DateRangeFilter::make('at')->getFormField()->getEnforceBoundTimes())->toBeFalse()
        ->and(DateRangeFilter::make('at')->enforceBoundTimes()->getFormField()->getEnforceBoundTimes())->toBeTrue()
        ->and(DateRangeFilter::make('at')->enforceBoundTimes(fn () => true)->getFormField()->getEnforceBoundTimes())->toBeTrue();
});

it('renders the option and flags into the picker config', function () {
    FilamentTimezone::set('America/New_York');

    $html = html_entity_decode(Livewire::test(BoundTimezoneFormComponent::class)->html(), ENT_QUOTES);

    expect($html)->toContain('enforceBoundTimes: true')
        ->and($html)->toContain('minDateHasTime: true')
        ->and($html)->toContain('maxDateHasTime: false');
});
