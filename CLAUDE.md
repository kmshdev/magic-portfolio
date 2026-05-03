# Magic Portfolio

LLM/ML engineer portfolio built on Once UI Magic Portfolio template.
Next.js 16 App Router + MDX content. Production site at kmsh.dev.

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
| `biome.json` | Biome config - formatter/linter rules |
| `lefthook.yml` | Git hooks - pre-commit/pre-push automation |
| `.lintstagedrc.json` | Lint-staged config - formats staged files |
| `.github/workflows/ci.yml` | GitHub Actions CI - validates PRs |

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
npm run format       # Format code with Biome (write mode)
npm run format:check # Format check (read-only)
npm run lint         # Biome CI check; warnings fail
npm run lint:fix     # Lint + auto-fix with Biome
npm run type-check   # TypeScript type checking
npm run check        # Lint + format + fix
npm run check:all    # Type-check + lint + format + fix
npm run ci           # Full CI check (type-check + lint + build)
```

**Tooling**: Biome 2.x (formatter + linter), Lefthook (git hooks), lint-staged (pre-commit)

**Git hooks** (via Lefthook):
- Pre-commit: Auto-formats staged files via Biome (parallel execution)
- Pre-push: Runs `npm run type-check` to catch TypeScript errors
- Skip hooks: `LEFTHOOK=0 git commit` or `git commit --no-verify`

**CI workflow** (`.github/workflows/ci.yml`):
- Triggers: PRs and pushes to `main`/`develop` branches
- Steps: type-check → lint (format + lint, warnings fail) → build
- Cloudflare deploy: pushes to `develop` build and deploy the Worker with Wrangler
- Caching: Next.js build cache, node_modules via npm cache
- Timeout: 10 minutes, concurrent runs cancelled on same branch
- Bundle size report in GitHub Actions summary

**Biome config** (`biome.json`):
- Format: Line width 100, 2-space indent, double quotes, trailing commas
- Lint rules:
  - Suspicious: `noExplicitAny` (warn), `noDoubleEquals` (error), `noArrayIndexKey` (warn)
  - Style: `noUnusedTemplateLiteral` (error)
  - Performance: `noImgElement` (warn)
  - Security: `noDangerouslySetInnerHtml` (warn)
  - A11y: `useAltText` (warn)
- Targets: JS/TS/JSX/TSX, JSON, MDX, Markdown
- VCS integration: Respects .gitignore, excludes .next/out/node_modules/.vercel/.turbo
- CI mode: `npm run lint` uses `biome ci --error-on-warnings`

## Deployment

Cloudflare Workers via OpenNext. Workers Builds should use `npm ci` as the build command
and `npm run cf:deploy` as the production deploy command. `wrangler.jsonc` also defines
`build.command` so PR preview uploads run `npm run cf:build` before Wrangler reads
`.open-next/worker.js`. GitHub Actions deploys pushes to `develop` with
`cloudflare/wrangler-action`.

**Environment variables** (optional):
- `PAGE_ACCESS_PASSWORD` - Enable route protection
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
- Biome auto-fixes on commit - staged files are formatted automatically
- Pre-push hook runs type-check - fix TypeScript errors before pushing
- CI requires `npm run build` to pass - test locally before PR
- Skip hooks with `LEFTHOOK=0` for emergency commits (not recommended)
