package com.example.batchCooking.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.Files;
import java.util.List;

@RestController
public class LogController {

    @GetMapping("/logs")
    public List<String> getLogs() throws IOException {
        Path path = Paths.get("logs/app.json");
        if (!Files.exists(path)) {
            return List.of("Log file not found.");
        }
        List<String> lines = Files.readAllLines(path);
        int start = Math.max(0, lines.size() - 100);
        return lines.subList(start, lines.size());
    }
}

