<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed(() => colorMode.value === "dark");

/** Pointer coords → layout/snapshot space (required for view-transition clip-path on mobile) */
function getCircleOrigin(event: PointerEvent) {
  const vv = window.visualViewport;

  return {
    x: event.clientX + (vv?.offsetLeft ?? 0),
    y: event.clientY + (vv?.offsetTop ?? 0),
  };
}

const toggleTheme = async (event: PointerEvent) => {
  if (event.button !== 0) return;

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

  const { x, y } = getCircleOrigin(event);
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  root.dataset.themeTransition = willBeDark ? "to-dark" : "to-light";

  const transition = document.startViewTransition(async () => {
    colorMode.preference = willBeDark ? "dark" : "light";
    root.classList.toggle("dark", willBeDark);
    await nextTick();
  });

  try {
    await transition.ready;

    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
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
      @pointerdown="toggleTheme"
    />

    <template #fallback>
      <div class="size-8" />
    </template>
  </ClientOnly>
</template>
