import type { NavigationMenuItem } from '@nuxt/ui'

export const navLinks: NavigationMenuItem[] = [{
  label: '首页',
  icon: 'i-lucide-home',
  to: '/'
}, {
  label: '项目',
  icon: 'i-lucide-box',
  to: '/projects'
}, {
  label: 'Playbook',
  icon: 'i-lucide-book',
  to: '/playbooks'
}, {
  label: 'Skill',
  icon: 'i-lucide-sparkles',
  to: '/skills'
}, {
  label: '博客',
  icon: 'i-lucide-file-text',
  to: '/blog'
}, {
  label: '关于',
  icon: 'i-lucide-user',
  to: '/about'
}]
