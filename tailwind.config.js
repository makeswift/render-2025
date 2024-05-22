// @ts-check

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pink: '#FF88DF',
        yellow: '#E9AF0D',
        blue: '#30C4ED',
        teal: '#8EEAE4',
        peach: '#F8705F',
        green: '#015A55',
        gold: '#DFA84E',
        // transparent: 'transparent',
        // current: 'currentColor',
        // black: '#000000',
        // blue: {
        //   primary: '#053FB0',
        //   secondary: '#3071EF',
        // },
        // gray: {
        //   100: '#F1F3F5',
        //   200: '#CFD8DC',
        //   300: '#AFBAC5',
        //   400: '#90A4AE',
        //   500: '#546E7A',
        //   600: '#091D45',
        // },
        // green: {
        //   100: '#388E3C',
        //   200: '#146622',
        //   300: '#4FD055',
        // },
        // red: {
        //   100: '#C62828',
        //   200: '#AD0000',
        // },
        // white: '#ffffff',
      },
      fontFamily: {
        sans: ['var(--font-ibm-plex-sans)'],
        display: ['var(--font-mortend)'],
        header: ['var(--font-awesome-serif)'],
      },
      keyframes: {
        dialogFadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeInAndScale: {
          '0%': { opacity: '0', transform: 'scale(.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        marqueeScroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        revealVertical: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
      },
      animation: {
        dialogFadeIn: 'dialogFadeIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        fadeInAndScale: 'fadeInAndScale 250ms',
        revealVertical: 'revealVertical 400ms forwards cubic-bezier(0, 1, 0.25, 1)',
        marqueeScroll: 'marqueeScroll var(--marquee-duration) linear infinite',
      },
    },
  },
  // @ts-ignore
  // eslint-disable-next-line global-require
  plugins: [require('tailwindcss-radix')(), require('tailwindcss-animate')],
};

module.exports = config;
