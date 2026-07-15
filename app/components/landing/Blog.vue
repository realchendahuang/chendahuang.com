<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()

const { data: posts } = await useAsyncData('index-blogs', () =>
  queryCollection('blog').order('date', 'DESC').limit(3).all()
)
if (!posts.value) {
  throw createError({ statusCode: 404, statusMessage: '博客文章未找到', fatal: true })
}
</script>

<template>
  <UPageSection
    :title="page.blog.title"
    :ui="{
      container: 'px-0 pt-0! sm:gap-6 lg:gap-8',
      title: () => 'text-left text-lg font-medium sm:text-xl'
    }"
  >
    <Motion
      :initial="{ opacity: 0, y: 24 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :viewport="{ once: true, amount: 0.2 }"
      :transition="{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }"
    >
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
            <UButton
              size="xs"
              variant="link"
              class="px-0 gap-0"
              label="读全文"
            >
              <template #trailing>
                <UIcon
                  name="i-lucide-arrow-right"
                  class="size-4 text-primary transition-all opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
                />
              </template>
            </UButton>
          </template>
        </UBlogPost>
      </UBlogPosts>
    </Motion>
  </UPageSection>
</template>
