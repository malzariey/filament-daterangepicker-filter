<?php

use Filament\Schemas\Concerns\InteractsWithSchemas;
use Filament\Schemas\Contracts\HasSchemas;
use Filament\Schemas\Schema;
use Livewire\Component;
use Livewire\Livewire;
use Malzariey\FilamentDaterangepickerFilter\Fields\DateRangePicker;

/**
 * A cleared field stores null from the Clear action
 * (DateRangePicker::clear()) and '' from the picker in the browser (a
 * keyboard clear, its clear()), as in 5.0.11. These pin down that the server
 * treats both the same. Unifying every clear to null is planned for 6.0.
 */
final class ClearedStateFormComponent extends Component implements HasSchemas
{
    use InteractsWithSchemas;

    public ?array $data = [];

    public array $savedState = [];

    public function mount(): void
    {
        $this->form->fill(['range' => '01/06/2026 - 10/06/2026']);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->statePath('data')
            ->components([
                DateRangePicker::make('range')->required(),
            ]);
    }

    public function save(): void
    {
        $this->savedState = $this->form->getState();
    }

    public function render(): string
    {
        return <<<'HTML'
            <div>{{ $this->form }}</div>
            HTML;
    }
}

it('stores null from the Clear action', function () {
    $component = Livewire::test(ClearedStateFormComponent::class)
        ->assertSet('data.range', '01/06/2026 - 10/06/2026');

    // The Clear suffix action's ->action() is fn () => $this->clear().
    $component->instance()->form->getFlatFields()['range']->clear();

    expect($component->instance()->data['range'])->toBeNull();
});

it('fails required validation on a cleared field', function (?string $cleared) {
    Livewire::test(ClearedStateFormComponent::class)
        ->set('data.range', $cleared)
        ->call('save')
        ->assertHasErrors(['data.range' => 'required']);
})->with([
    'null' => [null],
    'empty string' => [''],
]);
