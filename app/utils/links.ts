import type { NavigationMenuItem } from '@nuxt/ui'

/**
 * 导航链接。标签走 i18n,统一为两字中文 / 对应英文。
 * 搜索已合并为弹窗,不再作为导航项。
 */
export function useNavLinks(): NavigationMenuItem[] {
  const { t } = useI18n()

  return [{
    label: t('nav.home'),
    icon: 'i-lucide-home',
    to: '/'
  }, {
    label: t('nav.projects'),
    icon: 'i-lucide-box',
    to: '/projects'
  }, {
    label: t('nav.playbooks'),
    icon: 'i-lucide-book',
    to: '/playbooks'
  }, {
    label: t('nav.skills'),
    icon: 'i-lucide-sparkles',
    to: '/skills'
  }, {
    label: t('nav.blog'),
    icon: 'i-lucide-file-text',
    to: '/blog'
  }, {
    label: t('nav.highlights'),
    icon: 'i-lucide-bookmark',
    to: '/highlights'
  }]
}
