import * as utils from "~/utils/index"; // Adjust the path as needed

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("utils", utils); // Make them available globally via $utils
});
