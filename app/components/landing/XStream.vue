<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()

const typeMeta = {
  highlight: {
    label: '亮点',
    icon: 'i-lucide-sparkles'
  },
  article: {
    label: '长文',
    icon: 'i-lucide-newspaper'
  }
}
</script>

<template>
  <UPageSection
    v-if="page.xstream?.items?.length"
    :title="page.xstream.title"
    :description="page.xstream.description"
    :ui="{
      container: 'px-0 pt-0! sm:gap-6 lg:gap-8',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-left mt-2 text-sm sm:text-md lg:text-sm text-muted'
    }"
  >
    <template #links>
      <div
        v-if="page.xstream.links?.length"
        class="flex flex-wrap items-center gap-2"
      >
        <UButton
          v-for="(link, index) in page.xstream.links"
          :key="index"
          v-bind="link"
          size="sm"
        />
      </div>
    </template>

    <div class="grid gap-3 sm:grid-cols-2">
      <ULink
        v-for="(item, index) in page.xstream.items"
        :key="index"
        :to="item.href"
        target="_blank"
        class="group rounded-lg border border-default bg-elevated/30 p-4 transition hover:border-primary/50 hover:bg-elevated"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="min-w-0">
            <div class="mb-3 flex flex-wrap items-center gap-2">
              <UBadge
                color="neutral"
                variant="soft"
                size="sm"
                class="gap-1"
              >
                <UIcon :name="typeMeta[item.type].icon" />
                {{ typeMeta[item.type].label }}
              </UBadge>
              <span
                v-if="item.source"
                class="text-xs text-dimmed"
              >
                {{ item.source }}
              </span>
              <span
                v-if="item.date"
                class="text-xs text-dimmed"
              >
                {{ item.date }}
              </span>
            </div>

            <h3 class="text-base font-medium text-highlighted">
              {{ item.title }}
            </h3>
            <p class="mt-2 text-sm leading-6 text-muted">
              {{ item.description }}
            </p>
          </div>

          <UIcon
            name="i-lucide-arrow-up-right"
            class="mt-1 size-4 shrink-0 text-dimmed transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
          />
        </div>
      </ULink>
    </div>
  </UPageSection>
</template>
