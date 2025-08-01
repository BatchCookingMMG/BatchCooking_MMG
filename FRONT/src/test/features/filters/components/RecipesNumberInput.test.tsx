import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import RecipesNumberInput from "@/features/filters/components/RecipesNumberInput";


describe('RecipesNumberInput', () => {
  test('affiche le label et la valeur', () => {
    render(<RecipesNumberInput value={5} onChange={() => {}} />);
    expect(screen.getByLabelText(/nombre de repas/i)).toBeInTheDocument();
    expect(screen.getByRole('spinbutton')).toHaveValue(5);
  });

  test('appelle onChange avec la nouvelle valeur', () => {
    const handleChange = vi.fn();
    render(<RecipesNumberInput value={5} onChange={handleChange} />);

    const input = screen.getByRole('spinbutton') as HTMLInputElement;

    // ✅ Simule un changement : tape directement "8"
    fireEvent.change(input, { target: { value: '8' } });

    // Vérifie qu'on a bien reçu le bon nombre
    expect(handleChange).toHaveBeenCalledWith(8);
  });
});
