package com.example.batchCooking.repository;

import aj.org.objectweb.asm.commons.Remapper;
import com.example.batchCooking.model.Recipe;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeRepository extends MongoRepository<Recipe, String> {
    @Aggregation(pipeline = { "{ $sample: { size: ?0 } }" })
    List<Recipe> findRandomRecipes(int n);

    Optional<Recipe> findById(Integer id);
}
