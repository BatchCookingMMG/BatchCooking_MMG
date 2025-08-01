package com.example.batchCooking.exception;

public class RecipeNotFoundException extends RuntimeException {
    public RecipeNotFoundException(Integer id) {
        super("Aucune recette trouvée avec l'ID : " + id);
    }
}
