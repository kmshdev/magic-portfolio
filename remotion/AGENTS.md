# REMOTION WALKTHROUGHS

## OVERVIEW

Brownfield Remotion source for project walkthrough, workflow, and architecture videos.
It consumes portfolio assets/data but is not part of the live Next.js runtime.

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Composition registration | `Root.tsx` | One `Composition` per `projectVisuals` entry |
| Entry point | `index.ts` | Calls `registerRoot(PortfolioWalkthroughRoot)` |
| Scene/timing implementation | `ProjectWalkthrough.tsx` | Intro, workflow, architecture sequences |
| Storyboard data | `src/resources/projectVisuals.ts` | Titles, cover paths, workflow, outcomes |
| Render outputs | `public/videos/project-walkthroughs/` | Commit only on request |

## CONVENTIONS

- Drive animation from `useCurrentFrame()` and `useVideoConfig().fps`.
- Use `Sequence`, `AbsoluteFill`, `interpolate`, and `Easing`; no CSS animations.
- Reference `public/` assets with `staticFile(...)`.
- Keep composition IDs stable: `Project-${slug}`.
- Use 1920x1080, 30fps, 12-second default unless the whole set changes together.

## COMMANDS

```bash
npm run remotion:studio
npm run remotion:render -- Project-genie-code-generation public/videos/genie.mp4
npm run remotion:still -- Project-genie-code-generation public/videos/genie.png
npx remotion versions
npx remotion bundle remotion/index.ts --out-dir /private/tmp/magic-portfolio-remotion-bundle
```

## ANTI-PATTERNS

- Do not import Remotion components into `src/app` or `src/components`.
- Do not use CSS transitions/keyframes; they are not reliable for Remotion renders.
- Do not use raw `/images/...` URLs in Remotion; use `staticFile`.
- Do not claim still/render verification if Chromium fails to launch.
- Do not commit bulky rendered videos unless explicitly requested.

## NOTES

- On this macOS sandbox, browser-backed Remotion still/render has failed with
  `bootstrap_check_in ... Permission denied`. Bundle and version checks can validate code,
  but they are not visual render proof.
