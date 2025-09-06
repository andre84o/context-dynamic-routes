// Fil: src/components/FavoriteButton/index.tsx
"use client";

import { UseUserContext } from "@/utils/context";
import { UserContextType } from "@/utils/types";
import { useMemo } from "react";
import { CiHeart } from "react-icons/ci"; // tomt hjärta
import { FaHeart } from "react-icons/fa"; // ifyllt hjärta

export default function FavoriteButton({
  id,
  className = "",
}: {
  id: string;
  className?: string;
}) {

  const { user, setUser } = UseUserContext() as UserContextType;

 
  const isFav = useMemo(
    () => !!user?.favouriteRecipes?.includes(id),
    [user, id]
  );


  const toggle = () => {
    if (!user) return; 
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
      className={`p-1 ${className}`}
    >
      {isFav ? <FaHeart size={22} /> : <CiHeart size={24} />}
    </button>
  );
}
