<script setup lang="ts">
const { locale, locales, t } = useI18n()

const switchLocalePath = useSwitchLocalePath()

const items = computed(() =>
  (locales.value as Array<{ code: string, name?: string }>)
    .filter(l => l.code !== locale.value)
    .map(l => ({
      label: l.name?.split(' ')[0] ?? l.code,
      to: switchLocalePath(l.code as 'zh' | 'en' | 'ja' | 'es' | 'pt' | 'fr' | 'de' | 'ru' | 'ar') || undefined,
      // switchLocalePath 已产出目标语言的最终路径;不加此项 ULink 会把它当未本地化路径
      // 再按"当前语言"二次本地化,zh(默认语言无前缀)的目标会被改写回当前语言路径,
      // 导致 en→zh 等切回默认语言的操作失效(点击等于原地不动)。
      locale: false
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
