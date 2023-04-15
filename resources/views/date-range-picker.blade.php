<x-dynamic-component
    :component="$getFieldWrapperView()"
    :id="$getId()"
    :label="$getLabel()"
    :label-sr-only="$isLabelHidden()"
    :helper-text="$getHelperText()"
    :hint="$getHint()"
    :hint-action="$getHintAction()"
    :hint-color="$getHintColor()"
    :hint-icon="$getHintIcon()"
    :required="$isRequired()"
    :state-path="$getStatePath()"
>
    <div
        x-data="{locale: @js(app()->getLocale()),state:@entangle($getStatePath())}"
        x-init="initPicker{{$getName()}}(state, 'daterange{{$getName()}}');
         $watch('state', function(value) {
            if(value == null){
                clearEvent('daterange{{$getName()}}');
            }
         });"
        id="date-range-picker-blade"
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
                    'bg-white relative w-full border py-2 pl-3 pr-10 rtl:pl-10 rtl:pr-3 text-start cursor-default rounded-lg shadow-sm outline-none',
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
                <div wire:ignore class="daterange-body" id="range-container">
                    <input
                        readonly
                        name="daterange{{$getName()}}"
                        placeholder="{{$getPlaceholder()}}"
                        wire:key="{{ $this->id }}.{{ $getStatePath() }}.{{ $field::class }}.display-text"
                        {!! ($id = $getId()) ? "id=\"{$id}\"" : null !!}
                        @class([
                            'w-full h-full p-0 placeholder-gray-400 bg-transparent border-0 outline-none focus:placeholder-gray-500 focus:ring-0',
                            'dark:bg-gray-700 dark:placeholder-gray-400' => config('forms.dark_mode'),
                            'cursor-default' => $isDisabled(),
                        ])
                    />
                </div>
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
            </button>

        </div>
        <script>
            function initPicker{{$getName()}}(state, name) {
                window.$(function () {
                    window.$('input[name="' + name + '"]').daterangepicker({
                        alwaysShowCalendars: {{$isAlwaysShowCalender()? 'true' : 'false'}},
                        autoApply: {{ $getAutoApplyOption() }},
                        linkedCalendars: {{ $getLinkedCalendarsOption() }},
                        {!! $getMaxDate() !== null?"maxDate: moment('".$getMaxDate()."'),":"" !!}
                            {!! $getMinDate() !== null?"minDate: moment('".$getMinDate()."'),":"" !!}
                        timePicker: {{ $getTimePickerOption() }},
                        timePickerIncrement: {{ $getTimePickerIncrementOption() }},
                        locale: {
                            format: "{{$getDisplayFormat()}}",
                            separator: " - ",
                            applyLabel: "{!!__('filament-daterangepicker-filter::message.apply')!!}",
                            cancelLabel: "{!!__('filament-daterangepicker-filter::message.cancel')!!}",
                            fromLabel: "{!!__('filament-daterangepicker-filter::message.from')!!}",
                            toLabel: "{!!__('filament-daterangepicker-filter::message.to')!!}",
                            customRangeLabel: "{!!__('filament-daterangepicker-filter::message.custom')!!}",
                            weekLabel: "W",
                            daysOfWeek: [
                                "{!!__('filament-daterangepicker-filter::message.su')!!}",
                                "{!!__('filament-daterangepicker-filter::message.mo')!!}",
                                "{!!__('filament-daterangepicker-filter::message.tu')!!}",
                                "{!!__('filament-daterangepicker-filter::message.we')!!}",
                                "{!!__('filament-daterangepicker-filter::message.th')!!}",
                                "{!!__('filament-daterangepicker-filter::message.fr')!!}",
                                "{!!__('filament-daterangepicker-filter::message.sa')!!}",

                            ],
                            monthNames: [
                                "{!!__('filament-daterangepicker-filter::message.january')!!}",
                                "{!!__('filament-daterangepicker-filter::message.february')!!}",
                                "{!!__('filament-daterangepicker-filter::message.march')!!}",
                                "{!!__('filament-daterangepicker-filter::message.april')!!}",
                                "{!!__('filament-daterangepicker-filter::message.may')!!}",
                                "{!!__('filament-daterangepicker-filter::message.june')!!}",
                                "{!!__('filament-daterangepicker-filter::message.july')!!}",
                                "{!!__('filament-daterangepicker-filter::message.august')!!}",
                                "{!!__('filament-daterangepicker-filter::message.september')!!}",
                                "{!!__('filament-daterangepicker-filter::message.october')!!}",
                                "{!!__('filament-daterangepicker-filter::message.november')!!}",
                                "{!!__('filament-daterangepicker-filter::message.december')!!}"

                            ],
                            firstDay: 6
                        },
                        ranges: {
                            '{!!__('filament-daterangepicker-filter::message.today')!!}': [moment(), moment()],
                            '{!!__('filament-daterangepicker-filter::message.yesterday')!!}': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                            '{!!__('filament-daterangepicker-filter::message.last_7_days')!!}': [moment().subtract(6, 'days'), moment()],
                            '{!!__('filament-daterangepicker-filter::message.last_30_days')!!}': [moment().subtract(29, 'days'), moment()],
                            '{!!__('filament-daterangepicker-filter::message.this_month')!!}': [moment().startOf('month'), moment().endOf('month')],
                            '{!!__('filament-daterangepicker-filter::message.last_month')!!}': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                            '{!!__('filament-daterangepicker-filter::message.this_year')!!}': [moment().startOf('year'), moment().endOf('year')],
                            '{!!__('filament-daterangepicker-filter::message.last_year')!!}': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
                        }
                    }, function (start, end, label) {
                        @this.
                        set('{!!$getStatePath()!!}', start.format('{!! $getDisplayFormat() !!}') + ' - ' + end.format('{!! $getDisplayFormat() !!}'));
                    }).val(state);
                });

                $('input[name="' + name + '"]').on('cancel.daterangepicker', function (ev, picker) {
                    $(this).val('');
                });

            }
            function clearEvent(name) {
                $('input[name="' + name + '"]').trigger('cancel.daterangepicker');
            }
        </script>
    </div>
</x-dynamic-component>
