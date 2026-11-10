<?php

namespace Workbench\App\Filament\Pages;

use Filament\Pages\Page;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Concerns\InteractsWithTable;
use Filament\Tables\Contracts\HasTable;
use Filament\Tables\Table;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Schema;
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;
use Workbench\App\Models\Booking;

/**
 * A Filament table with DateRangeFilter in its filter dropdown, so the filter
 * can be seen and clicked in a real panel (the demo page only has fields).
 *
 * The rows are spread over the past 60 days and kept in whatever database the
 * workbench runs on; with the default in-memory SQLite they are rebuilt on
 * every request.
 */
class TableDemoPage extends Page implements HasTable
{
    use InteractsWithTable;

    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-table-cells';

    protected static ?string $title = 'DateRangeFilter Table Demo';

    protected static ?string $slug = 'table';

    protected string $view = 'filament.pages.table-demo';

    public static function ensureBookings(): void
    {
        if (Schema::hasTable('bookings')) {
            return;
        }

        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->dateTime('booked_at');
        });

        foreach ([0, 1, 2, 5, 9, 15, 25, 40, 59] as $i => $daysAgo) {
            Booking::query()->create([
                'name' => 'Booking ' . ($i + 1),
                'booked_at' => Carbon::today()->subDays($daysAgo)->setTime(10, 30),
            ]);
        }
    }

    public function mount(): void
    {
        $locale = request()->query('locale', 'en');

        if (in_array($locale, ['ar', 'en'])) {
            app()->setLocale($locale);
        }
    }

    public function table(Table $table): Table
    {
        static::ensureBookings();

        return $table
            ->query(Booking::query())
            ->columns([
                TextColumn::make('name'),
                TextColumn::make('booked_at')->dateTime(),
            ])
            ->defaultSort('booked_at', 'desc')
            ->filters([
                DateRangeFilter::make('booked_at')->autoApply(),
                // Month names in the state: the browser writes them in the
                // page locale ("أكتوبر 2026" on ?locale=ar).
                DateRangeFilter::make('booked_month')
                    ->label('Booked month')
                    ->useColumn('booked_at')
                    ->monthPicker()
                    ->format('F Y')
                    ->autoApply(),
            ])
            ->paginated(false);
    }
}
