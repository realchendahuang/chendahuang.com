import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { SITE_LOCALES, DEFAULT_LOCALE } from './app/utils/locale'

// https://nuxt.com/docs/api/configuration/nuxt-config

// 非默认语言的内容文件后缀,如 blog/hello.en.md / index.ja.yml
const NON_DEFAULT_LOCALE_RE = SITE_LOCALES
  .filter(l => l.code !== DEFAULT_LOCALE)
  .map(l => l.code)
  .join('|')

/** 博客文章 slug 集合(文件名去 locale 后缀)。文章页必须全部预渲染——
 *  Cloudflare Pages worker 运行时查不了 @nuxt/content 的 sqlite(需 D1),
 *  不预渲染的文章页线上直接 404。 */
const BLOG_SLUGS = [...new Set(
  readdirSync(fileURLToPath(new URL('./content/blog', import.meta.url)))
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, '').replace(new RegExp(`\\.(${NON_DEFAULT_LOCALE_RE})$`), ''))
)]

/** 需要预渲染的静态页 */
const STATIC_PATHS = ['/', '/projects', '/playbooks', '/skills', '/blog', '/archive', '/friends', '/highlights', '/mirror', '/privacy']

const localePrefix = (code: string) => (code === DEFAULT_LOCALE ? '' : `/${code}`)

/** 同一路径带/不带尾斜杠都预渲染,根路径只保留 '/' */
const withSlashVariants = (path: string) => (path === '/' ? ['/'] : [path, `${path}/`])

const prerenderRoutes = [
  ...SITE_LOCALES.flatMap(({ code }) =>
    STATIC_PATHS.flatMap(path =>
      withSlashVariants(path === '/' ? localePrefix(code) || '/' : `${localePrefix(code)}${path}`)
    )
  ),
  ...SITE_LOCALES.flatMap(({ code }) =>
    BLOG_SLUGS.map(slug => `${localePrefix(code)}/blog/${slug}/`)
  ),
  '/rss.xml',
  '/sitemap.xml',
  '/llms.txt',
  '/llms-full.txt'
]

const prerenderRule = { prerender: true } as const
const routeRules = Object.fromEntries([
  ...SITE_LOCALES.map(({ code }) => [`${localePrefix(code)}/blog/**`, prerenderRule]),
  ['/rss.xml', prerenderRule],
  ['/sitemap.xml', prerenderRule]
])

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

  app: {
    head: {
      script: [
        // Google AdSense(发布商 ca-pub-9220805950691621)。代码 consent-aware:
        // 配合 CookieConsent 的 consent 默认拒绝,未同意用户不会被个性化跟踪。
        {
          src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9220805950691621',
          async: true,
          crossorigin: 'anonymous'
        }
      ]
    }
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
    },
    /* 生产运行时内容库:独立 D1(chendahuang-content,绑定 CONTENT_DB),与访客统计的 DB 分离。
       部署后可用 `pnpm run db:seed-content` 预灌库;不灌则首个内容查询自动从 dump 自建(integrityCheck 默认开)。 */
    database: {
      type: 'd1',
      bindingName: 'CONTENT_DB'
    }
  },

  runtimeConfig: {
    public: {
      // GA4 Measurement ID(G- 开头)。空 = 不加载 GA;可用环境变量 NUXT_PUBLIC_GA_ID 覆盖
      gaId: 'G-8WV7CRDXDC'
    }
  },

  routeRules,

  compatibilityDate: '2026-07-10',

  nitro: {
    // Workers(静态资产)部署:静态页走 CDN 不进 worker,未命中路径才进 worker(nitro SSR/接口)。
    // 部署配置在仓库根 wrangler.jsonc(assets 目录 + 双 D1 绑定 + 自定义域),`wrangler deploy` 直发。
    preset: 'cloudflare_module',
    compatibilityDate: '2026-08-08',
    cloudflare: {
      wranglerConfig: {
        compatibility_flags: ['nodejs_compat']
      }
    },
    prerender: {
      routes: prerenderRoutes,
      crawlLinks: false,
      ignore: ['/blog?']
    }
  },

  hooks: {
    /* 内容本地化:按文件名后缀识别 locale,并去掉 path 里的 locale 后缀,
       让同一篇内容在各语言共享同一 URL 路径(前缀由 @nuxtjs/i18n 处理)。 */
    'content:file:afterParse': (ctx) => {
      const id = String(ctx.content.id ?? '')
      const match = id.match(new RegExp(`\\.(${NON_DEFAULT_LOCALE_RE})\\.(yml|yaml|md)$`))
      const locale = match ? match[1] : DEFAULT_LOCALE
      ctx.content.locale = locale
      if (match && typeof ctx.content.path === 'string') {
        // Nuxt Content 已将路径小写化(如 /projects.zh-hant),而 locale 码保留原始大小写,
        // 用 i 标志同时匹配两种形式,否则 zh-Hant 这类含大写码的语言去不掉后缀。
        const suffix = new RegExp(`\\.${locale}$`, 'i')
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
    locales: SITE_LOCALES.map(l => ({
      code: l.code,
      language: l.language,
      name: l.name,
      file: `${l.code}.json`,
      ...(l.dir === 'rtl' ? { dir: 'rtl' as const } : {})
    })),
    defaultLocale: DEFAULT_LOCALE,
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
