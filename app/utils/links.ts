import type { NavigationMenuItem } from '@nuxt/ui'

/**
 * 导航链接。标签走 i18n,统一为两字中文 / 对应英文。
 * 搜索已合并为弹窗,不再作为导航项。
 *
 * 必须返回 computed:AppHeader 挂在 layout 里,切换语言时 layout 不会
 * 重新执行 setup,普通数组会把首次渲染的语言"冻住",顶栏菜单不跟随切换。
 */
export function useNavLinks(): ComputedRef<NavigationMenuItem[]> {
  const { t } = useI18n()

  return computed(() => [{
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
  }, {
    label: t('nav.mirror'),
    icon: 'i-lucide-refresh-cw',
    to: '/mirror'
  }])
}
