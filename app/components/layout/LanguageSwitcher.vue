<script setup lang="ts">
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
</script>

<template>
  <div class="flex items-center gap-0.5">
    <UButton
      v-for="item in locales"
      :key="item.code"
      :to="switchLocalePath(item.code)"
      :label="item.code.toUpperCase()"
      :variant="item.code === locale ? 'subtle' : 'ghost'"
      size="xs"
      color="neutral"
      :aria-label="`Switch to ${item.localName ?? item.name}`"
    />
  </div>
</template>
