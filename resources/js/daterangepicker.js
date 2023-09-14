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
                        init: function () {
                            $(this.$refs.daterange).daterangepicker(
                            // this.dateRangePicker = new DateRangePicker(this.$refs.daterange,
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
                                handleApplyUsing : handleValueChangeUsing,
                                locale: {
                                    format: displayFormat,
                                        separator: " - ",
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
                        }, function (start, end) {
                            handleValueChangeUsing(start.format(displayFormat) + ' - ' + end.format(displayFormat), name)
                        });
                        this.dateRangePicker = $(this.$refs.daterange).data('daterangepicker');
                        if(this.state != null){
                            const dates = this.state.split(' - ');
                            if(dates.length == 2 && this.dateRangePicker != null){
                                this.dateRangePicker.setStartDate(dates[0]);
                                this.dateRangePicker.setEndDate(dates[1]);
                            }
                        }
                        $(this.$refs.daterange).val(this.state);
                        let parent = this;
                        this.$watch('state', function(value)  {
                            if(value == null){
                                value = '';
                                parent.dateRangePicker.setStartDate(moment());
                                parent.dateRangePicker.setEndDate(moment());
                            }
                            $(parent.$refs.daterange).val(value);
                        })
                },
            }
        },
    )
}
