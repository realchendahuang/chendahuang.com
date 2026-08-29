export const HIGHLIGHT_CATEGORIES = [
  {
    id: 'cloudflare',
    label: 'Cloudflare',
    description: '边缘云、Workers、免费基建与部署经验',
    color: '#f6821f'
  },
  {
    id: 'tools',
    label: '工具清单',
    description: '软件、插件、硬件与效率工具推荐',
    color: '#8b5cf6'
  },
  {
    id: 'ai',
    label: 'AI 思考',
    description: '模型、Agent、知识管理与协作方法',
    color: '#00dc82'
  },
  {
    id: 'product',
    label: '产品开发',
    description: '独立开发、技术栈与产品判断',
    color: '#3b82f6'
  },
  {
    id: 'opc',
    label: 'OPC 创业',
    description: '一人公司、注册园区与经营实操',
    color: '#f59e0b'
  },
  {
    id: 'growth',
    label: '内容增长',
    description: 'X 运营、发帖方法与涨粉复盘',
    color: '#ec4899'
  },
  {
    id: 'essay',
    label: '人文随笔',
    description: '价值、幽默与非工具视角的观察',
    color: '#64748b'
  }
] as const

export type HighlightCategoryId = (typeof HIGHLIGHT_CATEGORIES)[number]['id']

export const HIGHLIGHT_VIEW_MODES = [
  {
    id: 'theme',
    label: '按主题',
    description: '按分类分组浏览'
  },
  {
    id: 'timeline',
    label: '时间线',
    description: '按发布时间倒序'
  },
  {
    id: 'heat',
    label: '按热度',
    description: '按点赞与互动排序'
  }
] as const

export type HighlightViewMode = (typeof HIGHLIGHT_VIEW_MODES)[number]['id']

export function getHighlightCategory(id?: string | null) {
  return HIGHLIGHT_CATEGORIES.find(item => item.id === id)
}

/** 分类显示名(走 i18n)。 */
export function getHighlightCategoryLabel(id: string, t: (key: string) => string) {
  return t(`highlightsCategories.${id}`)
}

/** 分类描述(走 i18n)。 */
export function getHighlightCategoryDescription(id: string, t: (key: string) => string) {
  return t(`highlightsCategories.${id}Desc`)
}

/** 视图模式显示名(走 i18n)。 */
export function getHighlightViewModeLabel(id: string, t: (key: string) => string) {
  return t(`highlightViewModes.${id}`)
}

/** 视图模式描述(走 i18n)。 */
export function getHighlightViewModeDescription(id: string, t: (key: string) => string) {
  return t(`highlightViewModes.${id}Desc`)
}

export function formatCount(n?: number) {
  const value = n ?? 0
  if (value >= 10000) {
    return `${(value / 10000).toFixed(value % 10000 === 0 ? 0 : 1)}w`
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`
  }
  return String(value)
}
