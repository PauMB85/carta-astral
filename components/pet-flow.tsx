"use client";

import { useState, useSyncExternalStore } from "react";
import type { Dictionary } from "@/lib/i18n";
import type { Lang } from "@shared/domain/lang";
import {
  natalInputSchema,
  type NatalInput,
} from "@natal/domain/natal-input";
import { readingSchema, type Reading } from "@natal/domain/reading";
import type { PetData } from "@pet/domain/pet-data";
import { PetForm } from "@/components/pet-form";
import { PetNoChartError } from "@/components/pet-no-chart-error";
import { PetLoading } from "@/components/pet-loading";

type Props = {
  lang: Lang;
  t: Dictionary["pet"];
};

type LastReading = {
  natalInput: NatalInput;
  reading: Reading;
};

type Stored =
  | { kind: "checking" }
  | { kind: "missing" }
  | { kind: "found"; reading: LastReading };

const STORAGE_KEY = "heda:lastReading";
const CHECKING: Stored = { kind: "checking" };
const MISSING: Stored = { kind: "missing" };

let cachedRaw: string | null | undefined = undefined;
let cachedResult: Stored = MISSING;

function getClientSnapshot(): Stored {
  const raw = window.sessionStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedResult;
  cachedRaw = raw;

  if (!raw) {
    cachedResult = MISSING;
    return cachedResult;
  }
  try {
    const parsed = readStoredReading(JSON.parse(raw));
    cachedResult =
      parsed && parsed.reading.status === "ok"
        ? { kind: "found", reading: parsed }
        : MISSING;
    return cachedResult;
  } catch {
    cachedResult = MISSING;
    return cachedResult;
  }
}

function getServerSnapshot(): Stored {
  return CHECKING;
}

function subscribe(): () => void {
  return () => {};
}

export function PetFlow({ lang, t }: Props) {
  const stored = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (petData: PetData) => {
    if (stored.kind !== "found") return;

    setSubmitError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/checkout/pet-compatibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          petData,
          natalInput: stored.reading.natalInput,
          reading: stored.reading.reading,
          lang,
        }),
      });

      if (!res.ok) {
        const message =
          res.status === 429
            ? t.form.errorRateLimit
            : t.form.errorNetwork;
        setSubmitError(message);
        setSubmitting(false);
        return;
      }

      const data = (await res.json()) as { url?: string };
      if (!data.url) {
        setSubmitError(t.form.errorNetwork);
        setSubmitting(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setSubmitError(t.form.errorNetwork);
      setSubmitting(false);
    }
  };

  if (stored.kind === "checking") {
    return <div aria-hidden="true" className="min-h-[70vh]" />;
  }
  if (stored.kind === "missing") {
    return <PetNoChartError lang={lang} t={t.noChart} />;
  }
  if (submitting) {
    return <PetLoading title={t.loading.title} sub={t.loading.sub} />;
  }
  return <PetForm t={t} submitError={submitError} onSubmit={handleSubmit} />;
}

function readStoredReading(value: unknown): LastReading | null {
  if (typeof value !== "object" || value === null) return null;
  const obj = value as { natalInput?: unknown; reading?: unknown };

  const ni = natalInputSchema.safeParse(obj.natalInput);
  const r = readingSchema.safeParse(obj.reading);
  if (!ni.success || !r.success) return null;

  return { natalInput: ni.data, reading: r.data };
}
