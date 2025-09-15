"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Meal } from "@/utils/types";
import { UseUserContext } from "@/utils/context";

export default function FavoritesSection({
  ids,
  showAll = false,
}: {
  ids: string[];
  showAll?: boolean;
}) {
  const { getMealById, user, guestFavorites } = UseUserContext() as any;
  const idsToLoad = (user ? (showAll ? ids : ids.slice(-3)) : guestFavorites.slice(-3)).reverse();

  const [meals, setMeals] = useState<Meal[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!idsToLoad.length) {
      setMeals([]);
      setErr(null);
      return;
    }
    let active = true;
    const load = async () => {
      try {
        setLoading(true);
        setErr(null);
        const res = await Promise.all(
          idsToLoad.map((id: string) => getMealById(String(id)))
        );
        if (active) {
          setMeals(res.filter(Boolean) as Meal[]);
          setErr(null);
        }
      } catch {
        if (active) {
          setErr("Failed to load favorites");
          setMeals([]);
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [idsToLoad.join(","), getMealById]);

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">
          {showAll ? "All Favorites" : "Your last 3 favorites"}
        </h2>
      </div>
      {err && <p className="text-sm text-red-600 mb-2">{err}</p>}
      {loading && !meals.length ? (
        <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {(idsToLoad.length ? idsToLoad : ["1","2","3"]).slice(0,3).map((k: string) => (
            <li key={String(k)} className="animate-pulse border rounded-xl p-3 flex flex-col gap-3 bg-white w-full max-w-72">
              <div className="aspect-[4/3] w-full rounded-md bg-black/10" />
              <div className="h-4 bg-black/10 rounded w-3/4" />
              <div className="h-3 bg-black/10 rounded w-1/2" />
              <div className="mt-auto h-6 bg-black/10 rounded w-full" />
            </li>
          ))}
        </ul>
      ) : !meals.length ? (
        <p className="text-sm">No favorites yet.</p>
      ) : (
        <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {meals.map((meal) => {
            const card = (
              <div className="group relative flex flex-col h-full">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md border border-black/5 bg-black/5">
                  <Image
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    fill
                    sizes="256px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-3 text-sm font-semibold leading-tight line-clamp-2">
                  {meal.strMeal}
                </h3>
                <span className="mt-auto pt-3 text-xs text-blue-600 group-hover:underline">View details</span>
              </div>
            );
            return (
              <li
                key={meal.idMeal}
                className="border border-gray-200 rounded-xl p-3 flex flex-col bg-white/40 shadow-sm hover:shadow-md transition w-full max-w-72"
              >
                <Link
                  href={`/page/meal/${meal.idMeal}`}
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 rounded-md h-full"
                >
                  {card}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
