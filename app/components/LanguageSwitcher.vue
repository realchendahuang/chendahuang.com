<script setup lang="ts">
const { locale, locales, t } = useI18n()

const switchLocalePath = useSwitchLocalePath()

const items = computed(() =>
  (locales.value as Array<{ code: string, name?: string }>)
    .filter(l => l.code !== locale.value)
    .map(l => ({
      label: l.name?.split(' ')[0] ?? l.code,
      to: switchLocalePath(l.code as 'zh' | 'en' | 'ja' | 'es' | 'pt' | 'fr' | 'de' | 'ar') || undefined
    }))
)
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'end', sideOffset: 6 }"
  >
    <UButton
      :label="String(locale).toUpperCase()"
      icon="i-lucide-languages"
      color="neutral"
      variant="ghost"
      size="sm"
      class="rounded-full"
      :aria-label="t('nav.switchLanguage')"
    />
  </UDropdownMenu>
</template>
