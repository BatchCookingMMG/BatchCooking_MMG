import { RecipeIngredientsProps } from "@/features/recipes/types/recipeTypes";

const RecipeIngredients = ({ ingredients }: RecipeIngredientsProps) => {
  return (
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
  );
};

export default RecipeIngredients;
