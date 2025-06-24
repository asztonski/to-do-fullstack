// vite.config.ts  (in monorepo root)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  // ① Make Vite serve everything from ./client
  root: path.resolve(__dirname, "client"),

  plugins: [
    react(),

    // ② Load the Tailwind config that sits one level higher
    tailwindcss({
      // Tailwind v4 plugin field = `config` (not `configFile`)
      config: path.resolve(__dirname, "tailwind.config.ts"),
    }),
  ],

  // (optional) put the production build back in /dist at repo-root
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
});
