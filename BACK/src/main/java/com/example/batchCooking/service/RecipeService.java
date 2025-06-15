package com.example.batchCooking.service;

import com.example.batchCooking.model.CostEnum;
import com.example.batchCooking.model.DifficultyEnum;
import com.example.batchCooking.model.Recipe;
import com.example.batchCooking.repository.RecipeRepository;
import com.example.batchCooking.repository.RecipeRepositoryCustom;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;

    private final RecipeRepositoryCustom recipeRepositoryCustom;

    public RecipeService(RecipeRepository recipeRepository, @Qualifier("recipeRepositoryImpl") RecipeRepositoryCustom recipeRepositoryCustom) {
        this.recipeRepository = recipeRepository;
        this.recipeRepositoryCustom = recipeRepositoryCustom;
    }

    public List<Recipe> getRandomNRecipes(Integer recipesNumber, boolean vegetarien, boolean sansPorc, DifficultyEnum difficultyEnum, CostEnum costEnum) {
        return recipeRepositoryCustom.findFilteredRandomRecipes(recipesNumber, vegetarien, sansPorc, difficultyEnum, costEnum);
    }


    public Optional<Recipe> getRecipeById(Integer id) {
        return recipeRepository.findById(id);
    }
}