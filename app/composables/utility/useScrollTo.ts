export interface ScrollOptions {
  /** Manual top offset in px; omit to use `scrollIntoView` + CSS `scroll-margin`. */
  offset?: number;
  behavior?: ScrollBehavior;
  /** Called after scroll settles (`scrollend` or timeout fallback). */
  onComplete?: () => void;
  onError?: (error: Error) => void;
}

function afterScroll(callback: () => void, timeout = 900): void {
  if (import.meta.server) {
    callback();
    return;
  }

  let settled = false;
  const done = (): void => {
    if (settled) return;
    settled = true;
    callback();
  };

  window.addEventListener("scrollend", done, { once: true });
  setTimeout(done, timeout);
}

/**
 * Scroll helpers for sections and page positions.
 * @returns `scrollToElement`, `scrollToTop`, `scrollToBottom`
 */
export const useScrollTo = () => {
  function scrollWindow(top: number, options: ScrollOptions = {}): void {
    if (import.meta.server) return;

    const { behavior = "smooth", onComplete, onError } = options;

    try {
      window.scrollTo({ top, behavior });
      if (onComplete) afterScroll(onComplete);
    } catch (error) {
      if (onError && error instanceof Error) onError(error);
    }
  }

  /**
   * Scrolls to a DOM element by reference or id.
   * Prefer `scroll-margin` on the target; pass `offset` only when needed.
   */
  function scrollToElement(
    target: string | HTMLElement,
    options: ScrollOptions = {},
  ): void {
    if (import.meta.server) return;

    const { offset, behavior = "smooth", onComplete, onError } = options;
    const element =
      typeof target === "string" ? document.getElementById(target) : target;

    if (!element) {
      const message =
        typeof target === "string"
          ? `Element with ID "${target}" not found.`
          : "Target element not found.";
      onError?.(new Error(message));
      return;
    }

    if (offset != null && offset > 0) {
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      scrollWindow(top, { behavior, onComplete, onError });
      return;
    }

    element.scrollIntoView({ behavior, block: "start" });
    if (onComplete) afterScroll(onComplete);
  }

  /** Scrolls to the top of the page. */
  function scrollToTop(options: ScrollOptions = {}): void {
    scrollWindow(0, options);
  }

  /** Scrolls to the bottom of the page. */
  function scrollToBottom(options: ScrollOptions = {}): void {
    const top = document.documentElement.scrollHeight - window.innerHeight;
    scrollWindow(top, options);
  }

  return {
    scrollToElement,
    scrollToTop,
    scrollToBottom,
  };
};
