---
name: "E-Ayo Baybay Healthcare"
description: "Warm, approachable, high-contrast mobile-first PWA design system for E-Ayo, connecting Baybay City, Leyte residents with local healthcare providers."
---

## Overview

E-Ayo is a centralized digital healthcare platform for residents of Baybay City, Leyte, Philippines. The visual language is warm, reassuring, and inclusive—designed for first-time smartphone users, seniors, and busy families alike. Soft cream and peach surfaces replace sterile clinical whites, while bold deep-brown typography and coral-accented interactive elements ensure effortless readability and clear visual hierarchy.

The design style blends **Tactile Modernism** with **Accessible Community Care**: generous rounded corners, crisp 1px soft-salmon borders, high-contrast text, and at least 48px touch targets on every interactive control.

## Colors

The palette is anchored in warm, comforting hues tailored to Baybay City's community spirit. Deep warm brown (`#3B2A26`) is used for all primary headings and body text to guarantee WCAG AA contrast (4.5:1 or better) against pastel surfaces. White or pastel text is never placed on pastel backgrounds.

- **Coral (`primary`):** Primary brand color, hero accents, active bottom navigation pill, and primary action buttons paired with deep warm brown text.
- **Peach Cream (`secondary` / `surface-container`):** Secondary surfaces, category chips, and highlighted summary cards.
- **Pink (`tertiary`):** Accents, facility badges, illustrations, and secondary CTAs.
- **Warm Cream (`surface`):** Primary app background and base card surfaces.
- **Soft Salmon (`outline`):** Dividers, card borders, inactive states, and subtle gradients.
- **Appointment Status Colors:** Reserved strictly for appointment status indicators (Pending = amber, Confirmed = green, Completed = soft blue-gray, Cancelled/Declined = muted red).

```yaml
colors:
  primary: "#FEA38E"
  on-primary: "#3B2A26"
  primary-deep: "#E8735A"
  on-primary-deep: "#3B2A26"
  secondary: "#FFDFC3"
  on-secondary: "#3B2A26"
  tertiary: "#FBA2AB"
  on-tertiary: "#3B2A26"
  surface: "#F5EBD0"
  on-surface: "#3B2A26"
  on-surface-variant: "#7A625B"
  surface-container-low: "#FAF3E0"
  surface-container: "#FFDFC3"
  surface-container-high: "#FFF9EE"
  outline: "#F3B5A0"
  outline-variant: "#E6C9B8"
  status-pending-bg: "#FEF3C7"
  status-pending-text: "#92400E"
  status-confirmed-bg: "#DCFCE7"
  status-confirmed-text: "#166534"
  status-completed-bg: "#E2E8F0"
  status-completed-text: "#334155"
  status-cancelled-bg: "#FEE2E2"
  status-cancelled-text: "#991B1B"
```

## Typography

**Poppins** is used for headings, navigation labels, and buttons, giving a friendly geometric structure. **Nunito** is used for body copy and form descriptions for its rounded, open letterforms and high legibility at 16px and above. **Source Code Pro** is used for appointment reference numbers and tabular codes.

Every body text level is at least `16px` (`body-md` = `16px`), and headings scale cleanly for both `390px` mobile screens and `1280px` desktop layouts.

```yaml
typography:
  display-lg:
    fontFamily: "Poppins"
    fontSize: 36px
    fontWeight: 700
    lineHeight: 44px
    letterSpacing: -0.5px
  display-lg-mobile:
    fontFamily: "Poppins"
    fontSize: 28px
    fontWeight: 700
    lineHeight: 36px
    letterSpacing: -0.25px
  headline-lg:
    fontFamily: "Poppins"
    fontSize: 32px
    fontWeight: 700
    lineHeight: 40px
    letterSpacing: -0.25px
  headline-md:
    fontFamily: "Poppins"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 32px
    letterSpacing: 0px
  headline-sm:
    fontFamily: "Poppins"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 28px
    letterSpacing: 0px
  title-md:
    fontFamily: "Poppins"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 26px
    letterSpacing: 0px
  body-lg:
    fontFamily: "Nunito"
    fontSize: 18px
    fontWeight: 500
    lineHeight: 28px
    letterSpacing: 0px
  body-md:
    fontFamily: "Nunito"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 24px
    letterSpacing: 0px
  label-lg:
    fontFamily: "Poppins"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 22px
    letterSpacing: 0px
  label-md:
    fontFamily: "Poppins"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 20px
    letterSpacing: 0.1px
  label-sm:
    fontFamily: "Poppins"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 16px
    letterSpacing: 0.2px
  mono-md:
    fontFamily: "Source Code Pro"
    fontSize: 15px
    fontWeight: 600
    lineHeight: 22px
    letterSpacing: 0.25px
```

## Layout & Spacing

The layout follows a **mobile-first fluid grid** (`390x844` baseline) that expands cleanly into a **centered max-width container** (`max-w-5xl`) with responsive multi-column grids on tablet and desktop viewports.

- **Touch Targets:** Every interactive button, tab, chip, and list row has a minimum height of `48px` (`min-h-[48px]`).
- **Spacing Scale:** Built on an `8px` base unit (`4px` half-step for tight icon-label pairs).
- **Navigation Shell:** Sticky top bar with E-Ayo logo, offline-friendly status pill, notification bell, and dismissible Install App banner. Sticky bottom navigation bar with 5 tabs (Home, Find a Clinic, Services, Appointments, Profile) where the active tab sits inside a coral (`primary`) pill.

```yaml
spacing:
  gutter-xs: 4px
  gutter-sm: 8px
  gutter-md: 16px
  gutter-lg: 24px
  gutter-xl: 32px
  section: 32px
  page-margin: 16px
```

## Elevation & Depth

Hierarchy is achieved through **tonal surface layering** and **crisp 1px soft-salmon borders (`outline`)** rather than heavy drop shadows. Elevated cards use `surface-container-high` (`#FFF9EE`) or `surface-container` (`#FFDFC3`) over the `surface` (`#F5EBD0`) canvas, paired with subtle warm-tinted elevation only on sticky navigation bars and primary CTAs.

## Shapes

Generous, friendly corner radii reinforce the approachable healthcare experience.

```yaml
rounded:
  sm: 8px
  DEFAULT: 12px
  md: 16px
  lg: 20px
  xl: 28px
  full: 9999px
```

## Motion & Micro-interaction

Transitions are gentle, predictable, and respectful of `prefers-reduced-motion`. Interactive controls respond within `150ms`, while step transitions and drawers decelerate smoothly over `250ms`.

```yaml
motion:
  state-change:
    duration: 150ms
    delay: 0ms
    timingFunction: ease-out
  surface-enter:
    duration: 250ms
    delay: 0ms
    timingFunction: cubic-bezier(0.2, 0, 0, 1)
  surface-exit:
    duration: 150ms
    delay: 0ms
    timingFunction: cubic-bezier(0.3, 0, 1, 1)
```

## Voice & Content Strategy

- **Tone of Voice:** Warm, clear, neighborly, and reassuring—written in plain English with a friendly Baybayanon touch. Avoid medical jargon when plain words work.
- **Capitalisation:** Sentence case for body copy, descriptions, and helper notes; Title Case for facility names, navigation tabs, and primary action buttons.
- **Action Labels:** Clear verb phrases (`Find a Clinic`, `Book Appointment`, `Go to My Appointments`, `Accept Appointment`).
- **Scheduling Clarity:** Always state clearly when an appointment is a *request* pending clinic confirmation ("Your requested schedule is not yet guaranteed").
- **Date & Number Formatting:** Full month names for dates (`November 25, 2026`), 12-hour time with AM/PM (`9:00 AM`), and `tabular-nums` for reference codes (`EAYO-2026-0001`), fees (`₱350`), and phone numbers.

## Components

Component implementations live as individual HTML sticker sheet files in
`components/`. Each file contains the canonical, styled HTML components with
`<!-- COMPONENT: name -->` comment markers. Read each file before use.

- **Badge** → `@components/badge.html`: `badge-numeric`, `badge-dot`
- **Button** → `@components/button.html`: `button-primary`, `button-icon`, `button-with-icon`
- **Card** → `@components/card.html`: `card-elevated`, `card-action`, `card-interactive`, `card-interactive-2`
- **Input Field** → `@components/input-field.html`: `input-field-text`, `input-field-icon`
- **Tabs** → `@components/tabs.html`: `tabs-horizontal`, `tabs-with-icon`
