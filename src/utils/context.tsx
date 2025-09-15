// Fil: src/utils/context.tsx
"use client";

import { createContext, useContext, useRef, useState, useCallback } from "react";
import React from "react";
import type { UserContextType, UserType, Meal, Category } from "./types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [guestFavorites, setGuestFavorites] = useState<string[]>([]);

  // Synka modal med ?login=1 i URL och stäng vid inloggning
  const sp = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Öppna modal om ?login=1 och ingen user
  React.useEffect(() => {
    const shouldOpen = !user && sp.get("login") === "1";
    setShowLogin(shouldOpen);
  }, [sp, user]);

  // Ladda guestFavorites från localStorage på mount
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("guestFavorites");
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) {
          setGuestFavorites(arr.filter((x) => typeof x === "string"));
        }
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  // Spara guestFavorites vid förändring
  React.useEffect(() => {
    try {
      localStorage.setItem("guestFavorites", JSON.stringify(guestFavorites));
    } catch {
      // ignore quota errors
    }
  }, [guestFavorites]);

  // Vid inloggning: slå ihop guestFavorites med user.favouriteRecipes och rensa guestFavorites
  React.useEffect(() => {
    if (!user) return;
    closeLogin();
    // Slå ihop guestFavorites med user.favouriteRecipes om det finns något
    if (guestFavorites.length) {
      setUser((prev) => {
        if (!prev) return prev;
        const merged = Array.from(new Set([...(prev.favouriteRecipes ?? []), ...guestFavorites]));
        return { ...prev, favouriteRecipes: merged };
      });
      setGuestFavorites([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const openLogin = () => {
    setShowLogin(true);
    const params = new URLSearchParams(sp.toString());
    params.set("login", "1");
    router.replace(`${pathname}?${params}`, { scroll: false });
  };

  const closeLogin = () => {
    setShowLogin(false);
    const params = new URLSearchParams(sp.toString());
    params.delete("login");
    router.replace(`${pathname}${params.size ? `?${params}` : ""}`, { scroll: false });
  };

  // Guest favorites helpers (ignoreras om user är inloggad – då hanteras favorites separat senare)
  const addGuestFavorite = (id: string) => {
    if (user) return;
    setGuestFavorites((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const removeGuestFavorite = (id: string) => {
    if (user) return;
    setGuestFavorites((prev) => prev.filter((x) => x !== id));
  };

  // Svensk kommentar: Enkla in-memory caches så vi slipper hämta samma sak flera gånger
  const catCache = useRef(new Map<string, Meal[]>());
  const mealCache = useRef(new Map<string, Meal>());
  // Enkel cache av kategorier i minnet
  const categoriesCache = useRef<Category[] | null>(null);

  const getCategories = useCallback(async (): Promise<Category[]> => {
    if (categoriesCache.current) return categoriesCache.current;
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load categories");
    const data = await res.json();
    const list = (data?.categories ?? []) as Category[];
    categoriesCache.current = list;
    return list;
  }, []);

  // Svensk kommentar: Hämta alla meals i en kategori (ThemealDB filter.php?c=)
  const getMealsByCategory = async (category: string): Promise<Meal[]> => {
    const key = category.toLowerCase();
    const hit = catCache.current.get(key);
    if (hit) return hit;

    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
        category
      )}`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Failed to load category");
    const data = await res.json();
    const list = (data?.meals ?? []) as Meal[];
    catCache.current.set(key, list);
    return list;
  };

  // Svenska: Hämtar en måltid via ID och cachear i minnet
  const getMealById = useCallback(async (id: string): Promise<Meal | null> => {
    const key = String(id);
    const hit = mealCache.current.get(key);
    if (hit) return hit;
    const r = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(key)}`,
      { cache: "no-store" }
    );
    if (!r.ok) return null;
    const data = await r.json();
    const meal = (data?.meals?.[0] as Meal) ?? null;
    if (meal) mealCache.current.set(key, meal);
    return meal;
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        getMealsByCategory,
        getMealById,
        showLogin,
        openLogin,
        closeLogin,
        getCategories,
        guestFavorites,
        addGuestFavorite,
        removeGuestFavorite,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UseUserContext = () => {
  const ctx = useContext(UserContext);
  if (!ctx)
    throw new Error("UseUserContext must be used within UserContextProvider");
  return ctx;
};
