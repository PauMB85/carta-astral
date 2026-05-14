"use client";

import { useEffect, useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import type { Dictionary } from "@/lib/i18n";
import type { Lang } from "@shared/domain/lang";
import { petReadingSchema } from "@pet/domain/pet-reading";
import { PetErrorState } from "@/components/pet-error-state";
import { PetLoading } from "@/components/pet-loading";
import { PetReadingView } from "@/components/pet-reading-view";

type Props = {
  sessionId: string | null;
  lang: Lang;
  t: Dictionary["pet"];
};

type Phase =
  | { kind: "missing-session" }
  | { kind: "verifying" }
  | { kind: "payment-error" }
  | { kind: "reading" };

const POLL_INTERVAL_MS = 2000;
const MAX_POLL_ATTEMPTS = 15;

export function PetSuccessFlow({ sessionId, lang, t }: Props) {
  const [phase, setPhase] = useState<Phase>(() =>
    sessionId ? { kind: "verifying" } : { kind: "missing-session" },
  );

  const { object, submit, isLoading, error } = useObject({
    api: "/api/pet-compatibility/interpret",
    schema: petReadingSchema,
  });

  useEffect(() => {
    if (!sessionId || phase.kind !== "verifying") return;

    let cancelled = false;
    let attempts = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const poll = async () => {
      if (cancelled) return;
      attempts += 1;

      try {
        const res = await fetch(
          `/api/checkout/session?session_id=${encodeURIComponent(sessionId)}`,
        );
        if (cancelled) return;

        if (res.ok) {
          const data = (await res.json()) as { paymentStatus?: string };
          if (cancelled) return;
          if (data.paymentStatus === "paid") {
            setPhase({ kind: "reading" });
            submit({ sessionId });
            return;
          }
        }

        if (attempts < MAX_POLL_ATTEMPTS) {
          timer = setTimeout(poll, POLL_INTERVAL_MS);
        } else {
          setPhase({ kind: "payment-error" });
        }
      } catch {
        if (cancelled) return;
        if (attempts < MAX_POLL_ATTEMPTS) {
          timer = setTimeout(poll, POLL_INTERVAL_MS);
        } else {
          setPhase({ kind: "payment-error" });
        }
      }
    };

    poll();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [sessionId, phase.kind, submit]);

  if (phase.kind === "missing-session") {
    return (
      <PetErrorState
        title={t.success.sessionMissingTitle}
        text={t.success.sessionMissingText}
        ctaLabel={t.success.backToHome}
        ctaHref={`/?lang=${lang}`}
      />
    );
  }

  if (phase.kind === "payment-error") {
    return (
      <PetErrorState
        title={t.success.paymentRequiredTitle}
        text={t.success.paymentRequiredText}
        ctaLabel={t.success.backToForm}
        ctaHref={`/pet-compatibility?lang=${lang}`}
      />
    );
  }

  if (phase.kind === "verifying") {
    return (
      <PetLoading title={t.success.waitingPayment} sub={t.loading.sub} />
    );
  }

  if (error && !object) {
    return (
      <PetErrorState
        title={t.success.paymentRequiredTitle}
        text={t.form.errorNetwork}
        ctaLabel={t.success.backToForm}
        ctaHref={`/pet-compatibility?lang=${lang}`}
      />
    );
  }

  if (!object) {
    return (
      <PetLoading
        title={t.success.streamingTitle}
        sub={t.success.streamingSub}
      />
    );
  }

  return (
    <PetReadingView reading={object} isStreaming={isLoading} t={t} />
  );
}
