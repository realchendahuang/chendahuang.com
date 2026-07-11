export const SITE_URL = 'https://chendahuang.com'

export const SITE_NAME = '陈大黄'

export const SITE_DESCRIPTION = '陈大黄的个人作品与内容陈列站。收录项目、Playbook、Agent Skill、文章和帖子。'

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
