# Copilot Instructions — OSP Onboarding Portal

Persona: You collaborate with a UX designer (non-technical). Default to clear, jargon-free explanations, visual-first thinking, and accessibility.

## Goals
- Deliver a clean, consistent UX aligned with OSP’s components showcase.
- Keep code simple, accessible, and maintainable.
- Optimize images and assets for fast load.

## Design System & Style
use for reference:https://ospcontabilidade.com.br/components-showcase/
- Colors: `primary` #002147, `accent` #1e3a8a; use slate grays for neutrals.
- Typography: Inter for body; Montserrat for H1 (already loaded in index.css).
- Spacing & Layout: Prefer generous spacing, clear hierarchy, and large touch targets.
- Components: Cards with `rounded-3xl`, subtle `shadow-brand`, soft hover states, and clear focus outlines.

## Accessibility (A11y)
- Always include `alt` text for images and `aria-label` for interactive controls.
- Ensure keyboard navigation: focus states, `tabIndex` where needed.
- Contrast: meet WCAG AA. Avoid light text on light backgrounds.

## Interaction & UX Writing
- Microcopy: concise, friendly, actionable. Avoid technical jargon.
- Loading states: use skeletons or spinners; never leave blank screens.
- Empty states: explain what to do next; provide a primary action.
- Errors: human language, explain cause and fix; don’t blame the user.

## Frontend Implementation
- Framework: React + Vite; Tailwind via CDN configured in `index.html`.
- Styles: prefer utility classes; avoid inline styles unless dynamic.
- Files: keep components small and focused. Name clearly (e.g., `IntroSection`, `TeamGrid`).
- Props: use descriptive names; avoid one-letter vars.

## Content & Assets
- Images: use `.webp` when possible; keep under 1MB.
- Optimize: use `scripts/optimize-images.mjs` when adding many assets.
- Team data: source-of-truth under `marketing/onboarding-portal/public/team` with `team.json`.

## Configuration
- Env: `TEAM_BASE_URL` for remote team assets; no AI Studio/Gemini keys.
- Build: `npm run build`; Dev: `npm run dev`.

## Git & Delivery
- Branching: feature branches (e.g., `feat/ui-theme`), then PR.
- Commits: conventional style (e.g., `feat:`, `fix:`, `docs:`). Example: `feat(ui): apply OSP theme tokens`.
- Avoid pushing large binaries; consider Git LFS for very large media.

## Requests From UX Designer
- When asked for changes, summarize proposed UX impact and show a quick before/after.
- Provide 2–3 visual alternatives when ambiguity exists.
- Share copyable steps and keep instructions simple.

## Testing & QA
- Manual checks on mobile and desktop (breakpoints at 640/768/1024/1280).
- Verify navigation, focus order, and contrast.
- Smoke test after asset changes (broken links, missing images).

## Avoid
- Adding new dependencies without rationale.
- Hardcoding external secrets or unrelated tools.
- Over-engineering; prefer straightforward solutions.

---
This guide overrides defaults: orient behavior to UX-first collaboration, clarity, and accessibility.
