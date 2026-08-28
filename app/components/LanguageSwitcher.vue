<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() =>
  (locales.value as Array<{ code: string, name?: string }>).filter(l => l.code !== locale.value)
)

const switchTo = (code: string) => {
  const path = switchLocalePath(code as 'zh' | 'en' | 'ja' | 'es' | 'pt' | 'fr' | 'de' | 'ar')
  if (path) {
    navigateTo(path)
  } else {
    setLocale(code as 'zh' | 'en' | 'ja' | 'es' | 'pt' | 'fr' | 'de' | 'ar')
  }
}
</script>

<template>
  <UDropdownMenu
    :items="availableLocales.map(l => ({ label: l.name ?? l.code, click: () => switchTo(l.code) }))"
    :content="{ align: 'end', sideOffset: 6 }"
  >
    <UButton
      icon="i-lucide-languages"
      color="neutral"
      variant="ghost"
      size="sm"
      class="rounded-full"
      :aria-label="'Switch language'"
    />
  </UDropdownMenu>
</template>
