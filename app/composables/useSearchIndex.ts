/**
 * 全站搜索索引:博客 / 项目 / Playbook / Skill / 精华帖。
 * 所有搜索入口(顶部 Cmd+K 弹窗、独立 /search 页)共用同一份 useAsyncData key,
 * 避免重复查询 Nuxt Content。
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

type RawBlog = { path: string, title: string, description?: string, date: string }
type RawProject = { title: string, description?: string, onlineUrl?: string, url: string, category?: string }
type RawHighlight = { title: string, description?: string, category: string, url: string }

export function matchKeyword(haystack: string, keyword: string) {
  const parts = keyword.toLowerCase().split(/\s+/).filter(Boolean)
  if (!parts.length) return true
  return parts.every(part => haystack.includes(part))
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

export async function useSearchIndex() {
  const { data: index } = await useAsyncData('search-index', async () => {
    const [blogs, projects, playbooks, skills, highlights] = await Promise.all([
      queryCollection('blog').select('path', 'title', 'description', 'date').all() as Promise<RawBlog[]>,
      queryCollection('projects').select('title', 'description', 'onlineUrl', 'url').all() as Promise<RawProject[]>,
      queryCollection('playbooks').select('title', 'description', 'onlineUrl', 'url').all() as Promise<RawProject[]>,
      queryCollection('skills').select('title', 'description', 'onlineUrl', 'url').all() as Promise<RawProject[]>,
      queryCollection('highlights').select('title', 'description', 'category', 'url').all() as Promise<RawHighlight[]>
    ])

    const items: SearchHit[] = [
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

    return items
  })

  return {
    items: computed(() => index.value ?? [])
  }
}
