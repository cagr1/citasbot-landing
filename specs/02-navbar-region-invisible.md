# Spec 02 — Región invisible y navbar responsive

Repo: `/Users/carlosgallardo/Projects/projects/Citasbot-Landing`. Rama actual: `feat/region-demo-legal`.

## Cambios
1. **`components/Navbar.tsx`**:
   - Quitar `RegionSwitch` del escritorio y del menú móvil.
   - Quitar la prop `region` y el import de `Region`.
   - En `app/page.tsx` pasar `<Navbar />` sin prop.
2. **Navbar responsive**: entre 768 y 1024 px los enlaces y botones se amontonan.
   - Cambiar `md:` por `lg:` en los cuatro sitios: `nav` (`hidden ... lg:flex`), acciones derechas (`hidden ... lg:flex`), toggle móvil (`lg:hidden`) y menú móvil (`lg:hidden`).
   - Añadir `whitespace-nowrap` a los enlaces del nav y a los dos botones.
3. **`components/Pricing.tsx`**:
   - Quitar el bloque `<div className="mt-8"><RegionSwitch region={region} dark /></div>`. Las tarjetas recuperan `mt-12`.
   - En su lugar, al final de la nota final (`Todos los planes incluyen…`), añadir un enlace discreto con el mismo color y tamaño que la nota:
     - en `eu`: "¿Fuera de Europa? Ver precios en USD"
     - en `latam`: "¿Estás en Europa? Ver precios en €"
   - Al pulsarlo se guarda la cookie `cb_region` con el valor contrario y se hace `router.refresh()`. Reutiliza la lógica de `components/RegionSwitch.tsx`: convierte ese componente en este enlace (export default `RegionLink({ region })`) y borra la versión de píldora.
4. Nada más. No cambies colores, textos ni otras secciones.

## Verificación
- `npm run build` sin errores.
- `grep -rn RegionSwitch components app` sin resultados, salvo que el archivo se llame así y exporte el enlace.
- `curl -s -H 'x-vercel-ip-country: ES' localhost:<port>` contiene "Ver precios en USD"; con `MX` contiene "Ver precios en €".

No hagas commit. Lista los archivos tocados y la salida de la verificación.
