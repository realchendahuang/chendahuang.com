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
            v-for="(project, index) in projects"
            :key="project.title"
            class="grid gap-7 border-b border-default py-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(26rem,1.15fr)] lg:items-center lg:gap-12 lg:py-14"
          >
            <div class="order-2 min-w-0 lg:order-1">
              <div class="mb-5 flex items-center gap-3">
                <span class="text-xs text-dimmed">{{ String(index + 1).padStart(2, '0') }}</span>
                <span
                  class="inline-flex size-9 items-center justify-center rounded-lg"
                  :style="{ backgroundColor: (project.color || '#888') + '18', color: project.color || '#888' }"
                >
                  <UIcon
                    :name="project.icon || 'i-lucide-box'"
                    class="size-4.5"
                  />
                </span>
              </div>
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
              <div class="mt-6 flex items-center gap-2">
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
                  label="GitHub"
                  icon="i-simple-icons-github"
                  color="neutral"
                  variant="soft"
                />
              </div>
            </div>

            <NuxtLink
              v-if="project.image"
              :to="project.onlineUrl || project.url"
              target="_blank"
              class="group order-1 block overflow-hidden rounded-xl border border-default bg-elevated shadow-sm lg:order-2"
              :aria-label="`查看 ${project.title}`"
            >
              <img
                :src="project.image"
                :alt="project.imageAlt || `${project.title} 项目预览`"
                width="1280"
                height="720"
                loading="lazy"
                decoding="async"
                class="aspect-video w-full object-cover transition duration-500 group-hover:scale-[1.015]"
              >
            </NuxtLink>
          </article>
        </UContainer>
      </Motion>
    </section>
  </div>
</template>
