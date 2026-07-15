<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

const { footer, global } = useAppConfig()

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <UPageHero
    :ui="{
      headline: 'flex items-center justify-center',
      title: 'text-shadow-md max-w-lg mx-auto',
      description: () => 'mt-3 mx-auto max-w-3xl break-keep text-pretty text-base leading-7 text-muted',
      links: 'mt-4 flex-col justify-center items-center'
    }"
  >
    <template #headline>
      <Motion
        :initial="{
          opacity: 0,
          y: 12
        }"
        :animate="{
          opacity: 1,
          y: 0
        }"
        :transition="{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.1
        }"
      >
        <UColorModeAvatar
          class="size-18 ring ring-default ring-offset-3 ring-offset-bg"
          :light="global.picture?.light!"
          :dark="global.picture?.dark!"
          :alt="global.picture?.alt!"
        />
      </Motion>
    </template>

    <template #title>
      <Motion
        :initial="{
          opacity: 0,
          y: 12
        }"
        :animate="{
          opacity: 1,
          y: 0
        }"
        :transition="{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.16
        }"
      >
        {{ page.title }}
      </Motion>
    </template>

    <template #description>
      <Motion
        :initial="{
          opacity: 0,
          y: 12
        }"
        :animate="{
          opacity: 1,
          y: 0
        }"
        :transition="{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.3
        }"
      >
        {{ page.description }}
      </Motion>
    </template>

    <template #links>
      <Motion
        :initial="{
          opacity: 0,
          y: 12
        }"
        :animate="{
          opacity: 1,
          y: 0
        }"
        :transition="{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.5
        }"
      >
        <div
          v-if="page.hero.links?.length"
          class="flex items-center gap-2"
        >
          <UButton v-bind="page.hero.links[0]" />
          <UButton
            v-for="(link, index) in page.hero.links.slice(1)"
            :key="index"
            v-bind="link"
          />
        </div>
      </Motion>

      <div class="gap-x-4 inline-flex mt-4">
        <Motion
          v-for="(link, index) of footer?.links"
          :key="index"

          :initial="{
            opacity: 0,
            y: 8
          }"
          :animate="{
            opacity: 1,
            y: 0
          }"
          :transition="{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.5 + index * 0.1
          }"
        >
          <UButton
            v-bind="{ size: 'md', color: 'neutral', variant: 'ghost', ...link }"
          />
        </Motion>
      </div>
    </template>

    <UMarquee
      v-if="page.hero.images?.length"
      pause-on-hover
      class="py-2 -mx-8 sm:-mx-12 lg:-mx-16 [--duration:40s]"
    >
      <Motion
        v-for="(img, index) in page.hero.images"
        :key="index"
        :initial="{
          opacity: 0,
          y: 16
        }"
        :animate="{
          opacity: 1,
          y: 0
        }"
        :transition="{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
          delay: index * 0.1
        }"
      >
        <NuxtImg
          width="234"
          height="234"
          class="rounded-lg aspect-square object-cover"
          :class="index % 2 === 0 ? '-rotate-2' : 'rotate-2'"
          v-bind="img"
        />
      </Motion>
    </UMarquee>
  </UPageHero>
</template>
