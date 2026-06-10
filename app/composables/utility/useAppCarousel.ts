import useEmblaCarousel from "embla-carousel-vue";
import type { EmblaOptionsType, EmblaPluginType } from "embla-carousel";

export interface AppCarouselOptions extends EmblaOptionsType {
  dynamicPagination?: boolean;
}

/**
 * Reusable Embla Carousel composable with i18n direction and pagination helpers.
 * @param options - Embla Carousel options.
 * @param plugins - An array of Embla Carousel plugins.
 */
export function useAppCarousel(
  options: AppCarouselOptions = {},
  plugins: EmblaPluginType[] = [],
) {
  const { localeProperties } = useI18n();
  const dir = computed(
    () => (localeProperties.value.dir ?? "rtl") as "ltr" | "rtl",
  );

  // #region --------- Embla Instance ---------
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      direction: dir.value,
      ...options,
    },
    plugins,
  );
  // #endregion

  // #region --------- Reactive State ---------
  const currentSlideIndex = ref(0);
  const _internalDots = ref<number[]>([]);
  const canScrollPrev = ref(false);
  const canScrollNext = ref(false);
  // #endregion

  // #region --------- Computed State ---------
  // Single source of truth for pagination dots (handles both normal and dynamic modes)
  const paginationDots = computed(() => {
    const total = _internalDots.value.length;
    const isDynamicEnabled = !!options.dynamicPagination && total > 5;

    return _internalDots.value.map((_, index) => {
      let distance = 0;
      let visible = true;

      if (isDynamicEnabled) {
        distance = Math.abs(index - currentSlideIndex.value);

        // Handle loop wrap-around calculations
        if (options.loop && distance > total / 2) {
          distance = total - distance;
        }
        visible = distance <= 2;
      }

      return {
        index,
        active: index === currentSlideIndex.value,
        isDynamic: isDynamicEnabled,
        distance,
        visible,
      };
    });
  });
  // #endregion

  // #region --------- Actions ---------
  const resetAutoplay = () => {
    emblaApi.value?.plugins().autoplay?.reset();
  };

  const scrollToSlide = (index: number) => {
    emblaApi.value?.scrollTo(index);
    resetAutoplay();
  };

  const scrollPrev = () => {
    emblaApi.value?.scrollPrev();
    resetAutoplay();
  };

  const scrollNext = () => {
    emblaApi.value?.scrollNext();
    resetAutoplay();
  };
  // #endregion

  /** Updates the reactive state based on the carousel's current status. */
  const updateState = () => {
    const api = emblaApi.value;
    if (!api) return;

    currentSlideIndex.value = api.selectedScrollSnap();
    _internalDots.value = api.scrollSnapList();
    canScrollPrev.value = api.canScrollPrev();
    canScrollNext.value = api.canScrollNext();
  };

  // Watch for the emblaApi to be initialized, then set up event listeners.
  const stop = watch(
    emblaApi,
    (api) => {
      if (!api) return;

      // Set up listeners
      api.on("select", updateState);
      api.on("reInit", updateState);

      // Clean up listeners on destroy
      api.on("destroy", () => {
        api.off("select", updateState);
        api.off("reInit", updateState);
      });

      // Set initial state
      updateState();
    },
    { immediate: true },
  );

  onUnmounted(() => {
    stop();
  });

  return {
    emblaRef,
    emblaApi,
    currentSlideIndex,
    paginationDots,
    canScrollPrev,
    canScrollNext,
    scrollToSlide,
    scrollPrev,
    scrollNext,
  };
}
