<script setup lang="ts">
const { data: page } = await useAsyncData('projects-page', () => {
  return queryCollection('pages').path('/projects').first()
})
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: '页面未找到', fatal: true })
}

const { data: projects } = await useAsyncData('projects', () => {
  return queryCollection('projects').order('date', 'DESC').all()
})

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogUrl: toCanonicalUrl('/projects'),
  twitterTitle: title,
  twitterDescription: description
})

defineOgImage('Portfolio', { title, description })
</script>

<template>
  <div v-if="page">
    <UContainer class="py-14 sm:py-20">
      <p class="editorial-label">
        项目
      </p>
      <h1 class="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-highlighted sm:text-4xl">
        {{ page.title }}
      </h1>
      <p class="mt-4 max-w-2xl text-base leading-7 text-muted">
        {{ page.description }}
      </p>
    </UContainer>

    <section class="border-t border-default pb-20 sm:pb-28">
      <UContainer>
        <article
          v-for="(project, index) in projects"
          :key="project.title"
          class="grid gap-5 border-b border-default py-8 sm:grid-cols-[4rem_minmax(0,1fr)_auto] sm:py-10"
        >
          <div class="flex items-start gap-3 sm:block">
            <span class="text-xs text-dimmed">{{ String(index + 1).padStart(2, '0') }}</span>
            <span
              class="ml-auto inline-flex size-10 items-center justify-center rounded-lg sm:mt-8"
              :style="{ backgroundColor: (project.color || '#888') + '18', color: project.color || '#888' }"
            >
              <UIcon
                :name="project.icon || 'i-lucide-box'"
                class="size-5"
              />
            </span>
          </div>

          <div class="min-w-0">
            <p class="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-muted">
              {{ project.type }}
            </p>
            <div class="flex flex-wrap items-center gap-3">
              <h2 class="text-xl font-semibold tracking-[-0.02em] text-highlighted sm:text-2xl">
                {{ project.title }}
              </h2>
              <span
                v-if="project.stars !== undefined"
                class="inline-flex items-center gap-1 text-xs text-dimmed"
              >
                <UIcon name="i-lucide-star" /> {{ project.stars }}
              </span>
            </div>
            <p class="mt-3 max-w-2xl text-[15px] leading-7 text-muted">
              {{ project.description }}
            </p>
            <div class="mt-4 flex flex-wrap gap-2">
              <UBadge
                v-for="tag in project.tags"
                :key="tag"
                :label="tag"
                color="neutral"
                variant="soft"
              />
            </div>
          </div>

          <div class="flex items-start gap-2 sm:justify-end">
            <UButton
              v-if="project.onlineUrl"
              :to="project.onlineUrl"
              target="_blank"
              label="在线体验"
              trailing-icon="i-lucide-arrow-up-right"
              color="neutral"
            />
            <UButton
              :to="project.url"
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
