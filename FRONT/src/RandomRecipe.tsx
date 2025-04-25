import React, { useState, useEffect } from "react";
const RandomRecipe = () => {
  const BACKEND_URL = "http://localhost:8083/api/recipes/3";
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(BACKEND_URL);
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error("Erreur lors de la récupération de la recette:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [BACKEND_URL]);
  if (loading) {
    return <div>Chargement...</div>;
  }
  return (
    <div>
      <h2>Recette : {recipe ? recipe.name : "Aucune recette trouvée"}</h2>
      {/* Afficher les détails de la recette ici */}
    </div>
  );
};
export default RandomRecipe;