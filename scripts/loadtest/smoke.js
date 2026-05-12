// Smoke test: 1 valid request, expect 200 + streaming JSON.
// Cost: 1 Anthropic call (~$0.001).
// Run: k6 run scripts/loadtest/smoke.js
import http from "k6/http";
import { check } from "k6";

const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";
// TEST-NET-1 (RFC 5737) — never routed in production. Safe placeholder IP.
const FAKE_IP = `192.0.2.${Math.floor(Math.random() * 254) + 1}`;

export const options = {
  vus: 1,
  iterations: 1,
};

export default function smoke() {
  const payload = JSON.stringify({
    nombre: "k6-smoke",
    fecha: "1990-06-15",
    hora: "14:30",
    lugar: "Madrid",
    interest: "general",
    lang: "es",
  });

  const res = http.post(`${BASE_URL}/api/carta`, payload, {
    headers: {
      "Content-Type": "application/json",
      "X-Forwarded-For": FAKE_IP,
    },
    timeout: "60s",
  });

  check(res, {
    "status 200": (r) => r.status === 200,
    "body starts with JSON": (r) => r.body && r.body.trim().startsWith("{"),
    "body mentions status field": (r) => r.body && r.body.includes("status"),
  });

  console.log(`smoke from ${FAKE_IP} → ${res.status} (${res.body?.length ?? 0} bytes)`);
}
