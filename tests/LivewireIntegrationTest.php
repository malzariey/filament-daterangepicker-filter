<?php

use Filament\Forms\ComponentContainer;
use Filament\Forms\Form;
use Illuminate\Support\Facades\Blade;
use Livewire\Livewire;
use Malzariey\FilamentDaterangepickerFilter\Fields\DateRangePicker;

// ─────────────────────────────────────────────────────────────
// View Rendering Tests
// ─────────────────────────────────────────────────────────────

describe('View Rendering', function () {
    it('can be required', function () {
        $field = DateRangePicker::make('date_range')->required();
        expect($field->isRequired())->toBeTrue();
    });
});
