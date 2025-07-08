// src/features/recipes/pages/RecipesListPage.tsx
import { useRecipes } from '@/features/recipes/hooks/useRecipes';
import RecipeListCard from '@/features/recipes/components/RecipeListCard';
import type { RecipeListCard as RecipeListCardType } from '@/features/recipes/types/recipeTypes';

export default function RecipesListPage() {
  const { recipes, loading, error } = useRecipes();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  
  const simplified: RecipeListCardType[] = recipes.map((r) => ({
    id: r.id, 
    title: r.title,
    image: r.image,
    preparation_time: r.preparation_time,
    difficulty: r.difficulty,
  }));

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Recettes aléatoires 🍽️</h1>
      <RecipeListCard recipes={simplified} />
    </>
  );
}
