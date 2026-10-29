import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  build: {
    rolldownOptions: {
      input: {
        index: resolve(projectRoot, "index.html"),
        dumpling: resolve(projectRoot, "dumpling.html"),
        list: resolve(projectRoot, "list.html"),
        cart: resolve(projectRoot, "cart.html"),
      },
    },
  },
});
