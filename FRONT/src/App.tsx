import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import RandomRecipe from "./RandomRecipe";
import RecipeDetail from "./RecipeDetail";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Recettes</h1>
        <Routes>
          {/* Route par défaut : liste aléatoire */}
          <Route path="/" element={<RandomRecipe />} />

          {/* Détail d'une recette par ID */}
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
