<script setup lang="ts">
const route = useRoute()
const { t, locale } = useI18n()

// 内容 path 不含 /en 前缀,用 slug 参数拼出 /blog/... 路径
const slug = computed(() => (route.params.slug as string[]).join('/'))
const contentPath = computed(() => `/blog/${slug.value}`)

const { data: page } = await useAsyncData(`${contentPath.value}:${locale.value}`, () =>
  queryCollection('blog').where('locale', '=', locale.value).path(contentPath.value).first()
)
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: t('seo.notFound'), fatal: true })
}

const { data: surround } = await useAsyncData(`${contentPath.value}-surround:${locale.value}`, () =>
  queryCollectionItemSurroundings('blog', contentPath.value, {
    fields: ['description']
  })
)

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description
const canonicalUrl = toCanonicalUrl(route.path)
const publishedTime = toIsoDate(page.value.date)
const modifiedTime = page.value.updated ? toIsoDate(page.value.updated) : publishedTime
const schemaImage = toAbsoluteUrl(page.value.image || '/avatar.jpg')
const { global } = useAppConfig()
const sponsorLink = computed(() => global.sponsorLink)

useSeoMeta({
  title,
  description,
  ogDescription: description,
  ogTitle: title,
  ogType: 'article',
  ogUrl: canonicalUrl,
  articlePublishedTime: publishedTime,
  articleModifiedTime: modifiedTime,
  articleAuthor: [page.value.author.name],
  twitterTitle: title,
  twitterDescription: description
})

// 封面图：优先用文章自定义图，否则用自动生成的 OG 图
const coverImage = ref('')
if (!page.value.image) {
  const ogPaths = defineOgImage('Portfolio', {
    title,
    description,
    headline: '博客'
  })
  if (import.meta.server) {
    coverImage.value = ogPaths[0] ?? ''
  }
} else {
  useSeoMeta({
    ogImage: schemaImage,
    twitterImage: schemaImage
  })
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
      'dateModified': modifiedTime,
      'inLanguage': 'zh-CN',
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': canonicalUrl
      },
      'keywords': (page.value.tags ?? []).join(', '),
      'author': {
        '@type': 'Person',
        'name': page.value.author.name,
        'url': SITE_URL
      },
      'publisher': {
        '@type': 'Person',
        'name': SITE_NAME,
        'url': SITE_URL,
        'logo': {
          '@type': 'ImageObject',
          'url': toAbsoluteUrl('/avatar-logo.png')
        }
      }
    }).replaceAll('<', '\\u003c')
  }]
})

const articleLink = computed(() => canonicalUrl)

const shareText = computed(() => t('post.shareText', { title: page.value?.title ?? '' }))

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
  const links = (page.value?.body as { toc?: { links?: Array<{ id?: string, depth?: number, text?: string }> } })?.toc?.links ?? []
  return links
    .map(link => ({
      id: link.id as string,
      depth: (link.depth ?? 2) as number,
      text: (link.text ?? '').trim()
    }))
    .filter((item: TocItem) => item.id && item.text)
})

// 阅读进度
const readingProgress = ref(0)
const mobileTocOpen = ref(false)
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

// TOC 滚动高亮（scrollspy）
const activeTocId = ref<string>('')
let tocObserver: IntersectionObserver | null = null
const setupTocSpy = () => {
  tocObserver?.disconnect()
  const ids = toc.value.map(item => item.id)
  if (!ids.length || typeof IntersectionObserver === 'undefined') {
    return
  }
  const visible = new Map<string, number>()
  tocObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        visible.set(entry.target.id, entry.boundingClientRect.top)
      } else {
        visible.delete(entry.target.id)
      }
    }
    // 取当前视口内最靠上的标题
    let best: string | null = null
    let bestTop = Infinity
    for (const [id, top] of visible) {
      if (top < bestTop) {
        bestTop = top
        best = id
      }
    }
    activeTocId.value = best ?? ''
  }, {
    rootMargin: '-64px 0px -70% 0px',
    threshold: [0, 1]
  })
  for (const id of ids) {
    const el = document.getElementById(id)
    if (el) {
      tocObserver.observe(el)
    }
  }
}
onMounted(setupTocSpy)

// 正文图片灯箱
let zoom: ReturnType<typeof import('medium-zoom').default> | null = null
const setupImageZoom = () => {
  if (zoom || typeof window === 'undefined') {
    return
  }
  import('medium-zoom').then(({ default: mediumZoom }) => {
    zoom = mediumZoom('.prose-blog img', {
      background: 'rgba(0, 0, 0, 0.85)',
      margin: 24
    })
  })
}
onMounted(setupImageZoom)
onBeforeUnmount(() => {
  zoom?.detach()
  zoom = null
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

// 原生分享（移动端）
const shareArticle = async () => {
  const url = canonicalUrl
  const text = shareText.value
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url })
      return
    } catch {
      // 用户取消或失败，回退到复制链接
    }
  }
  copyToClipboard(url, t('post.linkCopied'))
}

// 相关文章：按标签重叠度推荐
const { data: allPosts } = await useAsyncData(`blog-all-posts:${locale.value}`, () =>
  queryCollection('blog').where('locale', '=', locale.value).select('path', 'title', 'description', 'date', 'minRead', 'tags').all()
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
            {{ t('post.allPosts') }}
          </ULink>

          <div class="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium text-dimmed">
            <time :datetime="publishedTime">
              {{ formatDisplayDate(page.date) }}
            </time>
            <template v-if="page.updated">
              <span aria-hidden="true">·</span>
              <time :datetime="toIsoDate(page.updated)">
                {{ t('post.updated', { date: formatDisplayDate(page.updated) }) }}
              </time>
            </template>
            <span aria-hidden="true">·</span>
            <span>{{ t('post.minRead', { count: page.minRead }) }}</span>
            <template v-if="page.original">
              <span aria-hidden="true">·</span>
              <span class="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 font-medium text-primary">
                <UIcon
                  name="i-lucide-pen-line"
                  class="size-3"
                />
                {{ t('post.original') }}
              </span>
            </template>
            <template v-if="page.sourceUrl">
              <span aria-hidden="true">·</span>
              <ULink
                :to="page.sourceUrl"
                target="_blank"
                class="hover:text-highlighted"
              >
                {{ t('post.sourceX') }}
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
                {{ t('post.indieDev') }}
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

        <div
          v-if="toc.length"
          class="mx-auto mt-6 max-w-3xl lg:hidden"
        >
          <UButton
            size="sm"
            variant="soft"
            color="neutral"
            block
            :label="mobileTocOpen ? t('post.collapseToc') : t('post.viewToc')"
            :icon="mobileTocOpen ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
            :trailing="false"
            @click="mobileTocOpen = !mobileTocOpen"
          />
          <div
            v-show="mobileTocOpen"
            class="mt-3 rounded-lg border border-default bg-elevated/50 p-4"
          >
            <ul class="space-y-2 border-l border-default">
              <li
                v-for="item in toc"
                :key="item.id"
              >
                <a
                  :href="`#${item.id}`"
                  class="block border-l-2 border-transparent py-0.5 pl-3 text-sm leading-5 text-muted transition-colors hover:border-primary hover:text-highlighted"
                  :class="[
                    item.depth === 3 ? 'pl-6' : '',
                    activeTocId === item.id ? 'border-primary font-medium text-highlighted' : ''
                  ]"
                  @click="mobileTocOpen = false"
                >
                  {{ item.text }}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="mx-auto mt-10 max-w-5xl sm:mt-12 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12">
          <aside
            v-if="toc.length"
            class="hidden lg:block"
          >
            <nav class="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <p class="editorial-label">
                {{ t('post.toc') }}
              </p>
              <ul class="mt-3 space-y-2.5 border-l border-default">
                <li
                  v-for="item in toc"
                  :key="item.id"
                >
                  <a
                    :href="`#${item.id}`"
                    class="block border-l-2 border-transparent py-0.5 pl-4 text-sm leading-5 text-muted transition-colors hover:border-primary hover:text-highlighted"
                    :class="[
                      item.depth === 3 ? 'pl-8' : '',
                      activeTocId === item.id ? 'border-primary font-medium text-highlighted' : ''
                    ]"
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
              <span>{{ t('post.shareHint') }}</span>
              <div class="flex flex-wrap items-center gap-2">
                <UButton
                  size="sm"
                  variant="soft"
                  color="neutral"
                  icon="i-simple-icons-x"
                  :label="t('post.shareToX')"
                  :to="shareUrl"
                  target="_blank"
                />
                <UButton
                  v-if="page.sourceUrl"
                  size="sm"
                  variant="soft"
                  color="neutral"
                  icon="i-lucide-arrow-up-right"
                  :label="t('post.xOriginal')"
                  :to="page.sourceUrl"
                  target="_blank"
                />
                <UButton
                  size="sm"
                  variant="soft"
                  color="neutral"
                  icon="i-lucide-link"
                  :label="t('post.copyLink')"
                  @click="copyToClipboard(articleLink, t('post.linkCopied'))"
                />
                <UButton
                  size="sm"
                  variant="soft"
                  color="neutral"
                  icon="i-lucide-share-2"
                  :label="t('post.share')"
                  @click="shareArticle"
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
                {{ t('post.related') }}
              </p>
              <div class="mt-4 grid gap-4 sm:grid-cols-3">
                <NuxtLink
                  v-for="post in relatedPosts"
                  :key="post.path"
                  :to="post.path"
                  class="group flex flex-col gap-2 rounded-lg border border-default p-4 transition-colors hover:border-primary/40 hover:bg-elevated"
                >
                  <p class="text-xs text-dimmed">
                    {{ formatShortDate(post.date) }} · {{ post.minRead }} {{ t('blog.minutes') }}
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

            <aside class="mt-12 rounded-xl border border-default bg-elevated/50 p-6">
              <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 class="text-base font-semibold text-highlighted">
                    {{ t('post.subscribe') }}
                  </h3>
                  <p class="mt-1 text-sm leading-6 text-muted">
                    {{ t('post.subscribeDesc') }}
                  </p>
                </div>
                <div class="flex flex-wrap items-center gap-2">
                  <UButton
                    to="/rss.xml"
                    target="_blank"
                    size="sm"
                    color="neutral"
                    icon="i-lucide-rss"
                    :label="t('post.rss')"
                  />
                  <UButton
                    to="https://x.com/realchendahuang"
                    target="_blank"
                    size="sm"
                    color="neutral"
                    variant="soft"
                    icon="i-simple-icons-x"
                    :label="t('post.followX')"
                  />
                  <UButton
                    v-if="sponsorLink"
                    :to="sponsorLink"
                    target="_blank"
                    size="sm"
                    color="primary"
                    variant="soft"
                    icon="i-lucide-heart"
                    :label="t('post.support')"
                  />
                </div>
              </div>
            </aside>
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
        :aria-label="t('post.backToTop')"
        @click="scrollToTop"
      />
    </Transition>
  </div>
</template>
