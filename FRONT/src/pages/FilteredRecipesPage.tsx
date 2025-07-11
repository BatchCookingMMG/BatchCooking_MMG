import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import RecipeListCard from "@/features/recipes/components/RecipeListCard";
import { RecipeListCard as RecipeType } from "@/features/recipes/types/recipeTypes";
import { fetchFilteredRecipes } from "@/features/recipes/api/recipeApi";

export default function FilteredRecipesPage() {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchParams] = useSearchParams();
  const vegetarien = searchParams.get("vegetarien") === "true";
  const sansPorc = searchParams.get("sansPorc") === "true";

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchFilteredRecipes({
          recipesNumber: 50,
          vegetarien,
          sansPorc,
        });
        setRecipes(data);
      } catch (err) {
        setError("Erreur lors du chargement des recettes filtrées.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [vegetarien, sansPorc]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Recettes filtrées</h2>
      <RecipeListCard recipes={recipes} />
    </div>
  );
}
