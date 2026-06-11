<script setup lang="ts">
const { isLoading } = useLoadingIndicator();
</script>

<template>
  <div
    class="pointer-events-none fixed top-4 left-4 z-9999 transition-opacity duration-300"
    :class="{ 'opacity-0': !isLoading }"
  >
    <div
      class="flex-center bg-theme-light shadow-surround border-default/70 rounded-xl border-2 p-3"
    >
      <UIcon
        name="i-lucide-loader"
        class="text-secondary size-6 animate-spin sm:size-8"
      />
    </div>
  </div>
</template>
