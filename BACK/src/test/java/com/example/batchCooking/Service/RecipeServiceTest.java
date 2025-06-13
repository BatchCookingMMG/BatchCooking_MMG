package com.example.batchCooking.Service;

import com.example.batchCooking.model.Recipe;
import com.example.batchCooking.repository.RecipeRepository;
import com.example.batchCooking.service.RecipeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

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
    private RecipeService recipeService;

    @BeforeEach
    void setUp() {
        recipeRepository = mock(RecipeRepository.class);
        recipeService = new RecipeService(recipeRepository);
    }

    @Test
    void testGetRandomNRecipes_VP() {
        Recipe recipe1 = new Recipe();
        recipe1.setTag("vegetarien");
        Recipe recipe2 = new Recipe();
        recipe2.setTag("vegetarien");
        Recipe recipe3 = new Recipe();
        recipe3.setTag("porc");

        when(recipeRepository.findRandomRecipesByTag("vegetarien", 3))
                .thenReturn(List.of(recipe1, recipe2, recipe3));

        List<Recipe> result = recipeService.getRandomNRecipes(3, true, true);

        assertEquals(2, result.size());
        assertTrue(result.stream().noneMatch(r -> "porc".equalsIgnoreCase(r.getTag())));
    }

    @Test
    void testGetRandomNRecipes_V() {
        Recipe recipe1 = new Recipe();
        recipe1.setTag("vegetarien");

        when(recipeRepository.findRandomRecipesByTag("vegetarien", 2))
                .thenReturn(List.of(recipe1));

        List<Recipe> result = recipeService.getRandomNRecipes(2, true, false);

        assertEquals(1, result.size());
        verify(recipeRepository, times(1)).findRandomRecipesByTag("vegetarien", 2);
    }

    @Test
    void testGetRandomNRecipes_P() {
        Recipe recipe1 = new Recipe();
        recipe1.setTag("boeuf");

        when(recipeRepository.findRandomRecipesExcludingTag("porc", 2))
                .thenReturn(List.of(recipe1));

        List<Recipe> result = recipeService.getRandomNRecipes(2, false, true);

        assertEquals(1, result.size());
        verify(recipeRepository).findRandomRecipesExcludingTag("porc", 2);
    }

    @Test
    void testGetRandomNRecipes_none() {
        Recipe recipe1 = new Recipe();
        recipe1.setTag("dessert");

        when(recipeRepository.findRandomRecipes(2))
                .thenReturn(List.of(recipe1));

        List<Recipe> result = recipeService.getRandomNRecipes(2, false, false);

        assertEquals(1, result.size());
        verify(recipeRepository).findRandomRecipes(2);
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
