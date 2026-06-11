// TODO: Add overlay names as Union type.
export type AppOverlayName = "loading";

/**
 * Shared open/close state for app-wide overlays (modals, menus, loaders, etc.).
 * Each overlay name gets its own SSR-safe `useState` bucket.
 */
export function useAppOverlayState(overlayName: AppOverlayName) {
  const isOpen = useState<boolean>(`overlay-state-${overlayName}`, () => false);

  function open() {
    isOpen.value = true;
  }

  function close() {
    isOpen.value = false;
  }

  function toggle() {
    isOpen.value = !isOpen.value;
  }

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}
