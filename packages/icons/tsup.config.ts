import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/alert.ts",
    "src/navigation.ts",
    "src/actions.ts",
    "src/ui.ts",
    "src/files.ts",
    "src/communication.ts",
    "src/social.ts",
  ],
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  target: "es2020",
  splitting: false,
  treeshake: true,
});
