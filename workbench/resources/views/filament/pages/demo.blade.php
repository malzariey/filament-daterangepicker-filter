<x-filament-panels::page>
    {{-- RTL / LTR Toggle --}}
    <x-filament::section>
        <div style="display: flex; align-items: center; gap: 0.75rem">
            <span>Direction:</span>
            <x-filament::button
                tag="a"
                href="?locale=en"
                size="sm"
                :color="app()->getLocale() !== 'ar' ? 'primary' : 'gray'"
            >
                LTR (English)
            </x-filament::button>
            <x-filament::button
                tag="a"
                href="?locale=ar"
                size="sm"
                :color="app()->getLocale() === 'ar' ? 'primary' : 'gray'"
            >
                RTL (العربية)
            </x-filament::button>
        </div>
    </x-filament::section>

    {{-- Slide Over and Modal Actions --}}
    <div style="display: flex; flex-wrap: wrap; gap: 0.75rem">
        {{ $this->slideOverAction }}
        {{ $this->modalAction }}
    </div>

    @if ($lastSubmitted)
        <p id="demo-last-submitted">Last submitted &rarr; {{ $lastSubmitted }}</p>
    @endif

    {{-- Form --}}
    <form wire:submit.prevent>
        {{ $this->form }}
    </form>

    <x-filament-actions::modals />

    @if(app()->getLocale() === 'ar')
    <script>
        document.documentElement.dir = 'rtl';
        document.documentElement.lang = 'ar';
    </script>
    @endif
</x-filament-panels::page>
