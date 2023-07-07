import { fontFamily } from 'tailwindcss/defaultTheme'
/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './utils/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: ['text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-neusa)', ...fontFamily.sans],
      },
      fontWeight: {
        medium: false,
      },
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          dark: 'var(--primary-dark)',
          shade: 'var(--primary-shade)',
          light: 'var(--primary-light)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          dark: 'var(--secondary-dark)',
        },
        error: 'var(--error)',
      },
      opacity: {
        19: '0.19',
      },
      screens: {
        xxs: '1px',
        xs: '512px',
        '3xl': '1900px',
        '4xl': '2200px',
        '69px': '69px',
        '100px': '100px',
        '120px': '120px',
        '162px': '162px',
        tall: { raw: '(min-height: 800px)' },
        narrow: { raw: '(max-height: 500px)' },
        smallPhone: { raw: '(max-width: 385px ) and ( max-height: 680px)' },
      },
      maxWidth: {
        half: '50%',
        desktop: '1280px',
      },
      minWidth: {
        75: '75px',
      },
      zIndex: {
        100: '100',
      },
      borderWidth: {
        DEFAULT: '3px',
        0: '0',
        2: '2px',
        4: '4px',
        6: '6px',
        8: '8px',
      },
      boxShadow: {
        '3xl': '0 2px 78px 0 rgb(62 8 85 / 79%)',
        purpleShadow:
          '0 2px 5px 0 var(--primary-shade), inset 0 1px 0 0 rgba(255, 255, 255, 0.19)',
        shinny:
          '0 2px 30px 3px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.3), inset 0 -2px 48px 0 rgba(255, 255, 255, 0.18)',
      },
      listStyleType: {
        disc: '"* "',
      },
      animation: {
        openmenu: 'openmenu 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        closemenu: 'closemenu 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        openmenuleft: 'openmenuleft 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        closemenuleft: 'closemenuleft 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        opensearch: 'show-search .45s 0s cubic-bezier(.16,1,.3,1) forwards',
        in: 'enter 300ms',
        out: 'exit 300ms',
        notification: 'ping 1s cubic-bezier(0, 0, 0.2, 0) 7',
        glow: 'glow 2s ease-out infinite alternate',
        'spin-slow': 'spin 2s linear infinite',
      },
      aspectRatio: {
        game: '25 / 18',
      },
      keyframes: {
        enter: {
          '0%': {
            opacity: 'var(--tw-enter-opacity, 1)',
            transform:
              'translate3d(var(--tw-enter-translate-x, 0), var(--tw-enter-translate-y, 0), 0) scale3d(var(--tw-enter-scale, 1), var(--tw-enter-scale, 1), var(--tw-enter-scale, 1)) rotate(var(--tw-enter-rotate, 0))',
          },
        },
        exit: {
          to: {
            opacity: 'var(--tw-exit-opacity, 1)',
            transform:
              'translate3d(var(--tw-exit-translate-x, 0), var(--tw-exit-translate-y, 0), 0) scale3d(var(--tw-exit-scale, 1), var(--tw-exit-scale, 1), var(--tw-exit-scale, 1)) rotate(var(--tw-exit-rotate, 0))',
          },
        },
        openmenu: {
          // initial position
          '0%': { left: '-20rem' },
          // final position
          '100%': { left: '0px' },
        },
        closemenu: {
          // initial position
          '0%': { left: '0px' },
          // final position
          '100%': { left: '-20rem' },
        },
        openmenuleft: {
          // initial position
          '0%': { right: '-20rem' },
          // final position
          '100%': { right: '0px' },
        },
        closemenuleft: {
          // initial position
          '0%': { right: '0px' },
          // final position
          '100%': { right: '-20rem' },
        },
        glow: {
          // initial position
          '0%': { boxShadow: '0 0 0 0 var(--primary)' },

          '100%': { boxShadow: '0 0 1rem .2rem var(--secondary)' },
          // final position
        },
      },
      slider: {
        itemsPerPage: {
          xs: '2',
          sm: '3',
          md: '4',
          lg: '5',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/forms')],
}
