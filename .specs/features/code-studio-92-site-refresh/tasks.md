# Code Studio 92 Site Refresh Tasks

## Execution Protocol (MANDATORY -- do not skip)

Implement these tasks with the `tlc-spec-driven` skill: **activate it by name and follow its Execute flow and Critical Rules.** Do not search for skill files by filesystem path. The skill is the source of truth for the full flow (per-task cycle, sub-agent delegation, adequacy review, Verifier, discrimination sensor).

**If the skill cannot be activated, STOP and tell the user — do not proceed without it.**

---

**Design**: `.specs/features/code-studio-92-site-refresh/design.md`  
**Status**: In Progress

---

## Test Coverage Matrix

> Generated from codebase, project guidelines, and spec — confirm before Execute. Guidelines found: `AGENTS.md` (dev/docs only; no test policy), `.cursor/rules/core/unit-testing-best-practices.mdc` (general; no runner config). No test files, no `test` script in `package.json`. **Provisional default: automated tests = none; verification = `astro build` + manual AC checks in Done when.**

| Code Layer | Required Test Type | Coverage Expectation | Location Pattern | Run Command |
| ---------- | ------------------ | -------------------- | ---------------- | ----------- |
| CSS tokens / Layout / Astro UI components | none | Build succeeds; Done when asserts map 1:1 to SITE-* ACs (manual) | — | `npm run build` |
| Theme boot / ThemeToggle script | none | Manual: default dark, toggle, persist, invalid storage → dark | — | `npm run build` + manual |
| Static pages (index, privacy) | none | Build emits routes; manual IA / i18n / mailto / anchors | — | `npm run build` |
| Favicon / brand assets | none | Build gate + visual/hex check | — | `npm run build` |

## Gate Check Commands

> Generated from codebase — confirm before Execute.

| Gate Level | When to Use | Command |
| ---------- | ----------- | ------- |
| Quick | After each task (no unit suite) | `npm run build` |
| Full | Same as quick until a test runner exists | `npm run build` |
| Build | After each phase / final task | `npm run build` |

---

## Execution Plan

Phases are ordered and run sequentially — each phase completes before the next begins, and tasks within a phase execute in order.

### Phase 1: Foundation

```
T1 → T2 → T3 → T4
```

### Phase 2: Shared chrome & theme

```
T5 → T6 → T7
```

### Phase 3: Landing sections

```
T8 → T9 → T10 → T11 → T12
```

### Phase 4: Pages & polish

```
T13 → T14 → T15 → T16
```

---

## Task Breakdown

### T1: Replace global design tokens

**What**: Rewrite `global.css` semantic tokens to Code Studio 92 dark/light via `data-theme`; update `@theme inline` bridges; remove `prefers-color-scheme` as theme authority; set body type to 16px Inter; keep shadows none.
**Where**: `src/styles/global.css`
**Depends on**: None
**Reuses**: Existing `@theme inline` structure; values from `references/tokens.md`
**Requirement**: SITE-02, SITE-03, SITE-05, SITE-06, SITE-18

**Tools**:

- MCP: NONE
- Skill: `code-studio-92-design`

**Done when**:

- [x] `[data-theme="dark"]` / `:root` use `#1F1F22` background and `#F97316` accent
- [x] `[data-theme="light"]` use `#FDFDFD` background and matching paper neutrals
- [x] No Satoshi / `#ff6a00` / `#0d1117` remain as active brand tokens in this file
- [x] `--shadow-*` are none; body font-size 16px / Inter
- [x] Gate: `npm run build` passes

**Tests**: none  
**Gate**: build  
**Commit**: `feat(site): align global CSS tokens with Code Studio 92`  
**Status**: Complete (`584eef7`)

---

### T2: Update Layout fonts and theme boot

**What**: Load Plus Jakarta Sans + Inter + IBM Plex Mono + Phosphor Thin; add inline theme boot (`cs92-theme`, default dark); drop Satoshi Fontshare link.
**Where**: `src/layouts/Layout.astro`
**Depends on**: T1
**Reuses**: Existing Layout props; platform-mapping font links
**Requirement**: SITE-01, SITE-15, SITE-17

**Tools**:

- MCP: NONE
- Skill: `code-studio-92-design`, `astro`

**Done when**:

- [x] Head loads Plus Jakarta Sans, Inter, IBM Plex Mono (no Satoshi)
- [x] Phosphor Thin stylesheet linked
- [x] Inline boot sets `data-theme` from `localStorage.cs92-theme` or `dark` before paint; invalid → dark
- [x] Gate: `npm run build` passes

**Tests**: none  
**Gate**: build  
**Commit**: `feat(site): boot Code Studio 92 fonts and theme in Layout`  
**Status**: Complete (`565e60c`)

---

### T3: Create BrandLockup component

**What**: Astro component for stacked “Code Studio” + orange hairline + `92`.
**Where**: `src/components/BrandLockup.astro`
**Depends on**: T1
**Reuses**: Mockup `.brand-lockup` structure
**Requirement**: SITE-04

**Tools**:

- MCP: NONE
- Skill: `code-studio-92-design`

**Done when**:

- [x] Renders stacked wordmark + 1px accent hairline + `92`
- [x] Props: `href` (default `/`), optional `class`
- [x] No logo shadow/rotation/recolor of the mark
- [x] Gate: `npm run build` passes (component imported by a page in a later task is OK if build still succeeds; if unused, ensure file exists and is valid Astro — prefer temporary import only if build fails on unused; Astro allows unused files)

**Tests**: none  
**Gate**: build  
**Commit**: `feat(site): add BrandLockup component`  
**Status**: Complete (`c4037d1`)

---

### T4: Create ButtonLink component

**What**: Primary/secondary link button for CTAs and mailto.
**Where**: `src/components/ButtonLink.astro`
**Depends on**: T1
**Reuses**: Mockup `.btn-primary` / `.btn-secondary`
**Requirement**: SITE-10

**Tools**:

- MCP: NONE
- Skill: `code-studio-92-design`

**Done when**:

- [x] Props: `href`, `variant: 'primary' | 'secondary'`, slot label
- [x] Primary uses accent fill; secondary border-visible; radius-control; no shadow
- [x] Gate: `npm run build` passes

**Tests**: none  
**Gate**: build  
**Commit**: `feat(site): add ButtonLink component`  
**Status**: Complete (`64e878b`)

---

### T5: Create ThemeToggle component

**What**: Fixed Light/Dark control syncing `data-theme` + `localStorage.cs92-theme`.
**Where**: `src/components/ThemeToggle.astro`
**Depends on**: T2
**Reuses**: Mockup `.theme-bar` behavior; same storage key as Layout boot
**Requirement**: SITE-15, SITE-16, SITE-17, SITE-18

**Tools**:

- MCP: NONE
- Skill: `code-studio-92-design`

**Done when**:

- [x] Toggle switches theme without reload
- [x] Persists to `cs92-theme`; active state reflects current theme
- [x] Survives `localStorage` failure (session-only theme)
- [x] Transitions ≤280ms ease-out
- [x] Gate: `npm run build` passes

**Tests**: none  
**Gate**: build  
**Commit**: `feat(site): add ThemeToggle with persisted data-theme`  
**Status**: Complete (`9073f55`)

---

### T6: Create SiteHeader component

**What**: Sticky header with BrandLockup, in-page nav, primary mailto CTA.
**Where**: `src/components/SiteHeader.astro`
**Depends on**: T3, T4
**Reuses**: `BrandLockup`, `ButtonLink`; mockup `.lp-header`
**Requirement**: SITE-07, SITE-11, SITE-13

**Tools**:

- MCP: NONE
- Skill: `code-studio-92-design`

**Done when**:

- [x] Nav links: Serviços→`#servicos`, Método→`#metodo`, Projetos→`#projetos`, Studio→`#studio`
- [x] CTA “Iniciar conversa” → `mailto:codestudio92br@gmail.com`
- [x] Nav hidden ≤900px; header sticky with translucent bg + 1px border; no drop shadow
- [x] Gate: `npm run build` passes

**Tests**: none  
**Gate**: build  
**Commit**: `feat(site): add SiteHeader with in-page nav`  
**Status**: Complete (`4a876f7`)

---

### T7: Create SiteFooter component

**What**: Footer with lockup, studio links (real hashes only), mailto; omit social URLs.
**Where**: `src/components/SiteFooter.astro`
**Depends on**: T3
**Reuses**: `BrandLockup`; mockup `.lp-footer` copy (sans dead links)
**Requirement**: SITE-09, SITE-10

**Tools**:

- MCP: NONE
- Skill: `code-studio-92-design`

**Done when**:

- [x] Brand blurb + columns with only real in-page/`mailto` destinations
- [x] No LinkedIn/GitHub/Colofão placeholders
- [x] Gate: `npm run build` passes

**Tests**: none  
**Gate**: build  
**Commit**: `feat(site): add SiteFooter without dead social links`  
**Status**: Complete (`c29c2f1`)

---

### T8: Create LandingHero section

**What**: Hero with eyebrow, display headline, subcopy, CTA row, decorative forge (`aria-hidden`).
**Where**: `src/components/landing/LandingHero.astro`
**Depends on**: T4
**Reuses**: `ButtonLink`; mockup `.lp-hero` copy/geometry
**Requirement**: SITE-08, SITE-10, SITE-12, SITE-14

**Tools**:

- MCP: NONE
- Skill: `code-studio-92-design`

**Done when**:

- [x] First-viewport content matches mockup IA (no stats/chips/cards in hero)
- [x] Primary + secondary CTAs (mailto + `#metodo`)
- [x] Forge decoration `aria-hidden`; one orange CTA signal
- [x] ≥1 entrance motion with ease-out ≤280ms; respects `prefers-reduced-motion`
- [x] Gate: `npm run build` passes

**Tests**: none  
**Gate**: build  
**Commit**: `feat(site): add LandingHero section`  
**Status**: Complete (`51ec24d`)

---

### T9: Create LandingFeature section component

**What**: Reusable feature band (text + visual) with `id`, reverse support, Phosphor points.
**Where**: `src/components/landing/LandingFeature.astro`
**Depends on**: T2
**Reuses**: Mockup `.lp-feature` / `.reverse`
**Requirement**: SITE-09, SITE-11, SITE-12, SITE-13

**Tools**:

- MCP: NONE
- Skill: `code-studio-92-design`

**Done when**:

- [x] Props support `id`, index, label, title, body, points, reverse, optional link
- [x] Visual panel contained without drop shadows; ≤1 orange focal signal
- [x] Gate: `npm run build` passes

**Tests**: none  
**Gate**: build  
**Commit**: `feat(site): add LandingFeature section component`  
**Status**: Complete (`1bcc554`)

---

### T10: Create LandingQuote section

**What**: Quote band with studio attribution; `id="studio"`.
**Where**: `src/components/landing/LandingQuote.astro`
**Depends on**: T1
**Reuses**: Mockup `.lp-quote` copy
**Requirement**: SITE-09, SITE-11

**Tools**:

- MCP: NONE
- Skill: `code-studio-92-design`

**Done when**:

- [x] Renders quote + attrib; root/`section` has `id="studio"`
- [x] Gate: `npm run build` passes

**Tests**: none  
**Gate**: build  
**Commit**: `feat(site): add LandingQuote section`  
**Status**: Complete (`f36f5e2`)

---

### T11: Create LandingPricing section

**What**: Three engagement tiers (Sprint/Produto/Parceria) with mailto CTAs; `id="engajamentos"`.
**Where**: `src/components/landing/LandingPricing.astro`
**Depends on**: T4
**Reuses**: `ButtonLink`; mockup pricing copy
**Requirement**: SITE-09, SITE-10, SITE-12

**Tools**:

- MCP: NONE
- Skill: `code-studio-92-design`

**Done when**:

- [x] Three tiers with mockup copy; featured tier uses surface/border emphasis (not orange wash)
- [x] CTAs mailto; single primary orange button among featured tier
- [x] Gate: `npm run build` passes

**Tests**: none  
**Gate**: build  
**Commit**: `feat(site): add LandingPricing engagements section`  
**Status**: Complete (`f4da0e9`)

---

### T12: Create LandingCta section

**What**: Final CTA block with mailto + `#projetos` secondary.
**Where**: `src/components/landing/LandingCta.astro`
**Depends on**: T4
**Reuses**: `ButtonLink`; mockup `.lp-cta-block`
**Requirement**: SITE-09, SITE-10

**Tools**:

- MCP: NONE
- Skill: `code-studio-92-design`

**Done when**:

- [x] Headline/body/note from mockup; primary mailto; secondary `#projetos`
- [x] Gate: `npm run build` passes

**Tests**: none  
**Gate**: build  
**Commit**: `feat(site): add LandingCta final block`  
**Status**: Complete (`cdd30d6`)

---

### T13: Compose marketing home page

**What**: Replace minimal home with header + hero + 3 features + quote + pricing + CTA + footer + ThemeToggle; wire section ids.
**Where**: `src/pages/index.astro`
**Depends on**: T5, T6, T7, T8, T9, T10, T11, T12
**Reuses**: All Phase 2–3 components; mockup feature content for three instances
**Requirement**: SITE-07, SITE-08, SITE-09, SITE-11, SITE-13

**Tools**:

- MCP: NONE
- Skill: `code-studio-92-design`, `astro`

**Done when**:

- [x] IA order: header → hero → features (`#servicos`, `#metodo`, `#projetos`) → quote (`#studio`) → pricing (`#engajamentos`) → CTA → footer → theme toggle
- [x] Responsive ≤900px: single column, nav hidden, CTAs usable
- [x] ≥2 intentional motions on page load/interaction
- [x] Gate: `npm run build` passes

**Tests**: none  
**Gate**: build  
**Commit**: `feat(site): compose Code Studio 92 marketing landing`  
**Status**: Complete

---

### T14: Restyle privacy page chrome

**What**: Swap wordmark for BrandLockup; add ThemeToggle; keep legal copy + PT/EN script unchanged.
**Where**: `src/pages/marcador-de-truco/privacy/index.astro`
**Depends on**: T3, T5
**Reuses**: Existing i18n panels/script; new tokens via Layout
**Requirement**: SITE-19, SITE-20, SITE-21, SITE-22

**Tools**:

- MCP: NONE
- Skill: `code-studio-92-design`, `astro`

**Done when**:

- [x] Header uses `BrandLockup` linking `/`
- [x] PT/EN toggle still switches panels/strings
- [x] ThemeToggle present; shares `cs92-theme` with home
- [x] No legal copy edits
- [x] Gate: `npm run build` passes

**Tests**: none  
**Gate**: build  
**Commit**: `feat(site): align privacy page chrome with Code Studio 92`  
**Status**: Complete

---

### T15: Update favicon accent

**What**: Change favicon accent from `#FF6A00` to `#F97316`.
**Where**: `public/favicon.svg`
**Depends on**: None (ordered after pages for polish phase cohesion; no hard code dep)
**Reuses**: Existing SVG structure
**Requirement**: SITE-23

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] Favicon fill/text uses `#F97316` (not `#FF6A00`)
- [ ] Gate: `npm run build` passes

**Tests**: none  
**Gate**: build  
**Commit**: `feat(site): update favicon to Code Studio 92 accent`

---

### T16: Purge obsolete brand tokens and verify build

**What**: Grep-remove remaining Satoshi/`#ff6a00`/`#0d1117` brand usage under `src/` and brand assets; final build smoke.
**Where**: `src/**`, `public/favicon.svg` (verify only)
**Depends on**: T13, T14, T15
**Reuses**: N/A
**Requirement**: SITE-24

**Tools**:

- MCP: NONE
- Skill: `deslop`

**Done when**:

- [ ] `rg -i 'satoshi|#ff6a00|#0d1117' src public` shows no active brand token hits (allow comments/history none)
- [ ] `npm run build` passes
- [ ] Manual spot-check list recorded in task notes: home dark/light, mailto, anchors, privacy PT/EN

**Tests**: none  
**Gate**: build  
**Commit**: `chore(site): purge obsolete brand tokens`

---

## Phase Execution Map

```
Phase 1 → Phase 2 → Phase 3 → Phase 4

Phase 1:  T1 ──→ T2 ──→ T3 ──→ T4
Phase 2:  T5 ──→ T6 ──→ T7
Phase 3:  T8 ──→ T9 ──→ T10 ──→ T11 ──→ T12
Phase 4:  T13 ──→ T14 ──→ T15 ──→ T16
```

**Batch packing (Execute):** 16 tasks → ~3 workers if sub-agents accepted:

| Batch | Phases | Tasks |
| ----- | ------ | ----- |
| 1 | Phase 1 + Phase 2 | T1–T7 (7) |
| 2 | Phase 3 | T8–T12 (5) |
| 3 | Phase 4 | T13–T16 (4) |

---

## Task Granularity Check

| Task | Scope | Status |
| ---- | ----- | ------ |
| T1: global.css tokens | 1 file | ✅ Granular |
| T2: Layout fonts/boot | 1 file | ✅ Granular |
| T3: BrandLockup | 1 component | ✅ Granular |
| T4: ButtonLink | 1 component | ✅ Granular |
| T5: ThemeToggle | 1 component | ✅ Granular |
| T6: SiteHeader | 1 component | ✅ Granular |
| T7: SiteFooter | 1 component | ✅ Granular |
| T8: LandingHero | 1 component | ✅ Granular |
| T9: LandingFeature | 1 component | ✅ Granular |
| T10: LandingQuote | 1 component | ✅ Granular |
| T11: LandingPricing | 1 component | ✅ Granular |
| T12: LandingCta | 1 component | ✅ Granular |
| T13: index composition | 1 page | ✅ Granular |
| T14: privacy chrome | 1 page (chrome-only) | ✅ Granular |
| T15: favicon | 1 asset | ✅ Granular |
| T16: purge + verify | cohesive cleanup | ✅ Granular |

---

## Diagram-Definition Cross-Check

| Task | Depends On (task body) | Diagram Shows | Status |
| ---- | ---------------------- | ------------- | ------ |
| T1 | None | (start) | ✅ Match |
| T2 | T1 | T1 → T2 | ✅ Match |
| T3 | T1 | T1 → T3 (via T1→T2→T3 chain; T3 also after T2 in sequence) | ✅ Match* |
| T4 | T1 | T1→…→T4 sequential | ✅ Match* |
| T5 | T2 | Phase2 T5 after Phase1; body deps T2 | ✅ Match |
| T6 | T3, T4 | Sequential after T5; body lists T3,T4 | ✅ Match* |
| T7 | T3 | After T6 in phase order | ✅ Match* |
| T8 | T4 | Phase3 start | ✅ Match |
| T9 | T2 | After T8 sequential | ✅ Match* |
| T10 | T1 | After T9 | ✅ Match* |
| T11 | T4 | After T10 | ✅ Match* |
| T12 | T4 | After T11 | ✅ Match* |
| T13 | T5–T12 | Phase4 after Phase3 | ✅ Match |
| T14 | T3, T5 | After T13 | ✅ Match* |
| T15 | None (phase-ordered) | After T14 | ✅ Match* |
| T16 | T13, T14, T15 | T15 → T16 | ✅ Match |

\*Phase diagram is strictly sequential within phase; soft deps that are earlier in prior phases are satisfied before the phase starts. No task depends on a later-phase task.

---

## Test Co-location Validation

| Task | Code Layer Created/Modified | Matrix Requires | Task Says | Status |
| ---- | --------------------------- | --------------- | --------- | ------ |
| T1–T16 | CSS / Layout / Astro UI / assets | none | none | ✅ OK |

---

## Requirement Traceability (tasks)

| Requirement ID | Task(s) | Status |
| -------------- | ------- | ------ |
| SITE-01 | T2 | In Tasks |
| SITE-02 | T1 | In Tasks |
| SITE-03 | T1 | In Tasks |
| SITE-04 | T3 | In Tasks |
| SITE-05 | T1 | In Tasks |
| SITE-06 | T1 | In Tasks |
| SITE-07 | T6, T13 | In Tasks |
| SITE-08 | T8, T13 | In Tasks |
| SITE-09 | T7, T9–T12, T13 | In Tasks |
| SITE-10 | T4, T6–T8, T11–T12 | In Tasks |
| SITE-11 | T6, T9–T10, T13 | In Tasks |
| SITE-12 | T8, T9, T11 | In Tasks |
| SITE-13 | T6, T9, T13 | In Tasks |
| SITE-14 | T8 | In Tasks |
| SITE-15 | T2, T5 | In Tasks |
| SITE-16 | T5 | In Tasks |
| SITE-17 | T2, T5 | In Tasks |
| SITE-18 | T1, T5 | In Tasks |
| SITE-19 | T14 | In Tasks |
| SITE-20 | T14 | In Tasks |
| SITE-21 | T14 | In Tasks |
| SITE-22 | T14 | In Tasks |
| SITE-23 | T15 | In Tasks |
| SITE-24 | T16 | In Tasks |

**Coverage:** 24 total, 24 mapped to tasks, 0 unmapped
