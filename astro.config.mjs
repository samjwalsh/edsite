// @ts-check
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import { site } from "./src/site.config.ts";

export default defineConfig({
  site: site.url,
  trailingSlash: "never",
  build: { format: "directory" },
  integrations: [mdx(), sitemap()],
  vite: { plugins: [tailwindcss()] },
  // Fonts are downloaded at build time and served from our own domain (no Google CDN).
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Inter",
      cssVariable: "--font-inter",
      weights: ["400 700"],
      fallbacks: ["sans-serif"],
    },
  ],
});
