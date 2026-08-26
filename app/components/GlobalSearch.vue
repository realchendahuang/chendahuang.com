<script setup lang="ts">
const open = useState('global-search-open', () => false)
const { t } = useI18n()
</script>

<template>
  <UButton
    icon="i-lucide-search"
    variant="ghost"
    color="neutral"
    square
    :aria-label="t('search.shortcut')"
    :title="t('search.label')"
    @click="open = true"
  />
</template>
