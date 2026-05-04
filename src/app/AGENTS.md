# APP ROUTES

## OVERVIEW

`src/app` is the Next.js App Router surface: static pages, dynamic MDX pages, route
handlers, RSS, sitemap, robots, and OG image generation.

## STRUCTURE

```text
src/app/
├── page.tsx              # Home page
├── layout.tsx            # Root shell and metadata defaults
├── about/page.tsx        # About page from `src/resources/content.tsx`
├── blog/                 # Blog index and dynamic MDX post page
├── work/                 # Work index and dynamic project page
└── api/                  # Route handlers for auth, RSS, OG fetch/proxy/generate
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Home composition | `page.tsx` | Featured work, project ranges, blog preview |
| Root shell/background | `layout.tsx` | Theme init script and RouteGuard wrapper |
| Project detail pages | `work/[slug]/page.tsx` | Uses `getPosts`, `CustomMDX`, related projects |
| Blog detail pages | `blog/[slug]/page.tsx` | Same MDX pattern as work pages |
| Route auth | `api/check-auth`, `api/authenticate` | Cookie/password gate |
| OG image pipeline | `api/og/*` | Generate/fetch/proxy social images |

## CONVENTIONS

- Pages should use `Meta.generate` and `Schema` from Once UI for metadata/schema.
- Dynamic MDX pages must derive params from `getPosts(...)` and return `notFound()` for
  missing slugs.
- Route handlers use Web `Request`/`Response` APIs; keep secrets server-only.
- Use `baseURL`, `person`, `about`, `work`, `blog`, `routes` from `src/resources`.

## ANTI-PATTERNS

- Do not bypass `RouteGuard` route configuration by hardcoding navigation visibility.
- Do not duplicate MDX parsing in pages; reuse `getPosts`.
- Do not put client-only motion/browser APIs directly in server page components.
- Do not point metadata images to files outside `public/` or the OG API route.
