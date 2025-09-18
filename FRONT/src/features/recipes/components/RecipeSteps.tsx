import { Step } from "@/features/recipes/types/recipeTypes";

type RecipeStepsProps = {
  steps: Step[];
};

const RecipeSteps = ({ steps }: RecipeStepsProps) => {
  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 text-base text-gray-800 w-full h-full">
      <section className="w-full">
        <h2 className="text-xl font-semibold mb-2">Étapes</h2>
        <ol className="list-decimal list-inside space-y-2">
          {steps.map((step, index) => (
            <li key={index}>{step.text}</li>
          ))}
        </ol>
      </section>
    </div>
  );
};

export default RecipeSteps;
