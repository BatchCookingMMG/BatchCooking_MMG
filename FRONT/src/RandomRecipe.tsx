import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
const RandomRecipe = () => {
    const BACKEND_URL = "http://localhost:8083";
    const [recipes, setRecipes] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRecipes = async () => {

            try {
                const response = await fetch(`http://localhost:8083/api/recipes/random/3`);
                const data = await response.json();
                setRecipes(data);
            } catch (error) {
                console.error("Erreur lors de la récupération de la recette:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipes();
    }, []);
    if (loading) {
        return <div>Chargement...</div>;
    }
    return (
        <div>
            {recipes.length > 0 ? (
                recipes.map((recipe, index) => (
                    <div key={index}>
                        <h2>Recette : {recipe.title}</h2>
                        <p>Temps de préparation : {recipe.preparation_time}</p>
                        <p>Difficulté : {recipe.difficulty}</p>
                        <p>Coût : {recipe.cost}</p>
                        <p>Nombre de personnes : {recipe.people_number}</p>

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
                        <hr />
                    </div>
                ))
            ) : (
                <p>Aucune recette trouvée.</p>
            )}
        </div>
    );
};
export default RandomRecipe;