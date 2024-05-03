import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // here set the proxy serve which not come the cros error
  server: {
    proxy: {
      "/api": "http://202.131.231.212:93",
    },
  },
});
