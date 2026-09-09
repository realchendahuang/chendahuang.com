import { getDB } from '../utils/db'

/** 全站累计浏览/访客数(页脚展示)。直读 counters 单行;种子缺失时全表扫描兜底并回填。 */
export default defineEventHandler(async (event) => {
  const db = getDB(event)
  if (!db) {
    setResponseStatus(event, 503)
    return { ok: false, error: 'not_configured' }
  }

  const { results } = await db.prepare(
    'SELECT (SELECT value FROM counters WHERE key = \'pv\') AS pv, (SELECT value FROM counters WHERE key = \'uv\') AS uv'
  ).all<{ pv: number | null, uv: number | null }>()

  let pv = Number(results[0]?.pv)
  let uv = Number(results[0]?.uv)

  if (!pv || !uv) {
    // counters 未回填(老库/手工清过):全表扫描兜底,并写回种子
    const legacy = await db.prepare(
      'SELECT COUNT(*) AS pv, COUNT(DISTINCT sid) AS uv FROM pageviews'
    ).all<{ pv: number, uv: number }>()
    pv = Number(legacy.results[0]?.pv ?? 0)
    uv = Number(legacy.results[0]?.uv ?? 0)
    await db.batch([
      db.prepare('INSERT INTO counters (key, value) VALUES (\'pv\', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value').bind(pv),
      db.prepare('INSERT INTO counters (key, value) VALUES (\'uv\', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value').bind(uv)
    ]).catch(() => {})
  }

  setResponseHeader(event, 'cache-control', 'public, max-age=10')
  return { pv, uv }
})
