import RecipeCard from './RecipeCard';
import type { RecipeListCard } from '@/features/recipes/types/recipeTypes';

interface Props {
  recipes: RecipeListCard[];
}

export default function RecipeListCard({ recipes }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 px-2">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
