# Visual Hierarchy & Design Tokens Reference

Use these baseline tokens and rules to establish unmistakable visual hierarchy across any web interface.

---

## 1. Perceptual Color & Surface Elevation Tokens (`oklch` + `light-dark()`)

Visual depth and hierarchy rely on controlled contrast steps between the background canvas, elevated containers, and foreground text levels.

```css
:root {
  color-scheme: light dark;

  /* 60% Dominant: Background & Surface Hierarchy */
  --surface-canvas: light-dark(oklch(0.985 0.004 260), oklch(0.145 0.012 260));
  --surface-1: light-dark(oklch(1 0 0), oklch(0.185 0.014 260));
  --surface-2: light-dark(oklch(0.96 0.006 260), oklch(0.225 0.016 260));
  --surface-3: light-dark(oklch(0.92 0.008 260), oklch(0.27 0.018 260));

  /* 30% Secondary: Text Hierarchy & Borders */
  --text-primary: light-dark(oklch(0.18 0.015 260), oklch(0.96 0.006 260));
  --text-secondary: light-dark(oklch(0.42 0.015 260), oklch(0.76 0.01 260));
  --text-muted: light-dark(oklch(0.55 0.012 260), oklch(0.62 0.01 260));

  --border-subtle: light-dark(oklch(0.9 0.008 260), oklch(0.26 0.015 260));
  --border-strong: light-dark(oklch(0.78 0.012 260), oklch(0.38 0.018 260));

  /* 10% Accent: Primary Brand & Semantic States */
  --accent-primary: light-dark(oklch(0.52 0.21 265), oklch(0.68 0.18 265));
  --accent-primary-hover: light-dark(oklch(0.46 0.21 265), oklch(0.74 0.17 265));
  --accent-on-primary: light-dark(oklch(0.99 0 0), oklch(0.14 0.02 265));

  --status-success: light-dark(oklch(0.52 0.16 150), oklch(0.72 0.15 150));
  --status-warning: light-dark(oklch(0.62 0.16 75), oklch(0.78 0.15 75));
  --status-danger: light-dark(oklch(0.55 0.21 25), oklch(0.7 0.19 25));
}
```

---

## 2. Fluid Typography & Contrast Scale

Never rely on font size alone to signal hierarchy. Pair **size**, **weight**, **letter-spacing**, and **color token** together:

```css
:root {
  --font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, monospace;

  /* Fluid Type Scale (Major Third / Augmented Fourth blend) */
  --text-xs: clamp(0.75rem, 0.72rem + 0.15vw, 0.8125rem);
  --text-sm: clamp(0.875rem, 0.84rem + 0.18vw, 0.9375rem);
  --text-base: clamp(1rem, 0.96rem + 0.2vw, 1.0625rem);
  --text-lg: clamp(1.125rem, 1.05rem + 0.35vw, 1.25rem);
  --text-xl: clamp(1.35rem, 1.2rem + 0.75vw, 1.65rem);
  --text-2xl: clamp(1.75rem, 1.45rem + 1.4vw, 2.35rem);
  --text-display: clamp(2.25rem, 1.75rem + 2.4vw, 3.5rem);
}

/* Typographic Roles */
.title-display {
  font-size: var(--text-display);
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: -0.025em;
  color: var(--text-primary);
  text-wrap: balance;
}

.heading-section {
  font-size: var(--text-xl);
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.015em;
  color: var(--text-primary);
  text-wrap: balance;
  /* Proximity Rule: more space above than below */
  margin-block-start: var(--space-8);
  margin-block-end: var(--space-3);
}

.body-prose {
  font-size: var(--text-base);
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-secondary);
  max-inline-size: 65ch;
  text-wrap: pretty;
}

.meta-label {
  font-size: var(--text-xs);
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.metric-value {
  font-size: var(--text-2xl);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}
```

---

## 3. Spatial Hierarchy & Gestalt Proximity Scale

Whitespace is the primary mechanism for grouping related items without adding visual clutter (excessive lines and borders).

```css
:root {
  --space-1: 0.25rem;  /* 4px  - Tight inline icon/label gap */
  --space-2: 0.5rem;   /* 8px  - Related controls or badge padding */
  --space-3: 0.75rem;  /* 12px - Form field label to input gap */
  --space-4: 1rem;     /* 16px - Standard component internal padding */
  --space-6: 1.5rem;   /* 24px - Card padding / sibling card grid gap */
  --space-8: 2rem;     /* 32px - Sub-section separation */
  --space-12: 3rem;    /* 48px - Major section separation */
  --space-16: 4rem;    /* 64px - Page-level macro block separation */

  --radius-sm: 0.375rem;
  --radius-md: 0.625rem;
  --radius-lg: 1rem;
}
```

### Nested Border Radius Formula
When nesting a rounded element inside a rounded container, prevent awkward corner pinching by calculating:
`--inner-radius: max(0px, var(--outer-radius) - var(--container-padding));`

---

## 4. Button & Action Hierarchy Pattern

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-block-size: 2.75rem; /* 44px ergonomic target */
  padding-inline: var(--space-4);
  border-radius: var(--radius-sm);
  font-size: var(--text-sm);
  font-weight: 600;
  cursor: pointer;
  transition: background-color 150ms ease, border-color 150ms ease, transform 100ms ease;
}

/* 1. Primary CTA: High visual weight (Limit 1 per primary section) */
.btn-primary {
  background-color: var(--accent-primary);
  color: var(--accent-on-primary);
  border: 1px solid transparent;
}
.btn-primary:hover {
  background-color: var(--accent-primary-hover);
}

/* 2. Secondary Action: Medium visual weight */
.btn-secondary {
  background-color: var(--surface-1);
  color: var(--text-primary);
  border: 1px solid var(--border-strong);
}
.btn-secondary:hover {
  background-color: var(--surface-2);
}

/* 3. Tertiary / Ghost Action: Low visual weight */
.btn-ghost {
  background-color: transparent;
  color: var(--text-secondary);
  border: 1px solid transparent;
}
.btn-ghost:hover {
  background-color: var(--surface-2);
  color: var(--text-primary);
}
```
