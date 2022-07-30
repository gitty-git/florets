/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                'serif': ["Noto Serif"],
                'sans': ["Montserrat"],
                'display': ["Noto Serif Display"]
            },
            scale: {
                '102': '1.02'
            },
            colors: {
                'mainRed': '#EC0121',
                'mainRed-400': '#ed344d',
                'gray': {
                    50: '#fafafa',
                    100: '#f5f5f5',
                    150: '#f1f1f1',
                    200: '#e5e5e5',
                    300: '#d4d4d4',
                    400: '#a3a3a3',
                    500: '#737373',
                    600: '#525252',
                    700: '#404040',
                    800: '#262626',
                    900: '#171717',
                },
            },
            spacing: {
                '400': '40rem',
            },
            boxShadow: {
                'line': '0 1px 2px 0px rgba(0, 0, 0, 0.075)',
            }
        },
    },
    plugins: [],
}
