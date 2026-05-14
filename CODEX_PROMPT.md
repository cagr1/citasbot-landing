# Codex Prompt — CitasBot Landing Page

## Context

Build a professional, minimal landing page for **CitasBot** — a B2B SaaS for appointment management via WhatsApp, targeting small/medium businesses in LATAM (clinics, barbershops, spas, dental offices, beauty salons).

The project lives at: `E:\Carlos\Development Tools\Proyectos\citabot-landig`
The source app (for logos only) is at: `E:\Carlos\Development Tools\Proyectos\Agenda\citasbot-whatsapp\public\`

---

## Design Philosophy

**This must NOT look like an AI-generated page.** No floating gradient blobs, no glassmorphism, no particle effects. Inspired by Linear.app, Vercel, Resend.com — clean, typography-driven, restrained use of brand color.

**Rules:**
- Brand gradient (`#4F52FF → #8B3CF7`) used ONLY on: logo, primary CTA buttons, and 1–2 subtle accent borders
- Mostly white (`#FFFFFF`) light mode, dark (`#0D0E14`) dark mode — no rainbow of colors
- No stock photo images, no fake avatars/testimonials
- No heavy animation libraries — CSS transitions + IntersectionObserver only
- Every section breathes: generous whitespace, nothing cramped

---

## Tech Stack

```
Next.js 15 (App Router)
TypeScript
Tailwind CSS v3
Google Fonts: Plus Jakarta Sans (weights: 400, 500, 600, 700, 800)
No other dependencies
```

Initialize with:
```bash
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --no-eslint --yes
```

---

## Logo Assets

Copy from the source app:
- `E:\Carlos\Development Tools\Proyectos\Agenda\citasbot-whatsapp\public\logo.png` → `public/logo.png` (full wordmark: icon + "CitasBot" text)
- The icon is a robot face in a speech bubble with blue→purple gradient

If you need the icon standalone, use the logo.png — it contains the full brand.

---

## Design Tokens (tailwind.config.ts)

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          from: '#4F52FF',
          to: '#8B3CF7',
        },
        neutral: {
          50: '#F8F9FF',
          100: '#F0F1FA',
          200: '#E2E3F0',
          300: '#C5C6D8',
          400: '#9899B0',
          500: '#6B6C84',
          600: '#4A4B60',
          700: '#32333F',
          800: '#1E1F28',
          900: '#12131A',
          950: '#0D0E14',
        },
        wa: '#25D366', // WhatsApp green — use ONLY for WhatsApp references
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #4F52FF 0%, #8B3CF7 100%)',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px 0 rgba(79,82,255,0.12)',
      },
    },
  },
  plugins: [],
}
export default config
```

---

## CSS Custom Properties (app/globals.css)

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: #ffffff;
  --bg-subtle: #F8F9FF;
  --bg-elevated: #ffffff;
  --border: #E2E3F0;
  --border-subtle: #F0F1FA;
  --text-primary: #12131A;
  --text-secondary: #4A4B60;
  --text-muted: #9899B0;
  --text-inverse: #ffffff;
}

.dark {
  --bg: #0D0E14;
  --bg-subtle: #12131A;
  --bg-elevated: #1E1F28;
  --border: #2A2B38;
  --border-subtle: #1E1F28;
  --text-primary: #F0F1FA;
  --text-secondary: #9899B0;
  --text-muted: #6B6C84;
  --text-inverse: #12131A;
}

/* Gradient text utility */
.gradient-text {
  background: linear-gradient(135deg, #4F52FF 0%, #8B3CF7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Gradient border utility */
.gradient-border {
  border: 1px solid transparent;
  background-clip: padding-box;
  position: relative;
}

/* Scroll fade-in */
.fade-up {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## Theme Toggle (no flash on load)

In `app/layout.tsx`, add this inline script in `<head>` BEFORE any stylesheets to prevent flash:

```html
<script dangerouslySetInnerHTML={{ __html: `
  (function() {
    try {
      var t = localStorage.getItem('theme');
      if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      }
    } catch(e) {}
  })();
`}} />
```

The ThemeToggle component reads/writes `localStorage.getItem('theme')` and toggles the `dark` class on `document.documentElement`.

---

## File Structure

```
app/
  layout.tsx          — html/body, fonts, theme script, metadata
  page.tsx            — imports and stacks all sections
  globals.css         — CSS variables + Tailwind directives
components/
  Navbar.tsx
  Hero.tsx
  HowItWorks.tsx
  Features.tsx
  Pricing.tsx
  Footer.tsx
  ThemeToggle.tsx     — sun/moon icon button
  WhatsAppMock.tsx    — animated chat UI component used in Hero
public/
  logo.png            — copied from source app
tailwind.config.ts
```

---

## Sections — Detailed Specs

### 1. `Navbar.tsx`

- Sticky, `position: sticky; top: 0; z-index: 50`
- Background: `var(--bg)` with `border-bottom: 1px solid var(--border)` — NO blur/glassmorphism
- Left: `<img src="/logo.png" height={32}>` 
- Center (desktop): nav links `Features`, `Cómo funciona`, `Precios` — anchor links to section IDs
- Right: `<ThemeToggle />` + `<a>` CTA button "Empezar gratis"
- CTA button style: `background: brand-gradient`, white text, `border-radius: 9999px`, `padding: 8px 20px`, font-weight 600
- Mobile: hamburger menu (simple toggle, no library)

---

### 2. `Hero.tsx`

Layout: 2-column on desktop, stacked on mobile.

**Left column:**

Badge (above headline):
```
[●  Gestión de citas por WhatsApp]
```
Style: small pill, `background: rgba(79,82,255,0.08)`, `color: #4F52FF` (light) / `#8B8BFF` (dark), border `1px solid rgba(79,82,255,0.15)`, rounded-full.

Headline (h1, `font-size: clamp(2.25rem, 5vw, 4rem)`, font-weight 800):
```
Tus clientes ya tienen WhatsApp.
Úsalo para llenar tu agenda.
```
No gradient on the headline — full dark text. Clean and confident.

Subheadline (`font-size: 1.125rem`, `color: var(--text-secondary)`, max-width 460px):
```
CitasBot gestiona citas, confirmaciones y recordatorios 
por WhatsApp — sin que tus clientes descarguen nada 
ni tú pierdas tiempo al teléfono.
```

CTA buttons (flex row, gap-3):
- Primary: "Empezar gratis →" — gradient bg, white text, rounded-full, padding 12px 28px, font-weight 700
- Secondary: "Ver cómo funciona" — no bg, border `1px solid var(--border)`, `color: var(--text-primary)`, same size

Below buttons, small social proof text in `--text-muted`:
```
✓ Sin tarjeta de crédito  ·  ✓ Plan gratis disponible
```

**Right column:**

Use `<WhatsAppMock />` component — see spec below.

---

### 3. `WhatsAppMock.tsx`

A code-rendered mock of a WhatsApp conversation. NOT an image.

Visual structure — render as a styled `<div>`:
```
┌──────────────────────────────────┐
│ ← CitasBot             [●] En línea│  ← header, dark bg
├──────────────────────────────────┤
│                                  │  ← chat area, WhatsApp-ish light green tinted bg
│  [🤖]  Hola 👋 Soy el asistente  │  ← bot bubble (left, white/grey)
│         de Estética Luna.        │
│         ¿Qué servicio necesitas? │
│                                  │
│              Corte de cabello  ▶ │  ← user bubble (right, brand gradient)
│                                  │
│  [🤖]  Perfecto ✂️ ¿Qué día     │
│         prefieres?               │
│                                  │
│              Mañana a las 3pm  ▶ │
│                                  │
│  [🤖]  ¡Listo! ✅ Tu cita está   │
│         confirmada:              │
│         📅 Martes 3:00 PM        │
│         ✉️ Recibirás recordatorio│
└──────────────────────────────────┘
```

Styling:
- Container: `width: 320px`, `border-radius: 16px`, `overflow: hidden`, `box-shadow: 0 8px 32px rgba(0,0,0,0.12)`, `border: 1px solid var(--border)`
- Header bar: `background: #075E54` (WhatsApp dark green), white text, padding 12px 16px, flex row
- Chat area background: `#ECE5DD` in light mode, `#1A1A2E` in dark mode
- Bot bubbles: white background, `border-radius: 0 12px 12px 12px`, `padding: 10px 14px`, font-size 0.875rem, shadow subtle
- User bubbles: `background: brand-gradient`, white text, `border-radius: 12px 0 12px 12px`, align-self flex-end
- Messages animate in sequentially with CSS animation-delay (200ms, 600ms, 1000ms, 1400ms, 1800ms, 2200ms) — fade-in + slide-up
- Use `animation: messageIn 0.3s ease forwards` with `@keyframes messageIn { from { opacity:0; transform: translateY(8px) } to { opacity:1; transform: translateY(0) } }`

---

### 4. `HowItWorks.tsx`

Section id: `como-funciona`

Title: "Tan fácil como 1, 2, 3" (centered, h2, font-weight 800)
Subtitle: "Sin configuraciones complicadas. En minutos tienes tu bot activo." (centered, `--text-secondary`)

3 cards in a row (responsive: stack on mobile):

```
Card 1:                    Card 2:                    Card 3:
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│  [01]           │       │  [02]           │       │  [03]           │
│                 │       │                 │       │                 │
│  Conecta tu     │       │  Configura tus  │       │  Tus clientes   │
│  WhatsApp       │       │  servicios y    │       │  agendan solos  │
│                 │       │  horarios       │       │                 │
│  Vincula tu     │       │  Define qué     │       │  El bot atiende,│
│  número de      │       │  ofreces, cuándo│       │  agenda y       │
│  negocio con    │       │  y con quién.   │       │  recuerda — 24/7│
│  Meta Cloud API │       │  Todo desde el  │       │  sin que        │
│  en minutos.    │       │  dashboard.     │       │  intervengas.   │
└─────────────────┘       └─────────────────┘       └─────────────────┘
```

Card style:
- Background: `var(--bg-elevated)`, border `1px solid var(--border)`
- `border-radius: 16px`, padding 32px
- Step number `[01]` — large, `font-size: 3rem`, `font-weight: 800`, `gradient-text` class, `line-height: 1`
- Title: `font-size: 1.125rem`, `font-weight: 700`, `color: var(--text-primary)`, margin-top 16px
- Description: `font-size: 0.875rem`, `color: var(--text-secondary)`, margin-top 8px
- On hover: `box-shadow: card-hover` transition 200ms

---

### 5. `Features.tsx`

Section id: `features`

Title: "Todo lo que necesitas para llenar tu agenda" (h2, centered, font-weight 800)
Subtitle: "Sin apps extra. Sin complicaciones." (`--text-secondary`, centered)

6-feature grid (3×2 desktop, 2×3 tablet, 1×6 mobile):

```typescript
const features = [
  {
    icon: "💬",
    title: "Agendamiento automático",
    description: "El bot conversa con tu cliente y agenda la cita sin que toques nada.",
  },
  {
    icon: "🔔",
    title: "Recordatorios automáticos",
    description: "Confirma y recuerda citas por WhatsApp. Reduce los no-shows hasta un 70%.",
  },
  {
    icon: "📊",
    title: "Dashboard centralizado",
    description: "Ve todas tus citas, clientes y pagos en un solo lugar. Desde cualquier dispositivo.",
  },
  {
    icon: "👥",
    title: "Multi-usuario",
    description: "Agrega a tu equipo con roles diferenciados: admin, staff y más.",
  },
  {
    icon: "⏰",
    title: "Control de disponibilidad",
    description: "Define horarios por servicio y profesional. El bot nunca doble-reserva.",
  },
  {
    icon: "📈",
    title: "Reportes y estadísticas",
    description: "Conoce tus servicios más solicitados, horas pico y tendencias del negocio.",
  },
]
```

Card style:
- Background: `var(--bg)`, border `1px solid var(--border)`, border-radius 12px, padding 24px
- Icon container: 40×40px, `background: rgba(79,82,255,0.08)`, border-radius 10px, flex center — display the emoji or use a Lucide icon if preferred
- Title: `font-size: 1rem`, `font-weight: 600`, margin-top 16px
- Description: `font-size: 0.875rem`, `color: var(--text-secondary)`, margin-top 6px
- On hover: top border changes to `3px solid` with gradient — use `border-top: 3px solid transparent; background-image: linear-gradient(var(--bg), var(--bg)), brand-gradient; background-origin: border-box; background-clip: padding-box, border-box;`

---

### 6. `Pricing.tsx`

Section id: `precios`

Title: "Planes para cada etapa de tu negocio" (h2, centered)
Subtitle: "Empieza gratis. Escala cuando lo necesites." (`--text-secondary`)

Toggle: "Mensual" / "Anual (2 meses gratis)" — simple button group, no library. For now prices are monthly only, annual can show `precio * 10` per year (2 months free).

Plans data:
```typescript
const plans = [
  { name: "Free", price: 0, appointments: 15, conversations: 45, users: 1, cta: "Empezar gratis", popular: false },
  { name: "Starter", price: 19, appointments: 40, conversations: 120, users: 2, cta: "Elegir plan", popular: false },
  { name: "Pro", price: 29, appointments: 80, conversations: 240, users: 5, cta: "Elegir plan", popular: true },
  { name: "Business", price: 39, appointments: 150, conversations: 450, users: 10, cta: "Elegir plan", popular: false },
  { name: "Enterprise", price: 89, appointments: 300, conversations: 900, users: 25, cta: "Contactar ventas", popular: false },
]
```

Layout: 5 cards in a row on desktop (overflow-x scroll on mobile), centered.

Card style:
- Standard cards: background `var(--bg-elevated)`, border `1px solid var(--border)`, border-radius 16px, padding 28px
- **Popular (Pro) card**: border `2px solid #4F52FF`, slightly taller (scale or extra padding), badge "Más popular" at top (gradient bg, white text, rounded-full, font-size 0.75rem)
- Price: `font-size: 2.5rem`, `font-weight: 800`, `color: var(--text-primary)`, with `/mes` in `--text-muted` at 1rem
- Feature list (3 items max, clear checkmarks):
  - ✓ {appointments} citas/mes
  - ✓ {users} usuario(s)
  - ✓ Recordatorios automáticos
- CTA button:
  - Popular: gradient bg, white text, rounded-full, full width
  - Others: border `1px solid var(--border)`, `var(--text-primary)`, rounded-full, full width
  - Hover: all buttons show gradient bg on hover

Below plans, small note in `--text-muted`:
```
Todos los planes incluyen dashboard web, soporte por email y acceso a la API de WhatsApp.
```

---

### 7. `Footer.tsx`

Simple 2-row footer:
- Row 1: Logo left, nav links center (`Features · Cómo funciona · Precios`), right: "© 2025 CitasBot"
- Row 2: Legal links small text: `Política de privacidad · Términos de servicio`
- Top border: `1px solid var(--border)`
- Background: `var(--bg-subtle)`
- Padding: 40px 0

---

### 8. `app/page.tsx`

```tsx
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import Features from '@/components/Features'
import Pricing from '@/components/Pricing'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Pricing />
      <Footer />
    </main>
  )
}
```

---

### 9. `app/layout.tsx`

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CitasBot — Gestión de citas por WhatsApp',
  description: 'Automatiza tus citas y recordatorios por WhatsApp. Sin apps extra para tus clientes.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();` }} />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
```

---

## Scroll Fade-in (add to layout or a client hook)

```typescript
// hooks/useFadeIn.ts — or inline in each section
'use client'
import { useEffect, useRef } from 'react'

export function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}
```

Use in sections: `<div ref={ref} className="fade-up">...</div>`

---

## Quality Checklist for Codex

Before finishing, verify:
- [ ] `npm run build` passes with no errors
- [ ] No TypeScript errors
- [ ] Dark mode toggle works (adds/removes `dark` class on `<html>`)
- [ ] No flash of wrong theme on load (inline script in `<head>`)
- [ ] All sections visible on mobile (375px)
- [ ] Pricing cards scroll horizontally on mobile
- [ ] WhatsApp mock messages animate in on load
- [ ] No hardcoded colors — use CSS variables or Tailwind tokens only
- [ ] Logo loads correctly from `/public/logo.png`
- [ ] All nav anchor links work (smooth scroll: `html { scroll-behavior: smooth }`)

---

## Do NOT Do

- Do not add framer-motion, gsap, or any animation library
- Do not add fake testimonials, star ratings, or user avatars
- Do not add a hero background image or video
- Do not add floating decorative blobs or particle effects
- Do not add a cookie banner or chat widget
- Do not use purple/blue gradient on more than 3 elements per section
- Do not add a "Built with Next.js" badge or similar
- Do not create any documentation files (.md) beyond what already exists
