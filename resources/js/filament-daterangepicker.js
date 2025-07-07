import DateRangePicker  from './plugin.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isSame from 'dayjs/plugin/isSameOrAfter';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.extend(isSame);

export default function dateRangeComponent({
       name,
       state,
       alwaysShowCalendars,
       autoApply,
       linkedCalendars,
       singleCalendar,
       startDate,
       endDate,
       maxDate,
       minDate,
       timePicker,
       timePicker24,
       timePickerSecond,
       timePickerIncrement,
       displayFormat,
       applyLabel,
       cancelLabel,
       fromLabel,
       toLabel,
       customRangeLabel,
       disableCustomRange,
       disabledDates,
       drops,
       opens,
       sunday,
       monday,
       tuesday,
       wednesday,
       thursday,
       friday,
       saturday,
       january,
       february,
       march,
       april,
       may,
       june,
       july,
       august,
       september,
       october,
       november,
       december,
       firstDay,
       ranges,
       maxSpan,
       disableRange,
       separator,
       useRangeLabels,
       handleValueChangeUsing,
       showWeekNumbers,
       showISOWeekNumbers,
       weekLabel,
       showDropdowns,
       minYear,
       maxYear,
       timezone
    }) {

    let dayjsRanges = {};
    for (let key in ranges) {
        let dateRange = ranges[key];
        dayjsRanges[key] = dateRange.map((dateString) => dayjs(dateString));
    }

    return {

        dateRangePicker: null,
        state: state,
        getRangeLabel: function (state) {
            if (!state || !useRangeLabels) {
                return state;
            }

            const [from, to] = state.split(separator);
            const fromDate = dayjs(from, displayFormat);
            const toDate = dayjs(to, displayFormat);

            for (const [label, [rangeFrom, rangeTo]] of Object.entries(dayjsRanges)) {
                if (fromDate.isSame(rangeFrom) && toDate.isSame(rangeTo)) {
                    return label;
                }
            }

            return state;
        },
        init: function () {

            dayjs.tz.setDefault(timezone);

            let dayjsDatesArray = [];

            if(disabledDates !== undefined && disabledDates.length > 0 ) {
                dayjsDatesArray = disabledDates.map(dateString => dayjs(dateString));
            }

            this.dateRangePicker = new DateRangePicker(
                this.$refs.daterange,
                {
                    name: name,
                    alwaysShowCalendars: alwaysShowCalendars,
                    autoApply: autoApply,
                    linkedCalendars: linkedCalendars,
                    singleDatePicker: singleCalendar,
                    autoUpdateInput: false,
                    drops: drops,
                    opens: opens,
                    startDate: startDate !== null ? dayjs(startDate) : undefined,
                    endDate: endDate !== null ? dayjs(endDate) : undefined,
                    maxDate: maxDate !== null ? dayjs(maxDate) : undefined,
                    minDate: minDate !== null ? dayjs(minDate) : undefined,
                    timePicker: timePicker,
                    timePicker24Hour: timePicker24,
                    timePickerSeconds: timePickerSecond,
                    timePickerIncrement: timePickerIncrement,
                    showCustomRangeLabel: ! disableCustomRange,
                    locale: {
                        format: displayFormat,
                        separator: separator,
                        applyLabel: applyLabel,
                        cancelLabel: cancelLabel,
                        fromLabel: fromLabel,
                        toLabel: toLabel,
                        customRangeLabel: customRangeLabel,
                        weekLabel: weekLabel,
                        daysOfWeek: [
                            sunday,
                            monday,
                            tuesday,
                            wednesday,
                            thursday,
                            friday,
                            saturday,
                        ],
                        monthNames: [
                            january,
                            february,
                            march,
                            april,
                            may,
                            june,
                            july,
                            august,
                            september,
                            october,
                            november,
                            december,
                        ],
                        firstDay: firstDay
                    },
                    ranges: disableRange ? undefined : dayjsRanges,
                    maxSpan: maxSpan,
                    showWeekNumbers: showWeekNumbers,
                    showISOWeekNumbers: showISOWeekNumbers,
                    showDropdowns: showDropdowns,
                    minYear: minYear,
                    maxYear: maxYear,
                    isInvalidDate: (date) => {
                        if(dayjsDatesArray !== null && dayjsDatesArray.length > 0 ) {
                            return dayjsDatesArray.some(disabledDate =>
                                disabledDate.utc().startOf('day').isSame(date.utc().startOf('day'), 'day')
                            );
                        }else{
                            return false;
                        }

                    },

                }
            );

            // this.dateRangePicker = $(this.$refs.daterange).data('daterangepicker');
            // TODO: check if this works with the new DateRangePicker
            this.dateRangePicker.element.addEventListener('apply', function(ev) {
                const picker = ev.detail;
                if(singleCalendar){
                    handleValueChangeUsing(picker.startDate.format(displayFormat), name)
                }else{
                    handleValueChangeUsing(picker.startDate.format(displayFormat) + separator + picker.endDate.format(displayFormat), name)
                }
            });

            this.dateFromState(this.dateRangePicker, this.state);

            let parent = this;

            setTimeout(function() {
                parent.$refs.daterange.value = parent.getRangeLabel(parent.state);
            }, 20);

            this.$watch('state', function(value) {
                if (value === null) {
                    value = '';
                    parent.clear(parent.dateRangePicker);
                }else{
                    parent.dateFromState(parent.dateRangePicker, value);
                }

                parent.$refs.daterange.value = parent.getRangeLabel(value);
            })
        },

        clear: function (dateRangePicker) {
            if (dateRangePicker === null) {
                return;
            }
            dateRangePicker.setStartDate(dayjs());
            dateRangePicker.setEndDate(dayjs());
        },

        dateFromState: function (dateRangePicker,state) {
            if (state === null) {
                this.clear(dateRangePicker);
                return;
            }

            const dates = state.split(separator);
            if (dates.length === 2 && dateRangePicker !== null) {
                dateRangePicker.setStartDate(dayjs(dates[0], displayFormat));
                dateRangePicker.setEndDate(dayjs(dates[1], displayFormat));
            } else {
                this.clear(dateRangePicker);
            }
        }
    }
}
