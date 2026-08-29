<script setup lang="ts">
const { page } = useCollectionPageSeo('/skills')
const { t, locale } = useI18n()

const { data: skills } = await useAsyncData(`skills:${locale.value}`, () => {
  return queryCollection('skills').where('locale', '=', locale.value).order('date', 'DESC').all()
})
</script>

<template>
  <div>
    <UContainer class="py-14 sm:py-20">
      <h1 class="t-h1">
        {{ page.title }}
      </h1>
    </UContainer>

    <section
      class="border-t border-default pb-20 sm:pb-28"
    >
      <FadeUp :amount="0.08">
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
                <h2 class="t-h3">
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
                :label="t('skills.readOnline')"
                trailing-icon="i-lucide-arrow-up-right"
                color="neutral"
              />
              <UButton
                :to="skill.url"
                target="_blank"
                :aria-label="t('skills.viewOnGithub')"
                icon="i-simple-icons-github"
                color="neutral"
                variant="soft"
              />
            </div>
          </article>
        </UContainer>
      </FadeUp>
    </section>
  </div>
</template>
