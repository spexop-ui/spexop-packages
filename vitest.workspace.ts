// Vitest workspace configuration for @spexop/react and @spexop/theme
// In Vitest 4.0+, workspace files export an array directly (no defineWorkspace needed)
export default [
  // Use the existing config in react package
  "packages/react/vitest.config.ts",
  // Inline config for theme package (uses defaults if no config file exists)
  {
    test: {
      root: "packages/theme",
      include: ["src/**/*.{test,spec}.ts"],
    },
  },
];
