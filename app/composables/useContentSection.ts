/**
 * 统一封装 landing section 的取数逻辑。
 * 职责:取 collection → select 字段 → order → limit → 返回 ready-to-render 视图模型。
 *
 * Section 组件只声明「我要 N 条某类内容的视图」,
 * 不再各自手写 queryCollection().select().order().limit()。
 */
import type { BlogSummary, HighlightSummary, ProjectSummary } from '~/types/content'

export type SortOrder = 'DESC' | 'ASC'
export type HeatSort = (a: { likes?: number, bookmarks?: number, reposts?: number, views?: number, date: string }, b: { likes?: number, bookmarks?: number, reposts?: number, views?: number, date: string }) => number

const heatSort: HeatSort = (a, b) => {
  const scoreA = (a.likes ?? 0) * 2 + (a.bookmarks ?? 0) * 3 + (a.reposts ?? 0)
  const scoreB = (b.likes ?? 0) * 2 + (b.bookmarks ?? 0) * 3 + (b.reposts ?? 0)
  if (scoreB !== scoreA) return scoreB - scoreA
  return new Date(b.date).getTime() - new Date(a.date).getTime()
}

export type ContentSectionOptions<T> = {
  /** collection key */
  collection: 'blog' | 'highlights' | 'projects' | 'playbooks' | 'skills'
  /** select 字段列表 */
  select: string[]
  /** order by */
  order?: { field: string, direction: SortOrder }
  /** limit */
  limit?: number
  /** 自定义过滤(在 limit 之前执行) */
  filter?: (item: T) => boolean
  /** 自定义排序:传一个函数就完全覆盖默认的 date DESC */
  sort?: (items: T[]) => T[]
}

export function useContentSection<T>(key: string, options: ContentSectionOptions<T>) {
  const { collection, select, order, limit, filter, sort } = options
  const { locale } = useI18n()

  return useAsyncData(`section:${key}:${locale.value}`, async () => {
    const items = await queryCollection(collection)
      .where('locale', '=', locale.value)
      .select(...select as never[])
      .all() as unknown as T[]

    let result = items

    if (filter) result = result.filter(filter)

    if (sort) {
      result = sort(result)
    } else if (order) {
      const dir = order.direction === 'ASC' ? 1 : -1
      result = [...result].sort((a: unknown, b: unknown) => {
        const av = (a as Record<string, unknown>)[order.field]
        const bv = (b as Record<string, unknown>)[order.field]
        const at = av ? new Date(String(av)).getTime() : 0
        const bt = bv ? new Date(String(bv)).getTime() : 0
        return (at - bt) * dir
      })
    }

    return typeof limit === 'number' ? result.slice(0, limit) : result
  })
}

/** 高亮帖专用:按「热度 = likes*2 + bookmarks*3 + reposts」排序。 */
export const sortHighlightsByHeat = <T extends HighlightSummary>(items: T[]) =>
  [...items].sort(heatSort)

/** 项目按时间倒序(常用快捷方式)。 */
export const sortProjectsByDate = <T extends ProjectSummary>(items: T[]) =>
  [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

/** 博客按时间倒序 + 置顶优先(常用快捷方式)。 */
export const sortBlogsByDatePinnedFirst = <T extends BlogSummary>(items: T[]) =>
  [...items].sort((a, b) => {
    if (Number(b.pinned) !== Number(a.pinned)) return Number(b.pinned) - Number(a.pinned)
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
