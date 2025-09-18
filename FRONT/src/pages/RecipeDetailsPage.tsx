import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipeById } from "@/features/recipes/api/recipeApi";
import { Recipe } from "@/features/recipes/types/recipeTypes";

import { RecipeSummary } from "@/features/recipes";
import RecipeIngredients from "@/features/recipes/components/RecipeIngredients";
import RecipeSteps from "@/features/recipes/components/RecipeSteps";

function RecipeDetailsPage() {
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
    <div className="px-4 py-6 max-w-6xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold">{recipe.title}</h1>

      {/* Image + Summary */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
        <img
          src={recipe.image || "/images/default-recipe.jpg"}
          alt="Image de la recette"
          className="w-full aspect-[3/2] rounded-3xl object-cover shadow-md"
        />
        <div className="space-y-4">
          <RecipeSummary recipe={recipe} />
        </div>
      </div>

      {/* Ingredients + Steps */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
        <div className="space-y-4">
          <RecipeIngredients ingredients={recipe.ingredients} />
        </div>
        <div className="space-y-4">
          <RecipeSteps steps={recipe.steps} />
        </div>
      </div>
    </div>
  );
}

export default RecipeDetailsPage;
