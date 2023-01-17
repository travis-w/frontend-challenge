import { defineConfig } from "@hijacker/core";
import { FrontendPlugin } from "@hijacker/plugin-frontend";

export default defineConfig({
  port: 3001,
  baseRule: {
    baseUrl: "http://localhost:3002",
  },
  rules: [],
  plugins: [
    new FrontendPlugin({
      port: 3003,
    }),
  ],
});
