import path from "path";
import { defineConfig, configDefaults } from "vitest/config";

export default defineConfig({
  test: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: "v8",
      include: ["src/**/*"],
      exclude: [
        "src/drivers/gen/**/*",
        "src/presentations/components/ui/**/*",
        "src/vite-env.d.ts",
        "src/main.tsx",
        "src/mock.ts",
      ],
      reportOnFailure: true,
      clean: true,
      all: true,
    },
    include: ["src/**/*.test.ts?(x)"],
    exclude: [
      ...configDefaults.exclude,
      "src/drivers/gen/**/*",
      "src/vite-env.d.ts",
      "src/main.tsx",
      "src/mock.tsx",
    ],
    clearMocks: true,
  },
});
