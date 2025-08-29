import { BatchResponseDTO } from '../types/BatchTypes';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchBatch = async (recipeIds: number[]): Promise<BatchResponseDTO> => {
    console.log('fetchBatch appelé avec :', recipeIds);
    try {
        const response = await fetch(`${API_URL}/api/batch/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ recipeIds }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
        }

        const data: BatchResponseDTO = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur dans fetchBatch :', error);
        throw error;
    }
};
