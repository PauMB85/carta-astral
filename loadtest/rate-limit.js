// Rate limit test: 7 sequential requests from the same IP.
// Expect: first 5 → 200, 6th + 7th → 429 with mystical message + Retry-After header.
// Cost: 5 Anthropic calls (~$0.005).
// Run: k6 run loadtest/rate-limit.js
import http from "k6/http";
import { check } from "k6";

const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";
// Unique IP per run — avoids stale buckets from previous runs.
const FAKE_IP = `192.0.2.${(Date.now() % 254) + 1}`;
const TOTAL_REQUESTS = 7;

export const options = {
  vus: 1,
  iterations: 1,
  // Each iteration of this test makes 7 internal requests.
  // The default per-iteration timeout is 30s, bump it.
  setupTimeout: "10s",
};

const validPayload = JSON.stringify({
  nombre: "k6-rate",
  fecha: "1990-06-15",
  hora: "14:30",
  lugar: "Madrid",
  interest: "general",
  lang: "es",
});

export default function () {
  console.log(`rate-limit test using IP ${FAKE_IP}`);

  for (let i = 1; i <= TOTAL_REQUESTS; i++) {
    const res = http.post(`${BASE_URL}/api/carta`, validPayload, {
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": FAKE_IP,
      },
      timeout: "60s",
    });

    const remaining = res.headers["X-Ratelimit-Remaining"] ?? "?";
    console.log(`  req ${i}/7 → ${res.status} (remaining=${remaining})`);

    if (i <= 5) {
      check(res, {
        [`req ${i}: status 200`]: (r) => r.status === 200,
      });
    } else {
      check(res, {
        [`req ${i}: status 429`]: (r) => r.status === 429,
        [`req ${i}: Retry-After header`]: (r) =>
          Boolean(r.headers["Retry-After"]),
        [`req ${i}: body has rate_limited error`]: (r) => {
          try {
            const body = JSON.parse(r.body);
            return body.error === "rate_limited" && Boolean(body.message);
          } catch {
            return false;
          }
        },
      });
    }
  }
}
