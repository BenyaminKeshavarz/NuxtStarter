/**
 * Generic API response type — defaults to the direct JSON body.
 *
 * If your backend wraps payloads, change this alias once to match your contract
 * (e.g. `{ data: T }`, `{ value: T }`, `{ result: T }`) and keep composables typed.
 */
export type ApiResponse<T> = T;
