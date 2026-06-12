<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed(() => colorMode.value === "dark");

const toggleTheme = async (event: MouseEvent) => {
  const willBeDark = !isDark.value;
  const root = document.documentElement;
  const el = event.currentTarget;

  if (!(el instanceof HTMLElement)) return;

  if (
    !document.startViewTransition ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    colorMode.preference = willBeDark ? "dark" : "light";
    return;
  }

  const rect = el.getBoundingClientRect();
  const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
  const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100;

  root.dataset.themeTransition = willBeDark ? "to-dark" : "to-light";

  const transition = document.startViewTransition(async () => {
    colorMode.preference = willBeDark ? "dark" : "light";
    root.classList.toggle("dark", willBeDark);
    await nextTick();
  });

  try {
    await transition.ready;

    const clipPath = [
      `circle(0% at ${x}% ${y}%)`,
      `circle(150vmax at ${x}% ${y}%)`,
    ];

    const animation = document.documentElement.animate(
      { clipPath: willBeDark ? [...clipPath].reverse() : clipPath },
      {
        duration: 500,
        easing: "ease-out",
        fill: "forwards",
        pseudoElement: willBeDark
          ? "::view-transition-old(root)"
          : "::view-transition-new(root)",
      },
    );

    await animation.finished;
    await transition.finished;
  } finally {
    delete root.dataset.themeTransition;
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
