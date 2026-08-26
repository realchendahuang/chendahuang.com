<script setup lang="ts">
const { page } = useCollectionPageSeo('/projects')
const { t, locale } = useI18n()

const { data: projects } = await useAsyncData(`projects:${locale.value}`, () => {
  return queryCollection('projects').where('locale', '=', locale.value).order('date', 'DESC').all()
})
</script>

<template>
  <div>
    <UContainer class="py-14 sm:py-20">
      <h1 class="t-h1">
        {{ page.title }}
      </h1>
      <p class="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">
        {{ page.description }}
      </p>
    </UContainer>

    <div
      v-if="projects?.length"
      class="overflow-hidden py-2"
    >
      <UMarquee
        pause-on-hover
        class="py-2 -mx-8 sm:-mx-12 lg:-mx-16 [--duration:32s]"
      >
        <NuxtLink
          v-for="project in projects"
          :key="project.title"
          :to="project.onlineUrl || project.url"
          target="_blank"
          class="shrink-0"
        >
          <NuxtImg
            v-if="project.image"
            :src="project.image"
            :alt="project.imageAlt || t('projects.preview', { title: project.title })"
            width="234"
            height="234"
            loading="lazy"
            class="size-36 rounded-lg object-cover sm:size-44"
          />
        </NuxtLink>
      </UMarquee>
    </div>

    <section
      class="mt-8 border-t border-default pb-20 sm:pb-28"
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
                <h2 class="t-h3">
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
                  :label="t('projects.tryOnline')"
                  trailing-icon="i-lucide-arrow-up-right"
                  color="neutral"
                />
                <UButton
                  :to="project.url"
                  target="_blank"
                  :label="t('projects.github')"
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
              :aria-label="t('projects.view', { title: project.title })"
            >
              <NuxtImg
                :src="project.image"
                :alt="project.imageAlt || t('projects.preview', { title: project.title })"
                width="1280"
                height="720"
                loading="lazy"
                class="aspect-video w-full object-cover transition duration-500 group-hover:scale-[1.015]"
              />
            </NuxtLink>
          </article>
        </UContainer>
      </Motion>
    </section>
  </div>
</template>
