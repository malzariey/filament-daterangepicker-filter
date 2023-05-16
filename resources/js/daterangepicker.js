import DateRangePicker from './plugin';
import $ from './jquery.min';
import moment from './moment.min';

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
            today,
            yesterday,
            last_7_days,
            last_30_days,
            this_month,
            last_month,
            this_year,
            last_year,
            handleValueChangeUsing,
        }) => {
            return {
                        dateRangePicker: null,

                        state: state,

                        init: function () {
                            this.dateRangePicker = new DateRangePicker(this.$refs.daterange,{
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
                                ranges: {
                                        [today]  :        [moment(), moment()],
                                        [yesterday]:      [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                                        [last_7_days]:    [moment().subtract(6, 'days'), moment()],
                                        [last_30_days]:   [moment().subtract(29, 'days'), moment()],
                                        [this_month]:     [moment().startOf('month'), moment().endOf('month')],
                                        [last_month]:     [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                                        [this_year]:      [moment().startOf('year'), moment().endOf('year')],
                                        [last_year]:      [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
                                }
                        }, function (start, end, label) {
                            handleValueChangeUsing(start.format(displayFormat) + ' - ' + end.format(displayFormat), name)
                        });

                        $('input[name="'+name+'"]').val(this.state);

                        this.$watch('state', function(value) {
                            if(value == null){
                                value = '';
                            }
                            $('input[name="'+name+'"]').val(value);
                        })
                },
            }
        },
    )
}
