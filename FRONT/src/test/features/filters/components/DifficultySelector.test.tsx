// DifficultySelector.test.tsx

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DifficultySelector from '@/features/filters/components/DifficultySelector';
import { describe, test, expect, vi } from 'vitest';

describe('DifficultySelector', () => {
  test('affiche les 3 options de difficulté', () => {
    render(<DifficultySelector value="FACILE" onChange={() => {}} />);
    
    // Vérifie que les 3 options sont présentes
    expect(screen.getByRole('option', { name: /Facile/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Moyen/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Difficile/i })).toBeInTheDocument();
  });

  test('la valeur sélectionnée correspond à la prop "value"', () => {
    render(<DifficultySelector value="MOYEN" onChange={() => {}} />);
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('MOYEN');
  });

  test('déclenche onChange avec la nouvelle valeur lors du changement', async () => {
    const handleChange = vi.fn();

    render(<DifficultySelector value="FACILE" onChange={handleChange} />);

    const select = screen.getByRole('combobox');

    // Simule un changement vers "DIFFICILE"
    await userEvent.selectOptions(select, 'DIFFICILE');

    expect(handleChange).toHaveBeenCalledWith('DIFFICILE');
  });
});
