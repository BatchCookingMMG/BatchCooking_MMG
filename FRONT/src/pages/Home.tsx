// src/pages/Home.tsx
import FilterForm from "@/features/filters/FilterForm";

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bienvenue sur Batch Cooking 🧑‍🍳</h1>
      <FilterForm />
    </div>
  );
}
