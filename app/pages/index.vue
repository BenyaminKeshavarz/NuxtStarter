<script setup lang="ts">
import StackSection from "~/components/StackSection.vue";

definePageMeta({
  layout: "default",
});

const { t } = useI18n();

const githubUrl = "https://github.com/BenyaminKeshavarz/NuxtStarter";

const title = computed(() => t("landing.meta.title"));
const description = computed(() => t("landing.meta.description"));

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: "summary_large_image",
});

const heroLinks = computed(() => [
  {
    label: t("landing.hero.getStarted"),
    to: githubUrl,
    target: "_blank" as const,
    trailingIcon: "i-lucide-arrow-right",
    ui: { trailingIcon: "rtl:rotate-180" },
    size: "lg" as const,
  },
]);

const featureIcons = [
  "i-lucide-rocket",
  "i-lucide-languages",
  "i-lucide-zap",
  "i-lucide-blocks",
  "i-lucide-code-2",
  "i-lucide-shield-check",
] as const;

const featureKeys = [
  "productionReady",
  "i18n",
  "performance",
  "ui",
  "dx",
  "scale",
] as const;

const features = computed(() =>
  featureKeys.map((key, index) => ({
    icon: featureIcons[index],
    title: t(`landing.features.items.${key}.title`),
    description: t(`landing.features.items.${key}.description`),
  })),
);

const ctaLinks = computed(() => [
  {
    label: t("landing.cta.startBuilding"),
    to: githubUrl,
    target: "_blank" as const,
    trailingIcon: "i-lucide-arrow-right",
    ui: { trailingIcon: "rtl:rotate-180" },
    color: "neutral" as const,
  },
]);
</script>

<template>
  <div>
    <UPageHero
      :title="t('landing.hero.title')"
      :description="t('landing.hero.description')"
      :links="heroLinks"
    />

    <UPageSection
      id="features"
      :title="t('landing.features.title')"
      :description="t('landing.features.description')"
      :features="features"
    />

    <StackSection />

    <UPageSection>
      <UPageCTA
        :title="t('landing.cta.title')"
        :description="t('landing.cta.description')"
        variant="subtle"
        :links="ctaLinks"
      />
    </UPageSection>
  </div>
</template>
