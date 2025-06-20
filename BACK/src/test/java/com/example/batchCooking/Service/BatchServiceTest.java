package com.example.batchCooking.service;

import com.example.batchCooking.service.BatchService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

class BatchServiceTest {

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private BatchService batchService;

    private AutoCloseable closeable;

    @BeforeEach
    void setUp() {
        closeable = MockitoAnnotations.openMocks(this);
    }

    @AfterEach
    void tearDown() throws Exception {
        closeable.close(); // Fermeture des mocks
    }

    @Test
    void testGenerateBatch_success() {
        // given
        List<Integer> recipeIds = List.of(1, 2);
        String expectedResponse = "{\"batch\": \"generated\"}";
        ResponseEntity<String> mockResponse =
                new ResponseEntity<>(expectedResponse, HttpStatus.OK);

        ArgumentCaptor<HttpEntity> httpEntityCaptor = ArgumentCaptor.forClass(HttpEntity.class);

        when(restTemplate.postForEntity(
                anyString(),
                httpEntityCaptor.capture(),
                eq(String.class)
        )).thenReturn(mockResponse);

        // when
        String actualResponse = batchService.generateBatch(recipeIds);

        // then
        assertEquals(expectedResponse, actualResponse);
    }

    @Test
    void testGenerateBatch_failure() {
        // given
        List<Integer> recipeIds = List.of(1, 2);
        String url = "http://batch-service:5001/api/batch/generate";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<List<Integer>> request = new HttpEntity<>(recipeIds, headers);

        // when: simulate exception
        when(restTemplate.postForEntity(eq(url), eq(request), eq(String.class)))
                .thenThrow(new RuntimeException("Service unreachable"));

        // then: assert exception is thrown
        Assertions.assertThrows(RuntimeException.class, () -> {
            batchService.generateBatch(recipeIds);
        });
    }}

