<script setup lang="ts">
const { global } = useAppConfig()

const sponsorLink = computed(() => global.sponsorLink)

const links = computed(() => [
  { label: 'X（原 Twitter）', icon: 'i-simple-icons-x', to: 'https://x.com/realchendahuang', description: '日常更新、碎碎念与干货分享' },
  { label: 'GitHub', icon: 'i-simple-icons-github', to: 'https://github.com/realchendahuang', description: '项目源码与 Playbook 仓库' },
  { label: 'RSS 订阅', icon: 'i-lucide-rss', to: '/rss.xml', description: '博客更新第一时间推送到阅读器' }
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
            关于我
          </p>
          <h2 class="mt-4 max-w-2xl text-balance text-2xl font-semibold leading-snug tracking-[-0.03em] text-highlighted sm:text-3xl">
            独立开发者，折腾 Cloudflare 与 AI 效率工具
          </h2>
          <p class="mt-4 max-w-2xl text-[15px] leading-7 text-muted">
            前 AI 产品经理，现在专注于独立开发：把 AI、Cloudflare 和内容创作组合成自己的产品与工作流。
            项目、Playbook 和博客都是我探索过程的公开记录——如果你也在做类似的事，欢迎交流。
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
              label="爱发电 · 支持我"
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
