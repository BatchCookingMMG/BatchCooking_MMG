package com.example.batchCooking.service;

import com.example.batchCooking.dto.RecipeSummaryDTO;
import com.example.batchCooking.model.CostEnum;
import com.example.batchCooking.model.DifficultyEnum;
import com.example.batchCooking.model.Recipe;
import com.example.batchCooking.repository.RecipeRepository;
import com.example.batchCooking.repository.RecipeRepositoryCustom;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {

    private static final Logger logger = LogManager.getLogger(RecipeService.class);

    private final RecipeRepository recipeRepository;

    private final RecipeRepositoryCustom recipeRepositoryCustom;

    public RecipeService(RecipeRepository recipeRepository, @Qualifier("recipeRepositoryImpl") RecipeRepositoryCustom recipeRepositoryCustom) {
        this.recipeRepository = recipeRepository;
        this.recipeRepositoryCustom = recipeRepositoryCustom;
    }

    public List<RecipeSummaryDTO> getRandomNRecipes(Integer recipesNumber, boolean vegetarien, boolean sansPorc, DifficultyEnum difficultyEnum, CostEnum costEnum) {
        logger.info("Recherche de {} recettes aléatoires avec filtres : vegetarien={}, sansPorc={}, difficulty={}, cost={}",
                recipesNumber,
                vegetarien,
                sansPorc,
                difficultyEnum != null ? difficultyEnum.name() : "Aucun",
                costEnum != null ? costEnum.name() : "Aucun");

        List<RecipeSummaryDTO> recipes = recipeRepositoryCustom.findFilteredRandomRecipes(
                recipesNumber, vegetarien, sansPorc, difficultyEnum, costEnum
        );

        logger.info("Recettes demandées : {}, recettes retournées : {}", recipesNumber, recipes.size());
        return recipes;    }


    public Optional<Recipe> getRecipeById(Integer id) {
        logger.info("Recherche de la recette avec ID={}", id);

        Optional<Recipe> result = recipeRepository.findById(id);

        if (result.isPresent()) {
            logger.info("Recette trouvée : {}", result.get().getTitle());
        } else {
            logger.warn("Aucune recette trouvée avec ID={}", id);
        }
        return result;
    }
}