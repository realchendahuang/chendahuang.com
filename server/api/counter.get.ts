import { getDB } from '../utils/db'

/** 全站累计浏览/访客数(页脚展示)。 */
export default defineEventHandler(async (event) => {
  const db = getDB(event)
  if (!db) {
    setResponseStatus(event, 503)
    return { ok: false, error: 'not_configured' }
  }

  const { results } = await db.prepare(
    'SELECT COUNT(*) AS pv, COUNT(DISTINCT sid) AS uv FROM pageviews'
  ).all<{ pv: number, uv: number }>()

  setResponseHeader(event, 'cache-control', 'public, max-age=10')
  return { pv: Number(results[0]?.pv ?? 0), uv: Number(results[0]?.uv ?? 0) }
})
