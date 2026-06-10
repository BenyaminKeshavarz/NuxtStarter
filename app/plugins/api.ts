import type { FetchResponse } from "ofetch";

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  const DEFAULT_API_VERSION = "1.0";

  // 1. Create the base fetch instance
  const baseFetch = $fetch.create({
    // Enable cookies for all requests globally
    credentials: "include",

    headers: {
      "X-Version":
        (runtimeConfig.public.apiVersion as string) || DEFAULT_API_VERSION,
    },

    async onRequest({ options }) {
      // Forward client cookies to backend during SSR requests
      if (import.meta.server) {
        try {
          await nuxtApp.runWithContext(() => {
            const ssrHeaders = useRequestHeaders(["cookie"]);
            if (ssrHeaders?.cookie) {
              options.headers.set("Cookie", ssrHeaders.cookie);
            }
          });
        } catch (error) {
          console.error("Error forwarding cookies during SSR:", error);
        }
      }

      const headers = new Headers(options.headers || {});
      options.headers = headers;
    },
  });

  // 2. Wrapper for request interceptors — extend here (auth, logging, retry, etc.)
  const executeRequest = async <T = unknown>(
    fetchMethod: typeof baseFetch | typeof baseFetch.raw,
    request: Parameters<typeof baseFetch>[0],
    options: Parameters<typeof baseFetch>[1] = {},
  ): Promise<T> => {
    try {
      return (await fetchMethod(request, options)) as T;
    } catch (error: any) {
      throw error.response?._data || error.response || error;
    }
  };

  // 3. Create the customized $api object with proper TypeScript signatures
  interface CustomApi {
    <T = unknown>(request: Parameters<typeof baseFetch>[0], options?: Parameters<typeof baseFetch>[1]): Promise<T>;
    raw: <T = unknown>(request: Parameters<typeof baseFetch>[0], options?: Parameters<typeof baseFetch>[1]) => Promise<FetchResponse<T>>;
    create: typeof baseFetch.create;
  }

  const api: CustomApi = async <T = unknown>(
    request: Parameters<typeof baseFetch>[0],
    options?: Parameters<typeof baseFetch>[1],
  ) => {
    return executeRequest<T>(baseFetch, request, options);
  };

  api.raw = async <T = unknown>(
    request: Parameters<typeof baseFetch>[0],
    options?: Parameters<typeof baseFetch>[1],
  ) => {
    return executeRequest<FetchResponse<T>>(baseFetch.raw, request, options);
  };

  api.create = baseFetch.create;

  return {
    provide: {
      api,
    },
  };
});
