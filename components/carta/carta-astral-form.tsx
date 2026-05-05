"use client";

import { useState, type FormEvent } from "react";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { readingSchema, type BirthInput } from "@/lib/schema";
import { MysticInput } from "./mystic-input";
import { InterestToggle } from "./interest-toggle";
import { SubmitButton } from "./submit-button";
import { Reading } from "./reading";

export function CartaAstralForm() {
  const { object, submit, isLoading, error, stop, clear } = useObject({
    api: "/api/carta",
    schema: readingSchema,
  });
  const [nombre, setNombre] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload: BirthInput = {
      nombre: getString(data, "nombre") || undefined,
      fecha: getString(data, "fecha"),
      hora: getString(data, "hora") || undefined,
      lugar: getString(data, "lugar") || undefined,
      interest: getString(data, "interest") === "amor" ? "amor" : "general",
    };
    setNombre(payload.nombre ?? null);
    submit(payload);
  };

  const handleReset = () => {
    stop();
    clear();
    setNombre(null);
  };

  if (object || isLoading) {
    return (
      <Reading
        reading={object}
        nombre={nombre}
        isStreaming={isLoading}
        error={error}
        onReset={handleReset}
      />
    );
  }

  return (
    <FormShell>
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        noValidate
        aria-busy={isLoading}
      >
        <MysticInput
          icon={<User className="w-4 h-4" />}
          label="Nombre del alma"
          name="nombre"
          type="text"
          placeholder="¿Cómo te llaman las estrellas?"
          autoComplete="given-name"
        />

        <MysticInput
          icon={<Calendar className="w-4 h-4" />}
          label="Fecha de nacimiento"
          name="fecha"
          type="date"
          required
        />

        <MysticInput
          icon={<Clock className="w-4 h-4" />}
          label="Hora de nacimiento"
          name="hora"
          type="time"
        />

        <MysticInput
          icon={<MapPin className="w-4 h-4" />}
          label="Lugar de nacimiento"
          name="lugar"
          type="text"
          placeholder="Ciudad, país..."
          autoComplete="address-level2"
        />

        <InterestToggle />

        <div className="pt-4">
          <SubmitButton pending={isLoading} />
          <p className="text-center font-body italic text-amber-100/40 text-xs mt-4 tracking-wider">
            — Los datos se consultan solo en este momento —
          </p>
        </div>
      </form>
    </FormShell>
  );
}

function FormShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative fade-up" style={{ animationDelay: "0.15s" }}>
      <Corner position="tl" />
      <Corner position="tr" />
      <Corner position="bl" />
      <Corner position="br" />

      <div
        className="relative rounded-sm p-7 sm:p-10 shimmer-border"
        style={{
          background:
            "linear-gradient(180deg, rgba(30, 18, 50, 0.65) 0%, rgba(15, 8, 28, 0.75) 100%)",
          border: "1px solid rgba(212, 175, 55, 0.25)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="text-center mb-8">
          <p className="font-display text-xs text-starlight-200/70 uppercase tracking-[0.3em] mb-2">
            Consulta a los Astros
          </p>
          <p className="font-body text-starlight-50/70 italic">
            Revela los datos de tu nacimiento y las estrellas hablarán
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}

function Corner({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const map = {
    tl: "-top-3 -left-3 border-t border-l",
    tr: "-top-3 -right-3 border-t border-r",
    bl: "-bottom-3 -left-3 border-b border-l",
    br: "-bottom-3 -right-3 border-b border-r",
  };
  return (
    <span
      aria-hidden="true"
      className={`absolute w-8 h-8 border-amber-400/40 ${map[position]}`}
    />
  );
}

function getString(data: FormData, key: string): string {
  const value = data.get(key);
  return typeof value === "string" ? value.trim() : "";
}
