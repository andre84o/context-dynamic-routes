// Fil: src/app/page/profile/page.tsx
"use client";

import { UseUserContext } from "@/utils/context";
import type { UserContextType, Meal } from "@/utils/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  const { user, getMealById } = UseUserContext() as UserContextType;
  const [meals, setMeals] = useState<Meal[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!user?.favouriteRecipes?.length) {
        setMeals([]);
        setErr(null);
        return;
      }
      try {
        const results = await Promise.all(
          user.favouriteRecipes.map((id) => getMealById(String(id)))
        );
        setMeals(results.filter(Boolean) as Meal[]);
        setErr(null);
      } catch {
        setErr("Failed to load favorites");
        setMeals([]);
      }
    };
    load();
  }, [user?.favouriteRecipes?.join(","), getMealById]);

  return (
    <main className="min-h-screen w-full flex items-center justify-center">
      <div className="flex w-100 h-120 flex-col items-center gap-2 border-1 rounded-xl">
        <h1 className="flex justify-center items-center font-bold p-2 mt-3">
          Profile Page
        </h1>

        {user ? (
          <div className="space-y-4">
            <p className="w-full p-2 border rounded-lg">Name: {user.name}</p>
            <p className="w-full p-2 border rounded-lg">
              Favourite Category: {user.favouriteCategory}
            </p>

            <div className="w-full p-2 border rounded-lg">
              <h2 className="font-semibold mb-2">All Favorites</h2>
              {err && <p className="text-sm text-red-600">{err}</p>}

              {meals.length ? (
                <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                  {meals.map((meal) => (
                    <li
                      key={meal.idMeal}
                      className="border rounded p-2 flex flex-col items-center"
                    >
                      {/* Svenska: Bilden länkar till måltidens sida */}
                      <Link href={`/page/meal/${meal.idMeal}`}>
                        <Image
                          src={meal.strMealThumb}
                          alt={meal.strMeal}
                          width={150}
                          height={150}
                          className="rounded"
                        />
                      </Link>
                      <p className="mt-2 text-center text-sm">{meal.strMeal}</p>
                      <Link
                        href={`/page/meal/${meal.idMeal}`}
                        className="mt-auto px-3 py-1 border rounded btn-action cursor-pointer"
                      >
                        View
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm">No favorites yet.</p>
              )}
            </div>
          </div>
        ) : (
          <p>Please log in to view your profile.</p>
        )}
      </div>
    </main>
  );
}
