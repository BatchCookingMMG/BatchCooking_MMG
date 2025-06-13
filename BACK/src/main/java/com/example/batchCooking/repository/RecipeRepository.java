package com.example.batchCooking.repository;

import com.example.batchCooking.model.Recipe;
import lombok.NonNull;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeRepository extends MongoRepository<Recipe, Integer> {
    // Toutes les recettes, sans filtre
    @Aggregation(pipeline = {
            "{$sample: {size: ?0}}"
    })
    List<Recipe> findRandomRecipes(Integer n);

    // Recettes excluant un tag (ex: porc)
    @Aggregation(pipeline = {
            "{$match: {'tag': {$ne: ?0}}}",
            "{$sample: {size: ?1}}"
    })
    List<Recipe> findRandomRecipesExcludingTag(String excludedTag, Integer n);

    // Recettes avec un tag (ex: ["vegetarien"])
    @Aggregation(pipeline = {
            "{ $match: { 'tag': ?0 } }",
            "{ $sample: { size: ?1 } }"
    })
    List<Recipe> findRandomRecipesByTag(String tag, Integer n);

    Optional<Recipe> findById(@NonNull Integer id);
}
