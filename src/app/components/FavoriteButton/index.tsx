// Fil: src/components/FavoriteButton/index.tsx
"use client";

import { UseUserContext } from "@/utils/context";
import { UserContextType } from "@/utils/types";
import { useMemo } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

export default function FavoriteButton({
  id,
  className = "",
}: {
  id: string;
  className?: string;
}) {
  const { user, setUser, openLogin } = UseUserContext() as UserContextType;

  const isFav = useMemo(
    () => !!user?.favouriteRecipes?.includes(id),
    [user, id]
  );

  const toggle = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation(); // Svenska: stoppa klick från att bubbla upp till ev länk

    if (!user) {
      openLogin(); // Svenska: inte inloggad öppna popup
      return;
    }

    // Svenska: uppdatera favoriter lokalt
    const list = new Set(user.favouriteRecipes ?? []);
    isFav ? list.delete(id) : list.add(id);
    const updated = { ...user, favouriteRecipes: Array.from(list) };
    setUser(updated);
    try {
      localStorage.setItem("user", JSON.stringify(updated));
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
      title={
        user
          ? isFav
            ? "Remove from favorites"
            : "Add to favorites"
          : "Sign in to save"
      }
      className={`p-1 -translate-y-5 -translate-x-5 btn-action cursor-pointer${className}`}
      type="button"
    >
      {isFav ? <FaHeart size={22} /> : <CiHeart size={24} />}
    </button>
  );
}
