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
  const { user, setUser, guestFavorites, addGuestFavorite, removeGuestFavorite, openLogin } = UseUserContext() as UserContextType;

  const isFav = useMemo(
    () => (user?.favouriteRecipes?.includes(id) || guestFavorites.includes(id)),
    [user, guestFavorites, id]
  );

  const toggle = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.stopPropagation();
      if (e.preventDefault) e.preventDefault();
    }

    if (!user) {
      openLogin();
      return;
    }

    const list = new Set(user.favouriteRecipes ?? []);
    if (isFav) {
      list.delete(id);
    } else {
      list.add(id);
    }
    const updated = { ...user, favouriteRecipes: Array.from(list) };
    setUser(updated);
    try {
      localStorage.setItem("user", JSON.stringify(updated));
      localStorage.setItem(`favorites:${updated.name}`, JSON.stringify(updated.favouriteRecipes));
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
      title={user ? (isFav ? "Remove from favorites" : "Add to favorites") : "Log in to save"}
  className={`p-1 btn-action cursor-pointer inline-flex items-center justify-center rounded-md bg-white/80 backdrop-blur hover:bg-white shadow-sm hover:shadow transition border border-black/10 ${className}`}
      type="button"
    >
      {isFav ? <FaHeart size={22} color="#E63E33" /> : <CiHeart size={24} />}
    </button>
  );
}
