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
  const { getMealById, user, guestFavorites } = UseUserContext();

  const baseIds = user ? ids : guestFavorites;
  const fetchCandidateIds = showAll ? baseIds : baseIds.slice(-8);
  const fetchKey = fetchCandidateIds.join(",");

  const [meals, setMeals] = useState<Meal[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!fetchCandidateIds.length) {
      setMeals([]);
      setErr(null);
      return;
    }
    let active = true;
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const results = await Promise.all(
          fetchCandidateIds.map((id) => getMealById(String(id)))
        );
        if (!active) return;
        const valid = (results.filter(Boolean) as Meal[]);
        const orderedValid = fetchCandidateIds
          .map(id => valid.find(m => m.idMeal === id))
          .filter(Boolean) as Meal[];
        const finalMeals = showAll ? orderedValid : orderedValid.slice(-3).reverse(); // reverse -> newest first for display
        setMeals(finalMeals);
      } catch {
        if (active) {
          setErr("Failed to load favorites");
          setMeals([]);
        }
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [fetchKey, getMealById, showAll]);

  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between items-center gap-2 mb-4 text-center">
        <h2 className="text-2xl font-semibold w-full text-center sm:text-left">
          {showAll ? "All Favorites" : "Your last 3 favorites"}
        </h2>
      </div>
      {err && <p className="text-sm text-red-600 mb-2 text-center">{err}</p>}
      {loading && !meals.length ? (
        <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center w-full">
          {(fetchCandidateIds.length ? fetchCandidateIds.slice(-3) : ["1","2","3"]).map((k: string) => (
            <li key={String(k)} className="animate-pulse border rounded-xl p-3 flex flex-col gap-3 bg-white w-full max-w-72">
              <div className="aspect-[4/3] w-full rounded-md bg-black/10" />
              <div className="h-4 bg-black/10 rounded w-3/4" />
              <div className="h-3 bg-black/10 rounded w-1/2" />
              <div className="mt-auto h-6 bg-black/10 rounded w-full" />
            </li>
          ))}
        </ul>
      ) : !meals.length ? (
        <p className="text-sm text-center">No favorites yet.</p>
      ) : (
        <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center w-full">
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
                <h3 className="mt-3 text-sm font-semibold leading-tight line-clamp-2 text-center">
                  {meal.strMeal}
                </h3>
                <span className="mt-auto pt-3 text-xs text-blue-600 group-hover:underline text-center">View details</span>
              </div>
            );
            return (
              <li
                key={meal.idMeal}
                className="border border-gray-200 rounded-xl p-3 flex flex-col bg-white/40 shadow-sm hover:shadow-md transition w-full max-w-72"
              >
                <Link
                  href={`/page/item/${meal.idMeal}`}
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
