---
name: user-centered-ui-ux
description: >-
  Designs and implements user-centered UI/UX with clear, intentional visual hierarchy
  and modern web standards. Activate this skill whenever creating, redesigning,
  auditing, or styling web interfaces, components, pages, dashboards, or layouts
  to ensure strong visual hierarchy, ergonomic interaction flows, accessible HTML/CSS,
  and modern web best practices.
---

# User-Centered UI/UX & Visual Hierarchy Skill

Use this workflow whenever designing, building, or refactoring a web user interface. Every interface must prioritize **user task clarity**, **unmistakable visual hierarchy**, and **modern web platform features**.

---

## 1. User-Centered Design Workflow

Before writing markup or styles, anchor the interface around the user's mental model:

1. **Identify the Primary User Goal**:
   - Define the single most important action or insight on the screen (the **Primary Focal Point**).
   - Demote secondary and tertiary actions visually so they never compete with the primary action.
2. **Map the Reading & Scanning Pattern**:
   - **F-Pattern** for content/data-heavy views (dashboards, tables, documentation): anchor key labels and status indicators along the left edge and top summary bar.
   - **Z-Pattern** for landing pages, onboarding, and focused modals: place brand/context top-left, secondary utility top-right, core value proposition center, and primary CTA bottom-right.
3. **Progressive Disclosure**:
   - Show only what the user needs for the current step. Move advanced filters, rare settings, or verbose metadata into native `<details>`/`<summary>`, `[popover]`, or `<dialog>` elements.
4. **Continuous Feedback & System Status**:
   - Communicate every state explicitly: **Empty**, **Loading** (skeleton/optimistic UI), **Partial**, **Error** (with actionable recovery), and **Success**.

---

## 2. Enforcing Visible Visual Hierarchy

A user should understand the page structure within **3 seconds** (the squint test). Establish hierarchy using five deliberate levers:

### A. Typographic Scale & Contrast
- Use a strict, fluid modular scale (`clamp()`) with at most **4–5 distinct text roles** per view:
  - **Display / Page Title**: High weight (`600–700`), tight tracking (`-0.02em`), tight line-height (`1.15–1.25`).
  - **Section Heading (`h2`–`h3`)**: Medium-bold (`600`), clear top margin (`1.5x–2x` the bottom margin) to bind headings to the content below them (**Law of Proximity**).
  - **Body Copy**: Regular weight (`400`), comfortable reading measure (`60ch–75ch`), line-height `1.5–1.65`, `text-wrap: pretty`.
  - **Meta / Supporting Labels**: Smaller size (`0.8125rem–0.875rem`), muted foreground token (still meeting WCAG AA `4.5:1`), `font-variant-numeric: tabular-nums` for numbers/tables.
- Always apply `text-wrap: balance` to headings and short callouts.

### B. Color, Surface Elevation & Contrast Budget
- **60-30-10 Rule**:
  - **60%** Neutral background & primary surface tokens.
  - **30%** Elevated cards, borders, subtle secondary containers, and muted text.
  - **10%** High-contrast accent/brand color reserved strictly for primary CTAs, active states, and key highlights.
- **Action Hierarchy**:
  - **Primary Action** (1 per view/section): Solid high-contrast fill.
  - **Secondary Action**: Subtle surface fill or `1px` border with medium contrast text.
  - **Tertiary / Ghost Action**: Text-only with hover surface highlight.
  - **Destructive Action**: Semantic danger token; require confirmation for irreversible operations.
- Use perceptual color spaces (`oklch()`) and native dark/light adaptability (`color-scheme: light dark` + `light-dark()`).

### C. Spatial Grouping & Whitespace (Gestalt Proximity)
- **Inner vs. Outer Spacing Rule**: The padding *inside* a container must always be smaller than or balanced with the gap *between* separate thematic sections, and the gap *within* a related component group must be conspicuously smaller than the gap *between* groups.
- Use a consistent spacing scale (`4px` / `0.25rem` base unit: `4, 8, 12, 16, 24, 32, 48, 64px`).

---

## 3. Modern Web Platform Implementation Standards

Always favor native, standards-compliant HTML & CSS capabilities over fragile JavaScript workarounds:

- **Semantic Landmarks First**: Use `<header>`, `<nav>`, `<main>`, `<section aria-labelledby="...">`, `<article>`, `<aside>`, and `<footer>`. Use `<button>` for actions and `<a href="...">` for navigation.
- **Native Interactive Primitives**:
  - Modals & confirmations → `<dialog>` with `.showModal()` and `::backdrop`.
  - Tooltips, menus & non-modal overlays → Popover API (`popover`, `popovertarget`) paired with CSS Anchor Positioning.
  - Accordions & disclosures → `<details>` and `<summary>` (use `[name="..."]` for exclusive accordion groups).
- **Modern Responsive Layout**:
  - Page-level macro layout → CSS Grid (`grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr))`).
  - Component-level responsiveness → **CSS Container Queries** (`container-type: inline-size` + `@container`).
  - Logical properties (`padding-inline`, `margin-block`, `inset-inline-end`) for automatic internationalization support.
- **Ergonomic & Accessible Interactions**:
  - Minimum touch/pointer target size of **`44px × 44px`** (or `24px × 24px` minimum with sufficient spacing on desktop).
  - Visible keyboard focus rings using `:focus-visible` with `outline` and `outline-offset` (never `outline: none` without a high-contrast replacement).
  - Respect user motion and contrast preferences via `@media (prefers-reduced-motion: reduce)` and `@media (prefers-contrast: more)`.

---

## 4. Detailed References

Load these references when implementing specific tokens, components, or running a UI/UX verification pass:

- **[Visual Hierarchy & Design Tokens Reference](./references/visual-hierarchy-tokens.md)**: Starter CSS custom properties (`oklch` palette, fluid typography scale, spacing & elevation tokens, and proximity formulas).
- **[Modern Web UI Patterns & Audit Checklist](./references/modern-web-patterns-checklist.md)**: Copy-ready patterns for `<dialog>`, `[popover]`, accessible forms, state handling, and the 10-point UI/UX Squint & Accessibility Verification Checklist.

---

## 5. Mandatory Verification Step

Before completing any UI/UX task, verify the output against these checks:
1. **The 3-Second Squint Test**: If the screen is blurred, does the primary heading, primary CTA, and structural grouping remain immediately obvious?
2. **Action Singularity**: Is there only **one** visually dominant primary CTA per view or modal?
3. **Proximity & Nesting Check**: Are headings closer to the content they introduce than to the preceding section?
4. **Keyboard & Focus Audit**: Can every interactive control be reached with `Tab` and activated with `Enter`/`Space` with a clear `:focus-visible` indicator?
5. **Responsive & State Completeness**: Does the layout hold from `320px` to `1440px+` without horizontal overflow, and are empty/loading/error states accounted for?
