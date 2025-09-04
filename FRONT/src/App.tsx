import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import { RecipeDetailPage, FilteredRecipesPage } from "@/pages";
import ErrorBoundary from "./core/logging/errorBoundary";
import { logInfo } from "./core/logging/logger";
import BatchPage from "./pages/BatchPage";
import MentionsLegales from "@/pages/MentionsLegales";
import Contact from "@/pages/Contact";




function App() {
  React.useEffect(() => {
    logInfo("Test log front OK", "App.tsx");
  }, []);

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
               <Route path="mentions-legales" element={<MentionsLegales />} /> 
               <Route path="contact" element={<Contact />} />

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
