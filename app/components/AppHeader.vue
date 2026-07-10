<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const props = defineProps<{
  links: NavigationMenuItem[]
}>()

const mobileLinks = computed(() => props.links.slice(0, 2))
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-default bg-default/90 backdrop-blur-xl">
    <UContainer class="flex h-16 items-center justify-between gap-4">
      <NuxtLink
        to="/"
        class="text-base font-bold tracking-tight text-highlighted transition-colors hover:text-primary"
      >
        陈大黄
      </NuxtLink>

      <div class="flex items-center gap-1">
        <nav
          aria-label="主导航"
          class="hidden items-center gap-1 sm:flex"
        >
          <NuxtLink
            v-for="link in links"
            :key="String(link.to)"
            :to="link.to"
            class="rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-elevated hover:text-highlighted"
            active-class="bg-elevated text-highlighted"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <nav
          aria-label="移动端导航"
          class="flex items-center sm:hidden"
        >
          <NuxtLink
            v-for="link in mobileLinks"
            :key="String(link.to)"
            :to="link.to"
            class="rounded-md px-2.5 py-2 text-sm font-medium text-muted transition-colors hover:text-highlighted"
            active-class="text-highlighted"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <ColorModeButton />
      </div>
    </UContainer>
  </header>
</template>
