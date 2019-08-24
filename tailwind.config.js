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
      maxHeight: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
      },
      lineHeight: {
        relaxed: 1.75
      },
      boxShadow: {
        'mixed': '0 0px 3px 0px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.04), 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
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
          '400': '#6FE2DA',
        },
        green: {
          ...colors.green,
          '200': '#82F09E',
          '300': '#64F488',
          '400': '#34D25C',
          '500': '#1FAA42',
          '600': '#0A912C',
        },
        blue: {
          ...colors.blue,
          '400': '#379EF1',
        },
        purple: {
          ...colors.purple,
        },
        lightpink: {
          '400': '#FDD8F5',
        },
        pink: {
          ...colors.pink,
        },
        teal: {
          ...colors.teal,
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
