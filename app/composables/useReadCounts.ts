import { toCanonicalPath } from '~/utils/analytics'

/** 批量拉取内容阅读数(17 语言已聚合到同一 canonical path)。onMounted 后渲染,避免 SSR 空数据抖动。 */
export function useReadCounts(paths: MaybeRefOrGetter<string[]>) {
  const counts = ref<Record<string, number>>({})
  const ready = ref(false)

  const load = async () => {
    const list = [...new Set(
      toValue(paths)
        .map(p => toCanonicalPath(p))
        .filter((p): p is string => Boolean(p))
    )]
    if (!list.length) {
      ready.value = true
      return
    }
    try {
      const res = await fetch(`/api/views?paths=${encodeURIComponent(list.join(','))}`)
      if (res.ok) {
        counts.value = await res.json()
      }
    } catch {
      // 统计失败静默
    }
    ready.value = true
  }

  onMounted(load)
  return { counts, ready }
}
