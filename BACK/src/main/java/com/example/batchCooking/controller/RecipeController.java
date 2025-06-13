package com.example.batchCooking.controller;
import com.example.batchCooking.model.Recipe;
import com.example.batchCooking.service.RecipeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    private RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    // Récupérer une recette par son ID
    @GetMapping("/id/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable Integer id) {
        return recipeService.getRecipeById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Récupérer N recettes aléatoires selon filtres vegetarien/porc
      @GetMapping("/random")
      public ResponseEntity<List<Recipe>> getRandomRecipes(
              @RequestParam @Min(2) @Max(14) Integer recipesNumber,
              @RequestParam(defaultValue = "false") boolean vegetarien,
              @RequestParam(defaultValue = "false") boolean sansPorc) {

          try {
              List<Recipe> recipes = recipeService.getRandomNRecipes(recipesNumber, vegetarien, sansPorc);
              if (recipes.isEmpty()) {
                  return ResponseEntity.noContent().build();
              }
              return ResponseEntity.ok(recipes);
          } catch (IllegalArgumentException e) {
              return ResponseEntity.badRequest().build();
          }
      }
}




