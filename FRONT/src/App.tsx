import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { RecipeDetailPage } from "@/pages";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Toutes les routes qui partagent le même layout passent ici */}
          <Route path="/" element={<MainLayout />}>
            {/* Détail recette */}
            <Route path="recipe/:id" element={<RecipeDetailPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
