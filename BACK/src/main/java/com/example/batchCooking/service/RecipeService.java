package com.example.batchCooking.service;

import com.example.batchCooking.model.Recipe;
import com.example.batchCooking.repository.RecipeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;

    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    public List<Recipe> getRandomNRecipes(Integer recipesNumber, boolean vegetarien, boolean sansPorc) {

        String key = (vegetarien ? "V" : "") + (sansPorc ? "P" : "");

        List<Recipe> recipes = switch (key) {
            case "VP" -> recipeRepository.findRandomRecipesByTag("vegetarien", recipesNumber)
                    .stream()
                    .filter(r -> !"porc".equalsIgnoreCase(r.getTag()))
                    .collect(Collectors.toList());
            case "V"  -> recipeRepository.findRandomRecipesByTag("vegetarien", recipesNumber);
            case "P"  -> recipeRepository.findRandomRecipesExcludingTag("porc", recipesNumber);
            case ""   -> recipeRepository.findRandomRecipes(recipesNumber);
            default   -> throw new IllegalArgumentException("Invalid filters");
        };

        return recipes;
    }

    public Optional<Recipe> getRecipeById(Integer id) {
        return recipeRepository.findById(id);
    }
}