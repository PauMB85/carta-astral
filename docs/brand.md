# Brand — Galgo Astral

Guía visual de marca de la app de carta astral. Toda la paleta y los tokens viven en [app/globals.css](../app/globals.css) bajo `@theme inline` como CSS custom properties. Tailwind v4 las expone como utility classes (`text-gold`, `bg-dark`, `border-gold-faint-25`, ...). Para atributos SVG que no aceptan clases (`stroke=`, `fill=`, `stopColor=`) se usa `var(--color-X)`.

## Paleta

### Colores base

| Token          | Hex       | Utility ejemplo   | Rol                                                              |
| -------------- | --------- | ----------------- | ---------------------------------------------------------------- |
| `dark`         | `#0b0a08` | `bg-dark`         | Fondo principal (lo pinta `CosmosBg` + `body`)                    |
| `ink`          | `#1a160d` | `bg-ink`          | Fondo de cards y formularios (un pelín más claro que `dark`)     |
| `gold`         | `#c9a55a` | `text-gold`       | Oro base — bordes, eyebrows en mayúsculas, iconos                |
| `gold-bright`  | `#e7c97a` | `text-gold-bright`| Oro brillante — títulos, números romanos, focus visible, CTA    |
| `cream`        | `#f5ecd6` | `text-cream`      | Texto principal (párrafos, descripciones)                        |

### Variantes semi-transparentes

| Token            | Valor                       | Uso                                            |
| ---------------- | --------------------------- | ---------------------------------------------- |
| `dim`            | `rgb(245 236 214 / 55%)`    | Texto secundario, captions                     |
| `gold-faint-15`  | `rgb(201 165 90 / 15%)`     | Divisores muy sutiles (header border)          |
| `gold-faint-25`  | `rgb(201 165 90 / 25%)`     | Bordes de cards / highlights                   |
| `gold-faint-30`  | `rgb(201 165 90 / 30%)`     | Borders de radio cards no seleccionados        |
| `gold-faint-35`  | `rgb(201 165 90 / 35%)`     | Underline de inputs, outline secundario        |
| `gold-glow`      | `rgb(231 201 122 / 35%)`    | `drop-shadow` del logo en hero/header          |

> Para alphas no contemplados en los tokens fijos, usa la sintaxis Tailwind alpha (`text-cream/65`, `bg-gold/10`) o arbitrary value (`text-[rgb(220_200_255_/_85%)]`).

### Excepción — color de error

El error state usa un púrpura sutil **fuera de la paleta dorada**. Dos variantes coexisten:

- **Chart reading** ([`ReadingError`](../components/chart-reading-states.tsx)): mantiene los valores originales del primer diseño con arbitrary values (`bg-[rgb(120_60_160_/_8%)]`, `border-[rgb(180_130_200_/_20%)]`, `text-[rgb(220_200_255_/_85%)]`).
- **Pet feature** ([`InlineError`](../components/pet-form-fields.tsx) y [`PetErrorState`](../components/pet-error-state.tsx)): usa tokens dedicados `--color-err-bg`, `--color-err-bd`, `--color-err-ink` definidos en `@theme inline` con alphas ligeramente más visibles para el contexto de feedback inline.

Razón: señalizan error sin agresividad cromática. El púrpura encaja con el tono místico y se distingue del dorado dominante sin gritar.

## Tipografía

Cargadas con `next/font/google` en [app/layout.tsx](../app/layout.tsx):

| Familia                  | Variable CSS      | Uso                                                          |
| ------------------------ | ----------------- | ------------------------------------------------------------ |
| **Cinzel**               | `--font-display`  | Eyebrows en mayúsculas, números romanos, CTAs, etiquetas     |
| **Cormorant Garamond**   | `--font-body`     | Títulos grandes en italic, párrafos, texto corrido           |

Las clases utilitarias `font-display` y `font-body` viven en [app/globals.css](../app/globals.css). `font-display` añade `letter-spacing: 0.08em` por defecto.

### Letter spacing (tracking) — eyebrow pattern

El brand cultiva el patrón "small-caps eyebrow con tracking ancho" como acento visual. Los eyebrows en mayúsculas llevan tracking entre `0.18em` y `0.4em` (`RITUAL DE CONSULTA`, `LECTURA SELLADA`, `EL CIELO REVELA`, etc.). Es deliberado y forma parte de la identidad.

Herramientas de análisis estático (React Doctor, axe-core) suelen avisar de wide letter-spacing porque no pueden distinguir entre un eyebrow legítimo y body text con tracking. **Estos avisos son falsos positivos para los eyebrows del brand**. Solo se considera incorrecto aplicar tracking ancho sobre:

- Body text en frases largas
- Texto en mixed case (italic, lowercase)
- Captions o sublabels descriptivos

Tracking aceptado en este brand:
- `0.05em–0.1em`: body text sutil (raro, casi nunca)
- `0.15em–0.2em`: créditos, etiquetas medianas
- `0.22em–0.4em`: eyebrows mayúsculas, números romanos, CTAs

## Iconografía

Vive en `app/` (file-based metadata de Next 16):

| Archivo                                          | Tamaño    | Uso                                                            |
| ------------------------------------------------ | --------- | -------------------------------------------------------------- |
| [app/icon.png](../app/icon.png)                  | 256×256   | Favicon en pestañas (Chrome, Firefox, Safari, Edge)            |
| [app/apple-icon.png](../app/apple-icon.png)      | 180×180   | Icono al guardar en pantalla de inicio iOS                     |
| [public/galgo-astral-logo.png](../public/galgo-astral-logo.png) | 1024×1536 | Logo usado en `SiteHeader`, `Hero`, `ChartFlow`, `SiteFooter`  |

La imagen de marca es **el galgo silueteado bajo la luna creciente**, con borde circular tipo astrolabio dorado. Refuerza el imaginario "carta astral trazada a mano".

## Cómo se aplica (regla 70 / 20 / 10)

| %    | Tono                          | Donde                                                   |
| ---- | ----------------------------- | ------------------------------------------------------- |
| ~70% | `dark` + `ink`                | Fondo, secciones, atmósfera                             |
| ~20% | `cream` + `dim`               | Texto, contenido                                        |
| ~10% | `gold` + `goldBright` + faints | Acentos: bordes, eyebrows, números, CTAs, divisores     |

El dorado **nunca llena un bloque sólido grande**. Aparece siempre como línea, texto, borde, o glow.

## Voz y tono

El contenido de la carta astral (system prompt en [lib/prompt.ts](../lib/prompt.ts)) cultiva una voz:

- **Cálida y empática**, nunca fatalista.
- **Evocadora**, con vocabulario propio: *lectura sellada*, *consultar otra alma*, *sub luna nova*, *trazada a mano*, *sub luna nueva*, *ad astra per aspera*.
- **Cercana** pero no plana — pide precisión a quien pregunta ("Los astros responden a quien pregunta con precisión").

El diccionario completo de UI vive en [lib/i18n.ts](../lib/i18n.ts) con versiones `es` y `en`.

## Snippet exportable

Para copiar a Figma o cualquier guía externa:

```
Galgo Astral — paleta
─────────────────────────
#0b0a08  Cosmos      background
#1a160d  Ink         surfaces
#c9a55a  Gold        accents
#e7c97a  Gold Bright highlights
#f5ecd6  Cream       text
```
