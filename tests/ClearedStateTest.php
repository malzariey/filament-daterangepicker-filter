<?php

use Filament\Schemas\Concerns\InteractsWithSchemas;
use Filament\Schemas\Contracts\HasSchemas;
use Filament\Schemas\Schema;
use Livewire\Component;
use Livewire\Livewire;
use Malzariey\FilamentDaterangepickerFilter\Fields\DateRangePicker;

/**
 * A cleared field stores null, whichever way it was cleared: the Clear
 * action (DateRangePicker::clear()) and the picker in the browser alike.
 * These pin down what the server does with that value, and with the empty
 * string the picker sent from a keyboard clear before 5.0.12.
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
