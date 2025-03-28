import React, { useState, useEffect } from "react";
import axios from "axios";

// Définition du type pour une recette
interface RecetteType {
  id: number;
  nom: string;
  ingredients: string[];
  instructions: string;
}

const Recipe: React.FC = () => {
  const [recette, setRecette] = useState<RecetteType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/recette/1") // 🔹 Mets l'URL de ton backend
      .then(response => {
        setRecette(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération de la recette:", error);
        setError("Impossible de récupérer la recette");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!recette) return <p>Aucune recette trouvée.</p>;

  return (
    <div>
      <h2>{recette.nom}</h2>
      <h3>Ingrédients :</h3>
      <ul>
        {recette.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions :</h3>
      <p>{recette.instructions}</p>
    </div>
  );
};

export default Recipe;
