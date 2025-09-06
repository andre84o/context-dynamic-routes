// Fil: src/app/page/page.tsx
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { UseUserContext } from "@/utils/context";
import { UserContextType } from "@/utils/types";
import Hero from "@/components/Hero";
import MealsCarousel from "@/components/MealsCarousel";

// Svensk kommentar: För utloggad visas Hero. För inloggad visas chip + karusell baserat på favouriteCategory.
// Dessutom tre utvalda rätter på startsidan (Beef, Vegetarian, Chicken) som tidigare önskat.
type Meal = { idMeal: string; strMeal: string; strMealThumb: string };

export default function HomePage() {
  const { user } = UseUserContext() as UserContextType;

  const picks = ["Beef", "Vegetarian", "Chicken"];
  const [featured, setFeatured] = useState<
    { cat: string; meal: Meal | null }[]
  >(picks.map((cat) => ({ cat, meal: null })));
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await Promise.all(
          picks.map(async (cat) => {
            const r = await fetch(
              `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
                cat
              )}`,
              { cache: "no-store" }
            );
            if (!r.ok) throw new Error("Failed to load meals");
            const data: { meals?: Meal[] } = await r.json();
            return { cat, meal: data.meals?.[0] ?? null };
          })
        );
        setFeatured(res);
      } catch (e: any) {
        setErr(e.message ?? "Error");
      }
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="font-sans flex flex-col items-center justify-center text-black min-h-[calc(100vh-48px)] bg-white">
      <main className="p-6 w-full max-w-5xl flex flex-col gap-8">
        {/* Utloggad: visa Hero */}
        {!user && <Hero />}

        {/* Inloggad: visa favoritkategori-chip + karusell om satt */}
        {user && user.favouriteCategory && (
          <MealsCarousel category={user.favouriteCategory} />
        )}

        {/* Tre utvalda rätter */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Featured Meals</h2>
          {err && <p>Error: {err}</p>}
          <ul className="grid gap-4 grid-cols-1 md:grid-cols-3 justify-items-center">
            {featured.map(({ cat, meal }) => (
              <li
                key={cat}
                className="border rounded p-4 w-64 flex flex-col items-center"
              >
                {meal ? (
                  <>
                    <Image
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      width={200}
                      height={140}
                    />
                    <h3 className="text-lg font-medium mt-2 text-center">
                      {meal.strMeal}
                    </h3>
                    <p className="text-sm mt-1">{cat}</p>
                    <button className="mt-auto px-3 py-1 border rounded">
                      View
                    </button>
                  </>
                ) : (
                  <p className="text-sm">No meal found for {cat}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
