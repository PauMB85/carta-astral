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

## Estructura

```
app/
  api/carta/route.ts    POST que streamea el JSON estructurado. Usa streamText + Output.object
  layout.tsx            next/font/google: Cinzel, Cormorant Garamond, Italiana
  page.tsx              Server Component, compone el árbol
  globals.css           Paleta como @theme + animaciones + prefers-reduced-motion
lib/
  schema.ts             Zod schemas (readingSchema, birthInputSchema). Tipos inferidos
  types.ts              Reexporta tipos desde schema.ts
  prompt.ts             SYSTEM_PROMPT + buildUserPrompt
  format.ts             Formateo de fecha/hora/lugar para el prompt
components/
  background/           Cosmos, auroras, starfield (PRNG sembrado), shooting stars — todos server
  ornaments/            Diamond, OrnamentalDivider — server, sin estado
  carta/                Header, formulario y reading. Solo lo interactivo lleva 'use client'
    carta-astral-form.tsx     Cliente. useObject({ api, schema }) → submit/object/isLoading/clear
    reading.tsx               Cliente. Acepta DeepPartial<Reading>, focus + scroll on mount
    streaming-placeholder.tsx Spinner mientras llega la primera sección
    submit-button.tsx         Recibe `pending` por prop (onSubmit, no useFormStatus)
```

## Reglas que ya hemos pisado

- **`useFormStatus` no funciona con `onSubmit`**: solo lo dispara `<form action={serverAction}>`. Si usas `onSubmit` (caso de `useObject`), el botón debe recibir `pending` por prop. [submit-button.tsx](components/carta/submit-button.tsx)
- **`useObject` sigue siendo experimental** en `@ai-sdk/react` v3: importa como `experimental_useObject as useObject`. Su tipo de `object` es `DeepPartial<RESULT> | undefined` — todos los campos son opcionales mientras streamea. Filtra antes de renderizar
- **`'use server'` solo permite exportar funciones async** (regla viva por si alguna vez añadimos Server Actions). Constantes, objetos o tipos van fuera
- **No `setState` dentro de `useEffect` para resetear estado**: desmonta el componente y deja que React tire el estado. `useEffect` solo es legítimo para sincronizar con sistemas externos (DOM/scroll/focus, intervalos, suscripciones)
- **Server Components por defecto**. `'use client'` solo donde hay estado, eventos, hooks de browser o el hook `useObject`
- **`Math.random()` en server components → PRNG sembrado** para que el HTML sea estable entre requests. Patrón en [starfield.tsx](components/background/starfield.tsx)
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

En cliente, [carta-astral-form.tsx](components/carta/carta-astral-form.tsx) usa `useObject({ api: "/api/carta", schema: readingSchema })`. El `object` (DeepPartial) se pasa a `<Reading>`, que filtra campos válidos y muestra `<StreamingPlaceholder>` mientras no haya nada renderizable. Cada `<ReadingSection>` aparece cuando llega su `title`; el `content` se rellena después.

El `Reading` ya **no es discriminated union**. Es un único objeto con `status: "ok" | "needs_more_data" | "error"` y todos los demás campos opcionales. Cualquier rama nueva se añade en [lib/schema.ts](lib/schema.ts) y se maneja en [reading.tsx](components/carta/reading.tsx).

> Nota sobre prompt caching: el SDK lo hace vía `providerOptions.anthropic.cacheControl` en mensajes individuales (no como `system` parameter). Con Haiku 4.5 el mínimo cacheable es **4096 tokens**; nuestro system prompt es bastante menor, así que ahora mismo no se activa. Si crece, añadirlo es trivial.

## Auto-scroll y a11y al revelar la lectura

`<Reading>` lleva un `<h2>` con `tabIndex={-1}` y un `useEffect(() => headingRef.current?.focus(), [])`. El navegador scrollea al foco automáticamente y los lectores de pantalla anuncian "Tu carta astral". Es uso legítimo de Effect (sincronización con DOM, no resetea state).

## Diseño

- **Paleta** (90% noche / 9% oro / 1% púrpura, regla 60-30-10 sesgada al oro):
  - `cosmos-{violet,indigo,void}` — fondo nocturno
  - `gold-{50,200,400,700}` — acento principal (textos, bordes, ornamentos)
  - `aurora-{mystic,amber,abyss}` — nebulosas atmosféricas (blur 40–50px)
  - `starlight-{50,100,200,300}` — jerarquía de texto
  - `--color-shadow-purple{,-border}` — solo en errores suaves
- **Tipografía**: `font-display` (Cinzel) para etiquetas y CTA, `font-italiana` para títulos grandes con `gold-text`, `font-body` (Cormorant) para texto corrido
- **Shooting stars**: cada estrella es un `<span>` con `--angle`, `--len`, `--dx`, `--dy`, `--dur`, `--delay`. La cabeza brillante (`::after`) y la cola con gradiente (`::before`) viven dentro del mismo elemento que se mueve, alineadas al ángulo
- Animaciones (`twinkle`, `aurora`, `shooting`, `shimmer-border`, `pulse-soft`, etc.) se silencian todas con `@media (prefers-reduced-motion: reduce)`

## Variables de entorno

```
ANTHROPIC_API_KEY=sk-ant-...
```

`.env*` está en `.gitignore`. **Next.js no recarga `.env.local` en caliente** — al cambiarla hay que reiniciar `bun run dev`. Sin la key, el route handler responde y Anthropic devuelve 401, que el cliente muestra como error legible.

## Comandos

```bash
bun run dev     # next dev (Turbopack)
bun run build   # next build
bun run lint    # eslint
bun x tsc --noEmit   # typecheck manual
```
