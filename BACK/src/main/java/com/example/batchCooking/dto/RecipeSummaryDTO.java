package com.example.batchCooking.dto;

public record RecipeSummaryDTO(
        String preparationTime,
        String difficulty,
        int peopleNumber
) {}