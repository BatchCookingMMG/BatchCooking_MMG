// src/test/api/RecipesApi.test.tsx
import { describe, it, expect, beforeEach, vi, type Mock } from "vitest";
import {
  fetchRecipeById,
  fetchFilteredRecipes,
  fetchOneFilteredRecipe,
} from "@/features/recipes/api/recipeApi";
import type { Recipe } from "@/features/recipes/types/recipeTypes";

// 👇 For the a11y (alt) test
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RecipeCard from "@/features/recipes/components/RecipeCard";

// Helper: mock a single fetch response (success by default)
function mockFetchOnce(body: any, status = 200) {
  (globalThis.fetch as unknown as Mock).mockResolvedValueOnce({
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 200 ? "OK" : "ERR",
    json: async () => body,
  } as Response);
}

beforeEach(() => {
  vi.restoreAllMocks();
  // stub global fetch for every test
  globalThis.fetch = vi.fn() as any;
});

describe("recipesApi", () => {
  it("fetchRecipeById maps snake_case and imageUrl -> image", async () => {
    // backend payload (what your Spring API returns)
    const backend = {
      id: 42,
      tag: "vegetarien",
      title: "Ratatouille",
      preparation_time: "30 min",
      difficulty: "Facile",
      cost: "bon marché",
      people_number: 2,
      ingredients: [],
      steps: [],
      imageUrl: "https://ex.com/42.png",
    };
    mockFetchOnce(backend);

    const recipe = await fetchRecipeById(42);

    // URL called (we only check the suffix to avoid env issues)
    expect((globalThis.fetch as Mock).mock.calls[0][0]).toMatch(
      /\/api\/recipes\/id\/42$/
    );

    // mapped object
    expect(recipe).toEqual({
      id: 42,
      tag: "vegetarien",
      title: "Ratatouille",
      preparationTime: "30 min",
      difficulty: "Facile",
      cost: "bon marché",
      peopleNumber: 2,
      ingredients: [],
      steps: [],
      image: "https://ex.com/42.png",
    } as Recipe);
  });

  it("fetchFilteredRecipes returns mapped list", async () => {
    const backendList = [
      {
        id: 1,
        tag: "vegetarien",
        title: "Curry",
        preparation_time: "20 min",
        difficulty: "Facile",
        imageUrl: "https://ex.com/1.png",
      },
      {
        id: 2,
        tag: "vegetarien",
        title: "Burger",
        preparation_time: "40 min",
        difficulty: "Moyen",
        imageUrl: null,
      },
    ];
    mockFetchOnce(backendList);

    const list = await fetchFilteredRecipes({ recipesNumber: 2, vegetarien: true });

    // URL called contains recipesNumber=2
    expect((globalThis.fetch as Mock).mock.calls[0][0]).toMatch(
      /\/api\/recipes\/random\?.*recipesNumber=2/
    );

    // mapping checks
    expect(list[0].preparationTime).toBe("20 min");
    expect(list[0].image).toBe("https://ex.com/1.png");
    expect(list[1].image).toBeNull();
  });

  it("fetchOneFilteredRecipe returns first result and maps image", async () => {
    const backendList = [
      {
        id: 9,
        tag: "dessert",
        title: "Tarte",
        preparation_time: "45 min",
        difficulty: "Facile",
        imageUrl: "https://ex.com/9.png",
      },
    ];
    mockFetchOnce(backendList);

    const item = await fetchOneFilteredRecipe({
      vegetarien: false,
      difficulty: "FACILE",
    });

    // URL called requests 1 recipe
    expect((globalThis.fetch as Mock).mock.calls[0][0]).toMatch(
      /\/api\/recipes\/random\?.*recipesNumber=1/
    );

    expect(item.id).toBe(9);
    expect(item.image).toBe("https://ex.com/9.png");
  });

  it("throws when response is not ok", async () => {
    (globalThis.fetch as unknown as Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Server Error",
      json: async () => ({}),
    } as Response);

    // Less strict check (only ensures the status code appears in the message)
    await expect(fetchRecipeById(1)).rejects.toThrow(/HTTP 500/);
  });
});

/* ---------- A11y test for <RecipeCard /> (ALT attribute) ---------- */

describe("RecipeCard a11y", () => {
  it("exposes an accessible name via alt (uses recipe.title)", () => {
    const recipe: Recipe = {
      id: 1,
      title: "Tarte aux pommes",
      tag: "dessert",
      preparationTime: "45 min",
      difficulty: "Facile",
      cost: "bon marché",
      peopleNumber: 4,
      ingredients: [],
      steps: [],
      image: "https://example.com/tarte.jpg",
    };

    render(
      <MemoryRouter>
        <RecipeCard recipe={recipe} />
      </MemoryRouter>
    );

    // getByRole('img', { name }) uses the accessible name (alt in this case)
    expect(
      screen.getByRole("img", { name: /tarte aux pommes/i })
    ).toBeInTheDocument();
  });
});
