# Modern Web UI Patterns & Audit Checklist

Use these modern HTML/CSS patterns to build resilient, accessible, user-centered components without brittle JavaScript dependencies.

---

## 1. Native Progressive Disclosure Patterns

### A. Modal Dialogs (`<dialog>`)
Use `<dialog>` for critical interruptions or focused sub-tasks. Always place the primary action on the trailing edge and provide a clear Cancel/Close path.

```html
<dialog id="confirm-dialog" class="modal" aria-labelledby="dialog-title" aria-describedby="dialog-desc">
  <form method="dialog" class="modal-card">
    <header class="modal-header">
      <h2 id="dialog-title" class="heading-section">Archive Project?</h2>
    </header>
    <p id="dialog-desc" class="body-prose">
      Archived projects become read-only for all team members. You can restore this project at any time from Settings.
    </p>
    <footer class="modal-actions">
      <button type="submit" value="cancel" class="btn btn-ghost">Cancel</button>
      <button type="submit" value="confirm" class="btn btn-primary">Archive Project</button>
    </footer>
  </form>
</dialog>
```

### B. Non-Modal Overlays & Menus (`[popover]`)
Use the native Popover API for contextual menus, filters, and secondary details that shouldn't block the entire page.

```html
<button type="button" class="btn btn-secondary" popovertarget="filter-popover">
  Filter Results
</button>

<div id="filter-popover" popover class="popover-panel">
  <h3 class="meta-label">Status</h3>
  <!-- Filter controls -->
</div>
```

### C. Exclusive Accordions (`<details name="...">`)
Group related `<details>` elements with a shared `name` attribute so opening one automatically closes the others.

```html
<section aria-label="Frequently Asked Questions">
  <details name="faq-group" open>
    <summary>How is visual hierarchy measured?</summary>
    <p class="body-prose">By contrast in scale, weight, surface elevation, and spatial proximity.</p>
  </details>
  <details name="faq-group">
    <summary>Why prefer native HTML elements?</summary>
    <p class="body-prose">They provide built-in keyboard navigation, focus trapping, and screen reader announcements.</p>
  </details>
</section>
```

---

## 2. Container-Responsive Card & Layout Architecture

Components should adapt to their **parent container's available width**, not just the global viewport.

```css
.card-slot {
  container-type: inline-size;
  container-name: card;
}

.card {
  display: grid;
  gap: var(--space-4);
  padding: var(--space-6);
  background: var(--surface-1);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
}

@container card (min-width: 28rem) {
  .card {
    grid-template-columns: 1fr auto;
    align-items: center;
  }
}
```

---

## 3. User-Centered Form Ergonomics

1. **Always Visible Labels**: Never use `placeholder` as a replacement for `<label>`. Place labels directly above inputs (`margin-block-end: var(--space-2)`).
2. **Helpful Error Prevention & Recovery**:
   - Connect helper text and validation errors using `aria-describedby`.
   - Use `:user-invalid` instead of `:invalid` so error styling only appears *after* the user has interacted with the field.
   - Include proper `autocomplete`, `inputmode`, and `type` attributes for effortless mobile and password-manager completion.

```css
.input-field {
  inline-size: 100%;
  min-block-size: 2.75rem;
  padding-inline: var(--space-3);
  background: var(--surface-1);
  color: var(--text-primary);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-sm);
  font-size: var(--text-base); /* >= 16px prevents iOS auto-zoom */
}

.input-field:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}

.input-field:user-invalid {
  border-color: var(--status-danger);
}
```

---

## 4. Complete UI State Coverage Matrix

Every data-driven component or view must account for all 5 user states:

| State | Visual & UX Requirement |
| :--- | :--- |
| **1. Ideal (Populated)** | Clear hierarchy: primary metrics/content scannable in < 3 seconds. |
| **2. Empty (Zero-Data)** | Explain *why* it's empty and provide a direct **Primary CTA** to create/import the first item. |
| **3. Loading (Pending)** | Use layout-stable skeleton placeholders or `aria-busy="true"` to prevent Cumulative Layout Shift (CLS). |
| **4. Error (Failure)** | Explain what went wrong in plain human language (no raw stack traces) + offer an immediate **Retry** action. |
| **5. Partial / Overflow** | Gracefully handle long user names, 0 items vs. 10,000 items, and localized text expansion (`min-width: 0` inside flex/grid items). |

---

## 5. 10-Point Senior UI/UX Verification Checklist

Run through this checklist before finalizing any UI implementation:

- [ ] **1. Squint Test Passes**: Blurring your eyes still reveals a clear #1 focal point, #2 secondary group, and #3 background chrome.
- [ ] **2. Single Primary CTA**: Only one button uses the high-contrast `--accent-primary` fill per view/context.
- [ ] **3. Law of Proximity**: Section headings have at least `1.5x` more margin above them than below them; card internal padding is smaller than the gap between unrelated sections.
- [ ] **4. Measure & Line Height**: Body copy never exceeds `75ch` width; line height is `1.5–1.65` for body text and `1.1–1.25` for large headings.
- [ ] **5. WCAG Contrast**: Normal text meets `4.5:1` contrast; large text and active UI borders meet `3:1` in both light and dark modes.
- [ ] **6. Ergonomic Hit Targets**: Buttons, inputs, and links have at least `44px × 44px` interactive area on touch/mixed devices.
- [ ] **7. Keyboard & Focus Ring**: Every interactive element has a visible `:focus-visible` ring and logical `Tab` order matching visual order.
- [ ] **8. Native Semantics**: No `<div onclick>` where `<button>`, `<a href>`, `<dialog>`, `<details>`, or `[popover]` belongs.
- [ ] **9. Motion & Contrast Respect**: Animations wrap in `@media (prefers-reduced-motion: no-preference)` or simplify cleanly when `reduce` is active.
- [ ] **10. Zero Layout Shift**: Media elements define `aspect-ratio` or explicit `width`/`height`, and numeric columns use `font-variant-numeric: tabular-nums`.
