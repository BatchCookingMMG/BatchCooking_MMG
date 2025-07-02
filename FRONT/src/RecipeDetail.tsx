import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>(); // Récupérer l'id depuis l'URL
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `http://localhost:8083/api/recipes/id/${id}`
        );
        const data = await response.json();

        if (response.ok) {
          setRecipe(data); // Assurer que la réponse est bien reçue
        } else {
          throw new Error("Recette non trouvée");
        }
      } catch (error) {
        setError(
          "Une erreur est survenue lors de la récupération de la recette."
        );
        console.error("Erreur :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {recipe ? (
        <>
          <h2>{recipe.title}</h2>
          <p>
            <strong>Temps de préparation :</strong> {recipe.preparation_time}
          </p>
          <p>
            <strong>Difficulté :</strong> {recipe.difficulty}
          </p>
          <p>
            <strong>Coût :</strong> {recipe.cost}
          </p>
          <p>
            <strong>Nombre de personnes :</strong> {recipe.people_number}
          </p>

          <h3>Ingrédients :</h3>
          <ul>
            {recipe.ingredients?.map((ingredient: any, idx: number) => (
              <li key={idx}>
                {ingredient.quantity} {ingredient.unit} {ingredient.ingredient}
              </li>
            ))}
          </ul>

          <h3>Étapes :</h3>
          <ol>
            {recipe.steps?.map((step: any, idx: number) => (
              <li key={idx}>{step.text}</li>
            ))}
          </ol>
        </>
      ) : (
        <p>Aucune recette trouvée.</p>
      )}
    </div>
  );
};

export default RecipeDetail;
