package com.example.batchCooking.dto;

public record FrontendLogDTO (
        String level,
        String message,
        String stackTrace,
        String userAgent,
        String timestamp
) {}
