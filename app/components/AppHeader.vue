<script setup lang="ts">
import type { DropdownMenuItem, NavigationMenuItem } from '@nuxt/ui'

const props = defineProps<{
  links: NavigationMenuItem[]
}>()

const mobileLinks = computed<DropdownMenuItem[]>(() => props.links.map(link => ({
  label: link.label,
  icon: link.icon,
  to: link.to,
  target: link.target,
  type: 'link'
})))
</script>

<template>
  <div class="fixed inset-x-3 top-2 z-50 sm:hidden">
    <div class="flex items-center justify-between rounded-full border border-muted/50 bg-muted/90 px-3 py-1.5 shadow-lg shadow-neutral-950/5 backdrop-blur-sm">
      <NuxtLink
        to="/"
        class="px-2 py-2 text-sm font-semibold text-highlighted"
      >
        陈大黄
      </NuxtLink>

      <div class="flex items-center gap-1">
        <ColorModeButton />
        <UDropdownMenu
          :items="mobileLinks"
          :content="{ align: 'end', sideOffset: 8 }"
        >
          <UButton
            label="菜单"
            icon="i-lucide-menu"
            color="neutral"
            variant="ghost"
            size="md"
            class="rounded-full"
            aria-label="打开导航菜单"
          />
        </UDropdownMenu>
      </div>
    </div>
  </div>

  <div class="fixed left-1/2 top-4 z-50 hidden -translate-x-1/2 sm:block">
    <UNavigationMenu
      :items="links"
      variant="link"
      color="neutral"
      class="bg-muted/80 backdrop-blur-sm rounded-full px-2 sm:px-4 border border-muted/50 shadow-lg shadow-neutral-950/5"
      :ui="{
        link: 'px-2 py-1',
        linkLeadingIcon: 'hidden'
      }"
    >
      <template #list-trailing>
        <ColorModeButton />
      </template>
    </UNavigationMenu>
  </div>
</template>
