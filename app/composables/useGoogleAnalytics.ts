/**
 * Google Analytics 4 (GA4) 接入。
 * 未配置 gaId(环境变量 NUXT_PUBLIC_GA_ID)时完全静默,不加载任何脚本。
 * 意见征求模式 v2:EEA/英国/瑞士默认拒绝分析 Cookie(GA 走无 Cookie 衡量 + 行为建模),
 * 其他地区默认允许;全站无广告投放,ad_* 一律拒绝。私有看板 /stats 不计入 GA。
 */

/** EEA 27 国 + 冰岛/列支敦士登/挪威 + 英国 + 瑞士 */
const EEA_REGIONS = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'IS', 'LI', 'NO', 'GB', 'CH']

/** consent 默认值必须在 gtag.js 加载前同步设置 */
const CONSENT_SCRIPT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'},{region:${JSON.stringify(EEA_REGIONS)}});
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
