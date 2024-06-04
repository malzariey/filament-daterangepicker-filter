# Filament Date Range Picker and Filter

[![Latest Version on Packagist](https://img.shields.io/packagist/v/malzariey/filament-daterangepicker-filter.svg?style=flat-square)](https://packagist.org/packages/malzariey/filament-daterangepicker-filter)
[![Total Downloads](https://img.shields.io/packagist/dt/malzariey/filament-daterangepicker-filter.svg?style=flat-square)](https://packagist.org/packages/malzariey/filament-daterangepicker-filter)



This package that adds a date range picker and filter to the [Filament](https://filamentphp.com/) panel using the `daterangepicker` library. It provides options to filter dates by a specific range or predefined ranges such as "Today", "Yesterday", etc.

## Installation

You can install the package via composer:

```bash
composer require malzariey/filament-daterangepicker-filter
```

You can publish the config file with:

Optionally, you can publish the views using

```bash
php artisan vendor:publish --tag="filament-daterangepicker-filter-views"
```

## Usage

### As a Field
```php
use Malzariey\FilamentDaterangepickerFilter\Fields\DateRangePicker;

DateRangePicker::make('created_at'),
```
### As a Filter
```php
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;

DateRangeFilter::make('created_at'),
```
### Options

#### Timezone
Set the picker timezone, defaults to the project timezone. Example setting timezone to 'UTC'.

```php
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;

DateRangeFilter::make('created_at')->timezone('UTC')
```

#### Start and End Dates 

You can specify initial selected Start and End Dates for the filter. The following example will initialize the filter to today's date.
```php
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;

DateRangeFilter::make('created_at')->startDate(Carbon::now())->endDate(Carbon::now())
````

#### Default Today
You could also use a shortcut for above using the following

```php
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;

DateRangeFilter::make('created_at')->defaultToday()
````


#### Min and Max Dates

Specify the minimum and maximum dates for the calendar. The following example will only enable selecting previous month to next month.

```php
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;

DateRangeFilter::make('created_at')->minDate(Carbon::now()->subMonth())->maxDate(Carbon::now()->addMonth())
````

#### First Day of Week
Set Monday as the first day of the week on the calendar of your DateRangeFilter.

```php
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;

DateRangeFilter::make('created_at')->firstDayOfWeek(1)
````
#### Always Show Calendar
Normally, if you use the ranges option to specify pre-defined date ranges, calendars for choosing a custom date range are not shown until the user clicks "Custom Range". When this option is set to true, the calendars for choosing a custom date range.

```php
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;

DateRangeFilter::make('created_at')->alwaysShowCalendar()
```

#### Time Picker
Adds select boxes to choose times in addition to dates.

```php
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;

DateRangeFilter::make('created_at')->timePicker()
```

#### Show Time Picker Seconds
Show seconds in the timePicker.

```php
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;

DateRangeFilter::make('created_at')->timePickerSecond()
```

#### Time Picker 24-Hour Format
Use 24-hour instead of 12-hour times, removing the AM/PM selection

```php
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;

DateRangeFilter::make('created_at')->timePicker24()
```

#### Time Picker Increment Option
Increment of the minutes selection list for times (i.e. 30 to allow only selection of times ending in 0 or 30).

```php
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;

DateRangeFilter::make('created_at')->timePickerIncrement(30)
```

#### Auto Apply
Hide the apply and cancel buttons, and automatically apply a new date range as soon as two dates are clicked.

Note: Does not work with `timePicker` option.

```php
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;

DateRangeFilter::make('created_at')->autoApply()
```

#### Linked Calendars
When enabled, the two calendars displayed will always be for two sequential months (i.e. January and February), and both will be advanced when clicking the left or right arrows above the calendars. When disabled, the two calendars can be individually advanced and display any month/year

```php
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;

DateRangeFilter::make('created_at')->linkedCalendars()
```

#### Single Calendar
Show only a single calendar to choose one date, instead of a range picker with two calendars. `Used Only with DateRangePicker`.

```php
use Malzariey\FilamentDaterangepickerFilter\Fields\DateRangePicker;

DateRangePicker::make('created_at')->singlseCalendar()


```

#### Disabled Dates
Indicate whether that date should be available for selection or not.

```php
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;

DateRangeFilter::make('created_at')->disabledDates(['array of Dates'])
```

#### Display and Picker Formats
Specify the format for the display and selection of dates.
```php
DateRangeFilter::make('created_at')
//Picker Date Display Format in (Javascript Date Format)
->displayFormat('date format')
//Carbon Format reading from the Javascript displayFormat in (PHP Date Format)
->format('date format')
```

#### Customize Query
Apply a custom filter query.
```php
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;
use Illuminate\Database\Eloquent\Builder;
use Carbon\Carbon;

DateRangeFilter::make('created_at')
    ->modifyQueryUsing(fn(Builder $query, ?Carbon $startDate , ?Carbon $endDate , $dateString) =>
        $query->when(!empty($dateString),
            fn (Builder $query, $date) : Builder =>
                $query->whereBetween('created_at', [$startDate->subDays(3),$endDate]))
    )
```

#### Filter Indicator
Show an indicator when the filter is active.
```php
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;

DateRangeFilter::make('created_at')->withIndicator()
```

#### Predefined Ranges
Customize the predefine date ranges for quick selection.

```php
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;

DateRangeFilter::make('created_at')
->ranges(['Last 3 days' => [now()->subDays(3), now()]])
```

#### Use Range Labels
By using the `useRangeLabels` function, it enables the field to display the predefined range labels instead of actual date ranges. This can simplify the display and make it more user-friendly.
```php
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;

DateRangeFilter::make('created_at')->useRangeLabels()
```

#### Disabling Custom Range Selection
If you want the users to only choose from the predefined ranges and prevent them from selecting custom ranges, you can use the disableCustomRange option.

```php
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;

DateRangeFilter::make('created_at')->disableCustomRange()
```

#### Separator
Specify the separator for the date range.

```php
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;

DateRangeFilter::make('created_at')->separator(' - ')
```

#### Drops Position
Specify the location the filter menu should drop at.

###### Options
`DropDirection::AUTO` : Auto decide the location. (Default)

`DropDirection::UP` : The picker will appear above field.

`DropDirection::DOWN` : The picker will appear below field.


###### Example

```php
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;
use Malzariey\FilamentDaterangepickerFilter\Enums\DropDirection;

DateRangeFilter::make('created_at')->drops(DropDirection::AUTO)
```

#### Open Position
Specify the location the filter menu should open to.

###### Options

`OpenDirection::LEFT` : The picker will appear left to the field. (Default)

`OpenDirection::RIGHT` : The picker will appear right to the field.

`OpenDirection::CENTER` : The picker will appear center of the field.


###### Example

```php
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;
use Malzariey\FilamentDaterangepickerFilter\Enums\OpenDirection;

DateRangeFilter::make('created_at')->opens(OpenDirection::LEFT)
```

#### Clearing the Date Range Picker

If you have selected a date range and want to remove it, simply click on the calendar icon within the field.

To disable this behavior, you can use the `disableClear()` method. This will prevent the user from clearing the selected date range.

```php
use \Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;
use \Malzariey\FilamentDaterangepickerFilter\Fields\DateRangePicker;

DateRangeFilter::make('created_at')->disableClear()
DateRangePicker::make('created_at')->disableClear()
```

#### Disabling Predefined Ranges

If you wish to disable the predefined ranges feature and provide users with a custom selection only, you may use the `disableRanges()` method. This will remove any preset date ranges from the picker.

```php
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;

DateRangeFilter::make('created_at')->disableRanges()
```

####  Max Span

The maximum span between the selected start and end dates. 

```php
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;

DateRangeFilter::make('created_at')->maxSpan(['months' => 1]), // days, months or years
````

### Screenshots

#### Light mode

![DateRangePicker Widget](https://github.com/malzariey/filament-daterangepicker-filter/raw/main/art/light.png)

#### Dark mode

![DateRangePicker Widget](https://github.com/malzariey/filament-daterangepicker-filter/raw/main/art/dark.png)

# Styling

If you're [building a custom Filament theme](https://filamentphp.com/docs/2.x/admin/appearance#building-themes), you need one more step to make the calendar theme match your custom theme.

Add this line to your `resources/css/{panel_name}/theme.css` file.

```css
@import '/vendor/malzariey/filament-daterangepicker-filter/resources/css/filament-daterangepicker.css';
```

<br>

## Credits

- [Majid Al-Zariey](https://github.com/malzariey)
- [All Contributors](https://github.com/malzariey/filament-daterangepicker-filter/graphs/contributors)

## License

The MIT License (MIT). Please see [License File](https://github.com/malzariey/filament-daterangepicker-filter/blob/main/LICENSE.md) for more information.

## Acknowledgements

- This project makes use of the fantastic [Date Range Picker for Bootstrap](https://github.com/dangrossman/daterangepicker) by [Dan Grossman](https://www.dangrossman.info/).
- Special thanks to [JetBrains](https://www.jetbrains.com), whose support to open-source projects has been tremendously valuable for our project's progress and improvement. Through their [Open Source Support Program](https://www.jetbrains.com/community/opensource/#support), JetBrains has generously provided us with free licenses to their high-quality professional developer tools, including IntelliJ IDEA and PhpStorm. These tools have greatly improved our productivity and made it easier to maintain high quality code. JetBrains has demonstrated a strong commitment to assisting the open source community, making a significant contribution to promoting open-source software and collaboration. We wholeheartedly thank JetBrains for their support and for having us in their open-source project support program.

[![JetBrains Logo](https://www.jetbrains.com/company/brand/img/jetbrains_logo.png)](https://www.jetbrains.com/)
