import { getDB } from '../utils/db'
import { toCanonicalPath } from '../../app/utils/analytics'

/** 内容阅读数:?paths=/blog/a,/blog/b → { path: pv }。同一内容 17 语言已聚合。 */
export default defineEventHandler(async (event) => {
  const db = getDB(event)
  const raw = getQuery(event).paths
  const paths = (typeof raw === 'string' ? raw.split(',') : [])
    .map(p => toCanonicalPath(p))
    .filter((p): p is string => Boolean(p))
    .slice(0, 100)

  if (!db || paths.length === 0) {
    return {}
  }

  const placeholders = paths.map(() => '?').join(', ')
  const { results } = await db.prepare(
    `SELECT path, COUNT(*) AS pv FROM pageviews WHERE path IN (${placeholders}) GROUP BY path`
  ).bind(...paths).all<{ path: string, pv: number }>()

  const out: Record<string, number> = {}
  for (const row of results) {
    out[String(row.path)] = Number(row.pv)
  }

  setResponseHeader(event, 'cache-control', 'public, max-age=60')
  return out
})
