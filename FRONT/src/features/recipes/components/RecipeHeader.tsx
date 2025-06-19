import { RecipeHeaderProps } from "@/features/recipes/types/recipeTypes";

const RecipeHeader = ({ title }: RecipeHeaderProps) => {
  return <h1 className="text-3xl font-bold text-center">{title}</h1>;
};

export default RecipeHeader;
