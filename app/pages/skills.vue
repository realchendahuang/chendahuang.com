<script setup lang="ts">
const { data: page } = await useAsyncData('skills-page', () => {
  return queryCollection('pages').path('/skills').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
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
            :to="skill.url"
            target="_blank"
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
                  class="flex items-center gap-2 bg-elevated/60 rounded-lg px-3 py-2 text-xs font-mono text-muted"
                >
                  <UIcon
                    name="i-lucide-terminal"
                    class="size-3.5 shrink-0"
                  />
                  <span class="truncate">{{ skill.install }}</span>
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
              <UButton
                :to="skill.url"
                target="_blank"
                label="GitHub 仓库"
                color="primary"
                variant="link"
                class="px-0"
                icon="i-simple-icons-github"
              >
                <template #trailing>
                  <UIcon
                    name="i-lucide-arrow-right"
                    class="size-4 transition-all opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
                  />
                </template>
              </UButton>
            </template>
          </UPageCard>
        </Motion>
      </div>

      <UPageCTA
        variant="subtle"
        class="mt-12"
        :ui="{ container: 'py-10' }"
        title="两个 Skill 是一对姐妹"
      >
        <template #description>
          <p class="text-muted">
            <strong class="text-highlighted">dahuang-human-tone</strong> 负责去 AI 味——把中文从"像模型在表演"拉回"像具体人在说话"；
            <strong class="text-highlighted">dahuang-ai-tone</strong> 负责加味——把文本改写成 GPT/Claude/Gemini/豆包的风格，或者检测一段文本最像哪个模型写的。
            知道什么是 AI 味，才能在别处去掉 AI 味。两个配合着用，玩得更明白。
          </p>
        </template>
      </UPageCTA>
    </UPageSection>
  </UPage>
</template>
