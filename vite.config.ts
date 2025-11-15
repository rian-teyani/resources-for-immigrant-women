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
        modules: "modules.html",
      },
    },
  },
});
