export const HIGHLIGHT_CATEGORIES = [
  {
    id: 'cloudflare',
    label: 'Cloudflare',
    description: '边缘云、Workers、免费基建与部署经验'
  },
  {
    id: 'tools',
    label: '工具清单',
    description: '软件、插件、硬件与效率工具推荐'
  },
  {
    id: 'ai',
    label: 'AI 思考',
    description: '模型、Agent、知识管理与协作方法'
  },
  {
    id: 'product',
    label: '产品开发',
    description: '独立开发、技术栈与产品判断'
  },
  {
    id: 'opc',
    label: 'OPC 创业',
    description: '一人公司、注册园区与经营实操'
  },
  {
    id: 'growth',
    label: '内容增长',
    description: 'X 运营、发帖方法与涨粉复盘'
  },
  {
    id: 'essay',
    label: '人文随笔',
    description: '价值、幽默与非工具视角的观察'
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

export function formatMonthLabel(date: Date | string | number) {
  const value = new Date(date)
  if (Number.isNaN(value.getTime())) {
    return ''
  }
  return `${value.getFullYear()} 年 ${value.getMonth() + 1} 月`
}
