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
    class="scroll-mt-20 border-t border-default py-20 sm:py-28"
  >
    <UContainer>
      <div class="grid gap-5 sm:grid-cols-[13rem_1fr] sm:gap-12">
        <p class="editorial-label pt-2">
          Selected work
        </p>
        <h2 class="max-w-3xl text-balance text-4xl font-bold leading-[1.08] tracking-[-0.045em] text-highlighted sm:text-5xl">
          我做过，也仍在继续做的东西。
        </h2>
      </div>

      <div class="mt-14 border-t border-default sm:mt-16">
        <NuxtLink
          v-for="(work, index) in works"
          :key="work.title"
          :to="work.to"
          target="_blank"
          class="group grid grid-cols-[2.5rem_minmax(0,1fr)_1.5rem] items-center gap-4 border-b border-default py-7 transition-colors hover:bg-elevated sm:grid-cols-[4rem_minmax(0,1fr)_17rem_2rem] sm:gap-7 sm:px-2 sm:py-8"
        >
          <span class="text-xs text-muted">{{ String(index + 1).padStart(2, '0') }}</span>

          <div class="min-w-0">
            <p class="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-muted sm:hidden">
              {{ work.type }}
            </p>
            <h3 class="text-xl font-semibold tracking-[-0.025em] text-highlighted sm:text-2xl">
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
