<x-filament-panels::page>
    {{-- RTL / LTR Toggle --}}
    <div class="flex items-center gap-3 mb-6 p-4 rounded-xl bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-950/5 dark:ring-white/10">
        <span class="text-sm font-semibold text-gray-700 dark:text-gray-200">Direction:</span>
        <a
            href="?locale=en"
            class="fi-btn fi-btn-size-sm rounded-lg px-4 py-2 text-sm font-medium {{ app()->getLocale() !== 'ar' ? 'fi-btn-color-primary' : '' }}"
        >
            LTR (English)
        </a>
        <a
            href="?locale=ar"
            class="fi-btn fi-btn-size-sm rounded-lg px-4 py-2 text-sm font-medium {{ app()->getLocale() === 'ar' ? 'fi-btn-color-primary' : '' }}"
        >
            RTL (العربية)
        </a>
    </div>

    {{-- Slide Over Action --}}
    <div class="mb-6">
        {{ $this->slideOverAction }}
    </div>

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
