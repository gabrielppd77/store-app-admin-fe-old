import react from "@vitejs/plugin-react";

import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  resolve: {
    alias: {
      "@components": path.resolve("src/components"),
      "@pages": path.resolve("src/views/pages"),
      "@services": path.resolve("src/services"),
      "@hooks": path.resolve("src/hooks"),
      "@contexts": path.resolve("src/contexts"),
      "@providers": path.resolve("src/providers"),
      "@stores": path.resolve("src/stores"),
    },
  },
});
