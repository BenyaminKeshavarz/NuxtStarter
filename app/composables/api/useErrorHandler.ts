import type {
  StructuredError,
  ErrorHandlerOptions,
  ParsedErrorResult,
} from "~/types/api/errorHandler";

// #region Constants

/** HTTP statuses that should toast as warning instead of error */
const WARNING_STATUSES = new Set([409, 429]);

const TOAST_ICONS: Record<string, string> = {
  error: "i-lucide-circle-x",
  warning: "i-lucide-triangle-alert",
  info: "i-lucide-info",
  success: "i-lucide-circle-check",
};

// #endregion

// #region i18n

/** Shared title/message for a status code (`errors.http.*` → `errors.default`). */
export function resolveHttpErrorCopy(status: number) {
  const { t, te } = useI18n();
  const titleKey = `errors.http.${status}.title`;
  const messageKey = `errors.http.${status}.message`;

  return {
    title: te(titleKey) ? t(titleKey) : t("errors.default.title"),
    message: te(messageKey) ? t(messageKey) : t("errors.default.message"),
  };
}

// #endregion

// #region Parsing

function getHttpStatus(error: any): number {
  const status =
    error?.status ??
    error?.statusCode ??
    error?.response?.status ??
    error?.messageCode;
  return typeof status === "number" && status > 0 ? status : 0;
}

function extractResponseData(errorObj: any): any {
  const data =
    errorObj?.data ??
    errorObj?._data ??
    errorObj?.response?.data ??
    errorObj?.response;
  if (data) return data;
  const hasApiShape =
    errorObj &&
    typeof errorObj === "object" &&
    ("isSuccess" in errorObj ||
      "messageCode" in errorObj ||
      "messages" in errorObj);
  return hasApiShape ? errorObj : null;
}

function extractMessages(data: any): string[] {
  if (!data || typeof data !== "object") return [];
  if (Array.isArray(data.messages))
    return data.messages.filter((m: unknown) => typeof m === "string");
  if (typeof data.message === "string") return [data.message];
  return [];
}

function parseError(
  error: unknown,
  options: Partial<ErrorHandlerOptions> = {},
): ParsedErrorResult {
  const { t } = useI18n();
  const fallbackCopy = resolveHttpErrorCopy(0);

  if (!error) {
    const structuredError: StructuredError = {
      title: fallbackCopy.title,
      message: t("errors.noError"),
      name: "UnknownError",
      stack: null,
      cause: null,
    };
    return {
      structuredError,
      toastTitle: structuredError.title,
      toastMessages: [structuredError.message],
    };
  }

  if (typeof error === "string") {
    const structuredError: StructuredError = {
      title: fallbackCopy.title,
      message: error,
      name: "UnknownError",
      stack: null,
      cause: null,
    };
    return {
      structuredError,
      toastTitle: structuredError.title,
      toastMessages: [error],
    };
  }

  const errorObj = error as any;
  const status = getHttpStatus(errorObj);
  const copy = status ? resolveHttpErrorCopy(status) : fallbackCopy;
  const responseData = extractResponseData(errorObj);
  const apiMessages = extractMessages(responseData);
  const fallback =
    options.fallbackMessage ?? errorObj?.message ?? copy.message;
  const messages = apiMessages.length > 0 ? apiMessages : [fallback];

  const structuredError: StructuredError = {
    title: copy.title,
    message: messages[0]!,
    messages,
    name:
      errorObj?.name ?? (status ? `HttpError${status}` : "UnknownError"),
    stack: errorObj?.stack ?? null,
    cause: errorObj?.cause ?? null,
    details: status
      ? { status, data: responseData, url: errorObj?.url, messages }
      : { messages },
  };

  return {
    structuredError,
    toastTitle: options.toastTitle ?? structuredError.title,
    toastMessages: options.toastMessage
      ? [options.toastMessage]
      : messages,
  };
}

export function parseApiError(
  error: unknown,
  options: Partial<ErrorHandlerOptions> = {},
): ParsedErrorResult {
  return parseError(error, options);
}

export function getErrorMessage(
  error: unknown,
  options: Partial<ErrorHandlerOptions> = {},
): string {
  return parseError(error, options).structuredError.message;
}

// #endregion

// #region Composable

/**
 * Single entry point for error handling:
 * - 5XX → error page
 * - 404 → optional redirect / error page / silent
 * - 4XX / other → optional toast, optional redirect
 */
export function useErrorHandler() {
  const toast = useToast();

  function showToast(
    title: string,
    message: string,
    type: "error" | "warning" | "info" | "success" = "error",
    duration = 5000,
  ) {
    try {
      toast.add({
        title,
        description: message,
        color: type,
        icon: TOAST_ICONS[type] ?? TOAST_ICONS.error,
        duration,
      });
    } catch (e) {
      console.error("Toast error:", { title, message, type }, e);
    }
  }

  function handleError(
    error: unknown,
    options: Partial<ErrorHandlerOptions> = {},
  ): void {
    const mergedOptions = { logError: true, ...options };
    const { structuredError, toastTitle, toastMessages } = parseError(
      error,
      mergedOptions,
    );
    const status: number = (structuredError.details as any)?.status ?? 0;

    if (mergedOptions.logError) {
      if (status) {
        const msgs = structuredError.messages ?? [structuredError.message];
        const body =
          msgs.length > 1
            ? msgs.map((m, i) => `  ${i + 1}. ${m}`).join("\n")
            : msgs[0];
        console.error(
          `[HTTP ${status}] ${structuredError.title}:`,
          msgs.length > 1 ? `\n${body}` : body,
          structuredError,
        );
      } else {
        console.error("Error:", structuredError.message, structuredError);
      }
    }

    if (status >= 500) {
      showError({
        statusCode: status,
        statusMessage: structuredError.title,
        message: structuredError.message,
        fatal: true,
      });
      if (mergedOptions.throwError) throw error;
      return;
    }

    if (status === 404) {
      const action = mergedOptions.notFoundAction ?? "silent";
      if (action === "redirect" && mergedOptions.redirectTo)
        navigateTo(mergedOptions.redirectTo);
      else if (action === "errorPage") {
        showError({
          statusCode: 404,
          statusMessage: structuredError.title,
          message: structuredError.message,
          fatal: true,
        });
      }
      if (mergedOptions.throwError) throw error;
      return;
    }

    if (mergedOptions.showToast) {
      const toastType =
        mergedOptions.toastType ??
        (WARNING_STATUSES.has(status) ? "warning" : "error");
      const duration = mergedOptions.toastDuration ?? 5000;
      toastMessages.forEach((msg) =>
        showToast(toastTitle, msg, toastType, duration),
      );
    }

    if (mergedOptions.redirectTo) navigateTo(mergedOptions.redirectTo);
    if (mergedOptions.throwError) throw error;
  }

  return { handleError, parseApiError, getErrorMessage };
}

// #endregion
