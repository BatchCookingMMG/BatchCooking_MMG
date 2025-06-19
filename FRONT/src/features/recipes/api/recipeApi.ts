import { Recipe } from '@/features/recipes/types/recipeTypes';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchRecipeById = async (id: number): Promise<Recipe> => {
  const response = await fetch(`${API_URL}/api/recipes/id/${id}`);

  if (!response.ok) {
    throw new Error(`Erreur HTTP ${response.status} : ${response.statusText}`);
  }

  const data: Recipe = await response.json();
  return data;
};