# RESOURCES

## OVERVIEW

Central data/config layer for portfolio content, routes, theme tokens, social links,
icons, and Remotion project visual metadata.

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Personal and page content | `content.tsx` | Person, home, about, work, blog, gallery |
| Theme/routes/schema/social sharing | `once-ui.config.ts` | Single source for Once UI config |
| Shared exports | `index.ts` | Public import surface for resources |
| Icon registry | `icons.ts` | Used by Once UI icon props |
| Walkthrough project data | `projectVisuals.ts` | Shared by Remotion compositions |
| Type contracts | `src/types/*.ts` | Update types before widening config shape |

## CONVENTIONS

- Keep content edits data-like; avoid page layout logic here.
- Route visibility belongs in `routes`; password protection belongs in `protectedRoutes`.
- Theme values should use supported Once UI options and data-attribute names.
- `projectVisuals` must stay JSON-serializable enough for Remotion `defaultProps`.
- Public image paths should begin with `/images/...`; Remotion strips the leading slash
  before calling `staticFile`.

## ANTI-PATTERNS

- Do not duplicate project copy between MDX and `projectVisuals` unless the video needs
  shorter storyboard text.
- Do not import React components from app/components into `projectVisuals`.
- Do not change `baseURL` casually; it drives metadata and schema.
- Do not add new config keys without updating `src/types`.
