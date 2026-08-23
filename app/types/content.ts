/**
 * 各 collection 在「列表/卡片视图」里使用的最小字段集合。
 * 集中定义以避免在 composable 里写大量 as any 转换;
 * 同时 select() 字段变更时 TS 能报所有调用点。
 */

export type BlogSummary = {
  path: string
  title: string
  description?: string
  date: string
  minRead?: number
  tags?: string[]
  pinned?: boolean
  original?: boolean
  image?: string
  author?: {
    name: string
    avatar?: { src: string, alt: string }
  }
}

export type ProjectSummary = {
  title: string
  description?: string
  url: string
  onlineUrl?: string
  image?: string
  imageAlt?: string
  icon?: string
  color?: string
  tags?: string[]
  type?: string
  date: string
  status?: 'ongoing' | 'stable' | 'archived'
  stars?: number
}

export type PlaybookSummary = ProjectSummary

export type SkillSummary = ProjectSummary & {
  install?: string
}

export type HighlightSummary = {
  title: string
  description?: string
  category: string
  date: string
  likes: number
  bookmarks: number
  reposts: number
  views: number
  url: string
  content?: string
}
