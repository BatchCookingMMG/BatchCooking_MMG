// import placeholderImg from '@/assets/placeholderImg.png';
import { Link } from 'react-router-dom';
import { Recipe } from '../types/recipeTypes';

interface RecipeCardProps {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link to={`/recipe/${recipe.id}`}>
      <div className="bg-[#FDF8F4] border border-[#E6DCD2] rounded-xl shadow-sm p-3 w-full max-w-xs mx-auto hover:shadow-md transition-all">
        <img
          src={recipe.image || "/images/default-recipe.jpg"}
          alt="Image de la recette"
          className="w-full h-auto rounded-md object-cover"
        />
        <h3 className="text-base font-semibold mt-3 text-gray-800 truncate">
          {recipe.title}
        </h3>
        <div className="text-xs text-gray-500 mt-1 flex gap-2">
          <span>⏱ {recipe.preparation_time}</span>
          <span>🧑‍🍳 {recipe.difficulty}</span>
        </div>
      </div>
    </Link>
  );
}