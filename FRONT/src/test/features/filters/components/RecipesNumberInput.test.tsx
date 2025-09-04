// src/test/features/filters/components/RecipesNumberInput.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import RecipesNumberInput from '@/features/filters/components/RecipesNumberInput';

describe('RecipesNumberInput', () => {
  test('affiche le label et la valeur', () => {
    render(<RecipesNumberInput value={5} onChange={() => {}} />);

    const input = screen.getByLabelText(/nombre de repas/i) as HTMLInputElement;

    expect(input).toBeInTheDocument();
    // type="text" => la valeur est une string
    expect(input).toHaveValue('5');
  });

  test('appelle onChange avec la nouvelle valeur au blur', () => {
    const handleChange = vi.fn();
    render(<RecipesNumberInput value={5} onChange={handleChange} />);

    const input = screen.getByLabelText(/nombre de repas/i) as HTMLInputElement;

    // Tape "8" (ton composant ne déclenche pas onChange parent ici)
    fireEvent.change(input, { target: { value: '8' } });

    // Déclenche la normalisation qui appelle onChange(clamped)
    fireEvent.blur(input);

    expect(handleChange).toHaveBeenCalledWith(8);
  });
});
