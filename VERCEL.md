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

## Better Auth cookie names (GitHub OAuth)

Set on the **API** host (`NEXT_PUBLIC_BACKEND_URL`), not on `www.yegnapay.com`:

| Environment | Cookie name |
|-------------|-------------|
| HTTP / dev | `better-auth.session_token` |
| HTTPS prod | `__Secure-better-auth.session_token` |

On **yegnapay.com** the app uses **`access_token`** (JWT from `/auth/check` or session token from `?token=` after OAuth). The browser sends that cookie (and `Authorization`) to Vercel; the BFF forwards `Authorization: Bearer …` to Dokploy.

Optional debug: `BFF_AUTH_DEBUG=1` on Vercel logs which cookie/header was used in `/api/user/*` proxies.

## After changing env vars

Redeploy the Vercel project (env is baked at build/runtime per deployment).