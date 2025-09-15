"use client";
import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";
import { UseUserContext } from "@/utils/context";
import type { Meal, UserContextType } from "@/utils/types";

interface MealDetailProps {
  id: string;
  showRelated?: boolean;
}

export default function MealDetail({ id, showRelated = true }: MealDetailProps) {
  const { getMealById, getMealsByCategory } = UseUserContext() as UserContextType;
  const [meal, setMeal] = useState<Meal | null>(null);
  const [related, setRelated] = useState<Meal[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const m = await getMealById(String(id));
        if (!alive) return;
        setMeal(m);
        setErr(null);
        if (showRelated && m?.strCategory) {
          try {
            const more = await getMealsByCategory(m.strCategory);
            if (alive) {
              setRelated(more.filter(mm => mm.idMeal !== String(id)).slice(0, 8));
            }
          } catch {/* ignore related errors */}
        } else if (!showRelated) {
          setRelated([]);
        }
      } catch (e) {
        if (alive) {
          const message = e instanceof Error ? e.message : "Failed to load meal";
          setErr(message);
          setMeal(null);
        }
      }
    })();
    return () => { alive = false; };
  }, [id, showRelated, getMealById, getMealsByCategory]);

  const ingredients = useMemo(() => {
    if (!meal) return [] as { ingredient: string; measure?: string }[];
    const out: { ingredient: string; measure?: string }[] = [];
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}` as keyof Meal] as unknown as string | undefined;
      const meas = meal[`strMeasure${i}` as keyof Meal] as unknown as string | undefined;
      if (ing && ing.trim()) out.push({ ingredient: ing, measure: meas });
    }
    return out;
  }, [meal]);

  if (err) return <div className="p-6">Error: {err}</div>;
  if (!meal) return <div className="p-6">Loading...</div>;

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col md:flex-row gap-8 items-start">
        <div className="relative w-full max-w-xs aspect-[4/3] rounded-xl overflow-hidden shadow border border-black/5">
          <Image src={meal.strMealThumb} alt={meal.strMeal} fill sizes="320px" className="object-cover" />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <h1 className="text-2xl font-bold mb-2">{meal.strMeal}</h1>
          <p className="text-sm text-gray-700 mb-2">{meal.strCategory} &middot; {meal.strArea}</p>
          <div className="flex items-center gap-2 mb-4">
            <FavoriteButton id={meal.idMeal} />
            {meal.strYoutube && (
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noreferrer"
                className="text-xs px-2 py-1 rounded border bg-white hover:bg-black hover:text-white transition"
              >
                YouTube
              </a>
            )}
          </div>
          <h2 className="text-lg font-semibold mt-4 mb-2">Ingredients</h2>
          <ul className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
            {ingredients.map((row, idx) => (
              <li key={idx} className="text-sm">
                <span className="font-medium">{row.ingredient}</span>{row.measure ? `: ${row.measure}` : ""}
              </li>
            ))}
          </ul>
          <h2 className="text-lg font-semibold mt-4 mb-2">Instructions</h2>
          <p className="whitespace-pre-line text-sm text-gray-800 mb-4">{meal.strInstructions}</p>
        </div>
      </section>
      {showRelated && meal.strCategory && related.length > 0 && (
        <section className="mt-4">
          <h3 className="text-md font-semibold mb-3">More from {meal.strCategory}</h3>
          <ul className="flex gap-4 overflow-x-auto pb-2">
            {related.map(r => (
              <li key={r.idMeal} className="min-w-[160px] max-w-[180px]">
                <Link href={`/page/item/${r.idMeal}`} className="block group">
                  <div className="relative aspect-[4/3] w-full rounded-md overflow-hidden border shadow">
                    <Image src={r.strMealThumb} alt={r.strMeal} fill sizes="160px" className="object-cover group-hover:scale-105 transition" />
                  </div>
                  <div className="mt-2 text-xs font-medium group-hover:text-[#E63E33] line-clamp-2">{r.strMeal}</div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
