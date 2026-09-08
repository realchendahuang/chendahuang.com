/**
 * Google Analytics 4 (GA4) 接入。
 * 未配置 gaId(环境变量 NUXT_PUBLIC_GA_ID)时完全静默,不加载任何脚本。
 * 私有看板 /stats 不计入 GA。
 */
export function useGoogleAnalytics() {
  const config = useRuntimeConfig()
  const gaId = (config.public.gaId as string) || ''
  if (!gaId) return

  useHead({
    script: [
      { src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`, async: true },
      { innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());` }
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
