import type {
  StructuredError,
  ErrorHandlerOptions,
  ParsedErrorResult,
  ErrorToastOption,
} from "~/types/utils/errorHandler";

/**
 * Composable for handling errors with toast notifications
 */
export function useErrorHandler() {
  const errors = ref<StructuredError[]>([]); // Store errors for debugging and logging

  // Default technical error
  const DEFAULT_ERROR: StructuredError = {
    title: "Error",
    message: "An unexpected error occurred. Please try again.",
    name: "UnknownError",
    stack: null,
    cause: null,
  };

  // Default user-friendly title and message for toast
  const DEFAULT_TOAST: ErrorToastOption = {
    title: "Something went wrong!",
    message:
      "An unexpected error occurred. Please try again later or contact site support.",
  };

  /**
   * Show a toast notification
   */
  function showToast({ title, message }: ErrorToastOption): void {
    alert(title + " " + message);
  }

  /**
   * Parse and structure the error input.
   * @param error - The error to process.
   * @param options - Optional overrides for title and message.
   * @returns - A structured error object.
   */
  function parseError(
    error: unknown,
    options: Partial<ErrorHandlerOptions> = {},
  ): ParsedErrorResult {
    const { toastTitle, toastMessage } = options;

    let structuredError: StructuredError = { ...DEFAULT_ERROR };

    if (!error) {
      return {
        structuredError,
        toastTitle: toastTitle ?? DEFAULT_TOAST.title,
        toastMessage: toastMessage ?? DEFAULT_TOAST.message,
      };
    }

    // Handle different types of errors (string, Error, object)
    if (typeof error === "string") {
      structuredError.message = error;
    } else if (error instanceof Error) {
      structuredError = {
        ...structuredError,
        message: error.message || DEFAULT_ERROR.message,
        name: error.name || DEFAULT_ERROR.name,
        stack: error.stack || null,
        cause: error.cause || null,
      };
    } else if (typeof error === "object" && error !== null) {
      const errorObj = error as Record<string, unknown>;
      structuredError = {
        ...structuredError,
        message: (errorObj.message as string) || DEFAULT_ERROR.message,
        title:
          (errorObj.title as string) ||
          (errorObj.name as string) ||
          DEFAULT_ERROR.title,
        details: errorObj.details || null,
      };
    }

    return {
      structuredError,
      toastTitle: toastTitle ?? DEFAULT_TOAST.title,
      toastMessage: toastMessage ?? DEFAULT_TOAST.message,
    };
  }

  /**
   * Handles errors with customizable options.
   *
   * @param error - The error object or value to handle.
   * @param options - Custom options for handling the error.
   */
  function handleError(
    error: unknown,
    options: Partial<ErrorHandlerOptions> = {},
  ): void {
    const defaultOptions: Required<ErrorHandlerOptions> = {
      showToast: false,
      logError: true,
      toastTitle: "",
      toastMessage: "",
    };

    // Merge provided options with default options
    const mergedOptions = { ...defaultOptions, ...options };

    const { structuredError, toastTitle, toastMessage } = parseError(
      error,
      mergedOptions,
    );

    // Store the error for debugging/logging.
    errors.value.push(structuredError);

    // Show toast if needed
    if (mergedOptions.showToast) {
      showToast({
        title: toastTitle,
        message: toastMessage,
      });
    }

    // Log the error in the console if needed
    if (mergedOptions.logError) {
      console.error("Handled Error:", {
        title: structuredError.title,
        message: structuredError.message,
        name: structuredError.name,
        stack: structuredError.stack,
        cause: structuredError.cause,
      });
    }
  }

  /**
   * Retrieve all logged errors.
   * @returns List of logged errors.
   */
  const getLoggedErrors = (): StructuredError[] => errors.value;

  return {
    handleError,
    getLoggedErrors,
  };
}
