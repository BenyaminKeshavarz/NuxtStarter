// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  /* ### TypeScript Configuration */
  typescript: {
    strict: true,
    typeCheck: true,
  },

  /* ### CSS Configuration */
  css: ["~/assets/css/main.css"],

  /* ### Devtools Configuration */
  devtools: { enabled: false },

  /* ### Vite Configuration */
  vite: {
    plugins: [tailwindcss()],
    build: {
      sourcemap: false, // Disable sourcemaps to avoid Tailwind CSS v4 warnings
    },
    optimizeDeps: {
      include: ["@unhead/schema-org/vue", "maska/vue"],
    },
  },

  /* ### Auto Imports Configuration */
  components: false,
  imports: {
    dirs: ["composables/**"],
  },

  /* ### Runtime Configuration */
  runtimeConfig: {
    serverApiBaseUrl: "",

    public: {
      clientApiBaseUrl: "",
      assetsBaseUrl: "",
      apiVersion: "",
      dashboardUrl: "",
    },
  },

  /* ### App SEO and Head Configuration */
  app: {
    head: {
      title: "Nuxt Starter Template", // TODO: Change title.
      htmlAttrs: { lang: "fa-IR", dir: "rtl" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "" }, // TODO: Change description for SEO.
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },

  /* ### Modules & Extensions */
  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    "@nuxtjs/seo",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "@nuxt/eslint",
  ],

  /* ### UI Configuration */
  ui: {
    fonts: true,
  },
  colorMode: {
    preference: "dark",
  },
  icon: {
    customCollections: [{ prefix: "custom", dir: "./app/assets/icons" }],
  },

  /* ###  Google Analytics */
  // gtag: { id: process.env.GTAG_ID },

  /* ### i18n Configuration */
  i18n: {
    langDir: "locales",
    defaultLocale: "fa",
    defaultDirection: "rtl",
    locales: [
      {
        code: "fa",
        name: "Persian",
        localName: "فارسی",
        language: "fa-IR",
        file: "fa.json",
        dir: "rtl",
        currency: {
          code: "IRR",
          symbol: "تومان",
          position: "after",
        },
      },
      {
        code: "en",
        name: "English",
        localName: "English",
        language: "en-US",
        file: "en.json",
        dir: "ltr",
        currency: {
          code: "USD",
          symbol: "$",
          position: "before",
        },
      },
    ],
    strategy: "prefix_except_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
      alwaysRedirect: false,
      fallbackLocale: "fa",
    },
    debug: false,
  },

  /* ### Route Rules Configuration */
  routeRules: {
    "/": { prerender: true },
  },

  /* ### OG Image (@nuxtjs/seo) — static prerender only; no runtime /_og endpoint */
  ogImage: {
    zeroRuntime: true,
  },

  /* ### Compatibility Date */
  compatibilityDate: "2025-03-18",
});
