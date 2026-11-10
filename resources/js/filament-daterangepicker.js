import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { computePosition, flip, shift, offset, autoUpdate } from '@floating-ui/dom';
import IMask from 'imask';

// Initialize Day.js plugins
dayjs.extend(isBetween);
dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);
dayjs.extend(customParseFormat);
dayjs.extend(timezone);
dayjs.extend(utc);

// ─────────────────────────────────────────────────────────────
// Static Day.js Locale Imports
// These match the PHP translation packs in resources/lang/.
// Static imports are required because esbuild bundles into a
// single file — dynamic import() can't resolve node_modules
// at runtime.
// ─────────────────────────────────────────────────────────────
import 'dayjs/locale/ar';
import 'dayjs/locale/cs';
import 'dayjs/locale/da';
import 'dayjs/locale/de';
import 'dayjs/locale/es';
import 'dayjs/locale/fa';
import 'dayjs/locale/fr';
import 'dayjs/locale/el';
import 'dayjs/locale/he';
import 'dayjs/locale/hu';
import 'dayjs/locale/id';
import 'dayjs/locale/it';
import 'dayjs/locale/ko';
import 'dayjs/locale/lt';
import 'dayjs/locale/lv';
import 'dayjs/locale/nl';
import 'dayjs/locale/nb';
import 'dayjs/locale/pl';
import 'dayjs/locale/pt';
import 'dayjs/locale/pt-br';
import 'dayjs/locale/ro';
import 'dayjs/locale/ru';
import 'dayjs/locale/sk';
import 'dayjs/locale/sl';
import 'dayjs/locale/tr';
import 'dayjs/locale/uk';
import 'dayjs/locale/uz';
import 'dayjs/locale/vi';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/zh-tw';
import 'dayjs/locale/ku';

// Global instance counter for unique IDs
let instanceCounter = 0;

// ─────────────────────────────────────────────────────────────
// Focus-trap guard (modals and slide-overs, issue #264)
//
// The dropdown is teleported to <body>, so inside a Filament modal it sits
// outside the modal's x-trap container. focus-trap listens for `focusin` and
// Tab `keydown` in the capture phase on `document` and pulls focus straight
// back into the modal, so the time picker's <select>s could never keep focus
// (desktop Chrome still opened them on mousedown; iOS WebKit only opens the
// native picker for a select that keeps focus).
//
// A capture listener on `window` runs before any listener on `document`, so
// stopping these two events there when they come from inside a dropdown keeps
// the trap from seeing them. Nothing else changes: the dropdown stays
// teleported, positioned and stacked exactly as before, and focus outside the
// dropdown is still trapped by the modal.
//
// Stopping the events also hides them from every other listener on document
// and from @focusin inside the dropdown, so the guard only steps in while a
// trap is actually there: when the picker that owns the dropdown sits in an
// open Filament modal or slide-over (the only Filament component that uses
// x-trap). Everywhere else the events propagate untouched.
//
// With teleport(false) the dropdown renders in place, inside the picker's
// own root and so inside the modal's trap container: the trap accepts its
// focus as it is, and the guard leaves those events alone too.
// ─────────────────────────────────────────────────────────────

const DROPDOWN_SELECTOR = '.fi-daterangepicker-dropdown';
const DROPDOWN_ID_PREFIX = 'fi-daterangepicker-dropdown-';
const INSTANCE_ATTRIBUTE = 'data-fi-daterangepicker-instance';
// .fi-modal-open is bound to the modal's isOpen; a click-through modal
// renders no x-trap.
const TRAPPING_MODAL_SELECTOR = '.fi-modal.fi-modal-open:not(.fi-modal-click-through)';

/**
 * True when the event comes from inside a teleported picker dropdown whose
 * picker field is inside an open, focus-trapping Filament modal.
 */
const isInsideTrappedDropdown = (target) => {
    if (!(target instanceof Element)) return false;

    const dropdown = target.closest(DROPDOWN_SELECTOR);
    if (!dropdown || !dropdown.id.startsWith(DROPDOWN_ID_PREFIX)) return false;

    const instance = dropdown.id.slice(DROPDOWN_ID_PREFIX.length);

    for (const field of target.ownerDocument.querySelectorAll(`[${INSTANCE_ATTRIBUTE}]`)) {
        if (field.getAttribute(INSTANCE_ATTRIBUTE) === instance) {
            // Rendered in place (teleport(false)): already inside the trap.
            if (field.contains(dropdown)) return false;

            return field.closest(TRAPPING_MODAL_SELECTOR) !== null;
        }
    }

    return false;
};

export function installFocusTrapGuard(win = typeof window !== 'undefined' ? window : null) {
    // Once per window, even if the bundle is evaluated twice.
    if (!win || win.__fiDaterangepickerFocusTrapGuard) return;
    win.__fiDaterangepickerFocusTrapGuard = true;

    win.addEventListener('focusin', (event) => {
        if (isInsideTrappedDropdown(event.target)) {
            event.stopPropagation();
        }
    }, true);

    win.addEventListener('keydown', (event) => {
        // Let Tab move between the dropdown's own controls instead of the
        // trap sending it back to the first field of the modal.
        if (event.key === 'Tab' && isInsideTrappedDropdown(event.target)) {
            event.stopPropagation();
        }
    }, true);
}

installFocusTrapGuard();

/**
 * DateRangePicker Alpine.js Component
 * A native Alpine.js/Day.js replacement for the jQuery daterangepicker
 * 
 * Features:
 * - Date range selection with calendar UI
 * - Time picker support (12/24 hour)
 * - Input masking for manual date entry
 * - Preset ranges (Today, Last 7 Days, etc.)
 * - Teleport to body for modal compatibility
 * - Multi-instance support with isolated state
 * - Keyboard navigation (A11y)
 * - RTL support
 * - Localization via Day.js
 */
export default function dateRangeComponent(config) {
    // Generate unique instance ID
    const instanceId = ++instanceCounter;

    return {
        // ─────────────────────────────────────────────────────────────
        // Instance Identity (for multi-instance support)
        // ─────────────────────────────────────────────────────────────
        instanceId: `daterange-${instanceId}`,

        // Expose dayjs to Alpine template expressions
        dayjs,

        // ─────────────────────────────────────────────────────────────
        // Core State
        // ─────────────────────────────────────────────────────────────
        open: false,
        // alwaysShowCalendar(false): the user chose "Custom" in the preset
        // list, so the calendars show. See calendarsShown.
        customRangeShown: false,
        viewDate: dayjs(),
        // The right-hand day calendar's month under linkedCalendars(false).
        // Null means "the month after the left one". See calendarMonth().
        rightViewDate: null,
        selection: { start: null, end: null },

        // The preset the user last clicked. Two presets can clamp to the same
        // range under minDate / maxDate; this keeps the clicked one as the
        // active one (see activePresetLabel). Forgotten as soon as the range
        // is changed any other way.
        selectedPresetLabel: null,
        tempEndDate: null,
        focusedDate: null,
        hoverDate: null,
        isSyncing: false,
        // True while updateInputValue() writes to the mask, so its `accept`
        // event is not taken for typing.
        _writingInputMask: false,
        // Whether the user has typed since the picker last wrote the mask.
        _inputMaskEditedByUser: false,
        // Presets-only keyboard: hand focus back to the input on close, and
        // keep that focus from reopening the picker.
        _returnFocusOnClose: false,
        _focusingInput: false,
        dualStateParseQueued: false,
        dualStateSnapshot: {
            start: { raw: null, display: null },
            end: { raw: null, display: null },
        },

        // Debounce timer for Livewire sync (performance optimization)
        _syncDebounceTimer: null,

        // Input masking
        inputMask: null,
        _inputMaskSyncHandler: null,
        _inputMaskGuideHandler: null,
        // placeholder() set on the field, shown while the mask is lazy.
        _userPlaceholder: null,
        inputValue: '',
        allowManualInput: config.allowInput ?? false,

        // Time state
        startTime: { hour: 0, minute: 0, second: 0, ampm: 'AM' },
        endTime: { hour: 23, minute: 59, second: 59, ampm: 'PM' },

        // Configuration
        config: {
            state: config.state,
            dualState: config.dualState ?? false,
            dualStartState: config.dualStartState ?? null,
            dualEndState: config.dualEndState ?? null,
            storageFormat: config.storageFormat || 'YYYY-MM-DD HH:mm:ss',
            storageTimezone: config.storageTimezone || 'UTC',
            name: config.name,
            locale: config.locale || 'en',
            timezone: config.timezone,
            displayFormat: config.displayFormat || 'DD/MM/YYYY',
            separator: config.separator || ' - ',
            firstDay: config.firstDay ?? 0,

            // Calendar options
            singleCalendar: config.singleCalendar ?? false,
            linkedCalendars: config.linkedCalendars ?? true,
            alwaysShowCalendars: config.alwaysShowCalendars ?? true,
            showDropdowns: config.showDropdowns ?? false,
            showWeekNumbers: config.showWeekNumbers ?? false,
            showISOWeekNumbers: config.showISOWeekNumbers ?? false,

            // Date constraints
            minDate: config.minDate,
            maxDate: config.maxDate,
            minYear: config.minYear,
            maxYear: config.maxYear,
            disabledDates: config.disabledDates || [],
            maxSpan: config.maxSpan,

            // Time picker
            timePicker: config.timePicker ?? false,
            timePicker24: config.timePicker24 ?? true,
            timePickerSecond: config.timePickerSecond ?? false,
            timePickerIncrement: config.timePickerIncrement ?? 1,

            // Ranges
            ranges: config.ranges || {},
            disableRange: config.disableRange ?? false,
            disableCustomRange: config.disableCustomRange ?? false,
            useRangeLabels: config.useRangeLabels ?? false,

            // Behavior
            autoApply: config.autoApply ?? false,
            opens: config.opens || 'right',
            drops: config.drops || 'down',
            teleport: config.teleport ?? true,

            // Picker type: 'day' (default), 'month', or 'year'
            pickerType: config.pickerType || 'day',
            readOnly: config.readOnly ?? false,
            // Whether placeholder() was set on the field (from the view);
            // undefined from a view published before 5.0.12.
            hasPlaceholder: config.hasPlaceholder,

            // Labels (localized from PHP)
            labels: {
                apply: config.applyLabel || 'Apply',
                cancel: config.cancelLabel || 'Cancel',
                from: config.fromLabel || 'From',
                to: config.toLabel || 'To',
                customRange: config.customRangeLabel || 'Custom',
                weekLabel: config.weekLabel || 'W',
                daysOfWeek: [
                    config.sunday || 'Su',
                    config.monday || 'Mo',
                    config.tuesday || 'Tu',
                    config.wednesday || 'We',
                    config.thursday || 'Th',
                    config.friday || 'Fr',
                    config.saturday || 'Sa',
                ],
                monthNames: [
                    config.january || 'January',
                    config.february || 'February',
                    config.march || 'March',
                    config.april || 'April',
                    config.may || 'May',
                    config.june || 'June',
                    config.july || 'July',
                    config.august || 'August',
                    config.september || 'September',
                    config.october || 'October',
                    config.november || 'November',
                    config.december || 'December',
                ],
            },
        },

        // Floating UI cleanup
        cleanupAutoUpdate: null,
        _documentClickHandler: null,
        _documentFocusInHandler: null,

        // ─────────────────────────────────────────────────────────────
        // Initialization
        // ─────────────────────────────────────────────────────────────

        init() {
            // Lets the focus-trap guard find this picker's field from its
            // teleported dropdown (fi-daterangepicker-dropdown-<instanceId>).
            this.$el?.setAttribute?.(INSTANCE_ATTRIBUTE, this.instanceId);

            // Set Day.js locale (all locales are statically imported).
            // Before the mask: its AM/PM block takes the locale's meridiem.
            this.setLocale(this.config.locale);

            // The 1-12 hour select has no 0 or 23: start the 12h picker at
            // 12:00 AM and 11:59 PM, the same instants as 00:00 and 23:59.
            if (!this.config.timePicker24) {
                this.startTime = this.extractTime(dayjs().startOf('day'));
                this.endTime = this.extractTime(dayjs().endOf('day'));
            }

            // Setup input masking immediately for visual feedback
            if (this.allowManualInput) {
                this.setupInputMask();
            }

            // Parse initial state
            this.parseConfiguredState();

            // Update input value
            this.updateInputValue();

            // Watch for external state changes (Livewire updates)
            this.$watch('config.state', (value) => {
                if (this.isSyncing || this.config.dualState) return;
                this.parseState(value);
                this.forgetStalePresetLabel();
                this.updateInputValue();
            });

            this.$watch('config.dualStartState', () => this.scheduleDualStateParse());
            this.$watch('config.dualEndState', () => this.scheduleDualStateParse());

            // Add document-level keydown handler for Escape (SPA-safe)
            this._documentKeyHandler = (e) => {
                if (e.key === 'Escape' && this.open) {
                    e.stopPropagation();
                    this.cancel();
                }
            };
            document.addEventListener('keydown', this._documentKeyHandler);

            this._documentClickHandler = (event) => {
                if (!this.open) return;
                if (this.isEventInsidePicker(event)) return;

                this.cancel();
            };
            document.addEventListener('click', this._documentClickHandler);

            // Focus that lands outside the trigger and the dropdown (Tab,
            // Shift+Tab, or a programmatic focus()) closes the picker the
            // same way an outside click does. Listening for `focusin` on the
            // new target rather than `focusout` on the old one means focus
            // dropping to <body> (a click on the dropdown's padding, a native
            // <select> popup, the window losing focus) never closes it.
            // Inside a trapping modal the #264 guard stops `focusin` from the
            // dropdown before it reaches document; that focus is inside the
            // picker anyway.
            this._documentFocusInHandler = (event) => {
                if (!this.open) return;
                if (this.isEventInsidePicker(event)) return;

                // Focus has a new home; don't pull it back to the input.
                this._returnFocusOnClose = false;
                this.cancel();
            };
            document.addEventListener('focusin', this._documentFocusInHandler);

            // Presets-only keys inside the dropdown. It is teleported out of
            // this component, so its keydowns never reach handleKeydown;
            // capture runs before the dropdown's own Escape handler.
            this._presetKeyHandler = (event) => this.handlePresetKeydown(event);
            document.addEventListener('keydown', this._presetKeyHandler, true);

            // Calendar keys inside the dropdown, for the same reason.
            this._gridKeyHandler = (event) => this.handleGridKeydown(event);
            document.addEventListener('keydown', this._gridKeyHandler, true);

            // A pointer took over: a later close is not the keyboard's.
            this._pointerDownHandler = () => { this._returnFocusOnClose = false; };
            document.addEventListener('pointerdown', this._pointerDownHandler, true);
        },

        /**
         * True when a document event comes from this picker's trigger or its
         * (teleported) dropdown.
         */
        isEventInsidePicker(event) {
            const dropdown = document.getElementById(
                `fi-daterangepicker-dropdown-${this.instanceId}`
            );
            const eventPath = event.composedPath?.() || [];
            const isNodeTarget = event.target instanceof Node;
            const isInsideDropdown = (
                event.target instanceof Element
                && event.target.closest('.fi-daterangepicker-dropdown') !== null
            ) || (
                dropdown
                && (eventPath.includes(dropdown) || (isNodeTarget && dropdown.contains(event.target)))
            );
            const isInsideTrigger = this.$refs.trigger
                && (
                    eventPath.includes(this.$refs.trigger)
                    || (isNodeTarget && this.$refs.trigger.contains(event.target))
                );

            return Boolean(isInsideDropdown || isInsideTrigger);
        },

        destroy() {
            // Cleanup on component destruction (prevents memory leaks in SPAs)
            if (this.cleanupAutoUpdate) {
                this.cleanupAutoUpdate();
                this.cleanupAutoUpdate = null;
            }
            if (this.inputMask) {
                this.inputMask.destroy();
                this.inputMask = null;
            }
            if (this._inputMaskSyncHandler && this.$refs.input) {
                ['focus', 'click', 'keydown'].forEach((eventName) => {
                    this.$refs.input.removeEventListener(eventName, this._inputMaskSyncHandler, true);
                });
                this._inputMaskSyncHandler = null;
            }
            if (this._inputMaskGuideHandler && this.$refs.input) {
                ['focus', 'blur'].forEach((eventName) => {
                    this.$refs.input.removeEventListener(eventName, this._inputMaskGuideHandler);
                });
                this._inputMaskGuideHandler = null;
            }
            if (this._documentKeyHandler) {
                document.removeEventListener('keydown', this._documentKeyHandler);
                this._documentKeyHandler = null;
            }
            if (this._documentClickHandler) {
                document.removeEventListener('click', this._documentClickHandler);
                this._documentClickHandler = null;
            }
            if (this._documentFocusInHandler) {
                document.removeEventListener('focusin', this._documentFocusInHandler);
                this._documentFocusInHandler = null;
            }
            if (this._presetKeyHandler) {
                document.removeEventListener('keydown', this._presetKeyHandler, true);
                this._presetKeyHandler = null;
            }
            if (this._gridKeyHandler) {
                document.removeEventListener('keydown', this._gridKeyHandler, true);
                this._gridKeyHandler = null;
            }
            if (this._pointerDownHandler) {
                document.removeEventListener('pointerdown', this._pointerDownHandler, true);
                this._pointerDownHandler = null;
            }
            if (this._syncDebounceTimer) {
                clearTimeout(this._syncDebounceTimer);
                this._syncDebounceTimer = null;
            }
        },

        /**
         * Set Day.js locale from PHP locale code.
         * All locales are statically imported at the top of this file,
         * so this is a synchronous operation.
         */
        setLocale(locale) {
            // Map PHP locale codes → Day.js locale identifiers
            const localeMap = {
                'en': 'en',
                'ar': 'ar',
                'ckb': 'ku',
                'cs': 'cs',
                'da': 'da',
                'de': 'de',
                'es': 'es',
                'fa': 'fa',
                'fr': 'fr',
                'gr': 'el',
                'he': 'he',
                'hu': 'hu',
                'id': 'id',
                'it': 'it',
                'ko': 'ko',
                'lt': 'lt',
                'lv': 'lv',
                'nl': 'nl',
                'no': 'nb',
                'pl': 'pl',
                'pt': 'pt',
                'pt_BR': 'pt-br',
                'ro': 'ro',
                'ru': 'ru',
                'sk': 'sk',
                'sl': 'sl',
                'tr': 'tr',
                'uk': 'uk',
                'uz': 'uz',
                'vi': 'vi',
                'zh_CN': 'zh-cn',
                'zh_TW': 'zh-tw',
            };

            const dayjsLocale = localeMap[locale] || locale.toLowerCase().replace('_', '-');
            dayjs.locale(dayjsLocale);
        },

        // ─────────────────────────────────────────────────────────────
        // Input Masking
        // ─────────────────────────────────────────────────────────────

        setupInputMask() {
            const input = this.$refs.input;
            if (!input) return;

            // Force LTR direction on the input for date formatting
            // Date strings (numbers, slashes, dashes) are inherently LTR
            // and the bidi algorithm garbles partially-typed dates in RTL
            input.setAttribute('dir', 'ltr');
            if (document.documentElement.dir === 'rtl') {
                input.style.textAlign = 'right';
            }

            // Set placeholder based on format
            const placeholder = this.formatToPlaceholder(this.config.displayFormat);
            const rangePlaceholder = this.config.singleCalendar
                ? placeholder
                : `${placeholder}${this.config.separator}${placeholder}`;

            // A placeholder() set on the field is rendered on the input. Keep
            // it, and hold the mask guide back until the input is focused, so
            // an empty field shows that placeholder rather than "__/__/____".
            // The view says whether placeholder() was set, so one that reads
            // the same as the format hint ("mm/yyyy") still counts. A view
            // published before 5.0.12 sends no flag: there, a placeholder
            // equal to the format hint is taken for ours, as before.
            const renderedPlaceholder = (input.getAttribute('placeholder') ?? '').trim();
            const setOnField = typeof this.config.hasPlaceholder === 'boolean'
                ? this.config.hasPlaceholder
                : renderedPlaceholder !== rangePlaceholder;
            this._userPlaceholder = setOnField && renderedPlaceholder !== ''
                ? renderedPlaceholder
                : null;

            if (!this._userPlaceholder) {
                // Force update placeholder
                input.placeholder = rangePlaceholder;
                input.setAttribute('placeholder', rangePlaceholder);

                // Ensure it sticks (in case of race conditions)
                setTimeout(() => {
                    input.placeholder = rangePlaceholder;
                    input.setAttribute('placeholder', rangePlaceholder);
                }, 50);
            }

            // Get display format and separator
            const format = this.config.displayFormat; // e.g., "DD/MM/YYYY"
            const separator = this.config.separator; // e.g., " - "

            const dateMaskOptions = this.createDateMaskOptions(format);

            if (this.config.singleCalendar) {
                // Single date mask
                this.inputMask = IMask(input, dateMaskOptions);
            } else {
                // Date range mask with from-to blocks
                this.inputMask = IMask(input, {
                    mask: `from${separator}to`,
                    lazy: false,
                    blocks: {
                        from: dateMaskOptions,
                        to: dateMaskOptions,
                    },
                });
            }

            // IMask fires `accept` for the picker's own writes to the mask
            // (updateInputValue) as well as for typing. Only typing is input:
            // a calendar click that leaves half a range writes the empty
            // placeholder, which would otherwise read as the user emptying
            // the field and clear the state.
            this.inputMask.on('accept', () => {
                if (this._writingInputMask) return;

                this._inputMaskEditedByUser = true;
                this.handleManualInput(this.inputMask.value);
            });

            this._inputMaskSyncHandler = () => this.syncInputMaskFromElement();
            ['focus', 'click', 'keydown'].forEach((eventName) => {
                input.addEventListener(eventName, this._inputMaskSyncHandler, true);
            });

            if (this._userPlaceholder) {
                this._inputMaskGuideHandler = (event) => this.showInputMaskGuide(event.type === 'focus');
                ['focus', 'blur'].forEach((eventName) => {
                    input.addEventListener(eventName, this._inputMaskGuideHandler);
                });
                this.showInputMaskGuide(document.activeElement === input);
            }
        },

        /**
         * With a placeholder() set, the mask guide shows only while the input
         * is focused or holds something typed; an empty, unfocused field is
         * lazy so its placeholder shows. Toggling the guide rewrites the
         * value, which is the picker's own write, not the user typing.
         */
        showInputMaskGuide(focused) {
            const mask = this.inputMask;
            if (!mask || !this._userPlaceholder) return;

            const lazy = !focused && mask.unmaskedValue === '';
            if (mask.masked.lazy === lazy) return;

            const wasWriting = this._writingInputMask;
            this._writingInputMask = true;
            try {
                // MaskedDate resets every option an update leaves out to its
                // own defaults (pattern "d.m.Y", format, parse), so it gets
                // its full options back.
                mask.updateOptions(mask.masked instanceof IMask.MaskedDate
                    ? { ...this.createDateMaskOptions(this.config.displayFormat), lazy }
                    : { lazy });
            } finally {
                this._writingInputMask = wasWriting;
            }
        },

        syncInputMaskFromElement() {
            if (!this.inputMask || !this.$refs.input) return;

            if (this.$refs.input.value !== this.inputMask.value) {
                this.inputMask.updateValue();
            }
        },

        createDateMaskOptions(format) {
            if (!this.isDayPicker) {
                return this.createNumericPatternMaskOptions(format);
            }

            return {
                mask: Date,
                pattern: format,
                lazy: false,
                autofix: 'pad',
                blocks: {
                    DD: { mask: IMask.MaskedRange, from: 1, to: 31, maxLength: 2 },
                    MM: { mask: IMask.MaskedRange, from: 1, to: 12, maxLength: 2 },
                    YYYY: { mask: IMask.MaskedRange, from: 1900, to: 2100, maxLength: 4 },
                    HH: { mask: IMask.MaskedRange, from: 0, to: 23, maxLength: 2 },
                    hh: { mask: IMask.MaskedRange, from: 1, to: 12, maxLength: 2 },
                    mm: { mask: IMask.MaskedRange, from: 0, to: 59, maxLength: 2 },
                    ss: { mask: IMask.MaskedRange, from: 0, to: 59, maxLength: 2 },
                    A: this.createMeridiemMaskOptions(false),
                    a: this.createMeridiemMaskOptions(true),
                },
                format: (date) => dayjs(date).format(format),
                parse: (str) => dayjs(str, format).toDate(),
            };
        },

        /**
         * The AM/PM block of a 12h display format ("hh:mm A"). Without it the
         * mask kept "A" as a fixed letter, so the value could never parse and
         * the last time digit was refused. Takes the locale's meridiem (ص/م in
         * Arabic) and also "a"/"p" from a Latin keyboard.
         */
        createMeridiemMaskOptions(lowerCase) {
            const meridiem = (hour) => dayjs().hour(hour).minute(0).format(lowerCase ? 'a' : 'A');
            const am = meridiem(0);
            const pm = meridiem(13);
            const values = [...new Set(
                Array.from({ length: 24 }, (_, hour) => meridiem(hour))
            )];

            return {
                mask: IMask.MaskedEnum,
                enum: values,
                matchValue: (value, typed, matchFrom) => {
                    const text = typed.slice(matchFrom);
                    if (value.toLowerCase().startsWith(text.toLowerCase())) return true;

                    const alias = { a: am, p: pm }[text.toLowerCase()];
                    return alias === value;
                },
            };
        },

        createNumericPatternMaskOptions(format) {
            return {
                mask: format,
                lazy: false,
                blocks: {
                    DD: { mask: IMask.MaskedRange, from: 1, to: 31, maxLength: 2, autofix: 'pad' },
                    D: { mask: IMask.MaskedRange, from: 1, to: 31, maxLength: 2 },
                    MM: { mask: IMask.MaskedRange, from: 1, to: 12, maxLength: 2, autofix: 'pad' },
                    M: { mask: IMask.MaskedRange, from: 1, to: 12, maxLength: 2 },
                    YYYY: { mask: '0000' },
                    YY: { mask: '00' },
                    HH: { mask: IMask.MaskedRange, from: 0, to: 23, maxLength: 2, autofix: 'pad' },
                    H: { mask: IMask.MaskedRange, from: 0, to: 23, maxLength: 2 },
                    hh: { mask: IMask.MaskedRange, from: 1, to: 12, maxLength: 2, autofix: 'pad' },
                    h: { mask: IMask.MaskedRange, from: 1, to: 12, maxLength: 2 },
                    mm: { mask: IMask.MaskedRange, from: 0, to: 59, maxLength: 2, autofix: 'pad' },
                    m: { mask: IMask.MaskedRange, from: 0, to: 59, maxLength: 2 },
                    ss: { mask: IMask.MaskedRange, from: 0, to: 59, maxLength: 2, autofix: 'pad' },
                    s: { mask: IMask.MaskedRange, from: 0, to: 59, maxLength: 2 },
                },
            };
        },


        smartAutoPadAndJump() {
            const input = this.$refs.input;
            const mask = this.inputMask;
            if (!input || !mask) return;

            let value = input.value;
            const cursor = input.selectionStart;

            // Define block character detection
            const isBlockChar = (c) => /[0-9dmyhs]/i.test(c);

            // Find current block boundaries
            let blockStart = cursor;
            while (blockStart > 0 && isBlockChar(value[blockStart - 1])) blockStart--;
            let blockEnd = cursor;
            while (blockEnd < value.length && isBlockChar(value[blockEnd])) blockEnd++;

            const blockContent = value.slice(blockStart, blockEnd);

            // Detect pattern: single digit followed by placeholder(s)
            const singleDigitMatch = blockContent.match(/^(\d)([dmyhs]+)$/i);

            if (!singleDigitMatch) return;

            const digit = singleDigitMatch[1];
            const placeholders = singleDigitMatch[2];
            const placeholderType = placeholders[0].toLowerCase();

            let shouldPadAndJump = false;

            // Day logic: 4-9 must be 04-09
            if (placeholderType === 'd' && parseInt(digit) >= 4) {
                shouldPadAndJump = true;
            }

            // Month logic: 2-9 must be 02-09
            if (placeholderType === 'm' && parseInt(digit) >= 2) {
                shouldPadAndJump = true;
            }

            // Hours (24h): 3-9 must be 03-09
            if (placeholderType === 'h' && parseInt(digit) >= 3) {
                shouldPadAndJump = true;
            }

            // Seconds: 6-9 must be 06-09
            if (placeholderType === 's' && parseInt(digit) >= 6) {
                shouldPadAndJump = true;
            }

            if (shouldPadAndJump) {
                // Set flag to prevent recursion
                this._isAutoPadding = true;

                // Defer the update to next tick to avoid IMask conflicts
                setTimeout(() => {
                    // Re-read current state
                    const currentValue = input.value;
                    const paddedBlock = '0' + digit;
                    const restOfPlaceholders = placeholders.slice(1);
                    const newValue = currentValue.slice(0, blockStart) + paddedBlock + restOfPlaceholders + currentValue.slice(blockEnd);

                    // Update mask
                    mask.value = newValue;

                    // Calculate and set cursor position
                    const freshValue = input.value;
                    const len = freshValue.length;
                    let newCursor = blockStart + 2;
                    while (newCursor < len && isBlockChar(freshValue[newCursor])) newCursor++;
                    while (newCursor < len && !isBlockChar(freshValue[newCursor])) newCursor++;

                    input.setSelectionRange(newCursor, newCursor);

                    this._isAutoPadding = false;
                }, 0);
            }
        },

        formatToPlaceholder(format) {
            // Convert Day.js format to lowercase placeholder (e.g., DD/MM/YYYY -> dd/mm/yyyy)
            return format
                .replace(/YYYY/g, 'yyyy')
                .replace(/YY/g, 'yy')
                .replace(/MMMM/g, 'month')
                .replace(/MMM/g, 'mon')
                .replace(/MM/g, 'mm')
                .replace(/M/g, 'm')
                .replace(/DD/g, 'dd')
                .replace(/D/g, 'd')
                .replace(/HH/g, 'hh')
                .replace(/hh/g, 'hh')
                .replace(/mm/g, 'mm')
                .replace(/ss/g, 'ss')
                .replace(/A/g, 'am/pm');
        },

        formatToMaskPattern(format) {
            // Convert Day.js format to IMask pattern
            return format
                .replace(/YYYY/g, 'YYYY')
                .replace(/MM/g, 'MM')
                .replace(/DD/g, 'DD')
                .replace(/HH/g, 'HH')
                .replace(/hh/g, 'hh')
                .replace(/mm/g, 'mm')
                .replace(/ss/g, 'ss');
        },

        handleManualInput(value, options = {}) {
            const result = this.parseManualInput(value);

            if (result.status === 'empty') {
                this.selection = { start: null, end: null };
                this.selectedPresetLabel = null;
                this.syncState();
                return true;
            }

            if (result.status !== 'valid') {
                if (options.revertOnInvalid) {
                    this.updateInputValue();
                }
                return false;
            }

            const typedPreset = this.presetsOnly
                ? this.presetLabelForRange(result.start, result.end)
                : null;

            if (this.presetsOnly && typedPreset === null) {
                if (options.revertOnInvalid) {
                    this.updateInputValue();
                }
                return false;
            }

            this.selection.start = result.start;
            this.selection.end = result.end;
            this.viewDate = result.start;
            this.showSelectionInUnlinkedCalendars();

            // syncState() applies startTime/endTime to the selection: take
            // them from what was typed, or the selects' defaults win.
            if (this.config.timePicker) {
                this.startTime = this.extractTime(result.start);
                this.endTime = this.extractTime(result.end);
            }

            if (typedPreset !== null) this.selectedPresetLabel = typedPreset;
            this.forgetStalePresetLabel();

            return this.syncState();
        },

        commitManualInput() {
            if (!this.allowManualInput) return false;

            const value = this.inputMask?.value ?? this.$refs.input?.value ?? this.inputValue;

            // An empty mask the picker wrote itself (half a range picked on
            // the calendar) is not the user clearing the field.
            if (this.inputMask && !this._inputMaskEditedByUser
                && this.isEmptyMaskValue(String(value ?? '').trim())) {
                return false;
            }

            return this.handleManualInput(value, { revertOnInvalid: true });
        },

        parseManualInput(value) {
            const input = String(value ?? '').trim();

            if (!input || this.isEmptyMaskValue(input)) {
                return { status: 'empty' };
            }

            const format = this.config.displayFormat;
            const separator = this.config.separator;

            if (this.config.singleCalendar) {
                const date = dayjs(input, format, true);

                if (!date.isValid() || !this.isDateAllowedForPicker(date)) {
                    return { status: 'invalid' };
                }

                return {
                    status: 'valid',
                    start: this.normalizeSelectionStart(date),
                    end: this.normalizeSelectionEnd(date),
                };
            }

            const parts = input.split(separator);

            if (parts.length !== 2) {
                return { status: 'invalid' };
            }

            const start = dayjs(parts[0].trim(), format, true);
            const end = dayjs(parts[1].trim(), format, true);

            if (!start.isValid() || !end.isValid() ||
                !this.isDateAllowedForPicker(start) || !this.isDateAllowedForPicker(end)) {
                return { status: 'invalid' };
            }

            const unit = this.getPickerUnit();
            const isReversed = start.isAfter(end, unit);
            const rangeStart = isReversed ? end : start;
            const rangeEnd = isReversed ? start : end;

            // Longer than maxSpan: a day the calendar would not let you click.
            const spanEnd = this.isDayPicker ? this.calculateMaxSpanEnd(rangeStart) : null;
            if (spanEnd && rangeEnd.isAfter(spanEnd, 'day')) {
                return { status: 'invalid' };
            }

            return {
                status: 'valid',
                start: this.normalizeSelectionStart(rangeStart),
                end: this.normalizeSelectionEnd(rangeEnd),
            };
        },

        /**
         * The mask is always on (lazy: false), so an input emptied from the
         * keyboard still shows its placeholder ("__/____") and never reads
         * as an empty string. With nothing typed, that is an empty field,
         * not a partial value, and must clear the state like the clear button.
         */
        isEmptyMaskValue(value) {
            const mask = this.inputMask;

            return !!mask
                && mask.unmaskedValue === ''
                && value === String(mask.value ?? '').trim();
        },

        getPickerUnit() {
            if (this.isMonthPicker) return 'month';
            if (this.isYearPicker) return 'year';
            return 'day';
        },

        normalizeSelectionStart(date) {
            if (this.isMonthPicker) return date.startOf('month');
            if (this.isYearPicker) return date.startOf('year');
            return date;
        },

        normalizeSelectionEnd(date) {
            if (this.isMonthPicker) return date.endOf('month');
            if (this.isYearPicker) return date.endOf('year');
            return date;
        },

        isDateAllowedForPicker(date) {
            if (this.isMonthPicker) {
                return !this.isMonthDisabled(date.startOf('month'));
            }

            if (this.isYearPicker) {
                return !this.isYearDisabled(date.startOf('year'));
            }

            return !this.isDisabled(date);
        },

        updateInputValue() {
            this.inputValue = this.getDisplayValue();
            if (this.inputMask && this.inputMask.value !== this.inputValue) {
                this._writingInputMask = true;
                try {
                    this.inputMask.value = this.inputValue;
                } finally {
                    this._writingInputMask = false;
                }
                this._inputMaskEditedByUser = false;
            }
        },

        // ─────────────────────────────────────────────────────────────
        // Calendar Grid Generation
        // ─────────────────────────────────────────────────────────────

        generateGrid(monthOffset = 0) {
            const current = this.calendarMonth(monthOffset);
            const firstDayOfMonth = current.startOf('month');
            const lastDayOfMonth = current.endOf('month');

            // Calculate start of grid based on first day of week setting
            let startOfGrid = firstDayOfMonth.startOf('week');
            const dayDiff = (firstDayOfMonth.day() - this.config.firstDay + 7) % 7;
            startOfGrid = firstDayOfMonth.subtract(dayDiff, 'days');

            const weeks = [];
            let currentDay = startOfGrid;

            // Generate 6 weeks to cover all possible month layouts
            for (let w = 0; w < 6; w++) {
                const week = [];
                for (let d = 0; d < 7; d++) {
                    week.push(this.createDayObject(currentDay, current.month()));
                    currentDay = currentDay.add(1, 'day');
                }
                weeks.push(week);
            }

            return {
                month: current,
                monthName: this.config.labels.monthNames[current.month()],
                year: current.year(),
                weeks,
            };
        },

        createDayObject(date, currentMonth) {
            return {
                date: date,
                day: date.date(),
                isCurrentMonth: date.month() === currentMonth,
                isToday: date.isSame(this.today(), 'day'),
                isSelected: (date.month() === currentMonth) && this.isSelected(date),
                inRange: (date.month() === currentMonth) && this.isInRange(date),
                isStart: (date.month() === currentMonth) && this.isStartDate(date),
                isEnd: (date.month() === currentMonth) && this.isEndDate(date),
                isHovered: this.hoverDate && date.isSame(this.hoverDate, 'day'),
                disabled: this.isDisabled(date),
                weekNumber: this.getWeekNumber(date),
                dateString: date.format('YYYY-MM-DD'),
            };
        },

        getWeekNumber(date) {
            if (this.config.showISOWeekNumbers) {
                return date.isoWeek();
            }
            if (this.config.showWeekNumbers) {
                return date.week();
            }
            return null;
        },

        // ─────────────────────────────────────────────────────────────
        // Month Grid Generation (for pickerType: 'month')
        // ─────────────────────────────────────────────────────────────

        generateMonthGrid(yearOffset = 0) {
            const currentYear = this.viewDate.add(yearOffset, 'year').year();
            const months = [];

            for (let i = 0; i < 12; i++) {
                const monthDate = dayjs().year(currentYear).month(i).startOf('month');
                months.push({
                    date: monthDate,
                    month: i,
                    monthName: this.config.labels.monthNames[i],
                    shortName: this.config.labels.monthNames[i].substring(0, 3),
                    year: currentYear,
                    isCurrentMonth: monthDate.isSame(this.today(), 'month'),
                    isSelected: this.isMonthSelected(monthDate),
                    inRange: this.isMonthInRange(monthDate),
                    isStart: this.isMonthStart(monthDate),
                    isEnd: this.isMonthEnd(monthDate),
                    disabled: this.isMonthDisabled(monthDate),
                    dateString: monthDate.format('YYYY-MM'),
                });
            }

            return {
                year: currentYear,
                months,
            };
        },

        isMonthSelected(monthDate) {
            return this.isMonthStart(monthDate) || this.isMonthEnd(monthDate);
        },

        isMonthStart(monthDate) {
            if (!this.selection.start) return false;
            return monthDate.isSame(this.selection.start, 'month');
        },

        isMonthEnd(monthDate) {
            const end = this.selection.end || this.tempEndDate;
            if (!end) return false;
            return monthDate.isSame(end, 'month');
        },

        isMonthInRange(monthDate) {
            if (!this.selection.start) return false;
            const end = this.selection.end || this.tempEndDate;
            if (!end) return false;

            const [rangeStart, rangeEnd] = this.selection.start.isBefore(end)
                ? [this.selection.start, end]
                : [end, this.selection.start];

            return monthDate.isAfter(rangeStart.startOf('month')) &&
                monthDate.isBefore(rangeEnd.endOf('month'));
        },

        isMonthDisabled(monthDate) {
            const year = monthDate.year();
            const minYear = this.getMinConstraintYear();
            const maxYear = this.getMaxConstraintYear();

            if (minYear !== null && year < minYear) return true;
            if (maxYear !== null && year > maxYear) return true;

            if (this.config.minDate) {
                const minDate = dayjs(this.config.minDate);
                if (minDate.isValid()) {
                    const min = minDate.startOf('month');
                    if (monthDate.isBefore(min, 'month')) return true;
                }
            }
            if (this.config.maxDate) {
                const maxDate = dayjs(this.config.maxDate);
                if (maxDate.isValid()) {
                    const max = maxDate.endOf('month');
                    if (monthDate.isAfter(max, 'month')) return true;
                }
            }
            return false;
        },

        handleMonthClick(month) {
            if (month.disabled) return;

            this.selectedPresetLabel = null;

            const clickedDate = month.date;

            if (this.config.singleCalendar) {
                this.selection.start = clickedDate.startOf('month');
                this.selection.end = clickedDate.endOf('month');
                if (this.config.autoApply) {
                    this.applySelection();
                }
                return;
            }

            if (!this.selection.start && this.selection.end) {
                const existingEnd = this.selection.end.endOf('month');

                if (clickedDate.isBefore(existingEnd, 'month')) {
                    this.selection.start = clickedDate.startOf('month');
                    this.selection.end = existingEnd;
                } else {
                    this.selection.start = existingEnd.startOf('month');
                    this.selection.end = clickedDate.endOf('month');
                }

                if (this.config.autoApply) {
                    this.applySelection();
                }

                this.updateInputValue();

                return;
            }

            // Range selection logic
            if (!this.selection.start || this.selection.end) {
                this.selection.start = clickedDate.startOf('month');
                this.selection.end = null;
                this.tempEndDate = null;
            } else {
                if (clickedDate.isBefore(this.selection.start)) {
                    this.selection.end = this.selection.start.endOf('month');
                    this.selection.start = clickedDate.startOf('month');
                } else {
                    this.selection.end = clickedDate.endOf('month');
                }

                if (this.config.autoApply) {
                    this.applySelection();
                }
            }

            this.updateInputValue();
        },

        handleMonthHover(month) {
            this.hoverDate = month.date;

            if (!this.selection.start || this.selection.end || month.disabled) {
                this.tempEndDate = null;
                return;
            }
            this.tempEndDate = month.date.endOf('month');
        },

        // ─────────────────────────────────────────────────────────────
        // Year Grid Generation (for pickerType: 'year')
        // ─────────────────────────────────────────────────────────────

        generateYearGrid(decadeOffset = 0) {
            const currentYear = this.viewDate.year();
            const decadeStart = Math.floor(currentYear / 10) * 10 + (decadeOffset * 10);
            const years = [];

            for (let i = 0; i < 12; i++) {
                const year = decadeStart + i - 1; // -1 to show previous year, +12 for next
                const yearDate = dayjs().year(year).startOf('year');
                years.push({
                    date: yearDate,
                    year: year,
                    isCurrentYear: year === this.today().year(),
                    inDecade: i >= 1 && i <= 10,
                    isSelected: this.isYearSelected(yearDate),
                    inRange: this.isYearInRange(yearDate),
                    isStart: this.isYearStart(yearDate),
                    isEnd: this.isYearEnd(yearDate),
                    disabled: this.isYearDisabled(yearDate),
                    dateString: String(year),
                });
            }

            return {
                decadeStart,
                decadeEnd: decadeStart + 9,
                years,
            };
        },

        isYearSelected(yearDate) {
            return this.isYearStart(yearDate) || this.isYearEnd(yearDate);
        },

        isYearStart(yearDate) {
            if (!this.selection.start) return false;
            return yearDate.year() === this.selection.start.year();
        },

        isYearEnd(yearDate) {
            const end = this.selection.end || this.tempEndDate;
            if (!end) return false;
            return yearDate.year() === end.year();
        },

        isYearInRange(yearDate) {
            if (!this.selection.start) return false;
            const end = this.selection.end || this.tempEndDate;
            if (!end) return false;

            const [rangeStart, rangeEnd] = this.selection.start.isBefore(end)
                ? [this.selection.start, end]
                : [end, this.selection.start];

            return yearDate.year() > rangeStart.year() && yearDate.year() < rangeEnd.year();
        },

        isYearDisabled(yearDate) {
            const year = yearDate.year();
            const minYear = this.getMinConstraintYear();
            const maxYear = this.getMaxConstraintYear();

            if (minYear !== null && year < minYear) return true;
            if (maxYear !== null && year > maxYear) return true;

            return false;
        },

        handleYearClick(yearItem) {
            if (yearItem.disabled) return;

            this.selectedPresetLabel = null;

            const clickedDate = yearItem.date;

            if (this.config.singleCalendar) {
                this.selection.start = clickedDate.startOf('year');
                this.selection.end = clickedDate.endOf('year');
                if (this.config.autoApply) {
                    this.applySelection();
                }
                return;
            }

            if (!this.selection.start && this.selection.end) {
                const existingEnd = this.selection.end.endOf('year');

                if (clickedDate.isBefore(existingEnd, 'year')) {
                    this.selection.start = clickedDate.startOf('year');
                    this.selection.end = existingEnd;
                } else {
                    this.selection.start = existingEnd.startOf('year');
                    this.selection.end = clickedDate.endOf('year');
                }

                if (this.config.autoApply) {
                    this.applySelection();
                }

                this.updateInputValue();

                return;
            }

            // Range selection logic
            if (!this.selection.start || this.selection.end) {
                this.selection.start = clickedDate.startOf('year');
                this.selection.end = null;
                this.tempEndDate = null;
            } else {
                if (clickedDate.isBefore(this.selection.start)) {
                    this.selection.end = this.selection.start.endOf('year');
                    this.selection.start = clickedDate.startOf('year');
                } else {
                    this.selection.end = clickedDate.endOf('year');
                }

                if (this.config.autoApply) {
                    this.applySelection();
                }
            }

            this.updateInputValue();
        },

        handleYearHover(yearItem) {
            this.hoverDate = yearItem.date;

            if (!this.selection.start || this.selection.end || yearItem.disabled) {
                this.tempEndDate = null;
                return;
            }
            this.tempEndDate = yearItem.date.endOf('year');
        },

        getMinConstraintYear() {
            const years = [];

            if (this.config.minYear !== null && this.config.minYear !== undefined) {
                years.push(parseInt(this.config.minYear));
            }

            if (this.config.minDate) {
                const minDate = dayjs(this.config.minDate);
                if (minDate.isValid()) {
                    years.push(minDate.year());
                }
            }

            const validYears = years.filter(year => Number.isFinite(year));

            return validYears.length ? Math.max(...validYears) : null;
        },

        getMaxConstraintYear() {
            const years = [];

            if (this.config.maxYear !== null && this.config.maxYear !== undefined) {
                years.push(parseInt(this.config.maxYear));
            }

            if (this.config.maxDate) {
                const maxDate = dayjs(this.config.maxDate);
                if (maxDate.isValid()) {
                    years.push(maxDate.year());
                }
            }

            const validYears = years.filter(year => Number.isFinite(year));

            return validYears.length ? Math.min(...validYears) : null;
        },

        getYearOptions() {
            const currentYear = dayjs().year();
            const minYear = this.getMinConstraintYear() ?? currentYear - 100;
            const maxYear = this.getMaxConstraintYear() ?? currentYear + 20;

            if (maxYear < minYear) {
                return [];
            }

            return Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);
        },

        clampYearToConstraints(year) {
            let constrainedYear = parseInt(year);

            if (!Number.isFinite(constrainedYear)) {
                return null;
            }

            const minYear = this.getMinConstraintYear();
            const maxYear = this.getMaxConstraintYear();

            if (minYear !== null && constrainedYear < minYear) {
                constrainedYear = minYear;
            }

            if (maxYear !== null && constrainedYear > maxYear) {
                constrainedYear = maxYear;
            }

            return constrainedYear;
        },

        constrainMonthPickerViewDate(date) {
            if (!date) return date;

            const minYear = this.getMinConstraintYear();
            const maxYear = this.getMaxConstraintYear();

            if (minYear === null && maxYear === null) {
                return date;
            }

            let year = date.year();

            if (minYear !== null && year < minYear) {
                year = minYear;
            }

            if (maxYear !== null) {
                const visibleYearOffset = this.config.singleCalendar ? 0 : 1;
                if (year + visibleYearOffset > maxYear) {
                    const maxBaseYear = maxYear - visibleYearOffset;
                    year = minYear !== null ? Math.max(minYear, maxBaseYear) : maxBaseYear;
                }
            }

            return date.year(year);
        },

        canShowPreviousMonthPickerYear() {
            const minYear = this.getMinConstraintYear();

            return minYear === null || this.viewDate.year() > minYear;
        },

        canShowNextMonthPickerYear() {
            const maxYear = this.getMaxConstraintYear();

            if (maxYear === null) {
                return true;
            }

            const rightMostVisibleYear = this.viewDate.year() + (this.config.singleCalendar ? 0 : 1);

            return rightMostVisibleYear < maxYear;
        },

        // Navigation for month/year pickers
        prevYear() {
            if (!this.canShowPreviousMonthPickerYear()) return;

            this.viewDate = this.viewDate.subtract(1, 'year');
        },

        nextYear() {
            if (!this.canShowNextMonthPickerYear()) return;

            this.viewDate = this.viewDate.add(1, 'year');
        },

        /**
         * Whether a decade arrow may move: the decade it brings into view
         * must hold an allowed year (getMinConstraintYear /
         * getMaxConstraintYear). The padding cells either side of a decade
         * are not counted, as each is a full cell of the decade next to it.
         */
        canShowPreviousDecade() {
            const minYear = this.getMinConstraintYear();
            if (minYear === null) return true;

            // The new left decade ends one year before the current one starts.
            return this.generateYearGrid(0).decadeStart - 1 >= minYear;
        },

        canShowNextDecade() {
            const maxYear = this.getMaxConstraintYear();
            if (maxYear === null) return true;

            const lastOffset = this.config.singleCalendar ? 0 : 1;

            // The new right decade starts one year after the current one ends.
            return this.generateYearGrid(lastOffset).decadeEnd + 1 <= maxYear;
        },

        /**
         * Keep the year picker on decades that hold an allowed year: the
         * left one no later than maxYear's (the right one, with two
         * calendars), and never before minYear's.
         */
        constrainYearPickerViewDate(date) {
            if (!date) return date;

            const minYear = this.getMinConstraintYear();
            const maxYear = this.getMaxConstraintYear();
            const decadeOf = (year) => Math.floor(year / 10) * 10;
            let decade = decadeOf(date.year());

            if (maxYear !== null) {
                const lastOffset = this.config.singleCalendar ? 0 : 1;
                decade = Math.min(decade, decadeOf(maxYear) - lastOffset * 10);
            }

            if (minYear !== null) {
                decade = Math.max(decade, decadeOf(minYear));
            }

            return decade === decadeOf(date.year()) ? date : date.year(decade + (date.year() % 10));
        },

        prevDecade() {
            if (!this.canShowPreviousDecade()) return;

            this.viewDate = this.viewDate.subtract(10, 'year');
        },

        nextDecade() {
            if (!this.canShowNextDecade()) return;

            this.viewDate = this.viewDate.add(10, 'year');
        },

        // Check if we're in a specific picker mode
        get isMonthPicker() {
            return this.config.pickerType === 'month';
        },

        get isYearPicker() {
            return this.config.pickerType === 'year';
        },

        get isDayPicker() {
            return this.config.pickerType === 'day';
        },

        // ─────────────────────────────────────────────────────────────
        // Date Selection Logic
        // ─────────────────────────────────────────────────────────────

        handleDayClick(day) {
            if (day.disabled) return;

            this.selectedPresetLabel = null;

            const clickedDate = day.date;

            if (this.config.singleCalendar) {
                // Single date mode
                this.selection.start = clickedDate;
                this.selection.end = clickedDate;
                if (this.config.autoApply) {
                    this.applySelection();
                }
                return;
            }

            if (!this.selection.start && this.selection.end) {
                const existingEnd = this.selection.end;

                if (clickedDate.isBefore(existingEnd, 'day')) {
                    this.selection.start = clickedDate;
                } else {
                    this.selection.start = existingEnd;
                    this.selection.end = clickedDate;
                }

                if (this.config.autoApply) {
                    this.applySelection();
                }

                this.updateInputValue();

                return;
            }

            // Range selection logic
            if (!this.selection.start || this.selection.end) {
                // Start new selection
                this.selection.start = clickedDate;
                this.selection.end = null;
                this.tempEndDate = null;
            } else {
                // Complete selection
                if (clickedDate.isBefore(this.selection.start, 'day')) {
                    // Clicked before start - swap
                    this.selection.end = this.selection.start;
                    this.selection.start = clickedDate;
                } else {
                    this.selection.end = clickedDate;
                }

                if (this.config.autoApply) {
                    this.applySelection();
                }
            }

            this.updateInputValue();
        },

        handleDayHover(day) {
            this.hoverDate = day.date;

            if (!this.selection.start || this.selection.end || day.disabled) {
                this.tempEndDate = null;
                return;
            }
            this.tempEndDate = day.date;
        },

        handleDayLeave() {
            this.hoverDate = null;
        },

        // ─────────────────────────────────────────────────────────────
        // State Helpers
        // ─────────────────────────────────────────────────────────────

        isSelected(date) {
            return this.isStartDate(date) || this.isEndDate(date);
        },

        isStartDate(date) {
            return this.selection.start?.isSame(date, 'day') ?? false;
        },

        isEndDate(date) {
            const end = this.selection.end || this.tempEndDate;
            return end?.isSame(date, 'day') ?? false;
        },

        isInRange(date) {
            if (!this.selection.start) return false;
            const end = this.selection.end || this.tempEndDate;
            if (!end) return false;

            const [rangeStart, rangeEnd] = this.selection.start.isBefore(end)
                ? [this.selection.start, end]
                : [end, this.selection.start];

            return date.isBetween(rangeStart, rangeEnd, 'day', '()');
        },

        isDisabled(date) {
            // Year bounds (showDropdowns' minYear / maxYear)
            if (this.isOutsideConfiguredYears(date)) return true;

            // Min date check
            if (this.config.minDate) {
                const min = dayjs(this.config.minDate);
                if (date.isBefore(min, 'day')) return true;
            }

            // Max date check
            if (this.config.maxDate) {
                const max = dayjs(this.config.maxDate);
                if (date.isAfter(max, 'day')) return true;
            }

            // Disabled dates array
            if (this.config.disabledDates?.length) {
                const format = this.config.displayFormat;
                const isDisabled = this.config.disabledDates.some(d => {
                    // Try parsing with custom format first
                    let disabledDate = dayjs(d, format, true);
                    if (!disabledDate.isValid()) {
                        // Fallback to standard parsing
                        disabledDate = dayjs(d);
                    }
                    return disabledDate.isValid() && disabledDate.isSame(date, 'day');
                });
                if (isDisabled) return true;
            }

            // Max span validation (only when selecting end date)
            if (this.config.maxSpan && this.selection.start && !this.selection.end) {
                const maxEnd = this.calculateMaxSpanEnd(this.selection.start);
                if (maxEnd && date.isAfter(maxEnd, 'day')) return true;
            }

            return false;
        },

        isOutsideConfiguredYears(date) {
            const minYear = parseInt(this.config.minYear);
            const maxYear = parseInt(this.config.maxYear);

            if (Number.isFinite(minYear) && date.year() < minYear) return true;
            if (Number.isFinite(maxYear) && date.year() > maxYear) return true;

            return false;
        },

        calculateMaxSpanEnd(startDate) {
            if (!this.config.maxSpan) return null;

            let maxEnd = startDate;
            if (this.config.maxSpan.days) {
                maxEnd = maxEnd.add(this.config.maxSpan.days, 'days');
            }
            if (this.config.maxSpan.months) {
                maxEnd = maxEnd.add(this.config.maxSpan.months, 'months');
            }
            if (this.config.maxSpan.years) {
                maxEnd = maxEnd.add(this.config.maxSpan.years, 'years');
            }
            return maxEnd;
        },

        // ─────────────────────────────────────────────────────────────
        // State Sync (Livewire)
        // ─────────────────────────────────────────────────────────────

        parseConfiguredState() {
            if (this.config.dualState) {
                this.parseDualState(
                    this.config.dualStartState,
                    this.config.dualEndState
                );

                return;
            }

            this.parseState(this.config.state);
        },

        parseDualState(startState, endState) {
            const start = this.parseDualDate(startState);
            const end = this.parseDualDate(endState);

            this.selection = {
                start: start ? this.normalizeSelectionStart(start) : null,
                end: end ? this.normalizeSelectionEnd(end) : null,
            };

            if (this.selection.start || this.selection.end) {
                this.viewDate = this.selection.start || this.selection.end;
            }

            this.dualStateSnapshot = {
                start: {
                    raw: startState ?? null,
                    display: this.selection.start?.format(this.config.displayFormat) ?? null,
                },
                end: {
                    raw: endState ?? null,
                    display: this.selection.end?.format(this.config.displayFormat) ?? null,
                },
            };

            if (this.config.timePicker && this.selection.start) {
                this.startTime = this.extractTime(this.selection.start);
            }

            if (this.config.timePicker && this.selection.end) {
                this.endTime = this.extractTime(this.selection.end);
            }

            this.config.state = this.getDisplayValue();
        },

        parseDualDate(state) {
            if (state === null || state === undefined || state === '') return null;

            try {
                const value = String(state);

                if (!this.formatHasTimeTokens(this.config.storageFormat)) {
                    const parsed = dayjs(value, this.config.storageFormat, true);

                    if (!parsed.isValid() || parsed.format(this.config.storageFormat) !== value) {
                        return null;
                    }

                    return parsed;
                }

                const parsed = dayjs.tz(
                    value,
                    this.config.storageFormat,
                    this.config.storageTimezone
                );

                if (!parsed.isValid() || parsed.format(this.config.storageFormat) !== value) {
                    return null;
                }

                return this.toWallClockDate(parsed, this.config.timezone);
            } catch {
                return null;
            }
        },

        formatHasTimeTokens(format) {
            const formatWithoutLiterals = format.replace(/\[[^\]]*]/g, '');

            return /[HhkmsSaAXxZz]/.test(formatWithoutLiterals);
        },

        /**
         * Today's wall-clock date in the picker's display timezone.
         *
         * The PHP side computes the presets ("Today", "Yesterday"...) in
         * getTimezone() and reads typed dates in it, so the calendar's
         * "today" marker has to use the same zone. With the browser clock a
         * Riyadh panel opened from a UTC laptop at 01:30 marked the 29th as
         * today while the Today preset selected the 30th.
         */
        today() {
            if (!this.config.timezone) return dayjs();

            // Called for every calendar cell: build the formatter once and
            // recompute at most once a minute. Only the date is read, so a
            // display-zone hour that does not exist in the browser's zone
            // (a DST gap) cannot make the result invalid.
            const minute = Math.floor(Date.now() / 60000);

            if (this._today?.minute === minute) return this._today.value;

            let value;

            try {
                this._todayFormatter ??= new Intl.DateTimeFormat('en-CA-u-ca-gregory', {
                    timeZone: this.config.timezone,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                });
                const parts = Object.fromEntries(
                    this._todayFormatter.formatToParts(new Date())
                        .filter(({ type }) => type !== 'literal')
                        .map(({ type, value }) => [type, value])
                );
                value = dayjs(`${parts.year}-${parts.month}-${parts.day}`, 'YYYY-MM-DD', true);
            } catch {
                value = null;
            }

            if (!value?.isValid()) value = dayjs();

            this._today = { minute, value };

            return value;
        },

        toWallClockDate(date, timezoneName) {
            const parts = new Intl.DateTimeFormat('en-CA-u-ca-gregory', {
                timeZone: timezoneName,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hourCycle: 'h23',
            }).formatToParts(date.toDate());
            const values = Object.fromEntries(
                parts
                    .filter(({ type }) => type !== 'literal')
                    .map(({ type, value }) => [type, value])
            );

            return dayjs(
                `${values.year}-${values.month}-${values.day} ${values.hour}:${values.minute}:${values.second}`,
                'YYYY-MM-DD HH:mm:ss',
                true
            );
        },

        scheduleDualStateParse() {
            if (this.isSyncing || !this.config.dualState || this.dualStateParseQueued) return;

            this.dualStateParseQueued = true;
            this.$nextTick(() => {
                this.dualStateParseQueued = false;

                if (this.isSyncing) return;

                this.parseDualState(
                    this.config.dualStartState,
                    this.config.dualEndState
                );
                this.forgetStalePresetLabel();
                this.updateInputValue();
            });
        },

        parseState(stateString) {
            // Start from an empty selection: a state that does not parse (or
            // only half parses) must clear the input, not leave the previous
            // range on screen over a value the server no longer holds.
            this.selection = { start: null, end: null };

            if (!stateString) {
                return;
            }

            const format = this.config.displayFormat;
            const separator = this.config.separator;

            if (this.config.singleCalendar) {
                const date = this.parseDisplayDate(stateString.trim(), format);
                if (date.isValid()) {
                    this.selection.start = this.normalizeSelectionStart(date);
                    this.selection.end = this.normalizeSelectionEnd(date);
                    this.viewDate = this.selection.start;
                }
            } else {
                const parts = stateString
                    .split(separator)
                    .map((part) => part.trim())
                    .filter((part) => part !== '');

                if (parts.length === 1) {
                    // A lone date (only the start was picked, then persisted):
                    // the server filters it as that whole day, so show it as
                    // that day rather than an empty input over an active filter.
                    const date = this.parseDisplayDate(parts[0], format);
                    if (date.isValid()) {
                        this.selection.start = this.normalizeSelectionStart(date.startOf('day'));
                        this.selection.end = this.normalizeSelectionEnd(date.endOf('day'));
                        this.viewDate = this.selection.start;
                    }
                } else if (parts.length === 2) {
                    const start = this.parseDisplayDate(parts[0].trim(), format);
                    const end = this.parseDisplayDate(parts[1].trim(), format);

                    if (start.isValid() && end.isValid()) {
                        this.selection.start = this.normalizeSelectionStart(start);
                        this.selection.end = this.normalizeSelectionEnd(end);
                        this.viewDate = this.selection.start;
                    }
                }
            }

            // Parse time if timePicker is enabled
            if (this.config.timePicker && this.selection.start && this.selection.end) {
                this.startTime = this.extractTime(this.selection.start);
                this.endTime = this.extractTime(this.selection.end);
            }
        },

        /**
         * One date of the state, in the display format.
         *
         * The picker writes month, weekday and AM/PM names in the page locale,
         * but a default built on the server (DateRangePicker::buildDefaultValue()
         * formats with PHP) carries English names, and the server reads both.
         * Read English as well, so an Arabic page shows that default instead of
         * an empty box over an active filter.
         */
        parseDisplayDate(text, format) {
            const date = dayjs(text, format, true);

            if (date.isValid() || dayjs.locale() === 'en') {
                return date;
            }

            const english = dayjs(text, format, 'en', true);

            return english.isValid() ? english.locale(dayjs.locale()) : date;
        },

        extractTime(date) {
            const hour = date.hour();
            const minute = date.minute();
            const second = date.second();

            if (this.config.timePicker24) {
                return { hour, minute, second, ampm: 'AM' };
            }

            return {
                hour: hour % 12 || 12,
                minute,
                second,
                ampm: hour >= 12 ? 'PM' : 'AM',
            };
        },

        syncState() {
            if (this.config.dualState && this.dualStateStatus === 'incomplete') {
                return false;
            }

            const format = this.config.displayFormat;
            let value = '';
            let start = null;
            let end = null;

            if (this.selection.start && this.selection.end) {
                start = this.selection.start;
                end = this.selection.end;

                // Apply time if timePicker is enabled
                if (this.config.timePicker) {
                    start = this.applyTime(start, this.startTime);
                    end = this.applyTime(end, this.endTime);
                }

                if (this.config.singleCalendar) {
                    value = start.format(format);
                } else {
                    value = `${start.format(format)}${this.config.separator}${end.format(format)}`;
                }
            }

            let dualStartState = null;
            let dualEndState = null;

            if (this.config.dualState) {
                dualStartState = start ? this.serializeDualDate(start, 'start') : null;
                dualEndState = end ? this.serializeDualDate(end, 'end') : null;

                if ((start && dualStartState === null) || (end && dualEndState === null)) {
                    return false;
                }
            }

            this.isSyncing = true;
            this.config.state = value;

            if (this.config.dualState) {
                this.config.dualStartState = dualStartState;
                this.config.dualEndState = dualEndState;
                this.dualStateSnapshot = {
                    start: {
                        raw: dualStartState,
                        display: start?.format(format) ?? null,
                    },
                    end: {
                        raw: dualEndState,
                        display: end?.format(format) ?? null,
                    },
                };
            }

            setTimeout(() => {
                this.isSyncing = false;
            }, 0);
            this.updateInputValue();

            return true;
        },

        serializeDualDate(date, boundary) {
            const display = date.format(this.config.displayFormat);
            const snapshot = this.dualStateSnapshot[boundary];

            if (snapshot.raw !== null && snapshot.display === display) {
                return snapshot.raw;
            }

            try {
                if (!this.formatHasTimeTokens(this.config.storageFormat)) {
                    const serialized = date.format(this.config.storageFormat);
                    const parsed = dayjs(serialized, this.config.storageFormat, true);

                    return parsed.isValid() && parsed.format(this.config.storageFormat) === serialized
                        ? serialized
                        : null;
                }

                const parsed = dayjs.tz(
                    display,
                    this.config.displayFormat,
                    this.config.timezone
                );

                if (!parsed.isValid() || parsed.format(this.config.displayFormat) !== display) {
                    return null;
                }

                const normalizedDisplay = this
                    .toWallClockDate(parsed, this.config.timezone)
                    .format(this.config.displayFormat);

                if (normalizedDisplay !== display) {
                    return null;
                }

                return this
                    .toWallClockDate(parsed, this.config.storageTimezone)
                    .format(this.config.storageFormat);
            } catch {
                return null;
            }
        },

        applyTime(date, time) {
            let hour = parseInt(time.hour);

            if (!this.config.timePicker24) {
                if (time.ampm === 'PM' && hour < 12) hour += 12;
                else if (time.ampm === 'AM' && hour === 12) hour = 0;
            }

            const minute = parseInt(time.minute);
            const second = this.config.timePickerSecond ? parseInt(time.second) : 0;

            if (
                date.hour() === hour &&
                date.minute() === minute &&
                date.second() === second
            ) {
                return date;
            }

            return date
                .hour(hour)
                .minute(minute)
                .second(second);
        },

        // ─────────────────────────────────────────────────────────────
        // UI Actions
        // ─────────────────────────────────────────────────────────────

        /**
         * Debounced sync for performance optimization.
         * Prevents rapid Livewire updates during quick interactions.
         */
        debouncedSyncState() {
            clearTimeout(this._syncDebounceTimer);
            this._syncDebounceTimer = setTimeout(() => {
                this.syncState();
            }, 150);
        },

        /**
         * Handle time picker changes from UI selects.
         * Updates the display and syncs state when complete range is selected.
         */
        handleTimeChange(isStart = true) {
            this.selectedPresetLabel = null;

            // Update input preview
            this.updateInputValue();

            // If both dates are selected, update selection with new time values
            // This mimics the legacy behavior where time changes immediately reflect
            if (this.selection.start && this.selection.end) {
                if (isStart) {
                    this.selection.start = this.applyTime(
                        this.selection.start.startOf('day'),
                        this.startTime
                    );
                } else {
                    this.selection.end = this.applyTime(
                        this.selection.end.startOf('day'),
                        this.endTime
                    );
                }
            }
        },


        toggle() {
            this.open ? this.close() : this.openPicker();
        },

        async openPicker() {
            // readOnly(): the value shows and still submits, but cannot change.
            if (this.config.readOnly) return;

            // Focus handed back to a field that opens on focus.
            if (this._focusingInput) return;

            this._returnFocusOnClose = false;
            // alwaysShowCalendar(false): a range no preset matches was made
            // on the calendars, so open on them, as the original picker did.
            this.customRangeShown = !!this.selection.start && !this.hasActivePreset();
            this.open = true;
            await this.$nextTick();
            this.setupPositioning();
            this.focusedDate = this.selection.start || this.today();
            this.showSelectionInUnlinkedCalendars();

            if (this.isMonthPicker) {
                this.viewDate = this.constrainMonthPickerViewDate(this.viewDate);
            }

            if (this.isYearPicker) {
                this.viewDate = this.constrainYearPickerViewDate(this.viewDate);
            }

            // Dispatch show event for Livewire/external listeners
            this.$el?.dispatchEvent(new CustomEvent('show.daterangepicker', {
                bubbles: true,
                detail: { startDate: this.selection.start, endDate: this.selection.end }
            }));
        },

        close() {
            const wasOpen = this.open;
            this.open = false;
            this.tempEndDate = null;
            this.hoverDate = null;

            if (this.cleanupAutoUpdate) {
                this.cleanupAutoUpdate();
                this.cleanupAutoUpdate = null;
            }

            if (this._returnFocusOnClose) {
                this._returnFocusOnClose = false;
                if (wasOpen) this.focusInputWithoutOpening();
            }

            // Dispatch hide event for Livewire/external listeners
            if (wasOpen) {
                this.$el?.dispatchEvent(new CustomEvent('hide.daterangepicker', {
                    bubbles: true,
                    detail: { startDate: this.selection.start, endDate: this.selection.end }
                }));
            }
        },

        applySelection() {
            if (!this.canApplySelection) return;
            if (!this.syncState()) return;

            // Dispatch apply event for Livewire/external listeners
            this.$el?.dispatchEvent(new CustomEvent('apply.daterangepicker', {
                bubbles: true,
                detail: {
                    startDate: this.selection.start,
                    endDate: this.selection.end,
                    formattedValue: this.getDisplayValue()
                }
            }));

            this.close();
        },

        cancel() {
            this.parseConfiguredState(); // Reset to original
            this.updateInputValue();

            // Dispatch cancel event for Livewire/external listeners
            this.$el?.dispatchEvent(new CustomEvent('cancel.daterangepicker', {
                bubbles: true,
                detail: { startDate: this.selection.start, endDate: this.selection.end }
            }));

            this.close();
        },

        clear() {
            this.selection = { start: null, end: null };
            this.selectedPresetLabel = null;
            this.syncState();
            this.close();
        },

        /**
         * A preset's [start, end] as Day.js dates.
         *
         * A date-only preset ("2026-08-18", which is how the PHP side sends
         * every Carbon preset) carries no time of day: it means the whole
         * day, so under timePicker it is 00:00 → 23:59:59 rather than ending
         * at midnight. Selecting, highlighting and useRangeLabels all go
         * through here so they agree on that.
         */
        presetBounds(range) {
            let start = dayjs(range[0]);
            let end = dayjs(range[1]);

            if (this.config.timePicker) {
                const isDateOnly = (value) => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value.trim());

                if (isDateOnly(range[0])) start = start.startOf('day');
                if (isDateOnly(range[1])) end = end.endOf('day');
            }

            return [start, end];
        },

        /**
         * A preset's bounds limited to minDate / maxDate and maxSpan, or null
         * when the preset has no day in the allowed range.
         *
         * The bounds are compared the way the calendar disables its cells
         * (isDisabled, isMonthDisabled, isYearDisabled): per day in the day
         * picker, per month / year in the month and year pickers, against the
         * minDate / maxDate wall-clock strings in the display timezone. A
         * partially overlapping preset is clamped to the first / last
         * allowed cell, so "Last 7 days" with minDate two days ago selects
         * those three days instead of being thrown away. Selecting,
         * highlighting and useRangeLabels all go through here so a clamped
         * preset still reads as active.
         */
        constrainedPresetBounds(range) {
            let [start, end] = this.presetBounds(range);

            if (!start.isValid() || !end.isValid()) return [start, end];

            const unit = this.isMonthPicker ? 'month' : (this.isYearPicker ? 'year' : 'day');
            const min = this.config.minDate ? dayjs(this.config.minDate) : null;
            const max = this.config.maxDate ? dayjs(this.config.maxDate) : null;
            const hasMin = min?.isValid() ?? false;
            const hasMax = max?.isValid() ?? false;

            if (hasMin && end.isBefore(min, unit)) return null;
            if (hasMax && start.isAfter(max, unit)) return null;

            if (hasMin && start.isBefore(min, unit)) {
                start = min.startOf(unit);
            }

            if (hasMax && end.isAfter(max, unit)) {
                // Date-only presets end at midnight of their last day; keep
                // that shape unless the time picker shows the time.
                end = this.config.timePicker
                    ? max.endOf(unit)
                    : max.endOf(unit).startOf('day');
            }

            // maxSpan only limits the day picker (isDisabled), so only clamp
            // there: keep the start, end on the last day a click would allow.
            const spanEnd = this.isDayPicker ? this.calculateMaxSpanEnd(start) : null;
            if (spanEnd && end.isAfter(spanEnd, 'day')) {
                end = this.config.timePicker
                    ? spanEnd.endOf('day')
                    : spanEnd.startOf('day');
            }

            return [start, end];
        },

        /**
         * True when a preset lies wholly outside minDate / maxDate, so its
         * button is disabled and selecting it does nothing.
         */
        isPresetDisabled(label) {
            const range = this.config.ranges?.[label];
            if (!range || range.length !== 2) return false;

            return this.constrainedPresetBounds(range) === null;
        },

        selectPreset(label) {
            const range = this.config.ranges[label];
            if (range && range.length === 2) {
                const bounds = this.constrainedPresetBounds(range);
                if (!bounds) return;

                [this.selection.start, this.selection.end] = bounds;
                this.selectedPresetLabel = label;
                // alwaysShowCalendar(false): back to the presets view.
                this.customRangeShown = false;
                this.viewDate = this.selection.start;
                this.showSelectionInUnlinkedCalendars();

                if (this.config.timePicker) {
                    this.startTime = this.extractTime(this.selection.start);
                    this.endTime = this.extractTime(this.selection.end);
                }

                // Presets-only: the click is the whole choice, there is
                // no Apply button to wait for.
                if (this.config.autoApply || this.presetsOnly) {
                    this.applySelection();
                } else {
                    this.updateInputValue();
                }
            }
        },

        /**
         * Get the comparison unit for preset matching.
         * When timePicker is enabled, we need finer granularity
         * to distinguish presets that share the same day but
         * have different times (e.g. "Last 6h" vs "Last 12h").
         */
        getPresetComparisonUnit() {
            if (!this.config.timePicker) return 'day';
            return this.config.timePickerSecond ? 'second' : 'minute';
        },

        /**
         * Check if two date ranges match at the appropriate granularity.
         * @param {dayjs} selStart - Selection start
         * @param {dayjs} selEnd - Selection end
         * @param {dayjs} preStart - Preset start
         * @param {dayjs} preEnd - Preset end
         * @returns {boolean}
         */
        matchesPresetRange(selStart, selEnd, preStart, preEnd) {
            const unit = this.getPresetComparisonUnit();
            return selStart.isSame(preStart, unit) && selEnd.isSame(preEnd, unit);
        },

        /**
         * Check if a preset range matches the current selection.
         * Used for highlighting active presets in the sidebar.
         * @param {string} label - The preset label
         * @returns {boolean} True if the range matches current selection
         */
        isActiveRange(label) {
            if (!this.selection.start || !this.selection.end) {
                return false;
            }

            const range = this.config.ranges[label];
            if (!range || range.length !== 2) {
                return false;
            }

            if (this.hasPresetConstraints()) {
                return this.activePresetLabel() === label;
            }

            return this.presetMatchesSelection(label);
        },

        /**
         * True when minDate, maxDate or maxSpan is set, so presets can be
         * clamped and two of them can land on the same range. Without any,
         * presets match exactly as they always have.
         */
        hasPresetConstraints() {
            const isValid = (value) => !!value && dayjs(value).isValid();

            return isValid(this.config.minDate) || isValid(this.config.maxDate)
                || (this.isDayPicker && !!this.config.maxSpan);
        },

        /**
         * True when the preset's bounds equal the current selection: its
         * clamped bounds by default, its own (unclamped) bounds with
         * `exact`.
         */
        presetMatchesSelection(label, exact = false) {
            if (!this.selection.start || !this.selection.end) return false;

            const range = this.config.ranges?.[label];
            if (!range || range.length !== 2) return false;

            const bounds = exact ? this.presetBounds(range) : this.constrainedPresetBounds(range);
            if (!bounds || !bounds[0].isValid() || !bounds[1].isValid()) return false;

            return this.matchesPresetRange(
                this.selection.start,
                this.selection.end,
                ...bounds
            );
        },

        /**
         * The one preset that reads as active for the current selection, or
         * null. In order: the preset the user clicked, while its clamped
         * bounds still equal the selection; a preset whose own bounds equal
         * the selection exactly; the first preset that clamps to it.
         */
        activePresetLabel() {
            if (!this.selection.start || !this.selection.end) return null;

            const labels = Object.keys(this.config.ranges || {});

            if (this.selectedPresetLabel !== null
                && labels.includes(this.selectedPresetLabel)
                && this.presetMatchesSelection(this.selectedPresetLabel)) {
                return this.selectedPresetLabel;
            }

            return labels.find((label) => this.presetMatchesSelection(label, true))
                ?? labels.find((label) => this.presetMatchesSelection(label))
                ?? null;
        },

        /**
         * Forget the clicked preset once the selection no longer equals its
         * bounds, e.g. after the server or the user's typing set another
         * range. The same range echoed back keeps it.
         */
        forgetStalePresetLabel() {
            if (this.selectedPresetLabel !== null
                && !this.presetMatchesSelection(this.selectedPresetLabel)) {
                this.selectedPresetLabel = null;
            }
        },

        // ─────────────────────────────────────────────────────────────
        // Navigation
        // ─────────────────────────────────────────────────────────────

        /**
         * Whether the two day calendars move together (linkedCalendars(),
         * the default). A single calendar has nothing to unlink, and the
         * month and year pickers always page as one view.
         */
        get calendarsLinked() {
            return this.config.linkedCalendars !== false || this.config.singleCalendar;
        },

        /**
         * The month a day calendar shows: 0 is the left one, 1 the right one.
         * Linked, the right month is always the one after the left. Unlinked,
         * it is rightViewDate, but never at or before the left month.
         */
        calendarMonth(offset = 0) {
            const linkedMonth = this.viewDate.add(offset, 'month');

            if (this.calendarsLinked || offset === 0) return linkedMonth;

            const right = this.rightViewDate;

            return right && right.isAfter(this.viewDate, 'month')
                ? right.add(offset - 1, 'month')
                : linkedMonth;
        },

        /**
         * Move one unlinked calendar to `month`. The other side stays where
         * it is unless it would end up at or past this one: then it is pushed
         * along so the right month always stays after the left month.
         */
        showUnlinkedCalendarMonth(offset, month) {
            if (parseInt(offset) === 1) {
                this.rightViewDate = month;
                if (!month.isAfter(this.viewDate, 'month')) {
                    this.viewDate = month.subtract(1, 'month');
                }
                return;
            }

            // Pin the right month before moving the left one, or it would
            // follow the left calendar back through the "month after" default.
            this.rightViewDate = this.calendarMonth(1);
            this.viewDate = month;
            if (!this.rightViewDate.isAfter(month, 'month')) {
                this.rightViewDate = month.add(1, 'month');
            }
        },

        /**
         * Unlinked, show the selected range's start on the left and its end
         * on the right (as the original daterangepicker does), unless both
         * are already in view. Linked calendars keep their current behaviour.
         */
        showSelectionInUnlinkedCalendars() {
            if (this.calendarsLinked || !this.isDayPicker) return;

            const { start, end } = this.selection;
            if (!start) return;

            const isVisible = (date) => date.isSame(this.viewDate, 'month')
                || date.isSame(this.calendarMonth(1), 'month');

            if (isVisible(start) && (!end || isVisible(end))) return;

            this.viewDate = start;
            this.rightViewDate = end && end.isAfter(start, 'month') ? end : null;
        },

        /**
         * The [left, right] months the day calendars would show after
         * moving calendar `offset` to `month`, without moving anything.
         * Mirrors prevMonth / nextMonth / showUnlinkedCalendarMonth.
         */
        dayViewAfterMove(offset, month) {
            const last = this.config.singleCalendar ? 0 : 1;

            if (this.calendarsLinked) {
                const left = month.subtract(parseInt(offset), 'month');

                return [left, left.add(last, 'month')];
            }

            if (parseInt(offset) === 1) {
                return [month.isAfter(this.viewDate, 'month') ? this.viewDate : month.subtract(1, 'month'), month];
            }

            const right = this.calendarMonth(1);

            return [month, right.isAfter(month, 'month') ? right : month.add(1, 'month')];
        },

        /**
         * Whether a day calendar's arrow may move. The arrows stop where the
         * year dropdown stops (getMinConstraintYear / getMaxConstraintYear),
         * counting the calendar an unlinked move would push along.
         */
        canShowPreviousMonth(offset = 0) {
            const minYear = this.getMinConstraintYear();
            if (minYear === null) return true;

            const [left] = this.dayViewAfterMove(offset, this.calendarMonth(offset).subtract(1, 'month'));

            return left.year() >= minYear;
        },

        canShowNextMonth(offset = 0) {
            const maxYear = this.getMaxConstraintYear();
            if (maxYear === null) return true;

            const [, right] = this.dayViewAfterMove(offset, this.calendarMonth(offset).add(1, 'month'));

            return right.year() <= maxYear;
        },

        /**
         * Show `month` in day calendar `offset`, kept inside the year bounds:
         * linked, the pair shifts as one; unlinked, the other side is pushed
         * along as showUnlinkedCalendarMonth does.
         */
        showDayCalendarMonth(month, offset = 0) {
            let [left, right] = this.dayViewAfterMove(offset, month);
            const minYear = this.getMinConstraintYear();
            const maxYear = this.getMaxConstraintYear();

            if (this.calendarsLinked) {
                const last = right.diff(left, 'month');
                if (maxYear !== null && right.year() > maxYear) left = right.year(maxYear).month(11).subtract(last, 'month');
                if (minYear !== null && left.year() < minYear) left = left.year(minYear).month(0);

                this.viewDate = left;
                return;
            }

            const rightClamped = maxYear !== null && right.year() > maxYear;
            if (rightClamped) right = right.year(maxYear).month(11);
            if (minYear !== null && left.year() < minYear) left = left.year(minYear).month(0);
            if (!right.isAfter(left, 'month')) {
                if (rightClamped) left = right.subtract(1, 'month');
                else right = left.add(1, 'month');
            }

            this.viewDate = left;
            this.rightViewDate = right;
        },

        prevMonth(offset = 0) {
            if (!this.canShowPreviousMonth(offset)) return;

            if (this.calendarsLinked) {
                this.viewDate = this.viewDate.subtract(1, 'month');
                return;
            }

            this.showUnlinkedCalendarMonth(offset, this.calendarMonth(offset).subtract(1, 'month'));
        },

        nextMonth(offset = 0) {
            if (!this.canShowNextMonth(offset)) return;

            if (this.calendarsLinked) {
                this.viewDate = this.viewDate.add(1, 'month');
                return;
            }

            this.showUnlinkedCalendarMonth(offset, this.calendarMonth(offset).add(1, 'month'));
        },

        setMonth(month, offset = 0) {
            const monthIndex = parseInt(month);
            if (!Number.isFinite(monthIndex)) return;

            if (this.isDayPicker) {
                // Linked, the dropdowns drive the left month (as before).
                const side = this.calendarsLinked ? 0 : offset;
                this.showDayCalendarMonth(this.calendarMonth(side).month(monthIndex), side);
                return;
            }

            this.viewDate = this.viewDate.month(monthIndex);
        },

        setYear(year, offset = 0) {
            let constrainedYear = this.clampYearToConstraints(year);

            if (constrainedYear === null) return;

            if (this.isDayPicker) {
                const side = this.calendarsLinked ? 0 : offset;
                this.showDayCalendarMonth(this.calendarMonth(side).year(constrainedYear), side);
                return;
            }

            this.viewDate = this.viewDate.year(constrainedYear);

            if (this.isMonthPicker) {
                this.viewDate = this.constrainMonthPickerViewDate(this.viewDate);
            }
        },

        setMonthPickerYear(year, offset = 0) {
            const constrainedYear = this.clampYearToConstraints(year);

            if (constrainedYear === null) return;

            this.viewDate = this.viewDate.year(constrainedYear - parseInt(offset || 0));
            this.viewDate = this.constrainMonthPickerViewDate(this.viewDate);
        },

        getMonthPickerYearInputValue(offset = 0) {
            return this.generateMonthGrid(offset).year;
        },

        handleMonthPickerYearInput(event, offset = 0) {
            this.setMonthPickerYear(event.target.value, offset);

            this.$nextTick(() => {
                event.target.value = this.getMonthPickerYearInputValue(offset);
            });
        },

        // ─────────────────────────────────────────────────────────────
        // Positioning (Floating UI)
        // ─────────────────────────────────────────────────────────────

        setupPositioning() {
            const reference = this.$refs.trigger;
            // When teleported to body, x-ref doesn't work. Find by ID instead.
            const floating = this.config.teleport
                ? document.getElementById(`fi-daterangepicker-dropdown-${this.instanceId}`)
                : this.$refs.dropdown;

            if (!reference || !floating) {
                console.warn('[DateRangePicker] Could not find reference or floating element for positioning');
                return;
            }

            // Determine placement based on opens/drops config
            let placement = 'bottom';
            if (this.config.drops === 'up') placement = 'top';
            else if (this.config.drops === 'auto') placement = 'bottom'; // flip middleware handles auto

            if (this.config.opens === 'left') placement += '-end';
            else if (this.config.opens === 'right') placement += '-start';
            else if (this.config.opens === 'center') placement += '';

            const [side, alignment] = placement.split('-');
            const flippedPlacement = (side === 'top' ? 'bottom' : 'top') + (alignment ? `-${alignment}` : '');

            const updatePos = async () => {
                // Ensure reference and floating elements are still connected to DOM
                if (!reference.isConnected || !floating.isConnected) {
                    return;
                }

                // Ensure reference is visible (has an offsetParent)
                if (reference.offsetParent === null) {
                    return;
                }

                const { x, y } = await computePosition(reference, floating, {
                    placement,
                    strategy: this.config.teleport ? 'fixed' : 'absolute',
                    middleware: [
                        offset(8),
                        // Flip the side only. opens() is the alignment
                        // (-start / -end, which Floating UI mirrors in
                        // RTL); a bare 'top' first in this list centred
                        // the dropdown on every flip.
                        flip({ fallbackPlacements: [flippedPlacement] }),
                        // crossAxis: on a phone the dropdown (up to 85vh) fits
                        // neither above nor below the field, and flip() then
                        // left it hanging off the top of the screen with the
                        // presets out of reach. Clamp it into the viewport.
                        shift({ padding: 8, crossAxis: true })
                    ]
                });

                Object.assign(floating.style, {
                    position: this.config.teleport ? 'fixed' : 'absolute',
                    left: `${x}px`,
                    top: `${y}px`,
                    zIndex: '9999',
                });
            };

            this.cleanupAutoUpdate = autoUpdate(reference, floating, updatePos, {
                animationFrame: true,
            });
        },

        // ─────────────────────────────────────────────────────────────
        // Keyboard Navigation
        // ─────────────────────────────────────────────────────────────

        handleKeydown(event) {
            // If focused on the input, allow native navigation/typing for specific keys
            if (this.$refs.input && event.target === this.$refs.input) {
                if (event.key === 'Enter' && this.allowManualInput) {
                    event.preventDefault();
                    this.commitManualInput();
                    return;
                }

                // Arrow Key Navigation: Jump between date blocks with padding
                if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                    const input = this.$refs.input;
                    const mask = this.inputMask;
                    if (!mask) return;

                    let value = input.value;
                    let cursor = input.selectionStart;
                    const len = value.length;

                    const isBlockChar = (c) => /[0-9dmyhs]/i.test(c);

                    // Helper: Find block boundaries
                    const findBlockBounds = (pos) => {
                        let start = pos;
                        let end = pos;
                        // Scan backwards
                        while (start > 0 && isBlockChar(value[start - 1])) start--;
                        // Scan forwards
                        while (end < len && isBlockChar(value[end])) end++;
                        return { start, end };
                    };

                    // Helper: Pad single digit block
                    const padBlock = () => {
                        const { start, end } = findBlockBounds(cursor);
                        const blockContent = value.slice(start, end);
                        const match = blockContent.match(/^(\d)([dmyhs]+)$/i);
                        if (match) {
                            const paddedBlock = '0' + match[1] + match[2].slice(1);
                            const newValue = value.slice(0, start) + paddedBlock + value.slice(end);
                            mask.value = newValue;
                            value = input.value;
                            return start + 2; // New cursor after padded digits
                        }
                        return null;
                    };

                    if (event.key === 'ArrowRight') {
                        // Check if we're at the end of a block (next char is separator or we're at block boundary)
                        const { end } = findBlockBounds(cursor);
                        const atBlockEnd = cursor >= end - 1 || !isBlockChar(value[cursor + 1] || '');

                        if (atBlockEnd) {
                            event.preventDefault();

                            // Pad if needed
                            const newCursor = padBlock();
                            if (newCursor !== null) cursor = newCursor;

                            // Refresh value after padding
                            value = input.value;

                            // Jump to next block
                            let i = cursor;
                            while (i < len && isBlockChar(value[i])) i++; // Skip rest of current block
                            while (i < len && !isBlockChar(value[i])) i++; // Skip separators

                            input.setSelectionRange(i, i);
                            return;
                        }
                        // Otherwise, let native arrow key behavior work
                        return;
                    }

                    if (event.key === 'ArrowLeft') {
                        // Check if we're at the start of a block
                        const { start } = findBlockBounds(cursor);
                        const atBlockStart = cursor <= start || !isBlockChar(value[cursor - 1] || '');

                        if (atBlockStart) {
                            event.preventDefault();

                            // Jump to previous block
                            let i = cursor - 1;
                            while (i > 0 && !isBlockChar(value[i])) i--; // Skip separators backwards
                            while (i > 0 && isBlockChar(value[i - 1])) i--; // Find start of prev block

                            input.setSelectionRange(i, i);
                            return;
                        }
                        // Otherwise, let native arrow key behavior work
                        return;
                    }
                }

                // Presets view (presets-only, or the calendars hidden until
                // Custom): Up / Down step from the input into the list.
                // Home / End stay native here, for the caret.
                if (this.open && !this.calendarsShown
                    && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
                    if (this.focusPreset(event.key)) event.preventDefault();
                    return;
                }

                // ArrowDown steps from the input into the calendar. The
                // other arrows stay with the input (caret, mask blocks).
                if (this.open && !this.presetsOnly && event.key === 'ArrowDown') {
                    event.preventDefault();
                    // Right after opening, openPicker() may not have set
                    // the focused day yet (x-transition holds $nextTick).
                    if (this.isDayPicker && !this.focusedDate) {
                        this.focusedDate = this.selection.start || this.today();
                    }
                    if (!this.focusGridCell()) queueMicrotask(() => this.focusGridCell());
                    return;
                }

                // Allow other navigation keys
                const nativeKeys = ['ArrowUp', 'ArrowDown', 'Home', 'End'];
                if (nativeKeys.includes(event.key)) {
                    return;
                }
            }

            // Keys inside the dropdown belong to handleGridKeydown /
            // handlePresetKeydown and the focused control (a button, a time
            // <select>). A teleported dropdown never bubbles here; with
            // teleport(false) it does. Escape still falls through to cancel.
            // This runs before the closed-picker check below: an Enter /
            // Space that picks a day with autoApply has already applied and
            // closed in the grid's capture listener, and reaching that check
            // would open the picker again.
            if (event.key !== 'Escape' && this.isInsideDropdown(event.target)) return;

            if (!this.open) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    this.openPicker();
                }
                return;
            }

            // Presets view (presets-only, or the calendars hidden until
            // Custom): no calendar to drive. Escape still cancels; Enter /
            // Space stay native so they press the focused preset. Keys
            // inside the dropdown belong to handlePresetKeydown.
            if (!this.calendarsShown && event.key !== 'Escape') {
                if (!this.isInsideDropdown(event.target)
                    && ['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)
                    && this.focusPreset(event.key)) {
                    event.preventDefault();
                }
                return;
            }

            switch (event.key) {
                case 'Escape':
                    event.preventDefault();
                    event.stopPropagation();
                    this.cancel();
                    break;

                case 'Enter':
                case ' ':
                    if (!this.isDayPicker) {
                        return;
                    }

                    event.preventDefault();
                    if (this.focusedDate) {
                        const isDisabled = this.isDisabled(this.focusedDate);
                        if (!isDisabled) {
                            this.handleDayClick({ date: this.focusedDate, disabled: false });
                        }
                    }
                    break;

                case 'ArrowLeft':
                    event.preventDefault();
                    this.focusedDate = (this.focusedDate || dayjs()).subtract(1, 'day');
                    this.ensureFocusedDateVisible();
                    break;

                case 'ArrowRight':
                    event.preventDefault();
                    this.focusedDate = (this.focusedDate || dayjs()).add(1, 'day');
                    this.ensureFocusedDateVisible();
                    break;

                case 'ArrowUp':
                    event.preventDefault();
                    this.focusedDate = (this.focusedDate || dayjs()).subtract(1, 'week');
                    this.ensureFocusedDateVisible();
                    break;

                case 'ArrowDown':
                    event.preventDefault();
                    this.focusedDate = (this.focusedDate || dayjs()).add(1, 'week');
                    this.ensureFocusedDateVisible();
                    break;

                case 'Home':
                    event.preventDefault();
                    this.focusedDate = (this.focusedDate || dayjs()).startOf('month');
                    break;

                case 'End':
                    event.preventDefault();
                    this.focusedDate = (this.focusedDate || dayjs()).endOf('month');
                    break;

                case 'PageUp':
                    event.preventDefault();
                    if (event.shiftKey) {
                        this.focusedDate = (this.focusedDate || dayjs()).subtract(1, 'year');
                    } else {
                        this.focusedDate = (this.focusedDate || dayjs()).subtract(1, 'month');
                    }
                    this.ensureFocusedDateVisible();
                    break;

                case 'PageDown':
                    event.preventDefault();
                    if (event.shiftKey) {
                        this.focusedDate = (this.focusedDate || dayjs()).add(1, 'year');
                    } else {
                        this.focusedDate = (this.focusedDate || dayjs()).add(1, 'month');
                    }
                    this.ensureFocusedDateVisible();
                    break;
            }
        },

        getDropdownElement() {
            return document.getElementById(`fi-daterangepicker-dropdown-${this.instanceId}`)
                ?? this.$refs.dropdown
                ?? null;
        },

        isInsideDropdown(target) {
            const dropdown = this.getDropdownElement();

            return !!dropdown && target instanceof Node && dropdown.contains(target);
        },

        /**
         * Presets-only keys from inside the dropdown: Up / Down / Home / End
         * move focus along the presets (the list is vertical, so RTL needs
         * no swap). Enter and Space stay the native button press; they, and
         * Escape, hand focus back to the input once the picker closes. Tab
         * cancels and hands focus back first, so it moves on from the field.
         */
        handlePresetKeydown(event) {
            if (!this.open || this.calendarsShown || !this.isInsideDropdown(event.target)) return;

            switch (event.key) {
                case 'ArrowDown':
                case 'ArrowUp':
                case 'Home':
                case 'End':
                    if (this.focusPreset(event.key)) event.preventDefault();
                    break;
            }

            // The rest is presets-only, where a preset click applies and
            // closes. With the calendars hidden until Custom (alwaysShow-
            // Calendar(false)) a preset waits for Apply, so Enter / Space /
            // Tab stay native and Escape is the dropdown's own cancel.
            if (!this.presetsOnly) return;

            switch (event.key) {
                case 'Enter':
                case ' ':
                case 'Escape':
                    this._returnFocusOnClose = true;
                    break;

                // Tab leaves the list, as from a listbox. The dropdown is the
                // last thing in <body>, so a native Tab off it would land on
                // nothing and leave the picker open. Cancel and put focus back
                // in the input; the browser's Tab then carries on from there.
                // In place (teleport(false)) the dropdown follows the input,
                // so that Tab would land back on the closing list: there the
                // native Tab walks on and focus leaving the picker closes it.
                case 'Tab':
                    if (!this.config.teleport) break;
                    this._returnFocusOnClose = true;
                    this.cancel();
                    break;
            }
        },

        /**
         * Calendar keys from inside the dropdown (not presets-only).
         *
         * Escape, Enter and Space mark the close they may cause as the
         * keyboard's, so close() hands focus back to the input instead of
         * leaving it on a hidden button. On a day cell: ← / → one day
         * (mirrored in RTL), ↑ / ↓ one week, Home / End the start / end of
         * the week, PageUp / PageDown one month (Shift: one year), skipping
         * disabled days; Enter / Space select the focused day. Month and
         * year cells: the arrows and Home / End move along the grid.
         */
        handleGridKeydown(event) {
            if (!this.open || this.presetsOnly || !this.isInsideDropdown(event.target)) return;

            if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
                this._returnFocusOnClose = true;
            }

            const target = event.target instanceof Element ? event.target : null;
            if (target?.closest('.fi-daterangepicker-day')) {
                if (this.isDayPicker) this.handleDayCellKeydown(event);
            } else if (target?.closest('.fi-daterangepicker-month-cell, .fi-daterangepicker-year-cell')) {
                this.handlePeriodCellKeydown(event, target.closest('.fi-daterangepicker-month-cell, .fi-daterangepicker-year-cell'));
            }
        },

        handleDayCellKeydown(event) {
            const from = this.focusedDate || this.selection.start || this.today();
            const rtl = this.isRtl(event.target);
            // [first candidate, step while it is disabled, max steps]
            let move;

            switch (event.key) {
                case 'ArrowLeft':
                case 'ArrowRight': {
                    const step = (event.key === 'ArrowRight') !== rtl ? 1 : -1;
                    move = [from.add(step, 'day'), [step, 'day'], 366];
                    break;
                }
                case 'ArrowUp':
                case 'ArrowDown': {
                    const step = event.key === 'ArrowDown' ? 1 : -1;
                    move = [from.add(step, 'week'), [step, 'week'], 53];
                    break;
                }
                case 'Home': {
                    const start = from.subtract((from.day() - this.config.firstDay + 7) % 7, 'day');
                    move = [start, [1, 'day'], 6];
                    break;
                }
                case 'End': {
                    const end = from.subtract((from.day() - this.config.firstDay + 7) % 7, 'day').add(6, 'day');
                    move = [end, [-1, 'day'], 6];
                    break;
                }
                case 'PageUp':
                case 'PageDown': {
                    const step = event.key === 'PageDown' ? 1 : -1;
                    move = [from.add(step, event.shiftKey ? 'year' : 'month'), [step, 'day'], 366];
                    break;
                }
                case 'Enter':
                case ' ':
                    event.preventDefault();
                    if (!this.isDisabled(from)) {
                        this.handleDayClick({ date: from, disabled: false });
                    }
                    return;
                default:
                    return;
            }

            event.preventDefault();

            let [date, [amount, unit], limit] = move;
            while (limit > 0 && this.isDisabled(date)) {
                date = date.add(amount, unit);
                limit--;
            }
            if (this.isDisabled(date)) return;

            this.focusedDate = date;
            this.ensureFocusedDateVisible();
            this.$nextTick(() => this.focusGridCell());
        },

        handlePeriodCellKeydown(event, cell) {
            const cells = [...cell.parentElement.querySelectorAll(':scope > button')];
            const columns = getComputedStyle(cell.parentElement).gridTemplateColumns?.split(' ').filter(Boolean).length || 3;
            const rtl = this.isRtl(cell);
            const index = cells.indexOf(cell);
            let step;
            let next;

            switch (event.key) {
                case 'ArrowLeft': step = rtl ? 1 : -1; break;
                case 'ArrowRight': step = rtl ? -1 : 1; break;
                case 'ArrowUp': step = -columns; break;
                case 'ArrowDown': step = columns; break;
                case 'Home': next = cells.findIndex((c) => !c.disabled); break;
                case 'End': next = cells.length - 1 - [...cells].reverse().findIndex((c) => !c.disabled); break;
                default: return;
            }

            event.preventDefault();

            if (step !== undefined) {
                next = index + step;
                while (cells[next]?.disabled) next += step;
            }

            cells[next]?.focus();
        },

        /**
         * Focus the calendar's focused day (the in-month copy when linked
         * calendars show it twice), or in the month / year pickers the
         * selected or first enabled cell. False when there is none.
         */
        focusGridCell() {
            const dropdown = this.getDropdownElement();
            if (!dropdown) return false;

            let cell;
            if (this.isDayPicker) {
                const days = [...dropdown.querySelectorAll('.fi-daterangepicker-day.fi-focused')];
                cell = days.find((day) => !day.classList.contains('fi-off-month')) ?? days[0];
            } else {
                const cells = [...dropdown.querySelectorAll('.fi-daterangepicker-month-cell, .fi-daterangepicker-year-cell')]
                    .filter((c) => !c.disabled);
                cell = cells.find((c) => c.classList.contains('fi-selected')) ?? cells[0];
            }

            if (!cell) return false;
            cell.focus();

            return true;
        },

        isRtl(element) {
            if (!(element instanceof Element)) return false;

            return getComputedStyle(element).direction === 'rtl'
                || element.closest('[dir]')?.getAttribute('dir') === 'rtl';
        },

        /**
         * Move focus to the next / previous / first / last enabled preset
         * button. From outside the list, Down starts at the applied preset
         * (else the first) and Up at the applied preset (else the last).
         * Stops at the ends. False when there is no enabled preset to focus.
         */
        focusPreset(key) {
            const dropdown = this.getDropdownElement();
            if (!dropdown) return false;

            const all = [...dropdown.querySelectorAll('.fi-daterangepicker-range-btn')];
            const enabled = all.filter((button) => !button.disabled);
            if (enabled.length === 0) return false;

            const current = enabled.indexOf(document.activeElement);
            let index;

            if (key === 'Home') {
                index = 0;
            } else if (key === 'End') {
                index = enabled.length - 1;
            } else if (current !== -1) {
                index = key === 'ArrowDown'
                    ? Math.min(current + 1, enabled.length - 1)
                    : Math.max(current - 1, 0);
            } else {
                // The buttons are rendered in config.ranges order.
                const labels = Object.keys(this.config.ranges || {});
                const active = labels.length === all.length
                    ? enabled.findIndex((button) => this.isActiveRange(labels[all.indexOf(button)]))
                    : -1;

                index = active !== -1
                    ? active
                    : (key === 'ArrowDown' ? 0 : enabled.length - 1);
            }

            enabled[index].focus();

            return true;
        },

        /**
         * Put focus back in the input after the keyboard closed the picker
         * from inside the dropdown, without the input's focus handler
         * opening it again.
         */
        focusInputWithoutOpening() {
            const input = this.$refs.input;
            if (!input) return;

            this._focusingInput = true;
            try {
                input.focus();
            } finally {
                this._focusingInput = false;
            }
        },

        ensureFocusedDateVisible() {
            if (!this.focusedDate) return;

            if (!this.calendarsLinked && this.isDayPicker) {
                // Unlinked: scroll only the side the focus walked off. The
                // month and year pickers page as one view either way.
                const right = this.calendarMonth(1);
                if (this.focusedDate.isBefore(this.viewDate, 'month')) {
                    this.showUnlinkedCalendarMonth(0, this.focusedDate.startOf('month'));
                } else if (this.focusedDate.isAfter(right, 'month')) {
                    this.showUnlinkedCalendarMonth(1, this.focusedDate.startOf('month'));
                }
                return;
            }

            // If focused date is outside current view, update viewDate
            if (!this.focusedDate.isSame(this.viewDate, 'month')) {
                this.viewDate = this.focusedDate.startOf('month');
            }
        },

        isFocused(date) {
            return this.focusedDate?.isSame(date, 'day') ?? false;
        },

        // ─────────────────────────────────────────────────────────────
        // Display Helpers
        // ─────────────────────────────────────────────────────────────

        getDisplayValue() {
            // Check for preset label match
            if (this.config.useRangeLabels && this.selection.start && this.selection.end && this.hasPresetConstraints()) {
                const label = this.activePresetLabel();
                if (label !== null) return label;
            } else if (this.config.useRangeLabels && this.selection.start && this.selection.end) {
                for (const [label, range] of Object.entries(this.config.ranges || {})) {
                    if (range.length === 2) {
                        const bounds = this.constrainedPresetBounds(range);
                        if (bounds && this.matchesPresetRange(
                            this.selection.start,
                            this.selection.end,
                            ...bounds
                        )) {
                            return label;
                        }
                    }
                }
            }

            // Return formatted date string
            if (this.selection.start && this.selection.end) {
                const format = this.config.displayFormat;

                // Apply time values if timePicker is enabled
                let start = this.selection.start;
                let end = this.selection.end;

                if (this.config.timePicker) {
                    start = this.applyTime(start, this.startTime);
                    end = this.applyTime(end, this.endTime);
                }

                if (this.config.singleCalendar) {
                    return start.format(format);
                }
                return `${start.format(format)}${this.config.separator}${end.format(format)}`;
            }

            return '';
        },

        formatSelectionPreview(date, time) {
            if (!date) return '';

            const value = this.config.timePicker
                ? this.applyTime(date, time)
                : date;

            return value.format(this.config.displayFormat);
        },

        get weekDays() {
            const days = [];
            const labels = this.config.labels.daysOfWeek;
            for (let i = 0; i < 7; i++) {
                const dayIndex = (this.config.firstDay + i) % 7;
                days.push(labels[dayIndex]);
            }
            return days;
        },

        get months() {
            return this.config.labels.monthNames.map((label, index) => ({
                value: index,
                label,
            }));
        },

        get years() {
            return this.getYearOptions();
        },

        get monthPickerYears() {
            return this.getYearOptions();
        },

        get hasRanges() {
            return !this.config.disableRange && Object.keys(this.config.ranges).length > 0;
        },

        /**
         * disableCustomRange(): only presets can set the range. The view
         * hides the calendars, time picker and Cancel / Apply, a preset
         * click applies and closes, and the keyboard and typed input cannot
         * pick another range. With no presets to show the option is ignored
         * rather than opening an empty dropdown.
         */
        get presetsOnly() {
            return !!this.config.disableCustomRange && this.hasRanges;
        },

        /**
         * Whether the calendars (and the time picker) show. Always, unless
         * presets-only, or alwaysShowCalendar(false) with presets to offer:
         * then only once the user chooses "Custom" in the list, as with the
         * original daterangepicker's alwaysShowCalendars: false.
         */
        get calendarsShown() {
            if (this.presetsOnly) return false;

            return this.config.alwaysShowCalendars
                || !this.hasRanges
                || this.customRangeShown;
        },

        /**
         * The "Custom" entry at the end of the preset list. Only with the
         * calendars hidden until it is chosen; disableCustomRange() has none.
         */
        get showsCustomRangeEntry() {
            return !this.config.alwaysShowCalendars
                && this.hasRanges
                && !this.presetsOnly;
        },

        /** "Custom" reads as active while the calendars show and no preset matches. */
        get isCustomRangeActive() {
            return this.showsCustomRangeEntry
                && this.customRangeShown
                && !this.hasActivePreset();
        },

        /** Choose "Custom": show the calendars. */
        showCustomRange() {
            if (!this.showsCustomRangeEntry) return;

            this.customRangeShown = true;
        },

        hasActivePreset() {
            return this.hasRanges
                && Object.keys(this.config.ranges).some((label) => this.isActiveRange(label));
        },

        /**
         * The enabled preset whose (clamped) bounds equal [start, end], or
         * null. Lets a typed value through in presets-only mode only when it
         * is one of the presets.
         */
        presetLabelForRange(start, end) {
            return Object.keys(this.config.ranges || {}).find((label) => {
                const range = this.config.ranges[label];
                const bounds = range?.length === 2 ? this.constrainedPresetBounds(range) : null;

                return !!bounds
                    && bounds[0].isValid()
                    && bounds[1].isValid()
                    && this.matchesPresetRange(start, end, ...bounds);
            }) ?? null;
        },

        get calendarCount() {
            return this.config.singleCalendar ? 1 : 2;
        },

        get dualStateStatus() {
            if (this.selection.start && this.selection.end) return 'complete';
            if (this.selection.start || this.selection.end) return 'incomplete';

            return 'empty';
        },

        get canApplySelection() {
            return !this.config.dualState || this.dualStateStatus === 'complete';
        },

        // Time picker helpers
        get hourOptions() {
            if (this.config.timePicker24) {
                return Array.from({ length: 24 }, (_, i) => ({
                    value: i,
                    label: String(i).padStart(2, '0'),
                }));
            }
            return Array.from({ length: 12 }, (_, i) => ({
                value: i + 1,
                label: String(i + 1).padStart(2, '0'),
            }));
        },

        get minuteOptions() {
            const increment = this.config.timePickerIncrement || 1;
            const values = Array.from({ length: Math.floor(60 / increment) }, (_, i) => i * increment);

            // Keep the minutes actually selected (the default end is 23:59, and
            // presets or typed values can land off the increment) so the
            // select shows the real value instead of silently showing :00.
            for (const time of [this.startTime, this.endTime]) {
                const minute = parseInt(time?.minute);
                if (Number.isInteger(minute) && minute >= 0 && minute < 60 && !values.includes(minute)) {
                    values.push(minute);
                }
            }

            return values
                .sort((a, b) => a - b)
                .map((value) => ({ value, label: String(value).padStart(2, '0') }));
        },

        get secondOptions() {
            return Array.from({ length: 60 }, (_, i) => ({
                value: i,
                label: String(i).padStart(2, '0'),
            }));
        },

        // ─────────────────────────────────────────────────────────────
        // Utility
        // ─────────────────────────────────────────────────────────────

        isOpen() {
            return this.open;
        },

        formatDate(date, format) {
            return date ? dayjs(date).format(format || this.config.displayFormat) : '';
        },
    };
}
