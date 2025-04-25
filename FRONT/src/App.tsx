import React from 'react';
import RandomRecipe from './RandomRecipe'; // Assure-toi d'importer le bon chemin
function App() {
  return (
    <div className="App">
      <h1>Recette aléatoire</h1>
      <RandomRecipe />
    </div>
  );
}
export default App;