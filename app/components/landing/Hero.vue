<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <section class="overflow-hidden">
    <UContainer class="grid min-h-[calc(100svh-4rem)] items-end gap-14 py-20 sm:py-24 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.55fr)] lg:gap-20 lg:py-28">
      <div class="pb-2 lg:pb-4">
        <h1 class="max-w-4xl text-balance text-[2.75rem] font-bold leading-[1.02] tracking-[-0.055em] text-highlighted sm:text-7xl sm:leading-[0.98] sm:tracking-[-0.065em] lg:text-[5.5rem]">
          {{ page.hero.titleStart }}<span class="whitespace-nowrap text-primary">{{ page.hero.titleAccent }}</span>{{ page.hero.titleEnd }}
        </h1>

        <div class="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p class="max-w-2xl text-base leading-8 text-muted sm:text-lg">
            {{ page.hero.description }}
          </p>

          <div class="flex shrink-0 flex-wrap items-center gap-2">
            <UButton
              v-for="link in page.hero.links"
              :key="link.label"
              v-bind="link"
              size="lg"
            />
          </div>
        </div>
      </div>

      <aside class="relative flex min-h-[22rem] flex-col justify-between overflow-hidden rounded-[1.75rem] bg-neutral-950 p-8 text-white sm:min-h-[27rem] sm:p-9">
        <div class="absolute -right-24 -top-24 size-64 rounded-full bg-blue-600" />

        <NuxtImg
          src="/avatar.jpg"
          alt="陈大黄"
          width="112"
          height="112"
          class="relative z-10 size-24 rounded-full border-4 border-white/15 object-cover sm:size-28"
        />

        <div class="relative z-10">
          <p class="text-4xl font-bold leading-[1.05] tracking-[-0.05em] sm:text-[2.6rem]">
            陈大黄<br>独立开发者
          </p>
          <p class="mt-5 leading-7 text-neutral-400">
            产品 · 设计 · 开发 · 运营<br>
            开源项目持续进行中
          </p>
        </div>
      </aside>
    </UContainer>
  </section>
</template>
