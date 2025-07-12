import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipeById } from "@/features/recipes/api/recipeApi";
import { Recipe } from "@/features/recipes/types/recipeTypes";
import { RecipeSummary } from "@/features/recipes";
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
    <div className="px-4 py-6 flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Titre */}
      <h1 className="text-3xl font-semibold text-left">{recipe.title}</h1>

      {/* Image + Summary */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image - 2/3 en desktop */}
        <div className="w-full md:w-2/3">
          <img
            src={recipe.image || "/images/default-recipe.jpg"}
            alt="Image de la recette"
            className="w-full h-full max-h-[400px] object-cover rounded-2xl"
          />
        </div>

        {/* Résumé - 1/3 en desktop, même hauteur que l'image */}
        <div className="w-full md:w-1/3">
          <div className="h-full max-h-[400px] flex flex-col justify-between bg-gray-50 p-4 rounded-2xl">
            <RecipeSummary recipe={recipe} />
          </div>
        </div>
      </div>

      {/* Ingrédients */}
      <RecipeIngredients ingredients={recipe.ingredients} />

      {/* Étapes */}
      <RecipeSteps steps={recipe.steps} />
    </div>
  );
}

export default RecipeDetailPage;
