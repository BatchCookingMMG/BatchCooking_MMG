package com.example.batchCooking.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class BatchService {

    private final RestTemplate restTemplate;

    public BatchService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }


    public String generateBatch(List<Integer> recipeIds) {
        String batchServiceUrl = "http://batch-service:5001/api/batch/generate";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<List<Integer>> request = new HttpEntity<>(recipeIds, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(batchServiceUrl, request, String.class);

        return response.getBody();
    }
}
