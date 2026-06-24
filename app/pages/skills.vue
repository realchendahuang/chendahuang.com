<script setup lang="ts">
const { data: page } = await useAsyncData('skills-page', () => {
  return queryCollection('pages').path('/skills').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: '页面未找到',
    fatal: true
  })
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
  ogDescription: description
})

defineOgImage('Portfolio', { title, description })
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :links="page.links"
      :ui="{
        title: 'mx-0! text-left',
        description: 'mx-0! text-left',
        links: 'justify-start'
      }"
    />
    <UPageSection
      :ui="{
        container: 'pt-0!'
      }"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Motion
          v-for="(skill, index) in skills"
          :key="skill.title"
          :initial="{ opacity: 0, transform: 'translateY(10px)' }"
          :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ delay: 0.15 * index }"
          :in-view-options="{ once: true }"
        >
          <UPageCard
            :title="skill.title"
            :description="skill.description"
            variant="subtle"
            class="group h-full"
            :to="skill.onlineUrl || skill.url"
            target="_blank"
            :ui="{
              container: 'min-w-0 overflow-hidden',
              wrapper: 'min-w-0 w-full',
              body: 'min-w-0 w-full',
              description: 'break-words',
              footer: 'min-w-0 w-full'
            }"
          >
            <template #leading>
              <span
                class="inline-flex items-center justify-center size-10 rounded-lg"
                :style="{ backgroundColor: (skill.color || '#888') + '22', color: skill.color || '#888' }"
              >
                <UIcon
                  :name="skill.icon || 'i-lucide-sparkles'"
                  class="size-5"
                />
              </span>
            </template>

            <template #footer>
              <div class="flex flex-col gap-3 w-full">
                <div class="flex flex-wrap items-center gap-2">
                  <UBadge
                    v-for="tag in skill.tags"
                    :key="tag"
                    :label="tag"
                    color="neutral"
                    variant="soft"
                    size="sm"
                  />
                </div>
                <div
                  v-if="skill.install"
                  class="flex items-center gap-2 min-w-0 w-full max-w-full overflow-hidden bg-elevated/60 rounded-lg px-3 py-2 text-xs font-mono text-muted"
                >
                  <UIcon
                    name="i-lucide-terminal"
                    class="size-3.5 shrink-0"
                  />
                  <span class="min-w-0 truncate">{{ skill.install }}</span>
                </div>
              </div>
            </template>

            <template #trailing>
              <div
                v-if="skill.stars !== undefined"
                class="inline-flex items-center gap-1 text-xs text-muted"
              >
                <UIcon
                  name="i-lucide-star"
                  class="size-3.5"
                />
                {{ skill.stars }}
              </div>
            </template>

            <template #action>
              <div class="flex items-center gap-3">
                <UButton
                  v-if="skill.onlineUrl"
                  :to="skill.onlineUrl"
                  target="_blank"
                  label="在线阅读"
                  color="primary"
                  variant="link"
                  class="px-0"
                >
                  <template #trailing>
                    <UIcon
                      name="i-lucide-arrow-right"
                      class="size-4 transition-all opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
                    />
                  </template>
                </UButton>
                <UButton
                  :to="skill.url"
                  target="_blank"
                  label="GitHub"
                  color="neutral"
                  variant="ghost"
                  size="sm"
                  icon="i-simple-icons-github"
                />
              </div>
            </template>
          </UPageCard>
        </Motion>
      </div>

      <UPageCTA
        variant="naked"
        class="mt-12"
        :ui="{ container: 'py-8' }"
      >
        <template #description>
          <p class="text-muted">
            还有更多 Skill 在路上。想看我做哪方面的能力包？在
            <ULink
              to="https://x.com/realchendahuang"
              target="_blank"
              class="text-primary"
            >X</ULink>
            上告诉我。
          </p>
        </template>
      </UPageCTA>
    </UPageSection>
  </UPage>
</template>
