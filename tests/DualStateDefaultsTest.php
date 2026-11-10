<?php

use Carbon\Carbon;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Repeater;
use Filament\Schemas\Concerns\InteractsWithSchemas;
use Filament\Schemas\Contracts\HasSchemas;
use Filament\Schemas\Schema;
use Filament\Support\Facades\FilamentTimezone;
use Livewire\Component;
use Livewire\Livewire;
use Malzariey\FilamentDaterangepickerFilter\Fields\DateRangePicker;

/**
 * default*() and default() on a useDualState() field.
 *
 * The hydration hook rebuilt the picker state from the backing fields, which
 * are still empty on a create form, so the default was thrown away and the
 * picker and both backing fields hydrated as null. A default must fill the
 * backing fields with storage values (format(), storage timezone) — the same
 * values the browser writes when the range is applied — while stored values
 * on an edit form keep winning.
 *
 * "Now" is 2026-06-10 15:00 in Riyadh (12:00 UTC); storage is UTC.
 */
final class DualStateDefaultsTestComponent extends Component implements HasSchemas
{
    use InteractsWithSchemas;

    /** Builds the form's components; static because Livewire cannot hold a closure. */
    public static ?Closure $components = null;

    public ?array $data = [];

    public ?string $start_date = null;

    public ?string $end_date = null;

    public string $operation = 'create';

    public array $savedState = [];

    public function mount(?array $fill = null, ?array $seed = null, string $operation = 'create'): void
    {
        $this->operation = $operation;

        if ($seed !== null) {
            $this->data = $seed;
        }

        $this->form->fill($fill);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->statePath('data')
            ->operation($this->operation)
            ->components((self::$components)());
    }

    public function saveState(): void
    {
        $this->savedState = [
            'form' => $this->form->getState(),
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
        ];
    }

    public function render(): string
    {
        return <<<'HTML'
            <div>
                <form wire:submit="saveState">
                    {{ $this->form }}
                </form>
            </div>
            HTML;
    }
}

function dualDefaultForm(Closure $components): void
{
    DualStateDefaultsTestComponent::$components = $components;
}

function dateOnlyDualPicker(): DateRangePicker
{
    return DateRangePicker::make('date_range')
        ->useDualState('start_date', 'end_date', relative: true)
        ->format('Y-m-d', enforceFormat: true)
        ->timezone('Asia/Riyadh');
}

function dateTimeDualPicker(): DateRangePicker
{
    return DateRangePicker::make('date_range')
        ->useDualState('start_date', 'end_date', relative: true)
        ->format('Y-m-d H:i:s', enforceFormat: true)
        ->displayFormat('DD.MM.YYYY HH:mm')
        ->timezone('Asia/Riyadh')
        ->timePicker()
        ->timePicker24();
}

beforeEach(function () {
    config(['app.timezone' => 'UTC']);
    FilamentTimezone::set(null);
    Carbon::setTestNow(Carbon::parse('2026-06-10 12:00:00', 'UTC'));
});

afterEach(function () {
    Carbon::setTestNow();
    FilamentTimezone::set(null);
    DualStateDefaultsTestComponent::$components = null;
});

describe('on a create form', function () {
    it('fills the picker and both backing fields from a default*() helper', function () {
        dualDefaultForm(fn () => [dateOnlyDualPicker()->defaultYesterday()]);

        Livewire::test(DualStateDefaultsTestComponent::class)
            ->assertSet('data.date_range', '2026-06-09 - 2026-06-09')
            ->assertSet('data.start_date', '2026-06-09')
            ->assertSet('data.end_date', '2026-06-09')
            ->call('saveState')
            ->assertSet('savedState.form', [
                'start_date' => '2026-06-09',
                'end_date' => '2026-06-09',
            ]);
    });

    it('fills every default*() helper', function (string $helper, string $start, string $end) {
        dualDefaultForm(fn () => [dateOnlyDualPicker()->{$helper}()]);

        Livewire::test(DualStateDefaultsTestComponent::class)
            ->assertSet('data.start_date', $start)
            ->assertSet('data.end_date', $end);
    })->with([
        ['defaultToday', '2026-06-10', '2026-06-10'],
        ['defaultYesterday', '2026-06-09', '2026-06-09'],
        ['defaultLast7Days', '2026-06-04', '2026-06-10'],
        ['defaultLast30Days', '2026-05-12', '2026-06-10'],
        ['defaultThisMonth', '2026-06-01', '2026-06-30'],
        ['defaultLastMonth', '2026-05-01', '2026-05-31'],
        ['defaultThisYear', '2026-01-01', '2026-12-31'],
        ['defaultLastYear', '2025-01-01', '2025-12-31'],
    ]);

    it('writes datetime backing fields in the storage timezone under timePicker()', function () {
        // Yesterday in Riyadh is 2026-06-09 00:00:00 – 23:59:59 (+03:00),
        // which is 2026-06-08 21:00:00 – 2026-06-09 20:59:59 in UTC storage.
        dualDefaultForm(fn () => [dateTimeDualPicker()->defaultYesterday()]);

        Livewire::test(DualStateDefaultsTestComponent::class)
            ->assertSet('data.start_date', '2026-06-08 21:00:00')
            ->assertSet('data.end_date', '2026-06-09 20:59:59')
            ->assertSet('data.date_range', '2026-06-08 21:00:00 - 2026-06-09 20:59:59')
            ->call('saveState')
            ->assertSet('savedState.form', [
                'start_date' => '2026-06-08 21:00:00',
                'end_date' => '2026-06-09 20:59:59',
            ]);
    });

    it('converts into systemTimezone() when one is set', function () {
        dualDefaultForm(fn () => [dateTimeDualPicker()->systemTimezone('Europe/Berlin')->defaultYesterday()]);

        Livewire::test(DualStateDefaultsTestComponent::class)
            ->assertSet('data.start_date', '2026-06-08 23:00:00')
            ->assertSet('data.end_date', '2026-06-09 22:59:59');
    });

    it('does not shift date-only backing fields between timezones', function () {
        // 2026-06-10 01:00 in Riyadh is still 2026-06-09 in UTC; a calendar
        // date is not a moment and stays the Riyadh date.
        Carbon::setTestNow(Carbon::parse('2026-06-09 22:00:00', 'UTC'));
        dualDefaultForm(fn () => [dateOnlyDualPicker()->defaultToday()]);

        Livewire::test(DualStateDefaultsTestComponent::class)
            ->assertSet('data.start_date', '2026-06-10')
            ->assertSet('data.end_date', '2026-06-10');
    });

    it('fills the backing fields from an explicit default()', function () {
        dualDefaultForm(fn () => [dateOnlyDualPicker()->default('2026-01-01 - 2026-01-31')]);

        Livewire::test(DualStateDefaultsTestComponent::class)
            ->assertSet('data.start_date', '2026-01-01')
            ->assertSet('data.end_date', '2026-01-31');
    });

    it('reads an explicit datetime default() in the display timezone', function () {
        dualDefaultForm(fn () => [dateTimeDualPicker()->default('2026-01-01 08:00:00 - 2026-01-01 17:30:00')]);

        Livewire::test(DualStateDefaultsTestComponent::class)
            ->assertSet('data.start_date', '2026-01-01 05:00:00')
            ->assertSet('data.end_date', '2026-01-01 14:30:00');
    });

    it('fills Livewire properties addressed by absolute backing paths', function () {
        dualDefaultForm(fn () => [
            DateRangePicker::make('date_range')
                ->useDualState('/start_date', '/end_date', relative: true)
                ->format('Y-m-d', enforceFormat: true)
                ->timezone('Asia/Riyadh')
                ->defaultYesterday(),
        ]);

        Livewire::test(DualStateDefaultsTestComponent::class)
            ->assertSet('start_date', '2026-06-09')
            ->assertSet('end_date', '2026-06-09')
            ->call('saveState')
            ->assertSet('savedState.start_date', '2026-06-09')
            ->assertSet('savedState.end_date', '2026-06-09');
    });

    it('fills backing fields that are real Filament fields on either side of the picker', function () {
        dualDefaultForm(fn () => [
            Hidden::make('start_date'),
            dateOnlyDualPicker()->defaultYesterday()->dehydrated(false),
            Hidden::make('end_date'),
        ]);

        Livewire::test(DualStateDefaultsTestComponent::class)
            ->assertSet('data.start_date', '2026-06-09')
            ->assertSet('data.end_date', '2026-06-09')
            ->call('saveState')
            ->assertSet('savedState.form', [
                'start_date' => '2026-06-09',
                'end_date' => '2026-06-09',
            ]);
    });

    it('fills sibling backing keys inside a repeater item', function () {
        dualDefaultForm(fn () => [
            Repeater::make('dates')
                ->defaultItems(1)
                ->schema([dateOnlyDualPicker()->defaultYesterday()]),
        ]);

        Livewire::test(DualStateDefaultsTestComponent::class)
            ->call('saveState')
            ->assertSet('savedState.form', [
                'dates' => [[
                    'start_date' => '2026-06-09',
                    'end_date' => '2026-06-09',
                ]],
            ]);
    });

    it('keeps backing values already on the component', function () {
        dualDefaultForm(fn () => [dateOnlyDualPicker()->defaultYesterday()]);

        Livewire::test(DualStateDefaultsTestComponent::class, [
            'seed' => ['start_date' => '2026-08-04', 'end_date' => '2026-08-05'],
        ])
            ->assertSet('data.start_date', '2026-08-04')
            ->assertSet('data.end_date', '2026-08-05')
            ->assertSet('data.date_range', '2026-08-04 - 2026-08-05');
    });

    it('leaves the fields empty when there is no default', function () {
        dualDefaultForm(fn () => [dateOnlyDualPicker()]);

        Livewire::test(DualStateDefaultsTestComponent::class)
            ->assertSet('data.date_range', null)
            ->assertSet('data.start_date', null)
            ->assertSet('data.end_date', null);
    });
});

describe('on an edit form', function () {
    it('keeps the stored values over the default', function () {
        dualDefaultForm(fn () => [dateOnlyDualPicker()->defaultYesterday()]);

        Livewire::test(DualStateDefaultsTestComponent::class, [
            'fill' => ['start_date' => '2026-08-04', 'end_date' => '2026-08-05'],
            'operation' => 'edit',
        ])
            ->assertSet('data.start_date', '2026-08-04')
            ->assertSet('data.end_date', '2026-08-05')
            ->assertSet('data.date_range', '2026-08-04 - 2026-08-05')
            ->call('saveState')
            ->assertSet('savedState.form', [
                'start_date' => '2026-08-04',
                'end_date' => '2026-08-05',
            ]);
    });

    it('keeps stored datetime values as they are', function () {
        dualDefaultForm(fn () => [dateTimeDualPicker()->defaultYesterday()]);

        Livewire::test(DualStateDefaultsTestComponent::class, [
            'fill' => ['start_date' => '2026-08-04 08:17:00', 'end_date' => '2026-08-05 14:43:00'],
            'operation' => 'edit',
        ])
            ->assertSet('data.start_date', '2026-08-04 08:17:00')
            ->assertSet('data.end_date', '2026-08-05 14:43:00');
    });

    it('keeps a partial stored value and does not complete it from the default', function () {
        dualDefaultForm(fn () => [dateOnlyDualPicker()->defaultYesterday()]);

        Livewire::test(DualStateDefaultsTestComponent::class, [
            'fill' => ['start_date' => '2026-08-04', 'end_date' => null],
            'operation' => 'edit',
        ])
            ->assertSet('data.start_date', '2026-08-04')
            ->assertSet('data.end_date', null)
            ->assertSet('data.date_range', null);
    });

    it('leaves empty stored values empty without enforceIfNull', function () {
        dualDefaultForm(fn () => [dateOnlyDualPicker()->defaultYesterday()]);

        Livewire::test(DualStateDefaultsTestComponent::class, [
            'fill' => ['start_date' => null, 'end_date' => null],
            'operation' => 'edit',
        ])
            ->assertSet('data.start_date', null)
            ->assertSet('data.end_date', null)
            ->assertSet('data.date_range', null);
    });

    it('fills empty stored values with enforceIfNull', function () {
        dualDefaultForm(fn () => [dateTimeDualPicker()->defaultYesterday(enforceIfNull: true)]);

        Livewire::test(DualStateDefaultsTestComponent::class, [
            'fill' => ['start_date' => null, 'end_date' => null],
            'operation' => 'edit',
        ])
            ->assertSet('data.start_date', '2026-06-08 21:00:00')
            ->assertSet('data.end_date', '2026-06-09 20:59:59')
            ->assertSet('data.date_range', '2026-06-08 21:00:00 - 2026-06-09 20:59:59');
    });

    it('does not complete a partial stored value with enforceIfNull', function () {
        dualDefaultForm(fn () => [dateOnlyDualPicker()->defaultYesterday(enforceIfNull: true)]);

        Livewire::test(DualStateDefaultsTestComponent::class, [
            'fill' => ['start_date' => '2026-08-04', 'end_date' => null],
            'operation' => 'edit',
        ])
            ->assertSet('data.start_date', '2026-08-04')
            ->assertSet('data.end_date', null);
    });
});
