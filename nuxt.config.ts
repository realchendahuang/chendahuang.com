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
const STATIC_PATHS = ['/', '/projects', '/playbooks', '/skills', '/blog', '/archive', '/friends', '/highlights']

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

/** Cloudflare Pages _routes.json 上限 100 条规则,nitro 默认逐文件收集 exclude
 *  (8 语言文章页 + 静态资产远超上限)会被截断,非默认语言文章页因此丢失走 worker 报 404。
 *  关掉自动收集,用通配符手写:约 48 条,新增语言/文章自动覆盖。 */
const routesExclude = [
  // 构建资产与 OG 图(og-image 模块会自加 /_og/s/*,别再写 /_og/* 否则判定重叠)
  '/_nuxt/*',
  '/_fonts/*',
  '/_og-static-fonts/*',
  // 根级静态文件
  '/',
  '/_payload.json',
  '/apple-touch-icon.png',
  '/avatar-logo.png',
  '/avatar.jpg',
  '/favicon.ico',
  '/favicon.png',
  '/robots.txt',
  '/site-icon.svg',
  '/rss.xml',
  '/sitemap.xml',
  '/llms.txt',
  '/llms-full.txt',
  '/dump.blog.sql',
  '/dump.friends.sql',
  '/dump.highlights.sql',
  '/dump.index.sql',
  '/dump.pages.sql',
  '/dump.playbooks.sql',
  '/dump.projects.sql',
  '/dump.skills.sql',
  // 默认语言(zh)各板块:列表页 + 文章页 + payload + 项目图片(/projects/*)
  ...STATIC_PATHS.filter(p => p !== '/').flatMap(p => [p, `${p}/*`]),
  // 非默认语言整棵子树
  ...SITE_LOCALES.filter(l => l.code !== DEFAULT_LOCALE).flatMap(l => [`/${l.code}`, `/${l.code}/*`])
]

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

  routeRules,

  compatibilityDate: '2026-07-10',

  nitro: {
    preset: 'cloudflare-pages',
    compatibilityDate: '2026-08-08',
    cloudflare: {
      pages: {
        defaultRoutes: false,
        routes: {
          include: ['/*'],
          exclude: routesExclude
        }
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
