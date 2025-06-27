package com.example.batchCooking.dto;

import java.util.List;

public class RecipeRequestDTO {
    private List<Integer> recipeIds;

    public List<Integer> getRecipeIds() {
        return recipeIds;
    }

    public void setRecipeIds(List<Integer> recipeIds) {
        this.recipeIds = recipeIds;
    }
}
