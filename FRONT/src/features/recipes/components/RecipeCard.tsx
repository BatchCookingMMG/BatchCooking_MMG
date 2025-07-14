import { RecipeListCard } from '@/features/recipes/types/recipeTypes';
import placeholderImg from '/images/placeholder.png'; // ✅ Chemin correct pour public/
import { Link } from 'react-router-dom';

type Props = {
  recipe: RecipeListCard;
};

export default function RecipeCard({ recipe }: Props) {
  return (
    <Link to={`/recipe/${recipe.id}`}>
      <div className="bg-[#FDF8F4] border border-[#E6DCD2] rounded-xl shadow-sm p-3 w-full max-w-xs mx-auto hover:shadow-md transition-all">
        <img
          src={recipe.image || placeholderImg}
          alt={recipe.title}
          className="w-full h-32 object-cover rounded-md"
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
