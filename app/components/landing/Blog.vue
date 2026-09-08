<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'
import type { BlogSummary } from '~/types/content'
import { sortBlogsByDatePinnedFirst, useContentSection } from '~/composables/useContentSection'
import { formatCount } from '~/utils/content/highlights'

defineProps<{
  page: IndexCollectionItem
}>()

const { t } = useI18n()

const { data: posts } = await useContentSection<BlogSummary>('home-blog', {
  collection: 'blog',
  select: ['path', 'title', 'description', 'date', 'minRead', 'pinned'],
  sort: sortBlogsByDatePinnedFirst,
  limit: 3
})

const { counts: viewCounts, ready: viewsReady } = useReadCounts(computed(() => (posts.value ?? []).map(post => post.path)))
</script>

<template>
  <UPageSection
    :title="page.blog.title"
    :ui="{
      container: 'px-0 pt-0! sm:gap-6 lg:gap-8',
      title: () => 'text-left text-lg font-medium sm:text-xl'
    }"
  >
    <FadeUp>
      <UBlogPosts
        orientation="vertical"
        class="gap-4 lg:gap-y-4"
      >
        <UBlogPost
          v-for="(post, index) in posts"
          :key="index"
          orientation="horizontal"
          variant="naked"
          v-bind="post"
          :to="post.path"
          :ui="{
            root: 'group relative lg:items-start lg:flex ring-0 hover:ring-0',
            body: 'px-0!',
            header: 'hidden'
          }"
        >
          <template #footer>
            <div class="flex items-center gap-3">
              <span
                v-if="viewsReady && viewCounts[post.path]"
                class="inline-flex items-center gap-1 text-xs text-dimmed"
                :title="t('blog.views')"
              >
                <UIcon
                  name="i-lucide-eye"
                  class="size-3"
                />
                {{ formatCount(viewCounts[post.path]) }}
              </span>
              <UButton
                size="xs"
                variant="link"
                class="px-0 gap-0"
                :label="t('landing.readMore')"
              >
                <template #trailing>
                  <UIcon
                    name="i-lucide-arrow-right"
                    class="size-4 text-primary transition-all opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
                  />
                </template>
              </UButton>
            </div>
          </template>
        </UBlogPost>
      </UBlogPosts>
    </FadeUp>
  </UPageSection>
</template>
