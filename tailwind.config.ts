import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                primary: {
                    dark: '#013531',
                    accent: '#00CC66',
                    DEFAULT: '#B4FFAF',
                },
                background: {
                    dark: '#D1D4D8',
                    DEFAULT: '#F3F3F3',
                },
                gray: {
                    dark: '#080F1540',
                    light: '#0909090A',
                    divider: '#E5E5E5',
                    inactive: '#D7D5D5',
                    neutral: '#F5F5F5',
                    DEFAULT: '#0909090A',
                },
                black: {
                    high: '#090909',
                    medium: '#09090999',
                    disabled: '#98999C',
                    inactive: '#0909098A',
                    DEFAULT: '#09090999',
                },
                error: {
                    dark: '#B81734',
                    base: '#E72447',
                    light: '#FEF4F4',
                    lightest: '#FCE7E7',
                    DEFAULT: '#E72447',
                },
                green: {
                    900: '#00C04D',
                    800: '#00CB6A',
                    700: '#00D475',
                    600: '#2BDD90',
                    500: '#4AE5A9',
                    400: '#9CE0B7',
                    300: '#C4ECD4',
                    200: '#E6F8EB',
                    100: '#EEF8F1',
                    DEFAULT: '#4AE5A9',
                },
            },
        },
    },
    plugins: [],
};
export default config;
