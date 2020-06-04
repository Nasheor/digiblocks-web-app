module.exports = {
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 8090, // CHANGE YOUR PORT HERE!
    https: false,
    hotOnly: false,
  },

  transpileDependencies: ['vuetify'],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
}
