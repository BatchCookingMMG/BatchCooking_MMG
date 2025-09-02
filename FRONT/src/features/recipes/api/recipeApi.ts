import { convertKeysToCamel } from "../../../utils/caseConverter";
import { Recipe } from '@/features/recipes/types/recipeTypes';
import { logInfo, logWarn, logError } from "../../../core/logging/logger";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchRecipeById = async (id: number): Promise<Recipe> => {
  logInfo(`Appel API fetchRecipeById avec id=${id}`);

  try {
    const response = await fetch(`${API_URL}/api/recipes/id/${id}`);

    if (!response.ok) {
      const errorMsg = `Erreur HTTP ${response.status} : ${response.statusText}`;
      logWarn(errorMsg);
      throw new Error(errorMsg);
    }

    const rawData: Recipe = await response.json();
    const data: Recipe = convertKeysToCamel<Recipe>(rawData);
    logInfo(`Recette récupérée avec succès pour id=${id}`);
    return data;

  } catch (error) {
    logError(`Erreur lors de fetchRecipeById id=${id}`, error as Error);
    throw error;
  }
};

// ✔ Récupérer des recettes filtrées (notamment pour FilteredRecipesPage)
export const fetchFilteredRecipes = async (filters: {
  recipesNumber: number;
  vegetarien?: boolean;
  sansPorc?: boolean;
  difficulty?: string;
}): Promise<Recipe[]> => {
  logInfo(`Appel API fetchFilteredRecipes avec filtres=${JSON.stringify(filters)}`);

  try {
    const query = new URLSearchParams();
    query.append("recipesNumber", filters.recipesNumber.toString());
    if (filters.vegetarien) query.append("vegetarien", "true");
    if (filters.sansPorc) query.append("sansPorc", "true");
    if (filters.difficulty) query.append("difficulty", filters.difficulty);

    const response = await fetch(`${API_URL}/api/recipes/random?${query.toString()}`);
    if (!response.ok) {
      const errorMsg = `Erreur HTTP ${response.status} : ${response.statusText}`;
      logWarn(errorMsg);
      throw new Error(errorMsg);
    }

    const rawData = await response.json();
    const data = convertKeysToCamel<Recipe[]>(rawData);
    logInfo(`Recettes filtrées récupérées : ${data.length} recette(s)`);
    return data;

  } catch (error) {
    logError(`Erreur lors de fetchFilteredRecipes avec filtres=${JSON.stringify(filters)}`, error as Error);
    throw error;
  }
};

// ✅ Pour remplacer UNE recette aléatoire avec les mêmes filtres
export const fetchOneFilteredRecipe = async (filters: {
  vegetarien?: boolean;
  sansPorc?: boolean;
  difficulty?: string;
}): Promise<Recipe> => {
  logInfo(`Appel API fetchOneFilteredRecipe avec filtres=${JSON.stringify(filters)}`);

  try {
    const query = new URLSearchParams();
    query.append("recipesNumber", "1"); // on demande juste 1
    if (filters.vegetarien) query.append("vegetarien", "true");
    if (filters.sansPorc) query.append("sansPorc", "true");
    if (filters.difficulty) query.append("difficulty", filters.difficulty);

    const response = await fetch(`${API_URL}/api/recipes/random?${query.toString()}`);
    if (!response.ok) {
      const errorMsg = `Erreur HTTP ${response.status} : ${response.statusText}`;
      logWarn(errorMsg);
      throw new Error(errorMsg);
    }

    const rawData = await response.json();
    const recipe = convertKeysToCamel<Recipe[]>(rawData)[0];
    logInfo(`Recette unique récupérée : ${recipe?.title ?? "aucune"}`);
    return recipe;

  } catch (error) {
    logError(`Erreur lors de fetchOneFilteredRecipe avec filtres=${JSON.stringify(filters)}`, error as Error);
    throw error;
  }
};
