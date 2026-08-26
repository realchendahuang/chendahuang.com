<script setup lang="ts">
const navLinks = useNavLinks()
</script>

<template>
  <div class="site-shell">
    <UContainer class="sm:border-x border-default pt-10">
      <AppHeader :links="navLinks" />
      <GlobalSearchModal />
      <slot />
      <AppFooter />
    </UContainer>
  </div>
</template>
