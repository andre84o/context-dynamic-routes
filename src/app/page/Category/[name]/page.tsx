"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { UseUserContext } from "@/utils/context";
import type { UserContextType, Meal, Category } from "@/utils/types";

export default function CategoryPage() {
  // Svenska: läs kategorinamnet från URL
  const { name } = useParams<{ name: string }>();
  const { user, setUser, getMealsByCategory, getCategories } = UseUserContext() as UserContextType;
  const [meals, setMeals] = useState<Meal[]>([]);
  const [cat, setCat] = useState<Category | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [mealsList, categories] = await Promise.all([
          getMealsByCategory(String(name)),
          getCategories(),
        ]);
        if (!alive) return;
        setMeals(mealsList);
        const found = categories.find(c => c.strCategory.toLowerCase() === String(name).toLowerCase());
        setCat(found ?? null);
        setErr(null);
      } catch (e: any) {
        if (alive) {
          setErr(e?.message ?? "Error");
          setMeals([]);
        }
      }
    })();
    return () => { alive = false; };
  }, [name, getMealsByCategory, getCategories]);

  const setFavoriteCategory = () => {
    if (!user) return;
    setUser({ ...user, favouriteCategory: String(name) });
    try {
      localStorage.setItem("user", JSON.stringify({ ...user, favouriteCategory: String(name) }));
    } catch {}
  };

  if (err) return <main className="p-6">Error: {err}</main>;

  return (
    <main className="p-6 w-full flex flex-col items-center justify-center text-black min-h-[calc(100vh-48px)] bg-white">
      <section className="mb-6 w-full max-w-5xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">{cat?.strCategory ?? name}</h1>
          {user && (
            <button
              onClick={setFavoriteCategory}
              className="px-3 py-1 border rounded btn-action text-xs shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#E63E33]"
            >
              Set as favorite category
            </button>
          )}
        </div>
        {cat && (
          <p className="mt-2 text-sm text-gray-700 max-w-2xl">{cat.strCategoryDescription}</p>
        )}
      </section>
      <ul className="grid gap-4 grid-cols-1 md:grid-cols-3 justify-items-center w-full max-w-5xl">
        {meals.map(meal => (
          <li
            key={meal.idMeal}
            className="relative border rounded-xl p-4 w-64 flex flex-col bg-white/80 shadow hover:shadow-lg transition group focus-within:ring-2 focus-within:ring-[#E63E33]"
          >
            <Link href={`/page/meal/${meal.idMeal}`} className="block focus:outline-none">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md border border-black/5 bg-gradient-to-br from-black/10 to-[#E63E33]/10">
                <Image src={meal.strMealThumb} alt={meal.strMeal} fill sizes="256px" priority className="object-cover transition group-hover:scale-105" />
                <div className="absolute inset-0 rounded-md pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              <h3 className="mt-3 text-sm font-semibold leading-tight line-clamp-2 group-hover:text-[#E63E33]">{meal.strMeal}</h3>
              <span className="mt-auto pt-3 text-xs text-[#E63E33] group-hover:underline">View details</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
