/**
 * 全站搜索索引(客户端按需 fetch,不进 SSR _payload.json)。
 * Cmd+K 弹窗与 /search 页共用。
 */

export type SearchSection = '博客' | '项目' | 'Playbook' | 'Skill' | '精华帖'

export type SearchHit = {
  title: string
  description?: string
  to: string
  section: SearchSection
  category?: string
  date?: string
}

export function matchKeyword(haystack: string, keyword: string) {
  const parts = keyword.toLowerCase().split(/\s+/).filter(Boolean)
  if (!parts.length) return true
  const lowerHaystack = haystack.toLowerCase()
  return parts.every(part => lowerHaystack.includes(part))
}

export function buildHaystack(hit: Pick<SearchHit, 'title' | 'description' | 'section' | 'category'>) {
  return `${hit.title} ${hit.description ?? ''} ${hit.category ?? ''} ${hit.section}`.toLowerCase()
}

export function filterHits<T extends SearchHit>(hits: T[], keyword: string, limit?: number) {
  const trimmed = keyword.trim().toLowerCase()
  const filtered = trimmed
    ? hits.filter(item => matchKeyword(buildHaystack(item), trimmed))
    : hits
  return typeof limit === 'number' ? filtered.slice(0, limit) : filtered
}

export function useSearchIndex() {
  // SSR 时也走 fetch,这样 /search 页直接渲染结果;
  // _payload.json 里不再带索引数据(API 响应被 client 单独缓存)。
  const { data, pending, error } = useFetch<{ items: SearchHit[] }>('/api/search-index', {
    key: 'search-index',
    server: true,
    lazy: false,
    default: () => ({ items: [] })
  })

  return {
    items: computed(() => data.value?.items ?? []),
    pending,
    error
  }
}
