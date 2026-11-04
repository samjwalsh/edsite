# edsite

Marketing site for a loss assessor business. Static [Astro](https://astro.build) site, served by nginx in Docker, with self-hosted [Umami](https://umami.is) analytics.

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

## Deployment

Every push to `main` builds a Docker image in GitHub Actions and publishes it as `ghcr.io/samjwalsh/edsite:latest`. The server runs `docker-compose.yml`, which pulls that image, so the server never needs the source code.

Hosted on Unraid at home, reached from the internet via Nginx Proxy Manager on the VPS over a WireGuard tunnel (no ports opened on the home router).

```
visitor ─https─▶ VPS (NPM, TLS) ─WireGuard─▶ Unraid :8090 (site) / :8091 (Umami)
```

### Updating the site

1. Edit content, `git push`.
2. GitHub Actions builds and publishes a new image (~1 min).
3. The Unraid user script pulls it within 15 minutes. To update immediately, run the script manually from **Settings → User Scripts**.

Rollback: every image is also tagged `sha-<commit>`. Pin `image: ghcr.io/samjwalsh/edsite:sha-abc1234` in the compose file, or `git revert` and push.

### Unraid setup (one-time)

1. **Compose:** install the _Docker Compose Manager_ plugin. Add a stack named `edsite`, paste in `docker-compose.yml`, and create its `.env` from `.env.example` (set `UMAMI_DB_DIR=/mnt/user/appdata/edsite/umami-db`). Compose Up.
2. **Auto-update:** install the _User Scripts_ plugin, add a script on a custom schedule `*/15 * * * *`:
   ```sh
   #!/bin/bash
   cd /boot/config/plugins/compose.manager/projects/edsite
   docker compose pull site --quiet && docker compose up -d site && docker image prune -f
   ```
   Only `site` auto-updates. Update Umami/Postgres deliberately (`docker compose pull && docker compose up -d`) after checking release notes and taking a backup.
3. **Tunnel:** connect Unraid to the VPS with WireGuard. The VPS listens (`wireguard-tools`, UDP port open in the firewall); Unraid dials out (_Settings → VPN Manager_, peer type _Server to server access_, endpoint = VPS IP, persistent keepalive 25s so the tunnel survives home NAT). Nothing is opened on the home router.
4. **Reverse proxy (VPS NPM),** with Let's Encrypt SSL:
   - `example.com` → `http://<unraid-wg-ip>:8090`
   - `stats.example.com` → `http://<unraid-wg-ip>:8091`
5. **Umami:** log in at `stats.example.com` (default `admin` / `umami`, **change it immediately**), add the website, put its ID in `site.analytics.websiteId` in `src/site.config.ts` and push.

### Backups

The site is fully rebuildable from git. Only Umami's Postgres data holds state:

```sh
docker exec edsite-umami-db pg_dump -U umami umami | gzip > umami-$(date +%F).sql.gz
```
