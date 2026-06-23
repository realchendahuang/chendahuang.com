<script setup lang="ts">
const { data: page } = await useAsyncData('playbooks-page', () => {
  return queryCollection('pages').path('/playbooks').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: '页面未找到',
    fatal: true
  })
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
          v-for="(playbook, index) in playbooks"
          :key="playbook.title"
          :initial="{ opacity: 0, transform: 'translateY(10px)' }"
          :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ delay: 0.15 * index }"
          :in-view-options="{ once: true }"
        >
          <UPageCard
            :title="playbook.title"
            :description="playbook.description"
            variant="subtle"
            class="group h-full"
            :to="playbook.onlineUrl"
            target="_blank"
          >
            <template #leading>
              <span
                class="inline-flex items-center justify-center size-10 rounded-lg"
                :style="{ backgroundColor: (playbook.color || '#888') + '22', color: playbook.color || '#888' }"
              >
                <UIcon
                  :name="playbook.icon || 'i-lucide-book'"
                  class="size-5"
                />
              </span>
            </template>

            <template #footer>
              <div class="flex flex-wrap items-center gap-2">
                <UBadge
                  v-for="tag in playbook.tags"
                  :key="tag"
                  :label="tag"
                  color="neutral"
                  variant="soft"
                  size="sm"
                />
              </div>
            </template>

            <template #trailing>
              <div class="flex flex-col items-end gap-2">
                <div
                  v-if="playbook.stars !== undefined"
                  class="inline-flex items-center gap-1 text-xs text-muted"
                >
                  <UIcon
                    name="i-lucide-star"
                    class="size-3.5"
                  />
                  {{ playbook.stars }}
                </div>
              </div>
            </template>

            <template #action>
              <div class="flex items-center gap-3">
                <UButton
                  :to="playbook.onlineUrl"
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
                  :to="playbook.url"
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
            还有更多 Playbook 在路上。想看我写哪方面的实战手册？在
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
