package com.example.batchCooking.controller;

import com.example.batchCooking.configuration.SpringSecurityConfig;
import com.example.batchCooking.model.Recipe;
import com.example.batchCooking.service.RecipeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Arrays;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(RecipeController.class)
@Import(SpringSecurityConfig.class)
class RecipeControllerTest {

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

    @Test
    void testGetRecipeById_found() throws Exception {
        // given
        Recipe mockRecipe = new Recipe();
        mockRecipe.setId(1);
        mockRecipe.setTitle("Tarte aux pommes");

        when(recipeService.getRecipeById(1)).thenReturn(Optional.of(mockRecipe));

        // when + then
        mockMvc.perform(get("/api/recipes/id/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.title").value("Tarte aux pommes"));
    }

    @Test
    void testGetRecipeById_notFound() throws Exception {
        // given
        when(recipeService.getRecipeById(0)).thenReturn(Optional.empty());

        // when + then
        mockMvc.perform(get("/api/recipes/id/0"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetRandomRecipes_Success() throws Exception {
        // given
        Recipe recipe1 = new Recipe();
        recipe1.setTitle("hachis parmentier végétarien");
        recipe1.setTag("vegetarien");

        Recipe recipe2 = new Recipe();
        recipe2.setTitle("ratatouille");
        recipe2.setTag("vegetarien");

        List<Recipe> recipes = Arrays.asList(recipe1, recipe2);

        when(recipeService.getRandomNRecipes(2, true, false)).thenReturn(recipes);

        // when + then
        mockMvc.perform(get("/api/recipes/random")
                        .param("recipesNumber", "2")
                        .param("vegetarien", "true")
                        .param("sansPorc", "false"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("hachis parmentier végétarien"))
                .andExpect(jsonPath("$[1].title").value("ratatouille"));
    }

    @Test
    public void testGetRandomRecipes_BadRequest() throws Exception {
        // when + then
        mockMvc.perform(get("/api/recipes/random")
                        .param("recipesNumber", "1")
                        .param("vegetarien", "true")
                        .param("sansPorc", "false"))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testGetRandomRecipes_NoContent() throws Exception {
        // given
        when(recipeService.getRandomNRecipes(2, true, false)).thenReturn(Collections.emptyList());

        // when + then
        mockMvc.perform(get("/api/recipes/random")
                        .param("recipesNumber", "2")
                        .param("vegetarien", "true")
                        .param("sansPorc", "false"))
                .andExpect(status().isNoContent());
    }

}
//    // ===> TESTS DE /random/{count}
//    @WithMockUser
//    @Test
//    void testGetRandomRecipes() throws Exception {
//        Recipe recipe1 = new Recipe();
//        recipe1.setId(1);
//        recipe1.setTitle("Recipe A");
//
//        Recipe recipe2 = new Recipe();
//        recipe2.setId(2);
//        recipe2.setTitle("Recipe B");
//
//        List<Recipe> mockRecipes = Arrays.asList(recipe1, recipe2);
//
//        when(recipeService.getRandomNRecipes(3)).thenReturn(mockRecipes);
//
//        mockMvc.perform(get("/api/recipes/random/3"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.length()").value(2))
//                .andExpect(jsonPath("$[0].title").value("Recipe A"))
//                .andExpect(jsonPath("$[1].title").value("Recipe B"));
//
//        verify(recipeService, times(1)).getRandomNRecipes(3);
//    }
//
//    @WithMockUser
//    @Test
//    void testGetRandomRecipes_LessThanRequested() throws Exception {
//        List<Recipe> availableRecipes = Arrays.asList(
//                new Recipe() {{ setId(1); setTitle("Recipe 1"); }},
//                new Recipe() {{ setId(2); setTitle("Recipe 2"); }},
//                new Recipe() {{ setId(3); setTitle("Recipe 3"); }}
//        );
//
//        when(recipeService.getRandomNRecipes(5)).thenReturn(availableRecipes);
//
//        mockMvc.perform(get("/api/recipes/random/5"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.length()").value(3));
//    }
//
//    @WithMockUser
//    @Test
//    void testGetRandomRecipes_Zero() throws Exception {
//        when(recipeService.getRandomNRecipes(0)).thenReturn(Collections.emptyList());
//
//        mockMvc.perform(get("/api/recipes/random/0"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.length()").value(0));
//    }
//
//    @WithMockUser
//    @Test
//    void testGetRandomRecipes_InvalidNumber() throws Exception {
//        when(recipeService.getRandomNRecipes(-1)).thenThrow(new IllegalArgumentException("Invalid number"));
//
//        mockMvc.perform(get("/api/recipes/random/-1"))
//                .andExpect(status().isBadRequest());
//    }