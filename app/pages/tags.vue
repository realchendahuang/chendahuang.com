<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const { data: posts } = await useAsyncData('tags-posts', () =>
  queryCollection('blog').select('path', 'title', 'description', 'date', 'minRead', 'tags').order('date', 'DESC').all()
)

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
  for (const post of posts.value ?? []) {
    for (const tag of post.tags ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'zh-CN'))
    .map(([name, count]) => ({ name, count }))
})

const filteredPosts = computed(() => {
  if (activeTag.value === 'all') {
    return posts.value ?? []
  }
  return (posts.value ?? []).filter(post => (post.tags ?? []).includes(activeTag.value))
})

useSeoMeta({
  title: '标签 - 陈大黄',
  description: '按标签浏览全部博客文章。'
})

defineOgImage('Portfolio', { title: '标签', description: '按标签浏览全部博客文章。' })
</script>

<template>
  <div>
    <UContainer class="py-14 sm:py-20">
      <div>
        <h1 class="t-h1">
          标签
        </h1>
        <p class="mt-3 max-w-2xl text-sm leading-6 text-muted">
          共 {{ allTags.length }} 个标签，点击查看对应文章。
        </p>
      </div>

      <div class="mt-8 flex flex-wrap gap-2">
        <UButton
          size="sm"
          color="neutral"
          :variant="activeTag === 'all' ? 'solid' : 'soft'"
          label="全部"
          @click="activeTag = 'all'"
        />
        <UButton
          v-for="tag in allTags"
          :key="tag.name"
          size="sm"
          color="neutral"
          :variant="activeTag === tag.name ? 'solid' : 'soft'"
          :label="`${tag.name} ${tag.count}`"
          @click="activeTag = tag.name"
        />
      </div>
    </UContainer>

    <section class="border-t border-default pb-20 sm:pb-28">
      <UContainer>
        <template v-if="filteredPosts.length">
          <p class="py-5 text-sm text-dimmed">
            {{ activeTag === 'all' ? '全部文章' : `标签「${activeTag}」下的文章` }} · {{ filteredPosts.length }} 篇
          </p>
          <NuxtLink
            v-for="post in filteredPosts"
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
        </template>

        <p
          v-else
          class="py-16 text-center text-sm text-muted"
        >
          该标签下暂无文章。
        </p>
      </UContainer>
    </section>
  </div>
</template>
