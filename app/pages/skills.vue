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
    <UContainer class="py-14 sm:py-20">
      <h1 class="max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-highlighted sm:text-4xl">
        {{ page.title }}
      </h1>
    </UContainer>

    <section
      class="border-t border-default pb-20 sm:pb-28"
    >
      <Motion
        :initial="{ opacity: 0, y: 24 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :viewport="{ once: true, amount: 0.08 }"
        :transition="{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }"
      >
        <UContainer>
          <article
            v-for="(skill, index) in skills"
            :key="skill.title"
            class="grid gap-5 border-b border-default py-8 sm:grid-cols-[4rem_minmax(0,1fr)_auto] sm:py-10"
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
                <h2 class="text-xl font-semibold tracking-[-0.02em] text-highlighted sm:text-2xl">
                  {{ skill.title }}
                </h2>
                <span
                  v-if="skill.stars !== undefined"
                  class="inline-flex items-center gap-1 text-xs text-dimmed"
                >
                  <UIcon name="i-lucide-star" /> {{ skill.stars }}
                </span>
              </div>
              <p class="mt-3 max-w-2xl text-[15px] leading-7 text-muted">
                {{ skill.description }}
              </p>
              <div class="mt-4 flex flex-wrap gap-2">
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
      </Motion>
    </section>
  </div>
</template>
