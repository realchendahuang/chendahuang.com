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
    '/ja/blog/**': { prerender: true },
    '/es/blog/**': { prerender: true },
    '/pt/blog/**': { prerender: true },
    '/fr/blog/**': { prerender: true },
    '/de/blog/**': { prerender: true },
    '/ar/blog/**': { prerender: true },
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
        '/ja',
        '/ja/',
        '/ja/projects',
        '/ja/projects/',
        '/ja/playbooks',
        '/ja/playbooks/',
        '/ja/skills',
        '/ja/skills/',
        '/ja/blog',
        '/ja/blog/',
        '/ja/archive',
        '/ja/archive/',
        '/ja/tags',
        '/ja/tags/',
        '/ja/friends',
        '/ja/friends/',
        '/ja/highlights',
        '/ja/highlights/',
        '/es',
        '/es/',
        '/es/projects',
        '/es/projects/',
        '/es/playbooks',
        '/es/playbooks/',
        '/es/skills',
        '/es/skills/',
        '/es/blog',
        '/es/blog/',
        '/es/archive',
        '/es/archive/',
        '/es/tags',
        '/es/tags/',
        '/es/friends',
        '/es/friends/',
        '/es/highlights',
        '/es/highlights/',
        '/pt',
        '/pt/',
        '/pt/projects',
        '/pt/projects/',
        '/pt/playbooks',
        '/pt/playbooks/',
        '/pt/skills',
        '/pt/skills/',
        '/pt/blog',
        '/pt/blog/',
        '/pt/archive',
        '/pt/archive/',
        '/pt/tags',
        '/pt/tags/',
        '/pt/friends',
        '/pt/friends/',
        '/pt/highlights',
        '/pt/highlights/',
        '/fr',
        '/fr/',
        '/fr/projects',
        '/fr/projects/',
        '/fr/playbooks',
        '/fr/playbooks/',
        '/fr/skills',
        '/fr/skills/',
        '/fr/blog',
        '/fr/blog/',
        '/fr/archive',
        '/fr/archive/',
        '/fr/tags',
        '/fr/tags/',
        '/fr/friends',
        '/fr/friends/',
        '/fr/highlights',
        '/fr/highlights/',
        '/de',
        '/de/',
        '/de/projects',
        '/de/projects/',
        '/de/playbooks',
        '/de/playbooks/',
        '/de/skills',
        '/de/skills/',
        '/de/blog',
        '/de/blog/',
        '/de/archive',
        '/de/archive/',
        '/de/tags',
        '/de/tags/',
        '/de/friends',
        '/de/friends/',
        '/de/highlights',
        '/de/highlights/',
        '/ar',
        '/ar/',
        '/ar/projects',
        '/ar/projects/',
        '/ar/playbooks',
        '/ar/playbooks/',
        '/ar/skills',
        '/ar/skills/',
        '/ar/blog',
        '/ar/blog/',
        '/ar/archive',
        '/ar/archive/',
        '/ar/tags',
        '/ar/tags/',
        '/ar/friends',
        '/ar/friends/',
        '/ar/highlights',
        '/ar/highlights/',
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
    /* 内容本地化:按文件名后缀识别 locale,并去掉 path 里的 locale 后缀,
       让同一篇内容在各语言共享同一 URL 路径(前缀由 @nuxtjs/i18n 处理)。 */
    'content:file:afterParse': (ctx) => {
      const id = String(ctx.content.id ?? '')
      const match = id.match(/\.(en|ja|es|pt|fr|de|ar)\.(yml|yaml|md)$/)
      const locale = match ? match[1] : 'zh'
      ctx.content.locale = locale
      if (match && typeof ctx.content.path === 'string') {
        const suffix = new RegExp(`\\.${locale}$`)
        ctx.content.path = ctx.content.path.replace(suffix, '')
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
      { code: 'en', language: 'en', name: 'English', file: 'en.json' },
      { code: 'ja', language: 'ja', name: '日本語', file: 'ja.json' },
      { code: 'es', language: 'es', name: 'Español', file: 'es.json' },
      { code: 'pt', language: 'pt-BR', name: 'Português', file: 'pt.json' },
      { code: 'fr', language: 'fr', name: 'Français', file: 'fr.json' },
      { code: 'de', language: 'de', name: 'Deutsch', file: 'de.json' },
      { code: 'ar', language: 'ar', name: 'العربية', file: 'ar.json', dir: 'rtl' }
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
