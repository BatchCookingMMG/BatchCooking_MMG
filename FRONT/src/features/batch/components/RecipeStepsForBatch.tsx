import { RecipeStepsDTO } from '../types/BatchTypes';

interface Props {
    recipes: RecipeStepsDTO[];
}

export const RecipeStepsForBatch = ({ recipes }: Props) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {recipes.map((recipe) => (
            <div
                key={recipe.title}
                className="border-2 border-[#edc59d] rounded-2xl p-4 bg-white shadow-sm"
            >
                <h3 className="text-lg font-semibold mb-2">{recipe.title}</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                    {recipe.steps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                    ))}
                </ul>
            </div>
        ))}
    </div>
);
