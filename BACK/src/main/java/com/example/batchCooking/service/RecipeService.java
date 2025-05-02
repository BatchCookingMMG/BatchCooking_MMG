package com.example.batchCooking.service;

import aj.org.objectweb.asm.commons.Remapper;
import com.example.batchCooking.model.Recipe;
import com.example.batchCooking.repository.RecipeRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;

    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    public List<Recipe> getRandomNRecipes(Integer n) {
        return recipeRepository.findRandomRecipes(n);
    }

    public Optional<Recipe> getRecipeById(Integer id) {
        return recipeRepository.findById(id);
    }
}