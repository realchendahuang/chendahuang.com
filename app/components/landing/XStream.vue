<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'
import type { HighlightSummary } from '~/types/content'
import { sortHighlightsByHeat, useContentSection } from '~/composables/useContentSection'
import { formatCount } from '~/utils/content/highlights'

defineProps<{
  page: IndexCollectionItem
}>()

const { t } = useI18n()

const { data: highlights } = await useContentSection<HighlightSummary>('home-highlights', {
  collection: 'highlights',
  select: ['title', 'description', 'category', 'date', 'likes', 'bookmarks', 'reposts', 'url', 'content'],
  sort: sortHighlightsByHeat,
  limit: 4
})

const shareHighlight = async (item: { title: string, url: string }) => {
  const text = t('landing.shareHighlight', { title: item.title })
  if (navigator.share) {
    try {
      await navigator.share({ title: item.title, text, url: item.url })
      return
    } catch {
      // 用户取消
    }
  }
  copyToClipboard(item.url, t('landing.linkCopied'))
}
</script>

<template>
  <UPageSection
    v-if="page.highlights && highlights?.length"
    :title="page.highlights.title"
    :ui="{
      container: 'px-0 pt-0! sm:gap-6 lg:gap-8',
      title: () => 'text-left text-lg font-medium sm:text-xl'
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

    <Motion
      class="grid gap-3 sm:grid-cols-2"
      :initial="{ opacity: 0, y: 24 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :viewport="{ once: true, amount: 0.2 }"
      :transition="{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }"
    >
      <article
        v-for="item in highlights"
        :key="item.url"
        class="rounded-lg border border-default bg-elevated/30 p-4 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-primary/40"
      >
        <div class="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-dimmed">
          <time>{{ formatShortDate(item.date) }}</time>
          <span>{{ formatCount(item.likes) }} {{ t('landing.likes') }}</span>
          <span v-if="item.bookmarks">{{ formatCount(item.bookmarks) }} {{ t('landing.bookmarks') }}</span>
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
            :label="t('landing.original')"
            trailing-icon="i-lucide-arrow-up-right"
          />
          <UButton
            size="xs"
            color="neutral"
            variant="ghost"
            icon="i-lucide-share-2"
            :aria-label="`${t('landing.shareHighlight', { title: item.title })}`"
            @click="shareHighlight(item)"
          />
        </div>
      </article>
    </Motion>
  </UPageSection>
</template>
