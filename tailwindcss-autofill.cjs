/**
 * Reference: https://phuctm97.com/blog/write-my-first-tailwindcss-plugin
 * Github: https://github.com/phuctm97/tailwindcss-autofill/blob/master/index.js
 */
const plugin = require("tailwindcss/plugin");

const autofill = plugin(({ addVariant, e }) => {
  addVariant("autofill", ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      const newClass = e(`autofill${separator}${className}`);
      return [
        `.${newClass}:-webkit-autofill`,
        `.${newClass}:-webkit-autofill:hover`,
        `.${newClass}:-webkit-autofill:focus`,
      ].join(",");
    });
  });
});

module.exports = autofill;
