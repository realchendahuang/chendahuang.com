<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    required: true
  }
})

const navLinks = useNavLinks()
const { t, locale } = useI18n()

useHead(() => ({
  htmlAttrs: {
    lang: locale.value === 'en' ? 'en' : locale.value === 'ja' ? 'ja' : locale.value === 'es' ? 'es' : locale.value === 'pt' ? 'pt-BR' : locale.value === 'fr' ? 'fr' : locale.value === 'de' ? 'de' : locale.value === 'ar' ? 'ar' : 'zh-CN',
    dir: locale.value === 'ar' ? 'rtl' : 'ltr'
  }
}))

useSeoMeta({
  title: () => t('error.title'),
  description: () => t('error.description')
})
</script>

<template>
  <div>
    <AppHeader :links="navLinks" />

    <UMain>
      <UContainer>
        <UPage>
          <UError :error="error" />
        </UPage>
      </UContainer>
    </UMain>

    <AppFooter />

    <UToaster />
  </div>
</template>
