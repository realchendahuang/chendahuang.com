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
</script>

<template>
  <div class="pb-24 pt-12 sm:pb-32 sm:pt-16">
    <UContainer>
      <article v-if="page">
        <header class="mx-auto max-w-4xl">
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

          <div class="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium text-dimmed">
            <time :datetime="publishedTime">
              {{ formatDisplayDate(page.date) }}
            </time>
            <span aria-hidden="true">·</span>
            <span>{{ page.minRead }} 分钟阅读</span>
          </div>

          <h1 class="mt-6 max-w-4xl text-balance text-[2.65rem] font-bold leading-[1.06] tracking-[-0.055em] text-highlighted sm:text-6xl lg:text-7xl">
            {{ page.title }}
          </h1>

          <p class="mt-7 max-w-3xl text-lg leading-8 text-muted sm:text-xl">
            {{ page.description }}
          </p>

          <div class="mt-8 flex items-center gap-3">
            <NuxtImg
              v-if="page.author.avatar"
              :src="page.author.avatar.src"
              :alt="page.author.avatar.alt"
              width="40"
              height="40"
              class="size-10 rounded-full object-cover"
            />
            <div>
              <p class="text-sm font-semibold text-highlighted">
                {{ page.author.name }}
              </p>
              <p class="text-xs text-dimmed">
                独立开发者
              </p>
            </div>
          </div>
        </header>

        <NuxtImg
          v-if="page.image"
          :src="page.image"
          :alt="page.title"
          class="mx-auto mt-12 aspect-[16/8] w-full max-w-5xl rounded-2xl object-cover object-center"
        />

        <UPageBody class="mx-auto mt-14 max-w-3xl sm:mt-16">
          <ContentRenderer
            v-if="page.body"
            :value="page"
          />

          <div class="mt-14 flex items-center justify-between border-t border-default pt-6 text-sm text-muted">
            <span>读完了，感谢你的时间。</span>
            <UButton
              size="sm"
              variant="soft"
              color="neutral"
              icon="i-lucide-link"
              label="复制链接"
              @click="copyToClipboard(articleLink, '文章链接已复制到剪贴板')"
            />
          </div>

          <UContentSurround
            :surround
            class="mt-10"
          />
        </UPageBody>
      </article>
    </UContainer>
  </div>
</template>
