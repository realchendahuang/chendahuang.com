<script setup lang="ts">
const open = useState('global-search-open', () => false)
const { t } = useI18n()
</script>

<template>
  <UButton
    icon="i-lucide-search"
    variant="ghost"
    color="neutral"
    size="sm"
    class="rounded-full"
    :aria-label="t('search.shortcut')"
    :title="t('search.label')"
    @click="open = true"
  >
    <template #trailing>
      <UKbd
        value="⌘K"
        size="sm"
        class="hidden sm:inline-flex"
      />
    </template>
  </UButton>
</template>
