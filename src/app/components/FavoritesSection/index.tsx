// Fil: src/components/FavoritesSection/index.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Meal } from "@/utils/types";
import { UseUserContext } from "@/utils/context";

export default function FavoritesSection({
  ids,
  showAll = false, // Svenska: true = visa alla, false = visa sista tre
}: {
  ids: string[];
  showAll?: boolean;
}) {
  const { getMealById } = UseUserContext() as {
    getMealById: (id: string) => Promise<Meal | null>;
  };

  // Svenska: bestäm vilka ID som ska hämtas
  const idsToLoad = (showAll ? ids : ids.slice(-3)).reverse();

  const [meals, setMeals] = useState<Meal[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!idsToLoad.length) {
      setMeals([]);
      setErr(null);
      return;
    }
    const load = async () => {
      try {
        const res = await Promise.all(
          idsToLoad.map((id) => getMealById(String(id)))
        );
        setMeals(res.filter(Boolean) as Meal[]);
        setErr(null);
      } catch {
        setErr("Failed to load favorites");
        setMeals([]);
      }
    };
    load();
  }, [idsToLoad.join(","), getMealById]);

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">
        {showAll ? "All Favorites" : "Your last 3 favorites"}
      </h2>
      {err && <p className="text-sm text-red-600">{err}</p>}
      {!meals.length ? (
        <p className="text-sm">No favorites yet.</p>
      ) : (
        <ul className="grid gap-4 grid-cols-1 md:grid-cols-3 justify-items-center">
          {meals.map((meal) => (
            <li
              key={meal.idMeal}
              className="border rounded p-4 w-64 flex flex-col items-center"
            >
              {/* Svenska: Bilden länkar till detaljsidan */}
              <Link href={`/meal/${meal.idMeal}`}>
                <Image
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  width={200}
                  height={200}
                  className="rounded"
                />
              </Link>
              <h3 className="text-lg font-medium mt-2 text-center">
                {meal.strMeal}
              </h3>
              <Link
                href={`/meal/${meal.idMeal}`}
                className="mt-auto px-3 py-1 border rounded"
              >
                View
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
