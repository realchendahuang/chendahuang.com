<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()

const { data: posts } = await useAsyncData('index-blogs', () =>
  queryCollection('blog').order('date', 'DESC').limit(3).all()
)
</script>

<template>
  <section
    id="writing"
    class="scroll-mt-16 bg-neutral-950 py-20 text-white sm:py-28"
  >
    <UContainer>
      <div class="grid gap-5 sm:grid-cols-[13rem_1fr] sm:gap-12">
        <p class="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400">
          Latest writing
        </p>
        <h2 class="max-w-3xl text-balance text-4xl font-bold leading-[1.08] tracking-[-0.045em] sm:text-5xl">
          {{ page.blog.description }}
        </h2>
      </div>

      <div class="mt-14 sm:mt-16">
        <NuxtLink
          v-for="post in posts"
          :key="post.path"
          :to="post.path"
          class="group grid grid-cols-[minmax(0,1fr)_1.5rem] gap-5 border-t border-neutral-800 py-8 last:border-b sm:grid-cols-[10rem_minmax(0,1fr)_2rem] sm:gap-8 sm:py-9"
        >
          <p class="col-span-2 text-xs font-medium text-neutral-400 sm:col-span-1">
            {{ formatShortDate(post.date) }} · {{ post.minRead }} 分钟
          </p>

          <div>
            <h3 class="text-balance text-2xl font-semibold leading-tight tracking-[-0.035em] sm:text-3xl">
              {{ post.title }}
            </h3>
            <p class="mt-3 max-w-3xl leading-7 text-neutral-400">
              {{ post.description }}
            </p>
          </div>

          <UIcon
            name="i-lucide-arrow-right"
            class="mt-1 size-5 text-neutral-400 transition-transform group-hover:translate-x-1.5 group-hover:text-blue-400"
          />
        </NuxtLink>
      </div>

      <UButton
        to="/blog"
        label="查看全部文章"
        trailing-icon="i-lucide-arrow-right"
        color="neutral"
        variant="soft"
        class="mt-8 bg-white/10 text-white hover:bg-white/15"
      />
    </UContainer>
  </section>
</template>
