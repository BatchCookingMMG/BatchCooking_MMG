// src/features/filters/FilterForm.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterForm from '@/features/filters/FilterForm';
import { describe, test, expect, vi } from 'vitest';

// ✅ Mock de useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('FilterForm', () => {
   
  test('affiche le titre et le texte', () => {
    render(<FilterForm />);
    expect(
      screen.getByRole('heading', {
        name: /Commencer la génération de vos repas/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Dites-nous tout, on s’occupe du reste/i)
    ).toBeInTheDocument();
  });

  test('soumet le formulaire et redirige avec les bons paramètres', async () => {
    render(<FilterForm />);
    const user = userEvent.setup();

    // Clique sur le bouton
    await user.click(
      screen.getByRole('button', { name: /générer les recettes/i })
    );

    // Vérifie que navigate est appelé avec les bons paramètres
    expect(mockNavigate).toHaveBeenCalled();
    const url = mockNavigate.mock.calls[0][0];

    // Vérifie les paramètres dans l’URL générée
    expect(url).toMatch(/\/filtered-recipes\?/);
    expect(url).toMatch(/recipesNumber=2/);
    expect(url).toMatch(/difficulty=FACILE/);
    // selon valeurs cochées, on peut aussi tester sansPorc ou vegetarien
  });
});
