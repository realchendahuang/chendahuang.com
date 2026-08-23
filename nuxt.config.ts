// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'nuxt-llms',
    'motion-v/nuxt'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://chendahuang.com',
    name: '陈大黄',
    description: '陈大黄的个人作品与内容陈列站。收录项目、Playbook、Agent Skill、文章和帖子。'
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
    compatibilityDate: '2026-08-08',
    prerender: {
      routes: [
        '/',
        '/projects',
        '/projects/',
        '/playbooks',
        '/playbooks/',
        '/skills',
        '/skills/',
        '/blog',
        '/blog/',
        '/archive',
        '/archive/',
        '/tags',
        '/tags/',
        '/search',
        '/search/',
        '/friends',
        '/friends/',
        '/highlights',
        '/highlights/',
        '/rss.xml',
        '/sitemap.xml',
        '/llms.txt',
        '/llms-full.txt'
      ],
      crawlLinks: false,
      ignore: ['/blog?']
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

  llms: {
    domain: 'https://chendahuang.com',
    title: '陈大黄',
    description: '陈大黄的个人作品与内容陈列站。收录开源项目、Playbook、Agent Skill、博客文章和 X 精华帖。',
    full: {
      title: '陈大黄完整内容索引',
      description: '全站博客文章与内容摘要的纯文本索引，适合 AI 与开发者直接抓取。'
    }
  },

  ogImage: {
    zeroRuntime: true
  }
})
