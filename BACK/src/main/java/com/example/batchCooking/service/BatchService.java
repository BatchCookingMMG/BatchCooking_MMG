package com.example.batchCooking.service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class BatchService {
    private static final Logger logger = LogManager.getLogger(BatchService.class);

    private final RestTemplate restTemplate;

    public BatchService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }


    public String generateBatch(List<Integer> recipeIds) {
        String batchServiceUrl = "http://batch:5001/api/batch/generate";

        logger.info("Appel au batch service avec les recipeIds : {}", recipeIds);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, List<Integer>> requestBody = Collections.singletonMap("recipeIds", recipeIds);

        HttpEntity<Map<String, List<Integer>>> request = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(batchServiceUrl, request, String.class);

        return response.getBody();
    }
}
