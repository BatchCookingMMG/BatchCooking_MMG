// src/pages/FilteredRecipesPage.tsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchFilteredRecipes } from "@/features/recipes/api/recipeApi";
import RecipeListCard from "@/features/recipes/components/RecipeListCard";
import { RecipeListCard as RecipeType } from "@/features/recipes/types/recipeTypes";

export default function FilteredRecipesPage() {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchParams] = useSearchParams();
  const vegetarien = searchParams.get("vegetarien") === "true";
  const sansPorc = searchParams.get("sansPorc") === "true";
  const difficulty = searchParams.get("difficulty") || undefined;
  const recipesNumber = parseInt(searchParams.get("recipesNumber") || "6", 10);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchFilteredRecipes({
          recipesNumber,
          vegetarien,
          sansPorc,
          difficulty,
        });
        setRecipes(data);
      } catch (err) {
        setError("Erreur lors du chargement des recettes.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [vegetarien, sansPorc, difficulty, recipesNumber]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (recipes.length === 0) return <p>Aucune recette trouvée.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Résultats de vos critères : </h2>
        {/* Message si on a moins de recettes que demandées */}
        {recipes.length < recipesNumber && (
        <p className="text-orange-600 mb-4">
          Seulement {recipes.length} recettes trouvées sur {recipesNumber} demandées avec ces filtres.
        </p>
      )}
      <RecipeListCard recipes={recipes} />
    </div>
  );
}
