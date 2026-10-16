# Dirección visual — rediseño del landing (propuesta, 2026-10-16)

Referencias: Crisp `/es/chatbot` (la principal), Contiant, SendPulse WhatsApp y BotPenguin SaaS.
Lo que comparten las cuatro: fondo claro, producto real en primer plano, poco texto por bloque y
un CTA claro.

## Principios
1. **El producto habla.** Cada sección muestra una pieza real (el chat de WhatsApp o el dashboard), no iconos con párrafos.
2. **Una idea por sección**: titular de hasta 8 palabras, una frase debajo y nada más.
3. **Sin estética "AI"**: fuera el degradado azul-violeta, el texto con degradado, los fondos oscuros con brillos, las píldoras sobre el titular, el robot y los fade-in en todo.
4. **Claro por defecto.** Se quita el modo oscuro y su conmutador: una sola versión bien hecha.

## Color
| Rol | Valor | Uso |
|---|---|---|
| Papel | `#FAF8F5` | fondo de página |
| Superficie | `#FFFFFF` | tarjetas y mockups |
| Línea | `#E7E3DC` | bordes |
| Tinta | `#17181C` | texto, botón principal y el único bloque oscuro (demo) |
| Texto 2 | `#5E5F66` | subtítulos |
| Acento | `#E4572E` (terracota) | solo CTA, enlaces y un dato por sección |
| WhatsApp | `#25D366` / `#ECE5DD` | solo dentro de los mockups de chat |

Se elige terracota porque es cálido y de servicio (clínicas, salones, consultas). Además se separa
del violeta "IA" y del verde de WhatsApp, que ya aparece en el producto.
Alternativa si no convence: verde bosque `#1F5F4A`.

## Tipografía
- **Instrument Sans** (Google Fonts) para todo, en dos pesos: 500 en titulares y 400 en el texto. Sustituye a Plus Jakarta Sans.
- Titulares grandes con interlineado apretado; nada de pesos 800 ni de `tracking` negativo extremo.
- Precios y horas con cifras tabulares.

## Estructura (de 7 secciones a 6)
1. **Hero**: titular, una frase, "Solicitar demo" y "Escríbenos por WhatsApp". A la derecha, un teléfono con una reserva real (pide cita → elige hora → confirmación).
2. **Cómo funciona**, en el patrón de BotPenguin: a la izquierda una lista (Reserva · Confirma · Recuerda · Reprograma) y a la derecha el chat de ese paso. Sustituye a "Cómo funciona" y a "Características" actuales.
3. **Bento** en el patrón de Crisp, con 4 tarjetas: Agenda del día (dashboard), Horarios y servicios, Varios profesionales y Recordatorios automáticos. Cada una lleva un fragmento de interfaz y hasta 12 palabras.
4. **Precios**: 3 tarjetas claras; la recomendada se distingue con un borde en tinta, sin degradado.
5. **Demo**: el único bloque oscuro (tinta), con el formulario corto. Absorbe el CTABanner actual.
6. **FAQ** (5 preguntas) y pie. Las dudas van aquí, no repartidas por la página.

## Movimiento e interacción (lo que hace dinámicas a las referencias)
Regla: cada efecto **muestra cómo funciona el producto**. Nada de partículas, brillos ni blobs.

| Sección | Efecto | Referencia |
|---|---|---|
| Hero | El chat del teléfono se reproduce solo: aparece "escribiendo…", luego los mensajes, se elige la hora y llega la confirmación, en bucle. Subrayado a mano que se dibuja bajo una palabra del titular. Dos tarjetas flotantes ("Cita confirmada", "Recordatorio enviado") entran escalonadas, con un parallax leve. | Crisp, Contiant |
| Cómo funciona | Sección fijada al hacer scroll: el teléfono se queda quieto y, al bajar, cambian el paso de la lista y el chat. En móvil pasan a ser pestañas que avanzan solas, con una barra de progreso. | BotPenguin, Contiant |
| Bento | Cada tarjeta tiene interfaz viva: la agenda del día se va llenando, un interruptor de recordatorios se activa y un contador sube al entrar en pantalla. Al pasar el ratón, la tarjeta se levanta 2 px. | Crisp |
| Precios | El cambio mensual/anual anima la cifra con un contador. | — |
| Demo | El bloque oscuro se expande desde una tarjeta al llegar con el scroll. | Contiant |
| Global | Barra inferior fija con "Solicitar demo" que aparece tras pasar el hero. Las secciones entran con un desplazamiento corto (12 px y 300 ms), no con fundidos largos. | Crisp |

Técnica:
- Una sola librería, **`motion`** (Framer Motion), para scroll y transiciones de React, cargada con `LazyMotion`. Lo sencillo se hace con CSS y `position: sticky`.
- Con `prefers-reduced-motion`, todo pasa a estático y se muestra el chat completo.
- Presupuesto: menos de 40 KB de JS extra y sin bajar de 90 en el Lighthouse de rendimiento en móvil.

## Logo
El robot con degradado es lo más "IA" de la marca. Propuesta: una marca plana de un solo color (bocadillo + marca de verificación, o bocadillo + calendario) y el texto "CitasBot" en tinta.
Mientras tanto, solo el texto con un punto terracota.

## Pendiente
- Los mockups (chat y dashboard) se construyen en HTML animable, fieles al flujo real del bot
  (`../citasbot-whatsapp`), nunca con funciones inventadas. Es mejor que una captura: se puede animar.
- Aprobar el color de acento y la tipografía antes de tocar código.
