export const SITE_URL = 'https://chendahuang.com'

export const SITE_NAME = '陈大黄'

export const SITE_DESCRIPTION = '前 AI 产品经理，现在做独立开发。折腾 AI 效率工具、Cloudflare 和高效语言学习，把踩过的坑整理成工具和实战手册。'

export const toCanonicalUrl = (path = '/') => {
  const cleanPath = path.split('?')[0]?.split('#')[0] || '/'
  const normalizedPath = cleanPath === '/'
    ? '/'
    : /\.[a-z0-9]+$/i.test(cleanPath)
      ? cleanPath
      : `${cleanPath.replace(/\/+$/, '')}/`

  return new URL(normalizedPath, SITE_URL).toString()
}

export const toAbsoluteUrl = (url: string) => new URL(url, SITE_URL).toString()

export const toIsoDate = (date: string | Date) => new Date(date).toISOString()

export const formatDisplayDate = (date: string | Date) => {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(date))
}

export const formatShortDate = (date: string | Date) => {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'UTC'
  }).format(new Date(date)).replaceAll('/', '.')
}

export const escapeXml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll('\'', '&apos;')
