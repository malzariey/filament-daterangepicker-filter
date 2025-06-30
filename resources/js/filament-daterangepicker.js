import $ from 'jquery';
import moment from 'moment';
import 'moment-timezone';

import './plugin.cjs';

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
                       showWeekNumbers,
                       showISOWeekNumbers,
                       weekLabel,
                       showDropdowns,
                       minYear,
                       maxYear,
                       timezone
   }) {

    var momentRanges = {};
    for (var key in ranges) {
        var dateRange = ranges[key];
        momentRanges[key] = dateRange.map((dateString) => moment(dateString));
    }

    return {

        dateRangePicker: null,
        state: state,
        getRangeLabel: function (state) {
            if (!state || !useRangeLabels) {
                return state;
            }

            const [from, to] = state.split(separator);
            const fromDate = moment(from, displayFormat);
            const toDate = moment(to, displayFormat);

            for (const [label, [rangeFrom, rangeTo]] of Object.entries(momentRanges)) {
                if (fromDate.isSame(rangeFrom) && toDate.isSame(rangeTo)) {
                    return label;
                }
            }

            return state;
        },
        init: function () {

            moment.tz.setDefault(timezone);

            let momentDatesArray = [];

            if(disabledDates !== undefined && disabledDates.length > 0 ) {
                momentDatesArray = disabledDates.map(dateString => moment(dateString));
            }

            $(this.$refs.daterange).daterangepicker(
                {
                    name: name,
                    alwaysShowCalendars: alwaysShowCalendars,
                    autoApply: autoApply,
                    linkedCalendars: linkedCalendars,
                    singleDatePicker: singleCalendar,
                    autoUpdateInput: false,
                    drops: drops,
                    opens: opens,
                    startDate: startDate != null ? moment(startDate) : undefined,
                    endDate: endDate != null ? moment(endDate) : undefined,
                    maxDate: maxDate != null ? moment(maxDate) : undefined,
                    minDate: minDate != null ? moment(minDate) : undefined,
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
                    ranges: disableRange ? undefined : momentRanges,
                    maxSpan: maxSpan,
                    showWeekNumbers: showWeekNumbers,
                    showISOWeekNumbers: showISOWeekNumbers,
                    showDropdowns: showDropdowns,
                    minYear: minYear,
                    maxYear: maxYear,
                    isInvalidDate: (date) => {
                        if(momentDatesArray != null && momentDatesArray.length > 0 ) {
                            return momentDatesArray.some(disabledDate =>
                                disabledDate.utc().startOf('day').isSame(date.utc().startOf('day'), 'day')
                            );
                        }else{
                            return false;
                        }

                    },

                }
            );

            this.dateRangePicker = $(this.$refs.daterange).data('daterangepicker');

            $(this.$refs.daterange).on('apply.daterangepicker', function(ev, picker) {
                if(singleCalendar){
                    parent.state = picker.startDate.format(displayFormat);
                }else{
                    parent.state = picker.startDate.format(displayFormat) + separator + picker.endDate.format(displayFormat);
                }
            });

            this.dateFromState(this.dateRangePicker, this.state);

            let parent = this;

            setTimeout(function() {
                $(parent.$refs.daterange).val(parent.getRangeLabel(parent.state));
            }, 20);

            this.$watch('state', function(value) {
                if (value == null) {
                    value = '';
                    parent.clear(parent.dateRangePicker);
                }else{
                    parent.dateFromState(parent.dateRangePicker, value);
                }

                $(parent.$refs.daterange).val(parent.getRangeLabel(value));
            })
        },
        clear: function (dateRangePicker) {
            if (dateRangePicker == null) {
                return;
            }
            dateRangePicker.setStartDate(moment());
            dateRangePicker.setEndDate(moment());
        },

        dateFromState: function (dateRangePicker,state) {
            if (state == null) {
                this.clear(dateRangePicker);
                return;
            }

            const dates = state.split(separator);
            if (dates.length === 2 && dateRangePicker != null) {
                dateRangePicker.setStartDate(dates[0]);
                dateRangePicker.setEndDate(dates[1]);
            } else {
                this.clear(dateRangePicker);
            }
        }
    }
}
