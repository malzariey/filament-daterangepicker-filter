const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./resources/views/**/*.blade.php', './src/**/*.php'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                danger: colors.rose,
                primary: {
                    "50": "#44dfeb",
                    "100": "#3ad5e1",
                    "200": "#30cbd7",
                    "300": "#26c1cd",
                    "400": "#1cb7c3",
                    "500": "#12adb9",
                    "600": "#08a3af",
                    "700": "#0099a5",
                    "800": "#008f9b",
                    "900": "#008591"
                },
                success: colors.green,
                warning: colors.amber,
            },
        },
    },
    corePlugins: {
        preflight: true,
    },
    plugins: [],
}
