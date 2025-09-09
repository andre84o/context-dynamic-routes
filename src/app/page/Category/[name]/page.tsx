// Fil: src/app/category/[name]/page.tsx
import Image from "next/image";
import Link from "next/link";

/* Svenska: Hämtar alla rätter för en kategori och visar grid */
async function getMealsByCategory(name: string) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
      name
    )}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to load category");
  const data = await res.json();
  return (data?.meals ?? []) as {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
  }[];
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const meals = await getMealsByCategory(name);

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Category: {name}</h1>
      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
        {meals.map((m) => (
          <li
            key={m.idMeal}
            className="border rounded p-4 w-64 flex flex-col items-center"
          >
            <Link href={`/meal/${m.idMeal}`}>
              <img
                src={m.strMealThumb}
                alt={m.strMeal}
                width={200}
                height={200}
                className="rounded"
              />
            </Link>
            <h3 className="text-lg font-medium mt-2 text-center">
              {m.strMeal}
            </h3>
            <Link
              href={`/meal/${m.idMeal}`}
              className="mt-auto px-3 py-1 border rounded"
            >
              View
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
