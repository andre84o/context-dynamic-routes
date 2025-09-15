"use client";
import { useParams } from "next/navigation";
import MealDetail from "@/components/MealDetail";

export default function MealPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <MealDetail id={String(id)} showRelated={false} />
    </main>
  );
}
