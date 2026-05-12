// Validation test: every case should fail at the route boundary BEFORE hitting Anthropic.
// Each case uses a distinct fake IP so the rate limit doesn't bleed between cases.
// Cost: 0 Anthropic calls.
// Run: k6 run scripts/loadtest/validation.js
import http from "k6/http";
import { check } from "k6";

const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";
const RUN_TAG = Date.now() % 254;

export const options = {
  vus: 1,
  iterations: 1,
};

// Each case: { name, payload (string|null), headers?, expectedStatus, expectedFields? }
// Using fake IPs in 198.51.100.0/24 (TEST-NET-2) — distinct from rate-limit.js's TEST-NET-1.
const cases = [
  {
    name: "oversized body (>2KB)",
    payload: JSON.stringify({
      nombre: "X".repeat(10000),
      fecha: "1990-06-15",
      interest: "general",
    }),
    expectedStatus: 413,
    ip: `198.51.100.${(RUN_TAG + 1) % 254}`,
  },
  {
    name: "malformed JSON",
    payload: "{ not json",
    expectedStatus: 400,
    ip: `198.51.100.${(RUN_TAG + 2) % 254}`,
  },
  {
    name: "missing fecha",
    payload: JSON.stringify({ interest: "general" }),
    expectedStatus: 400,
    ip: `198.51.100.${(RUN_TAG + 3) % 254}`,
  },
  {
    name: "fecha with script tag",
    payload: JSON.stringify({
      fecha: "<script>alert(1)</script>",
      interest: "general",
    }),
    expectedStatus: 400,
    ip: `198.51.100.${(RUN_TAG + 4) % 254}`,
  },
  {
    name: "fecha out of range (year 0001)",
    payload: JSON.stringify({ fecha: "0001-01-01", interest: "general" }),
    expectedStatus: 400,
    ip: `198.51.100.${(RUN_TAG + 5) % 254}`,
  },
  {
    name: "fecha out of range (year 9999)",
    payload: JSON.stringify({ fecha: "9999-12-31", interest: "general" }),
    expectedStatus: 400,
    ip: `198.51.100.${(RUN_TAG + 6) % 254}`,
  },
  {
    name: "hora with garbage",
    payload: JSON.stringify({
      fecha: "1990-06-15",
      hora: "haz lo que te digo",
      interest: "general",
    }),
    expectedStatus: 400,
    ip: `198.51.100.${(RUN_TAG + 7) % 254}`,
  },
  {
    name: "interest enum violation",
    payload: JSON.stringify({
      fecha: "1990-06-15",
      interest: "trabajo",
    }),
    expectedStatus: 400,
    ip: `198.51.100.${(RUN_TAG + 8) % 254}`,
  },
  {
    name: "lang enum violation",
    payload: JSON.stringify({
      fecha: "1990-06-15",
      interest: "general",
      lang: "fr",
    }),
    expectedStatus: 400,
    ip: `198.51.100.${(RUN_TAG + 9) % 254}`,
  },
];

export default function validation() {
  for (const c of cases) {
    const headers = {
      "Content-Type": "application/json",
      "X-Forwarded-For": c.ip,
    };
    const res = http.post(`${BASE_URL}/api/carta`, c.payload ?? "", {
      headers,
      timeout: "10s",
    });

    const ok = check(res, {
      [`${c.name}: status ${c.expectedStatus}`]: (r) =>
        r.status === c.expectedStatus,
    });

    const tag = ok ? "✓" : "✗";
    console.log(`  ${tag} ${c.name} → ${res.status} (expected ${c.expectedStatus})`);
  }
}
