// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  /* 
   * -------------------------------------------------------
   * ### Nuxt 4 Compatibility & Global Settings
   * ------------------------------------------------------- 
     Configures compatibility with Nuxt 4 and sets up basic global settings.
   * ------------------------------------------------------- */
  future: {
    compatibilityVersion: 4, // Ensures compatibility with Nuxt 4.
  },

  /* 
   * -------------------------------------------------------
   * ### Global Styles - CSS
   * -------------------------------------------------------
     Link to the global CSS file for the app's base styles.
   * ------------------------------------------------------- */
  css: ["~/assets/css/main.css"], // Import your global CSS file.

  /* 
   * -------------------------------------------------------
   * ### Development Tools & Component Discovery
   * -------------------------------------------------------
     Enables development tools for debugging and disables auto-component discovery for control.
   * ------------------------------------------------------- */
  devtools: { enabled: true }, // ? Enable Nuxt DevTools for debugging.
  components: false, // TODO: Set to `true` to enable automatic component discovery.

  /* 
   * -------------------------------------------------------
   * ### Runtime Configuration - API URL
   * -------------------------------------------------------
     Store the API base URL securely in the runtime config.
   * ------------------------------------------------------- */
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL, // TODO: Add the API base URL in the environment variables.
    },
  },

  /* 
   * -------------------------------------------------------
   * ### App SEO and Head Configuration
   * -------------------------------------------------------
     Set up metadata, title, and other head elements for SEO.
   * ------------------------------------------------------- */
  app: {
    head: {
      title: "Nuxt 3 - Starter Template", // Default title for the app.
      htmlAttrs: { lang: "en", dir: "ltr" }, // Set language and text direction.
      meta: [
        { charset: "utf-8" }, // Standard UTF-8 encoding.
        { name: "viewport", content: "width=device-width, initial-scale=1" }, // For responsiveness.
        { hid: "description", name: "description", content: "" }, // TODO: Add description for SEO.
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }], // Favicon link.
    },
  },

  /* 
   * -------------------------------------------------------
   * ### Modules & Extensions
   * -------------------------------------------------------
     Configure third-party modules for functionality like SEO, Google Analytics, i18n, etc.
   * ------------------------------------------------------- */
  modules: [
    "radix-vue/nuxt", // Radix UI for accessibility-first components.
    "nuxt-gtag", // Google Analytics for tracking.
    "@nuxtjs/tailwindcss", // TailwindCSS for utility-first styling.
    "nuxt-lodash", // Lodash for utility functions.
    "@nuxt/image", // Optimized image handling.
    "@vee-validate/nuxt", // VeeValidate for form validation.
    "@nuxtjs/seo", // SEO management.
    "@nuxtjs/i18n", // Internationalization (i18n) for multilingual support.
    "@nuxt/icon", // SVG icon support.
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore"],
      },
    ],
    "pinia-plugin-persistedstate/nuxt",
  ],

  /* 
   * -------------------------------------------------------
   * ### Google Analytics & i18n Configuration
   * -------------------------------------------------------
     Set up Google Analytics tracking and i18n for multiple languages.
   * ------------------------------------------------------- */
  gtag: { id: process.env.GTAG_ID }, // TODO: Add your Google Analytics ID.
  i18n: {
    langDir: "locales", // Locale files directory.
    lazy: true, // Enable lazy loading of locale files.
    defaultLocale: "en", // Default language (English).
    locales: [
      { code: "en", name: "English", language: "en-US", file: "en.json" },
      { code: "fa", name: "Persian", language: "fa-IR", file: "fa.json" },
    ],
    strategy: "prefix_except_default", // Use URL prefixes for non-default languages.
    detectBrowserLanguage: { useCookie: true, cookieKey: "i18n_redirected" },
    debug: false, // Disable debug in production.
  },

  /* 
   * -------------------------------------------------------
   * ### Route Rules & Compatibility Date
   * -------------------------------------------------------
     Manage caching, SWR, and prerendering rules for pages.
   * ------------------------------------------------------- */
  routeRules: {
    "/": { swr: false },
    "/blogs": { swr: false },
    "/about": { prerender: false },
  },
  compatibilityDate: "2024-04-03", // Set compatibility date for API responses.
});
