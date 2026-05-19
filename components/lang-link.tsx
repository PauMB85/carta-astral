"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import type { Lang } from "@shared/domain/lang";

type Props = {
  targetLang: Lang;
  current: Lang;
  children: ReactNode;
};

export function LangLink({ targetLang, current, children }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams?.toString());
  params.set("lang", targetLang);
  const href = `${pathname}?${params.toString()}`;

  const isActive = current === targetLang;
  return (
    <Link
      href={href}
      replace
      scroll={false}
      aria-current={isActive ? "true" : undefined}
      className={`transition-colors ${isActive ? "text-gold-bright" : "text-cream/40"}`}
    >
      {children}
    </Link>
  );
}
