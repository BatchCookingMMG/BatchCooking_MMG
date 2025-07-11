// src/layout/Header.tsx
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4  bg-white shadow-md">
      {/* Logo à gauche */}
      <img src="/images/logo.png" alt="Logo" className="h-25 w-auto" />

      {/* Filtres : cachés sur mobile, visibles à partir de md */}
      <nav className="hidden md:flex gap-4">
        <Link
          to="/filtered-recipes?vegetarien=true"
          className="text-sm font-medium hover:underline"
        >
          Végétarien
        </Link>

        <Link
          to="/filtered-recipes?sansPorc=true"
          className="text-sm font-medium hover:underline"
        >
          Sans Porc
        </Link>

      </nav>

      {/* Profil : toujours visible mais plus petit sur mobile */}
      <div className="flex items-center space-x-2">
        <img src="/images/profil.png" alt="Profil" className="h-8 w-10 md:h-8 md:w-10 rounded-full" />
      </div>
    </header>

  );
}
