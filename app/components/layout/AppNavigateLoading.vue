<script setup lang="ts">
const { isLoading } = useLoadingIndicator();
</script>

<template>
  <div
    class="pointer-events-none fixed top-4 left-4 z-9999 transition-opacity duration-300"
    :class="{ 'opacity-0': !isLoading }"
  >
    <div
      class="border-default/70 flex items-center justify-center rounded-xl border-2 bg-default p-3 shadow-lg"
    >
      <UIcon
        name="i-lucide-loader"
        class="text-primary size-6 animate-spin sm:size-8"
      />
    </div>
  </div>
</template>
