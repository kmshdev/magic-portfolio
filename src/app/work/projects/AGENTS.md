# PROJECT CASE STUDIES

## OVERVIEW

This directory contains MDX case-study content; frontmatter drives project cards,
static routes, metadata, and detail-page hero images.

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Project title/summary/card image | File frontmatter | Drives cards/detail pages |
| Case-study body | Markdown after frontmatter | Rendered through `CustomMDX` |
| Project cover assets | `public/images/projects/**` | Paths are absolute from `public` |
| Team avatar | `public/images/avatar.jpg` | Current schema expects `team[].avatar` |

## CONVENTIONS

- Required frontmatter: `title`, `publishedAt`, `summary`, `images`, `team`.
- `images` entries should be stable `/images/projects/...` paths.
- Keep project slugs tied to filenames; `getPosts` uses basename as route slug.
- Use headings and standard Markdown; the renderer maps them into Once UI components.
- Project cover images should explain the project/workflow, not show the portfolio owner.

## ANTI-PATTERNS

- Do not add JSX imports to MDX without checking the RSC MDX renderer first.
- Do not use remote project images unless `next.config.mjs` allows the host.
- Do not rename files without checking links, featured work, and generated routes.
- Do not leave missing/empty `team` or `images` fields; cards assume these structures.
