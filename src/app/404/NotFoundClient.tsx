"use client";

import { useSearchParams } from "next/navigation";

export default function NotFoundClient() {
  const params = useSearchParams();
  const code = params.get("code");

  return <div>404 – Sidan kunde inte hittas {code && `(kod: ${code})`}</div>;
}
