import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import configuration from "./src/configuration";

export default defineConfig({
  base: configuration.baseUrl,
  plugins: [solid()],
});
