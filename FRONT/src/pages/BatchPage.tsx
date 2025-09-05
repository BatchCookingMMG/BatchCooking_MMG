import { useEffect, useState } from 'react';
import { fetchBatch } from '@/features/batch/api/batchApi';
import { BatchResponseDTO } from '@/features/batch/types/BatchTypes';
import MutualizedSteps from '@/features/batch/components/MutualizedSteps';
import { RecipeStepsForBatch } from '@/features/batch/components/RecipeStepsForBatch';
import RecipeCard from '@/features/recipes/components/RecipeCard';
import { fetchRecipeById } from '@/features/recipes/api/recipeApi';
import { Recipe } from '@/features/recipes/types/recipeTypes';
import ShoppingList from '@/features/batch/components/ShoppingList';
import { useLocation } from 'react-router-dom';


const BatchPage = () => {
    const [batchData, setBatchData] = useState<BatchResponseDTO | null>(null);
    const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);
    const [error, setError] = useState<string | null>(null);

    const location = useLocation();
    const recipeIds: number[] = location.state?.recipeIds || [];



    useEffect(() => {
        const fetchData = async () => {
            try {
                const [batchResponse, recipesDetails] = await Promise.all([
                    fetchBatch(recipeIds),
                    Promise.all(recipeIds.map((id) => fetchRecipeById(id)))
                ]);
                console.log('batchResponse', batchResponse);
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
        <div className="p-4 space-y-8">
            {/* 🔝 Carrousel de recettes */}
            <div className="overflow-x-auto pb-4">
                <div className="flex gap-4 w-max">
                    {selectedRecipes.map((recipe) => (
                        <div key={recipe.id} className="min-w-[200px]">
                            <RecipeCard recipe={recipe} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 p-6">
                {/* Colonne de gauche : liste de courses */}
                <ShoppingList shoppingList={batchData.shopping_list} />

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
        </div>
    );
};

export default BatchPage;
