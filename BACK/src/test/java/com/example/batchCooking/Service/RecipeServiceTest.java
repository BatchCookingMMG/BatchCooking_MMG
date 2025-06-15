package com.example.batchCooking.Service;

import com.example.batchCooking.model.CostEnum;
import com.example.batchCooking.model.DifficultyEnum;
import com.example.batchCooking.model.Recipe;
import com.example.batchCooking.repository.RecipeRepository;
import com.example.batchCooking.repository.RecipeRepositoryCustom;
import com.example.batchCooking.service.RecipeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class RecipeServiceTest {
    private RecipeRepository recipeRepository;
    private RecipeRepositoryCustom recipeRepositoryCustom;
    private RecipeService recipeService;

    @BeforeEach
    void setUp() {
        recipeRepository = mock(RecipeRepository.class);
        recipeRepositoryCustom = mock(RecipeRepositoryCustom.class);
        recipeService = new RecipeService(recipeRepository, recipeRepositoryCustom);
    }

    @Test
    void testGetRandomNRecipes_withAllFilters() {
        Recipe recipe = new Recipe();
        recipe.setTag("vegetarien");
        recipe.setDifficulty("facile");
        recipe.setCost("moyen");

        when(recipeRepositoryCustom.findFilteredRandomRecipes(3, true, true, DifficultyEnum.FACILE, CostEnum.MOYEN))
                .thenReturn(List.of(recipe));

        List<Recipe> result = recipeService.getRandomNRecipes(3, true, true, DifficultyEnum.FACILE, CostEnum.MOYEN);

        assertEquals(1, result.size());
        verify(recipeRepositoryCustom, times(1))
                .findFilteredRandomRecipes(3, true, true, DifficultyEnum.FACILE, CostEnum.MOYEN);
    }

    @Test
    void testGetRandomNRecipes_withNoFilters() {
        Recipe recipe = new Recipe();
        recipe.setTag("dessert");

        when(recipeRepositoryCustom.findFilteredRandomRecipes(2, false, false, null, null))
                .thenReturn(List.of(recipe));

        List<Recipe> result = recipeService.getRandomNRecipes(2, false, false, null, null);

        assertEquals(1, result.size());
        verify(recipeRepositoryCustom).findFilteredRandomRecipes(2, false, false, null, null);
    }

    @Test
    void testGetRecipeById_found() {
        Recipe r = new Recipe();
        r.setId(1);

        when(recipeRepository.findById(1)).thenReturn(Optional.of(r));

        Optional<Recipe> result = recipeService.getRecipeById(1);

        assertTrue(result.isPresent());
        assertEquals(1, result.get().getId());
    }

    @Test
    void testGetRecipeById_notFound() {
        when(recipeRepository.findById(99)).thenReturn(Optional.empty());

        Optional<Recipe> result = recipeService.getRecipeById(99);

        assertTrue(result.isEmpty());
    }
}
