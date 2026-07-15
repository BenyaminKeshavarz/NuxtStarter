<script setup lang="ts">
import AppLogo from "~/components/layout/AppLogo.vue";
import LanguageSwitcher from "~/components/layout/LanguageSwitcher.vue";
import ThemeSwitcher from "~/components/layout/ThemeSwitcher.vue";
import type { NavigationMenuItem } from "@nuxt/ui";

const { t } = useI18n();
const localePath = useLocalePath();

const githubUrl = "https://github.com/BenyaminKeshavarz/NuxtStarter";

const navItems = computed<NavigationMenuItem[]>(() => [
  {
    label: t("landing.header.features"),
    to: localePath("/#features"),
  },
  {
    label: t("landing.header.stack"),
    to: localePath("/#stack"),
  },
]);
</script>

<template>
  <div>
    <UHeader :title="t('landing.hero.title')" :to="localePath('/')">
      <template #left>
        <NuxtLink :to="localePath('/')" class="shrink-0">
          <AppLogo class="h-6 w-auto" />
        </NuxtLink>
      </template>

      <UNavigationMenu
        :items="navItems"
        variant="link"
        color="neutral"
        :highlight="false"
      />

      <template #right>
        <LanguageSwitcher class="max-sm:hidden" />

        <ThemeSwitcher />

        <UButton
          :to="githubUrl"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
          class="max-sm:hidden"
        />
      </template>

      <template #body>
        <div class="flex flex-col gap-4">
          <UNavigationMenu
            :items="navItems"
            orientation="vertical"
            variant="link"
            color="neutral"
            :highlight="false"
          />

          <div
            class="border-default flex items-center justify-between border-t pt-4 sm:hidden"
          >
            <LanguageSwitcher />
            <UButton
              :to="githubUrl"
              target="_blank"
              icon="i-simple-icons-github"
              aria-label="GitHub"
              color="neutral"
              variant="ghost"
            />
          </div>
        </div>
      </template>
    </UHeader>

    <UMain>
      <slot />
    </UMain>

    <USeparator icon="i-lucide-layers" />

    <UFooter
      :ui="{
        container:
          'flex flex-col items-center gap-3 py-8 text-center sm:flex-row sm:justify-between sm:py-4 sm:text-start lg:gap-x-3',
        left: 'flex items-center justify-center sm:justify-start sm:flex-1',
        right: 'flex items-center justify-center sm:justify-end sm:flex-1',
      }"
    >
      <template #left>
        <p class="text-muted text-sm">
          {{
            t("landing.footer.copyright", { year: new Date().getFullYear() })
          }}
        </p>
      </template>

      <template #right>
        <UButton
          :to="githubUrl"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UFooter>
  </div>
</template>
