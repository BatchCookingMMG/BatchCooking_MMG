// DietToggleGroup.test.tsx

import { render, screen } from '@testing-library/react'; // Afficher le composant 
import userEvent from '@testing-library/user-event';
import DietToggleGroup from '@/features/filters/components/DietToggleGroup';
import { describe, test, expect, vi } from 'vitest';

describe('DietToggleGroup', () => {
  test('affiche les deux cases à cocher avec leurs labels', () => {
    render(
      <DietToggleGroup
        vegetarien={false}
        sansPorc={false}
        onChange={() => {}}
      />
    );

    // Vérifie que les deux labels sont présents
    expect(screen.getByText(/Végétarien 🥕/)).toBeInTheDocument();
    expect(screen.getByText(/Sans porc 🐷/)).toBeInTheDocument();
  });

  test('les cases reflètent les valeurs des props (checked)', () => {
    render(
      <DietToggleGroup
        vegetarien={true}
        sansPorc={false}
        onChange={() => {}}
      />
    );

    const vegetarienCheckbox = screen.getByLabelText(/Végétarien 🥕/);
    const sansPorcCheckbox = screen.getByLabelText(/Sans porc 🐷/);

    expect(vegetarienCheckbox).toBeChecked();
    expect(sansPorcCheckbox).not.toBeChecked();
  });

  test('clic sur "Végétarien" appelle onChange avec valeur inversée', async () => {
    const handleChange = vi.fn();

    render(
      <DietToggleGroup
        vegetarien={false}
        sansPorc={true}
        onChange={handleChange}
      />
    );

    const checkbox = screen.getByLabelText(/Végétarien 🥕/);
    await userEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledWith({
      vegetarien: true,
      sansPorc: true,
    });
  });

  test('clic sur "Sans porc" appelle onChange avec valeur inversée', async () => {
    const handleChange = vi.fn();

    render(
      <DietToggleGroup
        vegetarien={true}
        sansPorc={false}
        onChange={handleChange}
      />
    );

    const checkbox = screen.getByLabelText(/Sans porc 🐷/);
    await userEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledWith({
      vegetarien: true,
      sansPorc: true,
    });
  });
});
