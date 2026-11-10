<?php

use Filament\Schemas\Concerns\InteractsWithSchemas;
use Filament\Schemas\Contracts\HasSchemas;
use Filament\Schemas\Schema;
use Livewire\Component;
use Livewire\Livewire;
use Malzariey\FilamentDaterangepickerFilter\Fields\DateRangePicker;

/**
 * What the field renders for the dropdown's placement and calendars.
 *
 * teleport(false) used to change only floating-ui's strategy: the template
 * always carried x-teleport="body", so the dropdown still ended up in <body>.
 * With teleport(false) it now renders in place, inside the field's root.
 */
final class DropdownRenderFormComponent extends Component implements HasSchemas
{
    use InteractsWithSchemas;

    public ?array $data = [];

    public bool $teleport = true;

    public bool $alwaysShowCalendar = true;

    public bool $disableCustomRange = false;

    public function mount(bool $teleport = true, bool $alwaysShowCalendar = true, bool $disableCustomRange = false): void
    {
        $this->teleport = $teleport;
        $this->alwaysShowCalendar = $alwaysShowCalendar;
        $this->disableCustomRange = $disableCustomRange;
        $this->form->fill();
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->statePath('data')
            ->components([
                DateRangePicker::make('range')
                    ->teleport($this->teleport)
                    ->alwaysShowCalendar($this->alwaysShowCalendar)
                    ->disableCustomRange($this->disableCustomRange),
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
 * The <template> that wraps the dropdown, as [attribute => value].
 */
function dropdownTemplateAttributes(string $html): array
{
    $document = new DOMDocument;
    libxml_use_internal_errors(true);
    $document->loadHTML('<?xml encoding="utf-8"?>'.$html);
    libxml_clear_errors();

    $xpath = new DOMXPath($document);
    $root = $xpath->query('//*[contains(concat(" ", normalize-space(@class), " "), " fi-fo-date-range-picker ")]')->item(0);
    expect($root)->not->toBeNull();

    // A <template>'s content is parsed as its children by DOMDocument.
    $dropdown = $xpath->query('.//*[contains(concat(" ", normalize-space(@class), " "), " fi-daterangepicker-dropdown ")]', $root)->item(0);
    expect($dropdown)->not->toBeNull('the dropdown markup is inside the field root');

    $template = $dropdown->parentNode;
    expect($template->nodeName)->toBe('template');

    $attributes = [];
    foreach ($template->attributes as $attribute) {
        $attributes[$attribute->nodeName] = $attribute->nodeValue;
    }

    return $attributes;
}

it('teleports the dropdown to <body> by default', function () {
    $html = Livewire::test(DropdownRenderFormComponent::class)->html();

    expect(dropdownTemplateAttributes($html))->toBe(['x-teleport' => 'body'])
        ->and($html)->toContain('teleport: true');
});

it('renders the dropdown in place with teleport(false)', function () {
    $html = Livewire::test(DropdownRenderFormComponent::class, ['teleport' => false])->html();

    expect(dropdownTemplateAttributes($html))->toBe(['x-if' => 'true'])
        ->and($html)->toContain('teleport: false')
        ->and($html)->not->toContain('x-teleport=');
});

/**
 * alwaysShowCalendar(false) hides the calendars until "Custom" is chosen.
 * disableCustomRange() has no Custom entry, so the server sends false for it
 * too; the JS lets presets-only mode win either way.
 */
it('sends alwaysShowCalendars to the picker', function (bool $alwaysShow, bool $disableCustom, string $expected) {
    $html = Livewire::test(DropdownRenderFormComponent::class, [
        'alwaysShowCalendar' => $alwaysShow,
        'disableCustomRange' => $disableCustom,
    ])->html();

    expect($html)->toContain($expected)
        ->and($html)->toContain('customRangeLabel: \'Custom\'');
})->with([
    'default' => [true, false, 'alwaysShowCalendars: true'],
    'hidden until Custom' => [false, false, 'alwaysShowCalendars: false'],
    'presets only' => [true, true, 'alwaysShowCalendars: false'],
]);
