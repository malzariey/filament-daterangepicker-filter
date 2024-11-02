import $ from 'jquery';
import moment from 'moment';
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
                       handleValueChangeUsing,
                       showWeekNumbers,
                       showISOWeekNumbers,
                       weekLabel,
                       showDropdowns,
                       minYear,
                       maxYear,
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
                    startDate: startDate != null ? moment(startDate) : moment(),
                    endDate: endDate != null ? moment(endDate) : moment(),
                    maxDate: maxDate != null ? moment(maxDate) : null,
                    minDate: minDate != null ? moment(minDate) : null,
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
                    handleValueChangeUsing(picker.startDate.format(displayFormat), name)
                }else{
                    handleValueChangeUsing(picker.startDate.format(displayFormat) + separator + picker.endDate.format(displayFormat), name)
                }
            });

            if (this.state != null) {
                const dates = this.state.split(separator);
                if (dates.length === 2 && this.dateRangePicker != null) {
                    this.dateRangePicker.setStartDate(dates[0]);
                    this.dateRangePicker.setEndDate(dates[1]);
                }
            }

            let parent = this;

            setTimeout(function() {
                $(parent.$refs.daterange).val(parent.getRangeLabel(parent.state));
            }, 20);

            this.$watch('state', function(value) {
                if (value == null) {
                    value = '';
                    parent.dateRangePicker.setStartDate(moment());
                    parent.dateRangePicker.setEndDate(moment());
                }
                $(parent.$refs.daterange).val(parent.getRangeLabel(value));
            })
        },
    }
}
