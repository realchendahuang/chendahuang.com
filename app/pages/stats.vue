<script setup lang="ts">
import { SITE_LOCALES } from '~/utils/locale'

type Row = { pv: number, uv: number }

type StatsPayload = {
  days: number
  generatedAt: number
  summary: { today: Row, d7: Row, d30: Row, d90: Row }
  trend: Array<{ day: string, pv: number, uv: number }>
  topPaths: Array<{ path: string, pv: number }>
  topRefs: Array<{ host: string, pv: number }>
  directPv: number
  topCountries: Array<{ country: string, pv: number }>
  unknownCountryPv: number
  languages: Array<{ locale: string, pv: number, uv: number }>
}

useHead({
  meta: [{ name: 'robots', content: 'noindex, nofollow' }]
})
useSeoMeta({ title: '站点统计' })

const route = useRoute()
const token = computed(() => (typeof route.query.k === 'string' ? route.query.k : ''))

const days = ref(30)
const loading = ref(false)
const error = ref('')
const data = ref<StatsPayload | null>(null)

const DAY_OPTIONS = [7, 30, 90] as const
const DAY_LABELS: Record<number, string> = { 7: '近 7 天', 30: '近 30 天', 90: '近 90 天' }

async function load() {
  loading.value = true
  error.value = ''
  const params = new URLSearchParams({ days: String(days.value) })
  if (token.value) params.set('k', token.value)
  try {
    const res = await fetch(`/api/stats?${params.toString()}`)
    const json = await res.json()
    if (!res.ok) {
      data.value = null
      error.value = json?.error === 'invalid_token'
        ? '访问令牌无效'
        : json?.error === 'not_configured'
          ? '统计服务未配置(D1 绑定缺失)'
          : `加载失败(${res.status})`
    } else {
      data.value = json as StatsPayload
    }
  } catch {
    data.value = null
    error.value = '网络错误,加载失败'
  } finally {
    loading.value = false
  }
}

onMounted(load)
watch(days, load)

const fmt = (n?: number) => new Intl.NumberFormat('zh-CN').format(n ?? 0)
const trendMax = computed(() => Math.max(1, ...(data.value?.trend.map(item => item.pv) ?? [0])))
const displayTrend = computed(() => (data.value?.trend ?? []).slice(-30))
const localeName = (code: string) => SITE_LOCALES.find(item => item.code === code)?.name ?? code
const countryName = (code: string) => {
  try {
    return new Intl.DisplayNames(['zh'], { type: 'region' }).of(code) ?? code
  } catch {
    return code
  }
}
const formatDay = (day: string) => {
  const [, m, d] = day.split('-').map(Number)
  return `${m}/${d}`
}

const rangeLabel = computed(() => DAY_LABELS[days.value] ?? '近 30 天')
const maxPath = computed(() => Math.max(1, ...(data.value?.topPaths.map(item => item.pv) ?? [0])))
const maxLang = computed(() => Math.max(1, ...(data.value?.languages.map(item => item.pv) ?? [0])))
const maxCountry = computed(() => Math.max(1, ...(data.value?.topCountries.map(item => item.pv) ?? [0])))
</script>

<template>
  <UContainer class="py-14 sm:py-20">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="t-h1">
          站点统计
        </h1>
        <p class="mt-2 text-sm text-muted">
          私有页面,仅在登录可用环境访问
        </p>
      </div>
      <div class="flex items-center gap-1.5">
        <UButton
          v-for="option in DAY_OPTIONS"
          :key="option"
          size="sm"
          variant="soft"
          color="neutral"
          :class="days === option ? 'bg-elevated text-highlighted' : ''"
          :label="DAY_LABELS[option]"
          @click="days = option"
        />
      </div>
    </div>

    <div
      v-if="loading && !data"
      class="py-24 text-center text-sm text-dimmed"
    >
      加载中…
    </div>

    <div
      v-else-if="error && !data"
      class="py-24 text-center text-sm text-dimmed"
    >
      {{ error }}
    </div>

    <template v-else-if="data">
      <div class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div
          v-for="card in [
            { label: '今日', value: data.summary.today },
            { label: '近 7 天', value: data.summary.d7 },
            { label: '近 30 天', value: data.summary.d30 }
          ]"
          :key="card.label"
          class="rounded-xl border border-default bg-elevated p-5"
        >
          <p class="text-xs text-dimmed">
            {{ card.label }}
          </p>
          <p class="mt-2 text-2xl font-semibold text-highlighted">
            {{ fmt(card.value.pv) }}
            <span class="text-sm font-normal text-muted">浏览</span>
          </p>
          <p class="mt-1 text-sm text-muted">
            {{ fmt(card.value.uv) }} 会话
          </p>
        </div>
      </div>

      <section class="mt-10">
        <h2 class="text-lg font-medium text-highlighted">
          {{ rangeLabel }} 浏览趋势
        </h2>
        <div class="mt-4 space-y-1.5">
          <div
            v-for="item in displayTrend"
            :key="item.day"
            class="grid grid-cols-[3.5rem_1fr_3.5rem] items-center gap-3 text-xs"
          >
            <span class="text-dimmed">
              {{ formatDay(item.day) }}
            </span>
            <div class="h-2 overflow-hidden rounded-full bg-elevated">
              <div
                class="h-full rounded-full bg-primary"
                :style="{ width: `${(item.pv / trendMax) * 100}%` }"
              />
            </div>
            <span class="text-right text-muted">
              {{ fmt(item.pv) }}
            </span>
          </div>
        </div>
        <p
          v-if="!displayTrend.length"
          class="pt-4 text-sm text-dimmed"
        >
          该时间段暂无数据
        </p>
      </section>

      <div class="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <section>
          <h2 class="text-lg font-medium text-highlighted">
            热门内容
          </h2>
          <ul class="mt-4 space-y-2 text-sm">
            <li
              v-for="item in data.topPaths"
              :key="item.path"
            >
              <div class="flex items-baseline justify-between gap-3">
                <NuxtLink
                  :to="item.path"
                  class="truncate text-muted transition-colors hover:text-primary"
                >
                  {{ item.path === '/' ? '首页' : item.path }}
                </NuxtLink>
                <span class="shrink-0 text-dimmed">
                  {{ fmt(item.pv) }}
                </span>
              </div>
              <div class="mt-1 h-1.5 overflow-hidden rounded-full bg-elevated">
                <div
                  class="h-full rounded-full bg-primary/70"
                  :style="{ width: `${(item.pv / maxPath) * 100}%` }"
                />
              </div>
            </li>
          </ul>
          <p
            v-if="!data.topPaths.length"
            class="pt-2 text-sm text-dimmed"
          >
            暂无数据
          </p>
        </section>

        <section>
          <h2 class="text-lg font-medium text-highlighted">
            语言分布
          </h2>
          <ul class="mt-4 space-y-2 text-sm">
            <li
              v-for="item in data.languages"
              :key="item.locale"
            >
              <div class="flex items-baseline justify-between gap-3">
                <span class="text-muted">
                  {{ localeName(item.locale) }}
                </span>
                <span class="shrink-0 text-dimmed">
                  {{ fmt(item.pv) }} 浏览 · {{ fmt(item.uv) }} 会话
                </span>
              </div>
              <div class="mt-1 h-1.5 overflow-hidden rounded-full bg-elevated">
                <div
                  class="h-full rounded-full bg-primary/70"
                  :style="{ width: `${(item.pv / maxLang) * 100}%` }"
                />
              </div>
            </li>
          </ul>
          <p
            v-if="!data.languages.length"
            class="pt-2 text-sm text-dimmed"
          >
            暂无数据
          </p>
        </section>

        <section>
          <h2 class="text-lg font-medium text-highlighted">
            来源
          </h2>
          <ul class="mt-4 space-y-1.5 text-sm">
            <li
              v-if="data.directPv > 0"
              class="flex items-baseline justify-between gap-3"
            >
              <span class="text-muted">
                (直接访问 / 站内)
              </span>
              <span class="text-dimmed">
                {{ fmt(data.directPv) }}
              </span>
            </li>
            <li
              v-for="item in data.topRefs"
              :key="item.host"
              class="flex items-baseline justify-between gap-3"
            >
              <span class="truncate text-muted">
                {{ item.host }}
              </span>
              <span class="shrink-0 text-dimmed">
                {{ fmt(item.pv) }}
              </span>
            </li>
          </ul>
          <p
            v-if="!data.topRefs.length && !data.directPv"
            class="pt-2 text-sm text-dimmed"
          >
            暂无数据
          </p>
        </section>

        <section>
          <h2 class="text-lg font-medium text-highlighted">
            国家 / 地区
          </h2>
          <ul class="mt-4 space-y-1.5 text-sm">
            <li
              v-for="item in data.topCountries"
              :key="item.country"
            >
              <div class="flex items-baseline justify-between gap-3">
                <span class="text-muted">
                  {{ countryName(item.country) }}
                </span>
                <span class="shrink-0 text-dimmed">
                  {{ fmt(item.pv) }}
                </span>
              </div>
              <div class="mt-0.5 h-1.5 overflow-hidden rounded-full bg-elevated">
                <div
                  class="h-full rounded-full bg-primary/70"
                  :style="{ width: `${(item.pv / maxCountry) * 100}%` }"
                />
              </div>
            </li>
            <li
              v-if="data.unknownCountryPv > 0"
              class="flex items-baseline justify-between gap-3"
            >
              <span class="text-muted">
                未知
              </span>
              <span class="text-dimmed">
                {{ fmt(data.unknownCountryPv) }}
              </span>
            </li>
          </ul>
          <p
            v-if="!data.topCountries.length && !data.unknownCountryPv"
            class="pt-2 text-sm text-dimmed"
          >
            暂无数据
          </p>
        </section>
      </div>

      <p class="mt-12 text-center text-xs text-dimmed">
        {{ rangeLabel }} · 数据口径:浏览 = 页面加载 + SPA 路由切换,会话 = 标签页会话(近似访客)
      </p>
    </template>
  </UContainer>
</template>
