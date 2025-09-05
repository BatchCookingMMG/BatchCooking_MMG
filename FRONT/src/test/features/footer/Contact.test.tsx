// src/test/features/footer/Contact.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Contact from '@/pages/Contact';
import { describe, it, expect, vi } from 'vitest'; // ✅ vi ajouté

describe('Contact component', () => {
  it('affiche tous les champs du formulaire', () => {
    render(<Contact />);

    expect(screen.getByLabelText(/nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /envoyer/i })).toBeInTheDocument();
  });

  it('affiche une alerte de démonstration quand on envoie le formulaire', () => {
    // ✅ mock avec vi
    window.alert = vi.fn();

    render(<Contact />);

    fireEvent.change(screen.getByLabelText(/nom/i), {
      target: { value: 'Jean Dupont' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'jean@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'Ceci est un message de test.' },
    });

    fireEvent.click(screen.getByRole('button', { name: /envoyer/i }));

    expect(window.alert).toHaveBeenCalledWith(
      'Message non envoyé : formulaire de démonstration (POC RNCP)'
    );
  });
});
