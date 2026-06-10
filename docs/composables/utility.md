# Utility Composables

Auto-imported from `app/composables/utility/`. These composables provide reusable UI and browser helpers without business logic.

---

## `useLocalStorage`

SSR-safe reactive persistence in `localStorage`.

**When to use:** User preferences, draft form data, client-only state that should survive page reloads.

**Behavior:**

- On the server and during the first client render, the ref uses `defaultValue` (avoids hydration mismatch).
- After mount, reads the stored JSON value from `localStorage`.
- Watches the ref and writes changes back (deep watch for objects/arrays).

**Example:**

```vue
<script setup lang="ts">
const theme = useLocalStorage<"light" | "dark">("app-theme", "light");
const draft = useLocalStorage("post-draft", { title: "", body: "" });
</script>
```

**Notes:**

- Values must be JSON-serializable.
- Invalid JSON or quota errors log a warning in development only.

---

## `useAppOverlayState`

Global open/close state for overlays (modals, drawers, menus, loaders).

**When to use:** Multiple components need to control the same overlay without prop drilling.

**API:**

| Return    | Type              | Description              |
| --------- | ----------------- | ------------------------ |
| `isOpen`  | `Ref<boolean>`    | Current visibility state |
| `open`    | `() => void`      | Open the overlay         |
| `close`   | `() => void`      | Close the overlay        |
| `toggle`  | `() => void`      | Toggle visibility        |

**Example:**

```vue
<script setup lang="ts">
// Use a consistent name across trigger + overlay components
const { isOpen, open, close } = useAppOverlayState("mobile-menu");
</script>

<template>
  <UButton @click="open">Menu</UButton>
  <UModal v-model:open="isOpen">...</UModal>
</template>
```

**Notes:**

- Each `overlayName` gets its own SSR-safe `useState` key.
- Pick short, unique names per overlay in your app (`"search"`, `"loading"`, etc.).

---

## `useScrollTo`

Smooth scrolling helpers with optional completion callbacks.

**When to use:** In-page navigation, anchor links, tab panels, or scroll-to-section UX.

**API:**

| Method             | Description                                      |
| ------------------ | ------------------------------------------------ |
| `scrollToElement`  | Scroll to an element by `id` or `HTMLElement`    |
| `scrollToTop`      | Scroll to the top of the page                    |
| `scrollToBottom`   | Scroll to the bottom of the page                 |

**Options (`ScrollOptions`):**

| Option       | Type               | Default    | Description                                      |
| ------------ | ------------------ | ---------- | ------------------------------------------------ |
| `offset`     | `number`           | —          | Manual top offset in px (for fixed headers)      |
| `behavior`   | `ScrollBehavior`   | `"smooth"` | Native scroll behavior                           |
| `onComplete` | `() => void`       | —          | Called after scroll settles                      |
| `onError`    | `(Error) => void`  | —          | Called when the target element is missing        |

**Example:**

```vue
<script setup lang="ts">
const { scrollToElement, scrollToTop } = useScrollTo();

function goToSection() {
  scrollToElement("features", {
    offset: 80,
    onComplete: () => console.log("done"),
  });
}
</script>
```

**Notes:**

- Prefer CSS `scroll-margin-top` on targets; use `offset` only when needed.
- `onComplete` uses the `scrollend` event with a timeout fallback.
- All methods no-op on the server.

---

## `useSmartSticky`

Smart sticky positioning for sidebars or asides taller than the viewport.

**When to use:** Product/blog layouts where a sidebar should stick under the header but scroll naturally when content is long.

**Options (`SmartStickyOptions`):**

| Option           | Default | Description                                |
| ---------------- | ------- | ------------------------------------------ |
| `headerSelector` | `""`    | CSS selector for a fixed/sticky header     |
| `topGap`         | `0`     | Extra space below the header (px)          |
| `bottomOffset`   | `24`    | Minimum distance from viewport bottom (px) |

**Example:**

```vue
<script setup lang="ts">
const asideRef = ref<HTMLElement | null>(null);
const top = useSmartSticky(asideRef, {
  headerSelector: "#site-header",
  topGap: 20,
});
</script>

<template>
  <aside ref="asideRef" :style="{ top }" class="sticky">...</aside>
</template>
```

**Notes:**

- Returns a computed CSS `top` value (e.g. `"96px"`).
- Apply `position: sticky` (or fixed layout) on the element in CSS.
- Pass `headerSelector` when a fixed navbar should offset the sticky element.

---

## `useAppCarousel`

Embla Carousel wrapper with i18n direction, pagination dots, and navigation helpers.

**When to use:** Image galleries, hero sliders, product carousels, or any swipeable content.

**Dependencies:** `embla-carousel-vue` (included). Optional plugins such as `embla-carousel-autoplay`.

**Options (`AppCarouselOptions`):**

Extends [Embla options](https://www.embla-carousel.com/api/options/). Additional option:

| Option               | Type      | Description                                           |
| -------------------- | --------- | ----------------------------------------------------- |
| `dynamicPagination`  | `boolean` | Collapse distant dots when there are more than 5 slides |

**Returns:**

| Name                | Description                          |
| ------------------- | ------------------------------------ |
| `emblaRef`          | Template ref for the carousel viewport |
| `emblaApi`          | Embla API instance                   |
| `currentSlideIndex` | Active slide index                   |
| `paginationDots`    | Dot metadata for custom pagination   |
| `canScrollPrev`     | Whether previous slide is available  |
| `canScrollNext`     | Whether next slide is available      |
| `scrollToSlide`     | Go to slide by index                 |
| `scrollPrev`        | Previous slide                       |
| `scrollNext`        | Next slide                           |

**Example:**

```vue
<script setup lang="ts">
import Autoplay from "embla-carousel-autoplay";

const {
  emblaRef,
  paginationDots,
  scrollToSlide,
  scrollPrev,
  scrollNext,
  canScrollPrev,
  canScrollNext,
} = useAppCarousel({ loop: true, dynamicPagination: true }, [
  Autoplay({ delay: 4000 }),
]);
</script>

<template>
  <div>
    <div ref="emblaRef" class="overflow-hidden">
      <div class="flex">
        <div v-for="slide in slides" :key="slide.id" class="min-w-0 shrink-0 grow-0 basis-full">
          ...
        </div>
      </div>
    </div>

    <button :disabled="!canScrollPrev" @click="scrollPrev">Prev</button>
    <button :disabled="!canScrollNext" @click="scrollNext">Next</button>

    <button
      v-for="dot in paginationDots"
      :key="dot.index"
      v-show="dot.visible"
      :class="{ 'opacity-100': dot.active, 'opacity-40': !dot.active }"
      @click="scrollToSlide(dot.index)"
    />
  </div>
</template>
```

**Notes:**

- Carousel direction follows the active i18n locale (`ltr` / `rtl`).
- Navigation methods reset the autoplay plugin when present.
