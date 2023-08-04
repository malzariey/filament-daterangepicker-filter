@php
    $name = uniqid();
@endphp
<x-dynamic-component
    :component="$getFieldWrapperView()"
    :field="$field"
>
    <div
        wire:ignore
    >
    <div class="bg-[#ebf4f8]"></div>
    <div
        x-ref="container"
        x-data="dateRangeComponent({
                state:  @entangle($getStatePath()),
                name: @js($name),
                alwaysShowCalendars: @js($isAlwaysShowCalender()),
                autoApply: @js($getAutoApplyOption()),
                linkedCalendars: @js($getLinkedCalendarsOption()),
                autoUpdateInput: false,
                startDate: @js($getStartDate()),
                endDate: @js($getEndDate()),
                maxDate: @js($getMaxDate()),
                minDate: @js($getMinDate()),
                timePicker: @js($getTimePickerOption()),
                timePickerIncrement: @js($getTimePickerIncrementOption()),
                displayFormat: @js($getDisplayFormat()),
                applyLabel: '{!!__('filament-daterangepicker-filter::message.apply')!!}',
                cancelLabel: '{!!__('filament-daterangepicker-filter::message.cancel')!!}',
                fromLabel: '{!!__('filament-daterangepicker-filter::message.from')!!}',
                toLabel: '{!!__('filament-daterangepicker-filter::message.to')!!}',
                customRangeLabel: '{!!__('filament-daterangepicker-filter::message.custom')!!}',
                january :   '{!!__('filament-daterangepicker-filter::message.january')!!}',
                february :  '{!!__('filament-daterangepicker-filter::message.february')!!}',
                march:      '{!!__('filament-daterangepicker-filter::message.march')!!}',
                april:      '{!!__('filament-daterangepicker-filter::message.april')!!}',
                may:        '{!!__('filament-daterangepicker-filter::message.may')!!}',
                june:       '{!!__('filament-daterangepicker-filter::message.june')!!}',
                july:       '{!!__('filament-daterangepicker-filter::message.july')!!}',
                august:     '{!!__('filament-daterangepicker-filter::message.august')!!}',
                september:  '{!!__('filament-daterangepicker-filter::message.september')!!}',
                october:    '{!!__('filament-daterangepicker-filter::message.october')!!}',
                november :  '{!!__('filament-daterangepicker-filter::message.november')!!}',
                december:   '{!!__('filament-daterangepicker-filter::message.december')!!}',
                sunday:     '{!!__('filament-daterangepicker-filter::message.su')!!}',
                monday:     '{!!__('filament-daterangepicker-filter::message.mo')!!}',
                tuesday:    '{!!__('filament-daterangepicker-filter::message.tu')!!}',
                wednesday:  '{!!__('filament-daterangepicker-filter::message.we')!!}',
                thursday:   '{!!__('filament-daterangepicker-filter::message.th')!!}',
                friday:     '{!!__('filament-daterangepicker-filter::message.fr')!!}',
                saturday:   '{!!__('filament-daterangepicker-filter::message.sa')!!}',
                firstDay:   @js($getFirstDayOfWeek()),
                today:      '{!!__('filament-daterangepicker-filter::message.today')!!}',
                yesterday:  '{!!__('filament-daterangepicker-filter::message.yesterday')!!}',
                last_7_days:'{!!__('filament-daterangepicker-filter::message.last_7_days')!!}',
                last_30_days:'{!!__('filament-daterangepicker-filter::message.last_30_days')!!}',
                this_month: '{!!__('filament-daterangepicker-filter::message.this_month')!!}',
                last_month: '{!!__('filament-daterangepicker-filter::message.last_month')!!}',
                this_year:  '{!!__('filament-daterangepicker-filter::message.this_year')!!}',
                last_year:  '{!!__('filament-daterangepicker-filter::message.last_year')!!}',
                handleValueChangeUsing: ( value , name ) => {
                    if(name == '{{$name}}'){
                        @this.set('{!!$getStatePath()!!}',value);
                    }
                },
            })"

        id="date-range-picker-{{$name}}"
        wire:key="date-range-picker-{{$name}}"
        x-on:keydown.esc="isOpen() && $event.stopPropagation()"
        {{ $attributes->merge($getExtraAttributes())->class(['filament-forms-date-time-picker-component relative']) }}
        {{ $getExtraAlpineAttributeBag() }}
    >
        <div class="flex flex-row">
            <button
                x-ref="button"
                aria-label="{{ $getPlaceholder() }}"
                dusk="filament.forms.{{ $getStatePath() }}.open"
                type="button"
                tabindex="-1"
                @if ($isDisabled()) disabled @endif
                {{ $getExtraTriggerAttributeBag()->class([
                    'bg-white dark:bg-white/5 relative w-full border py-2 pl-3 rtl:pr-3 text-start cursor-default rounded-lg shadow-sm outline-none',
                    'focus-within:ring-1 focus-within:border-primary-500 focus-within:ring-inset focus-within:ring-primary-500' => ! $isDisabled(),
                    'dark:bg-gray-700' => config('forms.dark_mode'),
                    'border-gray-300' => ! $errors->has($getStatePath()),
                    'dark:border-gray-600' => (! $errors->has($getStatePath())) && config('forms.dark_mode'),
                    'border-danger-600' => $errors->has($getStatePath()),
                    'dark:border-danger-400' => $errors->has($getStatePath()) && config('forms.dark_mode'),
                    'opacity-70' => $isDisabled(),
                    'dark:text-gray-300' => $isDisabled() && config('forms.dark_mode'),
                ]) }}
            >
                <div class="relative inline-block w-full px-2"  id="{{$name}}.container" wire:key="{{$name}}.container">
                    <input
                        readonly
                        x-ref="daterange"
                        name="{{$name}}"
                        placeholder="{{$getPlaceholder()}}"
                        wire:key="{{ $this->id() }}.{{ $getStatePath() }}.{{ $field::class }}.display-text"
                        {!! ($id = $getId()) ? "id=\"{$id}\"" : null !!}
                        @class([
                            'w-full h-full p-0 placeholder-gray-400 bg-transparent border-0 outline-none focus:placeholder-gray-500 focus:ring-0 bg-transparent',
                            'dark:bg-gray-700 dark:placeholder-gray-400' => config('forms.dark_mode'),
                            'cursor-default' => $isDisabled(),
                        ])
                    />

                    <span
                        class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none rtl:right-auto rtl:left-0 rtl:pl-2">
                        <svg @class([
                            'w-5 h-5 text-gray-400',
                            'dark:text-gray-400' => config('forms.dark_mode'),
                        ]) xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                    </span>

                </div>
            </button>

        </div>
    </div>

    </div>
</x-dynamic-component>
