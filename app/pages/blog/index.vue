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
    <UContainer class="py-14 sm:py-20">
      <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <h1 class="max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-highlighted sm:text-4xl">
            {{ page.title }}
          </h1>
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

    <section class="border-t border-default pb-20 sm:pb-28">
      <UContainer>
        <NuxtLink
          v-for="post in posts"
          :key="post.path"
          :to="post.path"
          class="group grid grid-cols-[minmax(0,1fr)_1.5rem] gap-4 border-b border-default py-7 transition-colors hover:bg-elevated sm:grid-cols-[9rem_minmax(0,1fr)_1.5rem] sm:gap-6 sm:px-2 sm:py-8"
        >
          <p class="col-span-2 text-xs font-medium text-dimmed sm:col-span-1">
            {{ formatShortDate(post.date) }} · {{ post.minRead }} 分钟
          </p>

          <div>
            <h2 class="max-w-3xl text-balance text-lg font-semibold leading-snug tracking-[-0.02em] text-highlighted sm:text-xl">
              {{ post.title }}
            </h2>
            <p class="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-[15px] sm:leading-7">
              {{ post.description }}
            </p>
          </div>

          <UIcon
            name="i-lucide-arrow-right"
            class="mt-1 size-4 text-dimmed transition-transform group-hover:translate-x-1 group-hover:text-primary"
          />
        </NuxtLink>
      </UContainer>
    </section>
  </div>
</template>
