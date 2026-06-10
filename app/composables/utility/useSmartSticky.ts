import { useWindowScroll, useWindowSize, useElementSize } from "@vueuse/core";

export interface SmartStickyOptions {
  /** CSS selector for a fixed/sticky header to offset from. */
  headerSelector?: string;
  /** Extra gap below the header in px. */
  topGap?: number;
  /** Minimum distance from the bottom of the viewport in px. */
  bottomOffset?: number;
}

export const useSmartSticky = (
  elRef: Ref<HTMLElement | null>,
  options: SmartStickyOptions = {},
) => {
  const { headerSelector = "", topGap = 0, bottomOffset = 24 } = options;

  const headerEl = ref<HTMLElement | null>(null);
  const topPosition = ref(0);
  let lastY = 0;

  const { y } = useWindowScroll();
  const { height: windowHeight } = useWindowSize();
  const { height: elHeight } = useElementSize(elRef);
  const { height: headerHeight } = useElementSize(headerEl);

  const computedTopOffset = computed(() => (headerHeight.value || 0) + topGap);

  onMounted(() => {
    if (headerSelector) {
      headerEl.value = document.querySelector(headerSelector);
    }
  });

  watch(y, (currentY) => {
    if (!elRef.value) return;

    const currentTopOffset = computedTopOffset.value;
    const delta = currentY - lastY;
    lastY = currentY;

    if (elHeight.value > windowHeight.value - currentTopOffset) {
      const minTop = windowHeight.value - elHeight.value - bottomOffset;

      topPosition.value = Math.min(
        currentTopOffset,
        Math.max(minTop, topPosition.value - delta),
      );
    } else {
      topPosition.value = currentTopOffset;
    }
  });

  watch(computedTopOffset, (newOffset) => {
    if (!elRef.value) return;

    if (elHeight.value <= windowHeight.value - newOffset) {
      topPosition.value = newOffset;
    } else {
      topPosition.value = Math.min(newOffset, topPosition.value);
    }
  });

  return computed(() => `${topPosition.value}px`);
};
