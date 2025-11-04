import { useNavigate } from "react-router-dom";
import { useState } from "react";

import RecipesNumberInput from "./components/RecipesNumberInput";
import DietToggleGroup from "./components/DietToggleGroup";
import DifficultySelector from "./components/DifficultySelector";

export default function FilterForm() {
  const navigate = useNavigate();

  const [recipesNumber, setRecipesNumber] = useState(2);
  const [vegetarien, setVegetarien] = useState(false);
  const [sansPorc, setSansPorc] = useState(false);
  const [difficulty, setDifficulty] = useState("FACILE");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.append("recipesNumber", recipesNumber.toString());

    if (vegetarien) params.append("vegetarien", "true");
    if (sansPorc) params.append("sansPorc", "true");
    if (difficulty) params.append("difficulty", difficulty);

    navigate(`/filtered-recipes?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/10 backdrop-blur p-6 rounded-xl w-full flex flex-col items-start gap-4"
    >
      <h2 className="text-xl font-bold">Commencer la génération de vos repas !</h2>
      <p className="text-sm">Dites-nous tout, on s’occupe du reste 🍽</p>

      <RecipesNumberInput value={recipesNumber} onChange={setRecipesNumber} />

      <div className="flex flex-col items-start w-full gap-2">
        <DietToggleGroup
          vegetarien={vegetarien}
          sansPorc={sansPorc}
          onChange={({ vegetarien, sansPorc }) => {
            setVegetarien(vegetarien);
            setSansPorc(sansPorc);
          }}
        />
      </div>

      <DifficultySelector value={difficulty} onChange={setDifficulty} />

      <button
        type="submit"
        className="bg-orange-500 text-white font-bold px-4 py-2 rounded-md hover:bg-orange-600 transition-all"
        aria-label="Générer les recettes"
      >
        Générer les recettes
      </button>
    </form>
  );
}
