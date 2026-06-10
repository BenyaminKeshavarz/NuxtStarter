import type { Directive } from "vue";

const NUMERIC_ONLY = /^\d$/;
const NUMERIC_PASTE = /^\d+$/;

function getInput(el: HTMLElement): HTMLInputElement | null {
  return el.tagName === "INPUT"
    ? (el as HTMLInputElement)
    : el.querySelector<HTMLInputElement>("input");
}

function handleBeforeInput(e: Event): void {
  const ev = e as InputEvent;
  const data = ev.data ?? "";
  if (ev.inputType === "insertFromPaste") {
    if (data !== "" && !NUMERIC_PASTE.test(data)) ev.preventDefault();
    return;
  }
  if (data !== "" && !NUMERIC_ONLY.test(data)) ev.preventDefault();
}

type ElWithCleanup = HTMLElement & { _numericCleanup?: () => void };

export const numeric: Directive<HTMLElement> = {
  mounted(el) {
    const input = getInput(el);
    if (!input) return;

    input.setAttribute("inputmode", "numeric");
    input.setAttribute("pattern", "[0-9]*");

    input.addEventListener("beforeinput", handleBeforeInput);
    (el as ElWithCleanup)._numericCleanup = () =>
      input.removeEventListener("beforeinput", handleBeforeInput);
  },
  unmounted(el) {
    (el as ElWithCleanup)._numericCleanup?.();
  },
};

export default numeric;
