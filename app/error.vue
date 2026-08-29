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
    lang: getLocaleMeta(locale.value).language,
    dir: getLocaleMeta(locale.value).dir
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
