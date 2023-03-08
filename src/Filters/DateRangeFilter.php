<?php

namespace Malzariey\FilamentDaterangepickerFilter\Filters;

use Carbon\CarbonInterface;
use Closure;
use Filament\Tables\Filters\BaseFilter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Carbon;
use Malzariey\FilamentDaterangepickerFilter\Fields\DateRangePicker;

class DateRangeFilter extends BaseFilter
{
    protected string $column;

    protected string $operator = '=';

    protected bool $range = true;

    protected bool $displayRangeInLine = false;

    protected CarbonInterface|string|Closure|null $maxDate = null;

    protected CarbonInterface|string|Closure|null $minDate = null;

    protected string|Closure|null $displayFormat = 'd/m/Y';

    protected string|Closure|null $timezone = null;


    public function withIndicater(){

        $this->indicateUsing(function (array $data): ?string {
            if (!$data[$this->column]) {
                return null;
            }
            return __('filament-daterangepicker-filter::message.period') . ' '.  $this->label? "[$this->label] ":"" . $data[$this->column];
        });

        return $this;
    }
    public function apply(Builder $query, array $data = []): Builder
    {
        $dates = explode(' ', $data[$this->column]);
        if (count($dates) == 3) {
            $from = $dates[0];
            $to = $dates[2];
        } else {
            $from = null;
            $to = null;
        }
        return $query
            ->when(
                $from !== null && $to !== null,
                fn(Builder $query, $date): Builder => $query->whereBetween($this->column, [
                    Carbon::createFromFormat($this->displayFormat,$from)->startOfDay(),
                    Carbon::createFromFormat($this->displayFormat,$to)->endOfDay(),
                ]),
            );
    }

    public function operator(string $operator): self
    {
        $this->operator = $operator;

        return $this;
    }

    public function getFormSchema(): array
    {
        $schema = $this->evaluate($this->formSchema);

        if ($schema !== null) {
            return $schema;
        }

        return [
            DateRangePicker::make($this->column)
                ->label($this->getLabel())
                ->timezone($this->timezone)
                ->minDate($this->minDate)
                ->maxDate($this->maxDate),
        ];
    }

    public function maxDate(CarbonInterface|string|Closure|null $date): static
    {
        $this->maxDate = $date;

        return $this;
    }

    public function minDate(CarbonInterface|string|Closure|null $date): static
    {
        $this->minDate = $date;

        return $this;
    }

    public function timezone(string|Closure|null $timezone): static
    {
        $this->timezone = $timezone;

        return $this;
    }

    public function displayFormat(string|Closure|null $format): static
    {
        $this->displayFormat = $format;

        return $this;
    }

    protected function setUp(): void
    {
        parent::setUp();

//        $this->displayFormat = config('tables.date_format', $this->displayFormat);

        $this->useColumn($this->getName());
    }

    public function useColumn(string $column): self
    {
        $this->column = $column;

        return $this;
    }
}
