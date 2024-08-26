import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    rules: {
      eqeqeq: "off",
      "no-unused-vars": "error",
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
      camelcase: "error",
    },
  },
];
