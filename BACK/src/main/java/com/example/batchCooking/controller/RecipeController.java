package com.example.batchCooking.controller;
import com.example.batchCooking.model.Recipe;
import com.example.batchCooking.service.RecipeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    private RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    // Récupérer une recette par son ID
    @GetMapping("/id/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable String id) {
        return recipeService.getRecipeById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Récupérer N recettes aléatoires
    @GetMapping("/random/{count}")
    public List<Recipe> getRandomRecipes(@PathVariable int count) {
        return recipeService.getRandomNRecipes(count);
    }
}
