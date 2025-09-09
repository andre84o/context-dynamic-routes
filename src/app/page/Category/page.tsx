// Fil: src/app/page/categories/page.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { UseUserContext } from "@/utils/context";
import type { UserContextType, Category } from "@/utils/types";
import FavoriteButton from "@/components/FavoriteButton";

export default function Home() {
  const { getCategories } = UseUserContext() as UserContextType;
  // Svensk kommentar: Hämtar API-funktionen från context

  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    // Svensk kommentar: Använder context-API istället för fetch här
    (async () => {
      try {
        const list = await getCategories();
        if (alive) {
          setCategories(list);
          setError(null);
        }
      } catch (e: any) {
        if (alive) {
          setError(e?.message ?? "Error");
          setCategories([]);
        }
      }
    })();
    return () => {
      alive = false; // Svensk kommentar: undvik setState efter unmount
    };
  }, [getCategories]); // Svensk kommentar: trigga om context-funktionen byts

  return (
    <div className="font-sans flex flex-col items-center justify-center text-black min-h-[calc(100vh-48px)] bg-white">
      <main className="p-6 w-full flex flex-col justify-center items-center">
        <h1 className="text-2xl font-semibold mb-4">Meal Categories</h1>
        {error && <p>Error: {error}</p>}

        <ul className="grid gap-4 grid-cols-1 md:grid-cols-3 justify-items-center">
          {categories.map((c) => (
            <li
              key={c.idCategory}
              className="border rounded p-4 w-64 flex flex-col"
            >
              <div className="relative">
                {/* Svensk kommentar: Låter din favoritknapp vara som tidigare */}
                <FavoriteButton
                  id={String(c.idCategory)}
                  className="absolute left-1 top-2 -translate-x-5 -translate-y-5"
                />
                <Image
                  src={c.strCategoryThumb}
                  alt={c.strCategory}
                  width={200}
                  height={140}
                />
              </div>

              <h2 className="text-lg font-medium mt-2">{c.strCategory}</h2>
              <p className="text-sm mt-1">
                {c.strCategoryDescription.slice(0, 100)}...
              </p>
              <button className="mt-auto px-3 py-1 border rounded">View</button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
