@php
    $name = $getId();
    $isPrefixInline = $isPrefixInline();
    $isSuffixInline = $isSuffixInline();
    $prefixActions = $getPrefixActions();
    $prefixIcon = $getPrefixIcon();
    $prefixIconColor = $getPrefixIconColor();
    $prefixLabel = $getPrefixLabel();
    $suffixActions = $getSuffixActions();
    $suffixIcon = $getSuffixIcon();
    $suffixIconColor = $getSuffixIconColor();
    $suffixLabel = $getSuffixLabel();
    $statePath = $getStatePath();
@endphp

<x-dynamic-component
    :component="$getFieldWrapperView()"
    :field="$field"
>
    <div
        @if (\Filament\Support\Facades\FilamentView::hasSpaMode())
            x-load="visible || event (ax-modal-opened)"
        @else
            x-load
        @endif

        x-load-src="{{ \Filament\Support\Facades\FilamentAsset::getAlpineComponentSrc('dateRangeComponent', 'malzariey/filament-daterangepicker-filter') }}"
        x-ref="container"
        x-data="dateRangeComponent({
                state: @entangle($statePath),
                name: @js($name),
                alwaysShowCalendars: @js($isAlwaysShowCalendar()),
                autoApply: @js($getAutoApply()),
                linkedCalendars: @js($getLinkedCalendars()),
                singleCalendar: @js($getSingleCalendar()),
                autoUpdateInput: false,
                startDate: @js($getStartDate()),
                endDate: @js($getEndDate()),
                maxDate: @js($getMaxDate()),
                minDate: @js($getMinDate()),
                timePicker: @js($getTimePicker()),
                timePicker24: @js($getTimePicker24()),
                timePickerSecond: @js($getTimePickerSecond()),
                timePickerIncrement: @js($getTimePickerIncrement()),
                displayFormat: @js($getDisplayFormat()),
                disableCustomRange: @js($getDisableCustomRange()),
                opens: '{{$getOpens()}}',
                drops: '{{$getDrops()}}',
                applyLabel: '{!! __('filament-daterangepicker-filter::message.apply') !!}',
                cancelLabel: '{!! __('filament-daterangepicker-filter::message.cancel') !!}',
                fromLabel: '{!! __('filament-daterangepicker-filter::message.from') !!}',
                toLabel: '{!! __('filament-daterangepicker-filter::message.to') !!}',
                customRangeLabel: '{!! __('filament-daterangepicker-filter::message.custom') !!}',
                january: '{!! __('filament-daterangepicker-filter::message.january') !!}',
                february: '{!! __('filament-daterangepicker-filter::message.february') !!}',
                march: '{!! __('filament-daterangepicker-filter::message.march') !!}',
                april: '{!! __('filament-daterangepicker-filter::message.april') !!}',
                may: '{!! __('filament-daterangepicker-filter::message.may') !!}',
                june: '{!! __('filament-daterangepicker-filter::message.june') !!}',
                july: '{!! __('filament-daterangepicker-filter::message.july') !!}',
                august: '{!! __('filament-daterangepicker-filter::message.august') !!}',
                september: '{!! __('filament-daterangepicker-filter::message.september') !!}',
                october: '{!! __('filament-daterangepicker-filter::message.october') !!}',
                november: '{!! __('filament-daterangepicker-filter::message.november') !!}',
                december: '{!! __('filament-daterangepicker-filter::message.december') !!}',
                sunday: '{!! __('filament-daterangepicker-filter::message.su') !!}',
                monday: '{!! __('filament-daterangepicker-filter::message.mo') !!}',
                tuesday: '{!! __('filament-daterangepicker-filter::message.tu') !!}',
                wednesday: '{!! __('filament-daterangepicker-filter::message.we') !!}',
                thursday: '{!! __('filament-daterangepicker-filter::message.th') !!}',
                friday: '{!! __('filament-daterangepicker-filter::message.fr') !!}',
                saturday: '{!! __('filament-daterangepicker-filter::message.sa') !!}',
                firstDay: @js($getFirstDayOfWeek()),
                ranges: @js($getRanges()),
                maxSpan: @js($getMaxSpan()),
                disableRange : @js($getDisableRanges()),
                separator: @js($getSeparator()),
                useRangeLabels: @js($getUseRangeLabels()),
                disabledDates: @js($getDisabledDates()),
                handleValueChangeUsing: (value, name) => {
                    if (name == '{{ $name }}') {
                        @this.set('{!! $statePath !!}', value);
                    }
                },
                showWeekNumbers: @js($getShowWeekNumbers()),
                showISOWeekNumbers: @js($getShowISOWeekNumbers()),
                weekLabel: '{!! __('filament-daterangepicker-filter::message.weekLabel') !!}',
                showDropdowns: @js($getShowDropdowns()),
                minYear: @js($getMinYear()),
                maxYear: @js($getMaxYear()),
                timezone: @js($getTimezone())
            })"
        id="date-range-picker-{{ $name }}"
        wire:key="date-range-picker-{{ $name }}"
        x-on:keydown.esc="isOpen() && $event.stopPropagation()"

        {{ $attributes->merge($getExtraAttributes() , escape: false)->class(['filament-forms-date-time-picker-component relative']) }}
        {{ $getExtraAlpineAttributeBag() }}
    >
        <x-filament::input.wrapper
            :disabled="$isDisabled"
            :inline-prefix="$isPrefixInline"
            :inline-suffix="$isSuffixInline"
            :prefix="$prefixLabel"
            :prefix-actions="$prefixActions"
            :prefix-icon="$prefixIcon"
            :prefix-icon-color="$prefixIconColor"
            :suffix="$suffixLabel"
            :suffix-actions="$suffixActions"
            :suffix-icon="$suffixIcon"
            :suffix-icon-color="$suffixIconColor"
            :valid="!$errors->has($statePath)"
            class="fi-fo-text-input"
            :attributes="\Filament\Support\prepare_inherited_attributes($getExtraAttributeBag())->class([
                    'overflow-hidden',
                ])"
        >
            <button
                x-ref="button"
                aria-label="{{ $getPlaceholder() }}"
                dusk="filament.forms.{{ $statePath }}.open"
                type="button"
                tabindex="-1"
                class="w-full"
            >
                <div
                    class="relative inline-block w-full bg-white dark:bg-white/5"
                    id="{{ $name }}.container"
                    wire:key="{{ $name }}.container"
                >
                    <x-filament::input
                        x-ref="daterange"
                        wire:key="{{ $this->id() }}.{{ $statePath }}.{{ $field::class }}.display-text"
                        :attributes="\Filament\Support\prepare_inherited_attributes(
                                $getExtraInputAttributeBag(),
                            )->merge([
                                'id' => $getId(),
                                'name' => $name,
                                'disabled' => $isDisabled(),
                                'placeholder' => $getPlaceholder(),
                                'tabindex' => $isAutofocused() ? 0 : -1,
                                'required' => $isRequired(),
                                'readonly' => $isReadOnly(),
                                'type' => 'text',
                            ], escape: false)"
                    />
                </div>
            </button>
        </x-filament::input.wrapper>
    </div>

</x-dynamic-component>
