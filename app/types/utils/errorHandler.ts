export interface StructuredError {
  title: string;
  message: string;
  name: string;
  stack: string | null;
  cause: unknown | null;
  details?: unknown;
}

export interface ErrorHandlerOptions {
  showToast?: boolean;
  logError?: boolean;
  toastTitle?: string;
  toastMessage?: string;
}

export interface ParsedErrorResult {
  structuredError: StructuredError;
  toastTitle: string;
  toastMessage: string;
}

export interface ErrorToastOption {
  title: string;
  message: string;
  type?: "error" | "warning";
}
