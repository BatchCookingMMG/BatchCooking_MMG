package com.example.batchCooking.service;

import com.example.batchCooking.model.Recipe;
import com.example.batchCooking.repository.RecipeRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;

    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    public List<Recipe> getRandomNRecipes(int n) {
        return recipeRepository.findRandomRecipes(n);
    }
}