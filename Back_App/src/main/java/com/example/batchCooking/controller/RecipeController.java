package com.example.batchCooking.controller;
import com.example.batchCooking.model.Recipe;
import com.example.batchCooking.service.RecipeService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    private RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("/{count}")
    public List<Recipe> getRandomRecipes(@PathVariable int count) {
        return recipeService.getRandomNRecipes(count);

    }
}
