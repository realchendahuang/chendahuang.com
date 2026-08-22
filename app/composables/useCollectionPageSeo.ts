/**
 * 列表型页面(博客、项目、Playbook、Skill、精华帖、友链)共享的 SEO/OG 装配逻辑。
 *
 * SSR 同步设置 SEO;客户端通过 onMounted + watch 在 page 数据到达后更新。
 */
export function useCollectionPageSeo(path: string) {
  const { data: page, error } = useAsyncData(
    `page:${path}`,
    () => queryCollection('pages').path(path).first(),
    {
      watch: [() => useRoute().path]
    }
  )

  if (error.value) {
    throw createError({
      statusCode: 500,
      statusMessage: '页面加载失败',
      fatal: true
    })
  }

  const applySeo = (current: NonNullable<typeof page.value>) => {
    const title = current.seo?.title || current.title
    const description = current.seo?.description || current.description
    useSeoMeta({
      title,
      ogTitle: title,
      description,
      ogDescription: description,
      ogUrl: toCanonicalUrl(path),
      twitterTitle: title,
      twitterDescription: description
    })
    defineOgImage('Portfolio', { title, description })
  }

  if (page.value) {
    applySeo(page.value)
  }

  if (import.meta.client) {
    watch(page, (current) => {
      if (current) applySeo(current)
    })
  }

  return { page }
}
