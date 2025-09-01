package com.example.batchCooking.dto;

public record LogEventDTO(
        String source,      // "frontend", "backend", "batch"
        String level,       // "INFO", "WARN", "ERROR"
        String message,
        String stackTrace,
        String context,     // userAgent, service, jobName…
        String timestamp
) {
}
