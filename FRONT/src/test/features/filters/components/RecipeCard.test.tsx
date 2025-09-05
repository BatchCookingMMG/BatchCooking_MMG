// RecipeCard.test.tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect } from "vitest";
import RecipeCard from "../../../../features/recipes/components/RecipeCard";

describe('RecipeCard', () => {
    const mockRecipe = {
        id: 1,
        title: 'Tarte aux pommes',
        tag: 'dessert',
        preparationTime: '45 min',
        difficulty: 'Facile',
        cost: 'bon marché',
        peopleNumber: 4,
        ingredients: [],
        steps: [],
        image: 'https://example.com/tarte.jpg',
      };
      
  test('affiche le titre de la recette', () => {
    render(
      <MemoryRouter>
        <RecipeCard recipe={mockRecipe} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Tarte aux pommes/i)).toBeInTheDocument();
  });

  test('affiche l’image avec le bon alt', () => {
    render(
      <MemoryRouter>
        <RecipeCard recipe={mockRecipe} />
      </MemoryRouter>
    );
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockRecipe.image);
    expect(image).toHaveAttribute('alt', mockRecipe.title);
  });

  test('affiche le temps de préparation', () => {
    render(
      <MemoryRouter>
        <RecipeCard recipe={mockRecipe} />
      </MemoryRouter>
    );
    expect(screen.getByText(/⏱ 45 min/i)).toBeInTheDocument();
  });

  test('affiche la difficulté', () => {
    render(
      <MemoryRouter>
        <RecipeCard recipe={mockRecipe} />
      </MemoryRouter>
    );
    expect(screen.getByText(/🧑‍🍳 Facile/i)).toBeInTheDocument();
  });

  test('affiche le bouton "Voir la recette"', () => {
    render(
      <MemoryRouter>
        <RecipeCard recipe={mockRecipe} />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /voir la recette/i })).toBeInTheDocument();
  });

  test('le lien pointe vers /recipe/1', () => {
    render(
      <MemoryRouter>
        <RecipeCard recipe={mockRecipe} />
      </MemoryRouter>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/recipe/1');
  });
}); 
