/**
 * Package.json generation utilities
 */

import type {
  PackageJsonDependencies,
  ScaffoldOptions,
} from "../commands/types.js";

export function generatePackageJson(options: ScaffoldOptions) {
  const { projectName, router } = options;

  const pkg = {
    name: projectName,
    private: true,
    version: "0.0.0",
    type: "module",
    scripts: {
      dev: "vite",
      build: "tsc -b && vite build",
      preview: "vite preview",
    },
    dependencies: {
      react: "^18.3.1",
      "react-dom": "^18.3.1",
      "@spexop/react": "^0.6.0",
      "@spexop/theme": "^0.6.0",
    } as Record<string, string>,
    devDependencies: {
      "@types/react": "^18.3.0",
      "@types/react-dom": "^18.3.0",
      "@vitejs/plugin-react": "^5.0.0",
      typescript: "^5.3.0",
      vite: "^5.0.0",
    },
  };

  // Add react-router-dom if needed
  if (router === "react-router") {
    pkg.dependencies["react-router-dom"] = "^6.26.0";
  }

  return pkg;
}

export function getDependencies(
  options: ScaffoldOptions,
): PackageJsonDependencies {
  const { router } = options;

  const dependencies: Record<string, string> = {
    react: "^18.3.1",
    "react-dom": "^18.3.1",
    "@spexop/react": "^0.6.0",
    "@spexop/theme": "^0.6.0",
  };

  const devDependencies: Record<string, string> = {
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^5.0.0",
    typescript: "^5.3.0",
    vite: "^5.0.0",
  };

  if (router === "react-router") {
    dependencies["react-router-dom"] = "^6.26.0";
  }

  return { dependencies, devDependencies };
}
