export default {
  ssr: false,

  head: {
    title: 'Casino',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
     	{ charset: 'utf-8' },
     	{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
     	{ hid: 'description', name: 'description', content: '' },
		{ hid: 'keywords', name: 'keywords', content: '' },
	  	{ name: 'format-detection', content: 'telephone=yes' }
    ],
    link: [
		// { rel: 'apple-touch-icon', sizes: '76x76', href: '/assets/images/apple-touch-icon.png' },
		// { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/assets/images/favicon-32x32.png' },
		// { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/assets/images/favicon-16x16.png' },
		{ rel: 'stylesheet', type: 'text/css',  href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
		{ rel: 'stylesheet', type: 'text/css',  href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css' },
		{ rel: 'stylesheet', type: 'text/css',  href: '/assets/css/theme.css' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
	//{ src: '~/plugins/gtag.js', mode: 'client' },

  ],

  googleAnalytics: {
    //id: 'G-E9D5N1TTMS', // Ваш идентификатор Google Analytics
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['moment'],

  // Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		"@nuxtjs/axios",
		"@nuxtjs/auth-next", ['@nuxtjs/dotenv', { systemvars: true }, ],
		"@nuxtjs/toast",
		'cookie-universal-nuxt', '@nuxtjs/device',
	],

	i18n: {

	},

  	auth: {
		redirect: {
			login: '/auth',
			home: '/',
			logout: '/auth',
			callback: '/',
		},
		localStorage: true,
		strategies: {
			local: {
				token: {
					property: 'token',
					global: true,
					required: true,
					type: 'Bearer',
					maxAge: 3600
				},
				user: {
					property: 'user',
					autoFetch: false
				},
				endpoints: {
					login: { url: '/private/account/login', method: 'post' },
					refresh: { url: '/private/account/refresh-token', method: 'post' },
					logout: false,
					user: { url: '/private/account/me', method: 'post' }
				}
			}
		},
		preserveState: true,
		watchLoggedIn: true
	},

	router: {
		middleware: ['auth']
	},

    toast: {
        position: 'bottom-center',
        duration: 5000
    },

    axios: {
        baseURL: process.env.API
    },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
