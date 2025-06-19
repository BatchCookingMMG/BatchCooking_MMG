import { RecipeStepsProps } from "@/features/recipes/types/recipeTypes";

const RecipeSteps = ({ steps }: RecipeStepsProps) => {
  return (
    <section className="w-full">
      <h2 className="text-xl font-semibold mb-2">Étapes</h2>
      <ol className="list-decimal list-inside space-y-2">
        {steps.map((step, index) => (
          <li key={index}>{step.text}</li>
        ))}
      </ol>
    </section>
  );
};

export default RecipeSteps;
