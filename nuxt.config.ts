// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'motion-v/nuxt'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://chendahuang.com',
    name: '陈大黄',
    description: '陈大黄的个人作品与内容陈列站。前 AI 产品经理，独立开发者，长期折腾 AI 效率和高效语言学习。'
  },

  content: {
    experimental: {
      sqliteConnector: 'native'
    }
  },

  routeRules: {
    '/blog/**': { prerender: true },
    '/projects': { prerender: true },
    '/rss.xml': { prerender: true },
    '/sitemap.xml': { prerender: true }
  },

  compatibilityDate: '2026-07-10',

  nitro: {
    preset: 'cloudflare-pages',
    prerender: {
      routes: [
        '/',
        '/projects',
        '/playbooks',
        '/skills',
        '/blog',
        '/about',
        '/rss.xml',
        '/sitemap.xml'
      ],
      crawlLinks: true
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  ogImage: {
    zeroRuntime: true
  }
})
