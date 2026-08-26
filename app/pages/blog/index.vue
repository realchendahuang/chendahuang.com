<script setup lang="ts">
import type { BlogCollectionItem, PagesCollectionItem } from '@nuxt/content'

const { t, locale } = useI18n()

const { data } = await useAsyncData(`blog-page-with-posts:${locale.value}`, async () => {
  const [pageResult, postsResult] = await Promise.all([
    queryCollection('pages').where('locale', '=', locale.value).path('/blog').first(),
    queryCollection('blog').where('locale', '=', locale.value).order('date', 'DESC').all()
  ])
  if (!pageResult) {
    throw createError({ statusCode: 404, statusMessage: t('seo.notFound'), fatal: true })
  }
  return {
    page: pageResult as PagesCollectionItem,
    posts: postsResult as BlogCollectionItem[]
  }
})

const page = computed(() => data.value?.page)
const posts = computed<BlogCollectionItem[]>(() => data.value?.posts ?? [])

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: '页面未找到', fatal: true })
}

const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description

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

const route = useRoute()
const router = useRouter()

const searchQuery = ref('')

const activeTag = computed<string | 'all'>({
  get() {
    const value = route.query.tag
    return typeof value === 'string' && value ? value : 'all'
  },
  set(tag) {
    const query = { ...route.query }
    if (tag === 'all') {
      delete query.tag
    } else {
      query.tag = tag
    }
    router.replace({ query })
  }
})

const allTags = computed(() => {
  const counts = new Map<string, number>()
  for (const post of posts.value) {
    for (const tag of post.tags ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'zh-CN'))
    .map(([name, count]) => ({ name, count }))
})

const keywordMatched = (post: BlogCollectionItem, keyword: string) => {
  const haystack = `${post.title} ${post.description ?? ''} ${(post.tags ?? []).join(' ')}`.toLowerCase()
  return matchKeyword(haystack, keyword)
}

const filteredPosts = computed(() => {
  let result: BlogCollectionItem[] = posts.value
  if (activeTag.value !== 'all') {
    result = result.filter(post => (post.tags ?? []).includes(activeTag.value))
  }
  const keyword = searchQuery.value.trim()
  if (keyword) {
    result = result.filter(post => keywordMatched(post, keyword))
  }
  // 置顶文章排最前
  return [...result].sort((a, b) => Number(b.pinned) - Number(a.pinned))
})

const isFiltering = computed(() => activeTag.value !== 'all' || searchQuery.value.trim().length > 0)
</script>

<template>
  <div v-if="page">
    <UContainer class="py-14 sm:py-20">
      <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <h1 class="t-h1">
            {{ page.title }}
          </h1>
          <p class="mt-3 max-w-2xl text-sm leading-6 text-muted">
            {{ t('blog.count', { count: posts?.length ?? 0 }) }}
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <UButton
            to="/archive"
            :label="t('blog.archive')"
            icon="i-lucide-archive"
            color="neutral"
            variant="ghost"
          />
          <UButton
            to="/tags"
            :label="t('blog.tags')"
            icon="i-lucide-tags"
            color="neutral"
            variant="ghost"
          />
          <UButton
            to="/rss.xml"
            :label="t('blog.rss')"
            icon="i-lucide-rss"
            color="neutral"
            variant="soft"
          />
        </div>
      </div>
    </UContainer>

    <section class="border-t border-default pb-20 sm:pb-28">
      <UContainer>
        <div class="flex flex-col gap-4 border-b border-default py-5 sm:flex-row sm:items-center sm:justify-between">
          <UInput
            v-model="searchQuery"
            name="blog-search"
            :placeholder="t('blog.searchPlaceholder')"
            icon="i-lucide-search"
            class="w-full sm:max-w-xs"
            size="sm"
          />

          <div class="flex flex-wrap items-center gap-1.5">
            <UButton
              size="xs"
              variant="soft"
              color="neutral"
              :class="activeTag === 'all' ? 'bg-elevated text-highlighted' : ''"
              @click="activeTag = 'all'"
            >
              {{ t('blog.all') }}
            </UButton>
            <UButton
              v-for="tag in allTags"
              :key="tag.name"
              size="xs"
              variant="soft"
              color="neutral"
              :class="activeTag === tag.name ? 'bg-elevated text-highlighted' : ''"
              @click="activeTag = tag.name"
            >
              {{ tag.name }}
              <span class="text-dimmed">
                {{ tag.count }}
              </span>
            </UButton>
          </div>
        </div>

        <p
          v-if="isFiltering"
          class="pt-5 text-sm text-dimmed"
        >
          {{ t('blog.found', { count: filteredPosts.length }) }}
          <template v-if="activeTag !== 'all'">
            · {{ t('blog.tagFilter', { tag: activeTag }) }}
          </template>
          <template v-if="searchQuery.trim()">
            · {{ t('blog.keywordFilter', { keyword: searchQuery.trim() }) }}
          </template>
        </p>

        <template v-if="filteredPosts.length">
          <NuxtLink
            v-for="post in filteredPosts"
            :key="post.path"
            :to="post.path"
            class="group grid grid-cols-[minmax(0,1fr)_1.5rem] gap-4 border-b border-default py-7 transition-colors hover:bg-elevated sm:grid-cols-[9rem_minmax(0,1fr)_1.5rem] sm:gap-6 sm:px-2 sm:py-8"
          >
            <p class="col-span-2 text-xs font-medium text-dimmed sm:col-span-1">
              {{ formatShortDate(post.date) }} · {{ post.minRead }} {{ t('blog.minutes') }}
            </p>

            <div>
              <div class="flex flex-wrap items-center gap-2">
                <h2 class="max-w-3xl text-balance text-lg font-semibold leading-snug tracking-[-0.02em] text-highlighted sm:text-xl">
                  {{ post.title }}
                </h2>
                <span
                  v-if="post.pinned"
                  class="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400"
                  :title="t('blog.pinnedTitle')"
                >
                  <UIcon
                    name="i-lucide-pin"
                    class="size-3"
                  />
                  {{ t('blog.pinned') }}
                </span>
                <span
                  v-if="post.original"
                  class="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                  :title="t('blog.originalTitle')"
                >
                  <UIcon
                    name="i-lucide-pen-line"
                    class="size-3"
                  />
                  {{ t('blog.original') }}
                </span>
              </div>
              <p class="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-[15px] sm:leading-7">
                {{ post.description }}
              </p>
              <div
                v-if="post.tags?.length"
                class="mt-3 flex flex-wrap gap-1.5"
              >
                <span
                  v-for="tag in post.tags"
                  :key="tag"
                  class="rounded-full border border-default px-2 py-0.5 text-xs text-dimmed"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <UIcon
              name="i-lucide-arrow-right"
              class="mt-1 size-4 text-dimmed transition-transform group-hover:translate-x-1 group-hover:text-primary"
            />
          </NuxtLink>
        </template>

        <p
          v-else
          class="py-16 text-center text-sm text-dimmed"
        >
          {{ t('blog.noMatch') }}
        </p>
      </UContainer>
    </section>
  </div>
</template>
