import type {
  StructuredError,
  ErrorHandlerOptions,
  ParsedErrorResult,
  HttpErrorConfig,
} from "~/types/api/errorHandler";

// #region Constants

const DEFAULT_ERROR: StructuredError = {
  title: "Error",
  message: "An unexpected error occurred.",
  name: "UnknownError",
  stack: null,
  cause: null,
};

const HTTP_ERRORS: Record<number, HttpErrorConfig> = {
  400: {
    status: 400,
    title: "Bad Request",
    message: "Please check your input and try again.",
    type: "error",
  },
  401: {
    status: 401,
    title: "Unauthorized",
    message: "Please log in to continue.",
    type: "error",
  },
  403: {
    status: 403,
    title: "Access Denied",
    message: "You don't have permission to perform this action.",
    type: "error",
  },
  404: {
    status: 404,
    title: "Not Found",
    message: "The requested resource was not found.",
    type: "error",
  },
  409: {
    status: 409,
    title: "Conflict",
    message: "This action conflicts with the current state.",
    type: "warning",
  },
  422: {
    status: 422,
    title: "Validation Error",
    message: "Please check your input and try again.",
    type: "error",
  },
  429: {
    status: 429,
    title: "Too Many Requests",
    message: "Please wait a moment and try again.",
    type: "warning",
  },
  500: {
    status: 500,
    title: "Server Error",
    message: "Something went wrong on our end. Please try again later.",
    type: "error",
  },
  502: {
    status: 502,
    title: "Bad Gateway",
    message: "Service temporarily unavailable. Please try again later.",
    type: "error",
  },
  503: {
    status: 503,
    title: "Service Unavailable",
    message: "Service temporarily unavailable. Please try again later.",
    type: "error",
  },
  504: {
    status: 504,
    title: "Gateway Timeout",
    message: "Request timed out. Please try again later.",
    type: "error",
  },
};

const TOAST_ICONS: Record<string, string> = {
  error: "i-lucide-circle-x",
  warning: "i-lucide-triangle-alert",
  info: "i-lucide-circle-info",
  success: "i-lucide-circle-check",
};

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
  if (!error) {
    const structuredError = { ...DEFAULT_ERROR, message: "No error provided" };
    return {
      structuredError,
      toastTitle: structuredError.title,
      toastMessages: [structuredError.message],
    };
  }
  if (typeof error === "string") {
    const structuredError = { ...DEFAULT_ERROR, message: error };
    return {
      structuredError,
      toastTitle: structuredError.title,
      toastMessages: [error],
    };
  }

  const errorObj = error as any;
  const status = getHttpStatus(errorObj);
  const httpConfig = HTTP_ERRORS[status];
  const responseData = extractResponseData(errorObj);
  const apiMessages = extractMessages(responseData);
  const fallback =
    options.fallbackMessage ??
    errorObj?.message ??
    httpConfig?.message ??
    DEFAULT_ERROR.message;
  const messages = apiMessages.length > 0 ? apiMessages : [fallback];

  const structuredError: StructuredError = {
    title: httpConfig?.title ?? DEFAULT_ERROR.title,
    message: messages[0],
    messages,
    name:
      errorObj?.name ?? (status ? `HttpError${status}` : DEFAULT_ERROR.name),
    stack: errorObj?.stack ?? null,
    cause: errorObj?.cause ?? null,
    details: status
      ? { status, data: responseData, url: errorObj?.url, messages }
      : { messages },
  };

  const toastTitle = options.toastTitle ?? structuredError.title;
  const toastMessages = options.toastMessage
    ? [options.toastMessage]
    : messages;

  return {
    structuredError,
    toastTitle,
    toastMessages,
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

    // 5XX → error page
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

    // 404 → optional action
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

    // One toast per error message (multiple API errors → multiple toasts)
    if (mergedOptions.showToast) {
      const toastType =
        HTTP_ERRORS[status]?.type ?? mergedOptions.toastType ?? "error";
      const duration = mergedOptions.toastDuration ?? 5000;
      toastMessages.forEach((msg) =>
        showToast(toastTitle, msg, toastType, duration),
      );
    }

    const redirect =
      mergedOptions.redirectTo ?? HTTP_ERRORS[status]?.redirectTo;
    if (redirect) navigateTo(redirect);

    if (mergedOptions.throwError) throw error;
  }

  return { handleError, parseApiError, getErrorMessage };
}

// #endregion
