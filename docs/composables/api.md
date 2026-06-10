# API Composables

Auto-imported from `app/composables/api/`. These composables centralize endpoint URLs, HTTP error handling, and domain API calls.

**Related files:**

- `app/plugins/api.ts` — `$api` client ([plugin docs](../plugins/api.md))
- `app/types/api/` — response and error types
- `.env` — `NUXT_SERVER_API_BASE_URL`, `NUXT_PUBLIC_CLIENT_API_BASE_URL`, etc.

---

## Response typing

`ApiResponse<T>` defaults to the **direct JSON body** (`T`). Change the alias in `app/types/api/index.ts` if your backend wraps payloads:

```typescript
// Direct body (default)
export type ApiResponse<T> = T;

// Example: backend wraps in { data: T }
export type ApiResponse<T> = { data: T };
```

---

## `useApiConfig`

Typed endpoint builder with server/client base URL split.

**When to use:** Inside domain composables to build request URLs.

**Returns:**

| Name            | Description                                       |
| --------------- | ------------------------------------------------- |
| `apiBaseUrl`    | Internal URL on server, public URL in browser     |
| `assetsBaseUrl` | CDN or static assets base from runtime config     |
| `apiEndpoints`  | Nested endpoint map (add your domain groups here) |

**Structure pattern:**

```typescript
example: (() => {
  const base = `${apiBaseUrl}/api/v1`;
  return {
    getAll: `${base}/example`,
    getById:(id: number | string) => `${base}/example/${id}`,
  };
})(),
```

Add your own groups with the same IIFE pattern. Dynamic segments: `(id) => \`${base}/${id}\``.

---

## `useErrorHandler`

Single entry point for HTTP and application errors.

| Status | Default behavior                          |
| ------ | ----------------------------------------- |
| 5xx    | Nuxt error page                           |
| 404    | Silent by default                         |
| 4xx    | Console log; toast when `showToast: true` |

See `app/types/api/errorHandler.ts` for all options.

---

## `useExampleApi`

Minimal symbolic composable — not real business logic.

| Method              | Description       |
| ------------------- | ----------------- |
| `fetchExampleAsync` | Symbolic GET call |

**Example:**

```vue
<script setup lang="ts">
const { fetchExampleAsync } = useExampleApi();
const data = await fetchExampleAsync();
</script>
```

**When building your own composable:**

1. Add endpoints in `useApiConfig`.
2. Define types in `app/types/...`.
3. Call `$api<ApiResponse<YourType>>(url)` inside `try/catch`.
4. Use `handleError` and return safe fallbacks.

Type: `ExampleResource` in `app/types/api/example.ts`.
