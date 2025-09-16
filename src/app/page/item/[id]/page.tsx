"use client";
import { useParams } from "next/navigation";
import MealDetail from "@/components/MealDetail";

export default function ItemPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <main className="flex flex-col gap-8 w-full max-w-screen-md mx-auto px-4 sm:px-6 py-6">
      <MealDetail id={String(id)} showRelated />
    </main>
  );
}
