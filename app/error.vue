<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{
  error: NuxtError;
}>();

const { t } = useI18n();
const { uiLocale, lang, dir } = useUiLocale();

const statusCode = computed(() => props.error.statusCode ?? 500);

const errorMeta = computed(() => {
  if (statusCode.value === 404) {
    return {
      icon: "i-lucide-file-question",
      title: t("error.page.notFound.title"),
      description: t("error.page.notFound.description"),
    };
  }

  return {
    icon: "i-lucide-server-crash",
    title: t("error.page.serverError.title"),
    description: t("error.page.serverError.description"),
  };
});

useHead({
  htmlAttrs: {
    lang,
    dir,
    class: computed(() => (dir.value === "rtl" ? "font-fa" : "font-en")),
  },
});

function handleRetry() {
  clearError({ redirect: "/" });
}

function handleBack() {
  if (import.meta.client && window.history.length > 1) {
    window.history.back();
    return;
  }
  clearError({ redirect: "/" });
}

function handleHome() {
  clearError({ redirect: "/" });
}
</script>

<template>
  <UApp :locale="uiLocale">
    <div class="flex min-h-screen items-center justify-center p-6">
      <div class="max-w-md text-center">
        <UIcon
          :name="errorMeta.icon"
          class="text-primary mx-auto mb-4 size-16"
        />

        <p class="text-muted mb-2 text-sm font-medium">
          {{ statusCode }}
        </p>

        <h1 class="mb-2 text-2xl font-semibold">
          {{ errorMeta.title }}
        </h1>

        <p class="text-muted mb-8">
          {{ errorMeta.description }}
        </p>

        <div class="flex flex-wrap items-center justify-center gap-3">
          <UButton
            v-if="statusCode >= 500"
            :label="t('error.page.actions.retry')"
            icon="i-lucide-refresh-cw"
            @click="handleRetry"
          />

          <UButton
            :label="t('error.page.actions.back')"
            color="neutral"
            variant="outline"
            icon="i-lucide-arrow-left"
            @click="handleBack"
          />

          <UButton
            :label="t('error.page.actions.home')"
            color="neutral"
            variant="soft"
            icon="i-lucide-house"
            @click="handleHome"
          />
        </div>
      </div>
    </div>
  </UApp>
</template>
