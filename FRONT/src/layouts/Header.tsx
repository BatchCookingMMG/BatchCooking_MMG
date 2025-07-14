// src/layout/Header.tsx
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 bg-white shadow-md">
      {/* Logo cliquable */}
      <Link to="/">
        <img src="/images/logo.png" alt="Logo" className="h-25 w-auto cursor-pointer" />
      </Link>
  
    {/* Filtres : cachés sur mobile, visibles à partir de md */}
    <nav className="hidden md:flex gap-4">
      <button className="text-sm font-medium">Végétarien</button>
      <button className="text-sm font-medium">Sans Porc</button>
    </nav>
  
    {/* Profil : toujours visible mais plus petit sur mobile */}
    <div className="flex items-center space-x-2">
      <img src="/images/profil.png" alt="Profil" className="h-8 w-10 md:h-8 md:w-10 rounded-full" />
    </div>
  </header>
  
  );
}
