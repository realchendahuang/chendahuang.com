<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: t('mirror.title'),
  description: t('mirror.description')
})

interface MirrorPost {
  id: string
  url: string
  date: string
  date_bj: string | null
  text: string
  likes: number
  bookmarks: number
  reposts: number
  views: number
  reply_to: string | null
}

interface MirrorRepo {
  name: string
  url: string
  description: string
  stars: number
  fork: boolean
  language: string | null
  pushed_at: string
  homepage: string
}

// 镜像数据是动态原始流,只在客户端拉取:SSR 期内部 fetch /mirror.json 会导致预渲染 500
const { data } = await useFetch<{
  fetched_at: string
  posts: MirrorPost[]
  repos: MirrorRepo[]
}>('/mirror.json', { server: false, default: () => ({ fetched_at: '', posts: [], repos: [] }) })

const fmtDate = (d: string | null) => (d ? d.slice(0, 10) : '')
const fmtCount = (n: number) => Intl.NumberFormat('en', { notation: 'compact' }).format(n)
</script>

<template>
  <div>
    <UContainer class="py-14 sm:py-20">
      <h1 class="t-h1">
        {{ t('mirror.title') }}
      </h1>
      <p class="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">
        {{ t('mirror.description') }}
      </p>
      <p
        v-if="data.fetched_at"
        class="mt-2 text-xs text-muted"
      >
        {{ t('mirror.fetchedAt', { date: data.fetched_at.replace('T', ' ') }) }}
      </p>
    </UContainer>

    <section class="border-t border-default pb-20 sm:pb-28">
      <UContainer>
        <h2 class="flex items-center gap-2 py-6 text-lg font-semibold text-highlighted">
          <UIcon
            name="i-lucide-twitter"
            class="size-5"
          />
          X
          <span class="text-sm font-normal text-muted">{{ data.posts.length }}</span>
        </h2>
        <div class="grid gap-4 lg:grid-cols-2">
          <a
            v-for="post in data.posts"
            :key="post.id"
            :href="post.url"
            target="_blank"
            class="group flex flex-col gap-3 rounded-lg border border-default p-5 transition-colors hover:border-primary/40 hover:bg-elevated"
          >
            <div class="flex items-center gap-2 text-xs text-muted">
              <span>{{ fmtDate(post.date_bj) || post.date.slice(0, 10) }}</span>
              <span
                v-if="post.reply_to"
                class="rounded bg-elevated px-1.5 py-0.5"
              >{{ t('mirror.reply') }}</span>
            </div>
            <p class="whitespace-pre-line text-sm leading-6 text-highlighted">{{ post.text }}</p>
            <div class="mt-auto flex gap-4 pt-1 text-xs text-muted">
              <span>❤️ {{ fmtCount(post.likes) }}</span>
              <span>🔖 {{ fmtCount(post.bookmarks) }}</span>
              <span>🔁 {{ fmtCount(post.reposts) }}</span>
              <span>👁 {{ fmtCount(post.views) }}</span>
            </div>
          </a>
        </div>
      </UContainer>
    </section>

    <section class="border-t border-default pb-20 sm:pb-28">
      <UContainer>
        <h2 class="flex items-center gap-2 py-6 text-lg font-semibold text-highlighted">
          <UIcon
            name="i-lucide-github"
            class="size-5"
          />
          GitHub
          <span class="text-sm font-normal text-muted">{{ data.repos.length }}</span>
        </h2>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="repo in data.repos"
            :key="repo.name"
            :to="repo.url"
            target="_blank"
            class="group flex flex-col gap-2 rounded-lg border border-default p-5 transition-colors hover:border-primary/40 hover:bg-elevated"
          >
            <div class="flex items-center justify-between gap-2">
              <span class="truncate font-semibold text-highlighted transition-colors group-hover:text-primary">
                {{ repo.name }}
              </span>
              <span class="shrink-0 text-xs text-muted">⭐ {{ repo.stars }}</span>
            </div>
            <p class="line-clamp-2 text-sm leading-5 text-muted">
              {{ repo.description || t('mirror.noDescription') }}
            </p>
            <div class="mt-auto flex flex-wrap items-center gap-2 pt-1 text-xs text-muted">
              <span v-if="repo.language">{{ repo.language }}</span>
              <span
                v-if="repo.fork"
                class="rounded bg-elevated px-1.5 py-0.5"
              >{{ t('mirror.fork') }}</span>
              <span>{{ fmtDate(repo.pushed_at) }}</span>
            </div>
          </NuxtLink>
        </div>
      </UContainer>
    </section>
  </div>
</template>
