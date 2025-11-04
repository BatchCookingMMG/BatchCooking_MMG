import { useNavigate } from "react-router-dom";
import { RecipeListCard as RecipeType } from "@/features/recipes/types/recipeTypes";
import { UtensilsCrossed } from "lucide-react";

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
      className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full 
                 bg-[#B3B38E] text-white text-sm font-medium shadow-sm
                 hover:shadow-md hover:brightness-105 
                 transform hover:-translate-y-0.5 transition-all duration-200"
       aria-label="Générer mon Batch Cooking"
    >
      Générer mon Batch Cooking
      <UtensilsCrossed className="w-4 h-4 text-white transition-transform duration-200 group-hover:rotate-12" />
    </button>
   
  );
};

export default GenerateBatchButton;
