/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'

export default {
    content: [
        './resources/views/**/*.blade.php',
    ],
    darkMode: 'class',
    safelist: [
        'bg-[#ebf4f8]',
        'dark:bg-white',
        'text-gray-600',
        'hover:text-gray-400',
        'dark:text-white',
        'dark:hover:text-gray-200'
    ],
    theme: {
        extend: {
            colors: {
                danger: colors.rose,
                primary: colors.blue,
                success: colors.green,
                warning: colors.yellow,
            },
        },
    },
};
