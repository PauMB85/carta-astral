# Load tests (k6)

Tres escenarios para verificar que las defensas de `/api/carta` aguantan.

## Prerequisitos

```bash
brew install k6
```

El servidor debe estar corriendo:

```bash
bun run dev
# en otro terminal:
k6 run loadtest/<test>.js
```

## Tests

| Test | Qué hace | Coste Anthropic |
|---|---|---|
| `smoke.js` | 1 request válida, verifica el happy path completo | ~$0.001 |
| `rate-limit.js` | 7 requests del mismo IP. Espera 5 × 200, 2 × 429 con `Retry-After` y mensaje místico | ~$0.005 |
| `validation.js` | 9 payloads malos: oversized, JSON corrupto, fecha inválida, prompt injection en `hora`, enum violations. Todos deben dar 400/413 sin tocar Anthropic | $0 |

## Cómo se aíslan los tests

Cada request lleva un `X-Forwarded-For` falso para que el rate limiter (sliding window 5 req/h por IP) no contamine ejecuciones:

- `smoke.js` → IP aleatoria en `192.0.2.0/24` (TEST-NET-1, RFC 5737)
- `rate-limit.js` → un único IP por ejecución, derivado del timestamp
- `validation.js` → un IP distinto por caso en `198.51.100.0/24` (TEST-NET-2)

Esto significa que puedes correr los tests varias veces seguidas sin esperar a que expire el rate limit. Cada ejecución estrena buckets nuevos.

## Variables de entorno

- `BASE_URL` (opcional, default `http://localhost:3000`) — útil para apuntar a Vercel preview, etc.

```bash
BASE_URL=https://carta-astral-preview.vercel.app k6 run loadtest/smoke.js
```

## Qué buscar en la salida

- `checks_total` y `checks_succeeded` deben coincidir (100% pass).
- En `rate-limit.js`, los logs muestran `remaining=4, 3, 2, 1, 0` para los 5 primeros y luego 429.
- Si ves errores de Redis en la consola del server (`Redis.fromEnv()` lanza), revisa `.env.local`.
