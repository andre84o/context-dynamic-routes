"use client";
import { useEffect } from "react";
import { UseUserContext } from "@/utils/context";
import { UserContextType } from "@/utils/types";

export default function HydrateUser() {
  const { user, setUser } = UseUserContext() as UserContextType;

  useEffect(() => {
    if (!user) {
      const raw = localStorage.getItem("user");
      if (raw) {
        try {
          const u = JSON.parse(raw);
          if (!Array.isArray(u.favouriteRecipes)) u.favouriteRecipes = [];
          // Load per-user persisted favorites if available
          try {
            const favRaw = localStorage.getItem(`favorites:${u.name}`);
            if (favRaw) {
              const favArr = JSON.parse(favRaw);
              if (Array.isArray(favArr)) {
                u.favouriteRecipes = favArr.filter((x: any) => typeof x === 'string');
              }
            }
          } catch {}
          setUser(u);
        } catch {}
      }
    }
  }, [user, setUser]);

  return null;
}
