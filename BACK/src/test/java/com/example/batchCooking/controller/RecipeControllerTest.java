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

import java.util.Optional;

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
        when(recipeService.getRecipeById(9999)).thenReturn(Optional.empty());

        // when + then
        mockMvc.perform(get("/api/recipes/id/9999"))
                .andExpect(status().isNotFound());
    }
}