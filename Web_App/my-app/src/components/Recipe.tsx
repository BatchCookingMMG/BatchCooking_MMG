import React, { useState, useEffect } from "react";
import axios from "axios";

// Définition du type pour une recette
interface RecetteType {
  id: number;
  nom: string;
  ingredients: string[];
  instructions: string;
  imageUrl: string; // Ajout d'une image pour chaque recette
}

const Recipe: React.FC = () => {
  const [recette, setRecette] = useState<RecetteType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get("https://run.mocky.io/v3/488cfcea-20e6-4b04-9b59-3d51bcd35610")
      .then(response => {
        const recetteTrouvee = response.data.find((recette: RecetteType) => recette.id === 1);
        if (recetteTrouvee) {
          setRecette(recetteTrouvee);
        } else {
          setError("Recette introuvable.");
        }
        setLoading(false);
      })
      .catch(error => {
        setError("Impossible de récupérer la recette");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!recette) return <p>Aucune recette trouvée.</p>;

  return (
    <div className="recipe-card">
      <img src={recette.imageUrl} alt={recette.nom} className="recipe-image" />
      <div className="recipe-content">
        <h2>{recette.nom}</h2>
        <h3>Ingrédients :</h3>
        <ul>
          {recette.ingredients.map((ingredient, index) => (
            <li key={index} className="ingredient-item">{ingredient}</li>
          ))}
        </ul>
        <h3>Instructions :</h3>
        <p>{recette.instructions}</p>
      </div>
    </div>
  );
};

export default Recipe;
