@php
    $name = $getId();
    $statePath = $getStatePath();
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
    $locale = app()->getLocale();
    $isDisabled = $isDisabled();
    $isReadOnly = ! $getAllowInput();
    $inputAttributes = [
        'id' => $getId(),
        'name' => $name,
        'disabled' => $isDisabled,
        'placeholder' => $getPlaceholder(),
        'required' => $isRequired(),
        'readonly' => $isReadOnly,
        'type' => 'text',
        'autocomplete' => 'off',
        'x-on:click' => 'openPicker()',
        'x-on:focus' => $getAllowInput() ? '' : 'openPicker()',
    ];

    if ($getAllowInput()) {
        $inputAttributes['x-init'] = 'inputMask ? updateInputValue() : null';
    } else {
        $inputAttributes['x-model'] = 'inputValue';
    }
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
        x-ignore
        x-load-src="{{ \Filament\Support\Facades\FilamentAsset::getAlpineComponentSrc('dateRangeComponent', 'malzariey/filament-daterangepicker-filter') }}"
        x-data="dateRangeComponent({
            state: $wire.{{ $applyStateBindingModifiers("\$entangle('{$statePath}')") }},
            name: @js($name),
            locale: @js($locale),
            timezone: @js($getTimezone()),
            displayFormat: @js($getDisplayFormat()),
            separator: @js($getRangeSeparator()),
            firstDay: @js($getFirstDayOfWeek()),

            singleCalendar: @js($getSingleCalendar()),
            linkedCalendars: @js($getLinkedCalendars()),
            alwaysShowCalendars: @js($isAlwaysShowCalendar()),
            showDropdowns: @js($getShowDropdowns()),
            showWeekNumbers: @js($getShowWeekNumbers()),
            showISOWeekNumbers: @js($getShowISOWeekNumbers()),

            minDate: @js($getMinDate()),
            maxDate: @js($getMaxDate()),
            minYear: @js($getMinYear()),
            maxYear: @js($getMaxYear()),
            disabledDates: @js($getDisabledDates()),
            maxSpan: @js($getMaxSpan()),

            timePicker: @js($getTimePicker()),
            timePicker24: @js($getTimePicker24()),
            timePickerSecond: @js($getTimePickerSecond()),
            timePickerIncrement: @js($getTimePickerIncrement()),

            ranges: @js($getRanges()),
            disableRange: @js($getDisableRanges()),
            disableCustomRange: @js($getDisableCustomRange()),
            useRangeLabels: @js($getUseRangeLabels()),

            autoApply: @js($getAutoApply()),
            opens: @js($getOpens()),
            drops: @js($getDrops()),
            teleport: @js($getTeleport()),
            allowInput: @js($getAllowInput()),
            pickerType: @js($getPickerTypeValue()),

            applyLabel: @js(__('filament-daterangepicker-filter::message.apply')),
            cancelLabel: @js(__('filament-daterangepicker-filter::message.cancel')),
            fromLabel: @js(__('filament-daterangepicker-filter::message.from')),
            toLabel: @js(__('filament-daterangepicker-filter::message.to')),
            customRangeLabel: @js(__('filament-daterangepicker-filter::message.custom')),
            weekLabel: @js(__('filament-daterangepicker-filter::message.weekLabel')),
            sunday: @js(__('filament-daterangepicker-filter::message.su')),
            monday: @js(__('filament-daterangepicker-filter::message.mo')),
            tuesday: @js(__('filament-daterangepicker-filter::message.tu')),
            wednesday: @js(__('filament-daterangepicker-filter::message.we')),
            thursday: @js(__('filament-daterangepicker-filter::message.th')),
            friday: @js(__('filament-daterangepicker-filter::message.fr')),
            saturday: @js(__('filament-daterangepicker-filter::message.sa')),
            january: @js(__('filament-daterangepicker-filter::message.january')),
            february: @js(__('filament-daterangepicker-filter::message.february')),
            march: @js(__('filament-daterangepicker-filter::message.march')),
            april: @js(__('filament-daterangepicker-filter::message.april')),
            may: @js(__('filament-daterangepicker-filter::message.may')),
            june: @js(__('filament-daterangepicker-filter::message.june')),
            july: @js(__('filament-daterangepicker-filter::message.july')),
            august: @js(__('filament-daterangepicker-filter::message.august')),
            september: @js(__('filament-daterangepicker-filter::message.september')),
            october: @js(__('filament-daterangepicker-filter::message.october')),
            november: @js(__('filament-daterangepicker-filter::message.november')),
            december: @js(__('filament-daterangepicker-filter::message.december')),
        })"
        x-on:keydown="handleKeydown"
        x-on:keydown.esc="isOpen() && $event.stopPropagation()"
        wire:ignore.self
        id="fi-daterangepicker-{{ $name }}"
        wire:key="fi-daterangepicker-{{ $name }}"
        {{ $attributes->merge($getExtraAttributes(), escape: false)->class(['fi-fo-date-range-picker relative']) }}
        {{ $getExtraAlpineAttributeBag() }}
    >
        {{-- Input Wrapper --}}
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
            :valid="! $errors->has($statePath)"
            class="fi-fo-date-range-picker-input"
            :attributes="\Filament\Support\prepare_inherited_attributes($getExtraAttributeBag())"
        >
            <div
                x-ref="trigger"
                class="relative w-full"
            >
                <x-filament::input
                    x-ref="input"
                    :attributes="\Filament\Support\prepare_inherited_attributes($getExtraInputAttributeBag())->merge($inputAttributes, escape: false)"
                />
            </div>
        </x-filament::input.wrapper>

        {{-- Dropdown (Teleported to body for modal compatibility) --}}
        <template x-teleport="body">
            <div
                x-ref="dropdown"
                x-show="open"
                x-cloak
                x-transition:enter="transition ease-out duration-200"
                x-transition:enter-start="opacity-0 scale-95"
                x-transition:enter-end="opacity-100 scale-100"
                x-transition:leave="transition ease-in duration-150"
                x-transition:leave-start="opacity-100 scale-100"
                x-transition:leave-end="opacity-0 scale-95"
                @click.outside="!$refs.trigger?.contains($event.target) && cancel()"
                @click.stop
                @keydown.escape.stop.prevent="cancel()"
                class="fi-daterangepicker-dropdown"
                :id="`fi-daterangepicker-dropdown-${instanceId}`"
                :data-drops="config.drops"
                role="dialog"
                aria-modal="true"
                :aria-label="config.name"
            >
                <div class="fi-daterangepicker-content">
                    {{-- Top Row: Ranges Sidebar + Calendars --}}
                    <div class="fi-daterangepicker-top">
                        {{-- Preset Ranges Sidebar --}}
                        <template x-if="hasRanges">
                            <div class="fi-daterangepicker-ranges">
                                <ul role="listbox">
                                    <template x-for="(range, label) in config.ranges" :key="label">
                                        <li>
                                            <button
                                                type="button"
                                                @click="selectPreset(label)"
                                                class="fi-daterangepicker-range-btn"
                                                :class="{
                                                    'fi-active': isActiveRange(label)
                                                }"
                                                role="option"
                                                x-text="label"
                                            ></button>
                                        </li>
                                    </template>
                                </ul>
                            </div>
                        </template>

                        {{-- Calendars Container --}}
                        <div class="fi-daterangepicker-calendars" :class="{ 'fi-has-ranges': hasRanges }">
                        {{-- DAY PICKER (default) --}}
                        <template x-if="isDayPicker">
                            <template x-for="offset in (config.singleCalendar ? [0] : [0, 1])" :key="offset">
                                <div class="fi-daterangepicker-calendar">
                                    {{-- Calendar Header --}}
                                    <div class="fi-daterangepicker-header">
                                        <button
                                            type="button"
                                            @click="prevMonth()"
                                            x-show="offset === 0"
                                            class="fi-daterangepicker-nav-btn"
                                            aria-label="Previous month"
                                        >
                                            <x-filament::icon
                                                icon="heroicon-m-chevron-left"
                                                class="h-5 w-5"
                                            />
                                        </button>
                                        <span x-show="offset !== 0" class="w-5"></span>

                                        <div class="fi-daterangepicker-month-year">
                                            <template x-if="config.showDropdowns">
                                                <div class="flex items-center gap-1">
                                                    <select
                                                        x-model="viewDate.add(offset, 'month').month()"
                                                        @change="setMonth($event.target.value)"
                                                        class="fi-daterangepicker-select"
                                                    >
                                                        <template x-for="m in months" :key="m.value">
                                                            <option
                                                                :value="m.value"
                                                                x-text="m.label"
                                                                :selected="viewDate.add(offset, 'month').month() === m.value"
                                                            ></option>
                                                        </template>
                                                    </select>
                                                    <select
                                                        @change="setYear($event.target.value)"
                                                        class="fi-daterangepicker-select"
                                                    >
                                                        <template x-for="y in years" :key="y">
                                                            <option
                                                                :value="y"
                                                                x-text="y"
                                                                :selected="viewDate.add(offset, 'month').year() === y"
                                                            ></option>
                                                        </template>
                                                    </select>
                                                </div>
                                            </template>
                                            <template x-if="!config.showDropdowns">
                                                <span
                                                    class="fi-daterangepicker-month-label"
                                                    x-text="generateGrid(offset).monthName + ' ' + generateGrid(offset).year"
                                                ></span>
                                            </template>
                                        </div>

                                        <button
                                            type="button"
                                            @click="nextMonth()"
                                            x-show="config.singleCalendar ? true : offset === 1"
                                            class="fi-daterangepicker-nav-btn"
                                            aria-label="Next month"
                                        >
                                            <x-filament::icon
                                                icon="heroicon-m-chevron-right"
                                                class="h-5 w-5"
                                            />
                                        </button>
                                        <span x-show="!config.singleCalendar && offset === 0" class="w-5"></span>
                                    </div>

                                    {{-- Weekday Headers --}}
                                    <div class="fi-daterangepicker-weekdays">
                                        <template x-if="config.showWeekNumbers || config.showISOWeekNumbers">
                                            <span class="fi-daterangepicker-week-label" x-text="config.labels.weekLabel"></span>
                                        </template>
                                        <template x-for="day in weekDays" :key="day">
                                            <span class="fi-daterangepicker-weekday" x-text="day"></span>
                                        </template>
                                    </div>

                                    {{-- Day Grid --}}
                                    <div class="fi-daterangepicker-days" role="grid">
                                        <template x-for="(week, wIndex) in generateGrid(offset).weeks" :key="wIndex">
                                            <div class="fi-daterangepicker-week" role="row">
                                                <template x-if="week[0].weekNumber !== null">
                                                    <span
                                                        class="fi-daterangepicker-week-number"
                                                        x-text="week[0].weekNumber"
                                                    ></span>
                                                </template>
                                                <template x-for="day in week" :key="day.dateString">
                                                    <button
                                                        type="button"
                                                        @click="handleDayClick(day)"
                                                        @mouseenter="handleDayHover(day)"
                                                        @mouseleave="handleDayLeave()"
                                                        :disabled="day.disabled"
                                                        class="fi-daterangepicker-day"
                                                        :class="{
                                                            'fi-selected': day.isSelected,
                                                            'fi-in-range': day.inRange,
                                                            'fi-start': day.isStart,
                                                            'fi-end': day.isEnd,
                                                            'fi-today': day.isToday,
                                                            'fi-off-month': !day.isCurrentMonth,
                                                            'fi-disabled': day.disabled,
                                                            'fi-focused': isFocused(day.date),
                                                        }"
                                                        role="gridcell"
                                                        :aria-selected="day.isSelected"
                                                        :aria-disabled="day.disabled"
                                                        :tabindex="isFocused(day.date) ? 0 : -1"
                                                    >
                                                        <span x-text="day.day"></span>
                                                    </button>
                                                </template>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </template>
                        </template>

                        {{-- MONTH PICKER --}}
                        <template x-if="isMonthPicker">
                            <template x-for="offset in (config.singleCalendar ? [0] : [0, 1])" :key="offset">
                                <div class="fi-daterangepicker-calendar fi-month-picker">
                                    {{-- Year Header --}}
                                    <div class="fi-daterangepicker-header">
                                        <button
                                            type="button"
                                            @click="prevYear()"
                                            x-show="offset === 0"
                                            class="fi-daterangepicker-nav-btn"
                                            aria-label="Previous year"
                                        >
                                            <x-filament::icon
                                                icon="heroicon-m-chevron-left"
                                                class="h-5 w-5"
                                            />
                                        </button>
                                        <span x-show="offset !== 0" class="w-5"></span>

                                        <div class="fi-daterangepicker-month-year">
                                            <input
                                                type="number"
                                                inputmode="numeric"
                                                pattern="[0-9]*"
                                                :value="generateMonthGrid(offset).year"
                                                :min="config.minYear ?? undefined"
                                                :max="config.maxYear ?? undefined"
                                                @change="setYear(parseInt($event.target.value || generateMonthGrid(offset).year) - parseInt(offset || 0)); $nextTick(() => $event.target.value = generateMonthGrid(offset).year)"
                                                @keydown.enter.prevent="setYear(parseInt($event.target.value || generateMonthGrid(offset).year) - parseInt(offset || 0)); $nextTick(() => $event.target.value = generateMonthGrid(offset).year)"
                                                class="fi-daterangepicker-select fi-daterangepicker-year-input"
                                                style="width: 5.5rem; text-align: center;"
                                                aria-label="Year"
                                            />
                                        </div>

                                        <button
                                            type="button"
                                            @click="nextYear()"
                                            x-show="config.singleCalendar ? true : offset === 1"
                                            class="fi-daterangepicker-nav-btn"
                                            aria-label="Next year"
                                        >
                                            <x-filament::icon
                                                icon="heroicon-m-chevron-right"
                                                class="h-5 w-5"
                                            />
                                        </button>
                                        <span x-show="!config.singleCalendar && offset === 0" class="w-5"></span>
                                    </div>

                                    {{-- Month Grid (4x3) --}}
                                    <div class="fi-daterangepicker-month-grid" role="grid">
                                        <template x-for="(month, mIndex) in generateMonthGrid(offset).months" :key="month.dateString">
                                            <button
                                                type="button"
                                                @click="handleMonthClick(month)"
                                                @mouseenter="handleMonthHover(month)"
                                                @mouseleave="handleDayLeave()"
                                                :disabled="month.disabled"
                                                class="fi-daterangepicker-month-cell"
                                                :class="{
                                                    'fi-selected': month.isSelected,
                                                    'fi-in-range': month.inRange,
                                                    'fi-start': month.isStart,
                                                    'fi-end': month.isEnd,
                                                    'fi-current': month.isCurrentMonth,
                                                    'fi-disabled': month.disabled,
                                                }"
                                                role="gridcell"
                                                :aria-selected="month.isSelected"
                                                :aria-disabled="month.disabled"
                                            >
                                                <span x-text="month.shortName"></span>
                                            </button>
                                        </template>
                                    </div>
                                </div>
                            </template>
                        </template>

                        {{-- YEAR PICKER --}}
                        <template x-if="isYearPicker">
                            <template x-for="offset in (config.singleCalendar ? [0] : [0, 1])" :key="offset">
                                <div class="fi-daterangepicker-calendar fi-year-picker">
                                    {{-- Decade Header --}}
                                    <div class="fi-daterangepicker-header">
                                        <button
                                            type="button"
                                            @click="prevDecade()"
                                            x-show="offset === 0"
                                            class="fi-daterangepicker-nav-btn"
                                            aria-label="Previous decade"
                                        >
                                            <x-filament::icon
                                                icon="heroicon-m-chevron-left"
                                                class="h-5 w-5"
                                            />
                                        </button>
                                        <span x-show="offset !== 0" class="w-5"></span>

                                        <span
                                            class="fi-daterangepicker-month-label"
                                            x-text="generateYearGrid(offset).decadeStart + ' - ' + generateYearGrid(offset).decadeEnd"
                                        ></span>

                                        <button
                                            type="button"
                                            @click="nextDecade()"
                                            x-show="config.singleCalendar ? true : offset === 1"
                                            class="fi-daterangepicker-nav-btn"
                                            aria-label="Next decade"
                                        >
                                            <x-filament::icon
                                                icon="heroicon-m-chevron-right"
                                                class="h-5 w-5"
                                            />
                                        </button>
                                        <span x-show="!config.singleCalendar && offset === 0" class="w-5"></span>
                                    </div>

                                    {{-- Year Grid (4x3) --}}
                                    <div class="fi-daterangepicker-year-grid" role="grid">
                                        <template x-for="(yearItem, yIndex) in generateYearGrid(offset).years" :key="yearItem.dateString">
                                            <button
                                                type="button"
                                                @click="handleYearClick(yearItem)"
                                                @mouseenter="handleYearHover(yearItem)"
                                                @mouseleave="handleDayLeave()"
                                                :disabled="yearItem.disabled"
                                                class="fi-daterangepicker-year-cell"
                                                :class="{
                                                    'fi-selected': yearItem.isSelected,
                                                    'fi-in-range': yearItem.inRange,
                                                    'fi-start': yearItem.isStart,
                                                    'fi-end': yearItem.isEnd,
                                                    'fi-current': yearItem.isCurrentYear,
                                                    'fi-out-decade': !yearItem.inDecade,
                                                    'fi-disabled': yearItem.disabled,
                                                }"
                                                role="gridcell"
                                                :aria-selected="yearItem.isSelected"
                                                :aria-disabled="yearItem.disabled"
                                            >
                                                <span x-text="yearItem.year"></span>
                                            </button>
                                        </template>
                                    </div>
                                </div>
                            </template>
                        </template>
                        </div> {{-- End of fi-daterangepicker-calendars --}}
                    </div> {{-- End of fi-daterangepicker-top --}}

                    {{-- Time Picker --}}
                    <template x-if="config.timePicker">
                        <div class="fi-daterangepicker-time">
                            <div class="fi-daterangepicker-time-row">
                                {{-- Start Time --}}
                                <div class="fi-daterangepicker-time-col">
                                    <label class="fi-daterangepicker-time-label" x-text="config.labels.from"></label>
                                    <div class="fi-daterangepicker-time-inputs">
                                        <select x-model="startTime.hour" x-on:change="handleTimeChange(true)" class="fi-daterangepicker-select fi-time">
                                            <template x-for="h in hourOptions" :key="h.value">
                                                <option :value="h.value" x-text="h.label"></option>
                                            </template>
                                        </select>
                                        <span class="fi-daterangepicker-time-separator">:</span>
                                        <select x-model="startTime.minute" x-on:change="handleTimeChange(true)" class="fi-daterangepicker-select fi-time">
                                            <template x-for="m in minuteOptions" :key="m.value">
                                                <option :value="m.value" x-text="m.label"></option>
                                            </template>
                                        </select>
                                        <template x-if="config.timePickerSecond">
                                            <span class="fi-daterangepicker-time-separator">:</span>
                                        </template>
                                        <template x-if="config.timePickerSecond">
                                            <select x-model="startTime.second" x-on:change="handleTimeChange(true)" class="fi-daterangepicker-select fi-time">
                                                <template x-for="s in secondOptions" :key="s.value">
                                                    <option :value="s.value" x-text="s.label"></option>
                                                </template>
                                            </select>
                                        </template>
                                        <template x-if="!config.timePicker24">
                                            <select x-model="startTime.ampm" x-on:change="handleTimeChange(true)" class="fi-daterangepicker-select fi-ampm">
                                                <option value="AM">AM</option>
                                                <option value="PM">PM</option>
                                            </select>
                                        </template>
                                    </div>
                                </div>

                                {{-- End Time --}}
                                <template x-if="!config.singleCalendar">
                                    <div class="fi-daterangepicker-time-col">
                                        <label class="fi-daterangepicker-time-label" x-text="config.labels.to"></label>
                                        <div class="fi-daterangepicker-time-inputs">
                                            <select x-model="endTime.hour" x-on:change="handleTimeChange(false)" class="fi-daterangepicker-select fi-time">
                                                <template x-for="h in hourOptions" :key="h.value">
                                                    <option :value="h.value" x-text="h.label"></option>
                                                </template>
                                            </select>
                                            <span class="fi-daterangepicker-time-separator">:</span>
                                            <select x-model="endTime.minute" x-on:change="handleTimeChange(false)" class="fi-daterangepicker-select fi-time">
                                                <template x-for="m in minuteOptions" :key="m.value">
                                                    <option :value="m.value" x-text="m.label"></option>
                                                </template>
                                            </select>
                                            <template x-if="config.timePickerSecond">
                                                <span class="fi-daterangepicker-time-separator">:</span>
                                            </template>
                                            <template x-if="config.timePickerSecond">
                                                <select x-model="endTime.second" x-on:change="handleTimeChange(false)" class="fi-daterangepicker-select fi-time">
                                                    <template x-for="s in secondOptions" :key="s.value">
                                                        <option :value="s.value" x-text="s.label"></option>
                                                    </template>
                                                </select>
                                            </template>
                                            <template x-if="!config.timePicker24">
                                                <select x-model="endTime.ampm" x-on:change="handleTimeChange(false)" class="fi-daterangepicker-select fi-ampm">
                                                    <option value="AM">AM</option>
                                                    <option value="PM">PM</option>
                                                </select>
                                            </template>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </template>

                    {{-- Action Buttons --}}
                    <template x-if="!config.autoApply">
                        <div class="fi-daterangepicker-actions">
                            {{-- Selection Preview --}}
                            <template x-if="selection.start && (config.singleCalendar || selection.end)">
                                <div class="fi-daterangepicker-selection-preview">
                                    <span x-text="config.timePicker ? applyTime(selection.start, startTime).format(config.displayFormat) : selection.start.format(config.displayFormat)"></span>
                                    <template x-if="!config.singleCalendar && selection.end">
                                        <span class="fi-daterangepicker-selection-preview-arrow">→</span>
                                    </template>
                                    <template x-if="!config.singleCalendar && selection.end">
                                        <span x-text="config.timePicker ? applyTime(selection.end, endTime).format(config.displayFormat) : selection.end.format(config.displayFormat)"></span>
                                    </template>
                                </div>
                            </template>

                            <x-filament::button
                                color="gray"
                                size="sm"
                                @click="cancel()"
                            >
                                <span x-text="config.labels.cancel"></span>
                            </x-filament::button>

                            <x-filament::button
                                size="sm"
                                @click="applySelection()"
                            >
                                <span x-text="config.labels.apply"></span>
                            </x-filament::button>
                        </div>
                    </template>
                </div>
            </div>
        </template>
    </div>
</x-dynamic-component>
