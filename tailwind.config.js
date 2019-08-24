const {
  colors
} = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.25rem',
        '4xl': '1.5rem',
      },
      minWidth: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
      },
      maxWidth: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
      },
      lineHeight: {
        relaxed: 1.75
      },
      fontSize: {
        'xxs': '0.65rem',
        'md': '1.075rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
        '7xl': '4rem',
        '8xl': '5rem',
        '9xl': '6rem',
        '10xl': '7rem',
        '12xl': '8.5rem'
      },
      fontFamily: {
        'sans-regular': ['Soleil', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
        'condensed': ['novecento-sans-condensed', 'DIN Condensed', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
        'headline': ['novecento-sans-narrow', 'DIN Condensed', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
        'sans': ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      opacity: {
        '0': '0',
        '10': '.1',
        '20': '.2',
        '30': '.3',
        '40': '.4',
        '50': '.5',
        '60': '.6',
        '70': '.7',
        '80': '.8',
        '90': '.9',
        '100': '1',
      },
      fill: theme => ({
        // 'indigo': theme('colors.indigo.500')
      }),
      colors: {
        cyan: {
          // '200': '#9CF9F3',
          '400': '#6FE2DA',
        },
        blue: {
          ...colors.blue,
          '800': '#2c529f',
          '900': '#1c329f'
        },
        purple: {
          ...colors.purple,
          '800': '#482299',
          '900': '#421C90',
          '1000': '#34236A',
          '1100': '#24135A',
        },
        lightpink: {
          '400': '#FDD8F5',
        },
        pink: {
          ...colors.pink,
          '400': '#F485FB',
          '800': '#a744a7',
          '1000': '#4d0c39',
          '1100': '#2e0221',
        },
        teal: {
          ...colors.teal,
          '100': '#c1dbef',
          '200': '#a3cff1',
          '300': '#75bbf3',
          '400': '#41a0ed',
          '500': '#1a7fd1',
          '600': '#0761ab',
          '700': '#065698',
          '800': '#035883',
          '900': '#032c57',
          '1000': '#02304b'
        },
      },
      container: {
        center: true,
        padding: '2rem',
      },
      screens: {
        'sm': '641px',
        'md': '961px',
        'lg': '1281px',
        'xl': '1461px',
      }
    },
  },
  variants: {
    borderColor: [
      'hover',
      'focus',
      'active'
    ],
    textColor: [
      'responsive',
      'hover',
      'focus',
      'active'
    ],
    backgroundColor: [
      'responsive',
      'hover',
      'focus',
      'active'
    ],
    opacity: [
      'hover',
      'focus',
      'responsive',
    ]
  },
  plugins: []
}
