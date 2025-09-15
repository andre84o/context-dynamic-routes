"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { UserContextType } from "@/utils/types";
import { UseUserContext } from "@/utils/context";
import FavoriteButton from "@/components/FavoriteButton";
import { Category } from "@/utils/types";



export default function Home() {
  const { user } = UseUserContext() as UserContextType;

  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php",
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("Failed to load categories");
        const data: { categories?: Category[] } = await res.json();
        setCategories(data.categories ?? []);
      } catch (e: any) {
        setError(e.message ?? "Error");
      }
    };
    run();
  }, []);

  return (
    <div className="font-sans flex flex-col items-center justify-center text-black min-h-[calc(100vh-48px)] bg-white">
      <main className="p-6 w-full flex flex-col justify-center items-center">
        <h1 className="text-2xl font-semibold mb-4">Meal Categories</h1>
        {error && <p>Error: {error}</p>}

        <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {categories.map((c) => (
            <li
              key={c.idCategory}
              className="border border-gray-200 rounded-xl p-3 flex flex-col bg-white/40 shadow-sm hover:shadow-md transition w-full max-w-72"
            >
              <a href={`/page/Category/${c.strCategory}`} className="group relative flex flex-col h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 rounded-md">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md border border-black/5 bg-black/5">
                  <Image src={c.strCategoryThumb} alt={c.strCategory} fill sizes="256px" className="object-cover" />
                  <span className="absolute left-4 top-4 z-20">
                    <FavoriteButton id={String(c.idCategory)} className="" />
                  </span>
                </div>
                <h2 className="mt-3 text-sm font-semibold leading-tight line-clamp-2">{c.strCategory}</h2>
                <p className="mt-1 text-xs text-gray-700 line-clamp-3">{c.strCategoryDescription}</p>
                <span className="mt-auto pt-3 text-xs text-blue-600 group-hover:underline">View meals</span>
              </a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
