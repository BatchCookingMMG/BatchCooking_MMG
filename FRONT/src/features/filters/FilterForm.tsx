import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FilterForm() {
  const navigate = useNavigate();

  const [vegetarien, setVegetarien] = useState(false);
  const [sansPorc, setSansPorc] = useState(false);
  const [difficulty, setDifficulty] = useState(""); // "", "FACILE", "MOYEN", "DIFFICILE"
  const [recipesNumber, setRecipesNumber] = useState(6);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const query = new URLSearchParams();

    if (vegetarien) query.append("vegetarien", "true");
    if (sansPorc) query.append("sansPorc", "true");
    if (difficulty) query.append("difficulty", difficulty);
    query.append("recipesNumber", recipesNumber.toString());

    navigate(`/filtered-recipes?${query.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>
          <input
            type="checkbox"
            checked={vegetarien}
            onChange={(e) => setVegetarien(e.target.checked)}
          />
          Végétarien
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={sansPorc}
            onChange={(e) => setSansPorc(e.target.checked)}
          />
          Sans porc
        </label>
      </div>

      <div>
        <label>Difficulté :</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="border rounded p-1"
        >
          <option value="">-- Choisir --</option>
          <option value="FACILE">Facile</option>
          <option value="MOYEN">Moyen</option>
          <option value="DIFFICILE">Difficile</option>
        </select>
      </div>

      <div>
        <label>
          Nombre de recettes :
          <input
            type="number"
            min="2"
            max="14"
            value={recipesNumber}
            onChange={(e) => setRecipesNumber(Number(e.target.value))}
            className="border rounded p-1 ml-2"
          />
        </label>
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Générer les recettes 🍽️
      </button>
    </form>
  );
}
