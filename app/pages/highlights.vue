<script setup lang="ts">
const { data: page } = await useAsyncData('highlights-page', () => {
  return queryCollection('pages').path('/highlights').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: '页面未找到',
    fatal: true
  })
}

const { data: highlights } = await useAsyncData('highlights', () =>
  queryCollection('highlights').order('likes', 'DESC').all()
)

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogUrl: toCanonicalUrl('/highlights'),
  twitterTitle: title,
  twitterDescription: description
})

defineOgImage('Portfolio', { title, description })

const formatCount = (n?: number) => {
  const value = n ?? 0
  if (value >= 10000) {
    return `${(value / 10000).toFixed(value % 10000 === 0 ? 0 : 1)}w`
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`
  }
  return String(value)
}
</script>

<template>
  <div v-if="page">
    <UContainer class="py-14 sm:py-20">
      <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <p class="editorial-label">
            精华帖子
          </p>
          <h1 class="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-highlighted sm:text-4xl">
            {{ page.title }}
          </h1>
          <p class="mt-4 max-w-2xl text-base leading-7 text-muted">
            {{ page.description }}
          </p>
        </div>

        <UButton
          to="https://x.com/realchendahuang"
          target="_blank"
          label="X 主页"
          icon="i-simple-icons-x"
          color="neutral"
          variant="soft"
        />
      </div>
    </UContainer>

    <section class="border-t border-default pb-20 sm:pb-28">
      <UContainer>
        <article
          v-for="item in highlights"
          :key="item.url"
          class="border-b border-default py-8 sm:py-10"
        >
          <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-dimmed">
            <time :datetime="toIsoDate(item.date)">
              {{ formatDisplayDate(item.date) }}
            </time>
            <span>{{ formatCount(item.likes) }} 赞</span>
            <span v-if="item.bookmarks">{{ formatCount(item.bookmarks) }} 收藏</span>
            <span v-if="item.reposts">{{ formatCount(item.reposts) }} 转发</span>
            <span v-if="item.views">{{ formatCount(item.views) }} 浏览</span>
          </div>

          <h2 class="mt-3 max-w-3xl text-xl font-semibold tracking-[-0.02em] text-highlighted sm:text-2xl">
            {{ item.title }}
          </h2>

          <div class="prose-highlight mt-5 max-w-3xl text-[15px] leading-7 text-toned whitespace-pre-line sm:text-base sm:leading-8">
            <MDC
              :value="item.content"
              unwrap="p"
            />
          </div>

          <div class="mt-5">
            <UButton
              :to="item.url"
              target="_blank"
              size="sm"
              color="neutral"
              variant="soft"
              label="在 X 查看原文"
              trailing-icon="i-lucide-arrow-up-right"
            />
          </div>
        </article>
      </UContainer>
    </section>
  </div>
</template>
