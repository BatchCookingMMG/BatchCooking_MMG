import { Recipe } from "@/features/recipes/types/recipeTypes";

type RecipeSummaryProps = {
  recipe: Recipe;
};

const RecipeSummary = ({ recipe }: RecipeSummaryProps) => {
  return (
    <div className="bg-[#edc59d] rounded-2xl p-6 text-sm text-gray-800 w-full max-w-md">
      <div className="flex justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span role="img" aria-label="personnes">
              🍽️
            </span>
            <span className="font-semibold">Personnes</span>
            <span className="ml-2">{recipe.people_number}</span>
          </div>

          <div className="flex items-center gap-2">
            <span role="img" aria-label="difficulté">
              ⚙️
            </span>
            <span className="font-semibold">Difficulté</span>
            <span className="ml-2">{recipe.difficulty}</span>
          </div>

          <div className="flex items-center gap-2">
            <span role="img" aria-label="temps">
              ⏱️
            </span>
            <span className="font-semibold">Temps préparation</span>
            <span className="ml-2">{recipe.preparation_time}</span>
          </div>
        </div>

        <div className="space-y-4 text-right">
          <div>
            <span>{recipe.tag}</span>
          </div>

          <div>
            <span className="font-semibold">Coût</span>
            <br />
            <span>{recipe.cost}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeSummary;
