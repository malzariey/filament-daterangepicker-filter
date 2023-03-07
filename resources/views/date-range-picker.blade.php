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
        x-init="initPicker(state)"
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
                        name="daterange"
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
            function initPicker(state) {
                window.$(function () {
                    window.$('input[name="daterange"]').daterangepicker({
                        alwaysShowCalendars: {{$isAlwaysShowCalender()? 'true' : 'false'}},
                        {!! $getMaxDate() !== null?"maxDate: moment('".$getMaxDate()."'),":"" !!}
                            {!! $getMinDate() !== null?"minDate: moment('".$getMinDate()."'),":"" !!}
                        locale: {
                            format: "{{$getDisplayFormat()}}",
                            separator: " - ",
                            applyLabel: "Apply",
                            cancelLabel: "Cancel",
                            fromLabel: "From",
                            toLabel: "To",
                            customRangeLabel: "Custom",
                            weekLabel: "W",
                            daysOfWeek: [
                                "Su",
                                "Mo",
                                "Tu",
                                "We",
                                "Th",
                                "Fr",
                                "Sa"
                            ],
                            monthNames: [
                                "January",
                                "February",
                                "March",
                                "April",
                                "May",
                                "June",
                                "July",
                                "August",
                                "September",
                                "October",
                                "November",
                                "December"
                            ],
                            firstDay: 6
                        },
                        ranges: {
                            'Today': [moment(), moment()],
                            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                            'This Month': [moment().startOf('month'), moment().endOf('month')],
                            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                        }
                    }, function (start, end, label) {
                    @this.
                    set('{{$getStatePath()}}', start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));

                    }).val(state);
                });

            }
        </script>
    </div>
</x-dynamic-component>
