<script setup lang="ts">
/**
 * Cookie 同意横幅(严格 opt-in):
 * - consent 默认全域拒绝(见 useGoogleAnalytics),用户选择后 gtag('consent','update') 放行
 * - 选择存 localStorage('cookie-consent'),再次访问不再弹出
 * - 页脚「Cookie 设置」可通过共享状态重新打开横幅
 */
const config = useRuntimeConfig()
const gaId = (config.public.gaId as string) || ''

const BANNER_KEY = 'cookie-consent'

const { t } = useI18n()
const visible = useState('cookie-consent-visible', () => false)

type ConsentChoice = 'accepted' | 'rejected'
type ConsentValue = 'granted' | 'denied'

function updateConsent(value: ConsentValue) {
  if (import.meta.server) return
  const w = window as unknown as { gtag?: (...args: unknown[]) => void }
  if (typeof w.gtag !== 'function') return
  w.gtag('consent', 'update', {
    analytics_storage: value,
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value
  })
}

onMounted(() => {
  if (!gaId) return
  let choice: string | null = null
  try {
    choice = localStorage.getItem(BANNER_KEY)
  } catch {
    choice = null
  }
  if (choice === 'accepted') {
    updateConsent('granted')
  } else if (choice === 'rejected') {
    updateConsent('denied')
  } else {
    visible.value = true
  }
})

function choose(choice: ConsentChoice) {
  try {
    localStorage.setItem(BANNER_KEY, choice)
  } catch {
    // 存不进也至少本次会话内生效
  }
  updateConsent(choice === 'accepted' ? 'granted' : 'denied')
  visible.value = false
}
</script>

<template>
  <div
    v-if="visible"
    class="fixed inset-x-0 bottom-0 z-50 border-t border-default bg-default/95 backdrop-blur"
    role="dialog"
    aria-live="polite"
    :aria-label="t('cookie.settings')"
  >
    <UContainer class="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p class="max-w-2xl text-sm leading-6 text-muted">
        {{ t('cookie.message') }}
      </p>
      <div class="flex shrink-0 items-center gap-2">
        <UButton
          size="sm"
          color="neutral"
          variant="outline"
          :label="t('cookie.reject')"
          @click="choose('rejected')"
        />
        <UButton
          size="sm"
          :label="t('cookie.accept')"
          @click="choose('accepted')"
        />
      </div>
    </UContainer>
  </div>
</template>
