package com.example.batchCooking.controller;

import com.example.batchCooking.service.BatchService;
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

    public BatchController(BatchService batchService) {
        this.batchService = batchService;
    }

    @PostMapping("/generate")
    public ResponseEntity<String> generateBatch(@RequestBody List<Integer> recipeIds) {
        try {
            String result = batchService.generateBatch(recipeIds);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Exception: " + e.getMessage());
        }
    }
}