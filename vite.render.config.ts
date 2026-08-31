import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// A separate static target reuses the existing page without changing Sites hosting.
const siteUrl = process.env.SITE_URL || process.env.RENDER_EXTERNAL_URL;

export default defineConfig({
  root: fileURLToPath(new URL("./render", import.meta.url)),
  publicDir: fileURLToPath(new URL("./public", import.meta.url)),
  plugins: [
    react(),
    {
      name: "rota-cnh-social-url",
      transformIndexHtml() {
        if (!siteUrl) return [];
        const origin = new URL(siteUrl);
        return [
          { tag: "link", attrs: { rel: "canonical", href: origin.href } },
          { tag: "meta", attrs: { property: "og:url", content: origin.href } },
          { tag: "meta", attrs: { property: "og:image", content: new URL("/og-rota-cnh.png", origin).href } },
          { tag: "meta", attrs: { name: "twitter:image", content: new URL("/og-rota-cnh.png", origin).href } },
        ];
      },
    },
  ],
  build: {
    outDir: fileURLToPath(new URL("./render-dist", import.meta.url)),
    emptyOutDir: true,
  },
});
