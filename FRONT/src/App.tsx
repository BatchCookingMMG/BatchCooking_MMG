import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import RecipeDetailPage from "@/pages/RecipeDetailPage";
import { LoginForm } from "@/features/users";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route dédiée pour login, sans layout */}
          <Route path="/login" element={<LoginForm />} />

          {/* Routes avec layout principal */}
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
