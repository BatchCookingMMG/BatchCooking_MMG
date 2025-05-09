import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './App.css';
import RandomRecipe from './RandomRecipe';
import RecipeDetail from './RecipeDetail';

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
    <Router>
      <div className="App">
        <h1>Recettes</h1>
        <Routes>
          {/* Route par défaut : liste aléatoire */}
          <Route path="/" element={<RandomRecipe />} />

          {/* Détail d'une recette par ID */}
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;