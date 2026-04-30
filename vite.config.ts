import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import { defineConfig, type Plugin } from "vite";
import dts from "vite-plugin-dts";

const buildLibCss = (): Plugin => ({
  name: "build-lib-css",
  apply: "build",
  async closeBundle() {
    const css = readFileSync("src/index.css", "utf-8");
    const result = await postcss([tailwindcss, autoprefixer]).process(css, {
      from: "src/index.css",
      to: "dist/index.css",
    });
    mkdirSync("dist", { recursive: true });
    writeFileSync("dist/index.css", result.css);
  },
});

export default defineConfig({
  plugins: [
    react(),
    ...(process.env.STORYBOOK
      ? []
      : [
          buildLibCss(),
          dts({
            include: ["src"],
            exclude: ["src/**/*.stories.tsx", "src/docs/**"],
            rollupTypes: true,
            tsconfigPath: "./tsconfig.json",
          }),
        ]),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "DesignSystem",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "mjs" : "cjs"}`,
      cssFileName: "index",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "@tabler/icons-react"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
