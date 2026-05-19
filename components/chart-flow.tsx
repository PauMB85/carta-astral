"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type SubmitEvent,
} from "react";
import Image from "next/image";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { readingSchema } from "@natal/domain/reading";
import type { NatalInput } from "@natal/domain/natal-input";
import type { Lang } from "@shared/domain/lang";
import type { Dictionary } from "@/lib/i18n";
import { ConsultForm } from "@/components/chart-form";
import { ReadingView } from "@/components/chart-reading-view";

type Props = {
  lang: Lang;
  formCopy: Dictionary["form"];
  readingCopy: Dictionary["reading"];
  petCopy: Dictionary["pet"];
};

export function ChartFlow({ lang, formCopy, readingCopy, petCopy }: Props) {
  const [nombre, setNombre] = useState<string | null>(null);
  const [rateLimited, setRateLimited] = useState(false);
  const lastSubmittedInputRef = useRef<NatalInput | null>(null);

  const customFetch = useCallback<typeof fetch>(async (input, init) => {
    setRateLimited(false);
    const response = await fetch(input, init);
    if (response.status === 429) {
      setRateLimited(true);
    }
    return response;
  }, []);

  const { object, submit, isLoading, error, stop, clear } = useObject({
    api: "/api/carta",
    schema: readingSchema,
    fetch: customFetch,
  });

  useEffect(() => {
    const natalInput = lastSubmittedInputRef.current;
    if (!isLoading && object?.status === "ok" && natalInput) {
      sessionStorage.setItem(
        "heda:lastReading:v1",
        JSON.stringify({
          natalInput,
          reading: object,
        }),
      );
    }
  }, [isLoading, object]);

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload: NatalInput = {
      nombre: getString(data, "nombre") || undefined,
      fecha: getString(data, "fecha"),
      hora: getString(data, "hora") || undefined,
      lugar: getString(data, "lugar") || undefined,
      interest: getString(data, "interest") === "amor" ? "amor" : "general",
      lang,
    };
    setNombre(payload.nombre ?? null);
    lastSubmittedInputRef.current = payload;
    submit(payload);
  };

  const handleReset = () => {
    stop();
    clear();
    setNombre(null);
    setRateLimited(false);
  };

  const showReading = Boolean(object) || isLoading || rateLimited;

  return (
    <section
      id="form"
      className="relative px-5 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-24"
    >
      <div
        className="relative max-w-180 mx-auto border border-gold py-14 px-7"
        style={{
          background: `linear-gradient(180deg, rgba(26,22,13,0.95), rgba(11,10,8,0.98))`,
        }}
      >
        <div
          aria-hidden="true"
          className="absolute pointer-events-none inset-3 border border-gold-faint-30"
        />
        <Image
          src="/galgo-astral-logo.png"
          alt=""
          aria-hidden="true"
          width={1024}
          height={1536}
          priority
          className="absolute left-1/2 -translate-x-1/2 -top-12.5 w-22 h-22 sm:w-27.5 sm:h-27.5 object-contain rounded-full p-3 bg-dark border border-gold"
        />

        <div className="relative pt-8 sm:px-12">
          {showReading ? (
            <ReadingView
              reading={object}
              nombre={nombre}
              isStreaming={isLoading}
              error={error}
              rateLimited={rateLimited}
              onReset={handleReset}
              t={readingCopy}
              lang={lang}
              petCopy={petCopy}
            />
          ) : (
            <ConsultForm
              t={formCopy}
              isLoading={isLoading}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </section>
  );
}

function getString(data: FormData, key: string): string {
  const value = data.get(key);
  return typeof value === "string" ? value.trim() : "";
}
