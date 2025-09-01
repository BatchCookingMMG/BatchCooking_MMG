import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import { RecipeDetailPage, FilteredRecipesPage } from "@/pages";
import ErrorBoundary from "./core/logging/errorBoundary";
import BatchPage from "./pages/BatchPage";

function App() {
  return (
    <Router>
      <ErrorBoundary fallback={<p>Une erreur inattendue est survenue.</p>}>

        <div className="App">
          <Routes>
            {/* Toutes les routes qui partagent le même layout passent ici */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              {/* Détail recette */}
              <Route path="recipe/:id" element={<RecipeDetailPage />} />
              <Route path="filtered-recipes" element={<FilteredRecipesPage />} />
            </Route>

            {/* Route pour le batch */}
            <Route path="/batch" element={<BatchPage />} />
          </Routes>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
