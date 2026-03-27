import * as esbuild from 'esbuild'
import fs from 'fs'
import path from 'path'

const isDev = process.argv.includes('--dev')

// Testbench published asset paths (for demo app auto-update)
const PUBLISH_TARGETS = {
    js: [
        'vendor/orchestra/testbench-core/laravel/public/js/malzariey/filament-daterangepicker-filter/filament-daterangepicker.js',
        'vendor/orchestra/testbench-core/laravel/public/js/malzariey/filament-daterangepicker-filter/components/dateRangeComponent.js',
        'vendor/orchestra/testbench-core/laravel/public/js/malzariey/filament-daterangepicker-filter/dateRangeComponent.js',
    ],
};

function publishAsset(srcFile, targets) {
    for (const target of targets) {
        try {
            if (fs.existsSync(path.dirname(target))) {
                fs.copyFileSync(srcFile, target);
            }
        } catch (e) {
            // Silently skip if target doesn't exist (no demo app set up)
        }
    }
}

async function compile(options) {
    const context = await esbuild.context(options)

    if (isDev) {
        await context.watch()
    } else {
        await context.rebuild()
        await context.dispose()
    }
}

const defaultOptions = {
    define: {
        'process.env.NODE_ENV': isDev ? `'development'` : `'production'`,
    },
    bundle: true,
    mainFields: ['module', 'main'],
    platform: 'neutral',
    sourcemap: isDev ? 'inline' : false,
    sourcesContent: isDev,
    treeShaking: true,
    target: ['es2020'],
    minify: !isDev,
    plugins: [{
        name: 'watchPlugin',
        setup: function (build) {
            build.onStart(() => {
                console.log(`Build started at ${new Date(Date.now()).toLocaleTimeString()}: ${build.initialOptions.outfile}`)
            })

            build.onEnd((result) => {
                if (result.errors.length > 0) {
                    console.log(`Build failed at ${new Date(Date.now()).toLocaleTimeString()}: ${build.initialOptions.outfile}`, result.errors)
                } else {
                    console.log(`Build finished at ${new Date(Date.now()).toLocaleTimeString()}: ${build.initialOptions.outfile}`)
                    // Auto-publish to demo app
                    if (build.initialOptions.outfile) {
                        publishAsset(build.initialOptions.outfile, PUBLISH_TARGETS.js);
                        console.log(`  → Published to demo app`)
                    }
                }
            })
        }
    }],
}

compile({
    ...defaultOptions,
    entryPoints: ['./resources/js/filament-daterangepicker.js'],
    outfile: './dist/filament-daterangepicker.js',
})
