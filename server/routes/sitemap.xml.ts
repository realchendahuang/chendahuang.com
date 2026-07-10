import { queryCollection } from '@nuxt/content/server'
import { escapeXml, toCanonicalUrl, toIsoDate } from '../../app/utils/site'

export default defineEventHandler(async (event) => {
  const posts = await queryCollection(event, 'blog')
    .select('path', 'date')
    .order('date', 'DESC')
    .all()

  const staticPaths = ['/', '/projects', '/playbooks', '/skills', '/blog', '/about']
  const staticEntries = staticPaths.map(path => `<url><loc>${escapeXml(toCanonicalUrl(path))}</loc></url>`)
  const postEntries = posts.map(post => [
    '<url>',
    `<loc>${escapeXml(toCanonicalUrl(post.path))}</loc>`,
    `<lastmod>${toIsoDate(post.date)}</lastmod>`,
    '</url>'
  ].join(''))

  setResponseHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setResponseHeader(event, 'cache-control', 'public, max-age=0, s-maxage=3600')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...staticEntries,
    ...postEntries,
    '</urlset>'
  ].join('')
})
