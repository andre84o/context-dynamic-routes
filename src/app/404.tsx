"use client";

import { useSearchParams } from "next/navigation";

export default function NotFoundPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  return <div>404 – Sidan kunde inte hittas {code && `(kod: ${code})`}</div>;
}
