"use client";
import { useParams } from "next/navigation";
import MealDetail from "@/components/MealDetail";

export default function ItemPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <main className="p-6 max-w-3xl mx-auto flex flex-col gap-8">
      <MealDetail id={String(id)} showRelated />
    </main>
  );
}
