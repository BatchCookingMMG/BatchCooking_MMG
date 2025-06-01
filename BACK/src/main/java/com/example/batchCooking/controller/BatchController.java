package com.example.batchCooking.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequestMapping("/api/batch")
public class BatchController {

    @PostMapping("/generate")
    public ResponseEntity<String> generateBatch(@RequestBody List<Integer> recipeIds) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String batchServiceUrl = "http://batch-service:5001/api/batch/generate";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<List<Integer>> request = new HttpEntity<>(recipeIds, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(batchServiceUrl, request, String.class);
            return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Exception: " + e.getMessage());
        }
    }
}

