<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('blog').path(route.path).first()
)
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: '页面未找到', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () =>
  queryCollectionItemSurroundings('blog', route.path, {
    fields: ['description']
  })
)

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description
const canonicalUrl = toCanonicalUrl(route.path)
const publishedTime = toIsoDate(page.value.date)
const schemaImage = toAbsoluteUrl(page.value.image || '/avatar.jpg')

useSeoMeta({
  title,
  description,
  ogDescription: description,
  ogTitle: title,
  ogType: 'article',
  ogUrl: canonicalUrl,
  articlePublishedTime: publishedTime,
  articleAuthor: [page.value.author.name],
  twitterTitle: title,
  twitterDescription: description
})

if (page.value.image) {
  useSeoMeta({
    ogImage: schemaImage,
    twitterImage: schemaImage
  })
} else {
  defineOgImage('Portfolio', {
    title,
    description,
    headline: '博客'
  })
}

// 封面图：优先用文章自定义图，否则用自动生成的 OG 图
const coverImage = useState<string>('blog-cover-image', () => '')
if (import.meta.server && !page.value.image) {
  const ogPaths = defineOgImage('Portfolio', {
    title,
    description,
    headline: '博客'
  })
  coverImage.value = ogPaths[0] ?? ''
}

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': title,
      'description': description,
      'image': schemaImage,
      'datePublished': publishedTime,
      'dateModified': publishedTime,
      'inLanguage': 'zh-CN',
      'mainEntityOfPage': canonicalUrl,
      'author': {
        '@type': 'Person',
        'name': page.value.author.name,
        'url': SITE_URL
      },
      'publisher': {
        '@type': 'Person',
        'name': SITE_NAME,
        'url': SITE_URL
      }
    }).replaceAll('<', '\\u003c')
  }]
})

const articleLink = computed(() => canonicalUrl)

const shareText = computed(() => `来自陈大黄的博客：${page.value?.title ?? ''}`)

const shareUrl = computed(() => {
  const url = new URL('https://x.com/intent/post')
  url.searchParams.set('text', shareText.value)
  url.searchParams.set('url', canonicalUrl)
  return url.toString()
})

type TocItem = {
  id: string
  depth: number
  text: string
}

const toc = computed<TocItem[]>(() => {
  const links = (page.value?.body as any)?.toc?.links ?? []
  return links
    .map((link: any) => ({
      id: link.id as string,
      depth: link.depth as number,
      text: (link.text as string).trim()
    }))
    .filter((item: TocItem) => item.id && item.text)
})

// 阅读进度
const readingProgress = ref(0)
const onScroll = () => {
  const doc = document.documentElement
  const total = doc.scrollHeight - window.innerHeight
  readingProgress.value = total > 0 ? Math.min(1, window.scrollY / total) : 0
}
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

// 回到顶部
const showBackToTop = ref(false)
const onScrollTop = () => {
  showBackToTop.value = window.scrollY > 600
}
onMounted(() => {
  window.addEventListener('scroll', onScrollTop, { passive: true })
  onScrollTop()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScrollTop)
})
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 相关文章：按标签重叠度推荐
const { data: allPosts } = await useAsyncData('blog-all-posts', () =>
  queryCollection('blog').select('path', 'title', 'description', 'date', 'minRead', 'tags').all()
)

const relatedPosts = computed(() => {
  const current = page.value
  if (!current) {
    return []
  }
  const currentTags = new Set(current.tags ?? [])
  const scored = (allPosts.value ?? [])
    .filter(post => post.path !== current.path)
    .map((post) => {
      const overlap = (post.tags ?? []).filter(tag => currentTags.has(tag)).length
      return { post, overlap }
    })
    .filter(item => item.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
  return scored.slice(0, 3).map(item => item.post)
})
</script>

<template>
  <div class="pb-20 pt-10 sm:pb-28 sm:pt-14">
    <div
      class="fixed inset-x-0 top-0 z-50 h-0.5 bg-primary transition-[width] duration-150 ease-out"
      :style="{ width: `${readingProgress * 100}%` }"
      aria-hidden="true"
    />

    <UContainer>
      <article v-if="page">
        <header class="mx-auto max-w-3xl">
          <ULink
            to="/blog"
            class="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-highlighted"
          >
            <UIcon
              name="i-lucide-arrow-left"
              class="size-4"
            />
            全部文章
          </ULink>

          <div class="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium text-dimmed">
            <time :datetime="publishedTime">
              {{ formatDisplayDate(page.date) }}
            </time>
            <span aria-hidden="true">·</span>
            <span>{{ page.minRead }} 分钟阅读</span>
            <template v-if="page.sourceUrl">
              <span aria-hidden="true">·</span>
              <ULink
                :to="page.sourceUrl"
                target="_blank"
                class="hover:text-highlighted"
              >
                原文来自 X
              </ULink>
            </template>
          </div>

          <h1 class="mt-4 max-w-3xl text-balance text-3xl font-semibold leading-tight tracking-[-0.03em] text-highlighted sm:text-4xl">
            {{ page.title }}
          </h1>

          <p class="mt-4 max-w-2xl text-base leading-7 text-muted">
            {{ page.description }}
          </p>

          <div class="mt-6 flex items-center gap-3">
            <NuxtImg
              v-if="page.author.avatar"
              :src="page.author.avatar.src"
              :alt="page.author.avatar.alt"
              width="36"
              height="36"
              class="size-9 rounded-full object-cover"
            />
            <div>
              <p class="text-sm font-medium text-highlighted">
                {{ page.author.name }}
              </p>
              <p class="text-xs text-dimmed">
                独立开发者
              </p>
            </div>
          </div>

          <div
            v-if="page.tags?.length"
            class="mt-6 flex flex-wrap gap-1.5"
          >
            <NuxtLink
              v-for="tag in page.tags"
              :key="tag"
              :to="`/blog?tag=${encodeURIComponent(tag)}`"
              class="rounded-full border border-default px-2.5 py-1 text-xs text-muted transition-colors hover:border-primary/40 hover:text-highlighted"
            >
              {{ tag }}
            </NuxtLink>
          </div>
        </header>

        <NuxtImg
          v-if="page.image || coverImage"
          :src="page.image || coverImage"
          :alt="page.title"
          class="mx-auto mt-10 aspect-[16/8] w-full max-w-4xl rounded-xl object-cover object-center"
        />

        <div class="mx-auto mt-10 max-w-5xl sm:mt-12 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12">
          <aside
            v-if="toc.length"
            class="hidden lg:block"
          >
            <nav class="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <p class="editorial-label">
                目录
              </p>
              <ul class="mt-3 space-y-2.5 border-l border-default">
                <li
                  v-for="item in toc"
                  :key="item.id"
                >
                  <a
                    :href="`#${item.id}`"
                    class="block border-l-2 border-transparent py-0.5 pl-4 text-sm leading-5 text-muted transition-colors hover:border-primary hover:text-highlighted"
                    :class="item.depth === 3 ? 'pl-8' : ''"
                  >
                    {{ item.text }}
                  </a>
                </li>
              </ul>
            </nav>
          </aside>

          <UPageBody class="prose-blog max-w-3xl">
            <ContentRenderer
              v-if="page.body"
              :value="page"
            />

            <div class="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-default pt-6 text-sm text-muted">
              <span>如果你觉得有用，欢迎转发给朋友。</span>
              <div class="flex flex-wrap items-center gap-2">
                <UButton
                  size="sm"
                  variant="soft"
                  color="neutral"
                  icon="i-simple-icons-x"
                  label="转发到 X"
                  :to="shareUrl"
                  target="_blank"
                />
                <UButton
                  v-if="page.sourceUrl"
                  size="sm"
                  variant="soft"
                  color="neutral"
                  icon="i-lucide-arrow-up-right"
                  label="X 原文"
                  :to="page.sourceUrl"
                  target="_blank"
                />
                <UButton
                  size="sm"
                  variant="soft"
                  color="neutral"
                  icon="i-lucide-link"
                  label="复制链接"
                  @click="copyToClipboard(articleLink, '文章链接已复制到剪贴板')"
                />
              </div>
            </div>

            <UContentSurround
              :surround
              class="mt-8"
            />

            <section
              v-if="relatedPosts.length"
              class="mt-12 border-t border-default pt-8"
            >
              <p class="editorial-label">
                相关阅读
              </p>
              <div class="mt-4 grid gap-4 sm:grid-cols-3">
                <NuxtLink
                  v-for="post in relatedPosts"
                  :key="post.path"
                  :to="post.path"
                  class="group flex flex-col gap-2 rounded-lg border border-default p-4 transition-colors hover:border-primary/40 hover:bg-elevated"
                >
                  <p class="text-xs text-dimmed">
                    {{ formatShortDate(post.date) }} · {{ post.minRead }} 分钟
                  </p>
                  <h3 class="line-clamp-2 text-sm font-medium leading-snug text-highlighted group-hover:text-primary">
                    {{ post.title }}
                  </h3>
                  <p class="line-clamp-2 text-xs leading-5 text-muted">
                    {{ post.description }}
                  </p>
                </NuxtLink>
              </div>
            </section>
          </UPageBody>
        </div>
      </article>
    </UContainer>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-2"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 translate-y-2"
    >
      <UButton
        v-if="showBackToTop"
        icon="i-lucide-arrow-up"
        size="sm"
        square
        color="neutral"
        variant="soft"
        class="fixed bottom-6 right-6 z-50 shadow-lg"
        aria-label="回到顶部"
        @click="scrollToTop"
      />
    </Transition>
  </div>
</template>
