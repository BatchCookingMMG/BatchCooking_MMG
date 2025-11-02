package com.example.batchCooking.service;

import com.example.batchCooking.dto.RecipeSummaryDTO;
import com.example.batchCooking.model.CostEnum;
import com.example.batchCooking.model.DifficultyEnum;
import com.example.batchCooking.model.Recipe;
import com.example.batchCooking.repository.RecipeRepository;
import com.example.batchCooking.repository.RecipeRepositoryCustom;
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
        // given
        RecipeSummaryDTO dto = new RecipeSummaryDTO(
                123, "vegetarien", "hachis parmentier", "30 min", "Facile", "https://example.com/curry.jpg");

        when(recipeRepositoryCustom.findFilteredRandomRecipes(3, true, true, DifficultyEnum.FACILE, CostEnum.MOYEN))
                .thenReturn(List.of(dto));

        // when
        List<RecipeSummaryDTO> result = recipeService.getRandomNRecipes(3, true, true, DifficultyEnum.FACILE, CostEnum.MOYEN);

        // then
        assertEquals(1, result.size());
        assertEquals("hachis parmentier", result.getFirst().getTitle());
        assertEquals("https://example.com/curry.jpg", result.getFirst().getImageUrl());
        verify(recipeRepositoryCustom, times(1))
                .findFilteredRandomRecipes(3, true, true, DifficultyEnum.FACILE, CostEnum.MOYEN);
    }

    @Test
    void testGetRandomNRecipes_withNoFilters() {
        // given
        RecipeSummaryDTO dto = new RecipeSummaryDTO(
                456, "dessert", "tarte aux pommes", "45 min", "Moyenne"
        );

        when(recipeRepositoryCustom.findFilteredRandomRecipes(2, false, false, null, null))
                .thenReturn(List.of(dto));

        List<RecipeSummaryDTO> result = recipeService.getRandomNRecipes(2, false, false, null, null);

        assertEquals(1, result.size());
        assertEquals("dessert", result.get(0).getTag());
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
