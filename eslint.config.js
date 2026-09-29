import eslintPluginAstro from "eslint-plugin-astro";

export default [
  {
    ignores: ["**/cdk/**", "**/cdk.out/**"],
  },
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      // Override or add rules here.
    },
    settings: {
      "import/core-modules": ["astro:content", "astro:transitions"],
      "import/parsers": {
        "astro-eslint-parser": [".astro"],
        espree: [".js", ".mjs", ".cjs"],
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
    },
  },
];