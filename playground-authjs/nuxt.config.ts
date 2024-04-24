export default defineNuxtConfig({
  modules: ['../src/module.ts'],
  app: {
    baseURL: '/test/'
  },
  auth: {
    provider: {
      type: 'authjs'
    },
    globalAppMiddleware: {
      isEnabled: false
    },
    baseURL: 'http://localhost:3000/test/api/auth'
  },
  routeRules: {
    '/with-caching': {
      swr: 86400000,
      auth: {
        disableServerSideAuth: true
      }
    }
  }
})
