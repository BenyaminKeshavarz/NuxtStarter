import { numeric } from "~/directives/numeric.client";
import { vMaska } from "maska/vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("numeric", numeric);
  nuxtApp.vueApp.directive("maska", vMaska);
});
