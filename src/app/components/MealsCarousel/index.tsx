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
        <ul className="flex gap-6 min-w-max">
          {meals.map((m) => (
            <li
              key={m.idMeal}
              className="border border-gray-200 rounded-xl p-3 flex-shrink-0 flex flex-col bg-white/40 shadow-sm hover:shadow-md transition w-64 max-w-72"
            >
              <div className="group relative flex flex-col h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 rounded-md">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md border border-black/5 bg-black/5">
                  <Image
                    src={m.strMealThumb}
                    alt={m.strMeal}
                    fill
                    sizes="256px"
                    className="object-cover"
                  />
                  <span className="absolute left-7 top-7 z-20">
                    <FavoriteButton id={m.idMeal} className="" />
                  </span>
                </div>
                <h3 className="mt-3 text-sm font-semibold leading-tight line-clamp-2">
                  {m.strMeal}
                </h3>
                <span className="mt-auto pt-3 text-xs text-blue-600">View details</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
