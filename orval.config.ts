import { defineConfig } from "orval";

export default defineConfig({
  todos: {
    input: "./schema/openapi.yaml",
    output: {
      baseUrl: "/api",
      target: "./src/drivers/gen/",
      clean: true,
      client: "axios-functions",
      prettier: true,
    },
  },
});
