export interface MutualizedStepDTO {
    category: string;
    steps: string[];
}

export interface RecipeStepsDTO {
    title: string;
    steps: string[];
}

export interface BatchResponseDTO {
    mutualizedSteps: MutualizedStepDTO[];
    recipes: RecipeStepsDTO[];
}