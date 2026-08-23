/**
 * 全站搜索索引。
 *
 * SSR: 直接读 Nuxt Content 集合(在 prerender/build 时段执行,Node 环境)
 * Client: 用同一个 Nuxt Content client API 直读(避免 server runtime API,
 *         因为 Cloudflare Pages worker runtime 不支持 better-sqlite3)
 *
 * 通过 useState 共享数据,避免每个页面重复 fetch。
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
 * SSR-safe lazy 搜索索引。Nuxt Content 在 SSR 与 client 用同一套 client API
 * (client 在浏览器直接请求 Nuxt Content 的静态 JSON),无需 server runtime。
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
        items.value = await fetchSearchIndexItems()
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
