import moment from 'moment';

export default class DateRangePicker {
    constructor(element, options = {}, cb = () => {}) {
        // this.options = options; // Store options for later use
        this.parentEl = options.parentEl
            ? (typeof options.parentEl === 'string'
                ? document.querySelector(options.parentEl)
                : options.parentEl)
            : document.body;

        this.element = (typeof element === 'string') ? document.querySelector(element) : element;
        this.startDate = moment().startOf('day');
        this.endDate = moment().endOf('day');
        this.minDate = null;
        this.maxDate = null;
        this.maxSpan = null;
        this.autoApply = false;
        this.singleDatePicker = false;
        this.showDropdowns = false;
        this.minYear = moment().subtract(100, 'year').format('YYYY');
        this.maxYear = moment().add(100, 'year').format('YYYY');
        this.showWeekNumbers = false;
        this.showISOWeekNumbers = false;
        this.showCustomRangeLabel = true;
        this.timePicker = false;
        this.timePicker24Hour = false;
        this.timePickerIncrement = 1;
        this.timePickerSeconds = false;
        this.linkedCalendars = true;
        this.autoUpdateInput = true;
        this.alwaysShowCalendars = false;
        this.ranges = {};

        // Internal options and state information
        this._outsideClickProxy = null;
        this._resizeProxy = null;
        this.previousRightTime = null;
        this.isShowing = false;
        this.leftCalendar = {};
        this.rightCalendar = {};

        this.opens = 'right';
        if (this.element.classList.contains('pull-right'))
            this.opens = 'left';

        this.drops = 'down';
        if (this.element.classList.contains('dropup'))
            this.drops = 'up';

        this.buttonClasses = 'btn btn-sm';
        this.applyButtonClasses = 'btn-primary';
        this.cancelButtonClasses = 'btn-default';

        this.locale = {
            direction: 'ltr',
            format: moment.localeData().longDateFormat('L'),
            separator: ' - ',
            applyLabel: 'Apply',
            cancelLabel: 'Cancel',
            weekLabel: 'W',
            customRangeLabel: 'Custom Range',
            daysOfWeek: moment.weekdaysMin(),
            monthNames: moment.monthsShort(),
            firstDay: moment.localeData().firstDayOfWeek()
        };

        if (typeof cb === 'function') {
            this.callback = cb;
        }

        // Apply all options and locale overrides (sets this.locale, etc.)
        this.applyOptions(options);

        // Create container (with custom template support)
        this.container = this._createContainer(options);
        this.parentEl.appendChild(this.container);

        this.renderRanges(options);

        // Add direction class after locale is set
        this.container.classList.add(this.locale.direction);

        // UI logic (class additions, show/hide, etc.)
        if (!this.timePicker) {
            this.startDate = this.startDate.startOf('day');
            this.endDate = this.endDate.endOf('day');
            this.container.querySelectorAll('.calendar-time').forEach(el => el.style.display = 'none');
        }

        if (this.timePicker && this.autoApply) {
            this.autoApply = false;
        }

        if (this.autoApply) {
            this.container.classList.add('auto-apply');
        }

        if (typeof options.ranges === 'object') {
            this.container.classList.add('show-ranges');
        }

        if (this.singleDatePicker) {
            this.container.classList.add('single');
            const leftCal = this.container.querySelector('.drp-calendar.left');
            const rightCal = this.container.querySelector('.drp-calendar.right');
            if (leftCal) leftCal.classList.add('single');
            if (leftCal) leftCal.style.display = '';
            if (rightCal) rightCal.style.display = 'none';
            if (!this.timePicker && this.autoApply) {
                this.container.classList.add('auto-apply');
            }
        }

        if ((typeof options.ranges === 'undefined' && !this.singleDatePicker) || this.alwaysShowCalendars) {
            this.container.classList.add('show-calendar');
        }

        this.container.classList.add('opens' + this.opens);

        // Apply CSS classes and labels to buttons
        const applyBtn = this.container.querySelector('.applyBtn');
        const cancelBtn = this.container.querySelector('.cancelBtn');
        if (applyBtn) {
            applyBtn.className += ' ' + this.buttonClasses + ' ' + this.applyButtonClasses;
            applyBtn.innerHTML = this.locale.applyLabel;
        }
        if (cancelBtn) {
            cancelBtn.className += ' ' + this.buttonClasses + ' ' + this.cancelButtonClasses;
            cancelBtn.innerHTML = this.locale.cancelLabel;
        }

        // If no start/end dates set, try to parse from input value
        if (
            typeof options.startDate === 'undefined' &&
            typeof options.endDate === 'undefined'
        ) {
            this.parseInputValueForDates();
        }

        // Attach events
        this._attachEvents();

        // Set initial value
        this.updateElement();
    }

    // --- Helper for custom template support ---
    _createContainer(options) {
        let template = options && options.template
            ? options.template
            : `
           <div class="daterangepicker">
               <div class="ranges"></div>
               <div class="drp-calendar left">
                   <div class="calendar-table"></div>
                   <div class="calendar-time"></div>
               </div>
               <div class="drp-calendar right">
                   <div class="calendar-table"></div>
                   <div class="calendar-time"></div>
               </div>
               <div class="drp-buttons">
                   <span class="drp-selected"></span>
                   <button class="cancelBtn" type="button"></button>
                   <button class="applyBtn" disabled="disabled" type="button"></button>
               </div>
           </div>
        `;

        let container;
        if (typeof template === 'string') {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = template.trim();
            container = tempDiv.firstElementChild && tempDiv.firstElementChild.classList.contains('daterangepicker')
                ? tempDiv.firstElementChild
                : tempDiv;
        } else if (template instanceof HTMLElement) {
            container = template;
        } else {
            throw new Error('Invalid template for DateRangePicker');
        }
        return container;
    }

    // --- Add this method to your class ---
    applyOptions(options) {
        // Locale
        if (typeof options.locale === 'object') {
            if (typeof options.locale.direction === 'string')
                this.locale.direction = options.locale.direction;
            if (typeof options.locale.format === 'string')
                this.locale.format = options.locale.format;
            if (typeof options.locale.separator === 'string')
                this.locale.separator = options.locale.separator;
            if (typeof options.locale.daysOfWeek === 'object')
                this.locale.daysOfWeek = options.locale.daysOfWeek.slice();
            if (typeof options.locale.monthNames === 'object')
                this.locale.monthNames = options.locale.monthNames.slice();
            if (typeof options.locale.firstDay === 'number')
                this.locale.firstDay = options.locale.firstDay;
            if (typeof options.locale.applyLabel === 'string')
                this.locale.applyLabel = options.locale.applyLabel;
            if (typeof options.locale.cancelLabel === 'string')
                this.locale.cancelLabel = options.locale.cancelLabel;
            if (typeof options.locale.weekLabel === 'string')
                this.locale.weekLabel = options.locale.weekLabel;
            if (typeof options.locale.customRangeLabel === 'string') {
                // Support unicode chars in the custom range name.
                const elem = document.createElement('textarea');
                elem.innerHTML = options.locale.customRangeLabel;
                this.locale.customRangeLabel = elem.value;
            }
        }

        // Add direction class to container (if already created)
        if (this.container) {
            this.container.classList.add(this.locale.direction);
        }

        // Dates
        if (typeof options.startDate === 'string')
            this.startDate = moment(options.startDate, this.locale.format);
        if (typeof options.endDate === 'string')
            this.endDate = moment(options.endDate, this.locale.format);
        if (typeof options.minDate === 'string')
            this.minDate = moment(options.minDate, this.locale.format);
        if (typeof options.maxDate === 'string')
            this.maxDate = moment(options.maxDate, this.locale.format);

        if (typeof options.startDate === 'object')
            this.startDate = moment(options.startDate);
        if (typeof options.endDate === 'object')
            this.endDate = moment(options.endDate);
        if (typeof options.minDate === 'object')
            this.minDate = moment(options.minDate);
        if (typeof options.maxDate === 'object')
            this.maxDate = moment(options.maxDate);

        // Sanity checks
        if (this.minDate && this.startDate.isBefore(this.minDate))
            this.startDate = this.minDate.clone();
        if (this.maxDate && this.endDate.isAfter(this.maxDate))
            this.endDate = this.maxDate.clone();

        // Other options
        if (typeof options.applyButtonClasses === 'string')
            this.applyButtonClasses = options.applyButtonClasses;
        if (typeof options.applyClass === 'string')
            this.applyButtonClasses = options.applyClass;
        if (typeof options.cancelButtonClasses === 'string')
            this.cancelButtonClasses = options.cancelButtonClasses;
        if (typeof options.cancelClass === 'string')
            this.cancelButtonClasses = options.cancelClass;
        if (typeof options.maxSpan === 'object')
            this.maxSpan = options.maxSpan;
        if (typeof options.dateLimit === 'object')
            this.maxSpan = options.dateLimit;
        if (typeof options.opens === 'string')
            this.opens = options.opens;
        if (typeof options.drops === 'string')
            this.drops = options.drops;
        if (typeof options.showWeekNumbers === 'boolean')
            this.showWeekNumbers = options.showWeekNumbers;
        if (typeof options.showISOWeekNumbers === 'boolean')
            this.showISOWeekNumbers = options.showISOWeekNumbers;
        if (typeof options.buttonClasses === 'string')
            this.buttonClasses = options.buttonClasses;
        if (typeof options.buttonClasses === 'object')
            this.buttonClasses = options.buttonClasses.join(' ');
        if (typeof options.showDropdowns === 'boolean')
            this.showDropdowns = options.showDropdowns;
        if (typeof options.minYear === 'number')
            this.minYear = options.minYear;
        if (typeof options.maxYear === 'number')
            this.maxYear = options.maxYear;
        if (typeof options.showCustomRangeLabel === 'boolean')
            this.showCustomRangeLabel = options.showCustomRangeLabel;
        if (typeof options.singleDatePicker === 'boolean') {
            this.singleDatePicker = options.singleDatePicker;
            if (this.singleDatePicker)
                this.endDate = this.startDate.clone();
        }
        if (typeof options.timePicker === 'boolean')
            this.timePicker = options.timePicker;
        if (typeof options.timePickerSeconds === 'boolean')
            this.timePickerSeconds = options.timePickerSeconds;
        if (typeof options.timePickerIncrement === 'number')
            this.timePickerIncrement = options.timePickerIncrement;
        if (typeof options.timePicker24Hour === 'boolean')
            this.timePicker24Hour = options.timePicker24Hour;
        if (typeof options.autoApply === 'boolean')
            this.autoApply = options.autoApply;
        if (typeof options.autoUpdateInput === 'boolean')
            this.autoUpdateInput = options.autoUpdateInput;
        if (typeof options.linkedCalendars === 'boolean')
            this.linkedCalendars = options.linkedCalendars;
        if (typeof options.isInvalidDate === 'function')
            this.isInvalidDate = options.isInvalidDate;
        if (typeof options.isCustomDate === 'function')
            this.isCustomDate = options.isCustomDate;
        if (typeof options.alwaysShowCalendars === 'boolean')
            this.alwaysShowCalendars = options.alwaysShowCalendars;

        // Update day names order to firstDay
        if (this.locale.firstDay !== 0) {
            let iterator = this.locale.firstDay;
            while (iterator > 0) {
                this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift());
                iterator--;
            }
        }

        this.parentEl = options.parentEl
            ? (typeof options.parentEl === 'string'
                ? document.querySelector(options.parentEl)
                : options.parentEl)
            : document.body;

        // Use the custom template if provided, otherwise use the default
        let template = options && options.template
            ? options.template
            : `
           <div class="daterangepicker">
               <div class="ranges"></div>
               <div class="drp-calendar left">
                   <div class="calendar-table"></div>
                   <div class="calendar-time"></div>
               </div>
               <div class="drp-calendar right">
                   <div class="calendar-table"></div>
                   <div class="calendar-time"></div>
               </div>
               <div class="drp-buttons">
                   <span class="drp-selected"></span>
                   <button class="cancelBtn" type="button"></button>
                   <button class="applyBtn" disabled="disabled" type="button"></button>
               </div>
           </div>
        `;

        // If the template is a string, convert it to a DOM element
        let container;
        if (typeof template === 'string') {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = template.trim();
            // If the template string starts with <div class="daterangepicker">, use that div
            // Otherwise, use the first child
            container = tempDiv.firstElementChild && tempDiv.firstElementChild.classList.contains('daterangepicker')
                ? tempDiv.firstElementChild
                : tempDiv;
        } else if (template instanceof HTMLElement) {
            // If the template is already a DOM element
            container = template;
        } else {
            throw new Error('Invalid template for DateRangePicker');
        }

        // Create container
        this.container = container;
        this.parentEl.appendChild(this.container);
    }

    renderRanges(options) {
        if (typeof options.ranges !== 'object' || !this.container) return;

        this.ranges = {}; // Reset

        let start, end;
        for (let range in options.ranges) {
            if (!options.ranges.hasOwnProperty(range)) continue;

            if (typeof options.ranges[range][0] === 'string')
                start = moment(options.ranges[range][0], this.locale.format);
            else
                start = moment(options.ranges[range][0]);

            if (typeof options.ranges[range][1] === 'string')
                end = moment(options.ranges[range][1], this.locale.format);
            else
                end = moment(options.ranges[range][1]);

            // If the start or end date exceed those allowed by the minDate or maxSpan
            if (this.minDate && start.isBefore(this.minDate))
                start = this.minDate.clone();

            let maxDate = this.maxDate;
            if (this.maxSpan && maxDate && start.clone().add(this.maxSpan).isAfter(maxDate))
                maxDate = start.clone().add(this.maxSpan);
            if (maxDate && end.isAfter(maxDate))
                end = maxDate.clone();

            // If the end of the range is before the minimum or the start of the range is after the maximum, skip
            if ((this.minDate && end.isBefore(this.minDate, this.timePicker ? 'minute' : 'day'))
                || (maxDate && start.isAfter(maxDate, this.timePicker ? 'minute' : 'day')))
                continue;

            // Support unicode chars in the range names
            const elem = document.createElement('textarea');
            elem.innerHTML = range;
            const rangeHtml = elem.value;

            this.ranges[rangeHtml] = [start, end];
        }

        // Build the list HTML
        let list = '<ul>';
        for (let range in this.ranges) {
            list += `<li data-range-key="${range}">${range}</li>`;
        }
        if (this.showCustomRangeLabel) {
            list += `<li data-range-key="${this.locale.customRangeLabel}">${this.locale.customRangeLabel}</li>`;
        }
        list += '</ul>';

        // Insert into the .ranges container
        const rangesDiv = this.container.querySelector('.ranges');
        if (rangesDiv) {
            rangesDiv.innerHTML = list;
        }
    }

    parseInputValueForDates() {
        if (
            this.element.tagName === 'INPUT' &&
            (this.element.type === 'text' || this.element.type === 'search')
        ) {
            const val = this.element.value;
            const split = val.split(this.locale.separator);

            let start = null, end = null;

            if (split.length === 2) {
                start = moment(split[0], this.locale.format);
                end = moment(split[1], this.locale.format);
            } else if (this.singleDatePicker && val !== "") {
                start = moment(val, this.locale.format);
                end = moment(val, this.locale.format);
            }
            if (start !== null && end !== null) {
                this.setStartDate(start);
                this.setEndDate(end);
            }
        }
    }

    _attachEvents() {
        // Store references for removal
        this._calendarClickHandler = (e) => {
            if (e.target.closest('.prev')) this.clickPrev(e);
            if (e.target.closest('.next')) this.clickNext(e);
        };
        this._calendarMousedownHandler = (e) => {
            if (e.target.matches('td.available')) this.clickDate(e);
        };
        this._calendarMouseenterHandler = (e) => {
            if (e.target.matches('td.available')) this.hoverDate(e);
        };
        this._calendarChangeHandler = (e) => {
            if (e.target.matches('select.yearselect') || e.target.matches('select.monthselect')) {
                this.monthOrYearChanged(e);
            }
            if (
                e.target.matches('select.hourselect') ||
                e.target.matches('select.minuteselect') ||
                e.target.matches('select.secondselect') ||
                e.target.matches('select.ampmselect')
            ) {
                this.timeChanged(e);
            }
        };

        this._rangesClickHandler = (e) => {
            if (e.target.matches('li')) this.clickRange(e);
        };

        this._buttonsClickHandler = (e) => {
            if (e.target.matches('button.applyBtn')) this.clickApply(e);
            if (e.target.matches('button.cancelBtn')) this.clickCancel(e);
        };

        this._inputClickHandler = (e) => this.show(e);
        this._inputFocusHandler = (e) => this.show(e);
        this._inputKeyupHandler = (e) => this.elementChanged(e);
        this._inputKeydownHandler = (e) => this.keydown(e);
        this._toggleHandler = (e) => this.toggle(e);

        // Calendar Events
        this._drpCalendars = Array.from(this.container.querySelectorAll('.drp-calendar'));
        this._drpCalendars.forEach(calendar => {
            calendar.addEventListener('click', this._calendarClickHandler);
            calendar.addEventListener('mousedown', this._calendarMousedownHandler);
            calendar.addEventListener('mouseenter', this._calendarMouseenterHandler, true);
            calendar.addEventListener('change', this._calendarChangeHandler);
        });

        // Ranges Events
        this._ranges = this.container.querySelector('.ranges');
        if (this._ranges) {
            this._ranges.addEventListener('click', this._rangesClickHandler);
        }

        // Buttons Events
        this._drpButtons = this.container.querySelector('.drp-buttons');
        if (this._drpButtons) {
            this._drpButtons.addEventListener('click', this._buttonsClickHandler);
        }

        // Input/Element Events
        if (
            this.element.tagName === 'INPUT' ||
            this.element.tagName === 'BUTTON'
        ) {
            this.element.addEventListener('click', this._inputClickHandler);
            this.element.addEventListener('focus', this._inputFocusHandler);
            this.element.addEventListener('keyup', this._inputKeyupHandler);
            this.element.addEventListener('keydown', this._inputKeydownHandler);
        } else {
            this.element.addEventListener('click', this._toggleHandler);
            this.element.addEventListener('keydown', this._toggleHandler);
        }
    }

    show() {
        if (this.isShowing) return;

        // Create a click proxy that is private to this instance of datepicker, for unbinding
        this._outsideClickProxy = (e) => this.outsideClick(e);
        this._resizeProxy = (e) => this.onResize(e);

        // Bind global datepicker mousedown for hiding and
        document.addEventListener('mousedown', this._outsideClickProxy);
        // also support mobile devices
        document.addEventListener('touchend', this._outsideClickProxy);
        // also explicitly play nice with Bootstrap dropdowns, which stopPropagation when clicking them
        document.addEventListener('click', function(event) {
            if (event.target.matches('[data-toggle=dropdown]')) {
                this._outsideClickProxy(event);
            }
        }.bind(this));
        // and also close when focus changes to outside the picker (eg. tabbing between controls)
        document.addEventListener('focusin', this._outsideClickProxy);

        // Reposition the picker if the window is resized while it's open
        window.addEventListener('resize', this._resizeProxy);

        this.oldStartDate = this.startDate.clone();
        this.oldEndDate = this.endDate.clone();
        this.previousRightTime = this.endDate.clone();

        this.updateView();
        this.container.style.display = 'block';
        this.move();

        const event = new CustomEvent('show', {
            detail: this // pass the instance as event.detail
        });
        this.element.dispatchEvent(event);

        this.isShowing = true;
    }

    hide() {
        if (!this.isShowing) return;

        //incomplete date selection, revert to last values
        if (!this.endDate) {
            this.startDate = this.oldStartDate.clone();
            this.endDate = this.oldEndDate.clone();
        }

        //if a new date range was selected, invoke the user callback function
        if (!this.startDate.isSame(this.oldStartDate) || !this.endDate.isSame(this.oldEndDate))
            this.callback(this.startDate.clone(), this.endDate.clone(), this.chosenLabel);

        //if picker is attached to a text input, update it
        this.updateElement();

        document.removeEventListener('mousedown', this._outsideClickProxy); // TODO: check if this works correctly
        document.removeEventListener('touchend', this._outsideClickProxy); // TODO: check if this works correctly
        document.removeEventListener('focusin', this._outsideClickProxy); // TODO: check if this works correctly
        document.removeEventListener('click', this._outsideClickProxy); // TODO: check if this works correctly

        window.removeEventListener('resize', this._resizeProxy); // TODO: check if this works correctly

        this.container.style.display = 'none';
        const event = new CustomEvent('hide', {
            detail: this // pass the instance as event.detail
        });
        this.element.dispatchEvent(event);
        this.isShowing = false;
    }

    toggle(e) {
        if (this.isShowing) {
            this.hide();
        } else {
            this.show();
        }
    }

    updateElement() {
        if (this.element.tagName === 'INPUT' && this.autoUpdateInput) {
            let newValue = this.startDate.format(this.locale.format);
            if (!this.singleDatePicker) {
                newValue += this.locale.separator + this.endDate.format(this.locale.format);
            }
            if (newValue !== this.element.value) {
                this.element.value = newValue;
                this.element.dispatchEvent(new Event('change'));
            }
        }
    }

    clickApply() {
        this.hide();
        this.element.dispatchEvent(new CustomEvent('apply', { detail: this }));
    }

    clickCancel() {
        this.startDate = this.oldStartDate;
        this.endDate = this.oldEndDate;
        this.hide();
        this.element.dispatchEvent(new CustomEvent('cancel', { detail: this }));
    }

    onResize(e) {
        this.move();
    }

    outsideClick(e) {
        const target = e.target;

        const isWithin = (selectorOrElement) => {
            if (typeof selectorOrElement === 'string') {
                return target.closest(selectorOrElement) !== null;
            } else if (selectorOrElement instanceof Element) {
                return selectorOrElement.contains(target);
            }
            return false;
        };

        if (
            e.type === "focusin" ||
            isWithin(this.element) ||
            isWithin(this.container) ||
            isWithin('.calendar-table')
        ) return;

        this.hide();

        // Dispatch a custom event
        const event = new CustomEvent('outsideClick', { detail: this });
        this.element.dispatchEvent(event);
    }

    move() {
        // Helper functions to mimic jQuery's offset, outerWidth, outerHeight, and toggleClass
        function getOffset(el) {
            const rect = el.getBoundingClientRect();
            return {
                top: rect.top + window.scrollY,
                left: rect.left + window.scrollX
            };
        }

        function outerWidth(el) {
            const style = getComputedStyle(el);
            return el.offsetWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        }

        function outerHeight(el) {
            const style = getComputedStyle(el);
            return el.offsetHeight + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
        }
        function toggleClass(el, className, condition) {
            if (condition) {
                el.classList.add(className);
            } else {
                el.classList.remove(className);
            }
        }

        let parentOffset = { top: 0, left: 0 },
            containerTop,
            drops = this.drops;

        let parentRightEdge = window.innerWidth;
        if (this.parentEl.tagName.toLowerCase() !== 'body') {
            const parentRect = getOffset(this.parentEl);
            parentOffset = {
                top: parentRect.top - this.parentEl.scrollTop,
                left: parentRect.left - this.parentEl.scrollLeft
            };
            parentRightEdge = this.parentEl.clientWidth + parentRect.left;
        }

        switch (drops) {
            case 'auto':
                containerTop = getOffset(this.element).top + outerHeight(this.element) - parentOffset.top;
                if (containerTop + outerHeight(this.container) >= this.parentEl.scrollHeight) {
                    containerTop = getOffset(this.element).top - outerHeight(this.container) - parentOffset.top;
                    drops = 'up';
                }
                break;
            case 'up':
                containerTop = getOffset(this.element).top - outerHeight(this.container) - parentOffset.top;
                break;
            default:
                containerTop = getOffset(this.element).top + outerHeight(this.element) - parentOffset.top;
                break;
        }

        // Force the container to its actual width
        Object.assign(this.container.style, {
            top: '0',
            left: '0',
            right: 'auto'
        });
        let containerWidth = outerWidth(this.container);

        toggleClass(this.container, 'drop-up', drops === 'up');

        if (this.opens === 'left') {
            let containerRight = parentRightEdge - getOffset(this.element).left - outerWidth(this.element);
            if (containerWidth + containerRight > window.innerWidth) {
                Object.assign(this.container.style, {
                    top: containerTop + 'px',
                    right: 'auto',
                    left: '9px'
                });
            } else {
                Object.assign(this.container.style, {
                    top: containerTop + 'px',
                    right: containerRight + 'px',
                    left: 'auto'
                });
            }
        } else if (this.opens === 'center') {
            let containerLeft = getOffset(this.element).left - parentOffset.left +
                outerWidth(this.element) / 2 - containerWidth / 2;
            if (containerLeft < 0) {
                Object.assign(this.container.style, {
                    top: containerTop + 'px',
                    right: 'auto',
                    left: '9px'
                });
            } else if (containerLeft + containerWidth > window.innerWidth) {
                Object.assign(this.container.style, {
                    top: containerTop + 'px',
                    left: 'auto',
                    right: '0'
                });
            } else {
                Object.assign(this.container.style, {
                    top: containerTop + 'px',
                    left: containerLeft + 'px',
                    right: 'auto'
                });
            }
        } else {
            let containerLeft = getOffset(this.element).left - parentOffset.left;
            if (containerLeft + containerWidth > window.innerWidth) {
                Object.assign(this.container.style, {
                    top: containerTop + 'px',
                    left: 'auto',
                    right: '0'
                });
            } else {
                Object.assign(this.container.style, {
                    top: containerTop + 'px',
                    left: containerLeft + 'px',
                    right: 'auto'
                });
            }
        }
    }

    updateView() {
        if (this.timePicker) {
            this.renderTimePicker('left');
            this.renderTimePicker('right');
            const selects = this.container.querySelectorAll('.right .calendar-time select');
            if (!this.endDate) {
                selects.forEach(select => {
                    select.disabled = true;
                    select.classList.add('disabled');
                });
            } else {
                selects.forEach(select => {
                    select.disabled = false;
                    select.classList.remove('disabled');
                });
            }
        }

        if (this.endDate) {
            const selected = this.container.querySelector('.drp-selected');
            if (selected) {
                selected.innerHTML =
                    this.startDate.format(this.locale.format) +
                    this.locale.separator +
                    this.endDate.format(this.locale.format);
            }
        }

        this.updateMonthsInView();
        this.updateCalendars();
        this.updateFormInputs();
    }

    updateMonthsInView() {
        if (this.endDate) {

            //if both dates are visible already, do nothing
            if (!this.singleDatePicker && this.leftCalendar.month && this.rightCalendar.month &&
                (this.startDate.format('YYYY-MM') === this.leftCalendar.month.format('YYYY-MM') || this.startDate.format('YYYY-MM') === this.rightCalendar.month.format('YYYY-MM'))
                && (this.endDate.format('YYYY-MM') === this.leftCalendar.month.format('YYYY-MM') || this.endDate.format('YYYY-MM') === this.rightCalendar.month.format('YYYY-MM'))
            ) {
                return;
            }

            this.leftCalendar.month = this.startDate.clone().date(2);
            if (!this.linkedCalendars && (this.endDate.month() !== this.startDate.month() || this.endDate.year() !== this.startDate.year())) {
                this.rightCalendar.month = this.endDate.clone().date(2);
            } else {
                this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
            }

        } else if (this.leftCalendar.month.format('YYYY-MM') !== this.startDate.format('YYYY-MM') && this.rightCalendar.month.format('YYYY-MM') !== this.startDate.format('YYYY-MM')) {
            this.leftCalendar.month = this.startDate.clone().date(2);
            this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
        }

        if (this.maxDate && this.linkedCalendars && !this.singleDatePicker && this.rightCalendar.month > this.maxDate) {
            this.rightCalendar.month = this.maxDate.clone().date(2);
            this.leftCalendar.month = this.maxDate.clone().date(2).subtract(1, 'month');
        }
    }

    updateCalendars() {
        if (this.timePicker) {
            let hour, minute, second;
            if (this.endDate) {
                // LEFT calendar
                const leftHour = this.container.querySelector('.left .hourselect');
                const leftMinute = this.container.querySelector('.left .minuteselect');
                const leftSecond = this.container.querySelector('.left .secondselect');
                const leftAmpm = this.container.querySelector('.left .ampmselect');

                hour = leftHour ? parseInt(leftHour.value, 10) : 0;
                minute = leftMinute ? parseInt(leftMinute.value, 10) : 0;
                if (isNaN(minute) && leftMinute) {
                    // Get the last option's value
                    const lastMinuteOption = leftMinute.querySelector('option:last-child');
                    minute = lastMinuteOption ? parseInt(lastMinuteOption.value, 10) : 0;
                }
                second = this.timePickerSeconds && leftSecond ? parseInt(leftSecond.value, 10) : 0;
                if (!this.timePicker24Hour && leftAmpm) {
                    const ampm = leftAmpm.value;
                    if (ampm === 'PM' && hour < 12) hour += 12;
                    if (ampm === 'AM' && hour === 12) hour = 0;
                }
            } else {
                // RIGHT calendar
                const rightHour = this.container.querySelector('.right .hourselect');
                const rightMinute = this.container.querySelector('.right .minuteselect');
                const rightSecond = this.container.querySelector('.right .secondselect');
                const rightAmpm = this.container.querySelector('.right .ampmselect');

                hour = rightHour ? parseInt(rightHour.value, 10) : 0;
                minute = rightMinute ? parseInt(rightMinute.value, 10) : 0;
                if (isNaN(minute) && rightMinute) {
                    const lastMinuteOption = rightMinute.querySelector('option:last-child');
                    minute = lastMinuteOption ? parseInt(lastMinuteOption.value, 10) : 0;
                }
                second = this.timePickerSeconds && rightSecond ? parseInt(rightSecond.value, 10) : 0;
                if (!this.timePicker24Hour && rightAmpm) {
                    const ampm = rightAmpm.value;
                    if (ampm === 'PM' && hour < 12) hour += 12;
                    if (ampm === 'AM' && hour === 12) hour = 0;
                }
            }
            this.leftCalendar.month.hour(hour).minute(minute).second(second);
            this.rightCalendar.month.hour(hour).minute(minute).second(second);
        }

        this.renderCalendar('left');
        this.renderCalendar('right');

        // Remove 'active' class from all range <li>s
        const rangeLis = this.container.querySelectorAll('.ranges li');
        rangeLis.forEach(li => li.classList.remove('active'));

        if (this.endDate === null) return;

        this.calculateChosenLabel();
    }

    calculateChosenLabel() {
        let customRange = true;
        let i = 0;
        const rangeListItems = this.container.querySelectorAll('.ranges li');

        for (let range in this.ranges) {
            if (this.timePicker) {
                const format = this.timePickerSeconds ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD HH:mm";
                if (
                    this.startDate.format(format) === this.ranges[range][0].format(format) &&
                    this.endDate.format(format) === this.ranges[range][1].format(format)
                ) {
                    customRange = false;
                    // Remove 'active' from all, then add to the matched one
                    rangeListItems.forEach(li => li.classList.remove('active'));
                    const li = rangeListItems[i];
                    if (li) li.classList.add('active');
                    this.chosenLabel = li ? li.getAttribute('data-range-key') : null;
                    break;
                }
            } else if (
                this.startDate.format('YYYY-MM-DD') === this.ranges[range][0].format('YYYY-MM-DD') &&
                this.endDate.format('YYYY-MM-DD') === this.ranges[range][1].format('YYYY-MM-DD')
            ) {
                customRange = false;
                rangeListItems.forEach(li => li.classList.remove('active'));
                const li = rangeListItems[i];
                if (li) li.classList.add('active');
                this.chosenLabel = li ? li.getAttribute('data-range-key') : null;
                break;
            }
            i++;
        }

        if (! customRange) return;

        if (this.showCustomRangeLabel) {
            rangeListItems.forEach(li => li.classList.remove('active'));
            const li = rangeListItems[rangeListItems.length - 1];
            if (li) li.classList.add('active');
            this.chosenLabel = li ? li.getAttribute('data-range-key') : null;
        } else {
            this.chosenLabel = null;
        }

        this.showCalendars();
    }

    showCalendars() {
        this.container.classList.add('show-calendar');
        this.move();
        const event = new CustomEvent('showCalendar', { detail: this });
        this.element.dispatchEvent(event);
    }

    hideCalendars() {
        this.container.classList.remove('show-calendar');
        const event = new CustomEvent('hideCalendar', { detail: this });
        this.element.dispatchEvent(event);
    }

    clickRange(e) {
        const label = e.target.getAttribute('data-range-key');
        this.chosenLabel = label;

        if (label === this.locale.customRangeLabel) {
            this.showCalendars();
        } else {
            const dates = this.ranges[label];
            this.startDate = dates[0].clone ? dates[0].clone() : moment(dates[0]);
            this.endDate = dates[1].clone ? dates[1].clone() : moment(dates[1]);

            if (!this.timePicker) {
                this.startDate.startOf('day');
                this.endDate.endOf('day');
            }

            if (!this.alwaysShowCalendars) {
                this.hideCalendars();
            }
            this.clickApply();
        }
    }

    clickPrev(e) {
        // Find the closest parent with class 'drp-calendar'
        const cal = e.target.closest('.drp-calendar');
        if (cal && cal.classList.contains('left')) {
            this.leftCalendar.month.subtract(1, 'month');
            if (this.linkedCalendars) {
                this.rightCalendar.month.subtract(1, 'month');
            }
        } else {
            this.rightCalendar.month.subtract(1, 'month');
        }
        this.updateCalendars();
    }

    clickNext(e) {
        // Find the closest parent with class 'drp-calendar'
        const cal = e.target.closest('.drp-calendar');
        if (cal && cal.classList.contains('left')) {
            this.leftCalendar.month.add(1, 'month');
        } else {
            this.rightCalendar.month.add(1, 'month');
            if (this.linkedCalendars) {
                this.leftCalendar.month.add(1, 'month');
            }
        }
        this.updateCalendars();
    }

    hoverDate(e) {
        // Ignore dates that can't be selected
        if (!e.target.classList.contains('available')) return;

        const title = e.target.getAttribute('data-title');
        const row = title.substr(1, 1);
        const col = title.substr(3, 1);
        const cal = e.target.closest('.drp-calendar');
        const date = cal.classList.contains('left')
            ? this.leftCalendar.calendar[row][col]
            : this.rightCalendar.calendar[row][col];

        const leftCalendar = this.leftCalendar;
        const rightCalendar = this.rightCalendar;
        const startDate = this.startDate;

        if (!this.endDate) {
            // Get all date cells in both calendars
            const tds = this.container.querySelectorAll('.drp-calendar tbody td');
            tds.forEach(el => {
                // Skip week numbers
                if (el.classList.contains('week')) return;

                const title = el.getAttribute('data-title');
                const row = title.substr(1, 1);
                const col = title.substr(3, 1);
                const cal = el.closest('.drp-calendar');
                const dt = cal.classList.contains('left')
                    ? leftCalendar.calendar[row][col]
                    : rightCalendar.calendar[row][col];

                if (
                    (dt.isAfter(startDate) && dt.isBefore(date)) ||
                    dt.isSame(date, 'day')
                ) {
                    el.classList.add('in-range');
                } else {
                    el.classList.remove('in-range');
                }
            });
        }
    }

    clickDate(e) {
        if (!e.target.classList.contains('available')) return;

        const title = e.target.getAttribute('data-title');
        const row = title.substr(1, 1);
        const col = title.substr(3, 1);
        const cal = e.target.closest('.drp-calendar');
        let date = cal.classList.contains('left')
            ? this.leftCalendar.calendar[row][col]
            : this.rightCalendar.calendar[row][col];

        // Picking start
        if (this.endDate || date.isBefore(this.startDate, 'day')) {
            if (this.timePicker) {
                let hour = parseInt(
                    this.container.querySelector('.left .hourselect').value,
                    10
                );
                if (!this.timePicker24Hour) {
                    const ampm = this.container.querySelector('.left .ampmselect').value;
                    if (ampm === 'PM' && hour < 12) hour += 12;
                    if (ampm === 'AM' && hour === 12) hour = 0;
                }
                let minute = parseInt(
                    this.container.querySelector('.left .minuteselect').value,
                    10
                );
                if (isNaN(minute)) {
                    const lastMinuteOption = this.container.querySelector('.left .minuteselect option:last-child');
                    minute = lastMinuteOption ? parseInt(lastMinuteOption.value, 10) : 0;
                }
                let second = this.timePickerSeconds
                    ? parseInt(this.container.querySelector('.left .secondselect').value, 10)
                    : 0;
                date = date.clone().hour(hour).minute(minute).second(second);
            }
            this.endDate = null;
            this.setStartDate(date.clone());
        } else if (!this.endDate && date.isBefore(this.startDate)) {
            // Special case: clicking the same date for start/end,
            // but the time of the end date is before the start date
            this.setEndDate(this.startDate.clone());
        } else {
            // Picking end
            if (this.timePicker) {
                let hour = parseInt(
                    this.container.querySelector('.right .hourselect').value,
                    10
                );
                if (!this.timePicker24Hour) {
                    const ampm = this.container.querySelector('.right .ampmselect').value;
                    if (ampm === 'PM' && hour < 12) hour += 12;
                    if (ampm === 'AM' && hour === 12) hour = 0;
                }
                let minute = parseInt(
                    this.container.querySelector('.right .minuteselect').value,
                    10
                );
                if (isNaN(minute)) {
                    const lastMinuteOption = this.container.querySelector('.right .minuteselect option:last-child');
                    minute = lastMinuteOption ? parseInt(lastMinuteOption.value, 10) : 0;
                }
                let second = this.timePickerSeconds
                    ? parseInt(this.container.querySelector('.right .secondselect').value, 10)
                    : 0;
                date = date.clone().hour(hour).minute(minute).second(second);
            }
            this.setEndDate(date.clone());
            if (this.autoApply) {
                this.calculateChosenLabel();
                this.clickApply();
            }
        }

        if (this.singleDatePicker) {
            this.setEndDate(this.startDate);
            if (!this.timePicker && this.autoApply) this.clickApply();
        }

        this.updateView();

        // Cancel the blur event handler if the mouse was in one of the inputs
        e.stopPropagation();
    }

    elementChanged() {
        if (
            this.element.tagName !== 'INPUT' &&
            this.element.tagName !== 'TEXTAREA'
        ) return;
        if (!this.element.value.length) return;

        const dateString = this.element.value.split(this.locale.separator);
        let start = null, end = null;

        if (dateString.length === 2) {
            start = moment(dateString[0], this.locale.format);
            end = moment(dateString[1], this.locale.format);
        }

        if (this.singleDatePicker || start === null || end === null) {
            start = moment(this.element.value, this.locale.format);
            end = start;
        }

        if (!start.isValid() || !end.isValid()) return;

        this.setStartDate(start);
        this.setEndDate(end);
        this.updateView();
    }

    keydown(e) {
        // Hide on tab (9) or enter (13)
        if (e.keyCode === 9 || e.keyCode === 13) {
            this.hide();
        }

        // Hide on escape (27) and prevent propagation
        if (e.keyCode === 27) {
            e.preventDefault();
            e.stopPropagation();
            this.hide();
        }
    }

    monthOrYearChanged(e) {
        const drpCal = e.target.closest('.drp-calendar');
        const isLeft = drpCal.classList.contains('left');
        const leftOrRight = isLeft ? 'left' : 'right';
        const cal = this.container.querySelector(`.drp-calendar.${leftOrRight}`);

        // Month must be Number for new moment versions
        const month = parseInt(cal.querySelector('.monthselect').value, 10);
        let year = parseInt(cal.querySelector('.yearselect').value, 10);

        let newMonth = month;
        let newYear = year;

        if (!isLeft) {
            if (
                year < this.startDate.year() ||
                (year === this.startDate.year() && month < this.startDate.month())
            ) {
                newMonth = this.startDate.month();
                newYear = this.startDate.year();
            }
        }

        if (this.minDate) {
            if (
                year < this.minDate.year() ||
                (year === this.minDate.year() && month < this.minDate.month())
            ) {
                newMonth = this.minDate.month();
                newYear = this.minDate.year();
            }
        }

        if (this.maxDate) {
            if (
                year > this.maxDate.year() ||
                (year === this.maxDate.year() && month > this.maxDate.month())
            ) {
                newMonth = this.maxDate.month();
                newYear = this.maxDate.year();
            }
        }

        if (isLeft) {
            this.leftCalendar.month.month(newMonth).year(newYear);
            if (this.linkedCalendars) {
                this.rightCalendar.month = this.leftCalendar.month.clone().add(1, 'month');
            }
        } else {
            this.rightCalendar.month.month(newMonth).year(newYear);
            if (this.linkedCalendars) {
                this.leftCalendar.month = this.rightCalendar.month.clone().subtract(1, 'month');
            }
        }
        this.updateCalendars();
    }

    timeChanged(e) {
        const cal = e.target.closest('.drp-calendar');
        const isLeft = cal.classList.contains('left');

        let hour = parseInt(cal.querySelector('.hourselect').value, 10);
        let minute = parseInt(cal.querySelector('.minuteselect').value, 10);
        if (isNaN(minute)) {
            const lastMinuteOption = cal.querySelector('.minuteselect option:last-child');
            minute = lastMinuteOption ? parseInt(lastMinuteOption.value, 10) : 0;
        }
        let second = this.timePickerSeconds
            ? parseInt(cal.querySelector('.secondselect').value, 10)
            : 0;

        if (!this.timePicker24Hour) {
            const ampm = cal.querySelector('.ampmselect')?.value;
            if (ampm === 'PM' && hour < 12) hour += 12;
            if (ampm === 'AM' && hour === 12) hour = 0;
        }

        if (isLeft) {
            let start = this.startDate.clone();
            start.hour(hour);
            start.minute(minute);
            start.second(second);
            this.setStartDate(start);
            if (this.singleDatePicker) {
                this.endDate = this.startDate.clone();
            } else if (
                this.endDate &&
                this.endDate.format('YYYY-MM-DD') === start.format('YYYY-MM-DD') &&
                this.endDate.isBefore(start)
            ) {
                this.setEndDate(start.clone());
            }
        } else if (this.endDate) {
            let end = this.endDate.clone();
            end.hour(hour);
            end.minute(minute);
            end.second(second);
            this.setEndDate(end);
        }

        // Update the calendars so all clickable dates reflect the new time component
        this.updateCalendars();

        // Update the form inputs above the calendars with the new time
        this.updateFormInputs();

        // Re-render the time pickers because changing one selection can affect what's enabled in another
        this.renderTimePicker('left');
        this.renderTimePicker('right');
    }

    updateFormInputs() {
        const applyBtn = this.container.querySelector('button.applyBtn');
        if (!applyBtn) return;

        applyBtn.disabled = !(
            this.singleDatePicker ||
            (
                this.endDate &&
                (
                    this.startDate.isBefore(this.endDate) ||
                    this.startDate.isSame(this.endDate)
                )
            )
        );
    }

    isCustomDate(date) {
        return false; // TODO: Implement custom date verification logic
    }

    isInvalidDate(date) {
        return false;
    }

    setStartDate(startDate) {
        if (typeof startDate === 'string') {
            this.startDate = moment(startDate, this.locale.format);
        } else if (typeof startDate === 'object') {
            this.startDate = moment(startDate);
        }

        if (!this.timePicker) {
            this.startDate = this.startDate.startOf('day');
        }

        if (this.timePicker && this.timePickerIncrement) {
            this.startDate.minute(
                Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement
            );
        }

        if (this.minDate && this.startDate.isBefore(this.minDate)) {
            this.startDate = this.minDate.clone();
            if (this.timePicker && this.timePickerIncrement) {
                this.startDate.minute(
                    Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement
                );
            }
        }

        if (this.maxDate && this.startDate.isAfter(this.maxDate)) {
            this.startDate = this.maxDate.clone();
            if (this.timePicker && this.timePickerIncrement) {
                this.startDate.minute(
                    Math.floor(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement
                );
            }
        }

        if (!this.isShowing) {
            this.updateElement();
        }

        this.updateMonthsInView();
    }

    setEndDate(endDate) {
        if (typeof endDate === 'string') {
            this.endDate = moment(endDate, this.locale.format);
        } else if (typeof endDate === 'object') {
            this.endDate = moment(endDate);
        }

        if (!this.timePicker) {
            this.endDate = this.endDate.endOf('day');
        }

        if (this.timePicker && this.timePickerIncrement) {
            this.endDate.minute(
                Math.round(this.endDate.minute() / this.timePickerIncrement) * this.timePickerIncrement
            );
        }

        if (this.endDate.isBefore(this.startDate)) {
            this.endDate = this.startDate.clone();
        }

        if (this.maxDate && this.endDate.isAfter(this.maxDate)) {
            this.endDate = this.maxDate.clone();
        }

        if (this.maxSpan && this.startDate.clone().add(this.maxSpan).isBefore(this.endDate)) {
            this.endDate = this.startDate.clone().add(this.maxSpan);
        }

        this.previousRightTime = this.endDate.clone();

        // Update the selected range display
        const drpSelected = this.container.querySelector('.drp-selected');
        if (drpSelected) {
            drpSelected.innerHTML =
                this.startDate.format(this.locale.format) +
                this.locale.separator +
                this.endDate.format(this.locale.format);
        }

        if (!this.isShowing) {
            this.updateElement();
        }

        this.updateMonthsInView();
    }

    renderCalendar(side) {
        // 1. Get the calendar state object (left or right)
        const calendarState = side === 'left' ? this.leftCalendar : this.rightCalendar;
        const month = calendarState.month.month();
        const year = calendarState.month.year();
        const hour = calendarState.month.hour();
        const minute = calendarState.month.minute();
        const second = calendarState.month.second();
        const daysInMonth = moment([year, month]).daysInMonth();
        const firstDay = moment([year, month, 1]);
        const lastDay = moment([year, month, daysInMonth]);
        const lastMonth = moment(firstDay).subtract(1, 'month').month();
        const lastYear = moment(firstDay).subtract(1, 'month').year();
        const daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();
        const dayOfWeek = firstDay.day();

        // 2. Build the 6x7 matrix of dates
        const calendarMatrix = [];
        calendarMatrix.firstDay = firstDay;
        calendarMatrix.lastDay = lastDay;

        for (let i = 0; i < 6; i++) {
            calendarMatrix[i] = [];
        }

        let startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
        if (startDay > daysInLastMonth) startDay -= 7;
        if (dayOfWeek === this.locale.firstDay) startDay = daysInLastMonth - 6;

        let curDate = moment([lastYear, lastMonth, startDay, 12, minute, second]);

        for (let i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = moment(curDate).add(24, 'hour')) {
            if (i > 0 && col % 7 === 0) {
                col = 0;
                row++;
            }
            calendarMatrix[row][col] = curDate.clone().hour(hour).minute(minute).second(second);
            curDate.hour(12);

            if (
                this.minDate &&
                calendarMatrix[row][col].format('YYYY-MM-DD') === this.minDate.format('YYYY-MM-DD') &&
                calendarMatrix[row][col].isBefore(this.minDate) &&
                side === 'left'
            ) {
                calendarMatrix[row][col] = this.minDate.clone();
            }

            if (
                this.maxDate &&
                calendarMatrix[row][col].format('YYYY-MM-DD') === this.maxDate.format('YYYY-MM-DD') &&
                calendarMatrix[row][col].isAfter(this.maxDate) &&
                side === 'right'
            ) {
                calendarMatrix[row][col] = this.maxDate.clone();
            }
        }

        // 3. Store the matrix in the state object
        if (side === 'left') {
            this.leftCalendar.calendar = calendarMatrix;
        } else {
            this.rightCalendar.calendar = calendarMatrix;
        }

        // 4. Build the HTML string
        let minDate = side === 'left' ? this.minDate : this.startDate;
        let maxDate = this.maxDate;
        let selected = side === 'left' ? this.startDate : this.endDate;
        const arrow = this.locale.direction === 'ltr'
            ? { left: 'chevron-left', right: 'chevron-right' }
            : { left: 'chevron-right', right: 'chevron-left' };

        let html = '<table class="table-condensed">';
        html += '<thead>';
        html += '<tr>';

        // Week number cell
        if (this.showWeekNumbers || this.showISOWeekNumbers) html += '<th></th>';

        if ((!minDate || minDate.isBefore(calendarMatrix.firstDay)) && (!this.linkedCalendars || side === 'left')) {
            html += '<th class="prev available"><span></span></th>';
        } else {
            html += '<th></th>';
        }

        let dateHtml = this.locale.monthNames[calendarMatrix[1][1].month()] + calendarMatrix[1][1].format(" YYYY");

        if (this.showDropdowns) {
            const currentMonth = calendarMatrix[1][1].month();
            const currentYear = calendarMatrix[1][1].year();
            const maxYear = (maxDate && maxDate.year()) || this.maxYear;
            const minYear = (minDate && minDate.year()) || this.minYear;
            const inMinYear = currentYear === minYear;
            const inMaxYear = currentYear === maxYear;

            let monthHtml = '<select class="monthselect">';
            for (let m = 0; m < 12; m++) {
                if ((!inMinYear || (minDate && m >= minDate.month())) && (!inMaxYear || (maxDate && m <= maxDate.month()))) {
                    monthHtml += `<option value="${m}"${m === currentMonth ? " selected" : ""}>${this.locale.monthNames[m]}</option>`;
                } else {
                    monthHtml += `<option value="${m}"${m === currentMonth ? " selected" : ""} disabled>${this.locale.monthNames[m]}</option>`;
                }
            }
            monthHtml += "</select>";

            let yearHtml = '<select class="yearselect">';
            for (let y = minYear; y <= maxYear; y++) {
                yearHtml += `<option value="${y}"${y === currentYear ? " selected" : ""}>${y}</option>`;
            }
            yearHtml += '</select>';

            dateHtml = monthHtml + yearHtml;
        }

        html += `<th colspan="5" class="month">${dateHtml}</th>`;
        if ((!maxDate || maxDate.isAfter(calendarMatrix.lastDay)) && (!this.linkedCalendars || side === 'right' || this.singleDatePicker)) {
            html += '<th class="next available"><span></span></th>';
        } else {
            html += '<th></th>';
        }

        html += '</tr>';
        html += '<tr>';

        // Week label
        if (this.showWeekNumbers || this.showISOWeekNumbers) html += `<th class="week">${this.locale.weekLabel}</th>`;

        this.locale.daysOfWeek.forEach(dayOfWeek => {
            html += `<th>${dayOfWeek}</th>`;
        });

        html += '</tr>';
        html += '</thead>';
        html += '<tbody>';

        // Adjust maxDate for maxSpan
        if (this.endDate === null && this.maxSpan) {
            const maxLimit = this.startDate.clone().add(this.maxSpan).endOf('day');
            if (!maxDate || maxLimit.isBefore(maxDate)) {
                maxDate = maxLimit;
            }
        }

        for (let row = 0; row < 6; row++) {
            html += '<tr>';

            // Week number
            if (this.showWeekNumbers)
                html += `<td class="week">${calendarMatrix[row][0].week()}</td>`;
            else if (this.showISOWeekNumbers)
                html += `<td class="week">${calendarMatrix[row][0].isoWeek()}</td>`;

            for (let col = 0; col < 7; col++) {
                const cellDate = calendarMatrix[row][col];
                let classes = [];

                // Today's date
                if (cellDate.isSame(new Date(), "day"))
                    classes.push('today');

                // Weekends
                if (cellDate.isoWeekday() > 5)
                    classes.push('weekend');

                // Off-month
                if (cellDate.month() !== calendarMatrix[1][1].month())
                    classes.push('off', 'ends');

                // Before minDate
                if (this.minDate && cellDate.isBefore(this.minDate, 'day'))
                    classes.push('off', 'disabled');

                // After maxDate
                if (maxDate && cellDate.isAfter(maxDate, 'day'))
                    classes.push('off', 'disabled');

                // Custom invalid
                if (this.isInvalidDate(cellDate))
                    classes.push('off', 'disabled');

                // Start date
                if (cellDate.format('YYYY-MM-DD') === this.startDate.format('YYYY-MM-DD'))
                    classes.push('active', 'start-date');

                // End date
                if (this.endDate !== null && cellDate.format('YYYY-MM-DD') === this.endDate.format('YYYY-MM-DD'))
                    classes.push('active', 'end-date');

                // In range
                if (this.endDate !== null && cellDate > this.startDate && cellDate < this.endDate)
                    classes.push('in-range');

                // Custom classes
                const isCustom = this.isCustomDate(cellDate);
                if (isCustom !== false) {
                    if (typeof isCustom === 'string') classes.push(isCustom);
                    else classes.push(...isCustom);
                }

                let cname = '';
                let disabled = false;
                for (let i = 0; i < classes.length; i++) {
                    cname += classes[i] + ' ';
                    if (classes[i] === 'disabled') disabled = true;
                }
                if (!disabled) cname += 'available';

                html += `<td class="${cname.trim()}" data-title="r${row}c${col}">${cellDate.date()}</td>`;
            }
            html += '</tr>';
        }

        html += '</tbody>';
        html += '</table>';

        // 5. Inject the HTML into the calendar table
        const calendarTable = this.container.querySelector(`.drp-calendar.${side} .calendar-table`);
        if (calendarTable) {
            calendarTable.innerHTML = html;
        }
    }

    renderTimePicker(side) {
        // Don't bother updating the time picker if it's currently disabled
        // because an end date hasn't been clicked yet
        if (side === 'right' && !this.endDate) return;

        let html, selected, minDate, maxDate = this.maxDate;

        if (
            this.maxSpan &&
            (!this.maxDate || this.startDate.clone().add(this.maxSpan).isBefore(this.maxDate))
        ) {
            maxDate = this.startDate.clone().add(this.maxSpan);
        }

        if (side === 'left') {
            selected = this.startDate.clone();
            minDate = this.minDate;
        } else if (side === 'right') {
            selected = this.endDate.clone();
            minDate = this.startDate;

            // Preserve the time already selected
            const timeSelector = this.container.querySelector('.drp-calendar.right .calendar-time');
            if (timeSelector && timeSelector.innerHTML.trim() !== '') {
                const hourSelect = timeSelector.querySelector('.hourselect');
                const minuteSelect = timeSelector.querySelector('.minuteselect');
                const secondSelect = timeSelector.querySelector('.secondselect');
                const ampmSelect = timeSelector.querySelector('.ampmselect');

                if (hourSelect) {
                    const hourVal = parseInt(hourSelect.value, 10);
                    selected.hour(!isNaN(selected.hour()) ? selected.hour() : hourVal);
                }

                if (minuteSelect) {
                    const minuteVal = parseInt(minuteSelect.value, 10);
                    selected.minute(!isNaN(selected.minute()) ? selected.minute() : minuteVal);
                }

                if (secondSelect) {
                    const secondVal = parseInt(secondSelect.value, 10);
                    selected.second(!isNaN(selected.second()) ? selected.second() : secondVal);
                }

                if (!this.timePicker24Hour && ampmSelect) {
                    const ampm = ampmSelect.value;
                    if (ampm === 'PM' && selected.hour() < 12) selected.hour(selected.hour() + 12);
                    if (ampm === 'AM' && selected.hour() === 12) selected.hour(0);
                }
            }

            if (selected.isBefore(this.startDate)) selected = this.startDate.clone();
            if (maxDate && selected.isAfter(maxDate)) selected = maxDate.clone();
        }

        // Hours
        html = '<select class="hourselect">';
        let start = this.timePicker24Hour ? 0 : 1;
        let end = this.timePicker24Hour ? 23 : 12;

        for (let i = start; i <= end; i++) {
            let i_in_24 = i;
            if (!this.timePicker24Hour)
                i_in_24 = selected.hour() >= 12 ? (i === 12 ? 12 : i + 12) : (i === 12 ? 0 : i);

            let time = selected.clone().hour(i_in_24);
            let disabled = false;
            if (minDate && time.minute(59).isBefore(minDate)) disabled = true;
            if (maxDate && time.minute(0).isAfter(maxDate)) disabled = true;

            if (i_in_24 === selected.hour() && !disabled) {
                html += `<option value="${i}" selected="selected">${i}</option>`;
            } else if (disabled) {
                html += `<option value="${i}" disabled="disabled" class="disabled">${i}</option>`;
            } else {
                html += `<option value="${i}">${i}</option>`;
            }
        }
        html += '</select> ';

        // Minutes
        html += ': <select class="minuteselect">';
        for (let i = 0; i < 60; i += this.timePickerIncrement) {
            let padded = i < 10 ? '0' + i : i;
            let time = selected.clone().minute(i);

            let disabled = false;
            if (minDate && time.second(59).isBefore(minDate)) disabled = true;
            if (maxDate && time.second(0).isAfter(maxDate)) disabled = true;

            if (selected.minute() === i && !disabled) {
                html += `<option value="${i}" selected="selected">${padded}</option>`;
            } else if (disabled) {
                html += `<option value="${i}" disabled="disabled" class="disabled">${padded}</option>`;
            } else {
                html += `<option value="${i}">${padded}</option>`;
            }
        }
        html += '</select> ';

        // Seconds
        if (this.timePickerSeconds) {
            html += ': <select class="secondselect">';
            for (let i = 0; i < 60; i++) {
                let padded = i < 10 ? '0' + i : i;
                let time = selected.clone().second(i);

                let disabled = false;
                if (minDate && time.isBefore(minDate)) disabled = true;
                if (maxDate && time.isAfter(maxDate)) disabled = true;

                if (selected.second() === i && !disabled) {
                    html += `<option value="${i}" selected="selected">${padded}</option>`;
                } else if (disabled) {
                    html += `<option value="${i}" disabled="disabled" class="disabled">${padded}</option>`;
                } else {
                    html += `<option value="${i}">${padded}</option>`;
                }
            }
            html += '</select> ';
        }

        // AM/PM
        if (!this.timePicker24Hour) {
            html += '<select class="ampmselect">';
            let am_html = '';
            let pm_html = '';

            if (minDate && selected.clone().hour(12).minute(0).second(0).isBefore(minDate))
                am_html = ' disabled="disabled" class="disabled"';

            if (maxDate && selected.clone().hour(0).minute(0).second(0).isAfter(maxDate))
                pm_html = ' disabled="disabled" class="disabled"';

            if (selected.hour() >= 12) {
                html += `<option value="AM"${am_html}>AM</option><option value="PM" selected="selected"${pm_html}>PM</option>`;
            } else {
                html += `<option value="AM" selected="selected"${am_html}>AM</option><option value="PM"${pm_html}>PM</option>`;
            }
            html += '</select>';
        }

        // Set the HTML
        const calendarTime = this.container.querySelector(`.drp-calendar.${side} .calendar-time`);
        if (calendarTime) {
            calendarTime.innerHTML = html;
        }
    }

    _removeEventListenners() {
        // Calendar Events
        if (this._drpCalendars) {
            this._drpCalendars.forEach(calendar => {
                calendar.removeEventListener('click', this._calendarClickHandler);
                calendar.removeEventListener('mousedown', this._calendarMousedownHandler);
                calendar.removeEventListener('mouseenter', this._calendarMouseenterHandler, true);
                calendar.removeEventListener('change', this._calendarChangeHandler);
            });
        }

        // Ranges Events
        if (this._ranges) {
            this._ranges.removeEventListener('click', this._rangesClickHandler);
        }

        // Buttons Events
        if (this._drpButtons) {
            this._drpButtons.removeEventListener('click', this._buttonsClickHandler);
        }

        // Input/Element Events
        if (
            this.element.tagName === 'INPUT' ||
            this.element.tagName === 'BUTTON'
        ) {
            this.element.removeEventListener('click', this._inputClickHandler);
            this.element.removeEventListener('focus', this._inputFocusHandler);
            this.element.removeEventListener('keyup', this._inputKeyupHandler);
            this.element.removeEventListener('keydown', this._inputKeydownHandler);
        } else {
            this.element.removeEventListener('click', this._toggleHandler);
            this.element.removeEventListener('keydown', this._toggleHandler);
        }

        // Remove global event listeners
        if (this._outsideClickProxy) {
            document.removeEventListener('mousedown', this._outsideClickProxy);
            document.removeEventListener('touchend', this._outsideClickProxy);
            document.removeEventListener('focusin', this._outsideClickProxy);
            document.removeEventListener('click', this._outsideClickProxy);
        }

        if (this._resizeProxy) {
            window.removeEventListener('resize', this._resizeProxy);
        }
    }

    destroy() {
        // Remove the picker container from the DOM
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }

        this._removeEventListenners();

        // Null out references
        this.container = null;
        this.element = null;
        this._outsideClickProxy = null;
        this._resizeProxy = null;
    }
}
