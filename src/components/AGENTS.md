# COMPONENTS

## OVERVIEW

Shared Once UI components for shell, MDX rendering, project cards, GitAura widgets,
blog listings, theme switching, and route/password gating.

## STRUCTURE

```text
src/components/
├── ProjectCard.tsx          # Work card carousel and GitAura preview switch
├── mdx.tsx                  # MDX element-to-Once-UI mapping
├── RouteGuard.tsx           # Client route enablement and password UI
├── Header.tsx / Footer.tsx  # Site shell
├── blog/                    # Blog list/post/share components
├── work/                    # Project list component
└── about/                   # About page table of contents
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| GitAura dashboard animation | `gitaura/` | Framer Motion, Once UI effects, reduced-motion support |
| Project listing order/filter | `work/Projects.tsx` | Sorts MDX posts by `publishedAt` |
| Markdown rendering | `mdx.tsx` | Custom link, media, heading, code, list mapping |
| Password/route gating | `RouteGuard.tsx` | Client-side checks against resources route config |
| Theme toggle | `ThemeToggle.tsx` | Data-attribute theme switching |

## CONVENTIONS

- Prefer Once UI components over raw `div`/`span` when building app UI.
- Keep client-only hooks inside `"use client"` files.
- Use module SCSS only for component-specific styling gaps.
- Framer Motion wrappers should preserve Once UI props and use transform/opacity only.
- Respect `useReducedMotion` for motion beyond trivial opacity changes.

## ANTI-PATTERNS

- Do not introduce hardcoded colors/spacing in reusable portfolio components.
- Do not add plain `<img>`; use Once UI `Media` or the existing carousel/image surface.
- Do not make MDX renderer changes that silently alter all existing posts/projects.
- Do not add route strings here when they belong in `src/resources/once-ui.config.ts`.
