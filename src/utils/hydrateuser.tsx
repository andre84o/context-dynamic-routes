// Fil: src/utils/hydrateuser.tsx
"use client";
import { useEffect } from "react";
import { UseUserContext } from "@/utils/context";
import { UserContextType } from "@/utils/types";

export default function HydrateUser() {
  const { user, setUser } = UseUserContext() as UserContextType;

  useEffect(() => {
    // Svensk kommentar: Läs sparad user och se till att favouriteRecipes alltid är en array
    if (!user) {
      const raw = localStorage.getItem("user");
      if (raw) {
        try {
          const u = JSON.parse(raw);
          if (!Array.isArray(u.favouriteRecipes)) u.favouriteRecipes = [];
          setUser(u);
        } catch {}
      }
    }
  }, [user, setUser]);

  return null;
}
