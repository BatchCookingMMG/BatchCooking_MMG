import { Ingredient } from "@/features/recipes/types/recipeTypes";

type RecipeIngredientsProps = {
  ingredients: Ingredient[];
};

const RecipeIngredients = ({ ingredients }: RecipeIngredientsProps) => {
  return (
    <div className="bg-[#B0B18C] rounded-2xl p-4 md:p-6 text-base text-gray-800 w-full h-full">
      <section className="w-full">
        <h2 className="text-xl font-semibold mb-2">Ingrédients</h2>
        <ul className="list-disc list-inside">
          {ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.quantity ?? ""} {ingredient.unit}{" "}
              {ingredient.ingredient}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default RecipeIngredients;
