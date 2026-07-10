<script setup lang="ts">
const { data: page } = await useAsyncData('skills-page', () => {
  return queryCollection('pages').path('/skills').first()
})
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: '页面未找到', fatal: true })
}

const { data: skills } = await useAsyncData('skills', () => {
  return queryCollection('skills').order('date', 'DESC').all()
})

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogUrl: toCanonicalUrl('/skills'),
  twitterTitle: title,
  twitterDescription: description
})

defineOgImage('Portfolio', { title, description })
</script>

<template>
  <div v-if="page">
    <UContainer class="py-20 sm:py-28">
      <p class="editorial-label">
        Agent capabilities
      </p>
      <h1 class="mt-5 max-w-4xl text-5xl font-bold leading-[1.02] tracking-[-0.055em] text-highlighted sm:text-7xl">
        {{ page.title }}
      </h1>
      <p class="mt-6 max-w-3xl text-lg leading-8 text-muted">
        {{ page.description }}
      </p>
    </UContainer>

    <section class="border-t border-default pb-24 sm:pb-32">
      <UContainer>
        <article
          v-for="(skill, index) in skills"
          :key="skill.title"
          class="grid gap-7 border-b border-default py-10 sm:grid-cols-[4rem_minmax(0,1fr)_auto] sm:py-12"
        >
          <div class="flex items-start gap-3 sm:block">
            <span class="text-xs text-dimmed">{{ String(index + 1).padStart(2, '0') }}</span>
            <span
              class="ml-auto inline-flex size-10 items-center justify-center rounded-lg sm:mt-8"
              :style="{ backgroundColor: (skill.color || '#888') + '18', color: skill.color || '#888' }"
            >
              <UIcon
                :name="skill.icon || 'i-lucide-sparkles'"
                class="size-5"
              />
            </span>
          </div>

          <div class="min-w-0">
            <div class="flex flex-wrap items-center gap-3">
              <h2 class="text-3xl font-semibold tracking-[-0.04em] text-highlighted sm:text-4xl">
                {{ skill.title }}
              </h2>
              <span
                v-if="skill.stars !== undefined"
                class="inline-flex items-center gap-1 text-xs text-dimmed"
              >
                <UIcon name="i-lucide-star" /> {{ skill.stars }}
              </span>
            </div>
            <p class="mt-5 max-w-3xl leading-7 text-muted">
              {{ skill.description }}
            </p>
            <div class="mt-6 flex flex-wrap gap-2">
              <UBadge
                v-for="tag in skill.tags"
                :key="tag"
                :label="tag"
                color="neutral"
                variant="soft"
              />
            </div>
            <div
              v-if="skill.install"
              class="mt-6 flex max-w-2xl items-center gap-3 overflow-hidden rounded-lg bg-elevated px-4 py-3 font-mono text-xs text-muted"
            >
              <UIcon
                name="i-lucide-terminal"
                class="size-4 shrink-0"
              />
              <code class="truncate">{{ skill.install }}</code>
            </div>
          </div>

          <div class="flex items-start gap-2 sm:justify-end">
            <UButton
              v-if="skill.onlineUrl"
              :to="skill.onlineUrl"
              target="_blank"
              label="在线阅读"
              trailing-icon="i-lucide-arrow-up-right"
              color="neutral"
            />
            <UButton
              :to="skill.url"
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
