# Utils

Pure helper functions in `app/utils/`. Nuxt auto-imports exports from this folder in components, composables, and pages.

**Related files:**

- `app/utils/index.ts` — re-exports `colorHelpers` and `stringHelpers`
- `app/utils/schema.ts` — Zod validation schemas (import explicitly or rely on auto-import)
- `useErrorHandler` — used internally for dev-only validation warnings in `colorHelpers` and `stringHelpers`

---

## String helpers

**File:** `app/utils/stringHelpers.ts`

### `removeCharacterAtIndex`

Removes a single character at a given index from a string.

**When to use:** Masked inputs, OTP backspace behavior, or custom string editing where you need index-based removal.

**Parameters:**

| Name    | Type     | Description                    |
| ------- | -------- | ------------------------------ |
| `str`   | `string` | Input string                   |
| `index` | `number` | Zero-based index to remove     |

**Returns:** `string` — the string without the character at `index`, or `"-"` on invalid input.

**Example:**

```typescript
removeCharacterAtIndex("hello", 1); // "hllo"
removeCharacterAtIndex("09", 0);    // "9"
```

**Notes:**

- Invalid `str` or out-of-range `index` logs a dev warning via `useErrorHandler` and returns `"-"`.
- Index `0` is valid; the guard treats falsy indices as invalid, so pass explicit positive indices only when removing from the start.

---

## Color helpers

**File:** `app/utils/colorHelpers.ts`

Hex color utilities for validation, normalization, brightness checks, and accessible text contrast.

**When to use:** Theme pickers, badges with dynamic backgrounds, avatars, charts, or any UI where background color drives text color.

### `isValidHexColor`

Checks whether a string is a valid 3- or 6-digit hex color (with or without `#`).

```typescript
isValidHexColor("#fff");   // true
isValidHexColor("FF5733"); // true
isValidHexColor("red");    // false
```

### `normalizeHexColor`

Expands shorthand hex to 6 characters and strips the `#` prefix.

```typescript
normalizeHexColor("#f0a"); // "ff00aa"
normalizeHexColor("AABBCC"); // "AABBCC"
```

### `isBrightColor`

Uses perceived brightness `(R×299 + G×587 + B×114) / 1000` to decide if a color reads as light.

**Returns:** `true` when brightness > 128, `false` for dark colors. Returns `false` and logs a dev warning for invalid hex input.

```typescript
isBrightColor("#FFFFFF"); // true
isBrightColor("#111111"); // false
```

### `getContrastTextColor`

Picks readable text color for a given background hex.

**Returns:** `"#000000"` on bright backgrounds, `"#FFFFFF"` on dark backgrounds.

```typescript
getContrastTextColor("#F5F5F5"); // "#000000"
getContrastTextColor("#1a1a1a"); // "#FFFFFF"
```

**Example (dynamic badge):**

```vue
<script setup lang="ts">
const bg = "#3B82F6";
const textColor = getContrastTextColor(bg);
</script>

<template>
  <span :style="{ backgroundColor: bg, color: textColor }">Badge</span>
</template>
```

---

## Validation schemas

**File:** `app/utils/schema.ts`

Zod schemas for common form fields. Error messages are in Persian and match typical Iranian app requirements.

**Dependency:** `zod` (included in `package.json`).

**When to use:** Form validation with VeeValidate, manual `safeParse`, or API payload checks before submit.

### Schema helpers

#### `asOptionalField`

Wraps a strict schema so empty or whitespace-only strings are treated as `undefined`, while any non-empty value must pass the inner schema.

```typescript
const optionalEmail = asOptionalField(emailSchema);

optionalEmail.parse(undefined); // OK
optionalEmail.parse("   ");    // OK → undefined
optionalEmail.parse("a@b.c");   // must pass emailSchema
```

#### `nullToEmptyString`

Coerces `null` and `undefined` to `""` before validation. Useful for API or DB fields that may be `null` but should validate as strings in forms.

```typescript
const schema = nullToEmptyString(z.string().min(1));
schema.parse(null); // validates as ""
```

#### `isPhoneNumber`

Heuristic used by `usernameOrPhoneSchema`: returns `true` when the value starts with `09` or is entirely numeric.

### Field schemas

| Schema                  | Rules summary                                                                 |
| ----------------------- | ----------------------------------------------------------------------------- |
| `phoneSchema`           | Trim, remove spaces; required `09` + 9 digits (11 total)                      |
| `usernameSchema`        | 4–30 chars; starts with letter/`_`; `[a-zA-Z_][\w.]{3,29}`                   |
| `emailSchema`           | Valid email, 5–255 chars, lowercased                                            |
| `birthDateSchema`       | `YYYY-MM-DD`; not future; year within last 100 years                            |
| `genderSchema`          | Enum: `"Male"` \| `"Female"`                                                  |
| `fullNameSchema`        | 2–100 chars; Unicode letters, spaces, `'`, `-`; title-cased on success        |
| `firstNameSchema`       | 2–50 chars; same character rules as name; title-cased                         |
| `lastNameSchema`        | 2–50 chars; same character rules as name; title-cased                         |
| `nationalCodeSchema`    | Exactly 10 digits                                                             |
| `usernameOrPhoneSchema` | Dispatches to `phoneSchema` or `usernameSchema` based on `isPhoneNumber`      |

**Example (VeeValidate / Zod):**

```typescript
import { z } from "zod";
import { phoneSchema, asOptionalField, emailSchema } from "~/utils/schema";

const loginSchema = z.object({
  identifier: usernameOrPhoneSchema,
  email: asOptionalField(emailSchema),
});

const result = loginSchema.safeParse(formValues);
if (!result.success) {
  console.log(result.error.flatten().fieldErrors);
}
```

```vue
<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { phoneSchema } from "~/utils/schema";

const schema = toTypedSchema(phoneSchema);
</script>
```

**Notes:**

- `fullNameSchema`, `firstNameSchema`, and `lastNameSchema` apply `toTitleCase` on successful parse.
- `phoneSchema` strips internal whitespace before regex validation.
- Extend this file with project-specific schemas; keep shared primitives (`asOptionalField`, `nullToEmptyString`) for optional form fields.

---

## Adding a new util

1. Add a file under `app/utils/` (e.g. `dateHelpers.ts`).
2. Export named functions (Nuxt auto-imports them).
3. Re-export from `app/utils/index.ts` if the helper belongs in the public barrel.
4. Document usage in this file.

**Guidelines:**

- Keep utils pure and side-effect free where possible.
- Use `useErrorHandler` for invalid inputs only when the function should fail softly in UI code.
- Prefer Zod schemas in `schema.ts` for validation; keep formatting/parsing in dedicated helper files.
