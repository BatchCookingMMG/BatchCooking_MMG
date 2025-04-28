import { useEffect, useState } from 'react';
import axios from 'axios';

// Définir l'interface Recipe pour inclure les informations supplémentaires
interface Recipe {
  title: string;
  preparationTime: string;
  difficulty: string;
  peopleNumber: number;
}

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]); // Spécifier que recipes est un tableau de Recipe
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8083/api/recipes/3';

    axios.get(apiUrl)
      .then(response => {
        console.log('Données reçues du backend :', response.data); 
        setRecipes(response.data);
      })
      .catch(err => {
        console.error('Erreur lors de la récupération des données :', err); 
        setError(err.message);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Random Recipes</h1>
      {error && <p className="text-red-500">Error: {error}</p>}

      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recipes.map((recipe, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              <p className="text-sm text-gray-500 mb-2"><strong>Preparation Time:</strong> {recipe.preparationTime}</p>
              <p className="text-sm text-gray-500 mb-2"><strong>Difficulty:</strong> {recipe.difficulty}</p>
              <p className="text-sm text-gray-500"><strong>Serves:</strong> {recipe.peopleNumber} people</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No recipes found</p>
      )}
    </div>
  );
}

export default App;