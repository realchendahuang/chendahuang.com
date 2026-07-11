<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <UPageSection
    :title="page.about.title"
    :description="page.about.description"
    :ui="{
      container: 'p-0!',
      title: () => 'text-left text-lg font-medium sm:text-xl',
      description: () => 'mt-3 text-left text-sm leading-6 text-muted'
    }"
  />
</template>

<style scoped>

</style>
