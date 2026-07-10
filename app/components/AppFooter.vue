<script setup lang="ts">
const { footer } = useAppConfig()
</script>

<template>
  <footer class="border-t border-default bg-default">
    <UContainer class="py-20 sm:py-28">
      <div class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <h2 class="max-w-3xl text-4xl font-bold leading-[1.08] tracking-[-0.045em] text-highlighted sm:text-5xl lg:text-6xl">
          有想法，或者只是想聊聊，<span class="text-primary">来 X 找我。</span>
        </h2>

        <div class="flex items-center gap-2">
          <UButton
            to="https://x.com/realchendahuang"
            target="_blank"
            label="在 X 上联系我"
            trailing-icon="i-lucide-arrow-up-right"
            color="neutral"
            size="lg"
          />
          <UButton
            to="https://github.com/realchendahuang"
            target="_blank"
            label="GitHub"
            trailing-icon="i-lucide-arrow-up-right"
            color="neutral"
            variant="soft"
            size="lg"
          />
        </div>
      </div>

      <div class="mt-20 flex items-center justify-between border-t border-default pt-6 text-xs text-muted">
        <span>{{ footer.credits }}</span>
        <div class="flex items-center gap-1">
          <UButton
            v-for="(link, index) of footer?.links"
            :key="index"
            v-bind="{ size: 'xs', color: 'neutral', variant: 'ghost', ...link }"
          />
        </div>
      </div>
    </UContainer>
  </footer>
</template>
