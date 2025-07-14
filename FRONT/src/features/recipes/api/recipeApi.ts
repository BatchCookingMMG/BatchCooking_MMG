import { convertKeysToCamel } from "../../../utils/caseConverter";
import { Recipe, RecipeListCard  } from '@/features/recipes/types/recipeTypes';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchRecipeById = async (id: number): Promise<Recipe> => {
  const response = await fetch(`${API_URL}/api/recipes/id/${id}`);

  if (!response.ok) {
    throw new Error(`Erreur HTTP ${response.status} : ${response.statusText}`);
  }

  const rawData: Recipe = await response.json();
  const data: Recipe = convertKeysToCamel<Recipe>(rawData);
  return data;
};

// ✔ Récupérer des recettes filtrées (notamment pour FilteredRecipesPage)
export const fetchFilteredRecipes = async (filters: {
  recipesNumber: number;
  vegetarien?: boolean;
  sansPorc?: boolean;
  difficulty?: string;
}): Promise<RecipeListCard[]> => {
  const query = new URLSearchParams();
  query.append("recipesNumber", filters.recipesNumber.toString());
  if (filters.vegetarien) query.append("vegetarien", "true");
  if (filters.sansPorc) query.append("sansPorc", "true");
  if (filters.difficulty) query.append("difficulty", filters.difficulty);

  const response = await fetch(`${API_URL}/api/recipes/random?${query.toString()}`);
  if (!response.ok) throw new Error("Erreur serveur");

  const rawData = await response.json();
  return convertKeysToCamel<RecipeListCard[]>(rawData);
};