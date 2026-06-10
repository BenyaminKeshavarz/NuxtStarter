import { tryOnMounted } from "@vueuse/core";

/**
 * Reactive ref synced with localStorage (client-only).
 * - SSR: returns ref with default value (avoids hydration mismatch).
 * - Client: reads from localStorage in onMounted, then syncs changes back.
 * Values must be JSON-serializable.
 */
export function useLocalStorage<T>(key: string, defaultValue: T) {
  const data = ref<T>(defaultValue) as Ref<T>;

  if (import.meta.client) {
    // Read after mount so first client render matches SSR (same as defaultValue)
    tryOnMounted(() => {
      try {
        const raw = localStorage.getItem(key);
        if (raw !== null) data.value = JSON.parse(raw) as T;
      } catch (e) {
        if (import.meta.dev)
          console.warn(`[useLocalStorage] Invalid value for "${key}":`, e);
      }
    });

    watch(
      data,
      (v) => {
        try {
          localStorage.setItem(key, JSON.stringify(v));
        } catch (e) {
          if (import.meta.dev)
            console.warn(
              `[useLocalStorage] Failed to write "${key}" (quota/private?):`,
              e,
            );
        }
      },
      { deep: true },
    );
  }

  return data;
}
