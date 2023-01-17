import { defineConfig } from "@hijacker/core";
import { FrontendPlugin } from "@hijacker/plugin-frontend";

export default defineConfig({
  port: 3001,
  baseRule: {
    baseUrl: "http://localhost:3002",
  },
  rules: [
    {
      disabled: true,
      name: "Get Colors",
      method: "GET",
      path: "/api/colors",
      skipApi: true,
      statusCode: 400,
    },
    {
      disabled: true,
      name: "Submit Data",
      method: "POST",
      path: "/api/submit",
      skipApi: true,
      statusCode: 400,
    },
  ],
  plugins: [
    new FrontendPlugin({
      port: 3003,
    }),
  ],
});
