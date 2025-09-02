package com.example.batchCooking.controller;

import com.example.batchCooking.dto.LogEventDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@RestController
@RequestMapping("/api/logs")
public class LogController {

    private static final Logger logger = LoggerFactory.getLogger(LogController.class);
    private final List<String> logs = new CopyOnWriteArrayList<>();

    /**
     * Réception d’un log depuis front, back ou batch
     */
    @PostMapping("/event")
    public ResponseEntity<String> receiveLog(@RequestBody LogEventDTO logEventDTO) {

        String formatted = String.format(
                "[%s] [%s] %s (context=%s, stack=%s)",
                logEventDTO.level().toUpperCase(),
                logEventDTO.source(),
                logEventDTO.message(),
                logEventDTO.context() != null ? logEventDTO.context() : "N/A",
                logEventDTO.stackTrace() != null ? logEventDTO.stackTrace() : "N/A");

        logs.add(formatted);

        switch (logEventDTO.level().toUpperCase()) {
            case "ERROR" -> logger.error(formatted);
            case "WARN"  -> logger.warn(formatted);
            default      -> logger.info(formatted);
        }

        return new ResponseEntity<>("Log reçu", HttpStatus.OK);
    }

    @GetMapping
    public List<String> getRecentLogs(@RequestParam(defaultValue = "100") int last) {
        int start = Math.max(0, logs.size() - last);
        return logs.subList(start, logs.size());
    }
}

