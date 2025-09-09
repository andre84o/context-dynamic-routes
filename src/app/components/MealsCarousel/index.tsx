"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import FavoriteButton from "@/components/FavoriteButton";

type Meal = { idMeal: string; strMeal: string; strMealThumb: string };

export default function MealsCarousel({ category }: { category: string }) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    const run = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
            category
          )}`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("Failed to load meals");
        const data: { meals?: Meal[] } = await res.json();
        if (alive) setMeals(data.meals ?? []);
      } catch (e: any) {
        if (alive) setError(e.message ?? "Error");
      }
    };
    run();
    return () => {
      alive = false;
    };
  }, [category]);

  if (error) return <p className="text-sm">Error: {error}</p>;
  if (!meals.length) return <p className="text-sm">No meals found.</p>;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="px-2 py-1 border rounded text-xs btn-action cursor-pointer">
          Your favorite category: {category}
        </span>
      </div>
      <div className="w-full overflow-x-auto">
        <ul className="flex gap-4 min-w-max">
          {meals.map((m) => (
            <li
              key={m.idMeal}
              className="border rounded p-2 w-56 flex-shrink-0 flex flex-col items-center"
            >
              {/* Svensk kommentar: Hjärtat kan spara recept-id i favoritlistan */}
              <div className="relative">
                <FavoriteButton
                  id={m.idMeal}
                  className="absolute left-2 top-2"
                />
                <img
                  src={m.strMealThumb}
                  alt={m.strMeal}
                  width={200}
                  height={140}
                />
              </div>
              <p className="text-sm mt-2 text-center">{m.strMeal}</p>
              <button className="mt-auto px-3 py-1 border rounded cursor-pointer btn-action">
                View
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
