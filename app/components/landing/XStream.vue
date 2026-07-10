<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()

const { data: highlights } = await useAsyncData('index-highlights', () =>
  queryCollection('highlights').order('likes', 'DESC').limit(4).all()
)

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
  <UPageSection
    v-if="page.highlights && highlights?.length"
    :title="page.highlights.title"
    :description="page.highlights.description"
    :ui="{
      container: 'px-0 pt-0! sm:gap-6 lg:gap-8',
      title: 'text-left text-lg sm:text-xl font-medium',
      description: 'text-left mt-2 text-sm text-muted'
    }"
  >
    <template #links>
      <div
        v-if="page.highlights.links?.length"
        class="flex flex-wrap items-center gap-2"
      >
        <UButton
          v-for="(link, index) in page.highlights.links"
          :key="index"
          v-bind="link"
          size="sm"
        />
      </div>
    </template>

    <div class="grid gap-3 sm:grid-cols-2">
      <article
        v-for="item in highlights"
        :key="item.url"
        class="rounded-lg border border-default bg-elevated/30 p-4 transition hover:border-primary/40"
      >
        <div class="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-dimmed">
          <time>{{ formatShortDate(item.date) }}</time>
          <span>{{ formatCount(item.likes) }} 赞</span>
          <span v-if="item.bookmarks">{{ formatCount(item.bookmarks) }} 收藏</span>
        </div>

        <h3 class="text-base font-medium leading-snug text-highlighted">
          {{ item.title }}
        </h3>

        <p class="mt-2 line-clamp-4 whitespace-pre-line text-sm leading-6 text-muted">
          {{ item.content }}
        </p>

        <div class="mt-4 flex items-center gap-3">
          <UButton
            :to="item.url"
            target="_blank"
            size="xs"
            color="neutral"
            variant="soft"
            label="原文"
            trailing-icon="i-lucide-arrow-up-right"
          />
        </div>
      </article>
    </div>
  </UPageSection>
</template>
