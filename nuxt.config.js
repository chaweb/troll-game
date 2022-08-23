export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'troll-game',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'jeu rp avec troll game' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@assets/reset.scss',
    '@assets/style.sass'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    ['@nuxtjs/color-mode', {classSuffix: ''}],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    ['nuxt-vuex-localstorage', {mode: 'debug'}], //local storage

    ['nuxt-socket-io', { //socket
      sockets: [ // Required
        { // At least one entry is required
          name: 'default',
          default: true,
          vuex: { actions: ["game"] },
          namespaces: { /* see section below */ }
        },  
      ]
    }],

    ['@nuxtjs/style-resources', {
      sass: ['~/assets/variable/__Amain.sass'],
      hoistUseStatements: true
    }]
  ],
  server: {
    host: '0.0.0.0',
    port: 80
  }
}