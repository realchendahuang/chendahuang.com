// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
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
    '/en/blog/**': { prerender: true },
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
        '/friends',
        '/friends/',
        '/highlights',
        '/highlights/',
        '/en',
        '/en/',
        '/en/projects',
        '/en/projects/',
        '/en/playbooks',
        '/en/playbooks/',
        '/en/skills',
        '/en/skills/',
        '/en/blog',
        '/en/blog/',
        '/en/archive',
        '/en/archive/',
        '/en/tags',
        '/en/tags/',
        '/en/friends',
        '/en/friends/',
        '/en/highlights',
        '/en/highlights/',
        '/rss.xml',
        '/sitemap.xml',
        '/llms.txt',
        '/llms-full.txt'
      ],
      crawlLinks: false,
      ignore: ['/blog?']
    }
  },

  hooks: {
    'content:file:afterParse': (ctx) => {
      const id = String(ctx.content.id ?? '')
      const isEn = /\.en(\.|$)/.test(id)
      ctx.content.locale = isEn ? 'en' : 'zh'
      if (isEn && typeof ctx.content.path === 'string') {
        ctx.content.path = ctx.content.path.replace(/\.en$/, '')
      }
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

  i18n: {
    locales: [
      { code: 'zh', language: 'zh-CN', name: '中文', file: 'zh.json' },
      { code: 'en', language: 'en', name: 'English', file: 'en.json' }
    ],
    defaultLocale: 'zh',
    strategy: 'prefix_except_default',
    langDir: 'locales',
    detectBrowserLanguage: false
  },

  llms: {
    domain: 'https://chendahuang.com',
    title: '陈大黄',
    description: '陈大黄的个人作品与内容陈列站。收录开源与独立项目、Playbook、Agent Skill、博客文章和 X 精华帖。',
    full: {
      title: '陈大黄完整内容索引',
      description: '全站博客文章与内容摘要的纯文本索引，适合 AI 与开发者直接抓取。'
    }
  },

  ogImage: {
    zeroRuntime: true
  }
})
