import RecipeCard from './RecipeCard';
import type { RecipeListCard } from '@/features/recipes/types/recipeTypes';

interface Props {
  recipes: RecipeListCard[];
}

export default function RecipeListCard({ recipes }: Props) {
  console.log('📦 Données reçues dans RecipeListCard :', recipes);

  if (recipes.length === 0) {
    return <p className="text-center text-gray-600">Aucune recette trouvée.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {recipes.map((r) => (
        <RecipeCard
          key={r.id}
          recipe={{
            id: r.id,
            title: r.title,
            image: r.image || '',
            preparation_time: r.preparation_time,
            difficulty: r.difficulty,
          }}
        />
      ))}
    </div>
  );
}
