<script setup lang="ts">
type SearchResult = {
  title: string
  description?: string
  to: string
  section: string
  category?: string
}

const searchOpen = ref(false)
const searchQuery = ref('')
const inputRef = ref<HTMLInputElement>()

// 收集全站内容
const { data: blogs } = await useAsyncData('search-blogs', () =>
  queryCollection('blog').select('path', 'title', 'description').all()
)
const { data: projects } = await useAsyncData('search-projects', () =>
  queryCollection('projects').select('title', 'description', 'onlineUrl', 'url').all()
)
const { data: playbooks } = await useAsyncData('search-playbooks', () =>
  queryCollection('playbooks').select('title', 'description', 'onlineUrl', 'url').all()
)
const { data: skills } = await useAsyncData('search-skills', () =>
  queryCollection('skills').select('title', 'description', 'onlineUrl', 'url').all()
)
const { data: highlights } = await useAsyncData('search-highlights', () =>
  queryCollection('highlights').select('title', 'description', 'category', 'url').all()
)

const allResults = computed<SearchResult[]>(() => [
  ...(blogs.value ?? []).map(item => ({
    title: item.title,
    description: item.description,
    to: item.path,
    section: '博客'
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
    section: '精华帖',
    category: item.category
  }))
])

const results = computed(() => {
  const keyword = searchQuery.value.trim().toLowerCase()
  if (!keyword) {
    return allResults.value.slice(0, 8)
  }
  const parts = keyword.split(/\s+/).filter(Boolean)
  return allResults.value
    .filter((item) => {
      const haystack = `${item.title} ${item.description ?? ''} ${item.section}`.toLowerCase()
      return parts.every(part => haystack.includes(part))
    })
    .slice(0, 12)
})

const open = () => {
  searchOpen.value = true
  nextTick(() => inputRef.value?.focus())
}

const close = () => {
  searchOpen.value = false
  searchQuery.value = ''
}

// Cmd/Ctrl + K 快捷键
const keydownHandler = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    if (searchOpen.value) {
      close()
    } else {
      open()
    }
  }
  if (e.key === 'Escape') {
    close()
  }
}
onMounted(() => {
  window.addEventListener('keydown', keydownHandler)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', keydownHandler)
})
</script>

<template>
  <div>
    <UButton
      icon="i-lucide-search"
      variant="ghost"
      color="neutral"
      square
      aria-label="搜索 (Cmd+K)"
      :title="'搜索'"
      @click="open"
    />

    <UModal
      v-model:open="searchOpen"
      :ui="{ content: 'sm:max-w-xl' }"
    >
      <UCard
        :ui="{
          body: 'p-0',
          header: 'p-0'
        }"
      >
        <div class="flex items-center gap-3 border-b border-default px-4 py-3">
          <UIcon
            name="i-lucide-search"
            class="size-4 text-dimmed"
          />
          <UInput
            ref="inputRef"
            v-model="searchQuery"
            variant="none"
            placeholder="搜索博客、项目、Playbook、Skill、精华帖…"
            class="flex-1"
            :ui="{ root: 'w-full', base: 'text-base' }"
          />
          <kbd class="rounded border border-default px-1.5 py-0.5 text-[10px] text-dimmed">
            ESC
          </kbd>
        </div>

        <div class="max-h-[60vh] overflow-y-auto p-2">
          <p
            v-if="!searchQuery && !results.length"
            class="px-3 py-8 text-center text-sm text-dimmed"
          >
            输入关键词开始搜索全站内容
          </p>

          <p
            v-else-if="!results.length"
            class="px-3 py-8 text-center text-sm text-dimmed"
          >
            没有找到「{{ searchQuery }}」相关内容
          </p>

          <ul class="space-y-0.5">
            <li
              v-for="(item, index) in results"
              :key="`${item.to}-${index}`"
            >
              <NuxtLink
                :to="item.to"
                :target="item.to.startsWith('http') ? '_blank' : undefined"
                class="flex items-start gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-elevated"
                @click="close"
              >
                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-2">
                    <span
                      v-if="item.section"
                      class="shrink-0 rounded bg-muted/60 px-1.5 py-0.5 text-[10px] text-muted"
                    >
                      {{ item.section }}
                    </span>
                    <h3 class="truncate text-sm font-medium text-highlighted">
                      {{ item.title }}
                    </h3>
                  </div>
                  <p
                    v-if="item.description"
                    class="mt-1 line-clamp-1 text-xs text-muted"
                  >
                    {{ item.description }}
                  </p>
                </div>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </UCard>
    </UModal>
  </div>
</template>
