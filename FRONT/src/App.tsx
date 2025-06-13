import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RandomRecipe from "./RandomRecipe";
import { RecipeDetailPage } from "@/pages";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Recettes</h1>
        <Routes>
          {/* Route par défaut : liste aléatoire */}
          <Route path="/" element={<RandomRecipe />} />

          {/* Détail d'une recette par ID */}
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
