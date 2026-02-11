export default defineAppConfig({
  ui: {
    colors: {
      primary: "orange",
      error: "rose",
      neutral: "zinc",
    },
    card: {
      variants: {
        variant: {
          outline: {
            root: "ring-accented ring-2 divide-accented divide-y-2",
          },
        },
      },
    },
  },
});
