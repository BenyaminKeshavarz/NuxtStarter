import type { App } from "vue";
import { numeric } from "~/directives/numeric.client";
import { vMaska } from "maska/vue";

export default defineNuxtPlugin((nuxt: { vueApp: App }) => {
  nuxt.vueApp.directive("numeric", numeric);
  nuxt.vueApp.directive("maska", vMaska);
});
