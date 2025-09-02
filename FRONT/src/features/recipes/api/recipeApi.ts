import { convertKeysToCamel } from "../../../utils/caseConverter";
import { Recipe, Ingredient, Step } from '@/features/recipes/types/recipeTypes';
import { logInfo, logWarn, logError } from "../../../core/logging/logger";

const API_URL = import.meta.env.VITE_API_URL;

/* -------------------------------------------------------------------------- */
/*                               KEY MAPPERS                                   */
/* -------------------------------------------------------------------------- */
/**
 * mapRecipeDetail:
 * - Used for the detail endpoint (/api/recipes/id/:id) returning a FULL recipe.
 */
function mapRecipeDetail(dto: any): Recipe {
  const c = convertKeysToCamel<any>(dto);
  // Normalize nested arrays/objects
  const ingredients: Ingredient[] = Array.isArray(c.ingredients)
    ? c.ingredients.map((ing: any) => ({
        quantity: ing.quantity ?? null,
        unit: ing.unit ?? "",
        ingredient: ing.ingredient ?? "",
        category: ing.category ?? "",
      }))
    : [];

  const steps: Step[] = Array.isArray(c.steps)
    ? c.steps.map((s: any) => ({ text: s.text ?? "" }))
    : [];

  // Return a fully shaped Recipe
  return {
    id: Number(c.id),
    title: c.title ?? "",
    tag: c.tag ?? "",
    preparationTime: c.preparationTime ?? "",
    difficulty: c.difficulty ?? "",
    cost: c.cost ?? "",
    peopleNumber: Number(c.peopleNumber ?? 0),
    ingredients,
    steps,
    image: c.imageUrl ?? null, // <— key bridge: backend imageUrl -> frontend image
  };
}

/**
 * mapRecipeSummary:
 * - Used for list/random endpoints (cards).
 * - Backend only returns a summary here.
 * - We fill missing fields with defaults so your Recipe type remains satisfied
 *   (this avoids touching UI components right now).
 */
function mapRecipeSummary(dto: any): Recipe {
  const c = convertKeysToCamel<any>(dto);

  return {
    id: Number(c.id),
    title: c.title ?? "",
    tag: c.tag ?? "",
    preparationTime: c.preparationTime ?? "",
    difficulty: c.difficulty ?? "",
    // defaults for fields not returned by /random
    cost: "",
    peopleNumber: 0,
    ingredients: [],
    steps: [],
    image: c.imageUrl ?? null, // <— same bridge for cards
  };
}

/* -------------------------------------------------------------------------- */
/*                               API CALLS                                     */
/* -------------------------------------------------------------------------- */

/**
 * Fetch recipe details (detail page)
 * GET /api/recipes/id/:id
 */
export const fetchRecipeById = async (id: number): Promise<Recipe> => {
  logInfo(`Appel API fetchRecipeById avec id=${id}`);

  try {
    const response = await fetch(`${API_URL}/api/recipes/id/${id}`);

    if (!response.ok) {
      const errorMsg = `Erreur HTTP ${response.status} : ${response.statusText}`;
      logWarn(errorMsg);
      throw new Error(errorMsg);
    }

    const raw = await response.json();
    logInfo(`Recette récupérée avec succès pour id=${id}`);
    return mapRecipeDetail(raw);

  } catch (error) {
    logError(`Erreur lors de fetchRecipeById id=${id}`, error as Error);
    throw error;
  }
};

/**
 * Fetch filtered recipes (cards / FilteredRecipesPage)
 * GET /api/recipes/random?recipesNumber=...&vegetarien=...&sansPorc=...&difficulty=...
 *
 * Note: we return Recipe[] to keep your current UI unchanged,
 *       but only "summary" fields are populated for this endpoint.
 */
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

    const raw = await response.json();
    const data = Array.isArray(raw) ? raw.map(mapRecipeSummary) : [];
    logInfo(`Recettes filtrées récupérées : ${data.length} recette(s)`);
    return data;

  } catch (error) {
    logError(`Erreur lors de fetchFilteredRecipes avec filtres=${JSON.stringify(filters)}`, error as Error);
    throw error;
  }
};

/**
 * Fetch ONE random recipe (to replace a single card)
 * GET /api/recipes/random?recipesNumber=1&...
 */
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

    const raw = await response.json();
    const first = Array.isArray(raw) ? raw[0] : undefined;
    if (!first) throw new Error("No recipe returned");
    
    return mapRecipeSummary(first)

  } catch (error) {
    logError(`Erreur lors de fetchOneFilteredRecipe avec filtres=${JSON.stringify(filters)}`, error as Error);
    throw error;
  }
};
