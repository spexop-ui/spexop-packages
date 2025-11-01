/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["../../tests/setup.ts"],
    include: ["**/*.{test,spec}.{js,ts,jsx,tsx}"],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/*.e2e.test.*",
    ],
    // Memory optimization settings - sequential execution
    pool: "forks",
    // @ts-expect-error - poolOptions is valid in Vitest 4.0 but types may not reflect it
    poolOptions: {
      forks: {
        singleFork: false,
        maxForks: 1,
        minForks: 1,
      },
    },
    maxConcurrency: 5,
    isolate: false,
    // Faster test execution with reduced overhead
    testTimeout: 10000,
    hookTimeout: 10000,
    // Disable file parallelization for large test suites to reduce memory
    fileParallelism: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "**/*.d.ts",
        "**/*.config.{js,ts}",
        "**/dist/**",
      ],
    },
  },
  resolve: {
    alias: {
      "@spexop/utils": resolve(__dirname, "../utils/src"),
      "@spexop/icons": "@spexop/icons",
      "@spexop/react": resolve(__dirname, "./src"),
    },
  },
});
