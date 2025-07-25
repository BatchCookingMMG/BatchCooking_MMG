package com.example.batchCooking.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.Map;

public class BatchResponseDTO {
    private List<MutualizedStepDTO> mutualizedSteps;
    private List<RecipeStepsDTO> recipes;
    @JsonProperty("shopping_list")
    private Map<String, ShoppingItemDTO> shoppingList;

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

    public Map<String, ShoppingItemDTO> getShoppingList() {
        return shoppingList;
    }

    public void setShoppingList(Map<String, ShoppingItemDTO> shoppingList) {
        this.shoppingList = shoppingList;
    }
}