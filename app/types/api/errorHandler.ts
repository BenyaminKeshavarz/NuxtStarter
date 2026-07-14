export interface StructuredError {
  title: string;
  /** Primary / first message; when API returns a list, use .messages for the full list */
  message: string;
  /** When API returns multiple errors (e.g. validation), this keeps the full list */
  messages?: string[];
  name: string;
  stack: string | null;
  cause: unknown | null;
  details?: unknown;
}

// Common error handling properties
export interface ErrorHandlingOptions {
  showToast?: boolean;
  notFoundAction?: "silent" | "redirect" | "errorPage";
  redirectTo?: string;
  logError?: boolean;
}

export interface ErrorHandlerOptions extends ErrorHandlingOptions {
  toastTitle?: string;
  toastMessage?: string;
  toastType?: "error" | "warning" | "info" | "success";
  toastDuration?: number;
  customHttpHandling?: boolean;
  /** Used when API/body has no messages (e.g. inline form errors) */
  fallbackMessage?: string;
  /**
   * Whether to throw the error after handling (default: false)
   */
  throwError?: boolean;
}

export interface ParsedErrorResult {
  structuredError: StructuredError;
  toastTitle: string;
  /** One item per toast; multiple errors → multiple toasts */
  toastMessages: string[];
}

export interface HttpErrorConfig {
  status: number;
  title: string;
  message: string;
  type: "error" | "warning" | "info";
  redirectTo?: string;
}
