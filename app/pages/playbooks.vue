<script setup lang="ts">
const { page } = useCollectionPageSeo('/playbooks')
const { t, locale } = useI18n()

const { data: playbooks } = await useAsyncData(`playbooks:${locale.value}`, () => {
  return queryCollection('playbooks').where('locale', '=', locale.value).order('date', 'DESC').all()
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
            v-for="(playbook, index) in playbooks"
            :key="playbook.title"
            class="grid gap-5 border-b border-default py-8 sm:grid-cols-[4rem_minmax(0,1fr)_auto] sm:py-10"
          >
            <div class="flex items-start gap-3 sm:block">
              <span class="text-xs text-dimmed">{{ String(index + 1).padStart(2, '0') }}</span>
              <span
                class="ml-auto inline-flex size-10 items-center justify-center rounded-lg sm:mt-8"
                :style="{ backgroundColor: (playbook.color || '#888') + '18', color: playbook.color || '#888' }"
              >
                <UIcon
                  :name="playbook.icon || 'i-lucide-book'"
                  class="size-5"
                />
              </span>
            </div>

            <div>
              <div class="flex flex-wrap items-center gap-3">
                <h2 class="t-h3">
                  {{ playbook.title }}
                </h2>
                <span
                  v-if="playbook.stars !== undefined"
                  class="inline-flex items-center gap-1 text-xs text-dimmed"
                >
                  <UIcon name="i-lucide-star" /> {{ playbook.stars }}
                </span>
              </div>
              <p class="mt-3 max-w-2xl text-[15px] leading-7 text-muted">
                {{ playbook.description }}
              </p>
              <div class="mt-4 flex flex-wrap gap-2">
                <UBadge
                  v-for="tag in playbook.tags"
                  :key="tag"
                  :label="tag"
                  color="neutral"
                  variant="soft"
                />
              </div>
            </div>

            <div class="flex items-start gap-2 sm:justify-end">
              <UButton
                :to="playbook.onlineUrl"
                target="_blank"
                :label="t('playbooks.readOnline')"
                trailing-icon="i-lucide-arrow-up-right"
                color="neutral"
              />
              <UButton
                :to="playbook.url"
                target="_blank"
                :aria-label="t('playbooks.viewOnGithub')"
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
