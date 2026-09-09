import { defineTask } from 'nitropack/runtime'

interface HealthCheckResult {
  path: string
  ok: boolean
  ms: number
}

interface HealthTaskContext {
  cloudflare?: { env?: { DB?: { prepare: (sql: string) => { bind: (...args: unknown[]) => { run: () => Promise<unknown> } } } } }
}

/** 每小时自检:打生产域名关键路径,结果落 D1(看板展示,保留 90 天)。 */
export default defineTask({
  meta: { name: 'health:check' },
  async run({ context }) {
    const db = (context as HealthTaskContext | undefined)?.cloudflare?.env?.DB
    const base = 'https://chendahuang.com'
    const paths = ['/', '/api/counter', '/zh-Hant/mirror/']

    const checks: HealthCheckResult[] = []
    for (const path of paths) {
      const t0 = Date.now()
      try {
        const res = await fetch(base + path, {
          headers: { 'user-agent': 'chendahuang-health/1.0' }
        })
        checks.push({ path, ok: res.ok, ms: Date.now() - t0 })
        await res.arrayBuffer().catch(() => {})
      } catch {
        checks.push({ path, ok: false, ms: Date.now() - t0 })
      }
    }

    const ok = checks.every(c => c.ok)
    if (db) {
      await db.prepare('INSERT INTO health_checks (ts, ok, details) VALUES (?, ?, ?)')
        .bind(Date.now(), ok ? 1 : 0, JSON.stringify(checks)).run().catch(() => {})
      await db.prepare('DELETE FROM health_checks WHERE ts < ?')
        .bind(Date.now() - 90 * 86_400_000).run().catch(() => {})
    }

    return { result: { ok, checks } }
  }
})
