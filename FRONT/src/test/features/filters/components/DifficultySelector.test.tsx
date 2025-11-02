// DifficultySelector.test.tsx

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DifficultySelector from '@/features/filters/components/DifficultySelector';
import { describe, test, expect, vi } from 'vitest';

describe('DifficultySelector', () => {
  test('affiche les 3 options de difficulté', () => {
    render(<DifficultySelector value="FACILE" onChange={() => { }} />);

    // Vérifie que les 3 options sont présentes
    expect(screen.getByRole('option', { name: /^Facile$/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /^Moyenne$/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /^Très facile$/i })).toBeInTheDocument();
  });

  test('la valeur sélectionnée correspond à la prop "value"', () => {
    render(<DifficultySelector value="MOYENNE" onChange={() => { }} />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('MOYENNE');
  });

  test('déclenche onChange avec la nouvelle valeur lors du changement', async () => {
    const handleChange = vi.fn();

    render(<DifficultySelector value="FACILE" onChange={handleChange} />);

    const select = screen.getByRole('combobox');

    // Simule un changement vers "DIFFICILE"
    await userEvent.selectOptions(select, 'TRES_FACILE');

    expect(handleChange).toHaveBeenCalledWith('TRES_FACILE');
  });
});
