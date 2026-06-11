<script setup lang="ts">
// #region --------- Imports ---------
import AppLoadingOverlay from "~/components/layout/AppLoadingOverlay.vue";
import AppNavigateLoading from "~/components/layout/AppNavigateLoading.vue";
// #endregion

// #region --------- Utilities & Services ---------
const { locale, locales } = useI18n();
// #endregion

// #region --------- Computed ---------
const currentLocale = computed(() => {
  return locales.value.find((l) => l.code === locale.value) || locales.value[0];
});
// #endregion

useHead({
  htmlAttrs: {
    lang: () => currentLocale.value?.language,
    dir: () => currentLocale.value?.dir ?? "ltr",
    class: () => (currentLocale.value?.dir === "ltr" ? "font-en" : "font-fa"),
  },
});
</script>

<template>
  <!-- Main App Wrapper -->
  <UApp>
    <NuxtLoadingIndicator :height="5" :throttle="200" />
    <AppNavigateLoading />

    <NuxtRouteAnnouncer />

    <!-- Global Overlays -->
    <AppLoadingOverlay />

    <!-- Layout that will render header, footer, page content and etc. -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
