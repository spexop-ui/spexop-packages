import { defineConfig } from "tsup";
import cssModulesPlugin from "esbuild-css-modules-plugin";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/templates/index.ts",
    "src/templates/types.ts",
    "src/templates/registry/index.ts",
    "src/templates/renderers/index.ts",
  ],
  format: ["esm"],
  dts: true,
  clean: true,
  external: ["react", "react-dom", "@spexop/theme"],
  sourcemap: true,
  esbuildPlugins: [
    cssModulesPlugin({
      generateScopedName: "[name]__[local]___[hash:base64:5]",
      localsConvention: "camelCase",
    })
  ],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";', // For Next.js App Router compatibility
    };
  },
});
