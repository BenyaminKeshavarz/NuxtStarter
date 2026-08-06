<script setup lang="ts">
import type { NuxtError } from "#app";
import { resolveHttpErrorCopy } from "~/composables/api/useErrorHandler";

const props = defineProps<{
  error: NuxtError;
}>();

const { t } = useI18n();
const localePath = useLocalePath();
const { uiLocale, lang, dir } = useUiLocale();

const statusCode = computed(() => props.error.statusCode ?? 500);

const ERROR_ICONS: Record<number, string> = {
  400: "i-lucide-circle-alert",
  401: "i-lucide-lock",
  403: "i-lucide-shield-x",
  404: "i-lucide-file-question",
  408: "i-lucide-timer-off",
  409: "i-lucide-git-compare",
  422: "i-lucide-file-warning",
  429: "i-lucide-gauge",
  500: "i-lucide-server-crash",
  502: "i-lucide-unplug",
  503: "i-lucide-server-off",
  504: "i-lucide-hourglass",
};

const errorMeta = computed(() => {
  const code = statusCode.value;
  const { title, message } = resolveHttpErrorCopy(code);
  return {
    icon: ERROR_ICONS[code] ?? "i-lucide-triangle-alert",
    title,
    description: message,
  };
});

const displayError = computed(() => ({
  statusCode: statusCode.value,
  statusMessage: errorMeta.value.title,
  message: errorMeta.value.description,
}));

const showRetry = computed(
  () =>
    statusCode.value >= 500 ||
    statusCode.value === 408 ||
    statusCode.value === 429,
);

useHead({
  htmlAttrs: {
    lang,
    dir,
    class: computed(() => (dir.value === "rtl" ? "font-fa" : "font-en")),
  },
});

function goHome() {
  clearError({ redirect: localePath("/") });
}

function handleBack() {
  if (import.meta.client && window.history.length > 1) {
    window.history.back();
    return;
  }
  goHome();
}
</script>

<template>
  <UApp :locale="uiLocale">
    <UError
      :icon="errorMeta.icon"
      :error="displayError"
      :clear="false"
      :ui="{
        root: 'min-h-screen flex flex-col items-center justify-center text-center p-6',
        leadingIcon: 'size-16 shrink-0 text-primary',
        statusCode: 'text-2xl font-semibold text-primary',
      }"
    >
      <template #links>
        <UButton
          v-if="showRetry"
          :label="t('errors.page.retry')"
          icon="i-lucide-refresh-cw"
          @click="goHome"
        />

        <UButton
          :label="t('errors.page.back')"
          color="neutral"
          variant="outline"
          icon="i-lucide-arrow-left"
          @click="handleBack"
        />

        <UButton
          :label="t('home')"
          color="neutral"
          variant="soft"
          icon="i-lucide-house"
          @click="goHome"
        />
      </template>
    </UError>
  </UApp>
</template>
