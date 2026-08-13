<script setup lang="ts">
const open = useState('global-search-open', () => false)
</script>

<template>
  <UButton
    icon="i-lucide-search"
    variant="ghost"
    color="neutral"
    square
    aria-label="搜索 (Cmd+K)"
    :title="'搜索'"
    @click="open = true"
  />
</template>
