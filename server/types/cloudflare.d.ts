import type { D1Database } from '@cloudflare/workers-types'

/**
 * Cloudflare Pages worker 运行时注入的 env(Pages 控制台绑定,不在仓库内)。
 * - DB: D1 数据库绑定(变量名 DB,指向 chendahuang-analytics 库)
 * - STATS_TOKEN: 可选,锁定 /stats 看板;不设则该看板公开
 */
export interface AnalyticsEnv {
  DB?: D1Database
  STATS_TOKEN?: string
}
