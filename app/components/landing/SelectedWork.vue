<script setup lang="ts">
const { data: projects } = await useAsyncData('index-projects', () => {
  return queryCollection('projects').order('date', 'DESC').all()
})

const works = computed(() => (projects.value || []).map(project => ({
  title: project.title,
  description: project.description,
  to: project.onlineUrl || project.url,
  type: project.type
})))
</script>

<template>
  <section
    id="work"
    class="scroll-mt-20 border-t border-default py-14 sm:py-20"
  >
    <UContainer>
      <div class="grid gap-4 sm:grid-cols-[10rem_1fr] sm:gap-10">
        <p class="editorial-label pt-1">
          作品
        </p>
        <h2 class="max-w-2xl text-balance text-2xl font-semibold leading-snug tracking-[-0.03em] text-highlighted sm:text-3xl">
          最近在做的项目
        </h2>
      </div>

      <div class="mt-10 border-t border-default sm:mt-12">
        <NuxtLink
          v-for="(work, index) in works"
          :key="work.title"
          :to="work.to"
          target="_blank"
          class="group grid grid-cols-[2.5rem_minmax(0,1fr)_1.5rem] items-center gap-4 border-b border-default py-5 transition-colors hover:bg-elevated sm:grid-cols-[4rem_minmax(0,1fr)_17rem_2rem] sm:gap-6 sm:px-2 sm:py-6"
        >
          <span class="text-xs text-muted">{{ String(index + 1).padStart(2, '0') }}</span>

          <div class="min-w-0">
            <p class="mb-1 text-xs font-medium text-muted sm:hidden">
              {{ work.type }}
            </p>
            <h3 class="text-base font-semibold tracking-[-0.02em] text-highlighted sm:text-lg">
              {{ work.title }}
            </h3>
          </div>

          <p class="hidden line-clamp-2 text-sm leading-6 text-muted sm:block">
            {{ work.description }}
          </p>

          <UIcon
            name="i-lucide-arrow-up-right"
            class="size-5 text-dimmed transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary"
          />
        </NuxtLink>
      </div>

      <div class="mt-8 flex justify-end">
        <UButton
          to="/projects"
          label="查看全部项目"
          trailing-icon="i-lucide-arrow-right"
          color="neutral"
          variant="soft"
        />
      </div>
    </UContainer>
  </section>
</template>
