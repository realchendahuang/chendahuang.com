/**
 * 全站搜索索引接口。客户端按需请求,不进 SSR _payload.json。
 */
import { queryCollection } from '@nuxt/content/server'
import type { BlogCollectionItem, HighlightsCollectionItem, PlaybooksCollectionItem, ProjectsCollectionItem, SkillsCollectionItem } from '@nuxt/content'

type Hit = {
  title: string
  description?: string
  to: string
  section: string
  category?: string
  date?: string
}

export default defineEventHandler(async (event) => {
  const [blogs, projects, playbooks, skills, highlights] = await Promise.all([
    queryCollection(event, 'blog').select('path', 'title', 'description', 'date').order('date' as never, 'DESC').all() as unknown as Pick<BlogCollectionItem, 'path' | 'title' | 'description' | 'date'>[],
    queryCollection(event, 'projects').select('title', 'description', 'onlineUrl', 'url').order('date' as never, 'DESC').all() as unknown as Pick<ProjectsCollectionItem, 'title' | 'description' | 'onlineUrl' | 'url'>[],
    queryCollection(event, 'playbooks').select('title', 'description', 'onlineUrl', 'url').order('date' as never, 'DESC').all() as unknown as Pick<PlaybooksCollectionItem, 'title' | 'description' | 'onlineUrl' | 'url'>[],
    queryCollection(event, 'skills').select('title', 'description', 'onlineUrl', 'url').order('date' as never, 'DESC').all() as unknown as Pick<SkillsCollectionItem, 'title' | 'description' | 'onlineUrl' | 'url'>[],
    queryCollection(event, 'highlights').select('title', 'description', 'category', 'url').order('date' as never, 'DESC').all() as unknown as Pick<HighlightsCollectionItem, 'title' | 'description' | 'category' | 'url'>[]
  ])

  const items: Hit[] = [
    ...blogs.map(item => ({
      title: item.title,
      description: item.description,
      to: item.path,
      section: '博客',
      date: item.date
    })),
    ...projects.map(item => ({
      title: item.title,
      description: item.description,
      to: item.onlineUrl || item.url,
      section: '项目'
    })),
    ...playbooks.map(item => ({
      title: item.title,
      description: item.description,
      to: item.onlineUrl || item.url,
      section: 'Playbook'
    })),
    ...skills.map(item => ({
      title: item.title,
      description: item.description,
      to: item.onlineUrl || item.url,
      section: 'Skill'
    })),
    ...highlights.map(item => ({
      title: item.title,
      description: item.description,
      to: item.url,
      section: '精华帖',
      category: item.category
    }))
  ]

  setResponseHeader(event, 'cache-control', 'public, max-age=0, s-maxage=600')
  return { items }
})
