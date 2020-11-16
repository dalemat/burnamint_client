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
        '300': '300px',
        '690': '690px',
        '800': '800px',
      },
      maxWidth: {
        '1400': '1400px',
      },
      colors: {
        'greenish': '#1CA691',
        'brownish': '#525252',
        'light-brown': '#8C8C8C',
        'thin-brown': '#BDBDBD',
      }
    },
  },
  variants: {},
  plugins: [],
}
