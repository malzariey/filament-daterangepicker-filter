<?php

namespace Workbench\App\Livewire;

use Closure;
use Filament\Actions\Concerns\InteractsWithActions;
use Filament\Actions\Contracts\HasActions;
use Filament\Schemas\Concerns\InteractsWithSchemas;
use Filament\Schemas\Contracts\HasSchemas;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Concerns\InteractsWithTable;
use Filament\Tables\Contracts\HasTable;
use Filament\Tables\Table;
use Livewire\Component;
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;
use Workbench\App\Models\Booking;

/**
 * A plain Filament table with one DateRangeFilter on `booked_at`.
 *
 * Tests shape the filter through $configureFilter (monthPicker(), a display
 * timezone, closures for firstDayOfWeek/autoApply) before mounting.
 */
class BookingsTable extends Component implements HasActions, HasSchemas, HasTable
{
    use InteractsWithActions;
    use InteractsWithSchemas;
    use InteractsWithTable;

    /** @var (Closure(DateRangeFilter): mixed)|null */
    public static ?Closure $configureFilter = null;

    /** Read the filter state from the session, the way a panel list does. */
    public static bool $persistFiltersInSession = false;

    public function table(Table $table): Table
    {
        $filter = DateRangeFilter::make('booked_at');

        if (static::$configureFilter !== null) {
            (static::$configureFilter)($filter);
        }

        return $table
            ->query(Booking::query())
            ->columns([
                TextColumn::make('name'),
                TextColumn::make('booked_at'),
            ])
            ->filters([$filter])
            ->persistFiltersInSession(static::$persistFiltersInSession)
            ->paginated(false);
    }

    public function render(): string
    {
        return <<<'BLADE'
            <div>{{ $this->table }}</div>
        BLADE;
    }
}
