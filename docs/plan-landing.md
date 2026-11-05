# Plan de la Landing Page — dwe

> Documento de plan para la landing del port nativo de PC (motor `dwe`, C++26 + Vulkan + SDL3).
> Fuentes: `dw-engine/README.md`, `dw-engine/docs/roadmap.md`, `dw-engine/docs/guides/beta-linux.md`,
> `dw-engine/scripts/package/README.md`, ADR 0011 (política de assets), 0013, 0022, 0023.

---

## 1. Objetivos de la página

| # | Objetivo | Métrica de éxito |
|---|---|---|
| 1 | Explicar qué es el proyecto en <30 segundos | Tiempo en página / rebote bajo |
| 2 | Conseguir descargas (Windows y Linux) | Clics en botones de descarga |
| 3 | Llevar tráfico a YouTube (devlogs/gameplay) | Clics en "ver en YouTube" / embeds reproducidos |
| 4 | Crear comunidad alrededor del Discord | Clics en invitación |
| 5 | Recibir donaciones (Ko-fi y Patreon) | Clics y conversión |

## 2. Audiencia e idiomas

- **Idiomas:** ES (por defecto), EN, PT, JA — fase 2; **ZH (chino)** — fase 3, cuando el resto esté estable.
- Audiencia principal: jugadores retró del RPG original de PS1, usuarios de Linux y Windows con GPU Vulkan, y curiosos de "ports caseros".
- Tono: apasionado pero técnico-honesto: es una **beta temprana**, no un producto terminado. Dejarlo claro evita reseñas negativas.

## 3. Estructura de la página (secciones)

**Orden de implementación (v3, 2026-11-05):** Hero —que fusiona el "Qué es": badge de beta, features y tech chips— → **Descargas** → Media → Comunidad → Donaciones → Footer. El resumen como sección independiente desaparece; el nav solo ancla secciones reales.

### 3.1 Hero
- Nombre/logo del proyecto (ver §8: decisión pendiente del nombre público).
- Tagline corta, estilo: *"Un motor nativo de PC que reinterpreta un clásico RPG de crianza de criaturas de los 90."*
- Estado del proyecto visible: badge `Beta temprana` + progreso por fases (Fase 1 y 2 cerradas, 3 en curso — sacado del roadmap).
- CTA primario: **Descargar** (anclas a §3.3). CTA secundario: **Ver en YouTube**.
- Fondo: gameplay loop en vídeo mudo o screenshot HD.

### 3.2 Resumen (¿Qué es / ¿Cómo funciona?) — **fusionado en el Hero** (v3)
- 3–4 párrafos cortos o tarjetas:
  1. **Motor propio, no emulación:** reimplementación nativa en C++26 con Vulkan; el juego se juega con assets reales extraídos.
  2. **Tú pones el disco:** el usuario aporta su imagen del juego original (región NA); `dwx` la extrae y convierte localmente. **No distribuimos nada del juego original** (política legal, ADR 0011).
  3. **Pensado para mods:** contenido editable (YAML/Lua/RML), rulesets (reglas del original como primer ruleset; diseño nuevo después), y una tubería remaster para assets HD.
  4. **Multiplataforma:** Linux (beta actual) y Windows (en marcha; la CI ya pasa en ambos).
- Mini-diagrama del flujo: Disco del usuario → `dwx extract` → el juego (imagen simple, no texto técnico).
- Sección de tecnologías como lista de chips (SDL3, Vulkan 1.3, Lua, EnTT, RmlUi…) para quien quiera el detalle, con link a la documentación VitePress del engine.

### 3.3 Descargas (Windows + Linux)
Dos tarjetas lado a lado:

| | **Linux** | **Windows** |
|---|---|---|
| Archivo | `dwe-beta-<versión>-<commit>-linux-x86_64.tar.xz` | `dwe-beta-<versión>-<commit>-windows-x64.zip` |
| Requisitos | glibc ≥ 2.38 (Ubuntu 24.04 / Debian 13 / Fedora 39+), Vulkan 1.3, ~1.5 GB libres | Windows 10/11 x64, GPU con Vulkan 1.3, ~1.5 GB libres |
| Estado beta | ✅ disponible | ✅ disponible (confirmado 2026-11-05) |

Elementos de cada tarjeta:
- Botón de descarga + peso aproximado + commit/versión.
- **SHA-256 visible** (o link al archivo de checksums) — da confianza y es fácil de automatizar en releases.
- Link "¿Cómo jugar?" → guía de primer arranque (pedir imagen del disco, ~1 minuto de lectura).
- Link a **Changelog / Notas de la versión**.
- Aviso dentro de la sección: *el paquete no contiene el juego; necesitas tu propia copia.*

**Hosting de archivos — aún no decidido.** Opciones a evaluar (recomendación: **GitHub Releases**):
- ✅ *GitHub Releases:* gratis, SHA/checksums integrados, se automatiza desde CI, consistente con "no alojamos assets". **Recomendado.**
- ⚠️ *itch.io:* buena visibilidad en comunidad indie, pero sube contenido derivado del juego en screenshots → revisar política antes de publicar capturas allí.
- ⚠️ *Drive/MEGA:* sin integridad verificable ni automatización; último recurso.
- Mantener los URLs en la capa de datos (`content/downloads.ts`, ver §10) para cambiarlos sin tocar componentes (DIP).

### 3.4 YouTube / Multimedia
- **Vídeo principal embebido** (último devlog o tráiler) con lazy-load (`lite-youtube` o iframe con `loading="lazy"`).
- Grid de 2–4 clips debajo (gameplay, comparaciones original vs port, etc.).
- Botón **Suscríbete al canal**.
- Alternativa simple: un JSON local con los IDs de vídeo para que añadir contenido no requiera recompensar componentes.

### 3.5 Capturas / Galería
- 4–6 screenshots del juego en beta + (opcional) comparativa lado a lado PS1 vs port.
- Nota legal: las capturas contienen assets del original extraídos localmente → ver §9.

### 3.6 Comunidad
- Invitación a **Discord** (widget embebido o tarjeta con botón + miembro count).
- Cómo reportar bugs: tecla **F12** en el juego → carpeta de reporte (texto ya escrito en el README de la beta; reutilizarlo).
- Link a la documentación técnica (VitePress) para contribuidores.

### 3.7 Donaciones (Ko-fi + Patreon)
- Tarjeta doble:
  - **Ko-fi:** botón/widget para donaciones únicas (sin comisión, fricción mínima).
  - **Patreon:** niveles con recompensas (p. ej. acceso a builds de desarrollo, menciones, votación de features).
- Copy de transparencia: *"El juego y sus builds serán siempre gratis. Las donaciones sostienen desarrollo, herramientas y hosting."*
- Opcional: contadores/meta ("este mes: café y dominios") — honesto y sin presionar.
- Enlace de "otras formas de apoyar": compartir, probar la beta, reportar bugs, traducir.

### 3.8 Footer
- **Disclaimer de no afiliación** (texto del README del engine, traducido): proyecto independiente, sin endoso de los titulares originales; todas las marcas pertenecen a sus dueños.
- Aviso: no se distribuye contenido del juego; se requiere copia propia.
- Licencia: pendiente de decisión final (ADR 0011) — poner "Licencia pendiente" o el enlace cuando se decida.
- Créditos a librerías (link a `licenses/` de los builds).
- Contacto (email/Discord) y links sociales.

## 4. Funcionalidad transversal

| Tema | Decisión propuesta |
|---|---|
| i18n | `useI18n` propio y tipado en `src/i18n/` (cero dependencias). **5 idiomas activos: ES, EN, PT, JA, ZH** — todos los catálogos comparten el tipo `Catalog`, así una clave nueva sin traducir rompe el build. Detección: localStorage → idioma del navegador → ES. Selector en header. Migrar a `react-i18next` solo si la escala lo pide. URLs por idioma (`/es/`…) para SEO: pendiente fase 2. |
| SEO | Metadatos, OG image con screenshot, `hreflang`, sitemap. Si el SEO se vuelve crítico, evaluar migrar la home a SSG (Astro) más adelante; por ahora SPA con prerender de index basta. |
| Analítica | Simple y respetuosa (plausible/self-hosted o GA4) — eventos: clics de descarga, play de vídeo, clic de donación. |
| Modo oscuro | Sí, con toggle; estética "retro-moderna" (ver §7). |
| Build | Un solo repo (este `dw-project-folder-web`, React 19 + Vite 8 + TS). Desplegar en GitHub Pages o Cloudflare Pages con CI. |

## 5. Contenido que hay que escribir/redactar (copywriting)

- [ ] Resumen del proyecto (adaptar README público, tono jugador, no técnico).
- [ ] Descripción de requisitos por plataforma y "cómo jugar" resumida (extraer de `scripts/package/README.md`).
- [ ] Copy de la sección de donaciones + recompensas de Patreon.
- [ ] Disclaimer legal de footer (ES/EN/PT/JA).
- [ ] textos de FAQ sugerida: ¿es emulación? ¿necesito el disco original? ¿acepta otras regiones? (hoy solo NA) ¿es legal? ¿Windows cuándo? ¿puedo hacer mods?

## 6. Fases de implementación

**Fase 1 — MVP (1 página, ES + EN):**
Esqueleto de carpetas de §10.1 + tokens de estilo + átomos `ui/` (§10.4) + `/dev/catalog` en dev.
Luego, secciones: Hero, Resumen, Descargas (Linux real + Windows "en camino"), YouTube, Comunidad,
Donaciones, Footer legal. Deploy.

**Fase 2 — Crecimiento:**
Galería/comparativas, FAQ (reutilizando `Card`/`FaqItem`), PT + JA, changelog embebido desde releases
como `ChangelogView` propia (demuestra que el sistema se reutiliza), página de estado del port
(vinculada al roadmap, con `ProgressBadge`), Windows disponible (nuevo dato en `content/downloads.ts`,
cero cambios de componentes).

**Fase 3 — Pulido:**
ZH, widget de Discord en vivo, sección de prensa/clips de creadores, métricas de conversión y ajuste.

## 7. Estilo visual propuesto

- Dirección: **retro-moderno sobrio** — paleta oscura + acentos (verde/ámbar tipo terminal de la época), tipografía con guiño pixel pero legible, pantallas de menú del juego como motivo gráfico.
- No usar directamente arte/sprites del original en el branding de la web (ver §9). Usar capturas de gameplay con aviso, o arte propio.
- Componentes: nada de frameworks pesados; CSS propio o Tailwind, con diseño mobile-first (gran parte del tráfico social llega en móvil).

## 8. Decisiones abiertas (bloqueantes para el diseño)

1. **Nombre público del proyecto:** ✅ decidido (2026-11-05): la landing usa **Project Folder** como nombre del proyecto; **dwe** se menciona como el motor. El copy habla de "un clásico de PlayStation (1999)" sin nombrar el título registrado.
2. **Uso del nombre/marcas "Digimon World" en el copy:** ✅ decisión (2026-11-05): se habla de "un clásico de crianza de criaturas de PlayStation (1999)" sin nombrar el título registrado en el copy principal. Valorar si los meta tags/SEO pueden ser más explícitos (tarea del equipo legal).
3. **Hosting de descargas:** ver §3.3 (recomendación: GitHub Releases).
4. **Versión Windows:** ✅ resuelto (2026-11-05): la beta de Windows **ya está disponible** junto a la de Linux. Fijan datos finos (URL directa, tamaño y SHA-256) en `content/downloads.ts` al publicar la release.
5. **Dominio de la landing** (GitHub Pages con subdominio vs dominio propio).
6. **Recompensas concretas de Patreon** (niveles y precios).

## 9. Riesgos legales a reflejar en la web

- **No distribuir assets:** los builds solo contienen motor + paquetes del equipo; la web no debe enlazar a ROMs. Mantener el link a la política de assets.
- **Capturas de pantalla:** contienen material derivado del juego (extraído del disco del usuario). Para un proyecto fan sin fines de lucro suele tolerarse, pero conviene: (a) preguntar al equipo, (b) marcarlas como "capturas reales con tu propio disco".
- **Donaciones + contenido con copyright:** dejar claro que las donaciones **no venden el juego** (que es gratis y no contiene material de terceros) — copy de transparencia en §3.7 ayuda.
- **Licencia pendiente:** no prometer una licencia concreta en la web hasta cerrar el ADR.

## 10. Arquitectura del front — diseño atómico + SOLID

Idea: **una sola landing, pero construida como un sistema**. Todo bloque de página se descompone en
micro-componentes reutilizables; el conocimiento de dominio (URLs de descarga, IDs de vídeo, invitaciones)
vive en una capa de datos separada. Así, mañana una página de changelog o un modal de "nueva versión"
reusa el 90 % de lo mismo.

### 10.1 Capas y carpetas

```
src/
├─ app/                        # raíz de composición: providers (i18n, tema), router si aplica
│   App.tsx
├─ views/                      # PÁGINAS: solo composición y layout, cero lógica de negocio
│   HomeView.tsx               #   Hero → Overview → Downloads → Media → Gallery → Community → Donate → Footer
│   ChangelogView.tsx          #   (fase 2)
├─ sections/                   # ORGANISMOS: bloques full-width de una vista, 1 sección = 1 ancla
│   HeroSection.tsx
│   OverviewSection.tsx
│   DownloadsSection.tsx
│   MediaSection.tsx           #   YouTube embebido + grid
│   GallerySection.tsx
│   CommunitySection.tsx
│   DonateSection.tsx
│   SiteFooter.tsx             #   disclaimers legales
├─ components/                 # MOLÉCULAS: combinan atoms, reciben datos ya planos por props
│   DownloadPlatformCard.tsx   #   Linux y Windows usan el MISMO componente (ver LSP abajo)
│   FeatureCard.tsx            #   tarjetas del resumen
│   TechChipList.tsx           #   SDL3, Vulkan…
│   VideoEmbed.tsx             #   LazyVideoEmbed (iframe perezoso)
│   VideoThumb.tsx             #   miniatura con play → abre el principal
│   DonateOptionCard.tsx       #   Ko-fi y Patreon usan el mismo
│   ScreenshotCard.tsx
│   LanguageSwitcher.tsx
│   ThemeToggle.tsx
│   FaqItem.tsx                #   fase 2
├─ ui/                         # ÁTOMOS: micro-componentes compartidos, sin dominio ninguno
│   Button.tsx                 #   variantes: primary | ghost | link; prop `href` → <a>, sin href → <button>
│   Card.tsx                   #   slots: eyebrow / title / body / footer
│   Badge.tsx                  #   beta, linux, windows, "en camino", nuevo
│   Chip.tsx
│   SectionTitle.tsx           #   eyebrow + título + subtítulo, con id para anclas
│   KeyValue.tsx               #   "Tamaño: 180 MB", "SHA-256: a3f…"
│   CopyButton.tsx             #   copiar checksum/portapapeles con feedback ✓
│   Icon.tsx                   #   set propio (os-logo, youtube, kofi, patreon, discord, download…)
│   Stack.tsx / Grid.tsx       #   primitivas de layout con gap/align
│   Separator.tsx
│   ExternalLink.tsx           #   añade rel/target, icono y data-track automáticamente
│   Heading.tsx / Text.tsx     #   tipografía normalizada (h2 de sección, párrafos)
│   ProgressBadge.tsx          #   estado de fases del roadmap
├─ content/                    # ÚNICA FUENTE DE DATOS (abstracciones; nada de URLs en componentes)
│   downloads.ts               #   plataformas: nombre, file, url, size, sha256, status, requisitos
│   videos.ts                  #   ids de YouTube + títulos
│   links.ts                   #   discord, kofi, patreon, docs VitePress, GitHub
│   project.ts                 #   nombre público, tagline por idioma, fecha del roadmap
├─ i18n/                       #   catálogos ES/EN/PT/JA/ZH + hook de traducción
├─ hooks/                      #   useDownloadStatus, useCopy, useMediaQuery…
├─ styles/                     #   tokens.css (colores, espaciados, tipografías) + global.css
└─ assets/                     #   imágenes propias (logo, fondos, icons svg)
```

### 10.2 Regla de dependencias (estricta, como `dependency-rules.md` del engine)

```
ui  ←  components  ←  sections  ←  views  ←  app
```

- Una capa solo puede importar de capas **inferiores**, nunca al revés ni en horizontal
  (una sección no importa a otra sección; si comparten algo, baja a `components/`).
- `ui/` **jamás** importa de `content/` ni conoce el dominio: recibe props, no sabe qué es una "beta".
- `content/` y `i18n/` son hojas: cualquier capa puede usarlos, nadie los "posee".
- `sections/` es el único lugar que junta datos (`content/*`) con presentación (`components/*`).

### 10.3 SOLID traducido a UI

| Principio | Cómo se aplica aquí |
|---|---|
| **SRP** | Un componente, una responsabilidad visible. Formatear bytes, calcular "¿está disponible?" o armar la URL de descarga NO va en JSX: va en `hooks/` o `content/`. |
| **OCP** | Nuevas variantes por props, no forkeando componentes: `Button variant="ghost"`, `Badge tone="warning"`. Si una variante crece demasiado, se compone (nuevo molecule) en vez de parchar el viejo. |
| **LSP** | Componentes del mismo contrato son intercambiables: `DownloadPlatformCard` sirve igual para la beta Linux real y para la tarjeta Windows "en camino" (el `status` es un prop); `DonateOptionCard` igual para Ko-fi y Patreon. Nadie debe escribir `if (plataforma === 'windows')` dentro de un card. |
| **ISP** | Props interfaces pequeñas y específicas por componente. Un `VideoThumb` recibe `{ id, title }`, no el objeto entero de `videos.ts`. |
| **DIP** | Las secciones dependen de abstracciones (`content/downloads.ts` como tipo `PlatformRelease[]`), no de URLs literales. Cambiar el hosting de descargas (GitHub Releases → itch.io, decisión §8.3) es **tocar un solo archivo**. |

### 10.4 Catálogo de micro-componentes compartidos (semilla del MVP)

Estos se construyen primero y se reutilizan en toda la web (también en vistas futuras):

| Atomo | Dónde se usará |
|---|---|
| `Button` | CTAs hero, descargas, donaciones, suscripción |
| `Card` + `Badge` | Tarjetas de descarga, features, donaciones, gallery |
| `SectionTitle` | Todas las secciones (con ancla `#downloads`, `#donate`…) |
| `KeyValue` + `CopyButton` | Tamaño, SHA-256, requisitos |
| `Icon` | SOs, redes, plataformas de pago |
| `ExternalLink` | Docs, GitHub, tiendas |
| `Grid`/`Stack`/`Separator` | Layout general |
| `ThemeToggle`, `LanguageSwitcher` | Header |

Opcional pero barato: ruta `/dev/catalog` (solo en dev) que renderiza todos los `ui/` juntos —
reemplazo liviano de Storybook para ver el sistema crecer.

### 10.5 Ejemplo de flujo (Descargas)

```
content/downloads.ts  →  DownloadsSection  →  DownloadPlatformCard[]  →  Card + Badge + KeyValue + Button + CopyButton
      (datos)                (dominio/layout)        (molecule)                    (atoms)
```

### 10.6 Convenciones de código

- Un archivo por componente, carpeta por molecule cuando tenga styles propios.
- Nombres en inglés en código (`ui/Button.tsx`), textos de UI vía `i18n` (nada de strings crudos en componentes, ni siquiera el ES default).
- **Regla práctica de i18n por capa:** los átomos `ui/` no importan i18n (reciben todo por props); moléculas `components/` y `sections/` sí pueden usar `useI18n`.
- Props tipadas con `interface XProps`; nada de `any` ni de config "dios" (§10.3 ISP).
- Estilos: tokens en `styles/tokens.css`; componentes no escriben colores literales.
- Cada sección de la landing es una ancla navegable desde el header (`#downloads`, `#media`, `#community`, `#donate`).

---

*Última actualización: 2026-11-05 (añadida §10: arquitectura atómica + SOLID). El estado del port (fases) puede leerse de `dw-engine/docs/roadmap.md`; si la web muestra progreso, conviene regenerar ese dato desde ahí o mantenerlo con aviso de fecha.*
