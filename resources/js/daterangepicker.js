import $ from 'jquery';
import moment from 'moment';
import './plugin';

export default (Alpine) => {
    Alpine.data(
        'dateRangeComponent',
        ({
            name,
            state,
            alwaysShowCalendars,
            autoApply,
            linkedCalendars,
            startDate,
            endDate,
            maxDate,
            minDate,
            timePicker,
            timePickerIncrement,
            displayFormat,
            applyLabel,
            cancelLabel,
            fromLabel,
            toLabel,
            customRangeLabel,
            disableCustomRange,
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
            separator,
            useRangeLabels,
            handleValueChangeUsing,
        }) => {
            var momentRanges = {};
            for (var key in ranges) {
                var dateRange = ranges[key];
                var momentDateRange = dateRange.map((dateString) => moment(dateString));
                momentRanges[key] = momentDateRange;
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
                    $(this.$refs.daterange).daterangepicker(
                        {
                            name: name,
                            alwaysShowCalendars: alwaysShowCalendars,
                            autoApply: autoApply,
                            linkedCalendars: linkedCalendars,
                            autoUpdateInput: false,
                            startDate: startDate != null ? moment(startDate) : moment(),
                            endDate: endDate != null ? moment(endDate) : moment(),
                            maxDate: maxDate != null ? moment(maxDate) : null,
                            minDate: minDate != null ? moment(minDate) : null,
                            timePicker: timePicker,
                            timePickerIncrement: timePickerIncrement,
                            handleApplyUsing: handleValueChangeUsing,
                            showCustomRangeLabel: ! disableCustomRange,
                            locale: {
                                format: displayFormat,
                                separator: separator,
                                applyLabel: applyLabel,
                                cancelLabel: cancelLabel,
                                fromLabel: fromLabel,
                                toLabel: toLabel,
                                customRangeLabel: customRangeLabel,
                                weekLabel: "W",
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
                            ranges: momentRanges,
                        },
                        function(start, end) {
                            handleValueChangeUsing(start.format(displayFormat) + separator + end.format(displayFormat), name)
                        }
                    );

                    this.dateRangePicker = $(this.$refs.daterange).data('daterangepicker');
                    if (this.state != null) {
                        const dates = this.state.split(separator);
                        if (dates.length == 2 && this.dateRangePicker != null) {
                            this.dateRangePicker.setStartDate(dates[0]);
                            this.dateRangePicker.setEndDate(dates[1]);
                        }
                    }

                    $(this.$refs.daterange).val(this.getRangeLabel(this.state));
                    let parent = this;
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
        },
    )
}
