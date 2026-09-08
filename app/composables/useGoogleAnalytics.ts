/**
 * Google Analytics 4 (GA4) 接入。
 * 未配置 gaId(环境变量 NUXT_PUBLIC_GA_ID)时完全静默,不加载任何脚本。
 *
 * 意见征求模式 v2(严格 opt-in):默认全域拒绝(analytics + ads),
 * 由 CookieConsent 横幅在用户选择后 gtag('consent','update') 放行;
 * 拒绝/未选择时 GA 走无 Cookie 衡量 + 行为建模。私有看板 /stats 不计入 GA。
 */

/** consent 默认值必须在 gtag.js 加载前同步设置;wait_for_update 给横幅交互留缓冲 */
const CONSENT_SCRIPT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
gtag('js',new Date());`

export function useGoogleAnalytics() {
  const config = useRuntimeConfig()
  const gaId = (config.public.gaId as string) || ''
  if (!gaId) return

  useHead({
    script: [
      { innerHTML: CONSENT_SCRIPT },
      { src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`, async: true }
    ]
  })

  const router = useRouter()
  const route = useRoute()

  const track = (path: string) => {
    if (import.meta.server) return
    const w = window as unknown as { gtag?: (...args: unknown[]) => void }
    if (typeof w.gtag !== 'function') return
    w.gtag('config', gaId, { page_path: path })
  }

  onMounted(() => {
    if (!route.path.startsWith('/stats')) track(route.fullPath)
  })

  router.afterEach((to) => {
    if (to.path.startsWith('/stats')) return
    track(to.fullPath)
  })
}
