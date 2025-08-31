import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import { RecipeDetailPage, FilteredRecipesPage } from "@/pages";
import { LoginForm, RegisterForm } from "@/features/users";
import BatchPage from "./pages/BatchPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* TODO : Route dédiée pour login, sans layout, à revoir si on passe en mode popin */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          {/* Routes avec layout principal */}
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
    </Router>
  );
}

export default App;
