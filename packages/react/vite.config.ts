import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ["src/**/*"],
      exclude: [
        "src/**/*.example.tsx",
        "src/**/*.test.tsx",
        "src/**/*.test.ts",
      ],
      outDir: "dist",
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        templates: resolve(__dirname, "src/templates/index.ts"),
        "templates/types": resolve(__dirname, "src/templates/types.ts"),
        "templates/registry": resolve(
          __dirname,
          "src/templates/registry/index.ts",
        ),
        "templates/renderers": resolve(
          __dirname,
          "src/templates/renderers/index.ts",
        ),
      },
      formats: ["es"],
      fileName: (format, entryName) => {
        if (entryName === "index") {
          return "src/index.js";
        }
        return `src/${entryName}.js`;
      },
    },
    rollupOptions: {
      external: ["react", "react-dom", "@spexop/theme"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@spexop/theme": "SpexopTheme",
        },
        assetFileNames: (assetInfo) => {
          // Rename CSS file to index.css
          if (assetInfo.name?.endsWith(".css")) {
            return "index.css";
          }
          // Handle sourcemaps
          if (assetInfo.name?.endsWith(".css.map")) {
            return "index.css.map";
          }
          return assetInfo.name || "assets/[name].[ext]";
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: false,
    minify: false,
  },
  css: {
    modules: {
      generateScopedName: "[name]__[local]___[hash:base64:5]",
      localsConvention: "camelCase",
    },
  },
});
