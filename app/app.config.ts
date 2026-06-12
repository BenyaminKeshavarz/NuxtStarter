export default defineAppConfig({
  ui: {
    colors: {
      primary: "green",
      neutral: "slate",
    },

    // TODO: Add UI configuration here.
    navigationMenu: {
      slots: {
        list: 'rtl:dir-rtl',
      }
    }
  },
});
