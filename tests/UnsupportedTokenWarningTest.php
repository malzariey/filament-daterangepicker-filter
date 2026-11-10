<?php

use Filament\Schemas\Concerns\InteractsWithSchemas;
use Filament\Schemas\Contracts\HasSchemas;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Exceptions;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Js;
use Livewire\Component;
use Livewire\Livewire;
use Malzariey\FilamentDaterangepickerFilter\Fields\DateRangePicker;
use Malzariey\FilamentDaterangepickerFilter\Support\ReportedFormatTokens;

/**
 * An unsupported PHP format token is logged as a warning, not reported.
 *
 * 5.0.12's release candidate sent it through report() once per request, so
 * every Livewire round-trip (polling, a filter change) sent a new error-level
 * event to the app's error tracker. It is now a Log::warning() on the default
 * channel, once per process (a static list) and once a day across processes
 * (Cache::add()), and the exception handler never sees it.
 */
final class WarnedTokenFormComponent extends Component implements HasSchemas
{
    use InteractsWithSchemas;

    public ?array $data = [];

    public int $ticks = 0;

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
                    ->format('d/m/Y (N)')
                    ->defaultLast7Days(),
            ]);
    }

    public function tick(): void
    {
        $this->ticks++;
    }

    public function render(): string
    {
        return <<<'HTML'
            <div wire:poll>{{ $this->form }}</div>
            HTML;
    }
}

/** A new PHP process: the static list starts empty, the cache is shared. */
function newProcess(): void
{
    ReportedFormatTokens::forgetProcess();
}

beforeEach(fn () => newProcess());

/** The warnings logged for unsupported tokens. */
function tokenWarnings(): array
{
    $warnings = [];

    Log::shouldHaveReceived('warning')->withArgs(function (string $message, array $context = []) use (&$warnings) {
        $warnings[] = [$message, $context];

        return true;
    });

    return $warnings;
}

it('logs the token once across several requests and Livewire updates, and reports nothing', function () {
    Exceptions::fake();
    Log::spy();

    for ($request = 0; $request < 3; $request++) {
        Livewire::test(WarnedTokenFormComponent::class)
            ->assertOk()
            ->set('data.range', '01/06/2026 (1) - 10/06/2026 (3)')
            ->call('tick')
            ->call('tick')
            ->assertSet('ticks', 2);

        // The next request, possibly in another PHP-FPM worker.
        newProcess();
    }

    Log::shouldHaveReceived('warning')->once();

    $warnings = tokenWarnings();
    expect($warnings[0][0])->toContain('"d/m/Y (N)"')
        ->toContain('"N"')
        ->toContain('will throw in 6.0')
        ->and($warnings[0][1])->toBe(['format' => 'd/m/Y (N)', 'token' => 'N']);

    Exceptions::assertNothingReported();
});

it('logs once per process when the cache is unavailable', function () {
    Exceptions::fake();
    Log::spy();
    Cache::shouldReceive('add')->andThrow(new RuntimeException('Redis is down'));

    $field = DateRangePicker::make('test')->format('Y-m-d N', enforceFormat: true);

    expect($field->getDisplayFormat())->toBe('YYYY-MM-DD E')
        ->and($field->getDisplayFormat())->toBe('YYYY-MM-DD E');

    Log::shouldHaveReceived('warning')->once();
    Exceptions::assertNothingReported();
});

it('keeps each format and token its own warning', function () {
    Log::spy();

    DateRangePicker::make('a')->format('Y-m-d N', enforceFormat: true)->getDisplayFormat();
    DateRangePicker::make('b')->format('Y-m-d N', enforceFormat: true)->getDisplayFormat();
    DateRangePicker::make('c')->format('d/m/Y N')->getDisplayFormat();
    DateRangePicker::make('d')->format('Y-m-d N W', enforceFormat: true)->getDisplayFormat();

    // a and b share one; c is another format; d has two tokens.
    Log::shouldHaveReceived('warning')->times(4);
});

it('uses the day-long cache key the README names', function () {
    Log::spy();

    DateRangePicker::make('a')->format('d/m/Y (N)')->getDisplayFormat();

    expect(Cache::has('fdr-unsupported-token:'.md5('d/m/Y (N)'.'N')))->toBeTrue();
});

it('renders the page as before, through the real logger', function () {
    config(['logging.default' => 'null']);

    Livewire::test(WarnedTokenFormComponent::class)
        ->assertOk()
        ->assertSee('displayFormat: '.Js::from('DD/MM/YYYY (E)'), escape: false)
        ->call('tick')
        ->assertOk();
});
