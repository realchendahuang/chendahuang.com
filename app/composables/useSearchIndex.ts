/**
 * 全站搜索索引。
 *
 * 默认 lazy,只有真正进入搜索页面或 modal 打开时才取数据。
 * SSR 路径在 /search 页用 useAsyncData;其余地方不预取。
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

/**
 * SSR 直接读 Nuxt Content 集合。
 * 单独抽出来好让 /search 页和 /api/search-index 共用同一份数据。
 */
export async function fetchSearchIndexItems(): Promise<SearchHit[]> {
  const [blogs, projects, playbooks, skills, highlights] = await Promise.all([
    queryCollection('blog').select('path', 'title', 'description', 'date').all() as unknown as Promise<Array<{ path: string, title: string, description?: string, date: string }>>,
    queryCollection('projects').select('title', 'description', 'onlineUrl', 'url').all() as unknown as Promise<Array<{ title: string, description?: string, onlineUrl?: string, url: string }>>,
    queryCollection('playbooks').select('title', 'description', 'onlineUrl', 'url').all() as unknown as Promise<Array<{ title: string, description?: string, onlineUrl?: string, url: string }>>,
    queryCollection('skills').select('title', 'description', 'onlineUrl', 'url').all() as unknown as Promise<Array<{ title: string, description?: string, onlineUrl?: string, url: string }>>,
    queryCollection('highlights').select('title', 'description', 'category', 'url').all() as unknown as Promise<Array<{ title: string, description?: string, category: string, url: string }>>
  ])

  return [
    ...blogs.map(item => ({
      title: item.title,
      description: item.description,
      to: item.path,
      section: '博客' as const,
      date: item.date
    })),
    ...projects.map(item => ({
      title: item.title,
      description: item.description,
      to: item.onlineUrl || item.url,
      section: '项目' as const
    })),
    ...playbooks.map(item => ({
      title: item.title,
      description: item.description,
      to: item.onlineUrl || item.url,
      section: 'Playbook' as const
    })),
    ...skills.map(item => ({
      title: item.title,
      description: item.description,
      to: item.onlineUrl || item.url,
      section: 'Skill' as const
    })),
    ...highlights.map(item => ({
      title: item.title,
      description: item.description,
      to: item.url,
      section: '精华帖' as const,
      category: item.category
    }))
  ]
}

/**
 * SSR-safe lazy 搜索索引。
 * - 在 setup 里调用:返回空数组,index 仍然有正确类型
 * - 调用 ensureLoaded() 后立即取数据(SSR 直查 / client 走 fetch)
 */
export function useSearchIndex() {
  const items = useState<SearchHit[]>('search-index', () => [])
  const pending = ref(false)
  const error = ref<unknown>(null)
  let inflight: Promise<void> | null = null

  const ensureLoaded = async () => {
    if (items.value.length || inflight) return inflight
    inflight = (async () => {
      pending.value = true
      try {
        if (import.meta.server) {
          items.value = await fetchSearchIndexItems()
        } else {
          const data = await $fetch<{ items: SearchHit[] }>('/api/search-index')
          items.value = data.items
        }
      } catch (e) {
        error.value = e
      } finally {
        pending.value = false
      }
    })()
    return inflight
  }

  return { items, pending, error, ensureLoaded }
}
