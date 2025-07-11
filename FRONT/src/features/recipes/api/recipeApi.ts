import { convertKeysToCamel } from "../../../utils/caseConverter";
import { Recipe } from '@/features/recipes/types/recipeTypes';

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