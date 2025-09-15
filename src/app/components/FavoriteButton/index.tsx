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
  const { user, setUser, openLogin, guestFavorites, addGuestFavorite, removeGuestFavorite } = UseUserContext() as UserContextType;

  // Favorit om inloggad eller om id finns i guestFavorites
  const isFav = useMemo(
    () => (user?.favouriteRecipes?.includes(id) || guestFavorites.includes(id)),
    [user, guestFavorites, id]
  );

  const toggle = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();

    if (!user) {
      // Spara till guestFavorites i localStorage
      if (guestFavorites.includes(id)) {
        removeGuestFavorite(id);
      } else {
        addGuestFavorite(id);
      }
      return;
    }

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
          : "Save as guest"
      }
      className={`p-1 -translate-y-7 -translate-x-7 btn-action cursor-pointer${className}`}
      type="button"
    >
      {isFav ? <FaHeart size={22} color="#E63E33" /> : <CiHeart size={24} />}
    </button>
  );
}
