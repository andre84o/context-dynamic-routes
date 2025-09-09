"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { UseUserContext } from "@/utils/context";
import type { UserContextType, Meal } from "@/utils/types";

export default function CategoryPage() {
  // Svenska: läs kategorinamnet från URL
  const { name } = useParams<{ name: string }>();
  // Svenska: hämta API + user + login-modal från context
  const { user, getMealsByCategory, openLogin } =
    UseUserContext() as UserContextType;
  const router = useRouter();

  const [meals, setMeals] = useState<Meal[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const list = await getMealsByCategory(String(name));
        if (alive) {
          setMeals(list);
          setErr(null);
        }
      } catch (e: any) {
        if (alive) setErr(e?.message ?? "Error");
      }
    };
    load();
    return () => {
      alive = false;
    };
  }, [name, getMealsByCategory]);

  const handleView = (id: string) => {
    if (user) router.push(`/meal/${id}`);
    else openLogin();
  };

  if (err) return <main className="p-6">Error: {err}</main>;

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Category: {name}</h1>
      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
        {meals.map((m) => (
          <li
            key={m.idMeal}
            className="border rounded p-4 w-64 flex flex-col items-center"
          >
     
            <button onClick={() => handleView(m.idMeal)} className="w-full">
              <Image
                src={m.strMealThumb}
                alt={m.strMeal}
                width={200}
                height={200}
                className="rounded"
              />
            </button>
            <h3 className="text-lg font-medium mt-2 text-center">
              {m.strMeal}
            </h3>
            <button
              onClick={() => handleView(m.idMeal)}
              className="mt-auto px-3 py-1 border rounded"
            >
              View
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
