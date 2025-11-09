import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5173",
        configure: (proxy, options) => {
          proxy.on("proxyReq", (proxyReq, req, res) => {
            if (req.url === "/api/careers") {
              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify([
                  { id: 1, title: "AI Engineer" },
                  { id: 2, title: "Cloud Architect" },
                  { id: 3, title: "Data Scientist" },
                ])
              );
            }
          });
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
  },
});
