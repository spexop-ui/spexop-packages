import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  target: "es2020",
  // Note: Shebang is already in src/index.ts, don't duplicate it
  splitting: false,
  treeshake: true,
});
