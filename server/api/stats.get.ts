import { getDB, getEnv } from '../utils/db'

const DAY = 86_400_000
// 看板按北京时间(UTC+8)分天,与站点主要受众一致;趋势 SQL 里同步用 '+8 hours' 偏移
const TZ_OFFSET = 8 * 3_600_000

/** 常量时间比较,避免 token 长度/内容侧信道。 */
function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return diff === 0
}

/** 私有统计看板数据。STATS_TOKEN 未设=公开;已设则需 ?k=<token>。 */
export default defineEventHandler(async (event) => {
  const env = getEnv(event)
  const expected = env?.STATS_TOKEN
  if (expected) {
    const k = getQuery(event).k
    if (typeof k !== 'string' || !safeEqual(k, expected)) {
      setResponseStatus(event, 401)
      return { error: 'invalid_token' }
    }
  }

  const db = getDB(event)
  if (!db) {
    setResponseStatus(event, 503)
    return { error: 'not_configured' }
  }

  const rawDays = Number(getQuery(event).days)
  const days = [7, 30, 90].includes(rawDays) ? rawDays : 30

  const now = Date.now()
  const todayStart = now - ((now + TZ_OFFSET) % DAY)
  const windowStart = now - days * DAY

  const sum = async (start: number) => {
    const { results } = await db.prepare(
      'SELECT COUNT(*) AS pv, COUNT(DISTINCT sid) AS uv FROM pageviews WHERE ts >= ?'
    ).bind(start).all<{ pv: number, uv: number }>()
    return { pv: Number(results[0]?.pv ?? 0), uv: Number(results[0]?.uv ?? 0) }
  }

  const [
    today, d7, d30, d90,
    trend, topPaths, topRefs, direct,
    topCountries, unknownCountry, languages
  ] = await Promise.all([
    sum(todayStart),
    sum(now - 7 * DAY),
    sum(now - 30 * DAY),
    sum(now - 90 * DAY),
    db.prepare(
      'SELECT date(ts / 1000, \'unixepoch\', \'+8 hours\') AS day, COUNT(*) AS pv, COUNT(DISTINCT sid) AS uv FROM pageviews WHERE ts >= ? GROUP BY day ORDER BY day ASC'
    ).bind(windowStart).all<{ day: string, pv: number, uv: number }>(),
    db.prepare(
      'SELECT path, COUNT(*) AS pv FROM pageviews WHERE ts >= ? GROUP BY path ORDER BY pv DESC LIMIT 30'
    ).bind(windowStart).all<{ path: string, pv: number }>(),
    db.prepare(
      'SELECT ref_host, COUNT(*) AS pv FROM pageviews WHERE ts >= ? AND length(ref_host) > 0 GROUP BY ref_host ORDER BY pv DESC LIMIT 12'
    ).bind(windowStart).all<{ ref_host: string, pv: number }>(),
    db.prepare(
      'SELECT COUNT(*) AS pv FROM pageviews WHERE ts >= ? AND length(ref_host) = 0'
    ).bind(windowStart).all<{ pv: number }>(),
    db.prepare(
      'SELECT country, COUNT(*) AS pv FROM pageviews WHERE ts >= ? AND length(country) > 0 GROUP BY country ORDER BY pv DESC LIMIT 20'
    ).bind(windowStart).all<{ country: string, pv: number }>(),
    db.prepare(
      'SELECT COUNT(*) AS pv FROM pageviews WHERE ts >= ? AND length(country) = 0'
    ).bind(windowStart).all<{ pv: number }>(),
    db.prepare(
      'SELECT locale, COUNT(*) AS pv, COUNT(DISTINCT sid) AS uv FROM pageviews WHERE ts >= ? GROUP BY locale ORDER BY pv DESC'
    ).bind(windowStart).all<{ locale: string, pv: number, uv: number }>()
  ])

  setResponseHeader(event, 'cache-control', 'no-store')
  return {
    days,
    generatedAt: now,
    summary: { today, d7, d30, d90 },
    trend: trend.results.map(row => ({ day: String(row.day), pv: Number(row.pv), uv: Number(row.uv) })),
    topPaths: topPaths.results.map(row => ({ path: String(row.path), pv: Number(row.pv) })),
    topRefs: topRefs.results.map(row => ({ host: String(row.ref_host), pv: Number(row.pv) })),
    directPv: Number(direct.results[0]?.pv ?? 0),
    topCountries: topCountries.results.map(row => ({ country: String(row.country), pv: Number(row.pv) })),
    unknownCountryPv: Number(unknownCountry.results[0]?.pv ?? 0),
    languages: languages.results.map(row => ({ locale: String(row.locale), pv: Number(row.pv), uv: Number(row.uv) }))
  }
})
