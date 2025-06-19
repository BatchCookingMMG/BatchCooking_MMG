import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipeById } from "@/features/recipes/api/recipeApi";
import { Recipe } from "@/features/recipes/types/recipeTypes";

import RecipeHeader from "@/features/recipes/components/RecipeHeader";
import { RecipeSummary } from "@/features/recipes";
import RecipeImage from "@/features/recipes/components/RecipeImage";
import RecipeIngredients from "@/features/recipes/components/RecipeIngredients";
import RecipeSteps from "@/features/recipes/components/RecipeSteps";

function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const getRecipe = async () => {
      try {
        const data = await fetchRecipeById(Number(id));
        setRecipe(data);
      } catch (err) {
        setError("Erreur lors du chargement de la recette.");
      } finally {
        setLoading(false);
      }
    };
    getRecipe();
  }, [id]);

  if (loading) return <p>Chargement…</p>;
  if (error || !recipe) return <p>{error || "Recette introuvable."}</p>;

  return (
    <div className="flex flex-col items-center px-4 py-6 gap-6 max-w-md mx-auto">
      <RecipeHeader title={recipe.title} />
      <RecipeImage image={recipe.image} />
      <RecipeSummary
        preparationTime={recipe.preparation_time}
        difficulty={recipe.difficulty}
        peopleNumber={recipe.people_number}
        cost={recipe.cost}
        tag={recipe.tag}
      />
      <RecipeIngredients ingredients={recipe.ingredients} />
      <RecipeSteps steps={recipe.steps} />
    </div>
  );
}

export default RecipeDetailPage;
