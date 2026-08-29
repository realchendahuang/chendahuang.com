/**
 * 站点 locale 单一事实源。
 * nuxt.config(i18n 配置/路由生成)、app.vue(html lang/og:locale)、
 * error.vue、sitemap 都从这里取,新增语言只改这一处。
 */
export const SITE_LOCALES = [
  { code: 'zh', language: 'zh-CN', ogLocale: 'zh_CN', name: '中文', dir: 'ltr' },
  { code: 'en', language: 'en', ogLocale: 'en_US', name: 'English', dir: 'ltr' },
  { code: 'ja', language: 'ja', ogLocale: 'ja_JP', name: '日本語', dir: 'ltr' },
  { code: 'es', language: 'es', ogLocale: 'es_ES', name: 'Español', dir: 'ltr' },
  { code: 'pt', language: 'pt-BR', ogLocale: 'pt_BR', name: 'Português', dir: 'ltr' },
  { code: 'fr', language: 'fr', ogLocale: 'fr_FR', name: 'Français', dir: 'ltr' },
  { code: 'de', language: 'de', ogLocale: 'de_DE', name: 'Deutsch', dir: 'ltr' },
  { code: 'ar', language: 'ar', ogLocale: 'ar_AR', name: 'العربية', dir: 'rtl' }
] as const

export type SiteLocaleCode = (typeof SITE_LOCALES)[number]['code']

export const DEFAULT_LOCALE: SiteLocaleCode = 'zh'

export function getLocaleMeta(code: string) {
  return SITE_LOCALES.find(l => l.code === code) ?? SITE_LOCALES[0]
}
