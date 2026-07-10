import { queryCollection } from '@nuxt/content/server'
import { escapeXml, SITE_DESCRIPTION, SITE_NAME, SITE_URL, toCanonicalUrl, toIsoDate } from '../../app/utils/site'

export default defineEventHandler(async (event) => {
  const posts = await queryCollection(event, 'blog')
    .select('path', 'title', 'description', 'date')
    .order('date', 'DESC')
    .all()

  const items = posts.map((post) => {
    const url = toCanonicalUrl(post.path)

    return [
      '<item>',
      `<title>${escapeXml(post.title)}</title>`,
      `<link>${escapeXml(url)}</link>`,
      `<guid isPermaLink="true">${escapeXml(url)}</guid>`,
      `<description>${escapeXml(post.description)}</description>`,
      `<pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
      '</item>'
    ].join('')
  })

  const lastBuildDate = posts[0]?.date ? toIsoDate(posts[0].date) : new Date().toISOString()

  setResponseHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  setResponseHeader(event, 'cache-control', 'public, max-age=0, s-maxage=3600')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '<channel>',
    `<title>${escapeXml(`${SITE_NAME} 的博客`)}</title>`,
    `<link>${escapeXml(SITE_URL)}</link>`,
    `<description>${escapeXml(SITE_DESCRIPTION)}</description>`,
    '<language>zh-CN</language>',
    `<lastBuildDate>${new Date(lastBuildDate).toUTCString()}</lastBuildDate>`,
    ...items,
    '</channel>',
    '</rss>'
  ].join('')
})
