import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecipeDetailPage } from "@/pages";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Détail d'une recette par ID */}
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
