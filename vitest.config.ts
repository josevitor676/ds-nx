import react from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [react()],
  esbuild: {
    tsconfigRaw: { compilerOptions: { jsx: "react-jsx" } },
  },
  test: {
    typecheck: {
      tsconfig: "./tsconfig.test.json",
    },
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    exclude: ["node_modules", "dist", "storybook-static"],
    coverage: {
      provider: "v8",
      include: ["src/components/**/*.{ts,tsx}"],
      exclude: ["src/**/*.stories.tsx", "src/**/*.variants.ts"],
    },
  },
})
