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
        viewDate: dayjs(),
        selection: { start: null, end: null },
        tempEndDate: null,
        focusedDate: null,
        hoverDate: null,
        isSyncing: false,

        // Debounce timer for Livewire sync (performance optimization)
        _syncDebounceTimer: null,

        // Input masking
        inputMask: null,
        inputValue: '',
        allowManualInput: config.allowInput ?? false,

        // Time state
        startTime: { hour: 0, minute: 0, second: 0, ampm: 'AM' },
        endTime: { hour: 23, minute: 59, second: 59, ampm: 'PM' },

        // Configuration
        config: {
            state: config.state,
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

        // ─────────────────────────────────────────────────────────────
        // Initialization
        // ─────────────────────────────────────────────────────────────

        init() {
            // Setup input masking immediately for visual feedback
            if (this.allowManualInput) {
                this.setupInputMask();
            }

            // Set Day.js locale (all locales are statically imported)
            this.setLocale(this.config.locale);

            // Parse initial state
            this.parseState(this.config.state);

            // Update input value
            this.updateInputValue();

            // Watch for external state changes (Livewire updates)
            this.$watch('config.state', (value) => {
                if (this.isSyncing) return;
                this.parseState(value);
                this.updateInputValue();
            });

            // Add document-level keydown handler for Escape (SPA-safe)
            this._documentKeyHandler = (e) => {
                if (e.key === 'Escape' && this.open) {
                    e.stopPropagation();
                    this.cancel();
                }
            };
            document.addEventListener('keydown', this._documentKeyHandler);
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
            if (this._documentKeyHandler) {
                document.removeEventListener('keydown', this._documentKeyHandler);
                this._documentKeyHandler = null;
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

            // Force update placeholder
            input.placeholder = rangePlaceholder;
            input.setAttribute('placeholder', rangePlaceholder);

            // Ensure it sticks (in case of race conditions)
            setTimeout(() => {
                input.placeholder = rangePlaceholder;
                input.setAttribute('placeholder', rangePlaceholder);
            }, 50);

            // Get display format and separator
            const format = this.config.displayFormat; // e.g., "DD/MM/YYYY"
            const separator = this.config.separator; // e.g., " - "

            // Create date mask options
            const dateMaskOptions = {
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
                },
                format: (date) => dayjs(date).format(format),
                parse: (str) => dayjs(str, format).toDate(),
            };

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

            this.inputMask.on('accept', () => {
                this.handleManualInput(this.inputMask.value);
            });
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

        handleManualInput(value) {
            if (!value) {
                this.selection = { start: null, end: null };
                this.syncState();
                return;
            }

            const format = this.config.displayFormat;
            const separator = this.config.separator;

            if (this.config.singleCalendar) {
                const date = dayjs(value, format, true);
                if (date.isValid() && !this.isDisabled(date)) {
                    this.selection.start = date;
                    this.selection.end = date;
                    this.syncState();
                }
            } else {

                const parts = value.split(separator);

                // Parse Start Date
                const startString = parts[0]?.trim();
                if (startString) {
                    const start = dayjs(startString, format, true);
                    if (start.isValid() && !this.isDisabled(start)) {
                        this.viewDate = start;
                        this.selection.start = start;
                    } else {
                        this.selection.start = null;
                    }
                }

                // Parse End Date & Handle Full Range
                if (parts.length === 2) {
                    const start = dayjs(parts[0].trim(), format, true);
                    const end = dayjs(parts[1].trim(), format, true);

                    if (start.isValid() && end.isValid() &&
                        !this.isDisabled(start) && !this.isDisabled(end)) {

                        // Auto-correct if start > end
                        if (start.isAfter(end, 'day')) {
                            this.selection.start = end;
                            this.selection.end = start;
                            // Update view to the new start if needed
                            this.viewDate = end;
                        } else {
                            this.selection.start = start;
                            this.selection.end = end;
                        }
                        this.syncState();
                    } else {
                        // If partial/invalid end, clear selection end to match input state
                        this.selection.end = null;
                    }
                } else {
                    this.selection.end = null;
                }
            }
        },

        updateInputValue() {
            this.inputValue = this.getDisplayValue();
            if (this.inputMask && this.inputMask.value !== this.inputValue) {
                this.inputMask.value = this.inputValue;
            }
        },

        // ─────────────────────────────────────────────────────────────
        // Calendar Grid Generation
        // ─────────────────────────────────────────────────────────────

        generateGrid(monthOffset = 0) {
            const current = this.viewDate.add(monthOffset, 'month');
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
                isToday: date.isSame(dayjs(), 'day'),
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
                    isCurrentMonth: monthDate.isSame(dayjs(), 'month'),
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
            if (this.config.minDate) {
                const min = dayjs(this.config.minDate).startOf('month');
                if (monthDate.isBefore(min, 'month')) return true;
            }
            if (this.config.maxDate) {
                const max = dayjs(this.config.maxDate).endOf('month');
                if (monthDate.isAfter(max, 'month')) return true;
            }
            return false;
        },

        handleMonthClick(month) {
            if (month.disabled) return;

            const clickedDate = month.date;

            if (this.config.singleCalendar) {
                this.selection.start = clickedDate.startOf('month');
                this.selection.end = clickedDate.endOf('month');
                if (this.config.autoApply) {
                    this.applySelection();
                }
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
                    isCurrentYear: year === dayjs().year(),
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
            if (this.config.minYear && year < this.config.minYear) return true;
            if (this.config.maxYear && year > this.config.maxYear) return true;
            if (this.config.minDate) {
                const minYear = dayjs(this.config.minDate).year();
                if (year < minYear) return true;
            }
            if (this.config.maxDate) {
                const maxYear = dayjs(this.config.maxDate).year();
                if (year > maxYear) return true;
            }
            return false;
        },

        handleYearClick(yearItem) {
            if (yearItem.disabled) return;

            const clickedDate = yearItem.date;

            if (this.config.singleCalendar) {
                this.selection.start = clickedDate.startOf('year');
                this.selection.end = clickedDate.endOf('year');
                if (this.config.autoApply) {
                    this.applySelection();
                }
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

        // Navigation for month/year pickers
        prevYear() {
            this.viewDate = this.viewDate.subtract(1, 'year');
        },

        nextYear() {
            this.viewDate = this.viewDate.add(1, 'year');
        },

        prevDecade() {
            this.viewDate = this.viewDate.subtract(10, 'year');
        },

        nextDecade() {
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

        parseState(stateString) {
            if (!stateString) {
                this.selection = { start: null, end: null };
                return;
            }

            const format = this.config.displayFormat;
            const separator = this.config.separator;

            if (this.config.singleCalendar) {
                const date = dayjs(stateString.trim(), format, true);
                if (date.isValid()) {
                    this.selection.start = date;
                    this.selection.end = date;
                    this.viewDate = date;
                }
            } else {
                const parts = stateString.split(separator);
                if (parts.length === 2) {
                    const start = dayjs(parts[0].trim(), format, true);
                    const end = dayjs(parts[1].trim(), format, true);

                    if (start.isValid()) {
                        this.selection.start = start;
                        this.viewDate = start;
                    }
                    if (end.isValid()) {
                        this.selection.end = end;
                    }
                }
            }

            // Parse time if timePicker is enabled
            if (this.config.timePicker && this.selection.start && this.selection.end) {
                this.startTime = this.extractTime(this.selection.start);
                this.endTime = this.extractTime(this.selection.end);
            }
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
            const format = this.config.displayFormat;
            let value = '';

            if (this.selection.start && this.selection.end) {
                let start = this.selection.start;
                let end = this.selection.end;

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

            this.isSyncing = true;
            this.config.state = value;
            this.$nextTick(() => {
                this.isSyncing = false;
            });
            this.updateInputValue();
        },

        applyTime(date, time) {
            let hour = parseInt(time.hour);

            if (!this.config.timePicker24) {
                if (time.ampm === 'PM' && hour < 12) hour += 12;
                else if (time.ampm === 'AM' && hour === 12) hour = 0;
            }

            return date
                .hour(hour)
                .minute(parseInt(time.minute))
                .second(this.config.timePickerSecond ? parseInt(time.second) : 0);
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
            this.open = true;
            await this.$nextTick();
            this.setupPositioning();
            this.focusedDate = this.selection.start || dayjs();

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

            // Dispatch hide event for Livewire/external listeners
            if (wasOpen) {
                this.$el?.dispatchEvent(new CustomEvent('hide.daterangepicker', {
                    bubbles: true,
                    detail: { startDate: this.selection.start, endDate: this.selection.end }
                }));
            }
        },

        applySelection() {
            this.syncState();

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
            this.parseState(this.config.state); // Reset to original
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
            this.syncState();
            this.close();
        },

        selectPreset(label) {
            const range = this.config.ranges[label];
            if (range && range.length === 2) {
                this.selection.start = dayjs(range[0]);
                this.selection.end = dayjs(range[1]);
                this.viewDate = this.selection.start;

                if (this.config.autoApply) {
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
            return this.config.timePickerSeconds ? 'second' : 'minute';
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

            return this.matchesPresetRange(
                this.selection.start,
                this.selection.end,
                dayjs(range[0]),
                dayjs(range[1])
            );
        },

        // ─────────────────────────────────────────────────────────────
        // Navigation
        // ─────────────────────────────────────────────────────────────

        prevMonth() {
            this.viewDate = this.viewDate.subtract(1, 'month');
        },

        nextMonth() {
            this.viewDate = this.viewDate.add(1, 'month');
        },

        setMonth(month) {
            this.viewDate = this.viewDate.month(parseInt(month));
        },

        setYear(year) {
            this.viewDate = this.viewDate.year(parseInt(year));
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
                        flip({ fallbackPlacements: ['top', 'bottom', 'top-start', 'top-end', 'bottom-start', 'bottom-end'] }),
                        shift({ padding: 8 })
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

                // Allow other navigation keys
                const nativeKeys = ['ArrowUp', 'ArrowDown', 'Home', 'End'];
                if (nativeKeys.includes(event.key)) {
                    return;
                }
            }

            if (!this.open) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    this.openPicker();
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

        ensureFocusedDateVisible() {
            if (!this.focusedDate) return;

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
            if (this.config.useRangeLabels && this.selection.start && this.selection.end) {
                for (const [label, range] of Object.entries(this.config.ranges || {})) {
                    if (range.length === 2) {
                        if (this.matchesPresetRange(
                            this.selection.start,
                            this.selection.end,
                            dayjs(range[0]),
                            dayjs(range[1])
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
            const currentYear = dayjs().year();
            const minYear = this.config.minYear || currentYear - 100;
            const maxYear = this.config.maxYear || currentYear + 20;
            return Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);
        },

        get hasRanges() {
            return !this.config.disableRange && Object.keys(this.config.ranges).length > 0;
        },

        get calendarCount() {
            return this.config.singleCalendar ? 1 : 2;
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
            return Array.from({ length: Math.floor(60 / increment) }, (_, i) => ({
                value: i * increment,
                label: String(i * increment).padStart(2, '0'),
            }));
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
