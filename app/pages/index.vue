<script setup lang="ts">
const { locale, t } = useI18n()

const { data: page } = await useAsyncData(`index:${locale.value}`, () => {
  return queryCollection('index').where('locale', '=', locale.value).first()
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
  twitterTitle: page.value?.seo.title || page.value?.title,
  twitterDescription: page.value?.seo.description || page.value?.description
})

defineOgImage('Portfolio', {
  headline: t('post.indieDev'),
  title: t('site.name'),
  description: page.value?.seo?.description || page.value?.description
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
    <LandingSelectedWork />
    <LandingXStream
      v-if="page.highlights"
      :page
    />
    <LandingBlog :page />
    <LandingAboutSection />
  </UPage>
</template>
