<script setup lang="ts">
const { t } = useI18n();

const stackKeys = [
  "nuxtUi",
  "pinia",
  "typescript",
  "tailwind",
  "i18n",
  "vueuse",
  "emblaCarousel",
] as const;

const stackIcons = {
  nuxtUi: "i-lucide-layout-template",
  pinia: "i-lucide-database",
  typescript: "i-simple-icons-typescript",
  tailwind: "i-simple-icons-tailwindcss",
  i18n: "i-lucide-languages",
  vueuse: "i-simple-icons-vueuse",
  emblaCarousel: "i-lucide-gallery-horizontal",
} as const;

const stackItems = computed(() =>
  stackKeys.map((key) => ({
    key,
    icon: stackIcons[key],
    title: t(`landing.stack.items.${key}.title`),
    description: t(`landing.stack.items.${key}.description`),
    to: t(`landing.stack.items.${key}.docsUrl`),
  })),
);
</script>

<template>
  <UPageSection
    id="stack"
    :title="t('landing.stack.title')"
    :description="t('landing.stack.description')"
  >
    <UPageGrid class="sm:grid-cols-2 lg:grid-cols-3">
      <UPageCard
        v-for="item in stackItems"
        :key="item.key"
        :title="item.title"
        :description="item.description"
        :icon="item.icon"
        :to="item.to"
        target="_blank"
        variant="subtle"
        spotlight
      />
    </UPageGrid>
  </UPageSection>
</template>
