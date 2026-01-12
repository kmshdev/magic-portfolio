# Magic Portfolio

LLM/ML engineer portfolio built on Once UI Magic Portfolio template.
Next.js 16 App Router + MDX content. Production site at keshav-mishra.dev.

## Critical Files

| File | Purpose |
|------|---------|
| `src/resources/content.tsx` | All content - personal info, work, skills, education |
| `src/resources/once-ui.config.ts` | Theme config - colors, fonts, effects (single source of truth) |
| `src/types/content.types.ts` | TypeScript interfaces for content |
| `src/app/work/projects/*.mdx` | Project case studies |
| `src/app/blog/posts/*.mdx` | Blog posts |
| `src/components/Providers.tsx` | ThemeProvider setup |
| `src/components/ThemeToggle.tsx` | Theme switcher component |

## Once UI Rules

**Use Once UI components** - Never raw HTML with custom CSS:
- Layout: `<Flex>`, `<Column>`, `<Row>`, `<Grid>`
- Typography: `<Text>`, `<Heading>`
- Interactive: `<Button>`, `<Link>`, `<IconButton>`

**Use data attributes for overrides** (not inline styles):
- `data-theme="dark|light"` - Theme override
- `data-brand="cyan"` - Brand color
- `data-border="rounded|playful|conservative"`

**Use design tokens** - Never hardcode colors/spacing:
- Colors: `brand`, `accent`, `neutral-weak`, `neutral-strong`
- Spacing via props: `gap="16"`, `padding="24"`
- Text colors: use `onBackground` prop

## Development

```bash
npm run dev          # Dev server :3000
npm run build        # Production build (must pass before PR)
npm run format       # Format code with Biome
npm run lint         # Lint check with Biome
npm run type-check   # TypeScript type checking
npm run check:all    # Type-check + lint + format
```

**Tooling**: Biome (formatter + linter), Lefthook (git hooks), lint-staged (pre-commit)
- Pre-commit: Auto-formats staged files via Biome
- Pre-push: Runs type-check before push
- CI: GitHub Actions validates build + lint + format + types on PRs

**Biome config** (`biome.json`):
- Line width: 100, 2-space indent, double quotes
- Rules: `noExplicitAny` (warn), `noDoubleEquals` (error), accessibility warnings
- Formats: JS/TS/JSX/TSX, JSON, MDX, Markdown

## Deployment

Vercel (standard Next.js, no custom config). Auto-deploys from main.

**Environment variables** (optional):
- `PASSWORD` - Enable route protection
- `GA_MEASUREMENT_ID` - Google Analytics

## PR Checklist

- [ ] Once UI components used (no raw div/span with custom CSS)
- [ ] Dark mode works (primary theme)
- [ ] No hardcoded colors/spacing
- [ ] TypeScript strict - no `any` types
- [ ] MDX frontmatter complete (title, publishedAt, summary, images, team)
- [ ] `npm run build` passes
- [ ] Pre-commit hooks pass (format + lint via Biome)
- [ ] Type-check passes (`npm run type-check`)
- [ ] Keyboard navigation works

## Gotchas

- TypeScript strict mode - all types must be precise
- MDX frontmatter required: `title`, `publishedAt`, `summary`, `images`, `team`
- Image paths are case-sensitive
- Theme colors set in `once-ui.config.ts`, not component props
