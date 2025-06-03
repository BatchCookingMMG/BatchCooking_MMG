package com.example.batchCooking.controller;

import com.example.batchCooking.model.Recipe;
import com.example.batchCooking.service.RecipeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(RecipeController.class)
@Import(RecipesTest.TestConfig.class)
class RecipesTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private RecipeService recipeService;

    @TestConfiguration
    static class TestConfig {
        @Bean
        public RecipeService recipeService() {
            return mock(RecipeService.class);
        }
    }

    @WithMockUser(username = "testuser", roles = {"USER"})
    @Test
    void testGetRandomRecipes() throws Exception {
        Recipe recipe1 = new Recipe();
        recipe1.setId(1);
        recipe1.setTitle("Recipe A");
        recipe1.setDescription("Description A");

        Recipe recipe2 = new Recipe();
        recipe2.setId(2);
        recipe2.setTitle("Recipe B");
        recipe2.setDescription("Description B");

        List<Recipe> mockRecipes = Arrays.asList(recipe1, recipe2);

        when(recipeService.getRandomNRecipes(3)).thenReturn(mockRecipes);

        mockMvc.perform(get("/api/recipes/random/3")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].title").value("Recipe A"))
                .andExpect(jsonPath("$[1].id").value(2))
                .andExpect(jsonPath("$[1].title").value("Recipe B"));

        verify(recipeService, times(1)).getRandomNRecipes(3);
    }

    @WithMockUser(username = "testuser", roles = {"USER"})
    @Test
    void testGetRandomRecipes_LessThanRequested() throws Exception {
        Recipe recipe1 = new Recipe();
        recipe1.setId(1);
        recipe1.setTitle("Recipe 1");

        Recipe recipe2 = new Recipe();
        recipe2.setId(2);
        recipe2.setTitle("Recipe 2");

        Recipe recipe3 = new Recipe();
        recipe3.setId(3);
        recipe3.setTitle("Recipe 3");

        List<Recipe> availableRecipes = Arrays.asList(recipe1, recipe2, recipe3);

        when(recipeService.getRandomNRecipes(5)).thenReturn(availableRecipes);

        mockMvc.perform(get("/api/recipes/random/5")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(3))
                .andExpect(jsonPath("$[0].title").value("Recipe 1"))
                .andExpect(jsonPath("$[1].title").value("Recipe 2"))
                .andExpect(jsonPath("$[2].title").value("Recipe 3"));

        verify(recipeService, times(1)).getRandomNRecipes(5);
    }

    @WithMockUser(username = "testuser", roles = {"USER"})
    @Test
    void testGetRandomRecipes_Zero() throws Exception {
        when(recipeService.getRandomNRecipes(0)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/recipes/random/0")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));

        verify(recipeService, times(1)).getRandomNRecipes(0);
    }

    @WithMockUser(username = "testuser", roles = {"USER"})
    @Test
    void testGetRandomRecipes_InvalidNumber() throws Exception {
        when(recipeService.getRandomNRecipes(-1)).thenThrow(new IllegalArgumentException("Invalid number"));

        mockMvc.perform(get("/api/recipes/random/-1")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());

        verify(recipeService, times(1)).getRandomNRecipes(-1);
    }
}
