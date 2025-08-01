package com.example.batchCooking.controller;

import com.example.batchCooking.dto.BatchResponseDTO;
import com.example.batchCooking.dto.RecipeRequestDTO;
import com.example.batchCooking.exception.BatchGenerationException;
import com.example.batchCooking.service.BatchService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/batch")
public class BatchController {

    private static final Logger logger = LogManager.getLogger(BatchController.class);

    private final BatchService batchService;
    private final ObjectMapper objectMapper;

    public BatchController(BatchService batchService, ObjectMapper objectMapper) {
        this.batchService = batchService;
        this.objectMapper = objectMapper;
    }

    @PostMapping("/generate")
    public ResponseEntity<BatchResponseDTO> generateBatch(@RequestBody RecipeRequestDTO recipeRequestDTO) {
        logger.info("POST /api/batch/generate appelé avec {} ID(s) de recette : {}",
                recipeRequestDTO.getRecipeIds().size(),
                recipeRequestDTO.getRecipeIds());

        try {
            String resultJson = batchService.generateBatch(recipeRequestDTO.getRecipeIds());
            BatchResponseDTO response = objectMapper.readValue(resultJson, BatchResponseDTO.class);

            logger.info("Batch généré avec succès pour les recettes : {}", recipeRequestDTO.getRecipeIds());
            return ResponseEntity.ok(response);

        } catch (JsonProcessingException e) {
            logger.error("Erreur lors du parsing JSON : {}", e.getMessage(), e);
            throw new BatchGenerationException("Réponse invalide du service batch", e);
        }
    }
}