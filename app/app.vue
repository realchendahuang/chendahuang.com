<script setup lang="ts">
const colorMode = useColorMode()
const route = useRoute()
const { locale, t } = useI18n()

const color = computed(() => colorMode.value === 'dark' ? '#111318' : '#ffffff')
const canonicalUrl = computed(() => toCanonicalUrl(route.path))
const siteName = computed(() => t('site.name'))

useHead(() => ({
  titleTemplate: (title) => {
    if (!title) return siteName.value
    return title.includes(siteName.value) ? title : `${title} · ${siteName.value}`
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/site-icon.svg?v=chen-20260711' },
    { rel: 'icon', type: 'image/png', sizes: '64x64', href: '/favicon.png?v=chen-20260711' },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=chen-20260711' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png?v=chen-20260711' },
    { rel: 'canonical', href: canonicalUrl },
    { rel: 'alternate', type: 'application/rss+xml', title: `${siteName.value} 的博客`, href: toAbsoluteUrl('/rss.xml') }
  ],
  htmlAttrs: {
    lang: locale.value === 'en' ? 'en' : 'zh-CN'
  }
}))

useSeoMeta({
  ogSiteName: siteName,
  ogLocale: () => locale.value === 'en' ? 'en_US' : 'zh_CN',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterSite: '@realchendahuang',
  twitterCreator: '@realchendahuang'
})
</script>

<template>
  <MotionConfig reduced-motion="user">
    <UApp>
      <a
        href="#main-content"
        class="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-default px-4 py-2 text-sm font-medium text-highlighted shadow-lg transition-transform focus:translate-y-0"
      >
        {{ t('a11y.skipToContent') }}
      </a>
      <NuxtLayout>
        <UMain
          id="main-content"
          class="relative"
        >
          <NuxtPage />
        </UMain>
      </NuxtLayout>
    </UApp>
  </MotionConfig>
</template>
