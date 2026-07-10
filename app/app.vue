<script setup lang="ts">
const colorMode = useColorMode()
const route = useRoute()

const color = computed(() => colorMode.value === 'dark' ? '#111318' : '#ffffff')
const canonicalUrl = computed(() => toCanonicalUrl(route.path))

useHead(() => ({
  titleTemplate: (title) => {
    if (!title) return SITE_NAME
    return title.includes(SITE_NAME) ? title : `${title} · ${SITE_NAME}`
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'canonical', href: canonicalUrl },
    { rel: 'alternate', type: 'application/rss+xml', title: `${SITE_NAME} 的博客`, href: toAbsoluteUrl('/rss.xml') }
  ],
  htmlAttrs: {
    lang: 'zh-CN'
  }
}))

useSeoMeta({
  ogSiteName: SITE_NAME,
  twitterCard: 'summary_large_image',
  twitterCreator: '@realchendahuang'
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <UMain class="relative">
        <NuxtPage />
      </UMain>
    </NuxtLayout>
  </UApp>
</template>
