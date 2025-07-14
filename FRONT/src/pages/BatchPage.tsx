import { useEffect, useState } from 'react';
import { fetchBatch } from '@/features/batch/api/batchApi';
import { BatchResponseDTO } from '@/features/batch/types/BatchTypes';
import MutualizedSteps from '@/features/batch/components/MutualizedSteps';
import { RecipeStepsForBatch } from '@/features/batch/components/RecipeStepsForBatch';
import RecipeCard from '@/features/recipes/components/RecipeCard';
import { fetchRecipeById } from '@/features/recipes/api/recipeApi';
import { Recipe } from '@/features/recipes/types/recipeTypes';

const BatchPage = () => {
    const [batchData, setBatchData] = useState<BatchResponseDTO | null>(null);
    const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);
    const [error, setError] = useState<string | null>(null);

    const recipeIds = [13, 24, 30, 46, 51]; // exemple

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [batchResponse, recipesDetails] = await Promise.all([
                    fetchBatch(recipeIds),
                    Promise.all(recipeIds.map((id) => fetchRecipeById(id)))
                ]);

                setBatchData(batchResponse);
                setSelectedRecipes(recipesDetails);
            } catch (err: any) {
                console.error(err);
                setError(err.message || 'Une erreur est survenue');
            }
        };

        fetchData();
    }, []);

    if (error) return <p>Erreur : {error}</p>;
    if (!batchData) return <p>Chargement...</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 p-6">
            {/* Colonne de gauche : recettes */}
            <div className="md:col-span-1">
                <h2 className="text-2xl font-bold mb-4">Recettes sélectionnées</h2>
                <div className="flex flex-col gap-4">
                    {selectedRecipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            </div>

            {/* Colonne principale : étapes */}
            <div className="md:col-span-3 flex flex-col gap-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Étapes mutualisées</h2>
                    <MutualizedSteps steps={batchData.mutualizedSteps} />
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-4">Étapes par recette</h2>
                    <RecipeStepsForBatch recipes={batchData.recipes} />
                </div>
            </div>
        </div>
    );
};

export default BatchPage;
