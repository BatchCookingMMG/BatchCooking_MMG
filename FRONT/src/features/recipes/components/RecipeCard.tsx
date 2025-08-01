import { Recipe } from "@/features/recipes/types/recipeTypes";
import placeholderImg from "/images/placeholder.png";
import { Link } from "react-router-dom";

type RecipeCardProps = {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link to={`/recipe/${recipe.id}`}>
      <div className="bg-[#FDF8F4] border border-[#E6DCD2] rounded-xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg duration-200 max-w-[240px] flex flex-col">
        <img
          src={recipe.image || placeholderImg}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-3 flex flex-col flex-grow">
          <h3 className="text-base font-semibold text-gray-800 truncate">
            {recipe.title}
          </h3>
          <div className="text-sm text-gray-500 mt-1 flex gap-2">
            <span>⏱ {recipe.preparationTime}</span>
            <span>🧑‍🍳 {recipe.difficulty}</span>
          </div>
        </div>
        <div className="flex justify-between items-center px-3 pb-2 mt-auto">
          <button className="text-sm bg-orange-200 text-orange-700 px-3 py-1 rounded-full hover:bg-orange-300">
            Voir la recette
          </button>
          <span className="text-gray-500 text-xl">🍽</span>
        </div>
      </div>
    </Link>
  );
}
