# Custom Directives

Registered in `app/plugins/directives.ts`. Client-only input helpers for forms.

---

## `v-numeric`

Digit-only input restriction using the `beforeinput` event (typing and paste).

**File:** `app/directives/numeric.client.ts`

**When to use:** OTP fields, national IDs, postal codes, or any input that should accept ASCII digits only.

**Behavior:**

- Blocks non-digit characters on type and paste
- Sets `inputmode="numeric"` and `pattern="[0-9]*"` for mobile keyboards
- Works on `<input>` directly or on a wrapper that contains an `<input>`

**Example:**

```vue
<template>
  <UInput v-numeric placeholder="1234567890" />
</template>
```

```vue
<template>
  <div v-numeric>
    <input type="text" class="form-input" />
  </div>
</template>
```

**Notes:**

- Client-only (`.client.ts` suffix)
- Does not format or mask values — use `v-maska` when you need patterns like phone numbers
- For locale-specific digits (Persian/Arabic), use `useNumberFormatter` conversion helpers separately

---

## `v-maska`

Input masking via [maska](https://github.com/beholdr/maska) (included in `package.json`).

**When to use:** Phone numbers, dates, credit cards, or any fixed-format input.

**Example:**

```vue
<template>
  <UInput v-maska="'####-####'" placeholder="0000-0000" />
</template>
```

```vue
<script setup lang="ts">
const phoneMask = { mask: "(###) ###-####" };
</script>

<template>
  <UInput v-maska="phoneMask" />
</template>
```

**Notes:**

- Registered globally in `app/plugins/directives.ts`
- See [maska docs](https://beholdr.github.io/maska/) for token options and unmasked values

---

## Adding a new directive

1. Create `app/directives/my-directive.client.ts` (use `.client.ts` when DOM-only).
2. Export a Vue `Directive` object.
3. Register it in `app/plugins/directives.ts`:

```typescript
import { myDirective } from "~/directives/my-directive.client";

nuxt.vueApp.directive("my-directive", myDirective);
```

4. Document usage in this file.

**Cleanup:** Store teardown logic on the element (see `_numericCleanup` in `numeric.client.ts`) and call it in `unmounted`.
