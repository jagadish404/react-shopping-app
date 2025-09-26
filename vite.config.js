import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: ".",
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  define: {
    // Replace process.env variables if needed
    "process.env": process.env,
  },
  // Configure for assets in public folder
  publicDir: "public",
  // Configure CSS
  css: {
    modules: false,
  },
  // Test configuration
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    coverage: {
      enabled: true,
    },
  },
});
