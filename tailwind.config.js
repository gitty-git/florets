/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            lineHeight: {
                '8-2': '2.5'
            },
            zIndex: {
                '60': '60',
            },
            fontFamily: {
                'serif': ["Noto Serif"],
                'sans': ["Montserrat"],
                'display': ["Noto Serif Display"]
            },
            scale: {
                '102': '1.02'
            },
            colors: {
                'mainRed': '#FE344C',
                'mainRed-400': '#e75368',
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
            margin: {
                '4.5': '1.125rem',
            },
            spacing: {
                '128': '32rem',
                '160': '40rem',
            },
            boxShadow: {
                'line': '0 1px 2px 0px rgba(0, 0, 0, 0.075)',
            },
            dropShadow: {
                '3xl': '2px 2px 10px rgb(0, 0, 0, 0.9)',
                '4xl': [
                    '0 35px 35px rgba(0, 0, 0, 0.25)',
                    '0 45px 65px rgba(0, 0, 0, 0.15)'
                ]
            }
        },
    },
    plugins: [],
}
