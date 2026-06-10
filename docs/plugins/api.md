# API Plugin (`app/plugins/api.ts`)

Provides the global `$api` client via `useNuxtApp().$api`.

---

## Architecture

```
defineNuxtPlugin
├── 1. baseFetch ($fetch.create)
│   ├── credentials: "include"
│   ├── X-Version header (from runtimeConfig.public.apiVersion)
│   └── onRequest → SSR cookie forwarding
├── 2. executeRequest wrapper
│   └── normalizes thrown errors (response._data)
└── 3. $api object
    ├── $api(url, options)     → typed JSON body
    ├── $api.raw(url, options) → headers + status
    └── $api.create              → custom fetch instance
```

The plugin is intentionally minimal. Cross-cutting behavior belongs in **interceptors** inside `onRequest`, `onResponse`, or the `executeRequest` wrapper — not in individual composables.

---

## Usage

```typescript
const { $api } = useNuxtApp();

// GET — type the expected JSON body directly
const data = await $api<MyType>(url);

// POST
await $api(url, { method: "POST", body: payload });

// Raw response (status, headers)
const response = await $api.raw<MyType>(url);
```

Prefer domain composables (`useExampleApi`, `useBlogApi`, …) over calling `$api` directly in components.

---

## Interceptors

Use this layer for shared HTTP concerns:

| Concern | Where to add |
| ------- | ------------ |
| Auth header (`Authorization: Bearer …`) | `onRequest` |
| 401 handling + refresh token + retry | `executeRequest` catch block |
| Logout on invalid refresh | inside refresh failure handler |
| Request / response logging | `onRequest` / `onResponse` |
| Normalized error shape | `executeRequest` catch |

### JWT refresh (typical pattern)

1. **`onRequest`** — attach the access token from your auth store when present.
2. **`executeRequest`** — on `401` and when `skipRefresh` is not set:
   - if no refresh token → clear session and redirect to login
   - otherwise start (or await) a single in-flight refresh promise to avoid race conditions
   - retry the original request with the new access token
3. **Refresh call** — use plain `$fetch` or a dedicated client without the refresh wrapper to avoid infinite loops.

---

## SSR cookie forwarding

During SSR, browser cookies are forwarded to the backend so session-based APIs work on first render.

No extra setup is required when `credentials: "include"` is enabled on the client.

---

## Environment

| Env var                           | Runtime config key               |
| --------------------------------- | -------------------------------- |
| `NUXT_SERVER_API_BASE_URL`        | `serverApiBaseUrl`               |
| `NUXT_PUBLIC_CLIENT_API_BASE_URL` | `public.clientApiBaseUrl`        |
| `NUXT_PUBLIC_API_VERSION`         | `public.apiVersion`              |

Endpoint paths are built in `useApiConfig`, not in this plugin.

---

## Response typing

`ApiResponse<T>` in `app/types/api/index.ts` defaults to `T` (direct JSON body).

If your backend wraps payloads, change that alias once — composables and `$api<MyType>()` stay consistent.
