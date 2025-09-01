import { BatchResponseDTO } from '../types/BatchTypes';
import { logInfo, logWarn, logError } from "../../../core/logging/logger";


const API_URL = import.meta.env.VITE_API_URL;

export const fetchBatch = async (recipeIds: number[]): Promise<BatchResponseDTO> => {
    logInfo(`Appel API /api/batch/generate avec ${recipeIds.length} recettes`);

    try {
        const response = await fetch(`${API_URL}/api/batch/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ recipeIds }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            await logWarn(`Réponse non OK du back : ${response.status} - ${errorText}`);
            throw new Error(`Erreur backend (${response.status})`);
        }

        const data: BatchResponseDTO = await response.json();
        logInfo(`Batch généré avec succès pour les recettes : ${JSON.stringify({ recipeIds })}`);
        return data;
    } catch (error) {
        await logError("Erreur lors de l’appel à /api/batch/generate", error as Error);
        throw error;
    }
};
