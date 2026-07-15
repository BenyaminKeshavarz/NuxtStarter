<script setup lang="ts">
// #region --------- Imports ---------
import AppLoadingOverlay from "~/components/layout/AppLoadingOverlay.vue";
import AppNavigateLoading from "~/components/layout/AppNavigateLoading.vue";
// #endregion

// #region --------- Utilities & Services ---------
const { uiLocale, lang, dir } = useUiLocale();
// #endregion

useHead({
  htmlAttrs: {
    lang,
    dir,
    class: computed(() => (dir.value === "rtl" ? "font-fa" : "font-en")),
  },
});
</script>

<template>
  <!-- Main App Wrapper -->
  <UApp :locale="uiLocale">
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
