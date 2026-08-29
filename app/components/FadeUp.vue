<script setup lang="ts">
/**
 * 全站统一的滚动入场动画(淡入上移)。
 * 收编各 section 重复手写的 Motion while-in-view 样板,
 * 时长/缓动只在这里维护。
 */
const props = withDefaults(defineProps<{
  delay?: number
  y?: number
  amount?: number
}>(), {
  delay: 0,
  y: 24,
  amount: 0.2
})
</script>

<template>
  <Motion
    :initial="{ opacity: 0, y: props.y }"
    :while-in-view="{ opacity: 1, y: 0 }"
    :viewport="{ once: true, amount: props.amount }"
    :transition="{ duration: 0.78, ease: [0.22, 1, 0.36, 1], delay: props.delay }"
  >
    <slot />
  </Motion>
</template>
