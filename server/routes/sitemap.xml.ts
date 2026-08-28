import { queryCollection } from '@nuxt/content/server'
import { escapeXml, toCanonicalUrl, toIsoDate } from '../../app/utils/site'

const LOCALES: Array<{ code: string, lang: string }> = [
  { code: 'zh', lang: 'zh-CN' },
  { code: 'en', lang: 'en' },
  { code: 'ja', lang: 'ja' },
  { code: 'es', lang: 'es' },
  { code: 'pt', lang: 'pt-BR' },
  { code: 'fr', lang: 'fr' },
  { code: 'de', lang: 'de' },
  { code: 'ar', lang: 'ar' }
]

const localePath = (code: string, path: string) => {
  if (code === 'zh') return path
  if (path === '/') return `/${code}/`
  return `/${code}${path}`
}

export default defineEventHandler(async (event) => {
  const posts = await queryCollection(event, 'blog')
    .where('locale', '=', 'zh')
    .select('path', 'date')
    .order('date', 'DESC')
    .all()

  const staticPaths = ['/', '/projects', '/playbooks', '/skills', '/blog', '/archive', '/tags', '/friends', '/highlights']

  const alternatesFor = (path: string) => LOCALES.map(l => ({
    lang: l.lang,
    href: toCanonicalUrl(localePath(l.code, path))
  }))

  const urlEntry = (path: string) => {
    const alternates = alternatesFor(path)
    const altLinks = alternates.map(alt =>
      `<xhtml:link rel="alternate" hreflang="${alt.lang}" href="${escapeXml(alt.href)}"/>`
    ).join('')
    return `<url><loc>${escapeXml(toCanonicalUrl(path))}</loc>${altLinks}</url>`
  }

  const staticEntries = staticPaths.map(urlEntry)

  const postEntries = posts.map(post => [
    '<url>',
    `<loc>${escapeXml(toCanonicalUrl(post.path))}</loc>`,
    ...alternatesFor(post.path).map(alt =>
      `<xhtml:link rel="alternate" hreflang="${alt.lang}" href="${escapeXml(alt.href)}"/>`
    ),
    `<lastmod>${toIsoDate(post.date)}</lastmod>`,
    '</url>'
  ].join(''))

  setResponseHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setResponseHeader(event, 'cache-control', 'public, max-age=0, s-maxage=3600')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...staticEntries,
    ...postEntries,
    '</urlset>'
  ].join('')
})
