<script setup lang="ts">
const { page } = useCollectionPageSeo('/friends')
const { t, locale } = useI18n()

const { data: friends } = await useAsyncData(`friends:${locale.value}`, () =>
  queryCollection('friends').where('locale', '=', locale.value).all()
)
</script>

<template>
  <div>
    <UContainer class="py-14 sm:py-20">
      <div>
        <h1 class="t-h1">
          {{ page.title }}
        </h1>
        <p class="mt-3 max-w-2xl text-sm leading-6 text-muted">
          {{ page.description }}
        </p>
      </div>
    </UContainer>

    <section class="border-t border-default pb-20 sm:pb-28">
      <UContainer>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="friend in friends"
            :key="friend.name"
            :to="friend.url"
            target="_blank"
            class="group flex items-start gap-4 rounded-lg border border-default p-5 transition-colors hover:border-primary/40 hover:bg-elevated"
          >
            <NuxtImg
              v-if="friend.avatar"
              :src="friend.avatar"
              :alt="t('friends.avatar', { name: friend.name })"
              width="48"
              height="48"
              loading="lazy"
              class="size-12 shrink-0 rounded-full object-cover"
            />
            <div
              v-else
              class="flex size-12 shrink-0 items-center justify-center rounded-full bg-elevated text-lg font-semibold text-muted"
            >
              {{ friend.name.slice(0, 1) }}
            </div>
            <div class="min-w-0">
              <h2 class="truncate text-base font-semibold text-highlighted transition-colors group-hover:text-primary">
                {{ friend.name }}
              </h2>
              <p class="mt-1 line-clamp-2 text-sm leading-6 text-muted">
                {{ friend.description }}
              </p>
              <p class="mt-2 truncate text-xs text-dimmed">
                {{ friend.url }}
              </p>
            </div>
            <UIcon
              name="i-lucide-arrow-up-right"
              class="ml-auto mt-1 size-4 shrink-0 text-dimmed transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
            />
          </NuxtLink>
        </div>

        <div
          v-if="!friends?.length"
          class="py-16 text-center"
        >
          <p class="text-sm text-muted">
            {{ t('friends.empty') }}
          </p>
        </div>
      </UContainer>
    </section>
  </div>
</template>
