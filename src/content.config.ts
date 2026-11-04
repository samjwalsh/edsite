import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const services = defineCollection({
  loader: glob({ base: "./src/content/services", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(), // meta description + card summary
    order: z.number().default(100),
  }),
});

const areas = defineCollection({
  loader: glob({ base: "./src/content/areas", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(), // e.g. "Dublin"
    description: z.string(),
    order: z.number().default(100),
  }),
});

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { services, areas, blog };
