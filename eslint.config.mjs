// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
   // Your custom configs here
   {
    name: "app/files-to-lint",
    files: ["**/*.{ts,mts,tsx,vue}"],
  },
  // Move the rules configuration to the end to ensure it takes precedence
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "prefer-const": "warn",
      "vue/html-self-closing": "off",
      "vue/multi-word-component-names": "off",
      "vue/no-v-html": "off",
    },
  },
)
