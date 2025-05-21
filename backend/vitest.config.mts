import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "json", "json-summary"],
      reportOnFailure: true,
    },
    exclude: ["**/*.helper.test.ts", "**/node_modules", "release"],
    globals: true,
    reporters: ["verbose"],
    root: "./",
    setupFiles: "./tests/vitest/setup.helper.test.ts",
    watch: true,
  },
});
