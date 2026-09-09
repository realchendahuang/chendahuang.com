import { getDB } from '../utils/db'
import { toCanonicalPath, isTrackablePath } from '../../app/utils/analytics'
import { SITE_LOCALES } from '../../app/utils/locale'

const BOT_RE = /bot|crawl|spider|slurp|mediapartners|curl|wget|python-requests|scrapy|headless|preview|pagespeed|lighthouse|pingdom|uptime|monitor|GPTBot|ClaudeBot|Claude-Web|anthropic|bytespider|ccbot|facebookexternalhit|Google-Extended|GoogleOther|PerplexityBot|Applebot|ChatGPT-User|cohere-ai|meta-external|ia_archiver|YandexImage|BaiduImage/i

const SID_RE = /^[A-Za-z0-9_-]{8,64}$/

/** 站点访问埋点:body { p: 规范化路径, l: locale, sid: 会话 id }。失败静默,绝不拖累页面。 */
export default defineEventHandler(async (event) => {
  const db = getDB(event)
  if (!db) {
    setResponseStatus(event, 204)
    return null
  }

  const ua = getRequestHeader(event, 'user-agent') ?? ''
  // Cloudflare 已验证机器人会带 cf-verified-bot: true(免费版即提供),比 UA 黑名单更可靠
  const isVerifiedBot = getRequestHeader(event, 'cf-verified-bot') === 'true'
  if (isVerifiedBot || BOT_RE.test(ua)) {
    setResponseStatus(event, 204)
    return null
  }

  const body = await readBody(event).catch(() => null)
  const rawPath = typeof body?.p === 'string' ? body.p.slice(0, 300) : ''
  const locale = typeof body?.l === 'string' && SITE_LOCALES.some(item => item.code === body.l) ? body.l : ''
  const sid = typeof body?.sid === 'string' ? body.sid : ''

  const path = toCanonicalPath(rawPath)
  if (!path || path.length > 200 || !isTrackablePath(path) || !SID_RE.test(sid) || !locale) {
    setResponseStatus(event, 204)
    return null
  }

  // 站内导航的 Referer 同域,视为直接访问,不计入来源
  let refHost = ''
  const referer = getRequestHeader(event, 'referer') ?? ''
  try {
    const host = new URL(referer).host
    if (host && host !== 'chendahuang.com' && !host.endsWith('.chendahuang.com')) {
      refHost = host.slice(0, 200)
    }
  } catch { /* 空来源 = 直接访问 */ }

  const country = (getRequestHeader(event, 'cf-ipcountry') ?? '').slice(0, 8)

  await db.prepare(
    'INSERT INTO pageviews (ts, path, locale, ref_host, country, sid) VALUES (?, ?, ?, ?, ?, ?)'
  ).bind(Date.now(), path, locale, refHost, country, sid).run().catch(() => {})

  setResponseStatus(event, 204)
  return null
})
