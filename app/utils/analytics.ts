import { SITE_LOCALES, DEFAULT_LOCALE } from './locale'

/** locale 前缀按长度倒序,保证 zh-Hant 先于 zh 匹配。 */
const LOCALE_PREFIXES = SITE_LOCALES
  .map(item => item.code)
  .sort((a, b) => b.length - a.length)

/** 把带语言前缀的 URL 路径规范化为内容路径:同一内容的 17 语言版本聚合到同一路径。 */
export function toCanonicalPath(path: string): string | null {
  if (typeof path !== 'string') return null
  if (!path.startsWith('/')) return null

  let normalized = path
  for (const code of LOCALE_PREFIXES) {
    if (code === DEFAULT_LOCALE) continue
    if (normalized === `/${code}`) {
      normalized = '/'
      break
    }
    if (normalized.startsWith(`/${code}/`)) {
      normalized = normalized.slice(code.length + 1)
      break
    }
  }

  if (normalized.length > 1 && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1)
  }
  return normalized
}

/** 系统/API/私密路径不参与统计。 */
export function isTrackablePath(path: string): boolean {
  if (!path) return false
  if (path.startsWith('/_')) return false
  if (path.startsWith('/api')) return false
  if (path.startsWith('/stats')) return false
  if (path.startsWith('/rss')) return false
  if (path.startsWith('/sitemap')) return false
  if (path.startsWith('/llms')) return false
  if (path.startsWith('/raw/')) return false
  if (path.startsWith('/dump.')) return false
  return true
}
