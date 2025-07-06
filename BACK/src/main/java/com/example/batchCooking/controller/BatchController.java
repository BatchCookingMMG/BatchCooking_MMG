package com.example.batchCooking.controller;

import com.example.batchCooking.dto.BatchResponseDTO;
import com.example.batchCooking.dto.RecipeRequestDTO;
import com.example.batchCooking.service.BatchService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/batch")
public class BatchController {

    private final BatchService batchService;
    private final ObjectMapper objectMapper;

    public BatchController(BatchService batchService, ObjectMapper objectMapper) {
        this.batchService = batchService;
        this.objectMapper = objectMapper;
    }

    @PostMapping("/generate")
    public ResponseEntity<BatchResponseDTO> generateBatch(@RequestBody RecipeRequestDTO recipeRequestDTO) {
        try {
            String resultJson = batchService.generateBatch(recipeRequestDTO.getRecipeIds());
            BatchResponseDTO response = objectMapper.readValue(resultJson, BatchResponseDTO.class);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}