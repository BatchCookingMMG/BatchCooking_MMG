import { Recipe } from "@/features/recipes/types/recipeTypes";
import { Utensils, ChefHat, Timer, BadgeEuro, Tag } from "lucide-react";

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
  const recipeInfo = [
    {
      icon: <Tag size={16} />,
      label: "Catégorie",
      value: recipe.tag,
    },
    {
      icon: <Utensils size={16} />,
      label: "Personnes",
      value: recipe.peopleNumber,
    },
    {
      icon: <ChefHat size={16} />,
      label: "Difficulté",
      value: recipe.difficulty,
    },
    {
      icon: <Timer size={16} />,
      label: "Temps préparation",
      value: recipe.preparationTime,
    },
    {
      icon: <BadgeEuro size={16} />,
      label: "Coût",
      value: recipe.cost,
    },
  ];

  return (
    <div className="bg-[#efd0b0] rounded-2xl p-4 md:p-6 text-base text-gray-800 w-full h-full">
      {/* Informations de la recette */}
      <div className="space-y-3 md:space-y-4">
        {recipeInfo.map((info, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="flex-shrink-0 w-6 flex justify-center">
              {info.icon}
            </div>
            <span className="font-semibold min-w-0 flex-shrink-0 w-24 md:w-32">
              {info.label}
            </span>
            <div className="text-right flex-1">
              {info.label === "Catégorie" ? (
                <span
                  className={`inline-block text-xs px-2 py-1 rounded-full font-semibold ${getTagStyle(
                    String(info.value)
                  )}`}
                >
                  {info.value}
                </span>
              ) : (
                <span className="truncate">{info.value}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeSummary;
