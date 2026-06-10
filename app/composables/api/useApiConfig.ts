/**
 * API configuration composable that provides typed endpoints and base URL
 */
export const useApiConfig = () => {
  const config = useRuntimeConfig();

  // For improving performance, we can use the serverApiBaseUrl for SSR requests and the clientApiBaseUrl for client requests.
  const apiBaseUrl = import.meta.server
    ? config.serverApiBaseUrl
    : config.public.clientApiBaseUrl;

  const assetsBaseUrl = config.public.assetsBaseUrl;

  enum ApiVersion {
    V1 = "api/v1",
  }

  const apiEndpoints = {
    // TODO: Add your resource groups here.
    example: (() => {
      const base = `${apiBaseUrl}/${ApiVersion.V1}`;

      return {
        getAll: `${base}/example`,
        getById:(id: number | string) => `${base}/example/${id}`,
      };
    })(),
  };

  return {
    apiBaseUrl,
    assetsBaseUrl,
    apiEndpoints,
  };
};
