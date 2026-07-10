<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => {
  return queryCollection('index').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: '页面未找到',
    fatal: true
  })
}

useSeoMeta({
  title: page.value?.seo.title || page.value?.title,
  ogTitle: page.value?.seo.title || page.value?.title,
  description: page.value?.seo.description || page.value?.description,
  ogDescription: page.value?.seo.description || page.value?.description,
  ogUrl: toCanonicalUrl('/'),
  ogImage: toAbsoluteUrl('/avatar.jpg'),
  twitterTitle: page.value?.seo.title || page.value?.title,
  twitterDescription: page.value?.seo.description || page.value?.description,
  twitterImage: toAbsoluteUrl('/avatar.jpg')
})

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': SITE_NAME,
      'url': SITE_URL,
      'image': toAbsoluteUrl('/avatar.jpg'),
      'jobTitle': '独立开发者',
      'description': page.value?.seo.description || page.value?.description,
      'sameAs': [
        'https://x.com/realchendahuang',
        'https://github.com/realchendahuang'
      ]
    }).replaceAll('<', '\\u003c')
  }]
})
</script>

<template>
  <UPage v-if="page">
    <LandingHero :page />
    <UPageSection
      :ui="{
        container: 'pt-0! lg:grid lg:grid-cols-2 lg:gap-8'
      }"
    >
      <LandingAbout :page />
      <LandingWorkExperience :page />
    </UPageSection>
    <LandingXStream :page />
    <LandingBlog :page />
    <LandingTestimonials :page />
    <LandingFAQ :page />
  </UPage>
</template>
