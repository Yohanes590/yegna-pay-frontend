# Vercel (frontend) environment

The dashboard at `www.yegnapay.com` proxies API calls through Next.js routes (`/api/user/*`) to the Express backend.

## Required (Production)

| Variable | Example | Notes |
|----------|---------|--------|
| `NEXT_PUBLIC_BACKEND_URL` | `https://apiyegna.yonas.cloud` | Public API; used by browser **and** Vercel serverless BFF |
| `NEXT_PUBLIC_APP_URL` | `https://www.yegnapay.com` | Optional; links in UI |

## Do **not** set on Vercel

| Variable | Why |
|----------|-----|
| `BACKEND_INTERNAL_URL` | Docker-only (`http://backend:4000`). On Vercel it breaks BFF → API calls. |

## Not required on Vercel

JWT signing runs on the **backend** (Dokploy), not on Next.js. You do **not** need `JWT_SECRET` / `SECRETE_KEY` on Vercel for `/api/user/info`.

## After changing env vars

Redeploy the Vercel project (env is baked at build/runtime per deployment).