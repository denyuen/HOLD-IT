# DODGE!

One-thumb hold-to-survive neon ball dodge game (PROTOZ).

Hold your finger to live. Lift or get hit and it’s Game Over. New balls spawn from the **top and left/right sides only** — never the bottom edge. Local best, share card, 3-2-1 countdown, neon UI. World Top 10 is **Coming soon** (no live score post).

Capacitor-capable Vite + TypeScript web host. Same tree can be wrapped later for iOS.

## Play

```bash
npm install
npm run dev
```

## Build

```bash
npm install
npm run build
```

Output: `dist/` (Cloudflare Pages).

## Cloudflare Pages

| Setting | Value |
| --- | --- |
| Project name | `dodge` (or `dodge-game`) |
| Production branch | `main` |
| Framework preset | Vite |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | 18+ (22 recommended) |

Permanent URL pattern: `https://dodge.pages.dev` (or `https://dodge-game.pages.dev` if that name is taken).

Direct upload:

```bash
npx wrangler pages project create dodge --production-branch main
npx wrangler pages deploy dist --project-name dodge --branch main
```

Git connect: Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git → `denyuen/HOLD-IT` → production branch `main`.

## Native (optional)

This repo is a web host. After `npm run build`, Capacitor can wrap `dist/`:

```bash
npx cap add ios
npx cap sync
```
