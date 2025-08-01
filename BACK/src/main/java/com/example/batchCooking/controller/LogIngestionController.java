package com.example.batchCooking.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class LogIngestionController {

    private static final Logger logger = LogManager.getLogger(LogIngestionController.class);

    @PostMapping("/log-event")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void receiveLog(@RequestBody Map<String, Object> logEvent) {
        logger.info(logEvent);
    }
}

