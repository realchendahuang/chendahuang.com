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
      title: 'text-left text-lg sm:text-xl font-medium',
      description: 'text-left mt-3 text-sm text-muted'
    }"
  />
</template>

<style scoped>

</style>
