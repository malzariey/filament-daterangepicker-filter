<?php

use Filament\Schemas\Concerns\InteractsWithSchemas;
use Filament\Schemas\Contracts\HasSchemas;
use Filament\Schemas\Schema;
use Livewire\Component;
use Livewire\Livewire;
use Malzariey\FilamentDaterangepickerFilter\Fields\DateRangePicker;

/**
 * The picker keeps the eager input mask unless the developer set a
 * placeholder(). It used to guess that by comparing the rendered text with
 * its own format hint, so placeholder('mm/yyyy') on format('m/Y') was taken
 * for the hint and hidden under "__/____". The view now says so explicitly.
 */
final class PlaceholderFlagTestComponent extends Component implements HasSchemas
{
    use InteractsWithSchemas;

    public ?array $data = [];

    public static ?string $placeholder = null;

    public function mount(): void
    {
        $this->form->fill();
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->statePath('data')
            ->components([
                DateRangePicker::make('period')
                    ->monthPicker()
                    ->singleCalendar()
                    ->allowInput()
                    ->format('m/Y')
                    ->placeholder(self::$placeholder),
            ]);
    }

    public function render(): string
    {
        return <<<'HTML'
            <div>{{ $this->form }}</div>
            HTML;
    }
}

afterEach(fn () => PlaceholderFlagTestComponent::$placeholder = null);

it('tells the picker a placeholder was set, even one equal to the format hint', function () {
    PlaceholderFlagTestComponent::$placeholder = 'mm/yyyy';

    Livewire::test(PlaceholderFlagTestComponent::class)
        ->assertSeeHtml('hasPlaceholder: true')
        ->assertSeeHtml('placeholder="mm/yyyy"');
});

it('tells the picker no placeholder was set', function () {
    Livewire::test(PlaceholderFlagTestComponent::class)
        ->assertSeeHtml('hasPlaceholder: false');
});

it('treats an empty placeholder as none', function () {
    PlaceholderFlagTestComponent::$placeholder = '';

    Livewire::test(PlaceholderFlagTestComponent::class)
        ->assertSeeHtml('hasPlaceholder: false');
});
