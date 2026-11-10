<?php

use Filament\Schemas\Concerns\InteractsWithSchemas;
use Filament\Schemas\Contracts\HasSchemas;
use Filament\Schemas\Schema;
use Livewire\Component;
use Livewire\Livewire;
use Malzariey\FilamentDaterangepickerFilter\Fields\DateRangePicker;

final class ReadOnlyFormTestComponent extends Component implements HasSchemas
{
    use InteractsWithSchemas;

    public ?array $data = [];

    public array $savedState = [];

    public function mount(): void
    {
        $this->form->fill(['period' => '04/08/2026 - 05/08/2026']);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->statePath('data')
            ->components([
                DateRangePicker::make('period')->readOnly(),
            ]);
    }

    public function saveState(): void
    {
        $this->savedState = $this->form->getState();
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

function mountInSchema(DateRangePicker $field): DateRangePicker
{
    $livewire = new class extends Component implements HasSchemas
    {
        use InteractsWithSchemas;

        public ?array $data = [];

        public function render(): string
        {
            return '';
        }
    };

    Schema::make($livewire)->statePath('data')->components([$field])->getComponents();

    return $field;
}

function clearAction(DateRangePicker $field): ?\Filament\Actions\Action
{
    return collect(mountInSchema($field)->getSuffixActions())->first();
}

describe('icon() and disableClear() call order', function () {
    it('shows the custom icon when icon() is called before disableClear()', function () {
        $field = DateRangePicker::make('period')->icon('heroicon-o-clock')->disableClear();

        expect(mountInSchema($field)->getSuffixIcon())->toBe('heroicon-o-clock');
    });

    it('shows the custom icon when icon() is called after disableClear()', function () {
        $field = DateRangePicker::make('period')->disableClear()->icon('heroicon-o-clock');

        expect(mountInSchema($field)->getSuffixIcon())->toBe('heroicon-o-clock');
    });

    it('puts the custom icon on the clear action when icon() is called before disableClear(false)', function () {
        $field = DateRangePicker::make('period')->icon('heroicon-o-clock')->disableClear(false);

        expect(clearAction($field)?->getIcon())->toBe('heroicon-o-clock');
    });

    it('puts the custom icon on the clear action when icon() is called after disableClear(false)', function () {
        $field = DateRangePicker::make('period')->disableClear(false)->icon('heroicon-o-clock');

        expect(clearAction($field)?->getIcon())->toBe('heroicon-o-clock');
    });

    it('evaluates an icon closure when the field renders, not when disableClear() is called', function () {
        $icon = 'heroicon-o-clock';
        $field = DateRangePicker::make('period')->disableClear()->icon(function () use (&$icon) {
            return $icon;
        });
        $icon = 'heroicon-o-calendar';

        expect(mountInSchema($field)->getSuffixIcon())->toBe('heroicon-o-calendar');
    });

    it('keeps the default calendar icon when icon() is never called', function () {
        expect(mountInSchema(DateRangePicker::make('period')->disableClear())->getSuffixIcon())
            ->toBe('heroicon-m-calendar-days')
            ->and(clearAction(DateRangePicker::make('period')->disableClear(false))?->getIcon())
            ->toBe('heroicon-m-calendar-days');
    });
});

describe('readOnly()', function () {
    it('is available on the field', function () {
        $field = DateRangePicker::make('period')->readOnly();

        expect($field->isReadOnly())->toBeTrue()
            ->and(DateRangePicker::make('period')->isReadOnly())->toBeFalse();
    });

    it('hides the clear action while read-only', function () {
        expect(clearAction(DateRangePicker::make('period')->readOnly()->disableClear(false))?->isHidden())->toBeTrue()
            ->and(clearAction(DateRangePicker::make('period')->disableClear(false))?->isHidden())->toBeFalse();
    });

    it('tells the picker it is read-only, so it does not open', function () {
        Livewire::test(ReadOnlyFormTestComponent::class)
            ->assertSeeHtml('readOnly: true')
            ->assertSeeHtml('readonly="readonly"');
    });

    it('still dehydrates its value, unlike disabled()', function () {
        Livewire::test(ReadOnlyFormTestComponent::class)
            ->call('saveState')
            ->assertSet('savedState', ['period' => '04/08/2026 - 05/08/2026']);
    });
});
