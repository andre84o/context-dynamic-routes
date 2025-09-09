// Fil: src/app/page/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UseUserContext } from "@/utils/context";
import { UserContextType, Meal } from "@/utils/types";
import Hero from "@/components/Hero";
import MealsCarousel from "@/components/MealsCarousel";
import FavoritesSection from "@/components/FavoritesSection";
import LoginModal from "@/components/LoginPopupModal";

export default function HomePage() {
  // Svenska: använd modal-styrning från context
  const { user, getMealsByCategory, openLogin, showLogin, closeLogin } =
    UseUserContext() as UserContextType;

  const picks = ["Beef", "Vegetarian", "Chicken"];
  const [featured, setFeatured] = useState<
    { cat: string; meal: Meal | null }[]
  >(picks.map((cat) => ({ cat, meal: null })));
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (user) return;
    const run = async () => {
      try {
        const results = await Promise.all(
          picks.map(async (cat) => {
            const list = await getMealsByCategory(cat); // från context
            return { cat, meal: list?.[0] ?? null };
          })
        );
        setFeatured(results);
      } catch (e: any) {
        setErr(e.message ?? "Error");
      }
    };
    run();
  }, [user, getMealsByCategory]);

  return (
    <div className="font-sans flex flex-col items-center justify-center text-black min-h-[calc(100vh-48px)] bg-white">
      <main className="p-6 w-full max-w-5xl flex flex-col gap-8">
        {!user ? (
          <>
            <Hero />
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
                        <button
                          onClick={openLogin}
                          className="w-full btn-action cursor-pointer"
                        >
                          <Image
                            src={meal.strMealThumb}
                            alt={meal.strMeal}
                            width={200}
                            height={200}
                            className="rounded"
                          />
                        </button>

                        <h3 className="text-lg btn-action font-medium mt-2 text-center">
                          {meal.strMeal}
                        </h3>
                        <p className="text-sm mt-1">{cat}</p>

                        {/* Svenska: Två lika stora knappar; Log in öppnar popup */}
                        <div className="flex mt-auto gap-2 w-full">
                          <Link
                            href={`/meal/${meal.idMeal}`}
                            className="px-3 py-1 btn-action border rounded w-full text-center cursor-pointer"
                          >
                            View Menu
                          </Link>
                        </div>
                      </>
                    ) : (
                      <p className="text-sm">No meal found for {cat}</p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          </>
        ) : (
          <>
            {user.favouriteCategory && (
              <MealsCarousel category={user.favouriteCategory} />
            )}
            {/* Svenska: Home ska visa 3 senaste → FavoritesSection utan showAll */}
            <FavoritesSection ids={user.favouriteRecipes ?? []} />
          </>
        )}
      </main>

      {/* Svenska: Modal styrs av context */}
      <LoginModal open={showLogin} onClose={closeLogin} />
    </div>
  );
}
