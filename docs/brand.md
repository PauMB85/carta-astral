# Brand — Galgo Astral

Guía visual de marca de la app de carta astral. Toda la paleta y los tokens viven en [lib/theme.ts](../lib/theme.ts) bajo el objeto `v1`.

## Paleta

### Colores base

| Token        | Hex       | Rol                                                              |
| ------------ | --------- | ---------------------------------------------------------------- |
| `dark`       | `#0b0a08` | Fondo principal (lo pinta `CosmosBg` + `body`)                    |
| `ink`        | `#1a160d` | Fondo de cards y formularios (un pelín más claro que `dark`)     |
| `gold`       | `#c9a55a` | Oro base — bordes, eyebrows en mayúsculas, iconos                |
| `goldBright` | `#e7c97a` | Oro brillante — títulos, números romanos, focus visible, CTA     |
| `cream`      | `#f5ecd6` | Texto principal (párrafos, descripciones)                        |

### Variantes semi-transparentes

| Token          | Valor                          | Uso                                            |
| -------------- | ------------------------------ | ---------------------------------------------- |
| `dim`          | `rgba(245, 236, 214, 0.55)`    | Texto secundario, captions                     |
| `goldFaint15`  | `rgba(201, 165, 90, 0.15)`     | Divisores muy sutiles (header border)          |
| `goldFaint25`  | `rgba(201, 165, 90, 0.25)`     | Bordes de cards / highlights                   |
| `goldFaint30`  | `rgba(201, 165, 90, 0.30)`     | Borders de radio cards no seleccionados        |
| `goldFaint35`  | `rgba(201, 165, 90, 0.35)`     | Underline de inputs, outline secundario        |
| `goldGlow`     | `rgba(231, 201, 122, 0.35)`    | `drop-shadow` del logo en hero/header          |

> Los tokens `goldFaint18` y `goldFaint60` también están definidos en `lib/theme.ts` pero hoy no se usan activamente. Quedan disponibles si hace falta una variante intermedia.

### Excepción — color de error

El error state usa un púrpura sutil **fuera de la paleta dorada**, inline en [`ReadingError`](../components/chart-flow.tsx) (no es un token reutilizable):

- Background: `rgba(120, 60, 160, 0.08)`
- Border: `rgba(180, 130, 200, 0.2)`

Razón: señaliza error sin agresividad cromática. El púrpura encaja con el tono místico y se distingue del dorado dominante sin gritar.

## Tipografía

Cargadas con `next/font/google` en [app/layout.tsx](../app/layout.tsx):

| Familia                  | Variable CSS      | Uso                                                          |
| ------------------------ | ----------------- | ------------------------------------------------------------ |
| **Cinzel**               | `--font-display`  | Eyebrows en mayúsculas, números romanos, CTAs, etiquetas     |
| **Cormorant Garamond**   | `--font-body`     | Títulos grandes en italic, párrafos, texto corrido           |

Las clases utilitarias `font-display` y `font-body` viven en [app/globals.css](../app/globals.css). `font-display` añade `letter-spacing: 0.08em` por defecto.

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
