import { RecipeImageProps } from "@/features/recipes/types/recipeTypes";

const RecipeImage = ({ image }: RecipeImageProps) => {
  const defaultImage = "/images/default-recipe.jpg";

  return (
    <img
      src={image || defaultImage}
      alt="Image de la recette"
      className="w-full h-auto rounded-md object-cover"
    />
  );
};

export default RecipeImage;
