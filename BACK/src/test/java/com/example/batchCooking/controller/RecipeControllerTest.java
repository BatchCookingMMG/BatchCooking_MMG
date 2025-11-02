package com.example.batchCooking.controller;

import com.example.batchCooking.dto.RecipeSummaryDTO;
import com.example.batchCooking.exception.GlobalExceptionHandler;
import com.example.batchCooking.model.Recipe;
import com.example.batchCooking.service.RecipeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Arrays;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(RecipeController.class)
@Import(GlobalExceptionHandler.class)
@AutoConfigureMockMvc(addFilters = false)
class RecipeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private RecipeService recipeService;

    @TestConfiguration
    static class TestConfig {
        @Bean
        public RecipeService recipeService() {
            return mock(RecipeService.class);
        }
    }

    @Test
    void testGetRecipeByIdWhenRecipeExistsResponse200() throws Exception {
        // given
        Recipe mockRecipe = new Recipe();
        mockRecipe.setId(1);
        mockRecipe.setTitle("Tarte aux pommes");
        mockRecipe.setImageUrl("https://example.com/img.jpg");


        when(recipeService.getRecipeById(1)).thenReturn(Optional.of(mockRecipe));

        // when + then
        mockMvc.perform(get("/api/recipes/id/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.title").value("Tarte aux pommes"))
                 .andExpect(jsonPath("$.imageUrl").value("https://example.com/img.jpg"));
    }

    @Test
    void testGetRecipeByIdWhenRecipeNotFoundResponse404() throws Exception {
        // given
        when(recipeService.getRecipeById(0)).thenReturn(Optional.empty());

        // when + then
        mockMvc.perform(get("/api/recipes/id/0"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetRandomRecipesWhenRecipesFoundResponse200() throws Exception {
        // given
        RecipeSummaryDTO dto1 = new RecipeSummaryDTO(1, "vegetarien", "hachis parmentier végétarien", "30 min", "Facile", "https://example.com/1.jpg");
        RecipeSummaryDTO dto2 = new RecipeSummaryDTO(2, "vegetarien", "ratatouille", "25 min", "Facile", "https://example.com/2.jpg");


        List<RecipeSummaryDTO> dtos = Arrays.asList(dto1, dto2);

        when(recipeService.getRandomNRecipes(2, true, false, null, null)).thenReturn(dtos);

        // when + then
        mockMvc.perform(get("/api/recipes/random")
                        .param("recipesNumber", "2")
                        .param("vegetarien", "true")
                        .param("sansPorc", "false"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("hachis parmentier végétarien"))
                .andExpect(jsonPath("$[0].tag").value("vegetarien"))
                .andExpect(jsonPath("$[0].imageUrl").value("https://example.com/1.jpg"))
                .andExpect(jsonPath("$[1].title").value("ratatouille"))
                .andExpect(jsonPath("$[1].tag").value("vegetarien"))
                .andExpect(jsonPath("$[1].imageUrl").value("https://example.com/2.jpg"));
    }

    @Test
    public void testGetRandomRecipesResponse204() throws Exception {
        // given
        when(recipeService.getRandomNRecipes(2, true, false, null, null)).thenReturn(Collections.emptyList());

        // when + then
        mockMvc.perform(get("/api/recipes/random")
                        .param("recipesNumber", "2")
                        .param("vegetarien", "true")
                        .param("sansPorc", "false"))
                .andExpect(status().isNoContent());    }

    @Test
    public void testGetRandomRecipesWhenNoRecipesFoundResponse400() throws Exception {
        // when + then
        mockMvc.perform(get("/api/recipes/random")
                        .param("recipesNumber", "1")
                        .param("vegetarien", "true")
                        .param("sansPorc", "false"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void getRandomRecipesWhenInvalidDifficultyProvidedResponse400() throws Exception {
        mockMvc.perform(get("/api/recipes/random")
                        .param("recipesNumber", "4")
                        .param("difficulty", "hardcore")
                        .param("vegetarien", "false")
                        .param("sansPorc", "false"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Filtre invalide : Paramètre 'difficulty' invalide : hardcore"));
    }

    @Test
    void getRandomRecipesWhenIllegalArgumentExceptionIsThrownResponse400() throws Exception {
        when(recipeService.getRandomNRecipes(anyInt(), anyBoolean(), anyBoolean(), any(), any()))
                .thenThrow(new IllegalArgumentException("Argument invalide"));

        mockMvc.perform(get("/api/recipes/random")
                        .param("recipesNumber", "4")
                        .param("vegetarien", "false")
                        .param("sansPorc", "false"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Paramètre invalide : Argument invalide"));
    }

    @Test
    void getRandomRecipesWhenUnhandledExceptionIsThrownResponse500() throws Exception {
        when(recipeService.getRandomNRecipes(anyInt(), anyBoolean(), anyBoolean(), any(), any()))
                .thenThrow(new RuntimeException("Erreur inconnue"));

        mockMvc.perform(get("/api/recipes/random")
                        .param("recipesNumber", "4")
                        .param("vegetarien", "false")
                        .param("sansPorc", "false"))
                .andExpect(status().isInternalServerError())
                .andExpect(content().string("Erreur interne du serveur."));
    }


}