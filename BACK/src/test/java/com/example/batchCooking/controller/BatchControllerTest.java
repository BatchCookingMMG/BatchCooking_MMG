package com.example.batchCooking.controller;

import com.example.batchCooking.configuration.SpringSecurityConfig;
import com.example.batchCooking.service.BatchService;
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

    @TestConfiguration
    static class TestConfig {
        @Bean
        public BatchService batchService() {
            return mock(BatchService.class);
        }
    }

    @Test
    void testGenerateBatchEndpoint() throws Exception {
        // given
        List<Integer> recipeIds = List.of(1, 2);
        String mockResult = "{\"batch_plan\":[],\"shopping_list\":{}}";

        when(batchService.generateBatch(recipeIds)).thenReturn(mockResult);

        // when + then
        mockMvc.perform(post("/api/batch/generate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"recipeIds\": [1, 2]}"))
                .andExpect(status().isOk())
                .andExpect(content().json(mockResult));
    }
}
