import { queryCollection } from '@nuxt/content/server'
import { escapeXml, toCanonicalUrl, toIsoDate } from '../../app/utils/site'

export default defineEventHandler(async (event) => {
  const posts = await queryCollection(event, 'blog')
    .where('locale', '=', 'zh')
    .select('path', 'date')
    .order('date', 'DESC')
    .all()

  const staticPaths = ['/', '/projects', '/playbooks', '/skills', '/blog', '/archive', '/tags', '/friends', '/highlights']

  const urlEntry = (path: string, alternates: Array<{ lang: string, href: string }>) => {
    const altLinks = alternates.map(alt =>
      `<xhtml:link rel="alternate" hreflang="${alt.lang}" href="${escapeXml(alt.href)}"/>`
    ).join('')
    return `<url><loc>${escapeXml(toCanonicalUrl(path))}</loc>${altLinks}</url>`
  }

  const staticEntries = staticPaths.map(path => urlEntry(path, [
    { lang: 'zh-CN', href: toCanonicalUrl(path) },
    { lang: 'en', href: toCanonicalUrl(`/en${path === '/' ? '' : path}`) }
  ]))

  const postEntries = posts.map((post) => {
    const enPath = `/en${post.path}`
    return [
      '<url>',
      `<loc>${escapeXml(toCanonicalUrl(post.path))}</loc>`,
      `<xhtml:link rel="alternate" hreflang="zh-CN" href="${escapeXml(toCanonicalUrl(post.path))}"/>`,
      `<xhtml:link rel="alternate" hreflang="en" href="${escapeXml(toCanonicalUrl(enPath))}"/>`,
      `<lastmod>${toIsoDate(post.date)}</lastmod>`,
      '</url>'
    ].join('')
  })

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
