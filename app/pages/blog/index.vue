<script setup lang="ts">
const { data: page } = await useAsyncData('blog-page', () => {
  return queryCollection('pages').path('/blog').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: '页面未找到',
    fatal: true
  })
}

const { data: posts } = await useAsyncData('blogs', () =>
  queryCollection('blog').order('date', 'DESC').all()
)

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogUrl: toCanonicalUrl('/blog'),
  twitterTitle: title,
  twitterDescription: description
})

defineOgImage('Portfolio', { title, description })
</script>

<template>
  <div v-if="page">
    <UContainer class="py-20 sm:py-28">
      <div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <p class="editorial-label">
            Writing
          </p>
          <h1 class="mt-5 max-w-4xl text-5xl font-bold leading-[1.02] tracking-[-0.055em] text-highlighted sm:text-7xl">
            {{ page.title }}
          </h1>
          <p class="mt-6 max-w-2xl text-lg leading-8 text-muted">
            {{ page.description }}
          </p>
        </div>

        <UButton
          to="/rss.xml"
          label="RSS 订阅"
          icon="i-lucide-rss"
          color="neutral"
          variant="soft"
        />
      </div>
    </UContainer>

    <section class="border-t border-default pb-24 sm:pb-32">
      <UContainer>
        <NuxtLink
          v-for="post in posts"
          :key="post.path"
          :to="post.path"
          class="group grid grid-cols-[minmax(0,1fr)_1.5rem] gap-5 border-b border-default py-9 transition-colors hover:bg-elevated sm:grid-cols-[10rem_minmax(0,1fr)_2rem] sm:gap-8 sm:px-2 sm:py-11"
        >
          <p class="col-span-2 text-xs font-medium text-dimmed sm:col-span-1">
            {{ formatShortDate(post.date) }} · {{ post.minRead }} 分钟
          </p>

          <div>
            <h2 class="max-w-4xl text-balance text-2xl font-semibold leading-tight tracking-[-0.035em] text-highlighted sm:text-4xl">
              {{ post.title }}
            </h2>
            <p class="mt-4 max-w-3xl leading-7 text-muted">
              {{ post.description }}
            </p>
          </div>

          <UIcon
            name="i-lucide-arrow-right"
            class="mt-1 size-5 text-dimmed transition-transform group-hover:translate-x-1.5 group-hover:text-primary"
          />
        </NuxtLink>
      </UContainer>
    </section>
  </div>
</template>
