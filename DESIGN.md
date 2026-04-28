---
colors:
  brand:
    primary: "#5B5BD6"
    primaryDark: "#4A4AC4"
    secondary: "#7C3AED"
    gradient: "linear-gradient(135deg, #5B5BD6 0%, #7C3AED 100%)"
    gradientHover: "linear-gradient(135deg, #4A4AC4 0%, #6B2FD9 100%)"
  neutral:
    50: "#F8F9FF"
    100: "#F0F1FA"
    200: "#E2E3F0"
    300: "#C5C6D8"
    400: "#9899B0"
    500: "#6B6C84"
    600: "#4A4B60"
    700: "#32333F"
    800: "#1E1F28"
    900: "#12131A"
  whatsapp:
    green: "#25D366"
    greenDark: "#128C7E"
  semantic:
    success: "#22C55E"
    warning: "#F59E0B"
    error: "#EF4444"
    info: "#3B82F6"

  # Light mode surfaces
  light:
    background: "#FFFFFF"
    surface: "#F8F9FF"
    surfaceElevated: "#FFFFFF"
    border: "#E2E3F0"
    borderSubtle: "#F0F1FA"
    text:
      primary: "#12131A"
      secondary: "#4A4B60"
      muted: "#9899B0"
      inverse: "#FFFFFF"

  # Dark mode surfaces
  dark:
    background: "#0D0E14"
    surface: "#12131A"
    surfaceElevated: "#1E1F28"
    border: "#2A2B38"
    borderSubtle: "#1E1F28"
    text:
      primary: "#F0F1FA"
      secondary: "#9899B0"
      muted: "#6B6C84"
      inverse: "#12131A"

typography:
  fontFamily:
    sans: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif"
    mono: "'JetBrains Mono', 'Fira Code', monospace"
  scale:
    xs: { fontSize: "0.75rem", lineHeight: "1rem" }
    sm: { fontSize: "0.875rem", lineHeight: "1.25rem" }
    base: { fontSize: "1rem", lineHeight: "1.5rem" }
    lg: { fontSize: "1.125rem", lineHeight: "1.75rem" }
    xl: { fontSize: "1.25rem", lineHeight: "1.75rem" }
    "2xl": { fontSize: "1.5rem", lineHeight: "2rem" }
    "3xl": { fontSize: "1.875rem", lineHeight: "2.25rem" }
    "4xl": { fontSize: "2.25rem", lineHeight: "2.5rem" }
    "5xl": { fontSize: "3rem", lineHeight: "1.1" }
    "6xl": { fontSize: "3.75rem", lineHeight: "1.05" }
    "7xl": { fontSize: "4.5rem", lineHeight: "1" }
  weight:
    regular: 400
    medium: 500
    semibold: 600
    bold: 700
    extrabold: 800

spacing:
  section: "5rem"    # 80px vertical padding per section
  container: "1280px"
  gutter: "1.5rem"

radius:
  sm: "0.5rem"
  md: "0.75rem"
  lg: "1rem"
  xl: "1.5rem"
  "2xl": "2rem"
  full: "9999px"

shadows:
  sm: "0 1px 2px 0 rgba(91, 91, 214, 0.05)"
  md: "0 4px 6px -1px rgba(91, 91, 214, 0.08), 0 2px 4px -1px rgba(91, 91, 214, 0.04)"
  lg: "0 10px 15px -3px rgba(91, 91, 214, 0.10), 0 4px 6px -2px rgba(91, 91, 214, 0.05)"
  xl: "0 20px 25px -5px rgba(91, 91, 214, 0.12), 0 10px 10px -5px rgba(91, 91, 214, 0.04)"
  glow: "0 0 40px rgba(91, 91, 214, 0.25)"
  glowStrong: "0 0 60px rgba(124, 58, 237, 0.35)"

animation:
  fast: "150ms ease"
  base: "250ms ease"
  slow: "400ms ease"
  spring: "500ms cubic-bezier(0.34, 1.56, 0.64, 1)"
---

# DESIGN.md — CitasBot Landing Page

## Overview

CitasBot is a **B2B SaaS** product targeting small and medium businesses in LATAM that rely on appointment-based workflows. The landing page must communicate **trustworthiness, modernity, and ease of adoption** to non-technical business owners (clinic owners, barbershop managers, spa operators).

The visual language should feel premium without being cold — warm enough for a service business but polished enough for a SaaS product.

## Brand Identity

The logo pairs a **blue-to-purple gradient robot icon** (inside a WhatsApp-style speech bubble) with the wordmark "CitasBot" in dark charcoal. This sets the dual identity: **WhatsApp-native** (familiar, approachable) + **software product** (reliable, smart).

**Do:** Use the gradient aggressively on CTAs, hero headlines, and key decorative elements.
**Don't:** Overuse green (WhatsApp green) — reserve it only for explicit WhatsApp references to avoid confusion with the primary brand.

## Colors

The primary blue `#5B5BD6` (indigo-violet) conveys reliability and technology. Paired with `#7C3AED` (deep violet), the gradient creates a distinctive identity that stands apart from typical green-focused WhatsApp tools.

**Light mode:** White backgrounds, very light lavender surfaces, dark text. Clean and spacious.
**Dark mode:** Deep near-black (#0D0E14) background, NOT pure black. Elevated surfaces use `#1E1F28`. Text in warm off-white. The gradient glows more intensely in dark mode.

## Typography

Plus Jakarta Sans is the primary typeface — it has friendly curves at body size but excellent authority at display sizes. Headlines use `extrabold` (800) for maximum impact. Body copy uses `regular` (400) at 1rem/1.5 line-height for readability.

Hero headline maximum: 7xl (4.5rem) on desktop, 4xl (2.25rem) on mobile.

## Spacing & Layout

12-column grid, 1280px max container. Sections breathe with 80px (5rem) vertical padding. Cards use 1.5rem padding minimum. No cramped UIs.

## Component Patterns

**Buttons:**
- Primary: gradient background, white text, `radius.full`, subtle hover scale (1.02), glow shadow on hover
- Secondary: transparent with gradient border, gradient text
- Ghost: no border, gradient text only

**Cards:**
- Light: white background, `border: 1px solid colors.light.border`, `shadow.md`
- Dark: `colors.dark.surfaceElevated` background, subtle border, no harsh shadows
- Feature cards: gradient top border (3px) or gradient icon container

**Badges/Chips:**
- Small pill shapes, `radius.full`
- Use gradient background at 10% opacity + gradient text for labels like "Nuevo", "Popular"

**Section pattern:**
- Odd sections: default background
- Even sections: `surface` background tint (very subtle)
- Every section has an optional decorative gradient blob (blurred, low opacity) for depth

## Dark Mode

Toggle via `data-theme="dark"` on `<html>`. Use CSS custom properties (no runtime JS theme flicker). The gradient brand identity looks *better* in dark mode — lean into it. Background blobs are more vibrant at 15% opacity in dark mode.

## Motion

Sections animate in on scroll (IntersectionObserver, no library needed). Cards stagger 50ms apart. Hero elements cascade top-to-bottom on load. No jarring transitions — everything eases gracefully.
