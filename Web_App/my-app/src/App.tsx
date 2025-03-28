import React from 'react';
import Recipe from './components/Recipe';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <div>
      <h1>Batch Cooking - Recette</h1>
      <Recipe />  
    </div>      
      </header>
    </div>
  );
}

export default App;
