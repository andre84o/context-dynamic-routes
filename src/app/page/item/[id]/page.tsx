"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import FavoriteButton from "@/components/FavoriteButton";
import { UseUserContext } from "@/utils/context";
import type { UserContextType, Meal } from "@/utils/types";
import Link from "next/link";

export default function ItemPage() {
  const { id } = useParams<{ id: string }>();
  const { getMealById, getMealsByCategory, openLogin, user } = UseUserContext() as UserContextType;
  const [meal, setMeal] = useState<Meal | null>(null);
  const [moreMeals, setMoreMeals] = useState<Meal[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const m = await getMealById(id);
        if (!alive) return;
        setMeal(m);
        setErr(null);
        if (m?.strCategory) {
          const more = await getMealsByCategory(m.strCategory);
          if (alive) setMoreMeals(more.filter(me => me.idMeal !== id).slice(0, 5));
        }
      } catch (e: any) {
        if (alive) {
          setErr(e?.message ?? "Error");
          setMeal(null);
        }
      }
    })();
    return () => { alive = false; };
  }, [id, getMealById, getMealsByCategory]);

  if (err) return <main className="p-6">Error: {err}</main>;
  if (!meal) return <main className="p-6">Loading...</main>;

  // Parse ingredients and measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}` as keyof Meal];
    const meas = meal[`strMeasure${i}` as keyof Meal];
    if (ing && ing.trim()) {
      ingredients.push({ ingredient: ing, measure: meas });
    }
  }

  return (
    <main className="p-6 max-w-3xl mx-auto flex flex-col gap-8">
      <section className="flex flex-col md:flex-row gap-8 items-start">
        <div className="relative w-full max-w-xs aspect-[4/3] rounded-xl overflow-hidden shadow">
          <Image src={meal.strMealThumb} alt={meal.strMeal} fill sizes="320px" className="object-cover" />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <h1 className="text-2xl font-bold mb-2">{meal.strMeal}</h1>
          <p className="text-sm text-gray-700 mb-2">{meal.strCategory} &middot; {meal.strArea}</p>
          <div className="flex items-center gap-2 mb-4">
            <FavoriteButton id={meal.idMeal} />
          </div>
          <h2 className="text-lg font-semibold mt-4 mb-2">Ingredients</h2>
          <ul className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
            {ingredients.map((item, idx) => (
              <li key={idx} className="text-sm">
                <span className="font-medium">{item.ingredient}</span>: {item.measure}
              </li>
            ))}
          </ul>
          <h2 className="text-lg font-semibold mt-4 mb-2">Instructions</h2>
          <p className="whitespace-pre-line text-sm text-gray-800 mb-4">{meal.strInstructions}</p>
        </div>
      </section>
      {meal.strCategory && moreMeals.length > 0 && (
        <section className="mt-8">
          <h3 className="text-md font-semibold mb-2">More from {meal.strCategory}</h3>
          <ul className="flex gap-4 overflow-x-auto pb-2">
            {moreMeals.map(m => (
              <li key={m.idMeal} className="min-w-[160px] max-w-[180px]">
                <Link href={`/page/meal/${m.idMeal}`} className="block group">
                  <div className="relative aspect-[4/3] w-full rounded-md overflow-hidden border shadow">
                    <Image src={m.strMealThumb} alt={m.strMeal} fill sizes="160px" className="object-cover group-hover:scale-105 transition" />
                  </div>
                  <div className="mt-2 text-xs font-medium group-hover:text-[#E63E33] line-clamp-2">{m.strMeal}</div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
