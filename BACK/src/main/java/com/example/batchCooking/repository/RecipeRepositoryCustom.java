package com.example.batchCooking.repository;

import com.example.batchCooking.dto.RecipeSummaryDTO;
import com.example.batchCooking.model.CostEnum;
import com.example.batchCooking.model.DifficultyEnum;
import com.example.batchCooking.model.Recipe;

import java.util.List;

public interface RecipeRepositoryCustom {
    List<RecipeSummaryDTO> findFilteredRandomRecipes(int size, boolean vegetarien, boolean sansPorc, DifficultyEnum difficulty, CostEnum cost);

}
