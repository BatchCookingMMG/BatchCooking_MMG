import { useNavigate } from "react-router-dom";
import { RecipeListCard as RecipeType } from "@/features/recipes/types/recipeTypes";

interface Props {
  recipes: RecipeType[];
}

const GenerateBatchButton = ({ recipes }: Props) => {
  const navigate = useNavigate();
  console.log("📦 [GenerateBatchButton] Recettes reçues :", recipes);

  const handleClick = () => {
    const recipeIds = recipes.map((r) => r.id);
    navigate("/batch", { state: { recipeIds } });
    console.log("🧪 [GenerateBatchButton] IDs à envoyer :", recipeIds);
  };

  if (recipes.length === 0) return null;

  return (
    <button
      onClick={handleClick}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-6"
    >
      Générer le batch
    </button>
  );
};

export default GenerateBatchButton;
