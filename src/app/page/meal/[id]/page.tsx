"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { UseUserContext } from "@/utils/context";
import type { UserContextType, Meal } from "@/utils/types";

export default function MealPage() {
  const { id } = useParams<{ id: string }>();
  const { getMealById } = UseUserContext() as UserContextType;

  const [meal, setMeal] = useState<Meal | (Meal & Record<string, any>) | null>(
    null
  );
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const m = await getMealById(String(id));
        if (alive) {
          setMeal(m as any);
          setErr(null);
        }
      } catch {
        if (alive) setErr("Failed to load meal");
      }
    };
    load();
    return () => {
      alive = false;
    };
  }, [id, getMealById]);

  const ingredients = useMemo(() => {
    if (!meal) return [];
    const out: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const ing = (meal as any)[`strIngredient${i}`];
      const mea = (meal as any)[`strMeasure${i}`];
      if (ing && String(ing).trim()) out.push(mea ? `${ing} — ${mea}` : ing);
    }
    return out;
  }, [meal]);

  if (err) return <main className="p-6">Error: {err}</main>;
  if (!meal) return <main className="p-6">Loading…</main>;

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">{meal.strMeal}</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <Image
          src={meal.strMealThumb}
          alt={meal.strMeal}
          width={320}
          height={320}
          className="rounded"
        />
        <div className="flex-1">
          <p className="text-sm">
            <span className="font-medium">Category:</span>{" "}
            {(meal as any).strCategory}
          </p>
          <p className="text-sm">
            <span className="font-medium">Area:</span> {(meal as any).strArea}
          </p>

          <h2 className="text-lg font-medium mt-4">Ingredients</h2>
          <ul className="list-disc list-inside text-sm">
            {ingredients.map((row, i) => (
              <li key={i}>{row}</li>
            ))}
          </ul>
        </div>
      </div>

      <h2 className="text-lg font-medium mt-6">Instructions</h2>
      <p className="whitespace-pre-line text-sm">
        {(meal as any).strInstructions}
      </p>

      {(meal as any).strYoutube ? (
        <a
          href={(meal as any).strYoutube}
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-4 px-3 py-1 border rounded"
        >
          Watch on YouTube
        </a>
      ) : null}
    </main>
  );
}
