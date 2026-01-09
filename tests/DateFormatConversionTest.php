<?php

use Malzariey\FilamentDaterangepickerFilter\Fields\DateRangePicker;

it('converts common PHP date formats to Day.js formats', function () {
    $field = DateRangePicker::make('test');

    // Reflection to access protected method
    $reflection = new ReflectionClass($field);
    $method = $reflection->getMethod('convertPhpToJsFormat');
    $method->setAccessible(true);

    $cases = [
        'd/m/Y' => 'DD/MM/YYYY',
        'Y-m-d' => 'YYYY-MM-DD',
        'd.m.Y H:i' => 'DD.MM.YYYY HH:mm',
        'F j, Y' => 'MMMM D, YYYY',
        'l, F jS, Y' => 'dddd, MMMM Do, YYYY', // Note: S -> o (ordinal)
        'h:i a' => 'hh:mm a',
        'H:i:s' => 'HH:mm:ss',
        'D M d Y' => 'ddd MMM DD YYYY',
        'd/m/Y \a\t H:i' => 'DD/MM/YYYY [a][t] HH:mm', // Escaped characters
    ];

    foreach ($cases as $php => $expected) {
        expect($method->invoke($field, $php))->toBe($expected, "Failed to convert '$php'");
    }
});

it('uses converted format when displayFormat is not set', function () {
    $field = DateRangePicker::make('test')->format('d/m/Y');
    expect($field->getDisplayFormat())->toBe('DD/MM/YYYY');
});

it('respects explicitly set displayFormat', function () {
    $field = DateRangePicker::make('test')
        ->format('d/m/Y')
        ->displayFormat('YY/MM/DD');
    expect($field->getDisplayFormat())->toBe('YY/MM/DD');
});
