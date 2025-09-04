/// <reference types="vitest" />
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

/** Fabrique une "Response" compatible fetch */
function makeResponse<T>(body: T, status = 200, statusText = 'OK') {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText,
    json: async () => body,
  } as any;
}

describe('recipesApi', () => {
  // On importera le module APRES avoir posé le mock
  let api: typeof import('@/features/recipes/api/recipeApi');
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    vi.restoreAllMocks();
    vi.resetModules();

    // 1) Mock global fetch (default: retourne un 200 avec {})
    fetchMock = vi.fn().mockImplementation((_url: any) => Promise.resolve(makeResponse({})));
    (globalThis as any).fetch = fetchMock;
    if (typeof window !== 'undefined') (window as any).fetch = fetchMock;

    // 2) Var d'env utilisée dans recipeApi
    (import.meta as any).env = { VITE_API_URL: 'https://api.test' };

    // 3) Import du module APRES installation du mock
    api = await import('@/features/recipes/api/recipeApi');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetchRecipeById : mappe le détail (snake_case -> camelCase) et imageUrl -> image', async () => {
    const detailPayload = {
      id: 42,
      title: 'Tarte aux pommes',
      tag: 'dessert',
      preparation_time: '30 min',
      difficulty: 'easy',
      cost: 'low',
      people_number: 4,
      ingredients: [{ quantity: 2, unit: 'pcs', ingredient: 'pomme', category: 'fruit' }],
      steps: [{ text: 'Éplucher les pommes' }],
      image_url: 'https://img/42.jpg',
    };

    // Route selon l’URL : si c’est l’endpoint détail, renvoie notre payload
    fetchMock.mockImplementation((url: any) => {
      const u = String(url);
      if (u.includes('/api/recipes/id/42')) {
        return Promise.resolve(makeResponse(detailPayload));
      }
      // tout le reste (logs, etc.) reçoit un objet vide
      return Promise.resolve(makeResponse({}));
    });

    const recipe = await api.fetchRecipeById(42);

    expect(fetchMock).toHaveBeenCalled();
    expect(recipe).toMatchObject({
      id: 42,
      title: 'Tarte aux pommes',
      tag: 'dessert',
      preparationTime: '30 min',
      difficulty: 'easy',
      cost: 'low',
      peopleNumber: 4,
      image: 'https://img/42.jpg',
    });
    expect(recipe.ingredients[0]).toMatchObject({
      quantity: 2,
      unit: 'pcs',
      ingredient: 'pomme',
      category: 'fruit',
    });
    expect(recipe.steps[0]).toMatchObject({ text: 'Éplucher les pommes' });
  });

  it('fetchFilteredRecipes : renvoie une liste mappée (summary)', async () => {
    const listPayload = [
      {
        id: 1,
        title: 'Salade',
        tag: 'starter',
        preparation_time: '10 min',
        difficulty: 'easy',
        image_url: '/img1.jpg',
      },
      {
        id: 2,
        title: 'Soupe',
        tag: 'starter',
        preparation_time: '20 min',
        difficulty: 'medium',
        image_url: '/img2.jpg',
      },
    ];

    fetchMock.mockImplementation((url: any) => {
      const u = String(url);
      if (u.includes('/api/recipes/random')) {
        return Promise.resolve(makeResponse(listPayload));
      }
      return Promise.resolve(makeResponse({}));
    });

    const list = await api.fetchFilteredRecipes({ recipesNumber: 2 });

    expect(Array.isArray(list)).toBe(true);
    expect(list).toHaveLength(2);
    expect(list[0]).toMatchObject({
      id: 1,
      title: 'Salade',
      tag: 'starter',
      preparationTime: '10 min',
      difficulty: 'easy',
      image: '/img1.jpg',
      cost: '',
      peopleNumber: 0,
      ingredients: [],
      steps: [],
    });
    expect(list[1]).toMatchObject({
      id: 2,
      title: 'Soupe',
      preparationTime: '20 min',
      difficulty: 'medium',
      image: '/img2.jpg',
    });
  });

  it('fetchOneFilteredRecipe : renvoie le 1er élément mappé (summary)', async () => {
    const listPayload = [
      { id: 10, title: 'Pâtes', tag: 'main', preparation_time: '15 min', difficulty: 'easy', image_url: '/pates.jpg' },
      { id: 11, title: 'Riz',   tag: 'main', preparation_time: '12 min', difficulty: 'easy', image_url: '/riz.jpg' },
    ];

    fetchMock.mockImplementation((url: any) => {
      const u = String(url);
      if (u.includes('/api/recipes/random')) {
        return Promise.resolve(makeResponse(listPayload));
      }
      return Promise.resolve(makeResponse({}));
    });

    const one = await api.fetchOneFilteredRecipe({ difficulty: 'easy' });

    expect(one).toMatchObject({
      id: 10,
      title: 'Pâtes',
      tag: 'main',
      preparationTime: '15 min',
      difficulty: 'easy',
      image: '/pates.jpg',
      cost: '',
      peopleNumber: 0,
    });
  });

  it('fetchRecipeById : lève une erreur si response.ok === false', async () => {
    fetchMock.mockImplementation((url: any) => {
      const u = String(url);
      if (u.includes('/api/recipes/id/1')) {
        // On force un 500 pour l’appel API
        return Promise.resolve(makeResponse({ message: 'Boom' }, 500, 'Internal Server Error'));
      }
      return Promise.resolve(makeResponse({}));
    });

    await expect(api.fetchRecipeById(1)).rejects.toThrow(/Erreur HTTP 500/i);
  });
});
