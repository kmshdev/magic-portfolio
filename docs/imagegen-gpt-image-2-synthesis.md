# GPT Image 2 Asset Prompt Synthesis

## Problem Found

The rejected asset set failed because the prompts optimized for visual consistency instead of
semantic payload. "Dark Once UI-style abstract technical cover" plus "no readable text" creates
generic dashboard art: it removes the project-specific evidence that would tell a viewer what the
asset represents.

## Source Synthesis

- OpenAI Image docs: use the Image API/CLI path for one prompt per image, and set explicit size,
  quality, format, and compression for production assets. `gpt-image-2` supports flexible sizes
  within its constraints and does not support transparent backgrounds.
- OpenAI GPT Image prompting guide search result: `gpt-image-2` is positioned for production
  design workflows, strong structured visuals, text rendering, style control, and complex diagrams.
- Local `imagegen` prompting examples: select the right taxonomy, name the artifact type, specify
  scene, subject, composition, palette, exact text, and constraints. Examples are complete recipes,
  not permission to invent generic decoration.
- Local `imagegen` CLI docs: use `gpt-image-2` by default, `quality=high` for final assets and
  dense/text-bearing diagrams, and generate small pilot batches before replacing project assets.
- `ai-prompt-gen` analysis: the bad generic prompt scored `1/4`; it lacked explicit requirements,
  background/context, and actionable constraints.

## New Rules For This Repo

1. Use text when semantic information matters.
   Do not ban readable text on project covers. Use short exact labels, 3 to 6 max.

2. One cover gets one communication job.
   Example: Text2SQL should communicate "Ask -> SQL -> Validate -> Plot", not every subsystem.

3. Prompt from real project content.
   Use `projectVisuals` and MDX summaries as the semantic source, not generic "LLM platform" terms.

4. Limit visual primitives.
   Allowed: flow modules, one data surface, one domain-specific anchor, labels, thin connectors.
   Avoid: many panels, fake labels, fake dashboards, neon glow, meaningless icons.

5. Generate a pilot first.
   Pilot set: favicon, home OG, one LLM project cover, one industrial project cover, one blog cover.
   Review those five before replacing the whole public image set.

6. Keep the avatar photographic.
   Do not generate a synthetic portrait for `person.avatar`.

## Better Prompt Pattern

```text
Use case: <productivity-visual|infographic-diagram|logo-brand>
Asset type: <exact site asset and final crop>
Primary request: <what the viewer must understand in one sentence>
Source semantics: <project title, summary, workflow labels, outcomes>
Scene/backdrop: <visual environment, not vibe-only>
Subject: <actual workflow or object>
Style/medium: <shippable editorial UI / clean diagram / logo mark>
Composition/framing: <number of modules, hierarchy, crop behavior>
Text (verbatim): "<short exact labels only>"
Color palette: <repo tokens: dark slate, cyan brand, violet accent, neutral text>
Constraints: <semantic success and hard visual limits>
Avoid: <specific failure modes>
```

## Pilot CLI

Requires `OPENAI_API_KEY` to be set locally.

```bash
export CODEX_HOME="${CODEX_HOME:-$HOME/.codex}"
export IMAGE_GEN="$CODEX_HOME/skills/.system/imagegen/scripts/image_gen.py"

python3 "$IMAGE_GEN" generate-batch \
  --model gpt-image-2 \
  --quality high \
  --output-format png \
  --input docs/imagegen-gpt-image-2-pilot.jsonl \
  --out-dir output/imagegen/gpt-image-2-pilot \
  --concurrency 2
```

## Acceptance Criteria

- The image communicates the project without reading surrounding page copy.
- Any rendered text is exact, short, and legible at card size.
- There are no fake brands, fake project names, or lorem-UI labels.
- The image uses the repo's dark slate/cyan/violet direction without becoming neon.
- The image has one focal hierarchy and survives 16:9 or square card cropping.
- If a cover cannot pass those checks in two iterations, use deterministic SVG/HTML or real
  product screenshots instead of more generated art.

