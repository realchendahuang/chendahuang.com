import { queryCollection } from '@nuxt/content/server'
import { escapeXml, toCanonicalUrl, toIsoDate } from '../../app/utils/site'
import { SITE_LOCALES } from '../../app/utils/locale'

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

  const staticPaths = ['/', '/projects', '/playbooks', '/skills', '/blog', '/archive', '/friends', '/highlights']

  const alternatesFor = (path: string) => SITE_LOCALES.map(l => ({
    lang: l.language,
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
