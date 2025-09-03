'use client';
import { useEffect } from "react";
import { UseUserContext } from "@/utils/context";
import type { UserContextType } from "@/utils/types";

export default function HydrateUser() {
  const { setUser } = UseUserContext() as UserContextType;

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, [setUser]);

  return null;
}