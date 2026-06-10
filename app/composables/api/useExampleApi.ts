import type { ApiResponse } from "~/types/api";

interface ExampleResource {
  message: string;
}

/**
 * Symbolic API composable — copy this shape for your own resource modules.
 */
export const useExampleApi = () => {
  const { apiEndpoints } = useApiConfig();
  const { $api } = useNuxtApp();
  const { handleError } = useErrorHandler();

  /**
   * Symbolic GET example.
   * Replace with your own methods (list, create, update, …).
   */
  async function fetchExampleAsync(): Promise<ExampleResource | null> {
    try {
      return await $api<ApiResponse<ExampleResource>>(apiEndpoints.example.getAll);
    } catch (error) {
      handleError(error);
      return null;
    }
  }

  return {
    fetchExampleAsync,
  };
};
