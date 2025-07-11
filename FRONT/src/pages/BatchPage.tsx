import { useEffect, useState } from 'react';
import { fetchBatch } from '@/features/batch/api/batchApi';
import { BatchResponseDTO } from '@/features/batch/types/BatchTypes';
import MutualizedSteps from '@/features/batch/components/MutualizedSteps';
import { RecipeStepsForBatch } from '@/features/batch/components/RecipeStepsForBatch';

const BatchPage = () => {
    const [batchData, setBatchData] = useState<BatchResponseDTO | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchBatch([13, 24, 30, 46, 51]); // <-- exemple d'IDs
                setBatchData(response);
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
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Plan de Batch</h1>

            <MutualizedSteps steps={batchData.mutualizedSteps} />
            <RecipeStepsForBatch recipes={batchData.recipes} />
        </div>
    );
};

export default BatchPage;