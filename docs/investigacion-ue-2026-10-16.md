**Aviso: la investigación es parcial.** Las partes fiscales y de RGPD (1, 2 y 4) salen de mi conocimiento previo, no de fuentes oficiales leídas hoy (2026-10-16). Las búsquedas no devolvieron BOE, AEAT, la Comisión Europea ni EUR-Lex. Están marcadas **[NV]** (no verificado). No encontré la tarifa oficial de Meta para España en €. Los precios de competidores son de terceros, salvo que diga lo contrario.

## 1) IVA [NV]
- **B2B (cliente con NIF-IVA español, autónomos incluidos):** el servicio se localiza en España (art. 69.Uno.1º LIVA). El cliente autoliquida el IVA (inversión del sujeto pasivo). Usted factura sin IVA con la mención "inversión del sujeto pasivo" y no necesita registrarse en España.
- **B2C (consumidor sin actividad económica):** el servicio tributa en España al 21 %. Para ello, un proveedor de fuera de la UE usa el **régimen no Unión de OSS**: se registra en un solo Estado miembro, presenta declaraciones trimestrales y no hay umbral de 10.000 €. No encontré la página oficial de la Comisión (el fetch dio 404), así que confirme en la sede de la AEAT.
- **Validación:** pida y compruebe el NIF-IVA del cliente. VIES sirve para números intracomunitarios, y la AEAT tiene su propia consulta censal. Sin prueba de condición empresarial, trate al cliente como B2C.
- **Precios con IVA:** a consumidores, el precio mostrado debe incluir impuestos (TRLGDCU) **[NV]**. Para B2B puede mostrar "+ IVA". Booksy publica "+ IVA" ([Pabau, 2026-10-07](https://pabau.com/es/blog/booksy-precio/)).
- **Recomendación:** venda solo a empresas y autónomos con NIF-IVA, con precio "+ IVA" y casilla de NIF obligatoria. Así evita el OSS.

## 2) Facturación
- **Verifactu:** obliga a quienes facturan con software sujetos a IS, IRPF o IRNR con establecimiento permanente en España. Un proveedor sin establecimiento queda fuera **[NV, interpretación mía]**.
- **Fechas:** el RDL 15/2025 aplazó a 1-ene-2027 (sociedades) y 1-jul-2027 (resto) ([LegalToday](https://www.legaltoday.com/actualidad-juridica/noticias-de-derecho/nueva-prorroga-verifactu-no-sera-obligatorio-hasta-2027-para-sociedades-y-otros-contribuyentes-2025-12-04/)).
- **Nuevo aplazamiento:** hay un anuncio de aplazar hasta octubre de 2028 que todavía no consta en una norma publicada ([WWWhatsnew, 2026-10-06](https://wwwhatsnew.com/2026/10/06/hacienda-verifactu-octubre-2028-aplazamiento-factura-electronica-2026)). No verificado en el BOE.
- **Crea y Crece (factura electrónica B2B):** no pude verificar su estado reglamentario ni su aplicación a extranjeros. Sus clientes españoles sí tendrán que recibir facturas electrónicas, así que conviene emitir en formato estructurado.

## 3) Cobros y Merchant of Record
- **Stripe directo:** Ecuador **no** figura entre los países de Stripe. En Latinoamérica solo aparecen Brasil y México ([stripe.com/global](https://stripe.com/global), consultado hoy).
- **Alternativas:** una entidad en EE. UU. o la UE (por ejemplo, Stripe Atlas/LLC o Estonia) con Stripe directo, o un MoR. Con Stripe directo, el IVA y el OSS los lleva usted.
- **Paddle:** dice vender en más de 200 países y actuar como MoR, calculando y remitiendo impuestos ([doc](https://developer.paddle.com/concepts/sell/supported-countries-locales)). No verifiqué si acepta a Ecuador como país del vendedor.
- **Lemon Squeezy:** 5 % + 0,50 USD, más 1,5 % en transacciones internacionales según un blog de terceros ([Dodo](https://dodopayments.com/blogs/lemonsqueezy-review)). Stripe Managed Payments cobra un 3,5 % adicional según informes **[NV]**.
- **Qué resuelve un MoR:** el MoR es el vendedor legal ante el cliente. Cobra, factura y paga el IVA, de modo que usted no necesita OSS ni facturación propia.

## 4) RGPD y LSSI [NV]
- **Encargado del tratamiento:** firme un **DPA (art. 28)** con cada cliente, que es el responsable. Necesita registro de tratamientos y lista de subencargados (Meta, hosting). También necesita medidas de seguridad y notificación de brechas.
- **Representante (art. 27):** el RGPD alcanza a su tratamiento si los responsables dirigen sus servicios a personas en la UE (art. 3.2). En ese caso, un encargado de fuera de la UE debería nombrar representante. Las [Directrices 3/2018 del CEPD](https://edpb.europa.eu/sites/edpb/files/files/file1/edpb_guidelines_3_2018_territorial_scope_en.pdf) lo tratan, pero no leí la sección sobre encargados. Consulte a un abogado.
- **Transferencias:** Ecuador no tiene decisión de adecuación **[NV]**. Si los datos van a Ecuador, o el soporte accede desde allí, necesita cláusulas contractuales tipo. Si aloja en EE. UU., necesita un proveedor adherido al Data Privacy Framework o cláusulas tipo. Prefiera alojar en la UE.
- **LSSI:** aviso legal (art. 10) y cookies con consentimiento previo (art. 22.2), que se aplican a servicios dirigidos a España. La web de la landing necesita ambos.

## 5) WhatsApp (Meta)
- **Modelo:** desde 2025-07-01 se cobra por mensaje, no por conversación.
- **Mensajes gratis:** los no plantilla dentro de la ventana de 24 h abierta por el usuario, y las plantillas utility enviadas dentro de esa ventana.
- **Mensajes de pago:** todas las plantillas de marketing. Utility y authentication se cobran fuera de la ventana.
- **España:** tiene fila propia, y desde 2026-07-01 tiene una tarifa de marketing más alta ([Meta](https://developers.facebook.com/docs/whatsapp/pricing)).
- **Tarifa en €:** Meta publica el rate card en CSV/PDF y no pude abrirlo. Mensajes de pago: de mensajes de España hay cifras contradictorias en blogs: marketing de unos 0,06 € y utility de 0,025 a 0,035 € ([Messagecentral](https://www.messagecentral.com/blog/whatsapp-business-api-pricing-2026), [GuruSup](https://gurusup.com/blog/whatsapp-api-pricing)). Son **[NV]** y el segundo es de un modelo antiguo.
- **Opt-in y plantillas:** la página de precios no lo cubre. Necesita la Business Messaging Policy de Meta, que no consulté.

## 6) AI Act, art. 50
- **Obligación:** si el bot interactúa directamente con personas, hay que informar de que es IA, salvo que sea obvio (art. 50.1, según mi conocimiento **[NV]**).
- **Fecha:** el art. 50 aplica desde 2026-08-02. El Ómnibus Digital (Reglamento 2026/1744 según una fuente) no lo aplazó. Solo retrasó hasta 2026-12-02 el marcado legible por máquina del art. 50.2 para sistemas generativos ya comercializados ([Process Excellence Network](https://www.processexcellencenetwork.com/ai/articles/eu-ai-act-2026-what-actually-changed-and-what-deployers-still-must-do), [FEDIL](https://fedil.lu/en/publications/ai-act-update-enforcement-begins-as-the-digital-omnibus-reshapes-the-timeline/?pdf=1)). Son fuentes secundarias, sin el DOUE.
- **Sanción:** hasta 15 M€ o el 3 % de la facturación.
- **Aplicación práctica:** el primer mensaje del bot debe decir que es un asistente automático.

## 7) Competidores (España)

| Competidor | Precio | IVA | WhatsApp | Fuente |
|---|---|---|---|---|
| Booksy | 34,99 €/mes (1.er usuario), +8 € por usuario extra, más comisiones | No incluido | Sin dato | [Pabau, 2026-10-07](https://pabau.com/es/blog/booksy-precio/) |
| Fresha | desde 14,95 € **[NV]** | Sin dato | Sin dato | Capterra.es |
| Koibox | desde 40 € **[NV]** (¿mensual?) | Sin dato | Sin dato | Capterra.es |
| Doctoralia | desde 69 € (Capterra) u 80 € (Skello) **[NV]** | Sin dato | Sin dato | [Skello](https://www.skello.es/blog/software-para-clinicas-medicas) |
| Flowww | desde 59 € (Skello) **[NV]** | Sin dato | Sin dato | Skello |
| Treatwell | marketplace con comisiones por captación, sin tarifa | — | Sin dato | listado de terceros |
| Agendapro | no hallé precio para España. En México añade recordatorios WhatsApp aparte, desde unos 100 MXN/mes | México: + IVA | Sí, cobra extra | [agendapro.com/mx](https://agendapro.com/mx/planes) |
| Bookitit, Reservio | no encontrados | — | Reservio cobra SMS aparte; WhatsApp sin dato | [Reservio](https://help.reservio.com/en/articles/8041916-where-can-i-find-sms-notification-pricing) |

Falta verificar en las webs oficiales los precios de todos los competidores, el IVA y el coste de WhatsApp.

## Obligaciones por prioridad
**Bloqueante (antes de vender)**
1. Un canal de cobro: entidad en EE. UU./UE o MoR (Paddle/Lemon Squeezy, confirmando que aceptan Ecuador). Stripe directo no está disponible.
2. Decidir B2B o B2C. Si es solo B2B: NIF-IVA obligatorio, factura sin IVA con inversión del sujeto pasivo y precios "+ IVA". Si es B2C: OSS no Unión y precios con IVA, o MoR.
3. DPA art. 28 con cada cliente, y base legal más información a los clientes finales de las pymes.
4. Política de privacidad, aviso legal y cookies con consentimiento previo en la web.
5. Opt-in y plantillas conformes a la política de Meta (no verificado aquí).

**Importante (primer trimestre)**
6. Nombrar representante UE (art. 27), tras consulta legal. Cláusulas tipo para transferencias a Ecuador y proveedor con DPF o alojamiento en la UE.
7. Aviso de IA en el primer mensaje del bot (art. 50.1, vigente desde 2026-08-02).
8. Obtener el rate card oficial de Meta en € y fijar el precio con el coste por mensaje incluido.
9. Registro de tratamientos, lista de subencargados y procedimiento de brechas.

**Después**
10. Facturas electrónicas estructuradas para clientes españoles (Crea y Crece y Verifactu, con las fechas en cambio).
11. Verificar en el BOE si Verifactu se aplaza a octubre de 2028.
12. Revisión de un asesor fiscal y un abogado de RGPD antes de escalar.

Sources:
- [Pabau Booksy](https://pabau.com/es/blog/booksy-precio/) · [Meta pricing](https://developers.facebook.com/docs/whatsapp/pricing) · [Stripe global](https://stripe.com/global) · [Paddle](https://developer.paddle.com/concepts/sell/supported-countries-locales) · [Dodo Lemon Squeezy](https://dodopayments.com/blogs/lemonsqueezy-review) · [LegalToday](https://www.legaltoday.com/actualidad-juridica/noticias-de-derecho/nueva-prorroga-verifactu-no-sera-obligatorio-hasta-2027-para-sociedades-y-otros-contribuyentes-2025-12-04/) · [WWWhatsnew](https://wwwhatsnew.com/2026/10/06/hacienda-verifactu-octubre-2028-aplazamiento-factura-electronica-2026) · [CEPD](https://edpb.europa.eu/sites/edpb/files/files/file1/edpb_guidelines_3_2018_territorial_scope_en.pdf) · [PEN AI Act](https://www.processexcellencenetwork.com/ai/articles/eu-ai-act-2026-what-actually-changed-and-what-deployers-still-must-do) · [FEDIL](https://fedil.lu/en/publications/ai-act-update-enforcement-begins-as-the-digital-omnibus-reshapes-the-timeline/?pdf=1) · [Skello](https://www.skello.es/blog/software-para-clinicas-medicas) · [AgendaPro MX](https://agendapro.com/mx/planes) · [Reservio](https://help.reservio.com/en/articles/8041916-where-can-i-find-sms-notification-pricing) · [Messagecentral](https://www.messagecentral.com/blog/whatsapp-business-api-pricing-2026) · [GuruSup](https://gurusup.com/blog/whatsapp-api-pricing)
