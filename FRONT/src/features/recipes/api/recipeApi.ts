import { Recipe } from '@/features/recipes/types/recipeTypes';
import { RecipeListCard } from '@/features/recipes/types/recipeTypes';
const API_URL = import.meta.env.VITE_API_URL;

export const fetchRecipeById = async (id: number): Promise<Recipe> => {
  const response = await fetch(`${API_URL}/api/recipes/id/${id}`);

  if (!response.ok) {
    throw new Error(`Erreur HTTP ${response.status} : ${response.statusText}`);
  }

  const data: Recipe = await response.json();
  return data;
};

// ✅ Fonction pour récupérer les recettes filtrées
export const fetchFilteredRecipes = async (params: {
  recipesNumber?: number;
  vegetarien?: boolean;
  sansPorc?: boolean;
}): Promise<Recipe[]> => {
  const query = new URLSearchParams();

  if (params.recipesNumber) query.append("recipesNumber", params.recipesNumber.toString());
  if (params.vegetarien) query.append("vegetarien", "true");
  if (params.sansPorc) query.append("sansPorc", "true");

  const response = await fetch(`${API_URL}/api/recipes?${query.toString()}`);

  if (!response.ok) {
    throw new Error(`Erreur HTTP ${response.status}`);
  }

  return await response.json();
};

export const fetchAllRecipes = async (): Promise<RecipeListCard[]> => {
  const response = await fetch(`${API_URL}/api/recipes`);
  if (!response.ok) {
    throw new Error("Erreur API fetchAllRecipes");
  }
  return await response.json();
};


