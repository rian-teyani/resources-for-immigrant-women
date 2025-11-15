import { defineConfig } from "vite";

export default defineConfig({
  server: {
    open: true,
    port: 3000,
    host: true,
  },
  build: {
    rollupOptions: {
      input: {
        index: "index.html",
        educational_modules: "educational_modules/index.html",
        "preventative-care": "educational_modules/preventative-care.html",
        "maternal-health": "educational_modules/maternal-health.html",
        nutrition: "educational_modules/nutrition.html",
      },
    },
  },
});
