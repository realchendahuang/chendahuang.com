<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-default">
    <AppHeader :links="navLinks" />
    <slot />
    <AppFooter />
  </div>
</template>
