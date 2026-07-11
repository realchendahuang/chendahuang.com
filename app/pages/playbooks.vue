<script setup lang="ts">
const { data: page } = await useAsyncData('playbooks-page', () => {
  return queryCollection('pages').path('/playbooks').first()
})
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: '页面未找到', fatal: true })
}

const { data: playbooks } = await useAsyncData('playbooks', () => {
  return queryCollection('playbooks').order('date', 'DESC').all()
})

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogUrl: toCanonicalUrl('/playbooks'),
  twitterTitle: title,
  twitterDescription: description
})

defineOgImage('Portfolio', { title, description })
</script>

<template>
  <div v-if="page">
    <UContainer class="py-14 sm:py-20">
      <h1 class="max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-highlighted sm:text-4xl">
        {{ page.title }}
      </h1>
    </UContainer>

    <section class="border-t border-default pb-20 sm:pb-28">
      <UContainer>
        <article
          v-for="(playbook, index) in playbooks"
          :key="playbook.title"
          class="grid gap-5 border-b border-default py-8 sm:grid-cols-[4rem_minmax(0,1fr)_auto] sm:py-10"
        >
          <div class="flex items-start gap-3 sm:block">
            <span class="text-xs text-dimmed">{{ String(index + 1).padStart(2, '0') }}</span>
            <span
              class="ml-auto inline-flex size-10 items-center justify-center rounded-lg sm:mt-8"
              :style="{ backgroundColor: (playbook.color || '#888') + '18', color: playbook.color || '#888' }"
            >
              <UIcon
                :name="playbook.icon || 'i-lucide-book'"
                class="size-5"
              />
            </span>
          </div>

          <div>
            <div class="flex flex-wrap items-center gap-3">
              <h2 class="text-xl font-semibold tracking-[-0.02em] text-highlighted sm:text-2xl">
                {{ playbook.title }}
              </h2>
              <span
                v-if="playbook.stars !== undefined"
                class="inline-flex items-center gap-1 text-xs text-dimmed"
              >
                <UIcon name="i-lucide-star" /> {{ playbook.stars }}
              </span>
            </div>
            <p class="mt-3 max-w-2xl text-[15px] leading-7 text-muted">
              {{ playbook.description }}
            </p>
            <div class="mt-4 flex flex-wrap gap-2">
              <UBadge
                v-for="tag in playbook.tags"
                :key="tag"
                :label="tag"
                color="neutral"
                variant="soft"
              />
            </div>
          </div>

          <div class="flex items-start gap-2 sm:justify-end">
            <UButton
              :to="playbook.onlineUrl"
              target="_blank"
              label="在线阅读"
              trailing-icon="i-lucide-arrow-up-right"
              color="neutral"
            />
            <UButton
              :to="playbook.url"
              target="_blank"
              aria-label="在 GitHub 查看"
              icon="i-simple-icons-github"
              color="neutral"
              variant="soft"
            />
          </div>
        </article>
      </UContainer>
    </section>
  </div>
</template>
