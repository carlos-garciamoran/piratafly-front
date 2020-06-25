const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    colors: {
      black: colors.black,
      white: colors.white,
      red: colors.red,
      yellow: '#f7e406',

      gray: {
        lightest: '#e0e0e0',
        lighter: '#bababa',
        light: '#979797',
        pseudoLightA: '#848484',
        pseudoLightB: '#4f4f4f',
        default: '#353535',
        dark: '#252525',
      }
    }
  },

  variants: {},
  plugins: []
}
