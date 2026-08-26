<script setup lang="ts">
const { global } = useAppConfig()
const { t } = useI18n()

const sponsorLink = computed(() => global.sponsorLink)

const links = computed(() => [
  { label: t('landing.xLink'), icon: 'i-simple-icons-x', to: 'https://x.com/realchendahuang', description: t('landing.xDesc') },
  { label: t('landing.githubLink'), icon: 'i-simple-icons-github', to: 'https://github.com/realchendahuang', description: t('landing.githubDesc') },
  { label: t('landing.rssLink'), icon: 'i-lucide-rss', to: '/rss.xml', description: t('landing.rssDesc') }
])
</script>

<template>
  <section
    id="about"
    class="scroll-mt-20 border-t border-default py-14 sm:py-20"
  >
    <UContainer>
      <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <p class="editorial-label">
            {{ t('landing.about') }}
          </p>
          <h2 class="mt-4 max-w-2xl text-balance text-2xl font-semibold leading-snug tracking-[-0.03em] text-highlighted sm:text-3xl">
            {{ t('landing.aboutTitle') }}
          </h2>
          <p class="mt-4 max-w-2xl text-[15px] leading-7 text-muted">
            {{ t('landing.aboutBody') }}
          </p>
          <p
            v-if="global.email"
            class="mt-6"
          >
            <UButton
              :to="`mailto:${global.email}`"
              icon="i-lucide-mail"
              color="neutral"
              variant="soft"
              :label="global.email"
            />
          </p>
          <p
            v-if="sponsorLink"
            class="mt-4"
          >
            <UButton
              :to="sponsorLink"
              target="_blank"
              icon="i-lucide-heart"
              color="primary"
              variant="soft"
              :label="t('landing.support')"
            />
          </p>
        </div>

        <div class="space-y-3">
          <NuxtLink
            v-for="link in links"
            :key="link.label"
            :to="link.to"
            :target="link.to.startsWith('http') ? '_blank' : undefined"
            class="group flex items-start gap-4 rounded-lg border border-default p-4 transition-colors hover:border-primary/40 hover:bg-elevated"
          >
            <span class="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-elevated text-muted transition-colors group-hover:text-primary">
              <UIcon
                :name="link.icon"
                class="size-4.5"
              />
            </span>
            <div class="min-w-0">
              <h3 class="text-sm font-medium text-highlighted group-hover:text-primary">
                {{ link.label }}
              </h3>
              <p class="mt-0.5 text-xs leading-5 text-muted">
                {{ link.description }}
              </p>
            </div>
            <UIcon
              name="i-lucide-arrow-up-right"
              class="ml-auto mt-1 size-4 shrink-0 text-dimmed transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
            />
          </NuxtLink>
        </div>
      </div>
    </UContainer>
  </section>
</template>
