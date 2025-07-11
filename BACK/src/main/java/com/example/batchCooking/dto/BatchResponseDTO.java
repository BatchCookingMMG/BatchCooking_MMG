package com.example.batchCooking.dto;

import java.util.List;

public class BatchResponseDTO {
    private List<MutualizedStepDTO> mutualizedSteps;
    private List<RecipeStepsDTO> recipes;

    public List<MutualizedStepDTO> getMutualizedSteps() {
        return mutualizedSteps;
    }

    public void setMutualizedSteps(List<MutualizedStepDTO> mutualizedSteps) {
        this.mutualizedSteps = mutualizedSteps;
    }

    public List<RecipeStepsDTO> getRecipes() {
        return recipes;
    }

    public void setRecipes(List<RecipeStepsDTO> recipes) {
        this.recipes = recipes;
    }
}