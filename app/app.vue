<script setup lang="ts">
// #region --------- Imports ---------
import * as locales from "@nuxt/ui/locale";
import AppLoadingOverlay from "~/components/layout/AppLoadingOverlay.vue";
import AppNavigateLoading from "~/components/layout/AppNavigateLoading.vue";
// #endregion

// #region --------- Utilities & Services ---------
const { locale } = useI18n();
// #endregion

// #region --------- Computed ---------
const lang = computed(() => locales[locale.value].code);
const dir = computed(() => locales[locale.value].dir);
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
  <UApp :locale="locales[locale]">
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
