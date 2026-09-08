import type { H3Event } from 'h3'
import type { AnalyticsEnv } from '../types/cloudflare'

/** 取 Pages worker 运行时注入的 env。本地 dev / 未绑定 D1 时为 null,统计接口全部静默降级。 */
export function getEnv(event: H3Event): AnalyticsEnv | null {
  // event.context.cloudflare 未由 nitro 声明类型,此处显式收窄,避免依赖生成的类型。
  const ctx = event.context as unknown as { cloudflare?: { env?: AnalyticsEnv } }
  return ctx.cloudflare?.env ?? null
}

/** 取 D1 绑定,未配置返回 null。 */
export function getDB(event: H3Event) {
  return getEnv(event)?.DB ?? null
}
