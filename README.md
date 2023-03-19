# Filament Filter using DateRangePicker Library

[![Latest Version on Packagist](https://img.shields.io/packagist/v/malzariey/filament-daterangepicker-filter.svg?style=flat-square)](https://packagist.org/packages/malzariey/filament-daterangepicker-filter)
[![GitHub Tests Action Status](https://img.shields.io/github/workflow/status/malzariey/filament-daterangepicker-filter/run-tests?label=tests)](https://github.com/malzariey/filament-daterangepicker-filter/actions?query=workflow%3Arun-tests+branch%3Amain)
[![GitHub Code Style Action Status](https://img.shields.io/github/workflow/status/malzariey/filament-daterangepicker-filter/Check%20&%20fix%20styling?label=code%20style)](https://github.com/malzariey/filament-daterangepicker-filter/actions?query=workflow%3A"Check+%26+fix+styling"+branch%3Amain)
[![Total Downloads](https://img.shields.io/packagist/dt/malzariey/filament-daterangepicker-filter.svg?style=flat-square)](https://packagist.org/packages/malzariey/filament-daterangepicker-filter)



This package uses daterangepciker library to filter date by a range or predefined date ranges (Today , Yesterday ...etc)

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

As a Field
```php
DateRangePicker::make('created_at'),
```
As a Filter
```php
DateRangeFilter::make('created_at')->columnSpan(2)->label('Your Label')->withIndicater(),,
```
## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Credits

- [Majid Al-Zariey](https://github.com/malzariey)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
