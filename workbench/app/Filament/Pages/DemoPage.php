<?php

namespace Workbench\App\Filament\Pages;

use Carbon\Carbon;
use Filament\Actions\Action;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Malzariey\FilamentDaterangepickerFilter\Enums\DropDirection;
use Malzariey\FilamentDaterangepickerFilter\Enums\OpenDirection;
use Malzariey\FilamentDaterangepickerFilter\Fields\DateRangePicker;

class DemoPage extends Page
{
    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-calendar-days';
    protected static ?string $title = 'DateRangePicker Demo';
    protected static ?string $slug = '';
    protected string $view = 'filament.pages.demo';

    public ?array $data = [];

    public function mount(): void
    {
        // Handle locale switching from query parameter
        $locale = request()->query('locale', 'en');
        if (in_array($locale, ['ar', 'en', 'fr', 'de', 'es', 'tr', 'ru', 'ja', 'ko', 'zh_CN'])) {
            app()->setLocale($locale);
        }

        $this->form->fill([
            'dual_start_utc' => '2026-08-04 08:17:00',
            'dual_end_utc' => '2026-08-05 14:43:00',
            'dual_date_start' => '2026-08-04',
            'dual_date_end' => '2026-08-05',
            'dual_partial_start' => '2026-08-04',
            'dual_partial_end' => null,
        ]);
    }

    public function form(Schema $schema): Schema
    {
        $isArabic = app()->getLocale() === 'ar';

        return $schema
            ->schema([
                // ─────────────────────────────────────────────────────
                // Day Picker (Default)
                // ─────────────────────────────────────────────────────
                Section::make($isArabic ? 'منتقي التاريخ (افتراضي)' : 'Day Picker (Default)')
                    ->columns(2)
                    ->schema([
                        DateRangePicker::make('default_range')
                            ->label($isArabic ? 'منتقي النطاق الافتراضي' : 'Default Range Picker')
                            ->placeholder($isArabic ? 'اختر نطاق تاريخ' : 'Select date range'),

                        DateRangePicker::make('single_calendar')
                            ->label($isArabic ? 'تقويم واحد' : 'Single Calendar')
                            ->singleCalendar()
                            ->placeholder($isArabic ? 'تاريخ واحد' : 'Single date'),

                        DateRangePicker::make('with_time_24h')
                            ->label($isArabic ? 'مع منتقي الوقت (24 ساعة)' : 'Time Picker (24h)')
                            ->timePicker()
                            ->timePicker24()
                            ->placeholder($isArabic ? 'تاريخ + نطاق زمني' : 'Date + time range'),

                        DateRangePicker::make('with_time_12h')
                            ->label($isArabic ? 'مع منتقي الوقت (12 ساعة)' : 'Time Picker (12h AM/PM)')
                            ->timePicker()
                            ->placeholder($isArabic ? 'تنسيق 12 ساعة' : '12-hour format'),

                        DateRangePicker::make('auto_apply')
                            ->label($isArabic ? 'تطبيق تلقائي' : 'Auto Apply')
                            ->autoApply()
                            ->placeholder($isArabic ? 'يُطبّق عند الاختيار' : 'Auto-applies on selection'),

                        DateRangePicker::make('week_numbers')
                            ->label($isArabic ? 'مع أرقام الأسابيع' : 'With Week Numbers')
                            ->showWeekNumbers()
                            ->placeholder($isArabic ? 'يعرض أرقام الأسابيع' : 'Shows week numbers'),

                        DateRangePicker::make('dropdowns')
                            ->label($isArabic ? 'مع قوائم الشهر/السنة' : 'With Month/Year Dropdowns')
                            ->showDropdowns()
                            ->placeholder($isArabic ? 'يحتوي قوائم منسدلة' : 'Has dropdowns'),

                        DateRangePicker::make('unlinked_calendars')
                            ->label($isArabic ? 'تقويمات غير مرتبطة' : 'Unlinked Calendars')
                            ->linkedCalendars(false)
                            ->placeholder($isArabic ? 'أشهر مستقلة' : 'Months navigate independently'),
                    ]),

                // ─────────────────────────────────────────────────────
                // Default Values
                // ─────────────────────────────────────────────────────
                Section::make($isArabic ? 'القيم الافتراضية' : 'Default Values')
                    ->columns(2)
                    ->schema([
                        DateRangePicker::make('default_today')
                            ->label($isArabic ? 'اليوم افتراضياً' : 'Default: Today')
                            ->defaultToday()
                            ->placeholder($isArabic ? 'اليوم' : 'Today'),

                        DateRangePicker::make('default_last_7')
                            ->label($isArabic ? 'آخر 7 أيام' : 'Default: Last 7 Days')
                            ->defaultLast7Days()
                            ->placeholder($isArabic ? 'آخر 7 أيام' : 'Last 7 days'),

                        DateRangePicker::make('default_this_month')
                            ->label($isArabic ? 'هذا الشهر' : 'Default: This Month')
                            ->defaultThisMonth()
                            ->placeholder($isArabic ? 'هذا الشهر' : 'This month'),

                        DateRangePicker::make('default_custom')
                            ->label($isArabic ? 'نطاق مخصص' : 'Default: Custom Range')
                            ->defaultCustom(Carbon::parse('2026-01-01'), Carbon::parse('2026-06-30'))
                            ->placeholder($isArabic ? 'مخصص' : 'Jan 1 - Jun 30, 2026'),
                    ]),

                Section::make($isArabic ? 'حالة مزدوجة' : 'Dual State')
                    ->columns(2)
                    ->schema([
                        DateRangePicker::make('dual_state_range')
                            ->label($isArabic ? 'تاريخ البدء والانتهاء' : 'Separate UTC Start / End')
                            ->useDualState('dual_start_utc', 'dual_end_utc', relative: true)
                            ->format('Y-m-d H:i:s', enforceFormat: true)
                            ->displayFormat('DD.MM.YYYY HH:mm')
                            ->timezone('Europe/Berlin')
                            ->timePicker()
                            ->timePicker24()
                            ->timePickerIncrement(1)
                            ->disableRanges()
                            ->extraInputAttributes(['data-testid' => 'dual-state-range']),

                        DateRangePicker::make('dual_date_range')
                            ->label($isArabic ? 'نطاق تاريخ فقط' : 'Date-only without timezone shift')
                            ->useDualState('dual_date_start', 'dual_date_end', relative: true)
                            ->format('Y-m-d', enforceFormat: true)
                            ->displayFormat('DD.MM.YYYY')
                            ->timezone('America/Los_Angeles')
                            ->disableRanges()
                            ->extraInputAttributes(['data-testid' => 'dual-date-only-range']),

                        DateRangePicker::make('dual_partial_range')
                            ->label($isArabic ? 'نطاق غير مكتمل' : 'Incomplete range')
                            ->useDualState('dual_partial_start', 'dual_partial_end', relative: true)
                            ->format('Y-m-d', enforceFormat: true)
                            ->displayFormat('DD.MM.YYYY')
                            ->timezone('Europe/Berlin')
                            ->disableRanges()
                            ->extraInputAttributes(['data-testid' => 'dual-partial-range']),
                    ]),

                // ─────────────────────────────────────────────────────
                // Date Constraints
                // ─────────────────────────────────────────────────────
                Section::make($isArabic ? 'قيود التاريخ' : 'Date Constraints')
                    ->columns(2)
                    ->schema([
                        DateRangePicker::make('min_max_dates')
                            ->label($isArabic ? 'حد أدنى/أقصى' : 'Min/Max Dates (±30 days)')
                            ->minDate(Carbon::now()->subDays(30))
                            ->maxDate(Carbon::now()->addDays(30))
                            ->placeholder($isArabic ? '± 30 يوماً' : 'Only ±30 days from today'),

                        DateRangePicker::make('disabled_dates')
                            ->label($isArabic ? 'تواريخ معطلة' : 'Disabled Dates')
                            ->disabledDates([
                                Carbon::now()->addDays(3)->format('Y-m-d'),
                                Carbon::now()->addDays(5)->format('Y-m-d'),
                                Carbon::now()->addDays(10)->format('Y-m-d'),
                            ])
                            ->placeholder($isArabic ? 'بعض التواريخ معطلة' : 'Some dates are blocked'),

                        DateRangePicker::make('max_span')
                            ->label($isArabic ? 'أقصى نطاق (شهر)' : 'Max Span (1 Month)')
                            ->maxSpan(['months' => 1])
                            ->placeholder($isArabic ? 'شهر واحد كحد أقصى' : 'Cannot exceed 1 month'),
                    ]),

                // ─────────────────────────────────────────────────────
                // Display Formats
                // ─────────────────────────────────────────────────────
                Section::make($isArabic ? 'تنسيقات العرض' : 'Display Formats')
                    ->columns(2)
                    ->schema([
                        DateRangePicker::make('format_ymd')
                            ->label($isArabic ? 'تنسيق Y-m-d' : 'Format: Y-m-d')
                            ->format('Y-m-d')
                            ->placeholder('YYYY-MM-DD'),

                        DateRangePicker::make('format_dmy')
                            ->label($isArabic ? 'تنسيق d.m.Y' : 'Format: d.m.Y')
                            ->format('d.m.Y')
                            ->placeholder('DD.MM.YYYY'),

                        DateRangePicker::make('custom_separator')
                            ->label($isArabic ? 'فاصل مخصص' : 'Custom Separator " to "')
                            ->format('d/m/Y')
                            ->rangeSeparator(' to ')
                            ->placeholder($isArabic ? 'من - إلى' : 'dd/mm/yyyy to dd/mm/yyyy'),
                    ]),

                // ─────────────────────────────────────────────────────
                // Ranges & Presets
                // ─────────────────────────────────────────────────────
                Section::make($isArabic ? 'النطاقات والإعدادات المسبقة' : 'Ranges & Presets')
                    ->columns(2)
                    ->schema([
                        DateRangePicker::make('custom_ranges')
                            ->label($isArabic ? 'نطاقات مخصصة' : 'Custom Ranges')
                            ->ranges([
                                'Last 3 Days' => [now()->subDays(2), now()],
                                'This Quarter' => [now()->startOfQuarter(), now()->endOfQuarter()],
                                'Year to Date' => [now()->startOfYear(), now()],
                            ])
                            ->placeholder($isArabic ? 'نطاقات مخصصة' : 'Custom presets'),

                        DateRangePicker::make('range_labels')
                            ->label($isArabic ? 'عرض اسم النطاق' : 'Show Range Labels')
                            ->useRangeLabels()
                            ->defaultLast7Days()
                            ->placeholder($isArabic ? 'يعرض اسم النطاق' : 'Shows preset name instead of dates'),

                        DateRangePicker::make('no_custom_range')
                            ->label($isArabic ? 'بدون نطاق مخصص' : 'No Custom Range')
                            ->disableCustomRange()
                            ->placeholder($isArabic ? 'فقط نطاقات محددة مسبقاً' : 'Only presets, no custom calendar'),
                    ]),

                // ─────────────────────────────────────────────────────
                // Month & Year Pickers
                // ─────────────────────────────────────────────────────
                Section::make($isArabic ? 'منتقي الشهر والسنة' : 'Month & Year Pickers')
                    ->columns(2)
                    ->schema([
                        DateRangePicker::make('month_picker')
                            ->label($isArabic ? 'منتقي الشهر' : 'Month Picker')
                            ->monthPicker()
                            ->placeholder($isArabic ? 'اختر نطاق شهري' : 'Select month range'),

                        DateRangePicker::make('month_picker_manual_single')
                            ->label($isArabic ? 'منتقي شهر بإدخال يدوي' : 'Month Picker Manual Single')
                            ->monthPicker()
                            ->singleCalendar()
                            ->allowInput()
                            ->format('m/Y')
                            ->placeholder('mm/yyyy'),

                        DateRangePicker::make('year_picker')
                            ->label($isArabic ? 'منتقي السنة' : 'Year Picker')
                            ->yearPicker()
                            ->minYear(2020)
                            ->maxYear(2030)
                            ->placeholder($isArabic ? 'اختر نطاق سنوي' : 'Select year range'),
                    ]),

                // ─────────────────────────────────────────────────────
                // Edge Cases
                // ─────────────────────────────────────────────────────
                Section::make($isArabic ? 'حالات خاصة' : 'Edge Cases')
                    ->columns(2)
                    ->schema([
                        DateRangePicker::make('no_ranges')
                            ->label($isArabic ? 'بدون نطاقات محددة مسبقاً' : 'No Preset Ranges')
                            ->disableRanges()
                            ->placeholder($isArabic ? 'بدون نطاقات' : 'No presets'),

                        DateRangePicker::make('allow_input')
                            ->label($isArabic ? 'إدخال يدوي' : 'Manual Input')
                            ->allowInput()
                            ->placeholder($isArabic ? 'اكتب تاريخاً' : 'Type a date'),

                        DateRangePicker::make('timezone_utc')
                            ->label($isArabic ? 'منطقة زمنية UTC' : 'Timezone: UTC')
                            ->timezone('UTC')
                            ->defaultToday()
                            ->placeholder('UTC timezone'),

                        DateRangePicker::make('positioning')
                            ->label($isArabic ? 'فتح للأعلى ومن المنتصف' : 'Opens Center, Drops Up')
                            ->drops(DropDirection::UP)
                            ->opens(OpenDirection::CENTER)
                            ->placeholder($isArabic ? 'أعلى - وسط' : 'Up + Center'),
                    ]),
            ])
            ->statePath('data');
    }

    public function slideOverAction(): Action
    {
        $isArabic = app()->getLocale() === 'ar';

        return Action::make('slideOver')
            ->label($isArabic ? 'فتح في نافذة جانبية' : 'Open in Slide Over')
            ->icon('heroicon-o-rectangle-stack')
            ->slideOver()
            ->form([
                DateRangePicker::make('slideover_range')
                    ->label($isArabic ? 'النطاق في النافذة الجانبية' : 'Range in Slide Over')
                    ->placeholder($isArabic ? 'منتقي داخل النافذة الجانبية' : 'Picker inside slide-over'),

                DateRangePicker::make('slideover_time')
                    ->label($isArabic ? 'منتقي الوقت في النافذة الجانبية' : 'Time Picker in Slide Over')
                    ->timePicker()
                    ->timePicker24()
                    ->placeholder($isArabic ? 'منتقي وقت داخل النافذة الجانبية' : 'Time picker inside slide-over'),
            ])
            ->action(fn (array $data) => null);
    }
}
