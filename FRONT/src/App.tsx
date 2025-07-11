import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RandomRecipe from "./RandomRecipe";
import { RecipeDetailPage } from "@/pages";
import BatchPage from "./pages/BatchPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route par défaut : liste aléatoire */}
          <Route path="/" element={<RandomRecipe />} />

          {/* Détail d'une recette par ID */}
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />

          {/* Route pour le batch */}
          <Route path="/batch" element={<BatchPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
