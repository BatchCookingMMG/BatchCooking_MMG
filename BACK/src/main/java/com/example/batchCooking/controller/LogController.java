package com.example.batchCooking.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.Files;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@RestController
@RequestMapping("/api/logs")
public class LogController {

    // Thread-safe pour stockage temporaire
    private final List<String> logs = new CopyOnWriteArrayList<>();

    @PostMapping("/event")
    public ResponseEntity<String> receiveLog(@RequestBody LogEvent logEvent) {
        // logEvent.message et logEvent.level
        String formatted = String.format("[%s] %s", logEvent.getLevel().toUpperCase(), logEvent.getMessage());
        logs.add(formatted);

        // Tu peux aussi écrire dans un fichier ou DB ici
        System.out.println(formatted);

        return new ResponseEntity<>("OK", HttpStatus.OK);
    }

    @GetMapping
    public List<String> getRecentLogs(@RequestParam(defaultValue = "100") int last) {
        int start = Math.max(0, logs.size() - last);
        return logs.subList(start, logs.size());
    }

    // DTO pour recevoir le JSON
    public static class LogEvent {
        private String message;
        private String level;

        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
        public String getLevel() { return level; }
        public void setLevel(String level) { this.level = level; }
    }
}

