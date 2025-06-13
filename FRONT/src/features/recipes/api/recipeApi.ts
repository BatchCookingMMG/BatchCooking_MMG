import { RecipeSummaryType } from '@/features/recipes/types/recipeTypes';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchRecipeSummary = async (id: number): Promise<RecipeSummaryType> => {
  const response = await fetch(`${API_URL}/api/recipes/id/${id}/summary`);

  if (!response.ok) {
    throw new Error(`Erreur HTTP ${response.status} : ${response.statusText}`);
  }

  const data: RecipeSummaryType = await response.json();
  return data;
};