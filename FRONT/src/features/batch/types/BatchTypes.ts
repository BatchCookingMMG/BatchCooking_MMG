export interface MutualizedStepDTO {
    category: string;
    steps: string[];
}

export interface RecipeStepsDTO {
    title: string;
    steps: string[];
}

export type ShoppingListItem = {
    category: string;
    quantity: number | null;
    unit: string;
};

export interface BatchResponseDTO {
    mutualizedSteps: MutualizedStepDTO[];
    recipes: RecipeStepsDTO[];
    shopping_list: Record<string, ShoppingListItem>;
}