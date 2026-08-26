/**
 * 列表型页面共享 SEO/OG/404 装配。
 *
 * - SEO 副作用在 setup 同步上下文里设置,client 端用 watch 兜底
 * - 404 判断在内部完成:调用方拿到永远是非空的 page ref
 */
export function useCollectionPageSeo(path: string) {
  const { locale } = useI18n()
  const { data: page, status } = useAsyncData(
    `page:${path}:${locale.value}`,
    () => queryCollection('pages').where('locale', '=', locale.value).path(path).first(),
    {
      watch: [() => useRoute().path]
    }
  )

  if (status.value === 'error' || page.value === null) {
    throw createError({
      statusCode: 404,
      statusMessage: '页面未找到',
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

  return { page: computed(() => page.value!) }
}
