<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed(() => colorMode.value === "dark");

/**
 * Telegram-style theme toggle via View Transition API.
 * Circle animation is driven by CSS in main.css (uses --theme-transition-* vars
 * and data-theme-transition to pick expand vs shrink direction).
 */
const toggleTheme = async (event: MouseEvent) => {
  const willBeDark = !isDark.value;
  const root = document.documentElement;

  // Instant switch when animation isn't supported or user prefers reduced motion
  if (
    !document.startViewTransition ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    colorMode.preference = willBeDark ? "dark" : "light";
    return;
  }

  const x = event.clientX;
  const y = event.clientY;
  // Radius large enough to cover the viewport from the click point
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  // Must be set before startViewTransition — CSS keyframes read these during the transition
  root.style.setProperty("--theme-transition-x", `${x}px`);
  root.style.setProperty("--theme-transition-y", `${y}px`);
  root.style.setProperty("--theme-transition-r", `${endRadius}px`);
  root.dataset.themeTransition = willBeDark ? "to-dark" : "to-light";

  const transition = document.startViewTransition(async () => {
    colorMode.preference = willBeDark ? "dark" : "light";
    // Sync class immediately so the browser captures the correct "new" snapshot
    // (colorMode may update the DOM asynchronously via Vue)
    root.classList.toggle("dark", willBeDark);
    await nextTick();
  });

  try {
    await transition.finished;
  } finally {
    // Remove transition-only state so it doesn't affect future renders
    delete root.dataset.themeTransition;
    root.style.removeProperty("--theme-transition-x");
    root.style.removeProperty("--theme-transition-y");
    root.style.removeProperty("--theme-transition-r");
  }
};
</script>

<template>
  <ClientOnly v-if="!colorMode?.forced">
    <UButton
      :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
      color="neutral"
      variant="ghost"
      :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
      @click="toggleTheme"
    />

    <template #fallback>
      <div class="size-8" />
    </template>
  </ClientOnly>
</template>
