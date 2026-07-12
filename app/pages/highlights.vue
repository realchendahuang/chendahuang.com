<script setup lang="ts">
import type { HighlightsCollectionItem } from '@nuxt/content'
import {
  formatMonthLabel,
  getHighlightCategory,
  HIGHLIGHT_CATEGORIES,
  HIGHLIGHT_VIEW_MODES,
  type HighlightCategoryId,
  type HighlightViewMode
} from '~/utils/highlights'

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
  queryCollection('highlights').all()
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

const route = useRoute()
const router = useRouter()

const viewMode = computed<HighlightViewMode>({
  get() {
    const value = route.query.view
    if (value === 'timeline' || value === 'heat' || value === 'theme') {
      return value
    }
    return 'theme'
  },
  set(mode) {
    const query = { ...route.query }
    if (mode === 'theme') {
      delete query.view
    } else {
      query.view = mode
    }
    router.replace({ query })
  }
})

const activeCategory = computed<HighlightCategoryId | 'all'>({
  get() {
    const value = route.query.cat
    if (typeof value === 'string' && HIGHLIGHT_CATEGORIES.some(item => item.id === value)) {
      return value as HighlightCategoryId
    }
    return 'all'
  },
  set(category) {
    const query = { ...route.query }
    if (category === 'all') {
      delete query.cat
    } else {
      query.cat = category
    }
    router.replace({ query })
  }
})

const allHighlights = computed(() => highlights.value ?? [])

const categoryCounts = computed(() => {
  const counts = Object.fromEntries(
    HIGHLIGHT_CATEGORIES.map(item => [item.id, 0])
  ) as Record<HighlightCategoryId, number>

  for (const item of allHighlights.value) {
    const category = item.category as HighlightCategoryId | undefined
    if (category && category in counts) {
      counts[category] += 1
    }
  }

  return counts
})

const filteredHighlights = computed(() => {
  if (activeCategory.value === 'all') {
    return allHighlights.value
  }
  return allHighlights.value.filter(item => item.category === activeCategory.value)
})

const sortedByHeat = (items: HighlightsCollectionItem[]) =>
  [...items].sort((a, b) => {
    const scoreA = (a.likes ?? 0) * 2 + (a.bookmarks ?? 0) * 3 + (a.reposts ?? 0)
    const scoreB = (b.likes ?? 0) * 2 + (b.bookmarks ?? 0) * 3 + (b.reposts ?? 0)
    if (scoreB !== scoreA) {
      return scoreB - scoreA
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

const sortedByDate = (items: HighlightsCollectionItem[]) =>
  [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

type DisplaySection = {
  id: string
  label?: string
  description?: string
  sticky?: boolean
  showCategoryBadge?: boolean
  items: HighlightsCollectionItem[]
}

const displaySections = computed<DisplaySection[]>(() => {
  const filtered = filteredHighlights.value

  if (viewMode.value === 'theme') {
    const source = sortedByHeat(filtered)
    return HIGHLIGHT_CATEGORIES
      .map(category => ({
        id: category.id,
        label: category.label,
        description: `${category.description} · ${source.filter(item => item.category === category.id).length} 条`,
        showCategoryBadge: false,
        items: source.filter(item => item.category === category.id)
      }))
      .filter(section => section.items.length > 0)
  }

  if (viewMode.value === 'timeline') {
    const source = sortedByDate(filtered)
    const groups = new Map<string, HighlightsCollectionItem[]>()

    for (const item of source) {
      const label = formatMonthLabel(item.date)
      if (!groups.has(label)) {
        groups.set(label, [])
      }
      groups.get(label)!.push(item)
    }

    return [...groups.entries()].map(([label, items]) => ({
      id: label,
      label,
      description: `${items.length} 条`,
      sticky: true,
      showCategoryBadge: true,
      items
    }))
  }

  return [{
    id: 'heat',
    showCategoryBadge: true,
    items: sortedByHeat(filtered)
  }]
})

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

const setViewMode = (mode: HighlightViewMode) => {
  viewMode.value = mode
}

const setCategory = (category: HighlightCategoryId | 'all') => {
  activeCategory.value = category
}
</script>

<template>
  <div v-if="page">
    <UContainer class="py-14 sm:py-20">
      <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <h1 class="max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-highlighted sm:text-4xl">
            {{ page.title }}
          </h1>
          <p class="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">
            共 {{ allHighlights.length }} 条。可按主题分组、时间线或热度浏览，也可先筛分类再切换视图。
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

      <div class="mt-8 space-y-5">
        <div>
          <p class="mb-2 text-xs text-dimmed">
            展示方式
          </p>
          <div class="flex flex-wrap gap-2">
            <UButton
              v-for="mode in HIGHLIGHT_VIEW_MODES"
              :key="mode.id"
              size="sm"
              color="neutral"
              :variant="viewMode === mode.id ? 'solid' : 'soft'"
              :label="mode.label"
              :title="mode.description"
              @click="setViewMode(mode.id)"
            />
          </div>
        </div>

        <div>
          <p class="mb-2 text-xs text-dimmed">
            主题筛选
          </p>
          <div class="flex flex-wrap gap-2">
            <UButton
              size="sm"
              color="neutral"
              :variant="activeCategory === 'all' ? 'solid' : 'soft'"
              :label="`全部 ${allHighlights.length}`"
              @click="setCategory('all')"
            />
            <UButton
              v-for="category in HIGHLIGHT_CATEGORIES"
              :key="category.id"
              size="sm"
              color="neutral"
              :variant="activeCategory === category.id ? 'solid' : 'soft'"
              :label="`${category.label} ${categoryCounts[category.id] || 0}`"
              :title="category.description"
              @click="setCategory(category.id)"
            />
          </div>
        </div>
      </div>
    </UContainer>

    <section class="border-t border-default pb-20 sm:pb-28">
      <UContainer>
        <div
          v-if="displaySections.length"
          class="space-y-12 sm:space-y-14"
        >
          <div
            v-for="section in displaySections"
            :id="section.label ? `section-${section.id}` : undefined"
            :key="section.id"
          >
            <div
              v-if="section.label"
              class="border-b border-default py-5 sm:py-6"
              :class="section.sticky
                ? 'sticky top-0 z-10 -mx-4 bg-default/90 px-4 backdrop-blur sm:mx-0 sm:px-0'
                : ''"
            >
              <h2
                class="font-semibold tracking-[-0.02em] text-highlighted"
                :class="section.sticky
                  ? 'text-base sm:text-lg'
                  : 'text-2xl sm:text-3xl'"
              >
                {{ section.label }}
              </h2>
              <p
                v-if="section.description"
                class="mt-1 text-xs text-dimmed sm:text-sm"
              >
                {{ section.description }}
              </p>
            </div>

            <article
              v-for="item in section.items"
              :key="item.url"
              class="border-b border-default py-8 sm:py-10"
            >
              <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-dimmed">
                <time :datetime="toIsoDate(item.date)">
                  {{ formatDisplayDate(item.date) }}
                </time>
                <span
                  v-if="section.showCategoryBadge && getHighlightCategory(item.category)"
                  class="rounded-full bg-elevated px-2 py-0.5 text-muted"
                >
                  {{ getHighlightCategory(item.category)?.label }}
                </span>
                <span>{{ formatCount(item.likes) }} 赞</span>
                <span v-if="item.bookmarks">{{ formatCount(item.bookmarks) }} 收藏</span>
                <span v-if="item.reposts">{{ formatCount(item.reposts) }} 转发</span>
                <span v-if="item.views">{{ formatCount(item.views) }} 浏览</span>
              </div>

              <h3 class="mt-3 max-w-3xl text-xl font-semibold tracking-[-0.02em] text-highlighted sm:text-2xl">
                {{ item.title }}
              </h3>

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
          </div>
        </div>

        <p
          v-else
          class="py-16 text-center text-sm text-muted"
        >
          这个筛选下暂时没有帖子。
        </p>
      </UContainer>
    </section>
  </div>
</template>
