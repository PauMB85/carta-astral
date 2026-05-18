@AGENTS.md

# Carta Astral

App Next.js 16 que genera una lectura astrológica poética llamando a Claude con streaming progresivo. Una sola página: formulario → `POST /api/carta` → `streamText` + `Output.object` → cliente lo consume con `useObject` y va revelando secciones a medida que llegan.

## Stack

- **Next.js 16.2.4** (App Router, Turbopack) con **React 19.2.4**
- **Tailwind v4** con `@theme inline` en [globals.css](app/globals.css). No hay `tailwind.config.*` — toda la configuración vive en CSS
- **TypeScript strict**, paths con `@/*` apuntando a la raíz
- **Bun** como package manager y runner. Usa `bun run dev | build | lint`, no `npm`/`pnpm`
- **AI SDK v6**, todo fijado sin caret. No bumpees salvo petición explícita:
  - `ai` 6.0.175 — `streamText`, `Output.object`
  - `@ai-sdk/anthropic` 3.0.75 — provider directo (no Vercel Gateway porque ya tenemos `ANTHROPIC_API_KEY`)
  - `@ai-sdk/react` 3.0.177 — hook `experimental_useObject`
  - `zod` 4.4.3 — schemas + tipos inferidos
- **`lucide-react` 1.14.0** fijo
- **Rate limiting** con `@upstash/ratelimit` 2.0.8 + `@upstash/redis` 1.38.0 (pinned). HTTP REST, sin sockets — funciona en Edge y Node serverless

## Estructura

```
app/
  api/carta/route.ts    POST que streamea el JSON. Pipeline: content-length → rate limit → JSON parse → Zod → streamText
  layout.tsx            next/font/google: Cinzel, Cormorant Garamond, Italiana
  page.tsx              Server Component. Lee searchParams.lang, escoge dictionary, compone el árbol
  globals.css           Paleta como @theme + animaciones + prefers-reduced-motion
lib/
  schema.ts             Zod schemas (readingSchema, birthInputSchema) + tipos inferidos (Reading, BirthInput, Lang)
  prompt.ts             SYSTEM_PROMPT + buildUserPrompt. server-only
  format.ts             Formateo de fecha/hora/lugar para el prompt
  ratelimit.ts          Sliding window 5 req/h por IP (Upstash). server-only. Prefix por NODE_ENV
  i18n.ts               Dictionary es/en + pickLang(raw)
  theme.ts              Tokens v1 (oro, dark, cream, faints) usados en estilos inline del nuevo diseño
components/
  cosmos-bg.tsx         Fondo nocturno + estrellas (PRNG sembrado para SSR estable)
  site-header.tsx       Header con toggle ES/EN (Link a /?lang=...)
  site-footer.tsx
  hero.tsx              Portada con NatalWheel
  natal-wheel.tsx       Rueda zodiacal SVG
  pillars.tsx           Tres "pilares" de venta
  chart-flow.tsx        Cliente. Form + ReadingView. useObject + customFetch que intercepta 429
```

## Reglas que ya hemos pisado

- **`useFormStatus` no funciona con `onSubmit`**: solo lo dispara `<form action={serverAction}>`. Si usas `onSubmit` (caso de `useObject`), el botón recibe `disabled={isLoading}` por prop. [chart-flow.tsx](components/chart-flow.tsx)
- **`useObject` sigue siendo experimental** en `@ai-sdk/react` v3: importa como `experimental_useObject as useObject`. Su tipo de `object` es `DeepPartial<RESULT> | undefined` — todos los campos son opcionales mientras streamea. Filtra antes de renderizar
- **`'use server'` solo permite exportar funciones async** (regla viva por si alguna vez añadimos Server Actions). Constantes, objetos o tipos van fuera
- **No `setState` dentro de `useEffect` para resetear estado**: desmonta el componente y deja que React tire el estado. `useEffect` solo es legítimo para sincronizar con sistemas externos (DOM/scroll/focus, intervalos, suscripciones)
- **Server Components por defecto**. `'use client'` solo donde hay estado, eventos, hooks de browser o el hook `useObject`
- **`Math.random()` en server components → PRNG sembrado** para que el HTML sea estable entre requests. Patrón en [cosmos-bg.tsx](components/cosmos-bg.tsx)
- **`server-only` en `lib/prompt.ts` y `lib/ratelimit.ts`**: si alguien los importa desde un client component el build falla. Defensa en profundidad para evitar que el system prompt o el cliente Redis acaben en el bundle del navegador
- **Zod 4: `error.flatten()` está deprecated**. Usa `z.flattenError(error).fieldErrors`
- **Antes de escribir código contra Next.js 16 o el AI SDK**, lee la doc local: `node_modules/next/dist/docs/` y `node_modules/ai/docs/`. Las APIs cambian; tu memoria está obsoleta

## Streaming pipeline

[app/api/carta/route.ts](app/api/carta/route.ts) recibe el body con `birthInputSchema.safeParse`, llama a:

```ts
const result = streamText({
  model: anthropic("claude-haiku-4-5-20251001"),
  output: Output.object({ schema: readingSchema }),
  system: SYSTEM_PROMPT,
  prompt: buildUserPrompt(parsed.data),
});
return result.toTextStreamResponse();
```

En cliente, [chart-flow.tsx](components/chart-flow.tsx) usa `useObject({ api: "/api/carta", schema: readingSchema, fetch: customFetch })`. El `object` (DeepPartial) se pasa a `ReadingView`, que filtra campos válidos y muestra `ReadingPlaceholder` mientras no haya nada renderizable. Cada sección aparece cuando llega su `title`; el `content` se rellena después.

El `customFetch` envuelve el fetch nativo y, si la respuesta es `429`, marca un flag `rateLimited` en estado para mostrar la vista mística "EL COSMOS PIDE PAUSA" en vez del error genérico.

El `Reading` ya **no es discriminated union**. Es un único objeto con `status: "ok" | "needs_more_data" | "error"` y todos los demás campos opcionales. Cualquier rama nueva se añade en [lib/schema.ts](lib/schema.ts) y se maneja en [chart-flow.tsx](components/chart-flow.tsx).

> Nota sobre prompt caching: el SDK lo hace vía `providerOptions.anthropic.cacheControl` en mensajes individuales (no como `system` parameter). Con Haiku 4.5 el mínimo cacheable es **4096 tokens**; nuestro system prompt es bastante menor, así que ahora mismo no se activa. Si crece, añadirlo es trivial.

## Rate limiting

[lib/ratelimit.ts](lib/ratelimit.ts) crea un `Ratelimit` con sliding window de **5 req/h por IP**. Identificador desde `x-forwarded-for` (primer IP de la cadena). Prefix `carta:dev` o `carta:prod` según `NODE_ENV` para que dev y prod compartan la misma BD Upstash sin colisionar (free tier solo da 1 BD).

Cuando se supera el límite, el route handler devuelve `429` con `Retry-After`, headers `X-RateLimit-*` y un body JSON `{ error: "rate_limited", message: "...", retryAfter }`. El cliente lo intercepta en `customFetch` y muestra `t.rateLimitMessage` con el botón de reset.

## Auto-scroll y a11y al revelar la lectura

`ReadingView` (dentro de [chart-flow.tsx](components/chart-flow.tsx)) tiene un `<h2>` con `tabIndex={-1}` y un `useEffect(() => headingRef.current?.focus(), [])`. El navegador scrollea al foco automáticamente y los lectores de pantalla anuncian el título. Es uso legítimo de Effect (sincronización con DOM, no resetea state).

## i18n

[lib/i18n.ts](lib/i18n.ts) exporta `getDictionary(lang)` con dos idiomas (`es`, `en`) y `pickLang(raw)` que valida el query param. La página es Server Component: lee `searchParams.lang`, escoge dictionary y lo pasa por props a los componentes. El toggle del header navega a `/?lang=...` con `replace` y `scroll={false}` para no romper la posición. El `lang` también viaja al backend en el payload del form para que Claude responda en el idioma correcto.

## Diseño

> Guía completa de marca (paleta, tipografía, iconografía, voz) en [docs/brand.md](docs/brand.md).

- **Paleta** vive en [lib/theme.ts](lib/theme.ts) como objeto `v1` (oro `#c9a55a` / oroBright `#e7c97a` / dark `#0b0a08` / cream `#f5ecd6` + variantes faint). Se aplica vía estilos inline en componentes, no via Tailwind utilities
- **Tipografía**: `font-display` (Cinzel) para eyebrows y CTAs, `font-body` (Cormorant Garamond) para títulos grandes en italic y texto corrido. Las dos clases viven en [globals.css](app/globals.css) y los tokens en `@theme`
- **Cosmos background**: [cosmos-bg.tsx](components/cosmos-bg.tsx) renderiza `fixed inset-0 -z-10` con un fondo `v1.dark` + radial gradients dorados sutiles + 80 estrellas SVG con PRNG sembrado y animación `v1-twinkle` inline
- Cualquier animación local (en `<style>` dentro del componente) debe respetar `@media (prefers-reduced-motion: reduce)`. globals.css aplica un `transition-duration: 0.01ms` global como red de seguridad

## Variables de entorno

```
ANTHROPIC_API_KEY=sk-ant-...
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=...
```

Las dos `UPSTASH_*` se obtienen de la pestaña "REST API" en Upstash (las `redis://` TCP no sirven con `@upstash/redis`).

`.env*` está en `.gitignore`. **Next.js no recarga `.env.local` en caliente** — al cambiarla hay que reiniciar `bun run dev`. Sin la key de Anthropic, el route handler responde y Anthropic devuelve 401. Sin las de Upstash, `Redis.fromEnv()` lanza al primer request.

## Comandos

```bash
bun run dev     # next dev (Turbopack)
bun run build   # next build
bun run lint    # eslint
bun x tsc --noEmit   # typecheck manual
```

## Deuda técnica

### Migración de bloques `<style>` a utilidades Tailwind v4 (siguiente cleanup)

Varios componentes usan bloques `<style>` internos con interpolación de `v1.x` para expresar `:hover`, `::after`, `:checked`, `@keyframes` y otros casos que el inline `style={{...}}` no cubre. Este patrón se heredó del codebase inicial y no es óptimo en 2026 con Tailwind v4: re-inyecta el `<style>` por render, sin scoping real, sin tree-shaking, sin tooling de CSS.

Plan acordado para la próxima fase de limpieza:

1. Mover los tokens de `v1` ([lib/theme.ts](lib/theme.ts)) a CSS custom properties dentro de `@theme inline` en [app/globals.css](app/globals.css).
2. Reescribir los `<style>` blocks como utilidades Tailwind v4 (`hover:`, `checked:`, `after:`, `motion-reduce:`, etc.) usando las nuevas custom properties (`text-[--color-gold]`, `hover:bg-[--color-gold-bright]`, ...).
3. Eliminar los componentes auxiliares `*Styles()` cuando ya no se usen.
4. Ajustar el resto de inline `style={{ color: v1.gold }}` para que consuman las mismas custom properties (opcional pero más coherente).

Componentes afectados (aprox.):

- [chart-form.tsx](components/chart-form.tsx) (`FormStyles`)
- [chart-reading-states.tsx](components/chart-reading-states.tsx) (`ReadingPlaceholder` + `Spinner`)
- [chart-reading-view.tsx](components/chart-reading-view.tsx) (`StreamingCursor`)
- [pet-form.tsx](components/pet-form.tsx) (`PetTermsStyles`)
- [pet-form-fields.tsx](components/pet-form-fields.tsx) (`PetFormStyles`)
- [pet-loading.tsx](components/pet-loading.tsx) (`PetLoadingStyles`)
- [pet-premium-block.tsx](components/pet-premium-block.tsx) (`PetPremiumBlockStyles`)
- [pet-reading-view-parts/share-button.tsx](components/pet-reading-view-parts/share-button.tsx) (`ShareButtonStyles`)
- [site-footer.tsx](components/site-footer.tsx) (`SiteFooterStyles`)

Tamaño estimado: medio día. Resultado: menos JS en el bundle de cada componente, CSS optimizado por Tailwind, mejor DX (autocompletado de utilidades, sin template strings).
