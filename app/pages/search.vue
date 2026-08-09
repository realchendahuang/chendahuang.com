<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const searchQuery = ref(typeof route.query.q === 'string' ? route.query.q : '')

const { data: blogs } = await useAsyncData('search-page-blogs', () =>
  queryCollection('blog').select('path', 'title', 'description', 'date').order('date', 'DESC').all()
)
const { data: projects } = await useAsyncData('search-page-projects', () =>
  queryCollection('projects').select('title', 'description', 'onlineUrl', 'url').all()
)
const { data: playbooks } = await useAsyncData('search-page-playbooks', () =>
  queryCollection('playbooks').select('title', 'description', 'onlineUrl', 'url').all()
)
const { data: skills } = await useAsyncData('search-page-skills', () =>
  queryCollection('skills').select('title', 'description', 'onlineUrl', 'url').all()
)
const { data: highlights } = await useAsyncData('search-page-highlights', () =>
  queryCollection('highlights').select('title', 'description', 'category', 'url').all()
)

type SearchHit = {
  title: string
  description?: string
  to: string
  section: string
  date?: string
}

const allItems = computed<SearchHit[]>(() => [
  ...(blogs.value ?? []).map(item => ({
    title: item.title,
    description: item.description,
    to: item.path,
    section: '博客',
    date: item.date
  })),
  ...(projects.value ?? []).map(item => ({
    title: item.title,
    description: item.description,
    to: item.onlineUrl || item.url,
    section: '项目'
  })),
  ...(playbooks.value ?? []).map(item => ({
    title: item.title,
    description: item.description,
    to: item.onlineUrl || item.url,
    section: 'Playbook'
  })),
  ...(skills.value ?? []).map(item => ({
    title: item.title,
    description: item.description,
    to: item.onlineUrl || item.url,
    section: 'Skill'
  })),
  ...(highlights.value ?? []).map(item => ({
    title: item.title,
    description: item.description,
    to: item.url,
    section: '精华帖'
  }))
])

const results = computed(() => {
  const keyword = searchQuery.value.trim().toLowerCase()
  if (!keyword) {
    return []
  }
  const parts = keyword.split(/\s+/).filter(Boolean)
  return allItems.value
    .filter((item) => {
      const haystack = `${item.title} ${item.description ?? ''} ${item.section}`.toLowerCase()
      return parts.every(part => haystack.includes(part))
    })
})

const updateQuery = () => {
  const query = { ...route.query }
  if (searchQuery.value.trim()) {
    query.q = searchQuery.value.trim()
  } else {
    delete query.q
  }
  router.replace({ query })
}

useSeoMeta({
  title: `搜索${searchQuery.value.trim() ? `「${searchQuery.value.trim()}」` : ''} - 陈大黄`,
  description: '搜索陈大黄的全站内容：博客、项目、Playbook、Skill 与 X 精华帖。'
})

defineOgImage('Portfolio', { title: '搜索', headline: '搜索', description: '搜索全站内容' })
</script>

<template>
  <div>
    <UContainer class="py-14 sm:py-20">
      <div>
        <h1 class="max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-highlighted sm:text-4xl">
          搜索
        </h1>
        <p class="mt-3 max-w-2xl text-sm leading-6 text-muted">
          搜索博客、项目、Playbook、Skill 与精华帖子。
        </p>
      </div>

      <div class="mt-8 max-w-xl">
        <UInput
          v-model="searchQuery"
          size="lg"
          icon="i-lucide-search"
          placeholder="输入关键词…"
          @update:model-value="updateQuery"
        />
      </div>
    </UContainer>

    <section class="border-t border-default pb-20 sm:pb-28">
      <UContainer>
        <template v-if="results.length">
          <p class="py-5 text-sm text-dimmed">
            找到 {{ results.length }} 条结果
          </p>
          <NuxtLink
            v-for="item in results"
            :key="item.to + item.title"
            :to="item.to"
            :target="item.to.startsWith('http') ? '_blank' : undefined"
            class="group grid grid-cols-[minmax(0,1fr)_1.5rem] gap-4 border-b border-default py-7 transition-colors hover:bg-elevated sm:grid-cols-[6rem_minmax(0,1fr)_1.5rem] sm:gap-6 sm:px-2 sm:py-8"
          >
            <span class="col-span-2 text-xs font-medium text-dimmed sm:col-span-1">
              {{ item.section }}
            </span>
            <div>
              <h2 class="max-w-3xl text-balance text-lg font-semibold leading-snug tracking-[-0.02em] text-highlighted group-hover:text-primary sm:text-xl">
                {{ item.title }}
              </h2>
              <p
                v-if="item.description"
                class="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-[15px] sm:leading-7"
              >
                {{ item.description }}
              </p>
            </div>
            <UIcon
              name="i-lucide-arrow-right"
              class="mt-1 size-4 text-dimmed transition-transform group-hover:translate-x-1 group-hover:text-primary"
            />
          </NuxtLink>
        </template>

        <template v-else-if="searchQuery.trim()">
          <p class="py-16 text-center text-sm text-muted">
            没有找到「{{ searchQuery }}」相关内容，换个关键词试试。
          </p>
        </template>

        <template v-else>
          <div class="space-y-10 py-10">
            <div
              v-for="group in [
                { label: '博客', items: allItems.filter(i => i.section === '博客').slice(0, 5) },
                { label: '项目', items: allItems.filter(i => i.section === '项目') },
                { label: 'Playbook', items: allItems.filter(i => i.section === 'Playbook') },
                { label: 'Skill', items: allItems.filter(i => i.section === 'Skill') }
              ]"
              :key="group.label"
            >
              <p class="editorial-label">
                {{ group.label }}
              </p>
              <div class="mt-2 divide-y divide-default border-b border-default">
                <NuxtLink
                  v-for="item in group.items"
                  :key="item.to + item.title"
                  :to="item.to"
                  :target="item.to.startsWith('http') ? '_blank' : undefined"
                  class="flex items-center justify-between gap-3 py-3 text-sm text-highlighted transition-colors hover:text-primary"
                >
                  <span class="truncate">
                    {{ item.title }}
                  </span>
                  <UIcon
                    name="i-lucide-arrow-right"
                    class="size-4 shrink-0 text-dimmed"
                  />
                </NuxtLink>
              </div>
            </div>
          </div>
        </template>
      </UContainer>
    </section>
  </div>
</template>
