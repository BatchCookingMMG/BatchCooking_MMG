/// <reference types="vitest" />
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HeroSection from '@/features/filters/components/HeroSection';
import { describe, test, expect, vi } from 'vitest';

vi.mock('@/features/filters/FilterForm', () => ({
  default: () => <div data-testid="filter-form">Mocked FilterForm</div>,
}));

describe('HeroSection', () => {
  test('affiche le titre principal', () => {
    render(
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>
    );
    expect(
      screen.getByRole('heading', { name: /libérez votre semaine/i })
    ).toBeInTheDocument();
  });

  test('affiche le texte de description', () => {
    render(
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>
    );
    expect(
      screen.getByText(
        /savourez chaque instant.*votre batch cooking simplifié/i
      )
    ).toBeInTheDocument();
  });

  test('affiche le formulaire de filtres (mocké)', () => {
    render(
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>
    );
    expect(screen.getByTestId('filter-form')).toBeInTheDocument();
  });

  test('affiche l’image avec le bon alt', () => {
    render(
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>
    );
    const image = screen.getByAltText(/repas batch/i);
    expect(image).toBeInTheDocument();
  });
});
