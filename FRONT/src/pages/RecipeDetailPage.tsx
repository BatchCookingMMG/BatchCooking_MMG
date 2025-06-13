import React from "react";
import { RecipeSummary } from "@/features/recipes";

function RecipeDetailPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Détails de la recette</h1>

      {/* Résumé de la recette */}
      <RecipeSummary />

      {/* Tu pourras ajouter ici d’autres sections comme :
          - Ingrédients
          - Étapes
          - Images
      */}
    </div>
  );
}

export default RecipeDetailPage;
