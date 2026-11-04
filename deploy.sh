#!/usr/bin/env bash
# Pull latest main on the VPS and rebuild the site container.
# Usage: DEPLOY_HOST=user@vps ./deploy.sh   (or set DEPLOY_HOST/DEPLOY_PATH in your shell profile)
set -euo pipefail

DEPLOY_HOST="${DEPLOY_HOST:?Set DEPLOY_HOST, e.g. sam@my-vps}"
DEPLOY_PATH="${DEPLOY_PATH:-~/edsite}"

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Working tree is dirty; commit first." >&2
  exit 1
fi
git push

ssh "$DEPLOY_HOST" "cd $DEPLOY_PATH && git pull --ff-only && docker compose up -d --build site && docker image prune -f"
