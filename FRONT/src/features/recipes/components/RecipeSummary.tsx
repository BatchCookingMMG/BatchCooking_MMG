import { Recipe } from "@/features/recipes/types/recipeTypes";
import { Utensils, ChefHat, Timer, BadgeEuro } from "lucide-react";

type RecipeSummaryProps = {
  recipe: Recipe;
};

export const getTagStyle = (tag: string) => {
  switch (tag.toLowerCase()) {
    case "boeuf":
      return "bg-[#D3803C] border-[#a85f2e] text-white";
    case "vegetarien":
      return "bg-[#B0B18C] border-[#83865f] text-gray-800";
    case "poulet":
      return "bg-[#FFEFD5] border-[#e0c49f] text-gray-800";
    case "porc":
      return "bg-[#6BAA75] border-[#457a52] text-white";
    default:
      return "bg-gray-100 border-gray-300 text-gray-800";
  }
};

const RecipeSummary = ({ recipe }: RecipeSummaryProps) => {
  return (
    <div className="bg-[#efd0b0] rounded-2xl p-6 text-sm text-gray-800 w-full max-w-md h-full">
      {/* Mobile = 2 colonnes | Desktop = 1 colonne */}
      <div className="flex flex-row gap-8 md:flex-col md:gap-0 h-full justify-between">
        {/* Colonne gauche (Infos recette) */}
        <div className="space-y-4 md:space-y-0">
          <div className="grid grid-cols-[16px_140px_1fr] gap-2 items-center">
            <Utensils size={16} />
            <span className="font-semibold">Personnes</span>
            <span>{recipe.peopleNumber}</span>
          </div>
          <div className="grid grid-cols-[16px_140px_1fr] gap-2 items-center">
            <ChefHat size={16} />
            <span className="font-semibold">Difficulté</span>
            <span>{recipe.difficulty}</span>
          </div>
          <div className="grid grid-cols-[16px_140px_1fr] gap-2 items-center">
            <Timer size={16} />
            <span className="font-semibold">Temps préparation</span>
            <span>{recipe.preparationTime}</span>
          </div>
        </div>
        {/* Colonne droite (Coût + Tag) */}
        <div className="space-y-4 text-right md:text-left">
          {/* Bloc coût */}
          <div className="space-y-1">
            <div className="flex items-center justify-end md:justify-start gap-2">
              <BadgeEuro size={16} />
              <span className="font-semibold">Coût</span>
            </div>
            <div className="md:text-left">
              <span>{recipe.cost}</span>
            </div>
          </div>
          {/* Bloc tag */}
          <div>
            <span
              className={`text-xs px-2 py-1 rounded-full font-semibold ${getTagStyle(
                recipe.tag
              )}`}
            >
              {recipe.tag}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeSummary;
