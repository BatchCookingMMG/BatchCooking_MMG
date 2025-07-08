import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RandomRecipe from "./RandomRecipe";
import { RecipeDetailPage } from '@/pages';
import Home from '@/pages/Home';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Accueil avec toutes les recettes */}
          <Route path="/home" element={<Home />} />

          {/* Page aléatoire par défaut (racine) */}
          <Route path="/" element={<RandomRecipe />} />


          {/* Détail d'une recette par ID */}
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
