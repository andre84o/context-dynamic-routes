"use client";
import { UseUserContext } from "@/utils/context";
import type { UserContextType, Meal } from "@/utils/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";

export default function ProfilePage() {
  const { user, getMealById } = UseUserContext() as UserContextType;
  const [meals, setMeals] = useState<Meal[]>([]);
  const [err, setErr] = useState<string | null>(null);

  const favouriteRecipesKey = user?.favouriteRecipes?.join(",") || "";
  useEffect(() => {
    const load = async () => {
      if (!favouriteRecipesKey) {
        setMeals([]);
        setErr(null);
        return;
      }
      try {
        const ids = favouriteRecipesKey.split(",").filter(Boolean);
        const results = await Promise.all(ids.map((id) => getMealById(String(id))));
        setMeals(results.filter(Boolean) as Meal[]);
        setErr(null);
      } catch {
        setErr("Failed to load favorites");
        setMeals([]);
      }
    };
    load();
  }, [favouriteRecipesKey, getMealById]);

  return (
    <main className="relative min-h-[calc(100dvh-48px)] w-full flex items-start justify-center px-4 py-10 md:py-16">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/5 via-white to-white" />
      <div className="w-full max-w-5xl flex flex-col gap-10">
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">Profile Page</h1>
            {user && (
              <p className="mt-2 text-sm text-black/70">
                Name: <span className="font-medium text-black">{user.name}</span>
              </p>
            )}
            {user && user.favouriteCategory && (
              <p className="mt-1 text-sm text-black/70">
                Favourite Category: <span className="font-medium text-black">{user.favouriteCategory}</span>
              </p>
            )}
          </div>
        </header>

        <section className="bg-white/70 backdrop-blur rounded-2xl border border-black/5 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.1)] p-6 md:p-8">
          {user ? (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl font-semibold">All Favorites</h2>
                {err && <p className="text-sm text-red-600">{err}</p>}
              </div>
              {meals.length ? (
                <ul className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(140px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(160px,1fr))]">
                  {meals.map((meal) => (
                    <li
                      key={meal.idMeal}
                      className="group relative rounded-xl overflow-hidden bg-white border border-black/5 shadow-sm hover:shadow-md transition flex flex-col"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden">
                        <Link href={`/page/item/${meal.idMeal}`} className="block w-full h-full">
                          <Image
                            src={meal.strMealThumb}
                            alt={meal.strMeal}
                            fill
                            sizes="200px"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </Link>
                        <div className="absolute left-2 top-2 z-10">
                          <FavoriteButton id={meal.idMeal} />
                        </div>
                      </div>
                      <div className="flex flex-col flex-1 p-3">
                        <p className="text-xs font-medium leading-snug line-clamp-2 mb-2">
                          {meal.strMeal}
                        </p>
                        <div className="mt-auto">
                          <Link
                            href={`/page/item/${meal.idMeal}`}
                            className="inline-flex items-center justify-center w-full text-[11px] font-medium tracking-wide px-3 py-2 rounded-md border border-black/10 bg-black text-white hover:bg-white hover:text-black hover:border-black transition"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-black/60">No favorites yet.</p>
              )}
            </div>
          ) : (
            <p className="text-sm text-black/70">Please log in to view your profile.</p>
          )}
        </section>
      </div>
    </main>
  );
}
