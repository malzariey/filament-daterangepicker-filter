import fs from 'fs';
import path from 'path';

const isOnce = process.argv.includes('--once');
const SRC = 'dist/filament-daterangepicker.css';
const TARGET = 'vendor/orchestra/testbench-core/laravel/public/css/malzariey/filament-daterangepicker-filter/date-range-picker.css';

// Only run if the target directory exists (demo app is set up)
if (!fs.existsSync(path.dirname(TARGET))) {
    console.log('[publish-css] Demo app not set up, skipping CSS publish.');
    if (!isOnce) {
        // Keep process alive so npm-run-all doesn't exit
        setInterval(() => {}, 60000);
    }
} else {
    function publish() {
        try {
            fs.copyFileSync(SRC, TARGET);
            console.log(`[publish-css] ${new Date().toLocaleTimeString()} → Published CSS to demo app`);
        } catch (e) {
            console.warn(`[publish-css] Copy failed: ${e.message}`);
        }
    }

    // Initial publish
    if (fs.existsSync(SRC)) {
        publish();
    }

    // In watch mode (dev), keep watching for changes
    if (!isOnce) {
        let debounce = null;
        fs.watch(SRC, { persistent: true }, () => {
            clearTimeout(debounce);
            debounce = setTimeout(publish, 200);
        });
        console.log(`[publish-css] Watching ${SRC} for changes...`);
    }
}
