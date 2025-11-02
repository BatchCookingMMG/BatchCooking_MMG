package com.example.batchCooking.controller;
import com.example.batchCooking.dto.RecipeSummaryDTO;
import com.example.batchCooking.exception.RecipeNotFoundException;
import com.example.batchCooking.model.CostEnum;
import com.example.batchCooking.model.DifficultyEnum;
import com.example.batchCooking.model.Recipe;
import com.example.batchCooking.service.RecipeService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;

@RestController
@RequestMapping("/api/recipes")
@Validated
public class RecipeController {

    private static final Logger logger = LogManager.getLogger(RecipeController.class);
    private RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable Integer id) {
        logger.info("GET /api/recipes/id/{} appelé", id);

        Recipe recipe = recipeService.getRecipeById(id)
                .orElseThrow(() -> new RecipeNotFoundException(id));

        logger.info("Recette trouvée pour id={}", id);
        return ResponseEntity.ok(recipe);
    }

      @GetMapping("/random")
      public ResponseEntity<List<RecipeSummaryDTO>> getRandomRecipes(
              @RequestParam @Min(2) @Max(14) Integer recipesNumber,
              @RequestParam(defaultValue = "false") boolean vegetarien,
              @RequestParam(defaultValue = "false") boolean sansPorc,
              @RequestParam(required = false) DifficultyEnum  difficulty,
              @RequestParam(required = false) CostEnum cost) {

          logger.info("GET /api/recipes/random appelé avec recipesNumber={}, vegetarien={}, sansPorc={}, difficulty={}, cost={}",
                  recipesNumber, vegetarien, sansPorc, difficulty, cost);

//              DifficultyEnum difficultyEnum = difficulty != null ? DifficultyEnum.fromLabel(difficulty) : null;
//              CostEnum costEnum = cost != null ? CostEnum.fromLabel(cost) : null;

              List<RecipeSummaryDTO> recipes = recipeService.getRandomNRecipes(recipesNumber, vegetarien, sansPorc, difficulty, cost);
              if (recipes.isEmpty()) {
                  logger.info("Aucune recette trouvée pour les critères fournis");
                  return ResponseEntity.noContent().build();
              }
              logger.info("{} recettes trouvées", recipes.size());
              return ResponseEntity.ok(recipes);
      }
}




