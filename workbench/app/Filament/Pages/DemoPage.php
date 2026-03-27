<?php

namespace Workbench\App\Filament\Pages;

use Filament\Actions\Action;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
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

        $this->form->fill();
    }

    public function form(Schema $schema): Schema
    {
        $isArabic = app()->getLocale() === 'ar';

        return $schema
            ->schema([
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

                        DateRangePicker::make('with_time')
                            ->label($isArabic ? 'مع منتقي الوقت (24 ساعة)' : 'With Time Picker (24h)')
                            ->timePicker()
                            ->timePicker24()
                            ->placeholder($isArabic ? 'تاريخ + نطاق زمني' : 'Date + time range'),

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
                    ]),

                Section::make($isArabic ? 'منتقي الشهر والسنة' : 'Month & Year Pickers')
                    ->columns(2)
                    ->schema([
                        DateRangePicker::make('month_picker')
                            ->label($isArabic ? 'منتقي الشهر' : 'Month Picker')
                            ->monthPicker()
                            ->placeholder($isArabic ? 'اختر نطاق شهري' : 'Select month range'),

                        DateRangePicker::make('year_picker')
                            ->label($isArabic ? 'منتقي السنة' : 'Year Picker')
                            ->yearPicker()
                            ->placeholder($isArabic ? 'اختر نطاق سنوي' : 'Select year range'),
                    ]),

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
