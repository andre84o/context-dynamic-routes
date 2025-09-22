"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useMemo } from "react";
import { UseUserContext } from "@/utils/context";
import { UserContextType, Meal } from "@/utils/types";
import Hero from "@/components/Hero";
import MealsCarousel from "@/components/MealsCarousel";
import FavoritesSection from "@/components/FavoritesSection";
import LoginModal from "@/components/LoginPopupModal";
import FavoriteButton from "@/components/FavoriteButton";

export default function HomePage() {
  const { user, getMealsByCategory, openLogin, showLogin, closeLogin } =
    UseUserContext() as UserContextType;

  const picks: string[] = useMemo(() => ["Beef", "Vegetarian", "Chicken"], []);
  const [featured, setFeatured] = useState<
    { cat: string; meal: Meal | null }[]
  >(picks.map((cat: string) => ({ cat, meal: null })));
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    if (user) return;
    let active = true;
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const results = await Promise.all(
          picks.map(async (cat: string) => {
            try {
              const list = await getMealsByCategory(cat);
              return { cat, meal: list?.[0] ?? null };
            } catch {
              return { cat, meal: null };
            }
          })
        );
        if (active) setFeatured(results);
      } catch (e) {
        if (active) {
          const message = e instanceof Error ? e.message : "Failed to load";
          setErr(message);
        }
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [user, getMealsByCategory, retryKey, picks]);

  return (

    <main className="relative min-h-[calc(100dvh-48px)] overflow-x-clip">
      <div className="font-sans flex flex-col items-center justify-center text-black min-h-[calc(100dvh-48px)] bg-white/0 relative z-10">
        <section className="p-6 w-full max-w-5xl flex flex-col gap-8">
          {!user ? (
            <>
              <Hero />
              <section className="flex flex-col items-center text-center md:text-left md:items-stretch">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-4 w-full">
                  <h2 className="text-2xl font-semibold w-full md:w-auto text-gradient">Popular this week</h2>
                  {err && (
                    <button
                      onClick={() => setRetryKey((v) => v + 1)}
                      className="btn-action btn-secondary text-xs px-3 py-1 rounded self-center md:self-auto"
                    >
                      Retry
                    </button>
                  )}
                </div>
                {err && <p className="text-sm text-red-600 mb-2 w-full">{err}</p>}
                <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center md:place-items-stretch w-full">
                  {loading
                    ? picks.map((p: string) => (
                        <li
                          key={p}
                          className="animate-pulse card p-3 flex flex-col gap-3 bg-white w-full max-w-72"
                        >
                          <div className="aspect-[4/3] w-full rounded-md bg-black/10" />
                          <div className="h-4 bg-black/10 rounded w-3/4" />
                          <div className="h-3 bg-black/10 rounded w-1/2" />
                          <div className="mt-auto h-6 bg-black/10 rounded w-full" />
                        </li>
                      ))
                    : featured.map(({ cat, meal }) => {
                        if (!meal)
                          return (
                            <li
                              key={cat}
                              className="card p-4 flex flex-col justify-center items-center text-sm bg-white"
                            >
                              <p className="text-center opacity-70">
                                No meal found for {cat}
                              </p>
                            </li>
                          );

                        const cardInner = (
                          <div className="group relative flex flex-col h-full">
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md border border-black/5 bg-black/5">
                              <Image
                                src={meal.strMealThumb}
                                alt={meal.strMeal}
                                fill
                                sizes="256px"
                                className="object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                              />
                              <div className="absolute top-2 left-2 z-10">
                                <FavoriteButton id={meal.idMeal} />
                              </div>
                            </div>
                            <h3 className="mt-3 text-sm font-semibold leading-tight line-clamp-2">
                              {meal.strMeal}
                            </h3>
                            <span className="mt-1 inline-block text-[10px] uppercase tracking-wide px-2 py-1 rounded bg-black text-white w-fit">
                              {cat}
                            </span>
                            <span className="mt-auto pt-3 text-xs text-blue-600 group-hover:underline">
                              {user ? "View details" : "Login to view"}
                            </span>
                          </div>
                        );

                        return (
                          <li
                            key={cat}
                            className="card p-3 flex flex-col bg-white/60 transition w-full max-w-72"
                          >
                            {user ? (
                              <Link
                                href={`/page/item/${meal.idMeal}`}
                                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 rounded-md h-full"
                              >
                                {cardInner}
                              </Link>
                            ) : (
                              <div
                                role="button"
                                tabIndex={0}
                                onClick={openLogin}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    openLogin();
                                  }
                                }}
                                className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 rounded-md h-full"
                              >
                                {cardInner}
                              </div>
                            )}
                          </li>
                        );
                      })}
                </ul>
              </section>
            </>
          ) : (
            <>
              {user.favouriteCategory && (
                <MealsCarousel category={user.favouriteCategory} />
              )}
              <FavoritesSection ids={user.favouriteRecipes ?? []} />
            </>
          )}
        </section>
        <LoginModal open={showLogin} onClose={closeLogin} />
      </div>
    </main>
  );
}
