// Fil: src/app/meal/[id]/page.tsx
import Image from "next/image";

async function getMeal(id: string) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(
      id
    )}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to load meal");
  const data = await res.json();
  return data?.meals?.[0] ?? null;
}

function collectIngredients(m: any): string[] {
  const out: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ing = m?.[`strIngredient${i}`];
    const mea = m?.[`strMeasure${i}`];
    if (ing && ing.trim()) out.push(mea ? `${ing} — ${mea}` : ing);
  }
  return out;
}

export default async function MealPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meal = await getMeal(id);
  if (!meal) return <main className="p-6">Meal not found.</main>;

  const ingredients = collectIngredients(meal);

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
            <span className="font-medium">Category:</span> {meal.strCategory}
          </p>
          <p className="text-sm">
            <span className="font-medium">Area:</span> {meal.strArea}
          </p>
          <h2 className="text-lg font-medium mt-4">Ingredients</h2>
          <ul className="list-disc list-inside text-sm">
            {ingredients.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      </div>
      <h2 className="text-lg font-medium mt-6">Instructions</h2>
      <p className="whitespace-pre-line text-sm">{meal.strInstructions}</p>
      {meal.strYoutube ? (
        <a
          href={meal.strYoutube}
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
