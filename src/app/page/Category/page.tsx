"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UseUserContext } from "@/utils/context";
import type { UserContextType, Category } from "@/utils/types";
import FavoriteButton from "@/components/FavoriteButton";

export default function Home() {
  const { getCategories } = UseUserContext() as UserContextType;

  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const list = await getCategories();
        if (alive) {
          setCategories(list);
          setError(null);
        }
      } catch (e) {
        if (alive) {
          const message = e instanceof Error ? e.message : "Error";
          setError(message);
          setCategories([]);
        }
      }
    })();
    return () => {
      alive = false;
    };
  }, [getCategories]);

  return (
    <main className="relative p-6 w-full flex flex-col items-center justify-center text-black min-h-[calc(100vh-48px)] overflow-x-clip">
      <Image
        src="/foodie-2-bg.png"
        alt="Background foodie"
        fill
        sizes="100vw"
        className="absolute inset-0 -z-10 object-cover translate-y-6 scale-105 blur-sm opacity-60"
        priority
      />
      <h1 className="text-2xl font-semibold mb-4">Meal Categories</h1>
      {error && <p>Error: {error}</p>}

      <ul className="grid gap-4 grid-cols-1 md:grid-cols-3 justify-items-center w-full max-w-5xl">
        {categories.map((c) => (
          <li
            key={c.idCategory}
            className="relative border rounded-xl p-4 w-64 flex flex-col bg-white/80 shadow hover:shadow-lg transition group focus-within:ring-2 focus-within:ring-[#E63E33]"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md border border-black/5 bg-gradient-to-br from-black/10 to-[#E63E33]/10">
              <FavoriteButton
                id={String(c.idCategory)}
                className="absolute left-2 top-2 z-10"
              />
              <Image
                src={c.strCategoryThumb}
                alt={c.strCategory}
                fill
                sizes="256px"
                className="object-cover transition group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-md pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
            <h2 className="text-lg font-medium mt-2 group-hover:text-[#E63E33]">
              {c.strCategory}
            </h2>
            <p className="text-sm mt-1 text-gray-700">
              {c.strCategoryDescription.slice(0, 100)}...
            </p>
            <Link
              href={`/page/Category/${c.strCategory}`}
              passHref
              legacyBehavior
            >
              <button className="mt-auto px-3 py-1 border rounded btn-action cursor-pointer shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#E63E33] bg-white text-black group-hover:bg-[#E63E33]/10 group-hover:text-[#E63E33]">
                View
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
