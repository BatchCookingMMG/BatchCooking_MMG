package com.example.batchCooking.controller;

import com.example.batchCooking.configuration.SpringSecurityConfig;
import com.example.batchCooking.dto.RecipeRequestDTO;
import com.example.batchCooking.service.BatchService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(BatchController.class)
@Import(SpringSecurityConfig.class)
class BatchControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BatchService batchService;

    @Autowired
    private ObjectMapper objectMapper;

    @TestConfiguration
    static class TestConfig {
        @Bean
        public BatchService batchService() {
            return mock(BatchService.class);
        }

        @Bean
        public ObjectMapper objectMapper() { return new ObjectMapper(); }
    }

    @Test
    void testGenerateBatchEndpoint() throws Exception {
        // given
        List<Integer> recipeIds = List.of(1, 2);
        RecipeRequestDTO requestDTO = new RecipeRequestDTO();
        requestDTO.setRecipeIds(recipeIds);

        // Simuler la réponse JSON de Python en String
        String resultJson = """
        {
            "mutualizedSteps": [
              {
                "category": "laver",
                "steps": ["Laver les tomates"]
              },
              {
                "category": "couper",
                "steps": ["Couper les oignons"]
              }
            ],
            "recipes": [
              {
                "title": "Salade de tomates",
                "steps": ["Assaisonner", "Mélanger"]
              },
              {
                "title": "Soupe à l'oignon",
                "steps": ["Cuire les oignons", "Ajouter du bouillon"]
              }
            ]
        }
        """;

        when(batchService.generateBatch(recipeIds)).thenReturn(resultJson);

        // Convertir en JSON
        String requestBody = objectMapper.writeValueAsString(requestDTO);

        // when + then
        mockMvc.perform(post("/api/batch/generate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.mutualizedSteps[0].category").value("laver"))
                .andExpect(jsonPath("$.mutualizedSteps[0].steps[0]").value("Laver les tomates"))
                .andExpect(jsonPath("$.mutualizedSteps[1].category").value("couper"))
                .andExpect(jsonPath("$.mutualizedSteps[1].steps[0]").value("Couper les oignons"))
                .andExpect(jsonPath("$.recipes[0].title").value("Salade de tomates"))
                .andExpect(jsonPath("$.recipes[1].steps[1]").value("Ajouter du bouillon"));
    }
}
