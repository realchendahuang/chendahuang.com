<script setup lang="ts">
const { t, locale } = useI18n()

const { data: posts } = await useAsyncData(`archive-posts:${locale.value}`, () =>
  queryCollection('blog').where('locale', '=', locale.value).select('path', 'title', 'date', 'minRead', 'tags').order('date', 'DESC').all()
)

const years = computed(() => {
  const groups = new Map<number, typeof posts.value>()
  for (const post of posts.value ?? []) {
    const year = new Date(post.date).getFullYear()
    if (!groups.has(year)) {
      groups.set(year, [])
    }
    groups.get(year)!.push(post)
  }
  return [...groups.entries()].map(([year, items]) => ({ year, items: items ?? [] }))
})

const totalCount = computed(() => posts.value?.length ?? 0)

useSeoMeta({
  title: () => `${t('archive.title')} - 陈大黄`,
  description: () => t('archive.description')
})

defineOgImage('Portfolio', { title: () => t('archive.title'), description: () => t('archive.description') })
</script>

<template>
  <div>
    <UContainer class="py-14 sm:py-20">
      <div>
        <h1 class="t-h1">
          {{ t('archive.title') }}
        </h1>
        <p class="mt-3 max-w-2xl text-sm leading-6 text-muted">
          {{ t('archive.count', { count: totalCount }) }}
        </p>
      </div>
    </UContainer>

    <section class="border-t border-default pb-20 sm:pb-28">
      <UContainer>
        <div class="space-y-12">
          <div
            v-for="group in years"
            :key="group.year"
          >
            <div class="flex items-baseline gap-3 border-b border-default py-4">
              <h2 class="font-serif text-2xl font-medium text-highlighted">
                {{ group.year }}
              </h2>
              <span class="text-xs text-dimmed">
                {{ group.items.length }} {{ t('archive.posts') }}
              </span>
            </div>

            <div class="divide-y divide-default">
              <NuxtLink
                v-for="post in group.items"
                :key="post.path"
                :to="post.path"
                class="group flex items-baseline justify-between gap-4 py-4 transition-colors hover:bg-elevated sm:px-2"
              >
                <div class="min-w-0">
                  <h3 class="truncate text-sm font-medium text-highlighted transition-colors group-hover:text-primary sm:text-base">
                    {{ post.title }}
                  </h3>
                  <div
                    v-if="post.tags?.length"
                    class="mt-1 flex flex-wrap gap-1.5"
                  >
                    <span
                      v-for="tag in post.tags"
                      :key="tag"
                      class="text-xs text-dimmed"
                    >
                      #{{ tag }}
                    </span>
                  </div>
                </div>

                <div class="flex shrink-0 items-center gap-3">
                  <span class="text-xs text-dimmed">
                    {{ formatShortDate(post.date) }}
                  </span>
                  <span class="text-xs text-dimmed">
                    {{ post.minRead }} {{ t('blog.minutes') }}
                  </span>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>
