import { RecipeStepsDTO } from '../types/BatchTypes';

interface Props {
    recipes: RecipeStepsDTO[];
}

export const RecipeStepsForBatch = ({ recipes }: Props) => (
    <div className="flex flex-col gap-6 w-full">

        {recipes.map((recipe) => (
            <div
                key={recipe.title}
                className="bg-[#FDF8F4] border border-[#E6DCD2] rounded-xl shadow-sm p-6 w-full hover:shadow-md transition-all"
            >
                <h3 className="text-lg font-semibold mb-3 text-gray-800 truncate">{recipe.title}</h3>
                <ul className="list-disc pl-5 space-y-1 text-base text-gray-700">
                    {recipe.steps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                    ))}
                </ul>
            </div>
        ))}
    </div>
);
