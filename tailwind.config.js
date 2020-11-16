module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      zIndex: {
        '-1': '-1',
      },
      height: {
        '480': '480px',
        '550': '550px'
      },
      width: {
        '300': '300px'
      }
    },
  },
  variants: {},
  plugins: [],
}
