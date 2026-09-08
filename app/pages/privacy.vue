<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => `${t('privacy.title')} - 陈大黄`,
  description: () => t('privacy.title')
})

defineOgImage('Portfolio', { title: () => t('privacy.title'), description: () => t('privacy.title') })
</script>

<template>
  <UContainer class="py-14 sm:py-20">
    <h1 class="t-h1">
      {{ t('privacy.title') }}
    </h1>
    <p class="mt-6 max-w-2xl whitespace-pre-line text-sm leading-7 text-muted sm:text-[15px]">
      {{ t('privacy.body') }}
    </p>
  </UContainer>
</template>
