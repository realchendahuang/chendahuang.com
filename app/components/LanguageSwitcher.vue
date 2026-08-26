<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() =>
  (locales.value as Array<{ code: string, name?: string }>).filter(l => l.code !== locale.value)
)

const switchTo = (code: string) => {
  const path = switchLocalePath(code as 'zh' | 'en')
  if (path) {
    navigateTo(path)
  } else {
    setLocale(code as 'zh' | 'en')
  }
}
</script>

<template>
  <UButton
    v-for="target in availableLocales"
    :key="target.code"
    :label="target.code === 'en' ? 'EN' : '中文'"
    color="neutral"
    variant="ghost"
    size="sm"
    class="rounded-full"
    :aria-label="target.code === 'en' ? 'Switch to English' : '切换到中文'"
    @click="switchTo(target.code)"
  />
</template>
