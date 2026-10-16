# NEXT — Landing CitasBot (España + LATAM)

Handoff del 2026-10-16. Objetivo: landing de SaaS profesional, sin huella "AI", que convierta a leads
de España y LATAM. Después, el backend en su propio proyecto (`../citasbot-whatsapp`).

## Estado
- Rama `feat/region-demo-legal` (en `origin`), con los commits `bcf1497` y el del spec 02:
  - región por ubicación (`lib/region.ts`): cookie `cb_region` > `x-vercel-ip-country` > `Accept-Language`
  - precios EU 19/39 € + IVA, LATAM USD 12/25
  - CTA "Solicitar demo" con formulario ampliado
  - banner de cookies (GTM solo tras aceptar)
  - `/aviso-legal` y `/cookies`
  - Verificado con build, curl ES/MX y navegador en móvil.
- **Sin desplegar.**

## Siguiente paso
- Hecho: spec 02 (región invisible, navbar `lg:`) y punto 4 (privacidad y términos para el RGPD).
- Hecho también el punto 5 (precio LATAM "US$ 12").
- Hecho: analítica sin cookies. Se quitaron GTM y el banner. Vercel Analytics registra los eventos
  `demo_click` (con `location` y `plan`), `whatsapp_click` y `form_submit`. El correo de cada demo
  incluye el origen (UTM y referrer). Volver a GA4/GTM solo con anuncios de pago, y entonces con banner y CSP.
- Rediseño en curso en la rama `feat/rediseno-landing` (sale de `feat/region-demo-legal`, PR #1 sin fusionar).
  Dirección aprobada en `docs/direccion-visual.md`: papel, tinta, acento terracota, Instrument Sans y `motion`.
  - Hecho (3 pasadas): scroll suave (Lenis), navbar en píldora, retícula "+", hero con foto, iPhone realista,
    tilt 3D, parallax y chat animado; cinta de negocios; "Así funciona" fijado al scroll; bento vivo con
    dashboard en 3D y fotos; precios con interruptor y borde animado; demo en bloque oscuro; FAQ; pie con wordmark.
  - Siguiente: revisión del usuario; captura real del dashboard (sustituye `DashboardMock` en `components/Features.tsx`);
    Lighthouse móvil (presupuesto ≥ 90); borrar `hooks/useFadeIn.ts` si sigue sin uso.
  - Logo nuevo aplicado (`public/citasbot-simbolo.svg` y `citasbot-logo-horizontal.svg`): navbar, pie, favicon,
    apple-icon e imagen OG/Twitter. Pendiente: llevar logo y paleta al dashboard (`../citasbot-whatsapp`) y
    pasar `privacy-policy.html`/`terms.html` (siguen con el estilo oscuro antiguo) a la nueva paleta.

## Pendiente del usuario
- [ ] Datos del aviso legal (LSSI art. 10): titular, NIF/RUC y domicilio. Hoy aparecen como
      `[PENDIENTE]` en `app/aviso-legal/page.tsx`. Conviene completarlos antes de desplegar.
- [ ] `[PENDIENTE]` en `public/privacy-policy.html`: representante UE (art. 27) y región de Supabase.
- [ ] Vercel: activar Web Analytics en el proyecto y borrar la variable `NEXT_PUBLIC_GTM_ID`.
      Los eventos propios creo que exigen el plan Pro (sin verificar).
- [ ] Usar enlaces con UTM en todo lo que se comparta (firma de WhatsApp, LinkedIn, anuncios).
- [ ] Que un abogado de RGPD revise privacidad y términos (borrador sin verificar en fuentes oficiales).
      Faltan también la ley aplicable y la jurisdicción en `terms.html`.
- [ ] Referencias (2–3 landings) y capturas reales del dashboard y del flujo de WhatsApp. Bloquean el rediseño visual.
- [ ] Contestar al lead **Citas Express ES** (+34 617 27 09 11), una gestoría de citas de extranjería/DGT.
      Preguntarle qué necesita. Su agenda y su atención por WhatsApp encajan; capturar citas en webs
      oficiales no lo ofrecemos. Para el primer cliente: alta manual, factura B2B y precio fundador.

## Lote landing (orden)
1. ~~Región, precios, CTA de demo, legal y cookies~~ (hecho, `bcf1497`).
2. ~~Spec 02: región invisible y navbar responsive~~ (hecho).
3. Rediseño visual (cuando lleguen las referencias), con el checklist de `taste-skill/skills/redesign-skill`:
   - un solo acento en vez del degradado azul-violeta
   - sin pill en el hero
   - features en layout asimétrico
   - otra tipografía
   - capturas reales del producto
4. ~~Privacidad y términos para el RGPD~~ (hecho). Compromisos publicados que el backend debe cumplir:
   - borrar o devolver los datos de clientes finales en ≤ 30 días al terminar el contrato
   - solicitudes de demo ≤ 12 meses; registros técnicos ≤ 90 días
   - avisar a los clientes antes de añadir un subencargado. Añadir Anthropic al lanzar la IA de Pro,
     y Paddle al activar el cobro.
5. ~~Precio LATAM como "US$ 12"~~ (hecho).

## Backend (`../citasbot-whatsapp`, sesión propia, después del landing)
- **Cobro en €**:
  - Paddle como MoR; ya hay `lib/billing/providers/paddle.ts`, sin probar. Stripe directo no admite Ecuador.
  - Confirmar que Paddle acepta vendedores de Ecuador y su comisión (de memoria: 5 % + 0,50 USD).
  - Recomendado: España solo B2B, con NIF obligatorio y precios "+ IVA".
- **Datos fiscales**: NIF y dirección del cliente, numeración y PDF de facturas.
- **Región**:
  - Madrid en `app/dashboard/configuracion/page.tsx:447`
  - locale `es-EC` fijo en `lib/whatsapp/send-message.ts:208`
  - idioma por negocio
- **IA en Pro**: Claude Haiku 5.5, acotada al negocio. Prompt de sistema con los datos del negocio y
  herramientas cerradas: disponibilidad, reservar, cancelar. Fuera de eso, deriva a un humano.
  Debe decir que es un asistente automático (Ley de IA de la UE, art. 50).
  Coste estimado: ~0,005 USD por conversación.
- **RGPD**: DPA del art. 28 con cada negocio y registro del opt-in de WhatsApp. Región de Supabase/Vercel sin confirmar.
- **Infra**: Vercel Hobby prohíbe el uso comercial; pasar a Pro antes de cobrar.
- Falta un cron `ACTIVE → PAST_DUE`; ver `../citasbot-whatsapp/NEXT.md` §1.

## Referencias
- Investigación de normas UE/España y competencia: `docs/investigacion-ue-2026-10-16.md`.
  Lo fiscal y lo RGPD están sin verificar en fuentes oficiales; validarlo con un asesor antes de cobrar.
- Coste y margen estimados por cliente en España:
  - Starter 19 € → ~15 € de margen
  - Pro 39 € → ~26–28 € de margen
  - Incluye Paddle, Meta (~0,03 € por recordatorio fuera de la ventana de 24 h) y la IA.
- Competencia en España: Booksy 34,99 € + IVA, Koibox desde 40 €, Doctoralia desde 69 €.

## Herramientas (método)
- Bug en `~/.agent-method/bin/delegate:172`: `--tools` es variádico y se traga el prompt, así que el rol
  `investigar` falla siempre. Arreglo: poner el prompt antes de `--tools`, o usar `--tools=...`. Va en `MemoriesMD/method`.
