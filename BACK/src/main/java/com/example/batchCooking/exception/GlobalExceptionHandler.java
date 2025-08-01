package com.example.batchCooking.exception;

import jakarta.validation.ConstraintViolationException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LogManager.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(RecipeNotFoundException.class)
    public ResponseEntity<String> handleRecipeNotFoundException(RecipeNotFoundException ex) {
        logger.warn("Erreur métier : {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException ex) {
        logger.error("Erreur de paramètre : {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Paramètre invalide : " + ex.getMessage());
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<String> handleConstraintViolationException(ConstraintViolationException ex) {
        logger.warn("Violation de contrainte sur les paramètres : {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Paramètre invalide : " + ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGenericException(Exception ex) {
        logger.error("Erreur interne inattendue", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur interne du serveur.");
    }

    @ExceptionHandler(InvalidRecipeFilterException.class)
    public ResponseEntity<String> handleInvalidRecipeFilter(InvalidRecipeFilterException ex) {
        logger.warn("Filtre de recette invalide : {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Filtre invalide : " + ex.getMessage());
    }
}

