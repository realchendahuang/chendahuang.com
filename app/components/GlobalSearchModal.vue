<script setup lang="ts">
import type { SearchHit } from '~/composables/useSearchIndex'

const searchOpen = useState('global-search-open', () => false)
const searchQuery = ref('')
const inputRef = useTemplateRef('inputRef')

const { items: allItems, ensureLoaded } = useSearchIndex()

// modal 默认空,首次打开时按需加载
watch(searchOpen, async (open) => {
  if (open) await ensureLoaded()
}, { immediate: true })

const results = computed<SearchHit[]>(() =>
  searchQuery.value.trim()
    ? filterHits(allItems.value, searchQuery.value, 12)
    : allItems.value.slice(0, 8)
)

const close = () => {
  searchOpen.value = false
  searchQuery.value = ''
}

const activeIndex = ref(-1)
const listRef = useTemplateRef('listRef')

watch(searchOpen, (value) => {
  if (value) {
    activeIndex.value = -1
    nextTick(() => inputRef.value?.inputRef?.focus())
  }
})

watch(results, () => {
  activeIndex.value = -1
})

const goTo = (item: SearchHit) => {
  close()
  if (item.to.startsWith('http')) {
    window.open(item.to, '_blank', 'noopener')
  } else {
    navigateTo(item.to)
  }
}

// Cmd/Ctrl + K 快捷键 + 结果列表键盘导航
const keydownHandler = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    if (searchOpen.value) {
      close()
    } else {
      searchOpen.value = true
    }
    return
  }
  if (e.key === 'Escape') {
    close()
    return
  }
  if (!searchOpen.value || !results.value.length) {
    return
  }
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault()
    const delta = e.key === 'ArrowDown' ? 1 : -1
    activeIndex.value = (activeIndex.value + delta + results.value.length) % results.value.length
    nextTick(() => {
      listRef.value?.children[activeIndex.value]?.scrollIntoView({ block: 'nearest' })
    })
  }
  if (e.key === 'Enter' && activeIndex.value >= 0) {
    e.preventDefault()
    goTo(results.value[activeIndex.value]!)
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
  <UModal
    v-model:open="searchOpen"
    :ui="{
      content: 'sm:max-w-xl',
      overlay: 'bg-neutral-950/20 backdrop-blur-sm'
    }"
  >
    <template #content>
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

          <ul
            ref="listRef"
            class="space-y-0.5"
          >
            <li
              v-for="(item, index) in results"
              :key="`${item.to}-${index}`"
            >
              <NuxtLink
                :to="item.to"
                :target="item.to.startsWith('http') ? '_blank' : undefined"
                class="flex items-start gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-elevated"
                :class="{ 'bg-elevated': index === activeIndex }"
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
    </template>
  </UModal>
</template>
