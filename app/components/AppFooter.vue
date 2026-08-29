<script setup lang="ts">
const { t } = useI18n()

const links = computed(() => [{
  'icon': 'i-lucide-rss',
  'to': '/rss.xml',
  'target': '_blank',
  'aria-label': t('footer.rss')
}, {
  'icon': 'i-simple-icons-x',
  'to': 'https://x.com/realchendahuang',
  'target': '_blank',
  'aria-label': t('footer.onX')
}, {
  'icon': 'i-simple-icons-github',
  'to': 'https://github.com/realchendahuang',
  'target': '_blank',
  'aria-label': t('footer.onGithub')
}])
</script>

<template>
  <UFooter
    class="z-10 bg-default"
    :ui="{ left: 'text-muted text-xs' }"
  >
    <template #left>
      © {{ new Date().getFullYear() }} {{ t('site.name') }}
    </template>

    <template #right>
      <UButton
        v-for="(link, index) of links"
        :key="index"
        v-bind="{ size: 'xs', color: 'neutral', variant: 'ghost', ...link }"
      />
    </template>
  </UFooter>
</template>
