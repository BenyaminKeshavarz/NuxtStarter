// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  typescript: {
    strict: true,
    typeCheck: true,
  },

  css: ["~/assets/css/main.css"],

  devtools: { enabled: true }, // ? Enable Nuxt DevTools for debugging.

  vite: { plugins: [tailwindcss()] },

  /* 
   * -------------------------------------------------------
   * ### Nuxt 4 Compatibility & Global Settings
   * ------------------------------------------------------- 
     Configures compatibility with Nuxt 4 and sets up basic global settings.
   * ------------------------------------------------------- */
  future: { compatibilityVersion: 4 },
  compatibilityDate: "2025-06-20",

  /*
   * -------------------------------------------------------
   * ### Config Auto Imports
   * ------------------------------------------------------- */
  components: false,
  imports: {
    dirs: ["composables/**"], // This will import all composables from nested directories.
  },

  /* 
   * -------------------------------------------------------
   * ### Runtime Configuration - API URL
   * -------------------------------------------------------
     Store the API base URL securely in the runtime config.
   * ------------------------------------------------------- */
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || "https://api.example.com",
      // TODO: Add the API base URL in the environment variables.
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
      title: "Nuxt 3 - Starter Template",
      htmlAttrs: { lang: "en", dir: "ltr" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  /*
   * -------------------------------------------------------
   * ### Modules & Extensions
   * ------------------------------------------------------- */
  modules: [
    "@nuxt/ui",
    "nuxt-lodash",
    "@nuxt/image",
    "@vee-validate/nuxt",
    "@nuxtjs/seo",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "nuxt-swiper",
    "@nuxt/eslint",
  ],

  /*
   * -------------------------------------------------------
   * ### NuxtUI Configuration
   * ------------------------------------------------------- */
  ui: {
    fonts: false, // TODO: Enable NuxtFont later.
    theme: {
      colors: [
        'primary',
        'secondary',
        'tertiary',
        'accent',
        'info',
        'success',
        'warning',
        'error'
      ]
    }
  },
  icon: { customCollections: [{ prefix: "custom", dir: "~/assets/icons" }] },

  /*
   * -------------------------------------------------------
   * ### i18n Configuration
   * ------------------------------------------------------- */
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
    bundle: {
      optimizeTranslationDirective: false,
    },
  },

  /* 
   * -------------------------------------------------------
   * ### Route Rules & Hybrid Rendering
   * -------------------------------------------------------
     Manage caching, SWR, and prerendering rules for pages.
   * ------------------------------------------------------- */
  routeRules: {
    "/": { swr: false },
    "/blogs": { swr: false },
    "/about": { prerender: false },
  },
});
