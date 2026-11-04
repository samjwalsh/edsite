# edsite

Marketing site for a loss assessor business. Static [Astro](https://astro.build) site, served by nginx in Docker behind Nginx Proxy Manager, with self-hosted [Umami](https://umami.is) analytics.

## Editing content

| What                                                                   | Where                                               |
| ---------------------------------------------------------------------- | --------------------------------------------------- |
| Business name, phone, email, address, hours, credentials, analytics ID | `src/site.config.ts`                                |
| Service pages (`/services/*`)                                          | `src/content/services/*.md`                         |
| Area pages (`/areas/*`)                                                | `src/content/areas/*.md`                            |
| Blog posts (`/blog/*`)                                                 | `src/content/blog/*.md` (set `draft: true` to hide) |
| About page                                                             | `src/pages/about.md`                                |
| Brand colours                                                          | `src/styles/global.css` (`@theme`)                  |

The file name becomes the URL slug, e.g. `src/content/services/fire.md` → `/services/fire`. Frontmatter is validated by `src/content.config.ts`, so a typo fails the build instead of breaking the page. Quote frontmatter strings that contain a `:`.

## Development

```sh
pnpm install
pnpm dev       # http://localhost:4321
pnpm build     # type-check + build to dist/
pnpm preview   # serve dist/
```

## Deployment (VPS)

One-time setup:

1. Point DNS A records for `example.com` and `stats.example.com` at the VPS.
2. On the VPS:
   ```sh
   git clone https://github.com/samjwalsh/edsite.git ~/edsite && cd ~/edsite
   cp .env.example .env   # fill in secrets (openssl rand -hex 32) and NPM_NETWORK
   docker compose up -d --build
   ```
   `NPM_NETWORK` must be the Docker network Nginx Proxy Manager is on (`docker network ls`).
3. In Nginx Proxy Manager, add proxy hosts with Let's Encrypt SSL:
   - `example.com` → `http://edsite:8080`
   - `stats.example.com` → `http://edsite-umami:3000`
4. Log in to Umami (default `admin` / `umami`, **change it immediately**), add the website, and put its ID in `site.analytics.websiteId` in `src/site.config.ts`.
5. Set `site.url` in `src/site.config.ts` to the real domain (used for canonical URLs, sitemap and structured data).

Deploying changes:

```sh
DEPLOY_HOST=user@vps ./deploy.sh
```

This pushes, then on the VPS pulls and rebuilds only the `site` container.

### Backups

The site is fully rebuildable from git. Only Umami's Postgres volume holds state:

```sh
docker exec edsite-umami-db pg_dump -U umami umami | gzip > umami-$(date +%F).sql.gz
```
