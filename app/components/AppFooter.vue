<script setup lang="ts">
const { t, locale } = useI18n()

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

const totalVisits = ref<number | null>(null)

const formattedVisits = computed(() => {
  if (totalVisits.value == null) return ''
  return new Intl.NumberFormat(getLocaleMeta(locale.value).language).format(totalVisits.value)
})

onMounted(async () => {
  try {
    const res = await fetch('/api/counter')
    if (res.ok) {
      const data = await res.json()
      if (typeof data?.pv === 'number') {
        totalVisits.value = data.pv
      }
    }
  } catch {
    // 统计未配置时静默隐藏
  }
})
</script>

<template>
  <UFooter
    class="z-10 bg-default"
    :ui="{ left: 'text-muted text-xs' }"
  >
    <template #left>
      <span class="inline-flex flex-wrap items-center gap-x-1.5 gap-y-1">
        © {{ new Date().getFullYear() }} {{ t('site.name') }}
        <template v-if="totalVisits != null">
          <span aria-hidden="true">·</span>
          <UIcon
            name="i-lucide-eye"
            class="size-3"
          />
          <span :title="t('footer.totalVisits', { count: formattedVisits })">
            {{ t('footer.totalVisits', { count: formattedVisits }) }}
          </span>
        </template>
      </span>
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
