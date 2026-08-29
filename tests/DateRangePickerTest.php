<?php

use Carbon\Carbon;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Repeater;
use Filament\Schemas\Concerns\InteractsWithSchemas;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Contracts\HasSchemas;
use Filament\Schemas\Schema;
use Livewire\Component;
use Livewire\Livewire;
use Malzariey\FilamentDaterangepickerFilter\Enums\DropDirection;
use Malzariey\FilamentDaterangepickerFilter\Enums\OpenDirection;
use Malzariey\FilamentDaterangepickerFilter\Enums\PickerType;
use Malzariey\FilamentDaterangepickerFilter\Fields\DateRangePicker;

final class DualStateFormTestComponent extends Component implements HasSchemas
{
    use InteractsWithSchemas;

    public ?array $data = [];

    public string $scenario = 'relative';

    public ?string $start_date = null;

    public ?string $end_date = null;

    public array $outside = [];

    public array $savedState = [];

    public array $savedBackingState = [];

    public function mount(string $scenario = 'relative'): void
    {
        $this->scenario = $scenario;

        if ($scenario === 'direct') {
            $this->start_date = '2026-08-04';
            $this->end_date = '2026-08-05';
        }

        if ($scenario === 'absolute') {
            $this->outside = [
                'start_date' => '2026-08-04',
                'end_date' => '2026-08-05',
            ];
        }

        $this->form->fill($this->getInitialFormState());
    }

    /**
     * @return array<string, mixed>
     */
    private function getInitialFormState(): array
    {
        if (in_array($this->scenario, ['direct', 'absolute'], strict: true)) {
            return [
                'date_range' => '04/08/2026 - 05/08/2026',
            ];
        }

        if ($this->scenario === 'parent_not_dehydrated') {
            return [
                'date_range' => '04/08/2026 - 05/08/2026',
                'start_date' => '2026-08-04',
                'end_date' => '2026-08-05',
            ];
        }

        if ($this->scenario === 'missing_backing_state') {
            return [
                'dates' => [[]],
            ];
        }

        return [
            'dates' => [[
                'start_date' => '2026-08-04',
                'end_date' => '2026-08-05',
            ]],
        ];
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->statePath('data')
            ->components(match ($this->scenario) {
                'direct' => [
                    DateRangePicker::make('date_range')
                        ->useDualState('start_date', 'end_date'),
                ],
                'absolute' => [
                    DateRangePicker::make('date_range')
                        ->useDualState('/outside.start_date', '/outside.end_date', relative: true),
                ],
                'not_dehydrated' => [
                    Repeater::make('dates')
                        ->schema([
                            DateRangePicker::make('date_range')
                                ->useDualState('start_date', 'end_date', relative: true)
                                ->dehydrated(false),
                        ]),
                ],
                'hidden' => [
                    Repeater::make('dates')
                        ->schema([
                            DateRangePicker::make('date_range')
                                ->useDualState('start_date', 'end_date', relative: true)
                                ->hidden(),
                        ]),
                ],
                'parent_not_dehydrated' => [
                    Section::make()
                        ->dehydrated(false)
                        ->schema([
                            DateRangePicker::make('date_range')
                                ->useDualState('start_date', 'end_date', relative: true),
                        ]),
                ],
                'backing_fields' => [
                    Repeater::make('dates')
                        ->schema([
                            Hidden::make('start_date'),
                            DateRangePicker::make('date_range')
                                ->useDualState('start_date', 'end_date', relative: true)
                                ->dehydrated(false),
                            Hidden::make('end_date'),
                        ]),
                ],
                default => [
                    Repeater::make('dates')
                        ->schema([
                            DateRangePicker::make('date_range')
                                ->useDualState('start_date', 'end_date', relative: true)
                                ->required(),
                        ]),
                ],
            });
    }

    public function saveState(): void
    {
        $this->savedState = $this->form->getState();
        $this->savedBackingState = [
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'outside' => $this->outside,
        ];
    }

    public function render(): string
    {
        return <<<'HTML'
            <div>
                <form wire:submit="saveState">
                    {{ $this->form }}

                    <button type="submit">Save</button>
                </form>
            </div>
            HTML;
    }
}

// ─────────────────────────────────────────────────────────────
// New Features (v4.0)
// ─────────────────────────────────────────────────────────────

describe('New Features', function () {
    it('can create a date range picker', function () {
        $field = DateRangePicker::make('test_field');
        expect($field)->toBeInstanceOf(DateRangePicker::class);
    });

    it('can set teleport option', function () {
        $field = DateRangePicker::make('test_field')->teleport(true);
        expect($field->getTeleport())->toBeTrue();

        $field->teleport(false);
        expect($field->getTeleport())->toBeFalse();
    });

    it('has teleport enabled by default', function () {
        $field = DateRangePicker::make('test_field');
        expect($field->getTeleport())->toBeTrue();
    });

    it('can set allow input option', function () {
        $field = DateRangePicker::make('test_field')->allowInput(true);
        expect($field->getAllowInput())->toBeTrue();
    });

    it('has allow input disabled by default', function () {
        $field = DateRangePicker::make('test_field');
        expect($field->getAllowInput())->toBeFalse();
    });

    it('defaults to day picker type', function () {
        $field = DateRangePicker::make('test_field');
        expect($field->getPickerType())->toBe(PickerType::DAY)
            ->and($field->getPickerTypeValue())->toBe('day');
    });

    it('can set month picker type', function () {
        $field = DateRangePicker::make('test_field')->monthPicker();
        expect($field->getPickerType())->toBe(PickerType::MONTH)
            ->and($field->getPickerTypeValue())->toBe('month');
    });

    it('can set year picker type', function () {
        $field = DateRangePicker::make('test_field')->yearPicker();
        expect($field->getPickerType())->toBe(PickerType::YEAR)
            ->and($field->getPickerTypeValue())->toBe('year');
    });

    it('can set dual state fields', function () {
        $field = DateRangePicker::make('test_field')
            ->useDualState('start_date', 'end_date');

        expect($field->isDualState())->toBeTrue()
            ->and($field->getDualStartField())->toBe('start_date')
            ->and($field->getDualEndField())->toBe('end_date')
            ->and($field->areDualStatePathsRelative())->toBeFalse();
    });

    it('is not dual state by default', function () {
        $field = DateRangePicker::make('test_field');
        expect($field->isDualState())->toBeFalse()
            ->and($field->getDualStartField())->toBeNull()
            ->and($field->getDualEndField())->toBeNull();
    });

    it('keeps existing dual state fields as direct Livewire paths', function () {
        $livewire = new class extends Component implements HasSchemas
        {
            use InteractsWithSchemas;

            public ?array $data = [];

            public function render(): string
            {
                return '';
            }
        };
        $field = DateRangePicker::make('date_range')
            ->useDualState('start_date', 'end_date');

        $schema = Schema::make($livewire)
            ->statePath('data')
            ->components([$field]);
        $schema->getComponents();

        expect($field->getDualStartStatePath())->toBe('start_date')
            ->and($field->getDualEndStatePath())->toBe('end_date');

        Livewire::test(DualStateFormTestComponent::class, ['scenario' => 'direct'])
            ->assertSee('dateRangeComponent', escape: false)
            ->set('start_date', '2026-08-10')
            ->set('end_date', '2026-08-11')
            ->call('saveState')
            ->assertSet('savedState', [])
            ->assertSet('savedBackingState', [
                'start_date' => '2026-08-10',
                'end_date' => '2026-08-11',
                'outside' => [],
            ]);
    });

    it('resolves opted-in dual state fields relative to the current schema container', function () {
        $livewire = new class extends Component implements HasSchemas
        {
            use InteractsWithSchemas;

            public ?array $data = [];

            public function render(): string
            {
                return '';
            }
        };
        $field = DateRangePicker::make('date_range')
            ->useDualState('start_date', 'end_date', relative: true);

        $schema = Schema::make($livewire)
            ->statePath('data')
            ->components([$field]);
        $schema->getComponents();

        expect($field->areDualStatePathsRelative())->toBeTrue()
            ->and($field->getDualStartStatePath())->toBe('data.start_date')
            ->and($field->getDualEndStatePath())->toBe('data.end_date');
    });

    it('supports absolute dual state paths', function () {
        $livewire = new class extends Component implements HasSchemas
        {
            use InteractsWithSchemas;

            public ?array $data = [];

            public function render(): string
            {
                return '';
            }
        };
        $field = DateRangePicker::make('date_range')
            ->useDualState('/start_date', '/end_date', relative: true);

        $schema = Schema::make($livewire)
            ->statePath('data')
            ->components([$field]);
        $schema->getComponents();

        expect($field->getDualStartStatePath())->toBe('start_date')
            ->and($field->getDualEndStatePath())->toBe('end_date');

        Livewire::test(DualStateFormTestComponent::class, ['scenario' => 'absolute'])
            ->assertSee('dateRangeComponent', escape: false)
            ->set('outside.start_date', '2026-08-10')
            ->set('outside.end_date', '2026-08-11')
            ->call('saveState')
            ->assertSet('savedState', [])
            ->assertSet('savedBackingState', [
                'start_date' => null,
                'end_date' => null,
                'outside' => [
                    'start_date' => '2026-08-10',
                    'end_date' => '2026-08-11',
                ],
            ]);
    });

    it('dehydrates relative dual state into repeater items without backing fields', function () {
        Livewire::test(DualStateFormTestComponent::class)
            ->assertSee('dateRangeComponent', escape: false)
            ->call('saveState')
            ->assertSet('savedState', [
                'dates' => [[
                    'start_date' => '2026-08-04',
                    'end_date' => '2026-08-05',
                ]],
            ]);
    });

    it('returns relative dual state through the public form state API', function () {
        Livewire::test(DualStateFormTestComponent::class)
            ->call('saveState')
            ->assertSet('savedState', [
                'dates' => [[
                    'start_date' => '2026-08-04',
                    'end_date' => '2026-08-05',
                ]],
            ]);
    });

    it('initializes missing relative backing paths before Livewire entangles them', function () {
        Livewire::test(DualStateFormTestComponent::class, ['scenario' => 'missing_backing_state'])
            ->assertSet('data.dates', function (array $dates): bool {
                $date = reset($dates);

                return is_array($date)
                    && array_key_exists('start_date', $date)
                    && array_key_exists('end_date', $date)
                    && $date['start_date'] === null
                    && $date['end_date'] === null;
            })
            ->assertSee('dateRangeComponent', escape: false);
    });

    it('removes picker-owned backing values when the field is not dehydrated', function () {
        Livewire::test(DualStateFormTestComponent::class, ['scenario' => 'not_dehydrated'])
            ->call('saveState')
            ->assertSet('savedState', [
                'dates' => [[]],
            ]);
    });

    it('removes picker-owned backing values when the field is hidden', function () {
        Livewire::test(DualStateFormTestComponent::class, ['scenario' => 'hidden'])
            ->call('saveState')
            ->assertSet('savedState', [
                'dates' => [[]],
            ]);
    });

    it('removes picker-owned backing values when a state-less parent is not dehydrated', function () {
        Livewire::test(DualStateFormTestComponent::class, ['scenario' => 'parent_not_dehydrated'])
            ->call('saveState')
            ->assertSet('savedState', []);
    });

    it('preserves backing values owned by real Filament fields', function () {
        Livewire::test(DualStateFormTestComponent::class, ['scenario' => 'backing_fields'])
            ->call('saveState')
            ->assertSet('savedState', [
                'dates' => [[
                    'start_date' => '2026-08-04',
                    'end_date' => '2026-08-05',
                ]],
            ]);
    });

    it('exposes the storage format and application timezone for dual state', function () {
        config()->set('app.timezone', 'UTC');

        $field = DateRangePicker::make('date_range')
            ->format('Y-m-d H:i:s', enforceFormat: true)
            ->displayFormat('DD.MM.YYYY HH:mm:ss')
            ->useDualState('start_date', 'end_date');

        expect($field->getDualStateStorageFormat())->toBe('YYYY-MM-DD HH:mm:ss')
            ->and($field->getDualStateStorageTimezone())->toBe('UTC');
    });
});

// ─────────────────────────────────────────────────────────────
// Date Constraints
// ─────────────────────────────────────────────────────────────

describe('Date Constraints', function () {
    it('can set min date', function () {
        $date = Carbon::parse('2024-01-01');
        $field = DateRangePicker::make('test_field')->minDate($date);
        expect($field->getMinDate())->toEqual($date);
    });

    it('can set max date', function () {
        $date = Carbon::parse('2024-12-31');
        $field = DateRangePicker::make('test_field')->maxDate($date);
        expect($field->getMaxDate())->toEqual($date);
    });

    it('can set disabled dates', function () {
        $dates = ['2024-12-25', '2024-12-26'];
        $field = DateRangePicker::make('test_field')->disabledDates($dates);
        expect($field->getDisabledDates())->toBe($dates);
    });

    it('can set min year', function () {
        $field = DateRangePicker::make('test_field')->minYear(2020);
        expect($field->getMinYear())->toBe(2020);
    });

    it('can set max year', function () {
        $field = DateRangePicker::make('test_field')->maxYear(2030);
        expect($field->getMaxYear())->toBe(2030);
    });

    it('can set max span', function () {
        $span = ['months' => 1];
        $field = DateRangePicker::make('test_field')->maxSpan($span);
        expect($field->getMaxSpan())->toBe($span);
    });
});

// ─────────────────────────────────────────────────────────────
// Display & Format Options
// ─────────────────────────────────────────────────────────────

describe('Display Options', function () {
    it('can set display format', function () {
        $field = DateRangePicker::make('test_field')->displayFormat('DD/MM/YYYY');
        expect($field->getDisplayFormat())->toBe('DD/MM/YYYY');
    });

    it('can set PHP format', function () {
        $field = DateRangePicker::make('test_field')->format('d/m/Y');
        expect($field->getFormat())->toBe('d/m/Y');
    });

    it('can set range separator', function () {
        $field = DateRangePicker::make('test_field')->rangeSeparator(' to ');
        expect($field->getRangeSeparator())->toBe(' to ');
    });

    it('can set first day of week', function () {
        $field = DateRangePicker::make('test_field')->firstDayOfWeek(1);
        expect($field->getFirstDayOfWeek())->toBe(1);
    });

    it('can show week numbers', function () {
        $field = DateRangePicker::make('test_field')->showWeekNumbers();
        expect($field->getShowWeekNumbers())->toBeTrue();
    });

    it('can show ISO week numbers', function () {
        $field = DateRangePicker::make('test_field')->showISOWeekNumbers();
        expect($field->getShowISOWeekNumbers())->toBeTrue();
    });

    it('can show dropdowns', function () {
        $field = DateRangePicker::make('test_field')->showDropdowns();
        expect($field->getShowDropdowns())->toBeTrue();
    });
});

// ─────────────────────────────────────────────────────────────
// Positioning
// ─────────────────────────────────────────────────────────────

describe('Positioning', function () {
    it('can set drop direction to down', function () {
        $field = DateRangePicker::make('test_field')->drops(DropDirection::DOWN);
        expect($field->getDrops())->toBeIn([DropDirection::DOWN, 'down']);
    });

    it('can set drop direction to up', function () {
        $field = DateRangePicker::make('test_field')->drops(DropDirection::UP);
        expect($field->getDrops())->toBeIn([DropDirection::UP, 'up']);
    });

    it('can set open direction to left', function () {
        $field = DateRangePicker::make('test_field')->opens(OpenDirection::LEFT);
        // getOpens returns the string value
        expect($field->getOpens())->toBeIn([OpenDirection::LEFT, 'left']);
    });

    it('can set open direction to right', function () {
        $field = DateRangePicker::make('test_field')->opens(OpenDirection::RIGHT);
        expect($field->getOpens())->toBeIn([OpenDirection::RIGHT, 'right']);
    });

    it('can set open direction to center', function () {
        $field = DateRangePicker::make('test_field')->opens(OpenDirection::CENTER);
        expect($field->getOpens())->toBeIn([OpenDirection::CENTER, 'center']);
    });
});

// ─────────────────────────────────────────────────────────────
// Time Picker
// ─────────────────────────────────────────────────────────────

describe('Time Picker', function () {
    it('can enable time picker', function () {
        $field = DateRangePicker::make('test_field')->timePicker();
        expect($field->getTimePicker())->toBeTrue();
    });

    it('can enable 24-hour format', function () {
        $field = DateRangePicker::make('test_field')->timePicker24();
        expect($field->getTimePicker24())->toBeTrue();
    });

    it('can enable seconds', function () {
        $field = DateRangePicker::make('test_field')->timePickerSecond();
        expect($field->getTimePickerSecond())->toBeTrue();
    });

    it('can set time increment', function () {
        $field = DateRangePicker::make('test_field')->timePickerIncrement(30);
        expect($field->getTimePickerIncrement())->toBe(30);
    });
});

// ─────────────────────────────────────────────────────────────
// Calendar Options
// ─────────────────────────────────────────────────────────────

describe('Calendar Options', function () {
    it('can enable single calendar', function () {
        $field = DateRangePicker::make('test_field')->singleCalendar();
        expect($field->getSingleCalendar())->toBeTrue();
    });

    it('can enable linked calendars', function () {
        $field = DateRangePicker::make('test_field')->linkedCalendars();
        expect($field->getLinkedCalendars())->toBeTrue();
    });

    it('can always show calendar', function () {
        $field = DateRangePicker::make('test_field')->alwaysShowCalendar();
        expect($field->isAlwaysShowCalendar())->toBeTrue();
    });

    it('can enable auto apply', function () {
        $field = DateRangePicker::make('test_field')->autoApply();
        expect($field->getAutoApply())->toBeTrue();
    });
});

// ─────────────────────────────────────────────────────────────
// Ranges
// ─────────────────────────────────────────────────────────────

describe('Ranges', function () {
    it('can set custom ranges', function () {
        $ranges = [
            'Today' => [Carbon::today(), Carbon::today()],
            'Last 7 Days' => [Carbon::today()->subDays(6), Carbon::today()],
        ];
        $field = DateRangePicker::make('test_field')->ranges($ranges);
        // Ranges may be converted to strings internally
        expect($field->getRanges())->toHaveCount(2)
            ->and($field->getRanges())->toHaveKey('Today')
            ->and($field->getRanges())->toHaveKey('Last 7 Days');
    });

    it('can disable ranges', function () {
        $field = DateRangePicker::make('test_field')->disableRanges();
        expect($field->getDisableRanges())->toBeTrue();
    });

    it('can disable custom range', function () {
        $field = DateRangePicker::make('test_field')->disableCustomRange();
        expect($field->getDisableCustomRange())->toBeTrue();
    });

    it('can use range labels', function () {
        $field = DateRangePicker::make('test_field')->useRangeLabels();
        expect($field->getUseRangeLabels())->toBeTrue();
    });
});

// ─────────────────────────────────────────────────────────────
// Default Date Shortcuts
// ─────────────────────────────────────────────────────────────

describe('Default Dates', function () {
    it('can set start and end dates', function () {
        $start = Carbon::parse('2024-01-01');
        $end = Carbon::parse('2024-01-31');
        $field = DateRangePicker::make('test_field')
            ->startDate($start)
            ->endDate($end);
        expect($field->getStartDate())->toEqual($start)
            ->and($field->getEndDate())->toEqual($end);
    });

    it('can set timezone', function () {
        $field = DateRangePicker::make('test_field')->timezone('America/New_York');
        expect($field->getTimezone())->toBe('America/New_York');
    });
});

// ─────────────────────────────────────────────────────────────
// Icon and Clear
// ─────────────────────────────────────────────────────────────

describe('Icon and Clear', function () {
    it('can set custom icon', function () {
        $field = DateRangePicker::make('test_field')->icon('heroicon-o-calendar');
        expect($field->getIcon())->toBe('heroicon-o-calendar');
    });

    it('can disable clear', function () {
        $field = DateRangePicker::make('test_field')->disableClear();
        // disableClear modifies the suffix action, verify it returns the field
        expect($field)->toBeInstanceOf(DateRangePicker::class);
    });
});
