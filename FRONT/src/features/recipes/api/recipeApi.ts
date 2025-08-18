// src/features/recipes/api/recipesApi.ts
import { convertKeysToCamel } from "@/utils/caseConverter";
import type { Recipe, Ingredient, Step } from "@/features/recipes/types/recipeTypes";

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
  const response = await fetch(`${API_URL}/api/recipes/id/${id}`);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} : ${response.statusText}`);
  }

  const raw = await response.json();
  return mapRecipeDetail(raw); // <— apply detail mapper
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
  // build query string safely
  const query = new URLSearchParams();
  query.append("recipesNumber", filters.recipesNumber.toString());
  if (filters.vegetarien) query.append("vegetarien", "true");
  if (filters.sansPorc) query.append("sansPorc", "true");
  if (filters.difficulty) query.append("difficulty", filters.difficulty);

  const response = await fetch(`${API_URL}/api/recipes/random?${query.toString()}`);

  if (response.status === 204) return []; // backend can return 204 (no content)
  if (!response.ok) throw new Error("Server error");

  const raw = await response.json();

  // map each summary DTO into a Recipe compatible with cards
  return Array.isArray(raw) ? raw.map(mapRecipeSummary) : [];
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
  const query = new URLSearchParams();
  query.append("recipesNumber", "1");
  if (filters.vegetarien) query.append("vegetarien", "true");
  if (filters.sansPorc) query.append("sansPorc", "true");
  if (filters.difficulty) query.append("difficulty", filters.difficulty);

  const response = await fetch(`${API_URL}/api/recipes/random?${query.toString()}`);
  if (!response.ok) throw new Error("Server error");

  const raw = await response.json();
  const first = Array.isArray(raw) ? raw[0] : undefined;
  if (!first) throw new Error("No recipe returned");

  return mapRecipeSummary(first);
};
