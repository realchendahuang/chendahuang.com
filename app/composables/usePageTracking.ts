import { toCanonicalPath, isTrackablePath } from '~/utils/analytics'

const SESSION_KEY = 'chendahuang-analytics-sid'

/** 会话 id:sessionStorage 持久(tab 级唯一),免 cookie。dev 环境返回空串不上报。 */
function getSessionId(): string {
  if (import.meta.server) return ''
  try {
    let sid = sessionStorage.getItem(SESSION_KEY)
    if (!sid) {
      sid = crypto.randomUUID()
      sessionStorage.setItem(SESSION_KEY, sid)
    }
    return sid
  } catch {
    return ''
  }
}

function send(p: string, l: string) {
  const sid = getSessionId()
  if (!sid || !p || !l) return
  const payload = JSON.stringify({ p, l, sid })
  try {
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      navigator.sendBeacon('/api/track', new Blob([payload], { type: 'application/json' }))
    } else {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true
      }).catch(() => {})
    }
  } catch {
    // 统计失败静默,绝不拖累页面
  }
}

/** 全站访问埋点:页面加载 + SPA 路由切换各计一次(口径同 GA)。 */
export function usePageTracking() {
  if (import.meta.server) return

  const route = useRoute()
  const { locale } = useI18n()

  const track = () => {
    if (import.meta.dev) return
    const canonical = toCanonicalPath(route.path)
    if (canonical && isTrackablePath(canonical)) {
      send(canonical, locale.value)
    }
  }

  onMounted(track)
  watch(() => route.path, track)
}
